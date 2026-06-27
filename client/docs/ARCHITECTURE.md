# ARCHITECTURE.md

## Mục đích tài liệu

Tài liệu này mô tả cấu trúc thư mục và kiến trúc frontend hiện tại của Sử Việt AI. Khi chỉnh sửa code frontend, hãy đọc tài liệu này cùng `PRODUCT.md`, `SCREENS.md`, `UI_SPEC.md`, `COMPONENTS.md` và `AI_CONTEXT.md`.

## Tổng quan kiến trúc

Frontend là một Next.js app nằm trong thư mục `client/`, dùng App Router, React client components và gọi backend Express qua HTTP/SSE.

Luồng dữ liệu chính:

`Page -> Component -> Hook/API helper -> Backend API -> UI state`

Luồng trải nghiệm chính:

`/ -> /chat/[id] -> useChat -> /api/chat streaming -> ChatMessage`

## Công nghệ

| Nhóm | Công nghệ hiện tại | Ghi chú |
| --- | --- | --- |
| Framework | Next.js 16 | Dùng App Router trong `client/app/`. |
| UI runtime | React 19 | Component hiện tại chủ yếu là function components. |
| UI library | shadcn/ui | Cấu hình qua `components.json`, component registry nằm trong `client/components/ui/`. |
| Styling | Tailwind CSS 4 + `globals.css` | Tailwind/PostCSS ở `tailwind.config.js` và `postcss.config.mjs`; token light theme nền trắng nằm trong `globals.css`. |
| Icons | `lucide-react` | Dùng icon Lucide trong button/action thay vì tự vẽ SVG nếu có icon phù hợp. |
| Lint | ESLint 9 + `eslint-config-next` | Chạy bằng `npm run lint` trong `client/`. |
| API | Fetch browser API | `GET /api/characters`, `POST /api/chat`. |
| Streaming | `ReadableStream` + SSE line parsing | Logic nằm trong `hooks/useChat.js`. |

## Cấu trúc thư mục

```text
client/
  app/
    layout.js
    page.js
    page.module.css
    globals.css
    chat/
      [id]/
        page.js
  components/
    ui/
      button.jsx
      card.jsx
      badge.jsx
      alert.jsx
      textarea.jsx
      ...
    CharacterCard.js
    ChatInput.js
    ChatMessage.js
    Disclaimer.js
    SuggestedQuestions.js
    TypingIndicator.js
  docs/
    PRODUCT.md
    FEATURES.md
    USER_FLOWS.md
    SCREENS.md
    UI_SPEC.md
    COMPONENTS.md
    ARCHITECTURE.md
    CONVENTIONS.md
    AI_CONTEXT.md
    TASK.md
  hooks/
    useChat.js
  public/
  utils/
    api.js
    mockData.js
  lib/
    utils.js
  components.json
  postcss.config.mjs
  tailwind.config.js
  eslint.config.mjs
  jsconfig.json
  next.config.mjs
  package.json
```

## Trách nhiệm từng khu vực

### `app/`

Chứa routes và styles cấp app.

- `app/page.js`: trang chủ, hero, disclaimer, gallery nhân vật.
- `app/chat/[id]/page.js`: trang chat theo nhân vật, fetch character detail, quản lý layout chat.
- `app/layout.js`: metadata và root layout.
- `app/globals.css`: Tailwind import, shadcn CSS variables, product design tokens, reset, utility `.container`, animation và responsive global.
- `app/page.module.css`: còn mang dấu vết template Next.js, hiện chưa phải nguồn styling chính.

### `components/`

Chứa UI components dùng lại. Component nên nhận dữ liệu qua props và hạn chế tự gọi API.

- `components/ui/*`: shadcn/ui components được tạo bằng CLI. Không sửa API public tùy tiện; nếu cần thêm component mới, ưu tiên `npx shadcn@latest add <component>`.
- `CharacterCard`: card chọn nhân vật ở gallery.
- `ChatInput`: textarea auto-grow và nút gửi.
- `ChatMessage`: render user/assistant bubble và chuyển metadata nguồn cho `SourceFactCheckBox`.
- `CharacterContext`: sidebar context nhân vật trong chat.
- `Disclaimer`: cảnh báo AI mô phỏng.
- `SourceFactCheckBox`: hiển thị metadata nguồn structured nếu backend trả về.
- `SuggestedQuestions`: chip câu hỏi gợi ý.
- `TypingIndicator`: trạng thái chờ chunk đầu tiên.

