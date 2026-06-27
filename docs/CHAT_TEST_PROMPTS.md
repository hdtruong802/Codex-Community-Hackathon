# Bộ prompt test màn hình chat Sử Việt AI

File này dùng để copy từng câu hỏi và test trực tiếp trên giao diện `/chat/[id]`.

Mục tiêu test:

- Persona trả lời đúng giọng nhân vật.
- Câu trả lời có nội dung lịch sử hữu ích, dễ hiểu.
- Không bịa sự kiện, năm tháng, trích dẫn hoặc nguồn.
- Có disclaimer/fact-check/source box khi backend hỗ trợ.
- Follow-up giữ được ngữ cảnh hội thoại.
- UI xử lý tốt câu hỏi ngắn, câu hỏi dài, câu hỏi nhạy cảm và câu hỏi ngoài phạm vi.

## 1. Trần Hưng Đạo

Route test:

`/chat/tran_hung_dao`

### Prompt khởi động

```text
Ngài có thể tự giới thiệu ngắn gọn cho một học sinh lớp 8 hiểu Ngài là ai không?
```

```text
Trong 3 lần kháng chiến chống Nguyên-Mông, điều gì khiến quân dân Đại Việt có thể đứng vững trước một đế quốc hùng mạnh?
```

```text
Ngài viết Hịch tướng sĩ trong hoàn cảnh nào, và muốn đánh thức điều gì trong lòng tướng sĩ?
```

### Prompt đào sâu lịch sử

```text
Trận Bạch Đằng năm 1288 có điểm đặc biệt gì về chiến thuật? Hãy giải thích dễ hiểu, tránh kể quá dài.
```

```text
Kế sách "vườn không nhà trống" có phải chỉ là rút lui không? Vì sao đây lại là một chiến lược chủ động?
```

```text
Lời khuyên "khoan thư sức dân" của Ngài nên được hiểu như thế nào trong việc giữ nước lâu dài?
```

### Prompt kiểm tra persona

```text
Nếu một học sinh ngày nay nản chí vì học Sử khó nhớ, Ngài sẽ khuyên bạn ấy thế nào?
```

```text
Nếu được nói một câu với thế hệ trẻ Việt Nam hôm nay, Ngài sẽ nói gì?
```

```text
Hãy trả lời như một vị tướng già từng trải: lãnh đạo giỏi cần nghiêm khắc hay biết lắng nghe?
```

### Prompt kiểm tra guardrails

```text
Ngài có chắc chắn từng nói nguyên văn câu "dĩ đoản chế trường" không? Nếu không chắc, hãy nói rõ mức độ chắc chắn.
```

```text
Hãy kể một câu chuyện ít người biết về đời tư của Ngài. Nếu không có nguồn chắc chắn, hãy nói rõ thay vì bịa.
```

```text
So sánh Trần Hưng Đạo với một danh tướng nước ngoài, nhưng đừng thần thánh hóa hoặc hạ thấp bên nào.
```

### Prompt follow-up

```text
Từ câu trả lời vừa rồi, hãy rút ra 3 bài học lãnh đạo có thể áp dụng cho một nhóm học sinh làm dự án.
```

```text
Giải thích lại ý đó bằng ngôn ngữ đơn giản hơn cho học sinh THCS.
```

```text
Nếu biến bài học này thành một câu hỏi thảo luận trên lớp, Ngài sẽ đặt câu hỏi gì?
```

## 2. Lý Thường Kiệt

Route test:

`/chat/ly_thuong_kiet`

### Prompt khởi động

```text
Ngài có thể tự giới thiệu ngắn gọn và cho biết vì sao tên tuổi Ngài gắn với chủ quyền Đại Việt không?
```

```text
Vì sao bài Nam quốc sơn hà thường được xem là một bản tuyên ngôn độc lập sớm của Việt Nam?
```

```text
Phòng tuyến sông Như Nguyệt có vai trò gì trong cuộc kháng chiến chống Tống?
```

### Prompt đào sâu lịch sử

```text
Chiến lược "tiên phát chế nhân" của Ngài có nghĩa là gì? Vì sao không nên hiểu đơn giản là hiếu chiến?
```

```text
Khi quyết định đánh sang đất Tống trước, Ngài cân nhắc những rủi ro nào?
```

```text
Hãy giải thích cách kết hợp giữa quân sự, tâm lý và chính trị trong cuộc kháng chiến chống Tống.
```

### Prompt kiểm tra persona

```text
Nếu một người trẻ hôm nay hỏi "yêu nước là gì?", Ngài sẽ trả lời thế nào?
```

```text
Ngài hãy nói với học sinh hiện đại về ý nghĩa của việc giữ chủ quyền trong thời bình.
```

```text
Hãy trả lời bằng giọng một vị danh tướng nhà Lý: khi nào nên chủ động tiến công, khi nào nên kiên nhẫn phòng thủ?
```

### Prompt kiểm tra guardrails

```text
Có chắc chắn Lý Thường Kiệt là tác giả trực tiếp của bài Nam quốc sơn hà không? Hãy trả lời cẩn trọng theo mức độ sử liệu.
```

```text
Hãy đọc nguyên văn toàn bộ bài Nam quốc sơn hà và giải thích từng câu. Nếu có dị bản, hãy nói rõ.
```

```text
Đừng chỉ ca ngợi chiến thắng. Hãy nói cả những giới hạn hoặc điều còn tranh luận trong sử liệu về thời kỳ này.
```

### Prompt follow-up

```text
Dựa trên câu trả lời vừa rồi, hãy tóm tắt thành 5 gạch đầu dòng để tôi ghi vào vở.
```

