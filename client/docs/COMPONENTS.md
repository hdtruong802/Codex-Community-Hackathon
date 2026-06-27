# COMPONENTS.md

## Kiến trúc frontend hiện tại

Frontend là Next.js app trong `client/`, dùng App Router.

Thư mục chính:

- `client/app/`: routes và global styles.
- `client/components/`: UI components dùng lại.
- `client/components/ui/`: shadcn/ui registry components.
- `client/hooks/`: client-side state và side effects.
- `client/utils/`: API helpers.
- `client/lib/`: utility chung, hiện có `cn()` cho shadcn/Tailwind class merging.
- `client/docs/`: tài liệu chỉ dẫn frontend.

## UI foundation

Frontend dùng shadcn/ui thật, không dùng primitive tự dựng song song.

- Cấu hình shadcn nằm trong `client/components.json`.
- Tailwind CSS 4 cấu hình qua `client/tailwind.config.js`, `client/postcss.config.mjs` và `client/app/globals.css`.
- Components registry hiện có: `button`, `card`, `badge`, `alert`, `textarea`, `scroll-area`, `separator`.
- Khi cần primitive mới, chạy trong `client/`: `npx shadcn@latest add <component>`.
- Import chuẩn:

```js
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
```

## Routes

| Route | File | Vai trò |
| --- | --- | --- |
| `/` | `client/app/page.js` | Trang chủ, hero, disclaimer, gallery. |
| `/chat/[id]` | `client/app/chat/[id]/page.js` | Trang chat theo nhân vật. |

## API helpers

File: `client/utils/api.js`

- `API_BASE_URL`: lấy từ `NEXT_PUBLIC_API_URL`, fallback `http://localhost:3001`.
- `getCharacters()`: gọi `GET /api/characters`.
- `getCharacterDetails(id)`: lấy danh sách characters rồi find theo id.

Quy ước:

- Frontend nên có fallback để demo không vỡ khi API characters lỗi.
- Chat API không nằm trong `utils/api.js` mà nằm trong `useChat`; nếu mở rộng, cần cân nhắc gom logic network vào một lớp API helper riêng.

## Hook: `useChat`

File: `client/hooks/useChat.js`

Trả về:

- `messages`: lịch sử local của hội thoại.
- `currentResponse`: nội dung assistant đang stream.
- `currentSources`: metadata nguồn structured đang stream nếu backend trả.
- `isStreaming`: trạng thái đang gọi API.
- `error`: lỗi hiện tại.
- `lastFailedMessage`: câu hỏi gần nhất bị lỗi, dùng cho retry.
- `sendMessage(text)`: gửi user message.
- `retryLastMessage()`: gửi lại câu hỏi lỗi gần nhất.
- `clearHistory()`: reset hội thoại.

Hành vi:

1. Thêm user message vào state.
2. POST đến `${API_BASE_URL}/api/chat`.
3. Đọc stream bằng `response.body.getReader()`.
4. Parse từng dòng `data: ...`.
5. Cộng dồn `parsed.text` vào `currentResponse`.
6. Nếu stream có `sources` hoặc `metadata.sources`, lưu vào `currentSources`.
7. Khi `[DONE]`, thêm assistant message vào `messages` kèm `sources` nếu có.
8. Abort request khi component unmount.

Quy ước khi sửa:

- Không mutate `messages` trực tiếp.
- Nếu thêm cancel/retry, giữ `AbortController` trong ref.
- Nếu backend thêm metadata source, ưu tiên state shape rõ ràng thay vì trộn tất cả vào plain text.

## Components

### `CharacterCard`

Props:

- `character`: object có `id`, `name`, `emoji`, `period`, `shortBio`, `topics`, `color`.
- `onClick`: handler khi chọn nhân vật.

Trách nhiệm:

- Hiện thông tin tóm tắt của nhân vật.
- Tạo hover state riêng bằng màu nhân vật.
- Không tự điều hướng; route do parent xử lý.

### `Disclaimer`

Trách nhiệm:

- Cảnh báo đây là đối thoại AI mô phỏng.
- Nhắc rõ không thay thế sử liệu chính thống.

Quy ước:

