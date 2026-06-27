# COMPONENTS.md

## Kiến trúc frontend hiện tại

Frontend là Next.js app trong `client/`, dùng App Router.

Thư mục chính:

- `client/app/`: routes và global styles.
- `client/components/`: UI components dùng lại.
- `client/hooks/`: client-side state và side effects.
- `client/utils/`: API helpers.
- `client/docs/`: tài liệu chỉ dẫn frontend.

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
- `isStreaming`: trạng thái đang gọi API.
- `error`: lỗi hiện tại.
- `sendMessage(text)`: gửi user message.
- `clearHistory()`: reset hội thoại.

Hành vi:

1. Thêm user message vào state.
2. POST đến `${API_BASE_URL}/api/chat`.
3. Đọc stream bằng `response.body.getReader()`.
4. Parse từng dòng `data: ...`.
5. Cộng dồn `parsed.text` vào `currentResponse`.
6. Khi `[DONE]`, thêm assistant message vào `messages`.
7. Abort request khi component unmount.

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
- Parse marker `📚` để tách source/fact-check.

Cần nâng cấp:

- Thay `parseContent` bằng props structured, vì marker text dễ gây lỗi nếu model sinh emoji ngoài ý muốn.
- Đề xuất shape mới:

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

Message đề xuất khi có RAG/source structured:

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
6. Nếu thêm CSS, ưu tiên className ổn định/CSS module thay vì inject style theo selector build hash.
7. Không để UI phụ thuộc vào backend thành công nếu có fallback cần cho demo.

## Component cần thêm theo PRD

- `SourceFactCheckBox`: hiện sources/độ tin cậy/có dữ liệu hay không.
- `CharacterContext`: hiện period, achievements, topics, suggested questions ngoài sidebar nếu cần.
- `RetryMessageButton`: gửi lại message bị lỗi.
- `NotFoundCharacter`: khi route ID không hợp lệ.
- `HealthStatus` hoặc debug-only status cho demo nội bộ.