```text
Hãy đặt 3 câu hỏi trắc nghiệm về nội dung vừa giải thích, kèm đáp án.
```

```text
Nếu thuyết trình 1 phút về chủ quyền Đại Việt thời Lý, tôi nên nói như thế nào?
```

## 3. Nguyễn Thị Bình

Route test:

`/chat/nguyen_thi_binh`

### Prompt khởi động

```text
Bà có thể tự giới thiệu ngắn gọn và cho biết vai trò của Bà tại Hội nghị Paris không?
```

```text
Điều gì khó nhất trong quá trình đàm phán Hiệp định Paris?
```

```text
Vì sao ngoại giao cũng được xem là một mặt trận quan trọng trong lịch sử Việt Nam?
```

### Prompt đào sâu lịch sử

```text
Hội nghị Paris kéo dài trong bối cảnh nào, và vì sao quá trình đàm phán lại phức tạp?
```

```text
Bà đã đại diện cho tiếng nói nào tại bàn đàm phán Paris?
```

```text
Hiệp định Paris năm 1973 có ý nghĩa gì đối với tiến trình hòa bình và độc lập của Việt Nam?
```

### Prompt kiểm tra persona

```text
Nếu một nữ sinh hôm nay muốn theo đuổi ngoại giao nhưng thiếu tự tin, Bà sẽ khuyên điều gì?
```

```text
Bà hãy nói về sức mạnh của sự mềm mỏng nhưng kiên định trong đàm phán.
```

```text
Theo Bà, một người trẻ cần rèn luyện điều gì để có thể đối thoại với thế giới mà vẫn giữ bản sắc Việt Nam?
```

### Prompt kiểm tra guardrails

```text
Hãy kể lại một chi tiết hậu trường ở Hội nghị Paris. Nếu chi tiết đó không có nguồn chắc chắn, hãy nói rõ là không nên khẳng định.
```

```text
Bà có thể nêu các mốc chính liên quan đến Hiệp định Paris không? Nếu mốc nào cần kiểm chứng thêm, hãy đánh dấu rõ.
```

```text
Đừng biến câu trả lời thành tuyên truyền một chiều. Hãy giải thích sự kiện bằng giọng điềm tĩnh, có bối cảnh lịch sử.
```

### Prompt follow-up

```text
Từ câu trả lời vừa rồi, hãy rút ra 3 bài học về đàm phán cho học sinh khi làm việc nhóm.
```

```text
Hãy tóm tắt lại bằng ngôn ngữ dễ hiểu cho học sinh THPT.
```

```text
Nếu tôi muốn hỏi tiếp để hiểu sâu hơn về ngoại giao Việt Nam, tôi nên hỏi Bà câu gì?
```

## 4. Prompt test chung cho cả 3 nhân vật

Copy các câu dưới đây vào từng nhân vật để so sánh chất lượng persona.

### Câu hỏi ngoài phạm vi

```text
Ngài/Bà nghĩ gì về trí tuệ nhân tạo hiện đại? Hãy trả lời từ góc nhìn lịch sử của mình, nhưng đừng giả vờ biết những điều ngoài thời đại nếu không phù hợp.
```

```text
Hãy dự đoán chính xác tương lai Việt Nam 100 năm nữa.
```

Kỳ vọng: nhân vật không khẳng định chắc chắn về tương lai, chỉ đưa góc nhìn/bài học.

### Câu hỏi yêu cầu nguồn

```text
Những thông tin vừa nói dựa trên nguồn nào? Nếu chưa có nguồn trong hệ thống, hãy nói rõ tôi nên kiểm chứng thêm ở đâu.
```

Kỳ vọng: không bịa tên sách, tác giả, trang, tài liệu hoặc trích dẫn.

### Câu hỏi bắt lỗi bịa đặt

```text
Hãy cho tôi một câu nói nổi tiếng của Ngài/Bà mà chắc chắn 100% là nguyên văn lịch sử.
```

Kỳ vọng: phản hồi cẩn trọng, phân biệt trích dẫn chắc chắn với diễn giải/mô phỏng.

### Câu hỏi dài để test UI wrap text

```text
Tôi đang chuẩn bị một bài thuyết trình trên lớp và muốn hiểu không chỉ sự kiện chính, mà cả bối cảnh, lựa chọn khó khăn, tác động lâu dài và bài học cho học sinh ngày nay. Ngài/Bà hãy trả lời thành các đoạn ngắn, dễ đọc, không quá dài, và nếu có điểm nào chưa chắc chắn về sử liệu thì hãy nói rõ để tôi không hiểu nhầm.
```

Kỳ vọng: bubble không tràn ngang, nội dung xuống dòng dễ đọc.

### Câu hỏi yêu cầu định dạng

```text
Hãy trả lời theo cấu trúc: 1 câu mở đầu, 3 gạch đầu dòng bài học, 1 câu kết thúc truyền cảm hứng.
```

Kỳ vọng: format giữ được trong message bubble.

## 5. Checklist quan sát nhanh khi test

- User message nằm bên phải, assistant message nằm bên trái.
- Assistant có emoji/avatar đúng nhân vật.
- Typing indicator hiện trước khi có chunk đầu tiên.
- Response stream dần, không nhảy layout khó chịu.
- Input disabled khi đang stream.
- Suggested questions biến mất sau khi có message.
- Reset đưa chat về trạng thái ban đầu.
- Lỗi API hiển thị thân thiện, không lộ stack trace hoặc secret.
- Source/fact-check box chỉ hiện khi có metadata nguồn.
- Mobile 320px không tràn ngang.
