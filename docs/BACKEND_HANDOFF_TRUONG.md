# Backend handoff - Trường

## Phạm vi Trường phụ trách

- Express server trong `server/`.
- Character data và persona prompts.
- OpenAI Chat Completions streaming qua SSE.
- API contract cho frontend/RAG.
- Cấu hình môi trường và kiểm tra trước demo.

## Lệnh cần dùng

```bash
cd server
npm install
npm run check
npm run dev
```

Server mặc định chạy tại:

```text
http://localhost:3001
```

## Cấu hình môi trường

Tạo file `server/.env` từ `server/.env.example`:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o
OPENAI_MAX_TOKENS=800
RAG_EMBEDDING_PROVIDER=local-hash
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
RAG_OCR_PROVIDER=tesseract
OPENAI_OCR_MODEL=gpt-4o-mini
PORT=3001
CLIENT_ORIGINS=http://localhost:3000,http://localhost:5173
RAG_PROVIDER=qdrant
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=
QDRANT_COLLECTION=suvietai_history_chunks
RAG_TOP_K=12
RAG_CONTEXT_LIMIT=4
RAG_ENABLE_OCR=false
RAG_ENABLE_OPENAI_OCR=false
TESSERACT_BIN=tesseract
TESSERACT_LANG=vie+eng
TESSERACT_PSM=6
```

Nếu thiếu hoặc sai `OPENAI_API_KEY`, endpoint `/api/chat` sẽ trả lỗi `503` rõ ràng thay vì lỗi mơ hồ trong stream.

## Endpoints

### Health check

```http
GET /api/health
```

Response mẫu:

```json
{
  "status": "ok",
  "service": "suvietai-backend",
  "model": "gpt-4o",
  "hasOpenAiKey": true,
  "characterCount": 3
}
```

### Danh sách nhân vật

```http
GET /api/characters
```

Trả về 3 nhân vật demo, không trả `systemPrompt`.

### Chi tiết một nhân vật

```http
GET /api/characters/:id
```

ID hiện có:

- `tran_hung_dao`
- `ly_thuong_kiet`
- `ho_xuan_huong`

### Chat streaming

```http
POST /api/chat
Content-Type: application/json
```

Request tối thiểu:

```json
{
  "characterId": "ho_xuan_huong",
  "messages": [
    {
      "role": "user",
      "content": "Ý nghĩa ẩn dụ trong bài thơ Bánh trôi nước là gì?"
    }
  ]
}
```

Response là SSE:

```text
data: {"text":"..."}

data: [DONE]
```

## RAG với Qdrant

Backend hiện tự retrieve RAG theo `characterId` và câu hỏi user cuối cùng nếu Qdrant đã sẵn sàng. Embedding RAG mặc định dùng local hash embedding nên không cần OpenAI API key.

Lệnh local:

```bash
docker run -p 6333:6333 -v qdrant_storage:/qdrant/storage qdrant/qdrant
npm run rag:health
npm run rag:ingest:dry
npm run rag:ingest
npm run rag:query -- tran_hung_dao "Trận Bạch Đằng năm 1288 diễn ra thế nào?"
npm run rag:query -- ho_xuan_huong "Ý nghĩa ẩn dụ trong Bánh trôi nước là gì?"
```

Pipeline ingestion:

- Đọc tài liệu trong `docs/TranHungDao`, `docs/LyThuongKiet` và `docs/HoXuanHuong`.
- Extract `.txt` trực tiếp.
- Với PDF, script dùng PyMuPDF nếu máy có cài; trang thiếu text được đánh dấu `needs_ocr` hoặc `manual_review`.
- Nếu dry-run đưa toàn bộ PDF vào `manual_review`, cài PyMuPDF bằng `python -m pip install pymupdf` rồi chạy lại.
- Nếu bật `RAG_ENABLE_OCR=true` và có Tesseract OCR, script OCR local cho trang cần OCR.
- Nếu muốn dùng OpenAI OCR thay vì Tesseract, đặt `RAG_OCR_PROVIDER=openai` và dùng OpenAI API key hợp lệ.
- Ghi report vào `server/rag/processed/pages.jsonl` và `server/rag/processed/chunks.jsonl`.
- Upsert chunk sạch vào Qdrant collection `suvietai_history_chunks`.

Endpoint `/api/chat` vẫn nhận optional field `ragContext` để debug hoặc override thủ công, nhưng frontend không cần gửi field này.

Request debug có RAG thủ công:

```json
{
  "characterId": "tran_hung_dao",
  "messages": [
    {
      "role": "user",
      "content": "Vì sao khoan thư sức dân là thượng sách giữ nước?"
    }
  ],
  "ragContext": [
    {
      "content": "Trần Hưng Đạo khuyên vua Trần Anh Tông khoan thư sức dân để làm kế sâu rễ bền gốc.",
      "source": "Đại Việt Sử ký Toàn thư"
    }
  ]
}
```

Backend sẽ ghép các đoạn tự retrieve và/hoặc `ragContext` thủ công vào system prompt dưới mục "Sử liệu RAG được cung cấp". Nếu Qdrant chưa chạy hoặc chưa ingest, chat vẫn chạy bình thường bằng persona prompt.

## Validation hiện có

- `characterId` không tồn tại: trả `404`.
- Thiếu hoặc sai API key: trả `503`.
- `messages` không có user message hợp lệ: trả `400`.
- Chỉ nhận role `user` và `assistant`.
- Chỉ giữ 10 message gần nhất.
- Mỗi message bị cắt ở 4000 ký tự để tránh prompt quá dài.

## Checklist trước demo

- [ ] `server/.env` đã có API key thật.
- [ ] `npm run check` pass.
- [ ] `GET /api/health` trả `hasOpenAiKey: true`.
- [ ] `GET /api/health` trả `rag.connected: true` nếu demo bật RAG.
- [ ] `GET /api/characters` trả đúng 3 nhân vật.
- [ ] `npm run rag:ingest:dry` có report chunk/OCR.
- [ ] Test chat mỗi nhân vật ít nhất 1 câu.
- [ ] P2 xác nhận frontend đang trỏ về `http://localhost:3001`.
