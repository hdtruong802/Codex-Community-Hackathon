# PRD: SửViệtAI

## 1. Tổng Quan Sản Phẩm

SửViệtAI là chatbot AI lịch sử Việt Nam, cho phép người dùng trò chuyện với các danh nhân lịch sử dưới dạng persona. Sản phẩm được định hướng cho Codex Community Hackathon 2026, Track 3: Impact to Vietnam.

Thông điệp sản phẩm:

> 4000 năm lịch sử không nên nằm trong sách giáo khoa bám bụi. Nó nên sống trong mỗi cuộc trò chuyện.

Ý tưởng cốt lõi:

- Người dùng chọn một nhân vật lịch sử Việt Nam.
- Người dùng đọc tiểu sử/context ngắn để hiểu bối cảnh.
- Người dùng trò chuyện tự nhiên với nhân vật.
- AI trả lời theo persona, có guardrails lịch sử và nguồn tham khảo.
- Trải nghiệm biến lịch sử từ nội dung đọc thuộc lòng thành đối thoại sống động.

## 2. Bối Cảnh Và Vấn Đề

### 2.1. Thực Trạng

Các tài liệu đầu vào nêu một nhận định sản phẩm rõ ràng: lịch sử Việt Nam rất hấp dẫn, nhưng cách truyền tải hiện tại khiến nhiều học sinh cảm thấy xa cách.

Các điểm đau chính:

- Môn Sử thường bị xem là khô, nặng sự kiện và học thuộc lòng.
- Phương pháp học phổ biến vẫn là đọc, chép, ghi nhớ mốc thời gian.
- Học sinh thiếu cơ hội đặt câu hỏi tự do và nhận phản hồi theo ngữ cảnh.
- Nhiều bạn trẻ biết nhiều về nhân vật giải trí hiện đại hơn danh nhân lịch sử Việt Nam.
- Sách giáo khoa khó tạo cảm giác con người thật, cảm xúc thật, lựa chọn thật của nhân vật lịch sử.
- AI có thể khiến lịch sử hấp dẫn hơn, nhưng nếu không kiểm soát sẽ dễ bịa sự kiện.

Các con số/thông điệp dùng cho pitch:

- Việt Nam có khoảng 4000 năm lịch sử.
- Tài liệu pitch dùng claim "70%+ học sinh Việt Nam thấy Sử nhàm chán" như thông điệp mở đầu.
- Tài liệu pitch nhắc đến 17 triệu học sinh Việt Nam là nhóm có thể hưởng lợi.
- Năm 2015, tài liệu nêu hơn 80% thí sinh đạt dưới điểm trung bình môn Sử.

Lưu ý: các số liệu trên là framing trong tài liệu dự án/pitch, cần được kiểm chứng nguồn chính thức nếu dùng cho truyền thông công khai.

### 2.2. Cơ Hội

- Lịch sử Việt Nam có kho nhân vật, chiến công, văn học và tư tưởng rất phong phú.
- Gen Z quen với trải nghiệm interactive, immersive, hỏi đáp tức thời.
- Chatbot AI là hình thức học tự nhiên: người dùng hỏi điều mình tò mò.
- "Trò chuyện với Trần Hưng Đạo" hoặc "hỏi Hồ Xuân Hương về phụ nữ hiện đại" tạo wow factor mà sách giáo khoa khó làm được.
- Dự án phù hợp với mục tiêu đào tạo, truyền cảm hứng cho giới trẻ Việt Nam.
- Có tiềm năng mở rộng vào trường học, bảo tàng, nội dung giáo dục số hoặc hoạt động ngoại khóa.

## 3. Mục Tiêu

### 3.1. Mục Tiêu Sản Phẩm

- Biến việc học lịch sử thành trải nghiệm đối thoại.
- Cho phép người dùng chọn và trò chuyện với 3 nhân vật lịch sử Việt Nam hiện có.
- Tạo persona khác biệt cho từng nhân vật: giọng nói, cách xưng hô, chủ đề và thế giới quan.
- Cung cấp câu hỏi gợi ý để người dùng dễ bắt đầu.
- Hiển thị câu trả lời theo dạng streaming để tạo cảm giác nhân vật đang nói.
- Giữ câu trả lời có grounding lịch sử, có nguồn sử liệu/fact-check box hoặc khuyến nghị tra cứu.
- Luôn nhắc rõ đây là AI mô phỏng, không phải sử liệu chính thức.

### 3.2. Mục Tiêu Hackathon

- Ship sản phẩm hoàn chỉnh trong 5 tiếng.
- Ưu tiên luồng lõi hoạt động ổn định: Gallery -> Context -> Chat -> Learn.
- Demo live được tối thiểu 3 kịch bản đã chuẩn bị.
- Pitch dưới 3 phút, tập trung vào story, impact và demo hoạt động.
- Nếu phải cắt giảm, giữ lại chat cho 3 nhân vật hiện có, persona rõ, disclaimer và demo ổn định.

## 4. Người Dùng Mục Tiêu

Người dùng chính:

- Học sinh THCS/THPT muốn học lịch sử theo cách bớt khô khan.
- Sinh viên/người trẻ quan tâm văn hóa, lịch sử, danh nhân Việt Nam.
- Giáo viên muốn có công cụ gợi mở thảo luận hoặc tạo hoạt động hỏi đáp.
- Phụ huynh muốn khơi gợi hứng thú tìm hiểu lịch sử cho con.

Người dùng phụ:

- Ban giám khảo hackathon cần nhìn thấy impact, tính khả thi và demo.
- Trường học, bảo tàng, đơn vị giáo dục số có thể trở thành đối tác tương lai.

Nhu cầu chính:

