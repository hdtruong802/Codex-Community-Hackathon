# Plan RAG cho tài liệu `docs/` của Trần Hưng Đạo, Lý Thường Kiệt và Hồ Xuân Hương

## Summary

- Hiện `docs/` có tài liệu cho 3 nhân vật demo: Trần Hưng Đạo, Lý Thường Kiệt và Hồ Xuân Hương.
- Vector DB đề xuất đổi sang **Qdrant** để vừa dễ chạy local bằng Docker, vừa có đường deploy rõ qua Qdrant Cloud hoặc container riêng.
- Dùng **local hash embedding** mặc định để tạo vector không cần OpenAI API key; nếu muốn có semantic embedding mạnh hơn có thể đổi `RAG_EMBEDDING_PROVIDER=openai`.
- OCR dùng hướng **hybrid local-first**: extract text local trước, chỉ OCR bằng Tesseract cho các trang scan/image-heavy hoặc text layer lỗi; OpenAI OCR chỉ là option nếu có API key hợp lệ.
- RAG chia 2 lớp: `fact` dùng làm căn cứ lịch sử, `style` dùng để bắt giọng văn/tác phẩm; không trộn style chunk thành fact citation nếu câu hỏi cần sự kiện lịch sử.
- Backend `/api/chat` sẽ tự retrieve RAG theo `characterId + latest user question`, thay vì bắt frontend gửi `ragContext`.

## Key Changes

- Thêm ingestion pipeline:
  - Đọc `docs/TranHungDao/*`, `docs/LyThuongKiet/*` và `docs/HoXuanHuong/*`.
  - Extract PDF bằng Python script với PyMuPDF; mỗi trang được phân loại `text_ok`, `needs_ocr`, hoặc `manual_review`.
  - Với trang `needs_ocr`, render page thành ảnh PNG/JPEG 200-300 DPI rồi OCR local bằng Tesseract.
  - Không OCR toàn bộ PDF nếu local extract đã sạch, để giảm thời gian ingestion.
  - Chuẩn hóa text: bỏ header/footer lặp, nối dòng gãy, giữ số trang, tên nguồn, loại tài liệu.
  - Ghi intermediate JSONL tại `server/rag/processed/pages.jsonl` và `server/rag/processed/chunks.jsonl` để audit trước khi index.
  - Index vào Qdrant collection `suvietai_history_chunks` với vector size `1536`, distance `Cosine`.

- OCR pipeline chi tiết:
  - Bước 1: local extract bằng PyMuPDF cho từng trang, tính `textLength`, `wordCount`, `imageCount`, `hasUnicodeNoise`.
  - Bước 2: nếu `wordCount < 40`, hoặc text bị lỗi encoding nhiều, hoặc trang chủ yếu là ảnh, đánh dấu `needs_ocr`.
  - Bước 3: render riêng các trang `needs_ocr` thành ảnh; lưu tạm ở `server/rag/processed/ocr-images/` trong quá trình chạy, không commit ảnh render.
  - Bước 4: gọi Tesseract OCR local qua CLI; nếu không có binary hoặc thiếu language pack thì đánh dấu `manual_review`.
  - Bước 5: nếu `confidence < 0.75` hoặc text quá ngắn, đánh dấu `manual_review`; không index chunk đó như nguồn chắc chắn.
  - Bước 6: merge text OCR với metadata trang, sau đó mới chunk.
  - Bước 7: cache kết quả OCR vào `pages.jsonl` để không gọi lại API cho cùng file/page nếu nội dung chưa đổi.

- Metadata bắt buộc cho mỗi chunk:
  - `characterId`: `tran_hung_dao`, `ly_thuong_kiet` hoặc `ho_xuan_huong`
  - `docType`: `fact` hoặc `style`
  - `sourceTitle`
  - `sourceFile`
  - `pageStart`, `pageEnd`
  - `chunkIndex`
  - `extractionMethod`: `local_text`, `openai_ocr`, hoặc `manual`
  - `quality`: `clean`, `ocr_low_confidence`, hoặc `manual_review`
  - `tags`: ví dụ `bach-dang`, `nguyen-mong`, `nam-quoc-son-ha`, `song-nhu-nguyet`, `phat-tong`
  - `citationLabel`: chuỗi ngắn để đưa vào câu trả lời

- Chunking:
  - Tài liệu `fact`: chunk theo đoạn/ngữ nghĩa, mục tiêu 450-700 tokens, overlap 80-120 tokens.
  - Các đoạn sử biên niên như Đại Việt Sử ký Toàn thư: ưu tiên tách theo sự kiện/năm, 250-500 tokens, không cắt giữa một sự kiện.
  - Tài liệu scan/image-heavy: chỉ chunk sau khi OCR xong; nếu OCR kém thì không index vào retrieval chính, chỉ đưa vào report `manual_review`.
  - Tài liệu `style` như Hịch tướng sĩ, Nam quốc sơn hà, Phạt Tống Lộ Bố Văn: chunk ngắn hơn, 150-350 tokens; giữ nguyên câu/khổ, metadata `docType: "style"`.

## Retrieval Design

- Query flow trong backend:
  - Lấy câu hỏi user cuối cùng.
  - Detect intent nhẹ bằng keyword:
    - Nếu hỏi sự kiện/lịch sử/nguyên nhân/chiến thuật: ưu tiên `docType: "fact"`.
    - Nếu hỏi giọng văn/tác phẩm/câu chữ/bài hịch/bài thơ: lấy cả `fact` và `style`.
  - Query Qdrant `search` với payload filter `characterId` và optional `docType`.
  - Lấy top 12 vector results bằng cosine similarity.
  - Rerank bằng điểm kết hợp: `0.75 vector score + 0.25 keyword/tag overlap`.
  - Chọn top 4 chunks đưa vào prompt, tối đa khoảng 1,800-2,400 tokens context.