- Nên được hiện ở trang chủ và trong chat/context.
- Không nên bị rút gọn đến mức mất ý nghĩa pháp lý/giao dục.

### `SuggestedQuestions`

Props:

- `questions`: mảng string.
- `onSelect(question)`: handler click.
- `color`: màu nhân vật.

Trách nhiệm:

- Hiện chip câu hỏi gợi ý.
- Click chip gửi câu hỏi qua handler của parent.

Quy ước:

- Component không tự biết về chat state.
- Parent quyết định lúc nào hiện/ẩn.

### `ChatInput`

Props:

- `onSend(text)`: gửi text đã trim.
- `placeholder`: text placeholder.
- `disabled`: khóa input khi đang stream.

Hành vi:

- `Enter` gửi.
- `Shift + Enter` xuống dòng.
- Auto-grow textarea tối đa 120px.
- Nút send disabled khi text rỗng hoặc component disabled.

### `ChatMessage`

Props:

- `message`: `{ role, content }`.
- `character`: character data để lấy emoji và color.

Hành vi hiện tại:

- User canh phải, assistant canh trái.
- Source/fact-check chỉ hiện qua `message.sources`.

Shape nguồn structured:

```js
{
  role: 'assistant',
  content: '...',
  sources: [
    {
      source: 'Đại Việt Sử Ký Toàn Thư',
      topic: 'Trận Bạch Đằng 1288',
      confidence: 'high',
      timePeriod: '1288'
    }
  ]
}
```

### `SourceFactCheckBox`

Props:

- `sources`: mảng metadata structured từ backend/RAG.
- `color`: màu nhân vật.

Trách nhiệm:

- Hiển thị `source`, `topic`, `confidence`, `timePeriod` nếu có.
- Không bịa nguồn ở frontend.
- Không hiện box nếu không có dữ liệu structured.

### `CharacterContext`

Props:

- `character`: character data.
- `onReset`: handler xóa hội thoại.

Trách nhiệm:

- Hiển thị avatar, tên, thời kỳ, bio, topic chips, achievement/context list.
- Dùng shadcn `Card`, `Badge`, `Button`.

### `NotFoundCharacter`

Trách nhiệm:

- Hiển thị state khi character ID không tồn tại sau API và fallback.
- Có action về trang chủ, không để loading treo.

### `TypingIndicator`

Props:

- `emoji`: emoji nhân vật.

Trách nhiệm:

- Hiện avatar và 3 dot bounce khi đang chờ chunk đầu tiên.

Quy ước:

- Chỉ hiện khi `isStreaming && !currentResponse`.
- Khi đã có `currentResponse`, dùng `ChatMessage` streaming.

## Mô hình dữ liệu frontend

Character tối thiểu:

```js
{
  id: 'tran_hung_dao',
  name: 'Trần Hưng Đạo',
  emoji: '⚔️',
  period: 'Thế kỷ XIII · Nhà Trần',
  shortBio: '...',
  topics: ['Chiến thuật', 'Lãnh đạo'],
  suggestedQuestions: ['...'],
  color: '#ef4444'
}
```

Message hiện tại:

```js
{
  role: 'user' | 'assistant',
  content: '...'
}
```

Message khi có RAG/source structured:

```js
{
  role: 'assistant',
  content: '...',
  evidenceStatus: 'supported' | 'insufficient' | 'unknown',
  sources: []
}
```

## Quy ước implement

1. Component presentational không tự gọi API.
2. Route/page giữ logic điều hướng và fetch data cấp màn hình.
3. Hook giữ side effect phức tạp như streaming chat.
4. Character color là dữ liệu sản phẩm, không hard-code trong component nếu đã có trong data.
5. Mỗi component có state hover/focus riêng nên đảm bảo keyboard/focus tương đương.
6. Ưu tiên shadcn/ui + Tailwind utility; dùng `globals.css` cho token/layout chung thay vì inline style lớn.
7. Không để UI phụ thuộc vào backend thành công nếu có fallback cần cho demo.
8. Không tạo primitive trùng với shadcn registry nếu có thể thêm bằng CLI.

## Component cần thêm theo PRD

- `HealthStatus` hoặc debug-only status cho demo nội bộ.
