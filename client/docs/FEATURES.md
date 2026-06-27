# FEATURES.md

Trạng thái tính năng được đánh giá dựa trên PRD và source frontend hiện tại.

## Quy ước trạng thái

- **Done:** đã có trong frontend và có luồng chạy rõ.
- **Partial:** đã có một phần, còn thiếu hành vi, edge case hoặc kết nối backend.
- **Planned:** có trong PRD nhưng chưa thấy trong frontend.
- **Out of scope:** không làm trong MVP.

## Bảng tính năng

| Tính năng | Trạng thái | Ghi chú frontend |
| --- | --- | --- |
| Character Gallery | Done | `/` hiện hero, disclaimer và danh sách card; có fallback static data. |
| Character Card | Done | Có emoji, tên, period, shortBio, topic chips, màu nhân vật và hover state. |
| Điều hướng đến chat | Done | Click card gọi `router.push('/chat/[id]')`. |
| Character Context | Partial | Có sidebar profile trong chat; chưa có context page riêng hoặc achievement list. |
| Chat Interface | Done | Có message list, user/assistant bubble, input, empty state và reset history. |
| Streaming Response | Done | `useChat` đọc `text/event-stream`, cập nhật `currentResponse` theo chunk. |
| Typing Indicator | Done | Hiện khi request đã gửi nhưng chưa có chunk. |
| Suggested Questions | Done | Hiện khi chưa có message; click gửi câu hỏi. |
| Conversation History | Partial | State nội bộ giữ messages và gửi lên API; chưa persist khi reload/chuyển trang. |
| Clear Conversation | Done | Nút xóa hội thoại reset local state. |
| Disclaimer | Done | Có banner ở trang chủ và sidebar chat. |
| Source/Fact-Check Box | Partial | `ChatMessage` tách source bằng marker `📚`; chưa có component source structured theo metadata. |
| Error State | Partial | Có error box khi API lỗi; chưa có nút retry riêng. |
| API fallback | Done | Gallery/chat fallback sang static characters khi backend character API lỗi. |
| RAG MVP | Planned | Thuộc backend; frontend chưa có debug source/retrieval view. |
| Guardrails lịch sử | Planned | Thuộc prompt/backend; frontend cần hiển thị disclaimer/source rõ. |
| Health Check UI | Planned | PRD có `/api/health`; frontend chưa dùng. |
| About Page | Planned | PRD nhắc About page, frontend chưa có route. |
| Frontend Screen Map | Done | `SCREENS.md` đã chuẩn hóa màn hình MVP, state bắt buộc và thứ tự ưu tiên build. |
| Mobile responsive | Partial | Có global responsive và một số mobile header, nhưng chat page đang inject CSS thủ công và cần verify lại. |
| Accessibility | Partial | Các button có hành vi cơ bản; chưa đầy đủ aria-label, focus state, keyboard polish. |

## Tính năng cốt lõi cần giữ khi refactor

1. Trang chủ phải load được ngay cả khi backend lỗi, bằng static fallback.
2. Chat phải stream được; không đổi thành loading-only nếu không có lý do.
3. Suggested questions phải gửi cùng một đường `sendMessage` với input tay.
4. Message assistant đang stream phải hiện như một message thật; sau `[DONE]` mới commit vào `messages`.
5. Disclaimer phải xuất hiện trước khi người dùng chat hoặc trong vùng chat.

## Ưu tiên tiếp theo cho frontend

1. Tách inline styles thành component styles hoặc CSS modules để responsive ổn định hơn.
2. Tạo `SourceFactCheckBox` nhận structured metadata thay vì parse marker `📚`.
3. Thêm retry action cho lỗi chat.
4. Đồng bộ danh sách nhân vật với PRD/backend, đặc biệt việc chọn Hồ Xuân Hương hay Nguyễn Thị Bình.
5. Thêm About/Impact page nếu cần cho demo pitch.
6. Kiểm tra mobile chat header vì CSS inject hiện tại phụ thuộc selector không ổn định.

## Thứ tự màn hình cần build

Chi tiết nằm trong `client/docs/SCREENS.md`. Tóm tắt ưu tiên:

1. `/` Character Gallery.
2. `/chat/[id]` gồm Context + Chat.
3. Source/fact-check UI trong assistant message.
4. Loading, error và not-found states.
5. Mobile responsive cho gallery/chat.
6. About/Impact page nếu còn thời gian.
7. Health/Debug status nếu cần cho demo nội bộ.

## Ngoài phạm vi MVP

- Auth.
- Database conversation history.
- User profile.
- Admin CMS.
- Payment.
- Multi-language UI.
