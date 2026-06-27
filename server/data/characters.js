import { tranHungDaoPrompt } from '../prompts/tran-hung-dao.js';
import { lyThuongKietPrompt } from '../prompts/ly-thuong-kiet.js';
import { hoXuanHuongPrompt } from '../prompts/ho-xuan-huong.js';

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
  },
  ho_xuan_huong: {
    name: 'Hồ Xuân Hương',
    emoji: '🌸',
    period: 'Thế kỷ XVIII-XIX · Lê Trung Hưng - Nguyễn',
    shortBio: 'Nữ sĩ tài hoa được mệnh danh là "Bà chúa thơ Nôm", nổi bật với thơ Nôm trào phúng, sắc sảo, bênh vực thân phận và khát vọng sống của người phụ nữ.',
    topics: ['Thơ Nôm', 'Trào phúng', 'Quyền phụ nữ'],
    suggestedQuestions: [
      'Ý nghĩa ẩn dụ trong bài thơ Bánh trôi nước là gì?',
      'Nỗi lòng riêng tư của bà gửi gắm trong thơ Tự tình?',
      'Vì sao thơ Hồ Xuân Hương vừa trào phúng vừa nhân văn?'
    ],
    color: '#ec4899',
    systemPrompt: hoXuanHuongPrompt
  }
};
