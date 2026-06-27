# SửViệtAI

> Lịch sử Việt Nam không chỉ nằm trong những trang sách, mà có thể sống lại qua từng cuộc đối thoại.

**SửViệtAI** là ứng dụng chat AI mô phỏng các nhân vật lịch sử Việt Nam, giúp học sinh, giáo viên và người yêu lịch sử tiếp cận kiến thức theo cách gần gũi hơn: đặt câu hỏi, trò chuyện và nhận câu trả lời có ngữ cảnh từ những gương mặt tiêu biểu của dân tộc.

Dự án được phát triển tại **Codex Community Hackathon 2026** cho **Track 3: IMPACT to Vietnam**. Team SửViệtAI đạt **giải Nhì Track 3** với định hướng dùng AI để tạo tác động giáo dục tích cực cho Việt Nam.

Thông tin cuộc thi: [Codex Community Hackathon 2026](https://luma.com/h16o7bq4?tk=hnhI38)

## Ý tưởng

Việc học lịch sử thường gặp hai rào cản lớn: nội dung nhiều mốc sự kiện khó nhớ và khoảng cách cảm xúc giữa người học với nhân vật, bối cảnh. SửViệtAI thử giải quyết vấn đề đó bằng một trải nghiệm hội thoại, nơi người dùng có thể hỏi trực tiếp về chiến công, tư tưởng, tác phẩm, bối cảnh thời đại và nhận phản hồi theo giọng kể của từng nhân vật.

Ứng dụng không thay thế sách giáo khoa hay tài liệu nghiên cứu. Thay vào đó, SửViệtAI đóng vai trò như một lớp tương tác giúp người học khởi động sự tò mò, sau đó tiếp tục kiểm chứng qua các nguồn sử liệu được trích dẫn.

## Tính năng nổi bật

1. **Trò chuyện thời gian thực**: phản hồi được stream bằng SSE, tạo cảm giác nhân vật đang trả lời trực tiếp.
2. **Persona nhân vật lịch sử**: bản demo hỗ trợ Trần Hưng Đạo, Lý Thường Kiệt và Hồ Xuân Hương.
3. **Gợi ý câu hỏi theo nhân vật**: mỗi nhân vật có các câu hỏi mở đầu phù hợp với cuộc đời, sự nghiệp và bối cảnh lịch sử.
4. **Trích dẫn sử liệu**: phản hồi gắn với nguồn tham khảo để tăng tính giáo dục và giúp người dùng kiểm chứng thông tin.
5. **RAG với tư liệu lịch sử**: hệ thống có pipeline truy xuất ngữ cảnh từ tài liệu trong thư mục `docs`, hỗ trợ Qdrant và tuỳ chọn OCR.
6. **Giao diện hội thoại hiện đại**: trải nghiệm tối, tập trung vào nhân vật, câu hỏi và nội dung trả lời.

## Nhân vật trong bản demo

- **Trần Hưng Đạo**: nhà quân sự kiệt xuất gắn với các cuộc kháng chiến chống Nguyên - Mông.
- **Lý Thường Kiệt**: danh tướng nhà Lý, biểu tượng của tinh thần chủ quyền Đại Việt.
- **Hồ Xuân Hương**: nữ sĩ độc đáo của văn học trung đại Việt Nam, thường được gọi là Bà chúa thơ Nôm.

## Công nghệ

- **Frontend**: Next.js, React, CSS Modules
- **Backend**: Node.js, Express
- **AI**: OpenAI Chat Completions API, system prompts theo từng nhân vật
- **Retrieval**: Qdrant, pipeline chunking/ingestion, local hash embeddings hoặc OpenAI embeddings
- **OCR tuỳ chọn**: Tesseract hoặc OpenAI OCR model

## Chạy dự án

Hướng dẫn cài đặt, cấu hình môi trường và chạy local đã được tách sang [INSTALLATION.md](INSTALLATION.md).

## Tầm nhìn

SửViệtAI hướng tới một cách học lịch sử giàu tương tác hơn, nơi AI không chỉ trả lời câu hỏi mà còn khơi gợi người học tự tìm hiểu sâu hơn về nhân vật, văn bản và bối cảnh Việt Nam. Trong các phiên bản tiếp theo, dự án có thể mở rộng thêm nhân vật, nguồn tư liệu, chế độ học theo chủ đề và công cụ hỗ trợ giáo viên.
