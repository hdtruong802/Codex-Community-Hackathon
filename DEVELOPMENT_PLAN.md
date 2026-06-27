# Kế hoạch phát triển SửViệtAI

## 1. Mục tiêu demo

Xây dựng bản demo chatbot lịch sử Việt Nam cho 3 nhân vật:

- Trần Hưng Đạo
- Lý Thường Kiệt
- Hồ Xuân Hương

Demo cần cho thấy người dùng có thể chọn nhân vật, đặt câu hỏi, nhận câu trả lời theo đúng giọng/persona, có trích dẫn sử liệu và có lớp RAG hỗ trợ thông tin lịch sử đáng tin cậy.

## 2. Phân vai 2 người

### P1 - Backend, prompt, tích hợp, vận hành

Người phụ trách: Trường.

Phạm vi chính:

- Backend Express API.
- OpenAI integration và SSE streaming.
- System prompt/persona cho từng nhân vật.
- API contract với frontend.
- Kiểm thử luồng end-to-end.
- Cấu hình môi trường, README, demo script, deploy nếu có.
- Hỗ trợ P2 tích hợp RAG vào endpoint chat.

Deliverables:

- API `/api/characters` ổn định, trả đúng 3 nhân vật demo.
- API `/api/chat` stream câu trả lời theo SSE.
- Persona prompt rõ giọng, đúng mốc lịch sử, có quy tắc chống bịa.
- `.env.example` hoặc hướng dẫn cấu hình API key.
- Checklist demo và tài liệu setup cuối cùng.

### P2 - Frontend và RAG

Người phụ trách: Duyên.

Phạm vi chính:

- UI/UX Next.js.
- Trang chọn nhân vật.
- Trang chat, trạng thái loading, lỗi, empty state.
- Suggested questions.
- RAG knowledge base: thu thập, chia đoạn, metadata, truy xuất.
- Hiển thị hoặc lồng ghép citation/sử liệu trong câu trả lời.

Deliverables:

- Giao diện demo mượt, responsive, tiếng Việt rõ ràng.
- Chat UI đọc SSE ổn định.
- Bộ dữ liệu RAG cho 3 nhân vật.
- Retrieval function trả về context liên quan theo câu hỏi.
- Hiển thị citation hoặc ít nhất đưa nguồn vào prompt backend.

## 3. Kiến trúc đề xuất

```text
client/ Next.js
  |
  | GET /api/characters
  | POST /api/chat { characterId, messages }
  v
server/ Express
  |
  | 1. Nhận characterId + messages
  | 2. Lấy persona prompt
  | 3. Gọi RAG retrieval theo characterId + latest user question
  | 4. Ghép system prompt + retrieved context + recent messages
  | 5. Stream OpenAI response về client
  v
OpenAI API
```

RAG có thể triển khai tối giản trước, nâng cấp sau:

- Giai đoạn 1: JSON knowledge base + keyword search.
- Giai đoạn 2: embedding search bằng vector store local hoặc service ngoài.
- Giai đoạn 3: citation chuẩn theo từng đoạn tư liệu.

## 4. API contract cần thống nhất

### `GET /api/characters`

Trả danh sách nhân vật không bao gồm `systemPrompt`.

```json
[
  {
    "id": "tran_hung_dao",
    "name": "Trần Hưng Đạo",
    "emoji": "⚔️",
    "period": "Thế kỷ XIII · Nhà Trần",
    "shortBio": "...",
    "topics": ["Chiến thuật", "Lãnh đạo", "Hào khí Đông A"],
    "suggestedQuestions": ["..."],
    "color": "#ef4444"
  }
]
```

### `POST /api/chat`

Request:

```json
{
  "characterId": "ho_xuan_huong",
  "messages": [
    { "role": "user", "content": "Ý nghĩa ẩn dụ trong bài thơ Bánh trôi nước là gì?" }
  ]
}
```

Response:

- Content type: `text/event-stream`
- Chunk thường:

```text
data: {"text":"..."}
```

- Kết thúc:

```text
data: [DONE]
```

## 5. Kế hoạch theo giai đoạn

### Giai đoạn 0 - Chốt scope demo

Thời lượng đề xuất: 0.5 ngày.

Checklist:

- [ ] Chốt 3 nhân vật demo.
- [ ] Chốt giọng/persona chính của từng nhân vật.
- [ ] Chốt format citation ở cuối câu trả lời.
- [ ] Chốt luồng demo 3-5 phút.
- [ ] Chốt ai sẽ chạy backend, ai chạy frontend khi demo.

Kết quả mong muốn:

- Cả team có cùng một scope, tránh thêm nhân vật/tính năng vào phút cuối.

