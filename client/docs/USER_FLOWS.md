# USER_FLOWS.md

## Luồng chính

`Gallery -> Context -> Chat -> Learn`

1. Người dùng vào trang chủ.
2. Người dùng xem thông điệp sản phẩm và disclaimer.
3. Người dùng chọn một nhân vật từ gallery.
4. App điều hướng sang `/chat/[id]`.
5. Người dùng đọc context ngắn trong sidebar: emoji, tên, thời kỳ, tiểu sử.
6. Người dùng bắt đầu bằng suggested question hoặc câu hỏi tự nhập.
7. Frontend gửi `characterId` và `messages` đến backend.
8. Câu trả lời của nhân vật stream từng phần vào UI.
9. Khi stream kết thúc, câu trả lời được thêm vào lịch sử hội thoại.
10. Người dùng đọc source/fact-check nếu có và hỏi tiếp.

## Luồng trang chủ

### Mục tiêu

Giúp người dùng hiểu ngay sản phẩm là "trò chuyện với nhân vật lịch sử Việt Nam" và chọn được nhân vật trong vài giây.

### Hành vi

- App thử gọi `GET /api/characters`.
- Nếu API trả về danh sách hợp lệ, hiện data backend.
- Nếu API lỗi hoặc rỗng, dùng `STATIC_CHARACTERS`.
- Mỗi card click được và điều hướng sang chat đúng ID.

### Nội dung bắt buộc mỗi card

- Emoji/avatar.
- Tên nhân vật.
- Thời kỳ.
- Tiểu sử ngắn.
- Topic chips.
- Màu nhận diện riêng.

## Luồng chat lần đầu

### Trạng thái ban đầu

- Sidebar desktop hiện profile nhân vật và disclaimer.
- Mobile cần hiện header gọn gồm back, tên nhân vật và nút reset.
- Message box hiện empty state.
- Suggested questions hiện ở vùng input khi `messages.length === 0 && !isStreaming`.

### Gửi suggested question

1. Người dùng click chip.
2. Chip gọi `sendMessage(question)`.
3. UI thêm user message vào list.
4. Input bị disabled khi `isStreaming`.
5. Typing indicator hiện đến khi chunk đầu tiên đến.
6. Assistant message stream nội dung bằng `currentResponse`.
7. Khi nhận `[DONE]`, assistant message được commit vào `messages`.

## Luồng nhập câu hỏi

1. Người dùng gõ câu hỏi trong textarea.
2. `Enter` gửi câu hỏi.
3. `Shift + Enter` xuống dòng.
4. Textarea auto-grow tối đa 120px.
5. Nút send disabled khi text rỗng hoặc đang stream.
6. Sau khi gửi, input clear.

## Luồng hỏi tiếp

- `useChat` gửi toàn bộ `messages` hiện tại kèm câu hỏi mới.
- Backend nên giới hạn 10 message gần nhất theo PRD nếu cần tiết kiệm token.
- Frontend không persist lịch sử; reload trang sẽ mất chat.

## Luồng xóa hội thoại

1. Người dùng bấm "Xóa hội thoại".
2. Frontend reset `messages`, `currentResponse`, `isStreaming`, `error`.
3. Empty state và suggested questions xuất hiện lại.

## Luồng lỗi kết nối

1. `fetch('/api/chat')` lỗi, response không ok, stream lỗi hoặc SSE event có `error`.
2. `useChat` set `error`.
3. Chat page hiện error box.
4. Người dùng có thể gửi lại bằng input, nhưng hiện chưa có nút retry riêng.

Cần cải tiến: lưu câu hỏi lỗi gần nhất và thêm nút `Thử lại`.

## Luồng không tìm thấy nhân vật

Hiện tại:

- Chat page gọi `getCharacterDetails(characterId)`.
- Nếu API lỗi, fallback static theo `characterId`.
- Nếu không có character, màn hình loading "Đang kết nối thư tịch cổ..." có thể bị giữ lâu.

Cần cải tiến:

- Nếu ID không tồn tại sau khi fetch/fallback, hiện not-found state với nút về trang chủ.

## Luồng source/fact-check

Hiện tại:

- `ChatMessage` tìm marker `📚` trong text.
- Phần trước marker là nội dung chính.
- Phần sau marker hiện như source box nhỏ.

Kỳ vọng theo PRD:

- Assistant response nên có nguồn sử liệu hoặc khuyến nghị tra cứu.
- Khi backend có RAG structured metadata, frontend nên hiện `source`, `topic`, `confidence`, `timePeriod`.
- Không hiện nguồn từ model tự bịa; chỉ hiện nguồn backend/retrieved chunks đã cung cấp.