- Chọn nhanh nhân vật mình tò mò.
- Hiểu sơ bối cảnh trước khi hỏi.
- Đặt câu hỏi tự nhiên, không bị bó trong câu hỏi trắc nghiệm.
- Nhận câu trả lời đúng giọng nhân vật, dễ hiểu và có cảm xúc.
- Biết đâu là mô phỏng AI và đâu là thông tin cần kiểm chứng thêm.

## 5. Giá Trị Cốt Lõi

- Lịch sử thành đối thoại: học qua câu hỏi, phản hồi và follow-up.
- Nhân vật có cá tính: mỗi persona đại diện một lát cắt văn hóa, quân sự, tư tưởng, văn học hoặc chủ quyền.
- Dễ bắt đầu: suggested questions giúp người dùng không bị trống rỗng khi mở chat.
- Có trách nhiệm: disclaimer, source/fact-check box và guardrails giảm nguy cơ hiểu sai lịch sử.
- Có impact giáo dục: khơi gợi tò mò, không thay thế sách giáo khoa hay sử liệu.

## 6. Định Vị MVP

MVP của SửViệtAI là một web app gồm:

- Trang Gallery hiển thị 3 nhân vật.
- Trang/khối Context cho tiểu sử ngắn, thời kỳ, chủ đề trò chuyện.
- Trang Chat với streaming response.
- Suggested questions theo từng nhân vật.
- RAG MVP bằng knowledge base nhỏ, curated theo 3 nhân vật.
- Fact-check/source box ở cuối câu trả lời.
- Time period banner hiển thị thời đại/niên hiệu.
- Disclaimer AI mô phỏng.
- About page giải thích vấn đề, giải pháp, công nghệ và impact.

Ngoài phạm vi MVP:

- Đăng nhập/tài khoản cá nhân.
- Lưu hội thoại bằng database.
- CMS quản trị nội dung.
- RAG/hệ tri thức đầy đủ ở quy mô lớn.
- Vector database hoặc pipeline ingest phức tạp.
- Kiểm chứng học thuật hoàn chỉnh.
- Tích hợp trường học thật.
- Đa ngôn ngữ.
- Thanh toán/subscription.

## 7. Luồng Người Dùng

### 7.1. Luồng Chính

1. Người dùng vào app.
2. Xem Gallery gồm 3 nhân vật lịch sử.
3. Chọn một nhân vật.
4. Xem context: tiểu sử ngắn, thời kỳ, chủ đề, câu hỏi gợi ý.
5. Bắt đầu chat bằng câu hỏi tự nhập hoặc suggested question.
6. AI trả lời theo persona, stream từng đoạn.
7. Người dùng đọc fact-check/source box.
8. Người dùng hỏi tiếp để đào sâu.

Luồng tóm tắt:

`Gallery -> Context -> Chat -> Learn`

### 7.2. Gallery

Mục tiêu:

- Giúp người dùng nhận ra ngay sản phẩm có thể trò chuyện với những ai.
- Làm nổi bật cá tính và chủ đề của từng nhân vật.

Thông tin trên mỗi card:

- Emoji/avatar.
- Tên nhân vật.
- Thời kỳ.
- Tiểu sử ngắn.
- Topic chips.
- Màu nhận diện riêng.
- Hover state/click state.

### 7.3. Context

Mục tiêu:

- Cho người dùng đủ bối cảnh trước khi hỏi.
- Tăng cảm giác học thật thay vì chỉ chat giải trí.

Nội dung:

- Tiểu sử 1-2 đoạn ngắn.
- Thời kỳ/triều đại.
- Thành tựu chính.
- Chủ đề có thể hỏi.
- Suggested questions.
- Disclaimer ngắn.

### 7.4. Chat

Mục tiêu:

- Tạo trải nghiệm "nhân vật đang nói".
- Cho phép hỏi đáp tiếp nối theo ngữ cảnh.

Thành phần:

- Header nhân vật: avatar, tên, thời kỳ, nút back.
- Message list: user bubble bên phải, AI bubble bên trái.
- Streaming text/typewriter.
- Typing indicator.
- Suggested questions chips.
- Input textarea auto-grow.
- Nút gửi.
- Fact-check/source box cuối câu trả lời.
- Error state và retry.

## 8. Nhân Vật Và Persona

Mỗi nhân vật đại diện một khía cạnh nổi bật của Việt Nam: quân sự/lãnh đạo, chủ quyền/chiến lược và tiếng nói nữ quyền/văn học dân tộc.

### 8.1. Schema Dữ Liệu Nhân Vật

| Trường | Mô tả |
| --- | --- |
| `id` | Định danh duy nhất, ví dụ `tran_hung_dao` |
| `name` | Tên hiển thị |
| `emoji` | Biểu tượng đại diện |
| `period` | Thời kỳ/triều đại |
| `shortBio` | Tiểu sử ngắn |
| `topics` | Chủ đề trò chuyện |
| `suggestedQuestions` | Câu hỏi gợi ý |
| `color` | Màu nhận diện |
| `systemPrompt` | Prompt persona và guardrails |

### 8.2. Danh Sách Nhân Vật MVP

| Nhân vật | Thời kỳ | Vai trò sản phẩm | Chủ đề |
| --- | --- | --- | --- |
| Trần Hưng Đạo | Thế kỷ XIII, Nhà Trần | Quân sự, lãnh đạo, lòng yêu nước | Chiến thuật quân sự, lãnh đạo, đoàn kết dân tộc, Hịch tướng sĩ, kháng Nguyên-Mông |
| Hồ Xuân Hương | Thế kỷ XVIII-XIX | Nữ quyền, phản kháng xã hội phong kiến, thơ Nôm | Phụ nữ, thơ Nôm, xã hội phong kiến, nghệ thuật chữ, Bánh trôi nước |
| Lý Thường Kiệt | Thế kỷ XI, Nhà Lý | Chủ quyền, chiến lược, tinh thần tự chủ | Nam quốc sơn hà, tiên phát chế nhân, phòng tuyến Như Nguyệt, chủ quyền quốc gia |

