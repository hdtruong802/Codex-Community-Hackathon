import { tranHungDaoPrompt } from '../prompts/tran-hung-dao.js';
import { nguyenTraiPrompt } from '../prompts/nguyen-trai.js';
import { hoXuanHuongPrompt } from '../prompts/ho-xuan-huong.js';
import { nguyenDuPrompt } from '../prompts/nguyen-du.js';
import { lyThuongKietPrompt } from '../prompts/ly-thuong-kiet.js';

export const characters = {
  tran_hung_dao: {
    name: 'Trần Hưng Đạo',
    emoji: '⚔️',
    period: 'Thế kỷ XIII · Nhà Trần',
    shortBio: 'Quốc công Tiết chế vĩ đại, người lãnh đạo quân dân Đại Việt 3 lần đánh bại quân xâm lược Nguyên-Mông hùng mạnh bậc nhất thế giới.',
    topics: ['Chiến thuật', 'Lãnh đạo', 'Hào khí Đông A'],
    suggestedQuestions: [
      'Trận nào trong 3 lần đánh quân Nguyên khó khăn nhất?',
      'Ngài viết Hịch tướng sĩ trong hoàn cảnh nào?',
      'Lời khuyên khoan thư sức dân của Ngài có ý nghĩa gì?'
    ],
    color: '#ef4444',
    systemPrompt: tranHungDaoPrompt
  },
  nguyen_trai: {
    name: 'Nguyễn Trãi',
    emoji: '📝',
    period: 'Thế kỷ XV · Nhà Hậu Lê',
    shortBio: 'Khai quốc công thần nhà Hậu Lê, danh nhân văn hóa thế giới, tác giả của Bình Ngô Đại Cáo. Nhà quân sự thiên tài với tư tưởng lấy "nhân nghĩa" làm gốc.',
    topics: ['Nhân nghĩa', 'Mưu phạt tâm công', 'Văn học'],
    suggestedQuestions: [
      'Mưu phạt tâm công nghĩa là đánh vào lòng người như thế nào?',
      'Hoàn cảnh ra đời của bài Bình Ngô Đại Cáo?',
      'Nỗi lòng của Ngài gửi gắm qua Quốc âm thi tập?'
    ],
    color: '#3b82f6',
    systemPrompt: nguyenTraiPrompt
  },
  ho_xuan_huong: {
    name: 'Hồ Xuân Hương',
    emoji: '🌸',
    period: 'Thế kỷ XVIII-XIX · Lê Trung Hưng - Nguyễn',
    shortBio: 'Nữ thi sĩ kiệt xuất được mệnh danh là "Bà chúa thơ Nôm". Thơ của bà mang phong cách trào phúng châm biếm sâu cay, bênh vực người phụ nữ.',
    topics: ['Thơ Nôm', 'Trào phúng', 'Quyền phụ nữ'],
    suggestedQuestions: [
      'Ý nghĩa ẩn dụ trong bài thơ Bánh trôi nước là gì?',
      'Nỗi lòng riêng tư của bà gửi gắm trong thơ Tự tình?',
      'Làm thế nào bà vượt qua được định kiến xã hội thời bấy giờ?'
    ],
    color: '#ec4899',
    systemPrompt: hoXuanHuongPrompt
  },
  nguyen_du: {
    name: 'Nguyễn Du',
    emoji: '📜',
    period: 'Thế kỷ XVIII-XIX · Nhà Nguyễn',
    shortBio: 'Đại thi hào dân tộc, danh nhân văn hóa thế giới, tác giả kiệt tác Truyện Kiều. Thơ của ông chan chứa tinh thần nhân đạo và lòng trắc ẩn.',
    topics: ['Truyện Kiều', 'Nhân đạo', 'Bể dâu cuộc đời'],
    suggestedQuestions: [
      'Cảm hứng nào giúp cụ viết nên kiệt tác Truyện Kiều?',
      'Ý nghĩa hai chữ "bể dâu" cụ thường nhắc tới là gì?',
      'Tấm lòng cụ dành cho kiếp người bất hạnh qua Văn tế thập loại chúng sinh?'
    ],
    color: '#f59e0b',
    systemPrompt: nguyenDuPrompt
  },
  ly_thuong_kiet: {
    name: 'Lý Thường Kiệt',
    emoji: '🏛️',
    period: 'Thế kỷ XI · Nhà Lý',
    shortBio: 'Thái úy danh tướng nhà Lý, người đánh bại đại quân nhà Tống xâm lược. Ông gắn liền với bài thơ Nam quốc sơn hà - tuyên ngôn độc lập đầu tiên.',
    topics: ['Nam quốc sơn hà', 'Tiên phát chế nhân', 'Phòng ngự sông Cầu'],
    suggestedQuestions: [
      'Sự thật về bài thơ thần Nam quốc sơn hà vang lên bên sông Như Nguyệt?',
      'Tại sao Ngài áp dụng chiến thuật tiên phát chế nhân đánh sang đất Tống?',
      'Ngài xây dựng chiến tuyến sông Cầu phòng thủ ra sao?'
    ],
    color: '#10b981',
    systemPrompt: lyThuongKietPrompt
  }
};
