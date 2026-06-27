# ⚔️ SửViệtAI

> Lịch sử Việt Nam không nằm trong sách giáo khoa bám bụi, nó sống động trong mỗi cuộc hội thoại.

**SửViệtAI** là một ứng dụng chat AI mô phỏng các nhân vật lịch sử Việt Nam, giúp học sinh và người đam mê lịch sử có thể trò chuyện trực tiếp với những gương mặt tiêu biểu của dân tộc trên các mặt trận quân sự, chủ quyền và ngoại giao.

Dự án được xây dựng cho **Codex Community Hackathon 2026** (Track 3: IMPACT to Vietnam).

---

## 🎨 Tính năng nổi bật

1. **Trò chuyện trực tiếp (SSE Streaming)**: Phản hồi từ nhân vật lịch sử được stream theo thời gian thực (hiển thị từng từ) tạo cảm giác như nhân vật đang trả lời trực tiếp.
2. **3 Persona Nhân vật Lịch sử cho bản demo**:
   - ⚔️ **Trần Hưng Đạo** (Nhà quân sự vĩ đại)
   - 🏛️ **Lý Thường Kiệt** (Danh tướng nhà Lý)
   - 🕊️ **Nguyễn Thị Bình** (Nhà ngoại giao, đại diện tại Hội nghị Paris)
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
3. Tạo file `.env` từ `.env.example` và điền OpenAI API Key của bạn:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   PORT=3001
   ```
4. Khởi chạy server ở chế độ development:
   ```bash
   npm run dev
   ```
   Server sẽ chạy tại `http://localhost:3001`.

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