### 8.3. Persona Trần Hưng Đạo

Mô tả:

- Quốc công Tiết chế, 3 lần đánh bại quân Nguyên-Mông.
- Tác giả Hịch tướng sĩ.
- Nhà chiến lược quân sự vĩ đại, biểu tượng lãnh đạo và đoàn kết dân tộc.

Giọng nói:

- Oai nghiêm nhưng nhân hậu.
- Nói như một vị tướng già dày dạn.
- Trang trọng nhưng dễ hiểu.
- Có thể gọi người hỏi là "hậu thế", "con", "cháu".
- Có thể dùng hành động miêu tả như vuốt chòm râu, nhìn xa xăm.

Kiến thức cốt lõi:

- Sinh năm 1228, mất năm 1300.
- Con Trần Liễu, cháu Trần Thái Tông.
- Ba lần kháng Nguyên: 1258, 1285, 1288.
- Trận Bạch Đằng 1288 với cọc gỗ, thủy triều.
- Hịch tướng sĩ, khoảng 1285.
- Binh thư yếu lược.
- Mâu thuẫn gia tộc nhưng đặt đại nghĩa lên trên.
- Được dân gian tôn làm Đức Thánh Trần.

Câu hỏi demo:

- "Thưa Đức Thánh Trần, 3 lần đánh Nguyên-Mông, trận nào khó nhất?"
- "Ngài có lời khuyên gì cho giới trẻ Việt Nam ngày nay?"

Expected response:

- Có chi tiết lịch sử.
- Giọng oai nghiêm, nhân hậu.
- Nêu vai trò lòng dân, đoàn kết, chiến thuật.
- Có nguồn như Đại Việt Sử Ký Toàn Thư.

### 8.4. Persona Hồ Xuân Hương

Mô tả:

- Nữ thi sĩ cuối thế kỷ XVIII - đầu XIX.
- Được mệnh danh "Bà chúa thơ Nôm".
- Biểu tượng của tiếng nói phụ nữ, phản kháng lễ giáo phong kiến.

Giọng nói:

- Thông minh, sắc sảo, dí dỏm, đôi khi châm biếm.
- Tự do, phóng khoáng, không giống khuôn mẫu phụ nữ phong kiến.
- Ngôn ngữ giàu hình ảnh, đa nghĩa.
- Có thể gọi người hỏi là "người ơi" hoặc "bạn".
- Khi nói về phụ nữ, giọng mạnh mẽ và tự hào.

Kiến thức cốt lõi:

- Sống cuối Lê - đầu Nguyễn.
- Quê Quỳnh Đôi, Nghệ An.
- Hai lần làm lẽ, nhiều bất hạnh.
- Thơ nổi bật: Bánh trôi nước, Đánh đu, Mời trầu, Tự tình.
- Thơ Nôm đa nghĩa, có tầng nghĩa hiển và nghĩa ẩn.
- Bối cảnh xã hội phong kiến, phụ nữ bị áp bức, chế độ đa thê.

Câu hỏi demo:

- "Bà nghĩ gì về phụ nữ Việt Nam ngày nay so với thời bà?"
- "Bài thơ Bánh trôi nước có ý nghĩa gì với bà?"

Expected response:

- Dí dỏm, sâu sắc.
- Có thể trích thơ.
- Phản chiếu xã hội cũ và hiện đại.

### 8.5. Persona Lý Thường Kiệt

Mô tả:

- Danh tướng nhà Lý.
- Gắn với Nam quốc sơn hà.
- Biểu tượng chủ quyền, tự chủ và chiến lược phòng thủ chủ động.

Giọng nói:

- Quyết đoán, bản lĩnh, trọng chủ quyền.
- Nói ngắn gọn, mạnh mẽ, có tinh thần tướng lĩnh.

Chủ đề:

- Nam quốc sơn hà.
- Chủ quyền quốc gia.
- Tiên phát chế nhân.
- Phòng tuyến Như Nguyệt/sông Cầu.
- Tinh thần tự chủ.

Câu hỏi gợi ý:

- "Vì sao ông chọn chiến thuật tiên phát chế nhân?"
- "Nam quốc sơn hà có ý nghĩa thế nào với chủ quyền Đại Việt?"
- "Phòng tuyến Như Nguyệt được xây dựng ra sao?"

## 9. Yêu Cầu Chức Năng

### FR1. Character Gallery

Người dùng xem được 3 nhân vật lịch sử ở trang chủ.

Tiêu chí chấp nhận:

- Hiển thị đủ 3 nhân vật.
- Mỗi card có avatar/emoji, tên, thời kỳ, tiểu sử ngắn, topics.
- Card có màu nhận diện riêng.
- Click card điều hướng sang context/chat đúng nhân vật.

### FR2. Historical Context

Người dùng xem được bối cảnh của nhân vật trước hoặc trong khi chat.

Tiêu chí chấp nhận:

- Hiển thị thời kỳ, tiểu sử, thành tựu/chủ đề chính.
- Có time period banner hoặc character info header.
- Có suggested questions liên quan nhân vật.

### FR3. Chat Interface

Người dùng gửi câu hỏi và nhận câu trả lời từ nhân vật đã chọn.

Tiêu chí chấp nhận:

- Input gửi được câu hỏi.
- Message user và AI hiển thị phân biệt rõ.
- AI trả lời bằng tiếng Việt.
- Persona phù hợp với nhân vật.
- Có retry/error state khi lỗi.

### FR4. Streaming Response

Câu trả lời AI được stream từng phần.

