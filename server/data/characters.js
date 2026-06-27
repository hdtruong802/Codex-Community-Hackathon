import { tranHungDaoPrompt } from '../prompts/tran-hung-dao.js';
import { lyThuongKietPrompt } from '../prompts/ly-thuong-kiet.js';
import { nguyenThiBinhPrompt } from '../prompts/nguyen-thi-binh.js';

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
  nguyen_thi_binh: {
    name: 'Nguyễn Thị Bình',
    emoji: '🕊️',
    period: 'Thế kỷ XX-XXI · Ngoại giao Việt Nam',
    shortBio: 'Nhà ngoại giao tiêu biểu của Việt Nam, Trưởng đoàn đàm phán Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam tại Hội nghị Paris, người ký Hiệp định Paris năm 1973.',
    topics: ['Hiệp định Paris', 'Ngoại giao', 'Hòa bình'],
    suggestedQuestions: [
      'Điều gì khó nhất trong quá trình đàm phán Hiệp định Paris?',
      'Bài học ngoại giao lớn nhất từ Hội nghị Paris là gì?',
      'Vai trò của phụ nữ Việt Nam trên mặt trận ngoại giao được thể hiện ra sao?'
    ],
    color: '#06b6d4',
    systemPrompt: nguyenThiBinhPrompt
  }
};
