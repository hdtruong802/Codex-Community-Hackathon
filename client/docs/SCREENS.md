# SCREENS.md

## Mục đích tài liệu

Tài liệu này liệt kê các màn hình và trạng thái giao diện cần xây dựng cho frontend Sử Việt AI, dựa trên `docs/PRD.md` và bộ tài liệu trong `client/docs`.

Luồng sản phẩm cốt lõi:

`Gallery -> Context -> Chat -> Learn`

## Nguyên tắc phân loại

- **Màn hình MVP bắt buộc:** cần có để demo luồng chính ổn định.
- **State bắt buộc:** không nhất thiết là route riêng, nhưng phải có UI để app không bị treo hoặc vỡ trải nghiệm.
- **Nên có nếu còn thời gian:** hỗ trợ pitch, debug hoặc polish, nhưng không quan trọng hơn gallery/chat.

## Màn hình MVP bắt buộc

### 1. Trang chủ / Character Gallery

Route đề xuất: `/`

Mục tiêu:

- Giúp người dùng hiểu ngay sản phẩm là trò chuyện với nhân vật lịch sử Việt Nam.
- Cho phép chọn nhân vật trong vài giây.

Nội dung cần có:

- Hero ngắn với thông điệp sản phẩm.
- Disclaimer AI mô phỏng, đặt trước khi người dùng tương tác sâu.
- Gallery 3 nhân vật.
- Card nhân vật gồm emoji/avatar, tên, thời kỳ, tiểu sử ngắn, topic chips và màu nhận diện.
- Hover/click state rõ ràng.
- Click card điều hướng sang `/chat/[id]`.

Ghi chú:

- Không biến trang chủ thành landing page dài.
- Nếu `GET /api/characters` lỗi hoặc rỗng, dùng static fallback để demo vẫn chạy.

### 2. Trang chat theo nhân vật

Route đề xuất: `/chat/[id]`

Mục tiêu:

- Là màn hình lõi để người dùng hỏi đáp với persona lịch sử.
- Hiển thị được context, hội thoại, streaming response và nguồn/fact-check.

Nội dung cần có:

- Header nhân vật gồm avatar, tên, thời kỳ và nút quay lại.
- Sidebar/context trên desktop.
- Message list với user bubble và assistant bubble phân biệt rõ.
- Assistant message đang stream bằng `currentResponse`.
- Typing indicator trước khi nhận chunk đầu tiên.
- Suggested questions khi chưa có hội thoại.
- Input textarea auto-grow, gửi bằng `Enter`, xuống dòng bằng `Shift + Enter`.
- Nút gửi disabled khi input rỗng hoặc đang stream.
- Nút xóa hội thoại/reset.
- Error box khi API chat lỗi.

Ghi chú:

- Input nên bị khóa khi đang stream nếu backend chưa hỗ trợ cancel/parallel request.
- Lịch sử hội thoại hiện chỉ cần giữ trong state local; không persist trong MVP.

### 3. Context nhân vật

Route đề xuất: không bắt buộc là route riêng; có thể gộp vào `/chat/[id]`.

Mục tiêu:

- Cho người dùng đủ bối cảnh trước hoặc trong khi chat.
- Giữ trải nghiệm học lịch sử, không chỉ là chatbot giải trí.

Nội dung cần có:

- Tiểu sử 1-2 đoạn ngắn.
- Thời kỳ/triều đại hoặc time period banner.
- Thành tựu/chủ đề chính.
- Suggested questions theo nhân vật.
- Disclaimer ngắn về AI mô phỏng.

Ghi chú:

- PRD mô tả Context như một bước trong flow, nhưng frontend hiện tại hợp lý khi gộp vào sidebar chat.
- Nếu sau này tách route riêng, vẫn phải giữ đường vào chat nhanh và rõ.

### 4. Source / Fact-check UI

Route đề xuất: không phải route riêng; nằm trong assistant message hoặc panel liên quan.

Mục tiêu:

- Giúp người dùng phân biệt nội dung mô phỏng với thông tin có nguồn/khuyến nghị tra cứu.
- Giảm rủi ro AI bịa sự kiện, bịa nguồn hoặc tạo cảm giác chắc chắn giả.

Nội dung cần có:

- Vùng source/fact-check ở cuối assistant response khi có dữ liệu.
- Nếu backend có metadata structured, hiển thị tối thiểu `source`, `topic`, `confidence`, `timePeriod`.
- Nếu không có nguồn đáng tin, hiển thị trạng thái thiếu dữ liệu hoặc không hiển thị source box.

Ghi chú:

- Không bịa source ở frontend.
- Không khẳng định AI response là sử liệu chính thống.
- Nên tách thành component `SourceFactCheckBox` khi backend có contract rõ.

## State bắt buộc để demo không vỡ

### 5. Loading state

Nơi xuất hiện:

- Trang chủ khi đang load danh sách nhân vật.
- Trang chat khi đang load chi tiết nhân vật.
- Chat khi đã gửi câu hỏi nhưng chưa có chunk đầu tiên.

Yêu cầu:

- Dùng copy ngắn, thân thiện, không cần skeleton phức tạp.
- Không để loading giữ mãi nếu nhân vật không tồn tại.

### 6. Error state

Nơi xuất hiện:

- Gallery/API characters lỗi.
- Chat API lỗi, response không ok, stream lỗi hoặc SSE trả error.

Yêu cầu:

- Gallery nên fallback sang static data.
- Chat cần error box rõ ràng và thân thiện.
- Nên có retry cho câu hỏi lỗi gần nhất.
- Không expose stack trace, secret hoặc lỗi nội bộ quá chi tiết.

### 7. Not-found character state

Nơi xuất hiện:

- `/chat/[id]` với character ID không tồn tại sau cả API và fallback.

Yêu cầu:

- Hiển thị thông báo không tìm thấy nhân vật.
- Có nút quay về trang chủ.
- Không giữ màn hình loading vô hạn.

### 8. Mobile chat view

Nơi xuất hiện:

- Cùng route `/chat/[id]`, qua responsive layout.

Yêu cầu:

- Ẩn sidebar trên mobile.
- Header mobile gồm back, avatar/tên nhân vật và reset.
- Message list và input chiếm đúng chiều cao viewport.
- Suggested questions, source box và long message không tràn ngang ở 320px.
- Input không bị che hoặc đẩy layout lộn xộn nếu có thể.

## Nên có nếu còn thời gian

### 9. About / Impact page

Route đề xuất: `/about`

Mục tiêu:

- Hỗ trợ pitch hackathon.
- Giải thích vấn đề, giải pháp, công nghệ, impact và giới hạn của AI mô phỏng.

Nội dung nên có:

- Vấn đề học Sử khô và thiếu tương tác.
- Giải pháp đối thoại với nhân vật lịch sử.
- Guardrails, source/fact-check và disclaimer.
- Tác động kỳ vọng với học sinh, giáo viên, phụ huynh.

Ghi chú:

- Không ưu tiên hơn luồng `/ -> /chat/[id]`.
- About page phải nhắc rõ sản phẩm không thay thế sử liệu chính thống.

### 10. Health / Debug status UI

Route hoặc vị trí đề xuất:

- Debug-only panel, trạng thái nhỏ trong app, hoặc trang nội bộ nếu thật sự cần.

Mục tiêu:

- Hỗ trợ demo và debug backend.
- Kiểm tra `GET /api/health` và số lượng nhân vật khả dụng.

Ghi chú:

- Không nên làm nổi bật trong trải nghiệm người dùng cuối.
- Không ưu tiên hơn loading/error/not-found states.

## Thứ tự ưu tiên build

1. `/` Character Gallery.
2. `/chat/[id]` gồm Context + Chat.
3. Source/fact-check UI trong assistant message.
4. Loading, error và not-found states.
5. Mobile responsive cho gallery/chat.
6. About page nếu còn thời gian.
7. Health/debug status nếu cần cho demo nội bộ.

## Quyết định cần chốt

PRD ban đầu dùng 3 nhân vật MVP:

- Trần Hưng Đạo.
- Hồ Xuân Hương.
- Lý Thường Kiệt.

Frontend docs/source hiện tại ghi nhận fallback đang dùng:

- Trần Hưng Đạo.
- Lý Thường Kiệt.
- Nguyễn Thị Bình.

Trước khi implement sâu, cần chốt danh sách nhân vật chính thức để đồng bộ UI, backend data, prompt, suggested questions và demo script.