Tiêu chí chấp nhận:

- Backend trả `text/event-stream`.
- Frontend hiển thị text tăng dần.
- Có typing indicator/loading state.
- Khi nhận `[DONE]`, kết thúc trạng thái streaming.

### FR5. Suggested Questions

Mỗi nhân vật có các câu hỏi gợi ý.

Tiêu chí chấp nhận:

- Suggested questions hiển thị trong context/chat.
- Click vào chip gửi như câu hỏi người dùng.
- Câu hỏi gợi ý phù hợp với persona và chủ đề.

### FR6. Fact-Check/Source Box

Câu trả lời AI cần kèm nguồn sử liệu hoặc khuyến nghị tra cứu.

Tiêu chí chấp nhận:

- AI message có vùng nguồn/fact box khi phù hợp.
- Nội dung nguồn có thể gồm Đại Việt Sử Ký Toàn Thư, An Nam Chí Lược, thơ văn gốc hoặc khuyến nghị tra cứu sử sách.
- Nếu AI không chắc, phải nói rõ thay vì bịa.
- Nếu câu trả lời dùng RAG, source box hiển thị tối thiểu `source`, `topic` và mức độ tin cậy.

### FR7. RAG MVP

Hệ thống cần có RAG tối giản để cung cấp ngữ cảnh lịch sử đã chọn lọc cho 3 nhân vật hiện có.

Tiêu chí chấp nhận:

- Knowledge base có tối thiểu 10-20 chunks cho mỗi nhân vật.
- Mỗi chunk có `characterId`, `topic`, `content`, `source`, `confidence`, `timePeriod`.
- Retrieval luôn lọc theo `characterId` trước khi tìm nội dung liên quan.
- MVP có thể dùng keyword search/local JSON trước; vector search là nâng cấp sau.
- Mỗi request chat lấy top 3-5 chunks liên quan để đưa vào prompt.
- Nếu không tìm được chunk đủ liên quan, model phải nói không đủ sử liệu trong kho tri thức để khẳng định.

### FR8. Guardrails Lịch Sử

Hệ thống phải hạn chế hallucination và đảm bảo nhân vật không biết quá thời đại.

Tiêu chí chấp nhận:

- Nếu hỏi về sự kiện sau năm mất/thời đại của nhân vật, AI nói không biết vì không còn ở thế gian hoặc không thuộc thời mình.
- Nếu hỏi về công nghệ/hiện đại, AI bày tỏ tò mò và liên hệ với trải nghiệm thời mình.
- Nếu thiếu chắc chắn, AI nói "không nhớ rõ" hoặc khuyến nghị tra cứu thêm.
- Không khẳng định sự kiện chưa verify như sự thật.
- Không bịa nguồn, không bịa năm, không bịa trích dẫn.
- Nếu RAG context mâu thuẫn với persona prompt, ưu tiên RAG context và báo cần kiểm chứng thêm.

### FR9. Disclaimer

Sản phẩm phải cảnh báo rõ đây là AI mô phỏng.

Tiêu chí chấp nhận:

- Có disclaimer banner hoặc text cố định.
- Nội dung không gây hiểu nhầm rằng đây là phát ngôn thật của nhân vật.
- About page nhắc lại giới hạn này.

### FR10. Conversation History

AI cần nhớ ngữ cảnh hội thoại gần nhất.

Tiêu chí chấp nhận:

- Gửi lịch sử chat vào model.
- Giới hạn tối đa 10 messages gần nhất để tiết kiệm token.
- Follow-up question vẫn có context.

### FR11. Health Check

Backend có endpoint kiểm tra trạng thái.

Tiêu chí chấp nhận:

- `GET /api/health` trả trạng thái `ok`.
- Response cho biết số lượng nhân vật khả dụng.

## 10. API Contract

### 10.1. Lấy Danh Sách Nhân Vật

`GET /api/characters`

Response mẫu:

```json
[
  {
    "id": "tran_hung_dao",
    "name": "Trần Hưng Đạo",
    "emoji": "⚔️",
    "period": "Thế kỷ XIII · Nhà Trần",
    "shortBio": "Quốc công Tiết chế, 3 lần đánh bại Nguyên-Mông...",
    "topics": ["Chiến thuật", "Lãnh đạo", "Lòng yêu nước"],
    "suggestedQuestions": [
      "Trận nào trong 3 lần đánh Nguyên khó nhất?",
      "Ngài viết Hịch tướng sĩ trong hoàn cảnh nào?",
      "Ngài có lời khuyên gì cho giới trẻ?"
    ],
    "color": "#ef4444"
  }
]
```

### 10.2. Chat Với Nhân Vật

`POST /api/chat`

Request:

```json
{
  "characterId": "tran_hung_dao",
  "messages": [
    {
      "role": "user",
      "content": "Thưa Ngài, 3 lần đánh Nguyên-Mông, trận nào khó nhất?"
    }
  ],
  "rag": {
    "enabled": true,
    "topK": 5
  }
}
```

Response: `text/event-stream`

```text
data: {"text":"Hỡi hậu thế..."}

data: {"text":" ta sẽ kể..."}

data: [DONE]
```

Lỗi cần xử lý:

- Character không tồn tại: `404`.
- Model/API lỗi: trả error event hoặc message thân thiện.
- Timeout/streaming lỗi: frontend hiển thị lỗi và cho phép thử lại.

### 10.3. Retrieve Knowledge Chunks

`POST /api/retrieve`

Mục tiêu:

- Debug RAG.
- Kiểm tra câu hỏi đang lấy nguồn nào.
- Có thể dùng để hiển thị preview source/fact-check trong UI hoặc log nội bộ.

Request:

