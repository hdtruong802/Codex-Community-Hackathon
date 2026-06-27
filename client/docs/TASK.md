# TASK.md

## Mục tiêu phiên làm việc hiện tại

Hoàn thiện bộ tài liệu chỉ dẫn frontend trong `client/docs` trước khi tiến hành implement code.

## Phạm vi hiện tại

Đã tạo và chuẩn hóa các tài liệu nền:

- `PRODUCT.md`: AI hiểu sản phẩm đang xây dựng.
- `FEATURES.md`: danh sách và trạng thái tính năng.
- `USER_FLOWS.md`: luồng thao tác của người dùng.
- `SCREENS.md`: danh sách màn hình/state cần xây dựng cho frontend.
- `BUILD_UI_PROMPT.md`: prompt mẫu để yêu cầu AI build giao diện đúng product flow, component scope, data, edge cases, design tokens và responsive.
- `UI_SPEC.md`: quy tắc UI/UX và hành vi giao diện.
- `COMPONENTS.md`: kiến trúc và quy ước component.

Cần bổ sung trong lượt này:

- `ARCHITECTURE.md`: cấu trúc thư mục và kiến trúc frontend.
- `CONVENTIONS.md`: coding style, naming, import, commit.
- `AI_CONTEXT.md`: quy tắc AI phải tuân theo khi chỉnh sửa code.
- `TASK.md`: mục tiêu của phiên làm việc hiện tại.

## Tiêu chí hoàn thành

- Có đủ 11 file tài liệu trong `client/docs`.
- Nội dung mô tả/giải thích viết bằng tiếng Việt có dấu.
- Tài liệu bám theo PRD và source frontend hiện tại.
- Có ghi nhận điểm lệch hiện tại giữa PRD và frontend về danh sách nhân vật.
- Có danh sách màn hình frontend theo MVP bắt buộc, state bắt buộc và phần nên có nếu còn thời gian.
- Có prompt build giao diện để tránh lỗi AI build sai flow, component quá lớn, hard-code mock, thiếu edge cases, lệch design system và vỡ responsive.
- Không thay đổi behavior của frontend trong bước tài liệu này.
- `git diff --check -- client/docs` không báo lỗi.

## Trạng thái sau khi hoàn thành tài liệu

Frontend docs sẽ trở thành nguồn tham chiếu trước khi implement các cải tiến như:

1. Refactor inline styles/CSS responsive.
2. Tạo `SourceFactCheckBox`.
3. Thêm retry flow cho chat error.
4. Thêm not-found state cho character ID không hợp lệ.
5. Đồng bộ danh sách nhân vật giữa PRD, backend và frontend.

## Ghi chú quan trọng

- `docs/PRD.md` đang có thay đổi sẵn trong worktree và không thuộc phạm vi chỉnh sửa tài liệu frontend ở bước này.
- `client/docs` là thư mục mới, hiện chưa được track bởi git.
- Chỉ implement code sau khi người dùng yêu cầu rõ hoặc xác nhận bước tiếp theo.
