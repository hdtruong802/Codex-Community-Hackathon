# BUILD_UI_PROMPT.md

## Mục đích tài liệu

Tài liệu này là prompt mẫu để dùng khi yêu cầu AI build giao diện frontend Sử Việt AI. Prompt được viết để giảm các lỗi thường gặp khi AI làm frontend: tự bịa UI đẹp nhưng sai product flow, component quá lớn, hard-code mock data, bỏ qua edge cases, UI không nhất quán và responsive làm sau nên bị vỡ.

## Prompt build giao diện

```text
Bạn là senior frontend engineer đang build UI cho Sử Việt AI trong thư mục `client/`.

Trước khi sửa code, hãy đọc và tuân thủ các tài liệu sau:

1. `docs/PRD.md`
2. `client/docs/PRODUCT.md`
3. `client/docs/SCREENS.md`
4. `client/docs/USER_FLOWS.md`
5. `client/docs/UI_SPEC.md`
6. `client/docs/COMPONENTS.md`
7. `client/docs/FEATURES.md`
8. `client/docs/ARCHITECTURE.md`
9. `client/docs/CONVENTIONS.md`
10. `client/docs/AI_CONTEXT.md`

Mục tiêu:

Build giao diện MVP cho Sử Việt AI, một web app cho phép người dùng chọn nhân vật lịch sử Việt Nam và trò chuyện với persona AI được mô phỏng có trách nhiệm.

UI foundation bắt buộc:

- Dùng shadcn/ui + Tailwind CSS 4 trong `client/`.
- Import primitive từ `@/components/ui/...`, ví dụ `Button`, `Card`, `Badge`, `Alert`, `Textarea`.
- Nếu thiếu primitive phổ biến, thêm bằng `npx shadcn@latest add <component>` trong `client/`.
- Dùng `lucide-react` cho icon trong action/button.
- Không tự tạo UI primitive trùng shadcn như `Button.js`, `Card.js`, `Alert.js`.

Luồng sản phẩm bắt buộc:

`Gallery -> Context -> Chat -> Learn`

Các route/màn hình cần ưu tiên:

1. `/` Character Gallery:
   - Hero ngắn, không phải landing page dài.
   - Disclaimer AI mô phỏng trước khi người dùng tương tác sâu.
   - Gallery 3 nhân vật.
   - Card có emoji/avatar, tên, thời kỳ, short bio, topic chips, màu nhận diện.
   - Click card điều hướng sang `/chat/[id]`.
   - Nếu API characters lỗi/rỗng, dùng static fallback.

2. `/chat/[id]` Chat theo nhân vật:
   - Header nhân vật có back, avatar/tên, thời kỳ, reset.
   - Desktop có sidebar context.
   - Mobile ẩn sidebar và dùng header gọn.
   - Message list có user bubble và assistant bubble.
   - Hiển thị streaming response bằng `currentResponse`.
   - Typing indicator khi đang chờ chunk đầu tiên.
   - Suggested questions khi chưa có message và không streaming.
   - Chat input auto-grow, `Enter` để gửi, `Shift + Enter` để xuống dòng.
   - Send disabled khi input rỗng hoặc đang streaming.
   - Error box thân thiện khi API lỗi.

3. Context nhân vật:
   - Có thể nằm trong sidebar của `/chat/[id]`, không bắt buộc là route riêng.
   - Hiển thị tiểu sử 1-2 đoạn, thời kỳ/triều đại, thành tựu/chủ đề chính, suggested questions và disclaimer ngắn.

4. Source/fact-check UI:
   - Nằm trong assistant message hoặc component riêng.
   - Nếu backend trả structured metadata, hiển thị `source`, `topic`, `confidence`, `timePeriod`.
   - Không bịa source ở frontend.
   - Nếu không có dữ liệu đáng tin, không làm như nội dung đã được kiểm chứng.

Acceptance Criteria:

- Người dùng vào `/`, hiểu ngay app dùng để trò chuyện với nhân vật lịch sử Việt Nam.
- Người dùng chọn được một nhân vật và được điều hướng sang đúng `/chat/[id]`.
- Người dùng thấy context nhân vật trước hoặc trong khi chat.
- Người dùng gửi được câu hỏi bằng input hoặc suggested question.
- Câu trả lời assistant stream từng phần và sau `[DONE]` được commit vào lịch sử local.
- UI phân biệt rõ user message và assistant message.
- Disclaimer AI mô phỏng xuất hiện ở trang chủ và trong context/chat.
- Source/fact-check chỉ hiển thị khi có dữ liệu hoặc contract rõ.
- Không có màn hình loading treo vô hạn nếu character ID không tồn tại.
- Có loading, empty, error, disabled states cho các flow chính.
- Layout không tràn ngang ở mobile 320px.
- Giao diện bám light theme nền trắng và design tokens hiện có trong `client/app/globals.css`.

Component rules:

- Mỗi component chỉ có một trách nhiệm rõ ràng.
- Component presentational nhận data qua props, không tự fetch nếu không cần.
- Page/route chịu trách nhiệm fetch data cấp màn hình và điều hướng.
- Hook chịu trách nhiệm side effects như streaming, abort, retry.
- Không tạo component quá lớn; nếu một file bắt đầu ôm nhiều vùng UI độc lập, hãy tách ra component nhỏ.
- Không trộn logic API, transform data và markup phức tạp trong cùng một component nếu có thể tách rõ.

Data rules:

- Không hard-code mock data rải rác trong component.
- Nếu cần fallback/mock, tách vào một module riêng, ưu tiên `client/utils/mockData.ts` hoặc module data dùng chung tương đương với cấu trúc repo hiện tại.
- Component nhận props theo shape rõ ràng.
- Character tối thiểu có `id`, `name`, `emoji`, `period`, `shortBio`, `topics`, `suggestedQuestions`, `color`.
- Message tối thiểu có `role` và `content`; nếu có source structured, dùng field riêng như `sources`, không nhét metadata vào plain text nếu backend đã hỗ trợ.

Edge cases phải xử lý:

- Loading danh sách nhân vật.
- API characters lỗi hoặc trả mảng rỗng.
- Character ID không tồn tại.
- Empty chat state.
- Suggested questions rỗng.
- Chat input rỗng.
- Chat input disabled khi streaming.
- Chat API lỗi.
- Stream lỗi giữa chừng.
- User retry sau lỗi nếu có `lastFailedMessage`.
- Source/fact-check thiếu dữ liệu.
- Mobile viewport 320px.
- Text dài trong chip, card, bubble, source box.
- Permission denied hoặc API key/backend chưa cấu hình: hiển thị lỗi thân thiện, không expose secret/stack trace.

Design rules:

- Bám `client/docs/UI_SPEC.md` như design system hiện tại.
- Dùng shadcn/ui cho primitive component và Tailwind utility cho spacing/layout/state.
- Dùng CSS variables trong `client/app/globals.css`: `--bg-primary`, `--bg-secondary`, `--bg-card`, `--bg-card-alt`, `--border`, `--text-primary`, `--text-secondary`, `--text-muted`, `--accent-purple`.
- Đồng bộ với shadcn tokens trong `globals.css`: `--background`, `--foreground`, `--card`, `--primary`, `--muted`, `--border`, `--ring`.
- Dùng màu nhân vật từ data `character.color`, không hard-code trong component nếu dữ liệu đã có.
- Light theme nền trắng trang trọng, gần gũi, phục vụ học lịch sử qua đối thoại.
- Không thêm landing page marketing dài trước gallery.
- Không dùng decoration làm lu mờ nhân vật và chat.
- Text tiếng Việt có dấu.
- Không gọi AI response là "sự thật chính thức".
- Button icon cần `aria-label` hoặc `title`.
- Focus state phải thấy được.

Responsive rules:

- Thiết kế responsive ngay từ đầu, không để cuối mới sửa.
- Gallery dùng grid responsive, không tràn ngang ở 320px.
- Chat desktop dùng sidebar + chat area.
- Chat mobile ẩn sidebar, dùng header gọn, message list và input chiếm đúng viewport.
- Suggested question chip phải wrap được.
- Source/fact-check text phải wrap được.
- Không dùng selector build hash hoặc CSS inject không ổn định.

Implementation rules:

- Bám cấu trúc Next.js App Router hiện tại trong `client/`.
- Ưu tiên sửa scoped files liên quan.
- Không thêm dependency nếu chưa thật sự cần.
- Không thay shadcn bằng primitive tự dựng; nếu cần component mới, dùng shadcn CLI.
- Không sửa backend nếu nhiệm vụ chỉ yêu cầu UI.
- Không phá streaming flow hiện có trong `useChat`.
- Không xóa disclaimer.
- Không revert thay đổi không phải của mình.

Verification:

- Chạy `npm run lint` trong `client/` nếu khả thi.
- Nếu có UI thay đổi, chạy app và kiểm tra ít nhất:
  - Desktop `/`.
  - Desktop `/chat/[id]`.
  - Mobile width 320px hoặc tương đương.
  - Empty chat, streaming, error và not-found states.
- Tóm tắt file đã sửa, hành vi đã đổi và phần chưa kiểm tra được.
```