```json
{
  "characterId": "tran_hung_dao",
  "query": "Trận Bạch Đằng 1288 diễn ra thế nào?",
  "topK": 5
}
```

Response:

```json
{
  "chunks": [
    {
      "id": "thd-bach-dang-1288",
      "characterId": "tran_hung_dao",
      "topic": "Trận Bạch Đằng 1288",
      "content": "Năm 1288, quân Trần bố trí trận địa cọc trên sông Bạch Đằng...",
      "source": "Đại Việt Sử Ký Toàn Thư, Kỷ nhà Trần",
      "confidence": "high",
      "timePeriod": "1288",
      "score": 0.86
    }
  ]
}
```

### 10.4. Health Check

`GET /api/health`

Response:

```json
{
  "status": "ok",
  "characters": 3
}
```

## 11. RAG Và Guardrails MVP

### 11.1. Mục Tiêu RAG

RAG trong MVP không nhằm xây một thư viện lịch sử lớn. Mục tiêu là giúp 3 nhân vật hiện có trả lời chắc hơn ở những chủ đề demo và những câu hỏi phổ biến.

Ưu tiên:

- Ít dữ liệu nhưng đáng tin.
- Mỗi chunk rõ nguồn, rõ nhân vật, rõ chủ đề.
- Retrieval đơn giản, dễ debug.
- Model chỉ khẳng định khi có evidence đủ tốt.
- Source/fact-check box trở thành một phần của trải nghiệm học, không chỉ là chi tiết kỹ thuật.

Không ưu tiên trong MVP:

- Crawl dữ liệu tự động.
- Vector database production-grade.
- RAG đa nguồn lớn.
- Tự động đánh giá độ đúng lịch sử ở mức học thuật.

### 11.2. Knowledge Base MVP

Knowledge base nên bắt đầu bằng file JSON/Markdown trong repo, ví dụ `server/data/knowledge/`.

Mỗi nhân vật cần tối thiểu 10-20 chunks:

- Trần Hưng Đạo: kháng Nguyên-Mông 1258, 1285, 1288; Bạch Đằng; Hịch tướng sĩ; khoan thư sức dân; tinh thần đoàn kết.
- Lý Thường Kiệt: chiến tranh Tống - Việt; tiên phát chế nhân; phòng tuyến Như Nguyệt; Nam quốc sơn hà; chủ quyền Đại Việt.
- Hồ Xuân Hương: thơ Nôm; Bánh trôi nước; Tự tình; thân phận phụ nữ; bối cảnh xã hội phong kiến; lưu ý giai thoại còn tranh luận.

Schema chunk đề xuất:

```json
{
  "id": "thd-bach-dang-1288",
  "characterId": "tran_hung_dao",
  "topic": "Trận Bạch Đằng 1288",
  "content": "Nội dung tri thức ngắn, 80-180 từ, chỉ chứa thông tin đã kiểm chứng.",
  "source": "Đại Việt Sử Ký Toàn Thư, Kỷ nhà Trần",
  "confidence": "high",
  "timePeriod": "1288",
  "keywords": ["Bạch Đằng", "1288", "Nguyên-Mông", "cọc gỗ"]
}
```

Quy tắc dữ liệu:

- Không đưa thông tin mơ hồ vào `confidence: high`.
- Giai thoại, tranh luận học thuật hoặc thông tin chưa chắc phải để `confidence: medium` hoặc `low`.
- Không lưu trích dẫn thơ/văn nếu chưa chắc câu chữ.
- Chunk nên đủ ngắn để retrieval chính xác, đủ dài để model có ngữ cảnh.

### 11.3. Retrieval Flow

Luồng RAG trong `/api/chat`:

1. Nhận `characterId` và câu hỏi mới nhất.
2. Lọc knowledge chunks theo `characterId`.
3. Tìm top 3-5 chunks liên quan bằng keyword search hoặc scoring đơn giản.
4. Nếu top result dưới ngưỡng liên quan, đánh dấu `insufficientEvidence`.
5. Inject chunks vào prompt dưới mục `RAG_CONTEXT`.
6. Model trả lời theo persona nhưng chỉ khẳng định sự kiện dựa trên `RAG_CONTEXT`.
7. Response cuối có source/fact-check box.

MVP retrieval scoring:

- Match theo keyword tiếng Việt không dấu/có dấu.
- Ưu tiên exact match topic.
- Ưu tiên chunk cùng nhân vật.
- Ưu tiên `confidence: high`.
- Giới hạn topK mặc định là 5.

Nâng cấp sau MVP:

- Embeddings.
- Vector search.
- Reranking.
- Source viewer.
- Admin tool để thêm/sửa chunks.

### 11.4. Guardrails Ưu Tiên

MVP cần 4 lớp guardrails:

| Guardrail | Mục tiêu | Hành vi mong muốn |
| --- | --- | --- |
| Scope guardrail | Không lan man ngoài sản phẩm | Nếu câu hỏi không liên quan nhân vật/lịch sử, trả lời ngắn và kéo về chủ đề lịch sử |
| Temporal guardrail | Không biết sự kiện sau thời đại | Nhân vật nói không biết vì không thuộc thời mình, có thể tò mò/liên hệ nếu phù hợp |
| Evidence guardrail | Không khẳng định khi thiếu nguồn | Nếu RAG không có context đủ tốt, nói không đủ sử liệu trong kho tri thức để khẳng định |
| Citation guardrail | Không bịa nguồn | Chỉ hiển thị nguồn từ retrieved chunks; không tự tạo tên sách, năm, trích dẫn |

Thứ tự ưu tiên khi sinh câu trả lời:

1. Safety/guardrails.
2. RAG evidence.
3. Persona style.
4. Conversation history.

Điều này nghĩa là persona không được phép "diễn hay" bằng cách bịa thông tin.

