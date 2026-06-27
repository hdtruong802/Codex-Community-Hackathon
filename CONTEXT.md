# SửViệtAI — Shared Project Context (Shared Brain)

Dự án chatbot mô phỏng 5 nhân vật lịch sử Việt Nam dành cho **Codex Community Hackathon 2026** (Track 3: IMPACT to Vietnam).

---

## ⚙️ Tech Stack & Ports

- **Frontend (Client)**: Next.js (App Router, JavaScript, Vanilla CSS / CSS Modules). Port: `3000`
- **Backend (Server)**: Node.js, Express, OpenAI SDK (GPT-4o API), dotenv. Port: `3001`
- **Database**: Stateless (không dùng Database để tối giản và tăng tốc độ triển khai).

---

## 📝 API Contract

### 1. Lấy danh sách nhân vật lịch sử
- **Endpoint**: `GET http://localhost:3001/api/characters`
- **Response**:
```json
[
  {
    "id": "tran_hung_dao",
    "name": "Trần Hưng Đạo",
    "emoji": "⚔️",
    "period": "Thế kỷ XIII · Nhà Trần",
    "shortBio": "Quốc công Tiết chế, 3 lần đánh bại quân Nguyên-Mông...",
    "topics": ["Chiến thuật", "Lãnh đạo", "Lòng yêu nước"],
    "suggestedQuestions": [
      "Trận nào trong 3 lần đánh Nguyên khó khăn nhất?",
      "Ngài viết Hịch tướng sĩ trong hoàn cảnh nào?",
      "Ngài có lời khuyên gì dành cho thế hệ trẻ ngày nay?"
    ],
    "color": "#ef4444"
  }
]
```

### 2. Chat với nhân vật (SSE Streaming)
- **Endpoint**: `POST http://localhost:3001/api/chat`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "characterId": "tran_hung_dao",
  "messages": [
    { "role": "user", "content": "Thưa ngài, trận Bạch Đằng diễn ra như thế nào?" }
  ]
]
```
- **Response**: Stream `text/event-stream`
```text
data: {"text": "Hỡi"}

data: {"text": " hậu"}

data: {"text": " thế..."}

data: [DONE]
```

---

## 🤝 Team Rules & Conventions

1. **Phân chia thư mục**:
   - P1 làm việc trong `server/` (Không tự ý sửa files trong `client/`).
   - P2 làm việc trong `client/` (Không tự ý sửa files trong `server/`).
   - `CONTEXT.md` là file duy nhất dùng chung ở root.
2. **Quy tắc Git**:
   - Làm việc trực tiếp trên branch `main`.
   - Pull trước khi bắt đầu code và push mỗi 30 phút.
   - Commit prefix: `[P1]` cho Backend, `[P2]` cho Frontend.
3. **Quy định viết code**:
   - Sử dụng **ES Modules** (`import/export`) cho cả client và server.
   - UI hiển thị bằng **Tiếng Việt**, comment trong code bằng **Tiếng Anh**.
   - Frontend dùng **CSS Modules** hoặc **Vanilla CSS**, không dùng Tailwind.
   - AI Assistant (Gemini/Claude) phải đọc file này đầu tiên để nắm thông tin.