## Checklist chống lỗi thường gặp

### 1. AI tự bịa UI đẹp nhưng sai product flow

Luôn đưa vào prompt:

- Luồng `Gallery -> Context -> Chat -> Learn`.
- Route ưu tiên `/` và `/chat/[id]`.
- Acceptance Criteria cụ thể.
- Yêu cầu không làm landing page dài trước gallery.

### 2. Component bị quá lớn

Luôn yêu cầu:

- Mỗi component chỉ có một trách nhiệm.
- Page giữ routing/fetching.
- Hook giữ side effects.
- Component presentational nhận props.
- Tách component khi một file ôm nhiều vùng UI độc lập.

### 3. Hard-code data/mock quá nhiều

Luôn yêu cầu:

- Không rải mock trong component.
- Tách fallback/mock vào module data dùng chung như `client/utils/mockData.ts` hoặc module tương đương.
- Component nhận `character`, `message`, `sources` qua props.

### 4. Không xử lý edge cases

Luôn liệt kê ít nhất:

- Loading.
- Empty.
- Error.
- Disabled.
- Not found.
- Permission denied/API key/backend chưa cấu hình.
- Stream lỗi giữa chừng.
- Text dài và màn hình mobile nhỏ.

### 5. UI không nhất quán

Luôn yêu cầu:

- Đọc `client/docs/UI_SPEC.md`.
- Dùng design tokens trong `client/app/globals.css`.
- Dùng shadcn/ui components thay vì tự dựng primitive.
- Dùng `character.color` từ data.
- Giữ light theme nền trắng, typography, spacing và copywriting thống nhất.

### 6. Responsive làm sau nên bị vỡ

Luôn yêu cầu:

- Responsive là acceptance criteria ngay từ đầu.
- Kiểm tra mobile 320px.
- Sidebar chat ẩn trên mobile.
- Suggested questions, source box và message dài phải wrap được.
- Không dùng selector build hash hoặc CSS inject không ổn định.