### 11.5. Response Contract Cho AI

Câu trả lời nên có 2 phần:

- Phần trả lời chính: nói theo giọng nhân vật.
- Phần metadata/UI: source/fact-check box, confidence và trạng thái evidence.

Ví dụ hiển thị:

```text
[Câu trả lời theo persona]

Sử liệu tham khảo:
- Đại Việt Sử Ký Toàn Thư, Kỷ nhà Trần
Độ chắc chắn: cao
```

Nếu thiếu evidence:

```text
Ta không có đủ sử liệu trong kho tri thức này để khẳng định điều đó. Hậu thế nên tra cứu thêm sử sách hoặc hỏi ta về [chủ đề liên quan].

Sử liệu tham khảo:
- Không tìm thấy nguồn đủ liên quan trong kho tri thức hiện tại
Độ chắc chắn: thấp
```

## 12. Prompt Và Hành Vi AI

### 12.1. Cấu Hình Model

Model mặc định: `gpt-4o`.

| Parameter | Giá trị | Lý do |
| --- | --- | --- |
| `model` | `gpt-4o` | Phù hợp persona và lịch sử Việt Nam |
| `temperature` | `0.8` | Đủ sáng tạo cho personality nhưng không quá bay |
| `max_tokens` | `800` | Đủ dài cho câu trả lời chi tiết, tránh quá dài |
| `stream` | `true` | Tạo cảm giác nhân vật đang nói |
| `history limit` | 10 messages | Tiết kiệm token và giảm lỗi context |

Fallback:

- Dùng `gpt-4o-mini` nếu API chậm, lỗi hoặc hết credit.
- Giảm `max_tokens` xuống 400-500 nếu response chậm.
- Nếu streaming lỗi, dùng non-streaming với loading spinner.

### 12.2. Template System Prompt

Mỗi nhân vật dùng cùng một khung prompt:

```text
Bạn là [TÊN NHÂN VẬT] ([NĂM SINH]-[NĂM MẤT]), [DANH HIỆU/VỊ TRÍ].

TÍNH CÁCH:
- [Giọng nói, cách xưng hô]
- [Phong cách giao tiếp]
- [Hành động miêu tả nếu phù hợp]

KIẾN THỨC (chỉ dùng thông tin sau, KHÔNG bịa):
- [Sự kiện, năm, tác phẩm, chiến công, bối cảnh]

RAG_CONTEXT:
- [Các chunk sử liệu đã retrieve theo câu hỏi]

QUY TẮC:
1. Nếu hỏi về sự kiện sau [NĂM MẤT] hoặc ngoài thời đại, nói rằng không biết.
2. Nếu hỏi về hiện đại/công nghệ, bày tỏ tò mò và liên hệ với kinh nghiệm thời mình.
3. Chỉ khẳng định sự kiện lịch sử nếu có trong RAG_CONTEXT hoặc kiến thức nền đã được cung cấp rõ.
4. Nếu RAG_CONTEXT không đủ, nói: "Ta không có đủ sử liệu trong kho tri thức này để khẳng định."
5. Không bịa nguồn, không bịa năm, không bịa trích dẫn.
6. Luôn kèm nguồn sử liệu hoặc khuyến nghị tra cứu ở cuối.
7. Nếu không chắc, nói rõ không chắc.
8. Trả lời bằng tiếng Việt.
9. Độ dài mục tiêu: 150-250 từ.
```

### 12.3. Quy Tắc Chung Cho Persona

- Không trả lời như một chatbot trung tính.
- Không dùng kiến thức hiện đại như thể nhân vật đã sống qua thời đó.
- Không biến nhân vật thành nhà tiên tri biết mọi chuyện.
- Không bịa thơ, câu nói, nguồn sử liệu.
- Khi trích thơ hoặc tác phẩm, chỉ trích nếu chắc chắn.
- Với câu hỏi nhạy cảm, trả lời trong bối cảnh lịch sử và khuyến nghị kiểm chứng.

## 13. UX/UI

### 13.1. Hướng Thiết Kế

- Dark theme premium.
- Cảm hứng từ ChatGPT và Character.AI.
- Tập trung vào 3 màn hình chính: Gallery, Chat, About/Context.
- Persona cần được cảm nhận bằng màu, avatar, giọng và layout.
- UI cần mobile responsive.

### 13.2. Design System

Màu chính:

- Background: `#0a0a0f`
- Card: `#1a1a2e`
- Accent: `#8b5cf6`
- Text: `#e8e8f0`

Màu nhân vật:

- Trần Hưng Đạo: đỏ.
- Hồ Xuân Hương: hồng.
- Lý Thường Kiệt: xanh lá.

Typography:

- Inter cho UI/body.
- JetBrains Mono cho code/data.
- Noto Serif cho quote/thơ nếu cần.

### 13.3. Component Chính

- CharacterGallery.
- CharacterCard.
- Character Context/Info Header.
- ChatPage.
- ChatMessage.
- ChatInput.
- TypingIndicator.
- SuggestedQuestions.
- Disclaimer.
- Source/FactCheckBox.

## 14. Demo Scenarios

### Demo 1: Trần Hưng Đạo - "Làm sao thắng Nguyên-Mông?"

Mục đích:

- Tạo wow factor khi người dùng "nói chuyện" với vị tướng nổi bật.

Câu hỏi:

- "Thưa Đức Thánh Trần, 3 lần đánh Nguyên-Mông, trận nào khó nhất?"

Follow-up:

- "Ngài có lời khuyên gì cho giới trẻ Việt Nam ngày nay?"

Expected:

- Câu trả lời sinh động.
- Có chi tiết lịch sử.
- Giọng oai nghiêm, nhân hậu.
- Có nguồn sử liệu.

### Demo 2: Hồ Xuân Hương - "Phụ nữ thời phong kiến"

