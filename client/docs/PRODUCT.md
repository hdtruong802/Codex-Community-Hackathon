# PRODUCT.md

## Tên sản phẩm

**Sử Việt AI** là web app trò chuyện lịch sử Việt Nam, cho phép người dùng đối thoại với các nhân vật lịch sử được mô phỏng bằng AI.

Sản phẩm biến việc học lịch sử từ dạng đọc, chép, ghi nhớ thành một trải nghiệm hỏi đáp sống động:

`Gallery -> Character Context -> Chat -> Learn`

## Thông điệp cốt lõi

> 4000 năm lịch sử không nên nằm trong sách giáo khoa bám bụi. Nó nên sống trong mỗi cuộc trò chuyện.

## Vấn đề cần giải quyết

Nhiều học sinh và người trẻ cảm thấy môn Sử khô, nặng ghi nhớ mốc thời gian và thiếu tính tương tác. Sách giáo khoa khó tạo cảm giác "con người thật, lựa chọn thật, cảm xúc thật" của nhân vật lịch sử.

AI có thể làm lịch sử trở nên gần hơn, nhưng phải có guardrails để tránh bịa sự kiện, bịa nguồn hoặc làm người dùng hiểu nhầm rằng nhân vật đang phát ngôn thật.

## Đối tượng người dùng

- Học sinh THCS/THPT muốn học lịch sử theo cách bớt khô khan.
- Sinh viên và người trẻ quan tâm văn hóa, lịch sử, danh nhân Việt Nam.
- Giáo viên cần công cụ gợi mở thảo luận hoặc hoạt động hỏi đáp.
- Phụ huynh muốn khơi gợi hứng thú lịch sử cho con.
- Giám khảo hackathon cần thấy được impact, demo và khả năng ship MVP.

## Giá trị sản phẩm

- **Lịch sử thành đối thoại:** người dùng được hỏi điều mình tò mò thay vì chỉ đọc nội dung có sẵn.
- **Nhân vật có cá tính:** mỗi persona có giọng nói, chủ đề và thế giới quan riêng.
- **Dễ bắt đầu:** suggested questions giúp người dùng không bị trống câu hỏi.
- **Có trách nhiệm:** disclaimer, source/fact-check và guardrails giảm rủi ro hiểu sai lịch sử.
- **Phù hợp demo hackathon:** luồng lõi ngắn, dễ nhìn thấy wow factor trong vài phút.

## MVP hiện tại theo frontend

Frontend hiện tại là Next.js app có 2 màn hình chính:

- Trang chủ `/`: hero, disclaimer, gallery nhân vật.
- Trang chat `/chat/[id]`: sidebar context, message list, suggested questions, input, streaming state.

Danh sách màn hình/state cần xây dựng được chuẩn hóa trong `client/docs/SCREENS.md`. Scope ưu tiên là:

1. `/` Character Gallery.
2. `/chat/[id]` gồm Context + Chat.
3. Source/fact-check UI trong assistant message.
4. Loading, error, not-found và mobile states để demo không vỡ.
5. About/Impact page và Health/Debug UI nếu còn thời gian.

Nhân vật đang được frontend fallback:

| ID | Tên | Vai trò trải nghiệm | Màu |
| --- | --- | --- | --- |
| `tran_hung_dao` | Trần Hưng Đạo | Quân sự, lãnh đạo, Hào khí Đông A | Đỏ |
| `ly_thuong_kiet` | Lý Thường Kiệt | Chủ quyền, chiến lược phòng thủ chủ động | Xanh lá |
| `nguyen_thi_binh` | Nguyễn Thị Bình | Ngoại giao, hòa bình, Hiệp định Paris | Xanh cyan |

Lưu ý sản phẩm: PRD ban đầu nhắc Hồ Xuân Hương là nhân vật MVP, nhưng source frontend hiện tại đang dùng Nguyễn Thị Bình. Khi implement tiếp, cần quyết định một danh sách nhân vật chính thức và đồng bộ PRD, backend data, prompt, suggested questions và demo script.

## Nguyên tắc sản phẩm

1. Không biến nhân vật thành chatbot trung tính. Câu trả lời phải có giọng persona.
2. Không để persona "diễn hay" bằng cách bịa sự kiện, năm tháng, trích dẫn hoặc nguồn.
3. Disclaimer phải hiện diện rõ trong các màn hình có tương tác AI.
4. Chat là trải nghiệm cốt lõi; mọi thay đổi UI phải ưu tiên tốc độ hỏi đáp và khả năng demo ổn định.
5. Frontend phải hiển thị được trạng thái đang tải, đang stream, lỗi kết nối và nguồn/fact-check khi backend trả về.

## Ngoài phạm vi MVP

- Đăng nhập và tài khoản cá nhân.
- Lưu hội thoại bằng database.
- CMS quản trị nội dung.
- Vector database production-grade.
- Kiểm chứng học thuật hoàn chỉnh.
- Đa ngôn ngữ.
- Thanh toán hoặc subscription.
