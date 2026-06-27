# CONVENTIONS.md

## Mục đích tài liệu

Tài liệu này quy định coding style, naming, import, commit và cách tổ chức thay đổi frontend cho Sử Việt AI.

## Ngôn ngữ và nội dung

- UI copy, mô tả sản phẩm và tài liệu Markdown nên viết tiếng Việt có dấu.
- Thuật ngữ kỹ thuật có thể giữ tiếng Anh nếu quen thuộc với dev: `frontend`, `backend`, `streaming`, `fallback`, `component`, `state`, `props`.
- Không dùng văn phong marketing dài trong UI chính; ưu tiên rõ ràng, ngắn, có cảm hứng lịch sử vừa đủ.
- Luôn phân biệt "AI mô phỏng" và "sử liệu chính thống".

## File và thư mục

- Route đặt trong `client/app/`.
- Component dùng lại đặt trong `client/components/`.
- Component shadcn/ui registry đặt trong `client/components/ui/`, import bằng lowercase path như `@/components/ui/button`.
- Hook đặt trong `client/hooks/` và bắt đầu bằng `use`.
- Helper không phụ thuộc UI đặt trong `client/utils/`.
- Utility chung của shadcn đặt trong `client/lib/utils.js`.
- Tài liệu frontend đặt trong `client/docs/`.
- Không thêm thư mục mới nếu chưa có nhu cầu rõ ràng.

## Naming

| Loại | Quy ước | Ví dụ |
| --- | --- | --- |
| Component file | PascalCase | `ChatMessage.js` |
| Component function | PascalCase | `function ChatInput()` |
| Hook file/function | camelCase, bắt đầu bằng `use` | `useChat.js`, `useChat()` |
| Helper function | camelCase | `getCharacters()` |
| Constants | UPPER_SNAKE_CASE hoặc rõ nghĩa theo scope | `API_BASE_URL`, `STATIC_CHARACTERS` |
| Route segment | lowercase/kebab hoặc dynamic segment | `chat/[id]` |
| CSS variables | kebab-case | `--bg-primary` |
| shadcn component file | lowercase | `components/ui/button.jsx` |

## Import

- Ưu tiên alias `@/` cho import nội bộ frontend.
- Import React hooks từ `react` ở đầu file.
- Không import xuyên tầng nếu có helper phù hợp.
- Component không nên import trực tiếp backend config nếu đã có `utils/api.js` hoặc hook xử lý.

Ví dụ:

```js
import useChat from '@/hooks/useChat';
import ChatMessage from '@/components/ChatMessage';
import { getCharacters } from '@/utils/api';
import { Button } from '@/components/ui/button';
```

## Component style

- Component nên là function component.
- Props nên rõ nghĩa và tối thiểu.
- Component presentational không tự gọi API.
- Page/route chịu trách nhiệm fetch data cấp màn hình và điều hướng.
- Hook chịu trách nhiệm side effect phức tạp như streaming, abort, retry.
- Không mutate state trực tiếp.
- Khi update dựa trên state cũ, ưu tiên functional update nếu có nguy cơ stale closure.

## Styling

Frontend dùng shadcn/ui + Tailwind CSS 4 làm nền UI. Khi chỉnh tiếp:

- Ưu tiên shadcn/ui components trong `components/ui/*` cho button, card, alert, badge, textarea, separator, scroll area và các primitive tương tự.
- Nếu cần component shadcn mới, chạy `npx shadcn@latest add <component>` trong `client/` thay vì tự dựng primitive riêng.
- Dùng Tailwind utility trong `className` cho spacing, layout, responsive, state và icon sizing.
- Dùng CSS custom trong `globals.css` cho design tokens, layout lớn hoặc responsive class dùng chung.
- Không hard-code selector sinh từ build hash.
- Dùng CSS variables trong `globals.css` cho màu nền, text, border, accent và shadcn tokens `--background`, `--foreground`, `--card`, `--primary`, `--muted`, `--border`, `--ring`.
- Màu nhân vật nên lấy từ data `character.color`, không hard-code trong component nếu đã có dữ liệu.
- Không dùng text quá lớn trong panel/chat compact.
- Đảm bảo mobile 320px không tràn ngang.
- Không tạo component UI giả tên `Button.js`, `Card.js`... nếu shadcn đã có component tương ứng.

## JavaScript/React

- Dùng `const` mặc định, chỉ dùng `let` khi cần gán lại.
- Dùng early return để giảm nesting.
- Không bỏ qua lỗi network im lặng; phải có error state hoặc fallback.
- Dọn `AbortController` khi component unmount cho request streaming.
- Không tạo request song song nếu UI chưa có cancel/queue rõ ràng.
- Không thêm dependency mới nếu có thể giải quyết bằng API sẵn có của React/Next hoặc shadcn registry hiện có.
- Dependency UI đã có: `shadcn`, Tailwind CSS 4, `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `tw-animate-css`.

## API và streaming

- API base URL lấy từ `NEXT_PUBLIC_API_URL`, fallback `http://localhost:3001`.
- Chat response kỳ vọng là SSE dạng `data: ...`.
- Frontend phải xử lý `[DONE]`.
- Nếu backend trả `parsed.error`, hiển thị lỗi thân thiện.
- Source/fact-check nên chuyển dần sang metadata structured thay vì marker text.

## Accessibility

- Button icon cần có `title` hoặc `aria-label`.
- Trạng thái disabled phải có visual state rõ.
- Focus state phải thấy được khi dùng keyboard.
- Emoji không được là thông tin duy nhất; luôn có text label.
- Text phải đủ contrast trên light theme nền trắng.

## Commit

Nếu cần commit, dùng Conventional Commits:

- `docs: add frontend architecture guide`
- `feat: add source fact check box`
- `fix: handle unknown character id`
- `refactor: move static characters to shared module`
- `style: polish chat mobile layout`

Quy tắc commit:

- Một commit nên có một mục đích rõ.
- Không commit file build/cache.
- Không commit API key, `.env`, secret.
- Không trộn refactor lớn với bug fix nhỏ nếu không cần.
- Trước khi commit, chạy kiểm tra phù hợp như `npm run lint` nếu thay code.

## Kiểm tra trước khi hoàn tất

Với thay đổi docs:

- Đọc lại headings và bảng Markdown.
- Chạy `git diff --check`.

Với thay đổi frontend:

- Chạy `npm run lint` trong `client/` nếu khả thi.
- Nếu có thay đổi UI, chạy app và kiểm tra desktop/mobile.
- Kiểm tra luồng `/ -> /chat/[id] -> gửi câu hỏi -> streaming/error`.