Mục đích:

- Tạo cảm xúc và chiều sâu nhân văn, thể hiện chủ đề nữ quyền trong bối cảnh Việt Nam.

Câu hỏi:

- "Thưa bà, bà nghĩ gì về phụ nữ Việt Nam ngày nay so với thời bà?"

Follow-up:

- "Bài thơ Bánh trôi nước có ý nghĩa gì với bà?"

Expected:

- Dí dỏm, sắc sảo, sâu sắc.
- Có thơ Nôm hoặc phân tích nghĩa hiển/nghĩa ẩn.
- Kết nối xã hội cổ và hiện đại.

### Demo 3: Lý Thường Kiệt - "Nam quốc sơn hà và chủ quyền"

Mục đích:

- Thể hiện tinh thần chủ quyền, chiến lược tự chủ và bản lĩnh bảo vệ đất nước.

Câu hỏi:

- "Thưa Ngài, vì sao Nam quốc sơn hà được xem như tuyên ngôn chủ quyền?"

Follow-up:

- "Vì sao Ngài chọn chiến thuật tiên phát chế nhân?"

Expected:

- Giọng quyết đoán, mạnh mẽ.
- Giải thích được chủ quyền Đại Việt và bối cảnh chống Tống.
- Liên hệ bài học tự chủ, phòng thủ chủ động với thế hệ trẻ.

## 15. Pitch Script 3 Phút

### 0:00-0:30 - Mở Đầu

Thông điệp:

- "Bạn nhớ bao nhiêu phần trăm bài Sử lớp 10?"
- Lịch sử Việt Nam hấp dẫn, nhưng cách truyền tải khiến học sinh thấy xa cách.
- Vấn đề không phải lịch sử thiếu hấp dẫn, mà là cách học thiếu tương tác.

### 0:30-1:00 - Giải Pháp

Thông điệp:

- SửViệtAI cho phép trực tiếp trò chuyện với nhân vật lịch sử.
- Người dùng có thể hỏi Trần Hưng Đạo về kháng Nguyên-Mông, hỏi Hồ Xuân Hương về phụ nữ ngày nay, hỏi Lý Thường Kiệt về Nam quốc sơn hà và chủ quyền.

### 1:00-2:30 - Live Demo

Flow demo:

1. Mở app.
2. Hiển thị Gallery 3 nhân vật.
3. Click Trần Hưng Đạo.
4. Hỏi về 3 lần đánh Nguyên-Mông.
5. Chỉ ra AI trả lời streaming, đúng giọng, có sử liệu.
6. Chuyển sang Hồ Xuân Hương.
7. Hỏi về phụ nữ Việt Nam ngày nay.
8. Chỉ ra persona khác biệt: sắc sảo, dí dỏm, có thơ.
9. Có thể chuyển sang Lý Thường Kiệt để demo thêm tinh thần chủ quyền và chiến lược.

Thông điệp trong demo:

- Đây không chỉ là ChatGPT trả lời chung chung.
- Mỗi nhân vật có tính cách riêng.
- Lịch sử trở thành trải nghiệm sống.

### 2:30-3:00 - Kết

Thông điệp:

- Việt Nam có hàng triệu học sinh và hàng nghìn năm lịch sử.
- SửViệtAI muốn biến lịch sử từ nội dung học thuộc thành cuộc trò chuyện.
- Sản phẩm là cầu nối tạo hứng thú, không thay thế sử liệu chính thức.

## 16. Yêu Cầu Phi Chức Năng

- App phải chạy ổn định trên desktop và mobile.
- Response đủ nhanh cho demo live.
- Nếu API chậm, UI phải có typing/loading state.
- Không commit API key hoặc `.env`.
- Backend cần CORS đúng với frontend.
- Không cần database trong MVP.
- Có fallback khi streaming lỗi.
- Có screenshot/screen recording backup cho demo.
- RAG MVP phải chạy được không cần dịch vụ ngoài, ngoài model API.
- Retrieval phải có log/debug đủ để biết câu trả lời dùng chunk nào.

## 17. Tiêu Chí Thành Công

MVP đạt khi:

- Gallery hiển thị đủ 3 nhân vật.
- Chọn nhân vật và chat được.
- Response stream ra UI.
- Ít nhất 3 nhân vật có persona phân biệt rõ trong demo.
- Suggested questions hoạt động.
- Có time period/context.
- Có disclaimer AI mô phỏng.
- Có source/fact-check box hoặc khuyến nghị tra cứu.
- Có RAG MVP cho 3 nhân vật, tối thiểu 10 chunks/nhân vật.
- Khi không có evidence đủ tốt, AI biết nói không đủ sử liệu thay vì bịa.
- Demo flow chạy ổn định 3 lần liên tiếp.

Mục tiêu polish:

- UI dark theme đẹp, nhất quán.
- Mobile responsive.
- Chat bubble, typing indicator, transition hoạt động mượt.
- README/setup rõ ràng.
- Có sample conversations/screenshot backup.
- Có màn hình hoặc log debug hiển thị retrieved chunks cho demo nội bộ.

## 18. Timeline Phát Triển Hackathon

Từ `su-viet-ai.html`:

| Thời gian | Mục tiêu |
| --- | --- |
| 11:00-12:00 | Foundation: Express + OpenAI, `/api/chat`, 1 nhân vật, frontend gallery + chat |
| 12:00-13:00 | Hoàn thiện 3 nhân vật, tạo knowledge chunks MVP, test persona, suggested questions, styling |
| 13:00-13:30 | Lunch + review, test 3 nhân vật và streaming |
| 13:30-14:30 | Enhancement: RAG retrieval, guardrails evidence, conversation history, context cards, mobile responsive |
| 14:30-15:30 | Demo ready: test scenarios, fix persona/RAG issues, screenshot backup, sample conversations |
| 15:30-16:00 | Submit, README, pitch 3 phút, backup |

