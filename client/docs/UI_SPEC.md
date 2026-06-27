# UI_SPEC.md

## Hướng thiết kế

Sử Việt AI dùng dark theme hiện đại, có cảm giác trang trọng nhưng vẫn gần gũi. UI phải phục vụ trải nghiệm hỏi đáp lịch sử, không biến thành landing page marketing dài.

Màn hình đầu tiên phải giúp người dùng làm được việc chính: chọn nhân vật và bắt đầu chat.

## Design tokens hiện tại

Tokens nằm trong `client/app/globals.css`.

| Token | Giá trị | Mục đích |
| --- | --- | --- |
| `--bg-primary` | `#0a0a0f` | Nền app |
| `--bg-secondary` | `#0e0e16` | Nền phụ |
| `--bg-card` | `#1a1a2e` | Card, chat panel |
| `--bg-card-alt` | `#16162a` | Input, panel phụ |
| `--border` | `#2a2a40` | Border mặc định |
| `--text-primary` | `#e8e8f0` | Text chính |
| `--text-secondary` | `#9ca3af` | Text phụ |
| `--text-muted` | `#6b7280` | Label/empty state |
| `--accent-purple` | `#8b5cf6` | Accent sản phẩm |

Màu nhân vật hiện tại:

- Trần Hưng Đạo: `#ef4444`.
- Lý Thường Kiệt: `#10b981`.
- Nguyễn Thị Bình: `#06b6d4`.

Nếu quay lại Hồ Xuân Hương theo PRD, đề xuất dùng `#ec4899` hoặc `#f43f5e`.

## Typography

- UI/body: `Inter`.
- Code/data/debug: `JetBrains Mono`.
- Thơ, trích dẫn, đoạn văn cần chất văn học: `Noto Serif`.

Quy tắc:

- Body text trong chat: khoảng `0.88rem`, line-height `1.5`.
- Label metadata: `0.72rem - 0.78rem`, uppercase chỉ dùng cho period/label ngắn.
- Không dùng font-size scale theo viewport width.
- Không để letter spacing âm; nếu cần nhấn mạnh metadata, dùng letter spacing nhẹ dương như hiện tại.

## Layout

### Trang chủ

- Container tối đa `1200px`.
- Hero cần ngắn gọn, không chiếm hết màn hình.
- Gallery dùng grid responsive: `repeat(auto-fill, minmax(320px, 1fr))`.
- Disclaimer nằm trước gallery để người dùng thấy trước khi tương tác.

### Trang chat desktop

- Layout 2 cột: sidebar `320px`, chat area `1fr`.
- Chiều cao chat nên gần full viewport để message list scroll riêng.
- Sidebar chứa context và disclaimer; chat area chứa message, error, suggested questions và input.

### Trang chat mobile

- Sidebar ẩn đi.
- Header mobile hiện back, avatar/tên nhân vật và reset.
- Message list và input phải chiếm đủ chiều cao viewport, không bị body scroll lộn xộn.
- Cần tránh CSS inject bằng selector không ổn định; ưu tiên className/CSS module.

## Hành vi component

### Character card

- Toàn card click được.
- Hover: nâng nhẹ, đổi border theo màu nhân vật, emoji scale nhẹ.
- Bio ngắn, không quá 3-4 dòng nếu có thể.
- Topic chips wrap được và không làm card bị vỡ layout.

### Chat message

- User bubble canh phải, assistant bubble canh trái.
- Assistant có avatar emoji nhân vật.
- Max width bubble khoảng `80%` trên desktop; mobile có thể tăng lên `92%`.
- Text dùng `white-space: pre-wrap` để giữ xuống dòng.
- Source/fact-check nằm trong bubble assistant, tách bằng border dashed hoặc component riêng.

### Chat input

- Textarea auto-grow, tối đa 120px.
- `Enter` gửi, `Shift + Enter` xuống dòng.
- Send button là icon button, disabled khi rỗng/đang stream.
- Khi đang stream, input disabled để tránh request chen nhau nếu backend chưa hỗ trợ cancel/parallel.

### Suggested questions

- Chỉ hiện khi chưa có message và không streaming.
- Dùng chip button nhỏ, wrap được.
- Click chip gửi ngay câu hỏi.
- Text chip phải là câu hỏi thật, không phải mô tả tính năng.

### Loading/typing

- Khi load character: dùng message ngắn, không dùng skeleton phức tạp.
- Khi chat đã gửi nhưng chưa có chunk: hiện typing indicator.
- Khi đã có chunk: thay typing indicator bằng assistant bubble streaming.

### Error

- Error phải nói rõ hành động người dùng có thể làm: kiểm tra backend/API key, thử lại.
- Không expose stack trace hoặc chi tiết secret.
- Nên thêm retry button khi có `lastFailedMessage`.

## Copywriting

- Giao diện nói tiếng Việt mặc định.
- Giọng văn: trang trọng, dễ hiểu, có cảm hứng lịch sử nhưng không khoa trương.
- Không gọi AI response là "sự thật chính thức".
- Luôn phân biệt "mô phỏng" với "sử liệu".

## Accessibility

- Tất cả button icon cần có `title` hoặc `aria-label`.
- Focus state phải thấy được trên keyboard.
- Màu text trên nền tối phải đảm bảo contrast tốt.
- Emoji không nên là thông tin duy nhất để phân biệt nhân vật; luôn có tên text.
- Input disabled phải có visual state rõ.

## Responsive checklist

- Gallery card không tràn ngang ở 320px width.
- Chat header mobile không che message đầu tiên.
- Input không bị bàn phím mobile che hoàn toàn nếu có thể.
- Long suggested question wrap thành nhiều dòng mà không tràn chip.
- Source/fact-check text wrap được.

## Không nên làm

- Không thêm landing page dài trước khi vào gallery.
- Không dùng decorative UI làm lu mờ nhân vật và chat.
- Không để disclaimer biến mất khỏi flow chat.
- Không hard-code CSS selector sinh từ build hash.
- Không hiện source/fact-check nếu không có dữ liệu đáng tin.