### Giai đoạn 1 - Backend nền tảng

Người chính: P1.

Checklist:

- [ ] Kiểm tra `server/index.js`, CORS, JSON body parser.
- [ ] Hoàn thiện `server/data/characters.js` với đúng 3 nhân vật.
- [ ] Hoàn thiện prompt cho Trần Hưng Đạo.
- [ ] Hoàn thiện prompt cho Lý Thường Kiệt.
- [ ] Hoàn thiện prompt cho Hồ Xuân Hương.
- [ ] Chuẩn hóa lỗi khi thiếu `OPENAI_API_KEY`.
- [ ] Giới hạn context messages để tránh tốn token.
- [ ] Test API `/api/characters`.
- [ ] Test API `/api/chat` bằng curl/Postman hoặc frontend.

Kết quả mong muốn:

- Backend có thể stream câu trả lời ổn định cho cả 3 nhân vật.

### Giai đoạn 2 - Frontend nền tảng

Người chính: P2.

Checklist:

- [ ] Trang chủ hiển thị đúng 3 character cards.
- [ ] Trang chat nhận `id` từ route `/chat/[id]`.
- [ ] Gọi `GET /api/characters` và fallback static khi backend chưa chạy.
- [ ] Gửi message tới `POST /api/chat`.
- [ ] Parse SSE stream và render từng chunk.
- [ ] Thêm empty state, loading state, typing indicator.
- [ ] Hiển thị suggested questions.
- [ ] Kiểm tra responsive desktop/mobile.
- [ ] Kiểm tra lỗi backend/API key và hiển thị message dễ hiểu.

Kết quả mong muốn:

- Người dùng chọn nhân vật, chat được, không cần thao tác kỹ thuật trong demo.

### Giai đoạn 3 - RAG tối giản

Người chính: P2.

P1 hỗ trợ nối vào backend nếu cần.

Checklist:

- [ ] Tạo thư mục dữ liệu, ví dụ `server/rag/knowledge/`.
- [ ] Tạo file tư liệu cho từng nhân vật:
  - [ ] `tran-hung-dao.json`
  - [ ] `ly-thuong-kiet.json`
  - [ ] `ho-xuan-huong.json`
- [ ] Mỗi đoạn tư liệu có `id`, `title`, `content`, `source`, `tags`.
- [ ] Viết retrieval function theo keyword search trước.
- [ ] Input: `characterId`, `question`.
- [ ] Output: 3-5 đoạn context liên quan nhất.
- [ ] Ghép context vào prompt backend dưới phần "Sử liệu tham khảo".
- [ ] Nếu không tìm thấy context, backend vẫn trả lời bằng persona prompt và nói rõ giới hạn.

Format dữ liệu gợi ý:

```json
[
  {
    "id": "hxh-banh-troi-nuoc-01",
    "title": "Bánh trôi nước",
    "content": "Bài thơ Bánh trôi nước thường được đọc như lời khẳng định phẩm hạnh và thân phận người phụ nữ trong xã hội cũ...",
    "source": "Tư liệu thơ Nôm Hồ Xuân Hương",
    "tags": ["ho-xuan-huong", "banh-troi-nuoc", "tho-nom"]
  }
]
```

Kết quả mong muốn:

- Câu trả lời có thông tin cụ thể hơn, ít bịa hơn, và có nguồn để demo tính giáo dục.

### Giai đoạn 4 - RAG nâng cấp nếu còn thời gian

Người chính: P2.

Checklist:

- [ ] Tách chunk tư liệu dài thành đoạn nhỏ.
- [ ] Thêm điểm số relevance.
- [ ] Highlight nguồn liên quan trong UI.
- [ ] Dùng embeddings nếu có đủ thời gian và API key.
- [ ] Cache kết quả retrieval theo câu hỏi phổ biến.

Kết quả mong muốn:

- Demo có điểm nhấn kỹ thuật rõ hơn: nhân vật trả lời dựa trên tư liệu thay vì chỉ prompt.

### Giai đoạn 5 - Demo polish

Người chính: cả 2.

Checklist:

- [ ] Chạy `npm run lint` ở `client`.
- [ ] Chạy `npm run build` ở `client`.
- [ ] Chạy server và test cả 3 nhân vật.
- [ ] Chuẩn bị 1 câu hỏi demo cho mỗi nhân vật.
- [ ] Chuẩn bị fallback nếu mạng/API lỗi.
- [ ] Viết script thuyết trình 3-5 phút.
- [ ] Kiểm tra README setup.
- [ ] Đóng băng scope trước giờ demo.

Kết quả mong muốn:

- Demo chạy ổn, câu chuyện sản phẩm rõ, không bị sa vào debug trực tiếp.

## 6. Phân công chi tiết theo file

### P1

- `server/index.js`
- `server/routes/chat.js`
- `server/routes/characters.js`
- `server/data/characters.js`
- `server/prompts/*.js`
- `.env.example`
- `README.md`
- `CONTEXT.md`
- `DEVELOPMENT_PLAN.md`

### P2

- `client/app/page.js`
- `client/app/chat/[id]/page.js`
- `client/components/*`
- `client/hooks/useChat.js`
- `client/utils/api.js`
- `client/app/globals.css`
- RAG data/function nếu team đặt trong `server/rag/*`

Lưu ý: Nếu P2 sửa file trong `server/rag/*`, cần báo P1 vì backend sẽ import trực tiếp phần này.

## 7. Quy ước làm việc

- Làm trên branch `main` nếu team muốn nhanh, nhưng commit nhỏ và rõ.
- Commit prefix:
  - `[P1] backend: ...`
  - `[P1] prompt: ...`
  - `[P2] frontend: ...`
  - `[P2] rag: ...`
- Trước khi sửa phần của người khác, nhắn nhanh trong nhóm.
- Không thêm nhân vật mới trước demo.
- Không đổi API contract khi chưa báo người còn lại.
- Mỗi lần xong một milestone, cả 2 pull code và test luồng chọn nhân vật -> chat.

## 8. Câu hỏi demo đề xuất

### Trần Hưng Đạo

- "Trận nào trong ba lần kháng chiến chống Nguyên-Mông là khó khăn nhất?"
- "Vì sao khoan thư sức dân là thượng sách giữ nước?"

### Lý Thường Kiệt

- "Tại sao lại chủ động đánh sang đất Tống trước?"
- "Ý nghĩa của Nam quốc sơn hà trong trận sông Như Nguyệt là gì?"

### Hồ Xuân Hương

- "Ý nghĩa ẩn dụ trong bài thơ Bánh trôi nước là gì?"
- "Vì sao thơ Hồ Xuân Hương vừa trào phúng vừa nhân văn?"

## 9. Rủi ro và phương án dự phòng

| Rủi ro | Ảnh hưởng | Cách xử lý |
| --- | --- | --- |
| Thiếu hoặc sai `OPENAI_API_KEY` | Chat không trả lời | Chuẩn bị `.env`, test trước demo, có ảnh/video fallback nếu cần |
| Backend chưa chạy | Frontend không fetch được nhân vật | Frontend đã có static fallback, nhưng chat vẫn cần backend |
| RAG chưa hoàn thiện | Câu trả lời thiếu citation cụ thể | Dùng prompt có citation mặc định, ưu tiên chất lượng persona |
| Stream SSE lỗi | UI không nhận chunk | Test bằng câu hỏi ngắn, thêm error message rõ |
| Nội dung lịch sử bị bịa | Mất điểm tin cậy | Dùng RAG context, yêu cầu model nói không chắc khi thiếu nguồn |
| Scope phình to | Không kịp demo | Giữ đúng 3 nhân vật, bỏ nâng cấp embeddings nếu thiếu thời gian |

## 10. Definition of Done

Bản demo được xem là sẵn sàng khi:

- [ ] Trang chủ chỉ hiển thị 3 nhân vật đã chốt.
- [ ] Mỗi nhân vật vào được trang chat riêng.
- [ ] Mỗi nhân vật có prompt/persona riêng.
- [ ] Gửi câu hỏi và nhận response streaming thành công.
- [ ] Ít nhất 3 câu hỏi demo đã được test trước.
- [ ] Có citation hoặc nguồn sử liệu ở cuối câu trả lời.
- [ ] README hướng dẫn chạy backend/frontend rõ ràng.
- [ ] `npm run lint` pass.
- [ ] `npm run build` pass.

## 11. Lịch làm việc gợi ý

### Ngày 1

- P1: Chốt backend, prompt, `/api/characters`, `/api/chat`.
- P2: Chốt UI trang chủ, trang chat, SSE rendering.
- Cuối ngày: Test end-to-end lần 1.

### Ngày 2

- P1: Sửa lỗi integration, polish prompt, cập nhật docs.
- P2: Làm RAG tối giản, đưa context vào backend hoặc chuẩn bị hàm retrieval.
- Cuối ngày: Test end-to-end lần 2 với RAG.

### Ngày 3

- Cả 2: Polish UI, kiểm thử build, chuẩn bị script demo.
- Đóng băng scope.
- Chạy thử demo như thật ít nhất 2 lần.