Từ `su-viet-ai-battle-plan.html`:

| Thời gian | Mục tiêu |
| --- | --- |
| 11:00-11:15 | Setup & alignment, review API contract, test key, verify dev server |
| 11:15-12:15 | Foundation: chat Trần Hưng Đạo hoạt động với streaming |
| 12:15-13:15 | Hoàn thiện 3 nhân vật + knowledge chunks + UI polish |
| 13:15-13:45 | Lunch review, test tất cả nhân vật, quyết định feature cần bỏ nếu trễ |
| 13:45-14:45 | Prompt polish, RAG retrieval, source box, disclaimer, responsive, About page |
| 14:45-15:30 | Demo prep, screenshots, screen recording, pitch rehearsal |
| 15:30-16:00 | Submit, final check, README, nghỉ trước khi pitch |

Milestone quan trọng:

- Sprint 1: Chọn Trần Hưng Đạo -> hỏi -> streaming text. Đây là lõi MVP.
- Sprint 2: 3 nhân vật đều chat được, có knowledge chunks cơ bản, UI presentable.
- Sprint 3: Có RAG retrieval, disclaimer, source box, responsive, demo ready.

## 19. Phân Vai

P1 - Backend + Prompt Master:

- API server.
- OpenAI integration.
- System prompts.
- Knowledge base/RAG retrieval.
- Evidence guardrails.
- Streaming.
- Conversation management.
- Error handling.
- Test persona và guardrails.

P2 - Frontend + Demo Lead:

- Character Gallery.
- Context/Chat UI.
- Streaming display.
- Animations.
- Responsive.
- Demo scenarios.
- Pitch prep.

Nguyên tắc:

- Làm song song.
- Thống nhất API contract trước.
- Check-in mỗi 30 phút.
- Không đổi API contract mà không báo người còn lại.

## 20. Rủi Ro Và Phương Án Giảm Thiểu

| Rủi ro | Xác suất | Phương án |
| --- | --- | --- |
| API key hết credit | Trung bình | Chuyển sang `gpt-4o-mini`, giảm `max_tokens` |
| WiFi/mạng lỗi | Trung bình | Dùng hotspot 4G |
| Streaming lỗi | Thấp | Dùng `stream: false` và loading spinner |
| AI hallucinate | Trung bình | Giảm temperature, thêm guardrail "không bịa sự kiện" |
| RAG không tìm thấy nguồn | Trung bình | Trả lời thiếu evidence, gợi ý hỏi chủ đề có dữ liệu |
| Source sai hoặc mơ hồ | Trung bình | Chỉ hiển thị source từ chunk, dùng `confidence: medium/low` cho dữ liệu tranh luận |
| API response chậm | Trung bình | Pre-cache/sample conversations cho demo |
| Demo live fail | Trung bình | Chuẩn bị screenshots và screen recording |
| Git conflict | Thấp | Tách backend/frontend, chỉ sửa folder phụ trách |

Emergency protocol:

- Nếu gần cuối vẫn chưa có app ổn định, dùng static demo có concept, screenshots và pitch story.
- Nếu model fail, demo bằng sample conversations hoặc pre-run conversations.
- Ưu tiên một luồng chạy được hơn nhiều tính năng dang dở.

## 21. Checklist Nghiệp Vụ Và Nội Dung

Trước ngày thi:

- Nghiên cứu tiểu sử chi tiết 3 nhân vật.
- Tìm sử liệu: Đại Việt Sử Ký Toàn Thư, An Nam Chí Lược, thơ văn gốc.
- Tạo knowledge base MVP: tối thiểu 10-20 chunks cho mỗi nhân vật.
- Gắn source, confidence, keywords và timePeriod cho mỗi chunk.
- Viết system prompt cho từng nhân vật.
- Test retrieval top 3-5 chunks cho các câu hỏi demo.
- Test 5-10 câu hỏi cho mỗi nhân vật.
- Chuẩn bị suggested questions cho mỗi nhân vật.
- Viết tiểu sử ngắn cho character cards.
- Tìm giai thoại thú vị để enrich prompts.
- Viết pitch script 3 phút.
- Chọn 3 demo scenarios cụ thể.
- Chuẩn bị câu hỏi demo đã test output tốt.

Trước submit:

- 3 nhân vật có thông tin, prompt, topics và suggested questions.
- 3 nhân vật có knowledge chunks đủ cho demo.
- Luồng Gallery -> Context -> Chat -> Learn hoạt động.
- Câu trả lời thể hiện đúng persona.
- Guardrails được test với câu hỏi sau thời đại nhân vật.
- Evidence guardrail được test với câu hỏi không có nguồn trong knowledge base.
- Disclaimer hiển thị rõ.
- Source/fact-check box hiển thị trong AI message.
- About page nói rõ vấn đề, giải pháp, công nghệ và impact.
- 3 demo conversations đã chạy thử.
- Có screenshot/screen recording backup.
- Pitch dưới 3 phút.

## 22. Ghi Chú Phạm Vi Tài Liệu

PRD này được tổng hợp từ:

- `su-viet-ai.html`: bản mô tả sản phẩm, vấn đề, giải pháp, persona, demo và pitch.
- `su-viet-ai-battle-plan.html`: bản battle plan chi tiết, API contract, UI/UX, model strategy, timeline, rủi ro và checklist.

Các phần thuần kỹ thuật như cài package, cấu trúc repo, extension IDE và prompt codegen chỉ được đưa vào khi có ảnh hưởng trực tiếp đến nghiệp vụ sản phẩm, demo hoặc tiêu chí MVP.