### `hooks/`

Chứa logic client-side có state/side effect phức tạp.

- `useChat`: gửi câu hỏi, đọc streaming response, quản lý `messages`, `currentResponse`, `isStreaming`, `error`.

### `utils/`

Chứa helper không phụ thuộc UI.

- `api.js`: cấu hình `API_BASE_URL`, lấy danh sách nhân vật và tìm chi tiết nhân vật.
- `mockData.js`: fallback nhân vật dùng chung khi backend lỗi/rỗng.

### `docs/`

Chứa tài liệu chỉ dẫn để AI và developer hiểu sản phẩm, tính năng, UI, component, kiến trúc và mục tiêu phiên làm việc.

## Routes và trách nhiệm

| Route | File | Trách nhiệm |
| --- | --- | --- |
| `/` | `app/page.js` | Load character list, fallback static data, render gallery. |
| `/chat/[id]` | `app/chat/[id]/page.js` | Resolve params, load character detail, render context/sidebar, quản lý chat surface. |

## Data flow trang chủ

1. `Home` khởi tạo `characters` bằng `STATIC_CHARACTERS`.
2. `useEffect` gọi `getCharacters()`.
3. Nếu backend trả data hợp lệ, cập nhật `characters`.
4. Nếu API lỗi, giữ fallback static và log warning.
5. Click `CharacterCard` điều hướng sang `/chat/[id]`.

## Data flow trang chat

1. `ChatPage` resolve `params` để lấy `characterId`.
2. Gọi `getCharacterDetails(characterId)`.
3. Nếu API lỗi, fallback theo `STATIC_CHARACTERS`.
4. `useChat(characterId)` quản lý hội thoại.
5. Người dùng gửi input hoặc suggested question.
6. `useChat` POST đến `${API_BASE_URL}/api/chat`.
7. Hook đọc stream từng dòng `data: ...`.
8. UI render `currentResponse` như assistant message đang stream.
9. Khi nhận `[DONE]`, hook commit assistant message vào `messages`.

## API contract frontend đang kỳ vọng

### `GET /api/characters`

Frontend kỳ vọng response là mảng character có tối thiểu:

```js
{
  id: 'tran_hung_dao',
  name: 'Trần Hưng Đạo',
  emoji: '⚔️',
  period: 'Thế kỷ XIII · Nhà Trần',
  shortBio: '...',
  topics: ['Chiến thuật'],
  suggestedQuestions: ['...'],
  color: '#ef4444'
}
```

### `POST /api/chat`

Request hiện tại:

```js
{
  characterId,
  messages
}
```

Response kỳ vọng là `text/event-stream`:

```text
data: {"text":"..."}
data: [DONE]
```

Nếu có lỗi, frontend có thể đọc `{"error":"..."}` từ event hoặc xử lý `response.ok === false`.

## State ownership

| State | Chủ sở hữu | Ghi chú |
| --- | --- | --- |
| Danh sách characters trang chủ | `app/page.js` | Có fallback static. |
| Character detail trang chat | `app/chat/[id]/page.js` | Có fallback static. |
| Messages/currentResponse/currentSources/error/lastFailedMessage | `hooks/useChat.js` | Không persist sau reload; có retry local cho message lỗi gần nhất. |
| Hover state card/chip | Component tương ứng | Local UI state. |
| API base URL | `utils/api.js` | Lấy từ `NEXT_PUBLIC_API_URL`. |

## Điểm kiến trúc cần cải thiện

1. Tiếp tục giảm CSS custom khi shadcn/Tailwind utility đã đủ rõ.
2. Dùng thêm shadcn components qua CLI nếu cần mở rộng UI, ví dụ `dialog`, `sheet`, `tabs`, `tooltip`.
3. Đồng bộ contract nguồn structured với backend để `SourceFactCheckBox` hiển thị dữ liệu thật hơn.
4. Kiểm tra visual bằng browser/screenshot sau mỗi thay đổi UI lớn.