- Prompt RAG:
  - Chèn context dưới mục `SỬ LIỆU RAG ĐƯỢC CUNG CẤP`.
  - Yêu cầu model chỉ dùng chunk liên quan; nếu thiếu nguồn thì nói rõ giới hạn.
  - Citation cuối câu trả lời lấy từ `citationLabel`, không để model tự bịa nguồn.
  - Nếu retrieval không đủ tin cậy, fallback về persona prompt và thêm câu “Sử liệu cung cấp chưa đủ để khẳng định chi tiết này.”

- Vector DB setup khuyến nghị:
  - **Production/deploy**: Qdrant Cloud là lựa chọn chính nếu team muốn managed vector DB, không phải tự vận hành disk/service.
  - **Self-host deploy**: chạy Qdrant container trên Render/Railway/Fly/DigitalOcean nếu muốn giữ toàn quyền dữ liệu.
  - **Local/dev**: chạy Qdrant Docker cùng backend; cùng API với production nên không phải đổi code khi deploy.
  - Lý do chọn Qdrant:
    - Đúng bài toán vector search hơn Postgres khi corpus tăng.
    - Payload filter tốt cho `characterId`, `docType`, `quality`, `sourceFile`, `tags`.
    - Hỗ trợ upsert/delete theo point ID, tiện re-index từng file.
    - Có Cloud managed để deploy nhanh sau hackathon.

- Qdrant collection đề xuất:
  - Collection name: `suvietai_history_chunks`.
  - Vector config: `size: 1536`, `distance: Cosine`.
  - Point `id`: UUID ổn định sinh từ `sourceFile + pageStart + pageEnd + chunkIndex + contentHash`.
  - Point `vector`: local hash embedding 1536 chiều, hoặc embedding từ `text-embedding-3-small` nếu cấu hình provider OpenAI.
  - Point `payload`:
    - `characterId`
    - `docType`
    - `sourceTitle`
    - `sourceFile`
    - `pageStart`
    - `pageEnd`
    - `chunkIndex`
    - `content`
    - `tags`
    - `citationLabel`
    - `extractionMethod`
    - `quality`
    - `contentHash`
    - `indexedAt`
  - Tạo payload indexes cho `characterId`, `docType`, `quality`, `sourceFile`, `tags` để filter nhanh.

- Env mới:
  - `RAG_PROVIDER=qdrant`
  - `RAG_EMBEDDING_PROVIDER=local-hash`
  - `RAG_OCR_PROVIDER=tesseract`
  - `QDRANT_URL=http://localhost:6333`
  - `QDRANT_API_KEY=`
  - `QDRANT_COLLECTION=suvietai_history_chunks`
  - `OPENAI_EMBEDDING_MODEL=text-embedding-3-small`
  - `OPENAI_OCR_MODEL=gpt-4o-mini`
  - `RAG_ENABLE_OCR=false`
  - `RAG_TOP_K=12`
  - `RAG_CONTEXT_LIMIT=4`

- Deploy notes:
  - Local: `docker run -p 6333:6333 -v qdrant_storage:/qdrant/storage qdrant/qdrant`.
  - Production nhanh nhất: tạo Qdrant Cloud cluster, set `QDRANT_URL` và `QDRANT_API_KEY` trên backend host.
  - Nếu backend deploy serverless, Qdrant vẫn nằm ngoài như managed service; không lưu vector DB trên filesystem của serverless.

## Test Plan

- Ingestion tests:
  - Script fail nếu thiếu `characterId`, `docType`, `sourceFile`, `citationLabel`.
  - Báo số chunk theo từng nhân vật và từng `docType`.
  - Báo danh sách PDF/trang `needs_ocr`, số trang đã OCR bằng Tesseract, số trang `manual_review`.
  - Verify mỗi chunk có text dài tối thiểu 80 ký tự, trừ thơ/hịch ngắn.
  - Verify không index chunk `quality: "manual_review"` vào Qdrant.

- Retrieval scenarios:
  - Trần Hưng Đạo: “Trận Bạch Đằng năm 1288 diễn ra thế nào?”
  - Trần Hưng Đạo: “Khoan thư sức dân nghĩa là gì?”
  - Lý Thường Kiệt: “Tại sao đánh sang Ung Châu?”
  - Lý Thường Kiệt: “Nam quốc sơn hà có ý nghĩa gì?”
  - Hồ Xuân Hương: “Ý nghĩa ẩn dụ trong Bánh trôi nước là gì?”
  - Hồ Xuân Hương: “Vì sao thơ Hồ Xuân Hương vừa trào phúng vừa nhân văn?”
  - Với câu ngoài nguồn: backend vẫn trả lời nhưng nói rõ giới hạn tư liệu.

- Integration tests:
  - `GET /api/health` thêm trạng thái RAG provider: `qdrant connected/disconnected`.
  - `npm run rag:ingest` tạo Qdrant collection và upsert chunks thành công.
  - `npm run rag:query -- "..."` in ra top chunks + citation.
  - `/api/chat` stream được câu trả lời có citation từ RAG.

## Assumptions

- Chọn **Qdrant** làm hướng chính để deploy sau demo; local và production dùng cùng API.
- V1 xử lý tài liệu trong `docs/TranHungDao`, `docs/LyThuongKiet` và `docs/HoXuanHuong`.
- Nếu OCR chưa kịp làm, V1 vẫn index các PDF có text extract sạch; các trang scan/image-heavy đi vào `manual_review` hoặc backlog, không index như nguồn chắc chắn.
- Frontend không cần tự gọi RAG; frontend chỉ gọi `/api/chat` như hiện tại, backend tự retrieve.
