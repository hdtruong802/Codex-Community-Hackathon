# ⚔️ SửViệtAI

> Lịch sử Việt Nam không nằm trong sách giáo khoa bám bụi, nó sống động trong mỗi cuộc hội thoại.

**SửViệtAI** là một ứng dụng chat AI mô phỏng các nhân vật lịch sử Việt Nam, giúp học sinh và người đam mê lịch sử có thể trò chuyện trực tiếp với những gương mặt tiêu biểu của dân tộc trên các mặt trận quân sự, chủ quyền và văn học.

Dự án được xây dựng cho **Codex Community Hackathon 2026** (Track 3: IMPACT to Vietnam).

---

## 🎨 Tính năng nổi bật

1. **Trò chuyện trực tiếp (SSE Streaming)**: Phản hồi từ nhân vật lịch sử được stream theo thời gian thực (hiển thị từng từ) tạo cảm giác như nhân vật đang trả lời trực tiếp.
2. **3 Persona Nhân vật Lịch sử cho bản demo**:
   - ⚔️ **Trần Hưng Đạo** (Nhà quân sự vĩ đại)
   - 🏛️ **Lý Thường Kiệt** (Danh tướng nhà Lý)
   - 🌸 **Hồ Xuân Hương** (Bà chúa thơ Nôm)
3. **Gợi ý câu hỏi**: Mỗi nhân vật có các gợi ý câu hỏi liên quan đến cuộc đời và sự nghiệp để bắt đầu cuộc trò chuyện.
4. **Trích dẫn Sử liệu**: Mỗi phản hồi từ nhân vật đều đính kèm nguồn trích dẫn sử liệu cụ thể ở cuối để đảm bảo tính giáo dục và chính xác.
5. **Giao diện tối (Premium Dark Theme)**: Thiết kế hiện đại với hiệu ứng ánh sáng kính mờ (glassmorphism) và màu sắc đặc trưng cho từng nhân vật.

---

## 🛠️ Công nghệ sử dụng

- **Frontend (Client)**: Next.js 14+ (App Router, JavaScript, CSS Modules, globals.css)
- **Backend (Server)**: Node.js, Express, OpenAI SDK (model `gpt-4o`), dotenv
- **AI Integration**: OpenAI Chat Completions API with System Prompts

---

## 🚀 Setup & Installation

### 1. Cấu hình Backend (Express)
1. Di chuyển vào thư mục `server`:
   ```bash
   cd server
   ```
2. Cài đặt thư viện:
   ```bash
   npm install
   ```
3. Tạo file `.env` từ `server/.env.example` và điền OpenAI API Key của bạn:
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
4. Kiểm tra cấu hình backend:
   ```bash
   npm run check
   ```
5. Khởi chạy server ở chế độ development:
   ```bash
   npm run dev
   ```
   Server sẽ chạy tại `http://localhost:3001`.
   Health check: `http://localhost:3001/api/health`.

### 1.1. Tùy chọn: chạy RAG với Qdrant
1. Chạy Qdrant local:
   ```bash
   docker run -p 6333:6333 -v qdrant_storage:/qdrant/storage qdrant/qdrant
   ```
2. Kiểm tra kết nối Qdrant:
   ```bash
   npm run rag:health
   ```
3. Chạy dry-run ingestion để tạo report chunk/OCR:
   ```bash
   npm run rag:ingest:dry
   ```
   Nếu các PDF bị đưa vào `manual_review`, cài PyMuPDF rồi chạy lại:
   ```bash
   python -m pip install pymupdf
   ```
   RAG embeddings mặc định dùng local hash embedding, không cần OpenAI API key. Nếu muốn OCR local cho trang scan/image-heavy, cài Tesseract OCR và bật:
   ```env
   RAG_ENABLE_OCR=true
   RAG_OCR_PROVIDER=tesseract
   TESSERACT_LANG=vie+eng
   ```
4. Khi Qdrant đang chạy, index dữ liệu:
   ```bash
   npm run rag:ingest
   ```
5. Test retrieval:
   ```bash
   npm run rag:query -- tran_hung_dao "Trận Bạch Đằng năm 1288 diễn ra thế nào?"
   ```

### 2. Cấu hình Frontend (Next.js)
1. Di chuyển vào thư mục `client`:
   ```bash
   cd client
   ```
2. Cài đặt thư viện:
   ```bash
   npm install
   ```
3. Khởi chạy client ở chế độ development:
   ```bash
   npm run dev
   ```
   Client sẽ chạy tại `http://localhost:3000`.

---

## 🤝 Thành viên & Đóng góp
Dự án được xây dựng bởi team 2 thành viên:
- **P1 (Backend + Prompt Eng)**: Chịu trách nhiệm server, prompts và AI integration.
- **P2 (Frontend + UI/UX)**: Chịu trách nhiệm Next.js frontend, components và animations.

Chúc team chiến thắng! 🇻🇳
