# AI_CONTEXT.md

## Mục đích tài liệu

Tài liệu này là bộ quy tắc mà AI coding agent phải tuân theo khi chỉnh sửa frontend Sử Việt AI.

## Bối cảnh sản phẩm

Sử Việt AI là web app giúp người dùng trò chuyện với nhân vật lịch sử Việt Nam được mô phỏng bằng AI. Mục tiêu không phải thay thế sử liệu chính thống, mà là khơi gợi tò mò và làm lịch sử dễ tiếp cận hơn qua đối thoại.

Luồng sản phẩm cốt lõi:

`Gallery -> Context -> Chat -> Learn`

## Tài liệu cần đọc trước khi sửa code frontend

1. `client/docs/PRODUCT.md`
2. `client/docs/FEATURES.md`
3. `client/docs/USER_FLOWS.md`
4. `client/docs/SCREENS.md`
5. `client/docs/BUILD_UI_PROMPT.md`
6. `client/docs/UI_SPEC.md`
7. `client/docs/COMPONENTS.md`
8. `client/docs/ARCHITECTURE.md`
9. `client/docs/CONVENTIONS.md`
10. `client/docs/TASK.md`

Nếu thay đổi liên quan PRD hoặc persona, đọc thêm `docs/PRD.md`.

## Nguyên tắc bắt buộc

1. Không phá luồng lõi: trang chủ chọn nhân vật, vào chat, gửi câu hỏi, nhận streaming response.
2. Không xóa disclaimer hoặc làm nó khó thấy trong flow chat.
3. Không làm UI khẳng định AI response là sự thật chính thức.
4. Không bịa source/fact-check ở frontend.
5. Không hard-code dữ liệu nhân vật ở nhiều nơi hơn hiện trạng; nếu refactor, gom lại module dùng chung.
6. Không thêm dependency nếu chưa thật sự cần.
7. Không sửa backend khi nhiệm vụ chỉ yêu cầu frontend, trừ khi user yêu cầu rõ.
8. Không revert thay đổi không phải của mình.

## Ưu tiên khi chỉnh frontend

Thứ tự ưu tiên:

1. Sản phẩm đúng: giữ tinh thần học lịch sử qua đối thoại có trách nhiệm.
2. Luồng demo ổn định: không làm hỏng gallery/chat/streaming.
3. Màn hình đúng scope: bám `SCREENS.md`, ưu tiên `/`, `/chat/[id]`, context, source/fact-check và state chống vỡ demo.
4. Mobile usable: không tràn ngang, không che input/message.
5. Code dễ tiếp tục: component rõ trách nhiệm, ít side effect lẫn trong UI.

## Khi sửa UI

- Bám `UI_SPEC.md`.
- Dùng dark theme và CSS variables hiện có.
- Card chỉ dùng cho item, panel, modal hoặc tool surface thật sự.
- Không thêm landing page dài trước gallery.
- Không dùng decoration làm lu mờ nhân vật/chat.
- Button icon cần label accessibility.
- Text tiếng Việt phải có dấu.
- Không để text tràn khỏi button, chip, card hoặc chat bubble.

## Khi sửa component

- Bám `COMPONENTS.md`.
- Component presentational nhận props, không tự fetch nếu không cần.
- Page chịu trách nhiệm điều hướng và fetch data cấp route.
- Hook chịu trách nhiệm streaming/network side effects.
- Nếu component mới dùng nhiều nơi, đặt trong `client/components/`.
- Nếu logic mới không phụ thuộc UI, đặt trong `client/utils/`.

## Khi sửa chat/streaming

- Giữ `currentResponse` để render assistant message đang stream.
- Giữ xử lý `[DONE]`.
- Giữ error state thân thiện.
- Không gửi nhiều request song song nếu chưa có cơ chế cancel/queue.
- Dọn request bằng `AbortController` khi unmount.
- Nếu thêm retry, lưu message lỗi gần nhất rõ ràng.

## Khi sửa source/fact-check

- Không parse nguồn từ nội dung tự do nếu backend đã có metadata structured.
- Chỉ hiển thị nguồn do backend/RAG cung cấp hoặc text đã được contract xác định.
- Nếu không có nguồn đáng tin, hiển thị trạng thái thiếu dữ liệu thay vì làm như đã kiểm chứng.
- Không bịa tên sách, năm, trích dẫn hoặc độ tin cậy ở frontend.

## Khi sửa dữ liệu nhân vật

- Đồng bộ `id`, `name`, `emoji`, `period`, `shortBio`, `topics`, `suggestedQuestions`, `color`.
- Lưu ý lệch hiện tại: PRD ban đầu nhắc Hồ Xuân Hương, nhưng frontend hiện có Nguyễn Thị Bình.
- Nếu thay danh sách nhân vật, cập nhật docs liên quan và kiểm tra route `/chat/[id]`.

## Khi hoàn tất thay đổi

Với docs:

- Đảm bảo tiếng Việt có dấu.
- Kiểm tra Markdown table/code fence.
- Chạy `git diff --check`.

Với code:

- Chạy `npm run lint` trong `client/` nếu khả thi.
- Nếu có UI thay đổi, chạy app và kiểm tra desktop/mobile.
- Tóm tắt rõ file đã sửa, hành vi đã đổi, phần chưa kiểm tra được.

## Các lỗi cần tránh

- Tạo CSS responsive bằng selector hash sinh tự động.
- Để màn hình loading treo vô hạn khi character ID không tồn tại.
- Để source box phụ thuộc vào emoji marker nếu backend đã có metadata.
- Làm suggested questions biến mất khỏi luồng lần đầu.
- Làm input gửi được khi đang stream mà không có xử lý concurrency.
- Thêm câu chữ không dấu vào tài liệu hoặc UI copy tiếng Việt.
