
import { Benefit, ProcessStep, Product, Distributor, SiteContent, BlogPost, Testimonial, FAQItem } from './types';

export const APP_NAME = "Nam Quốc Tửu";
export const CONTENT_VERSION = "8";

export const INITIAL_CONTENT: SiteContent = {
  general: {
    hotline: "0966383188",
    address: "Đường Bàng Bá Lân 2, Phường Bắc Giang, Tỉnh Bắc Ninh",
    email: "ctyhoanhao188@gmail.com",
    facebook: "#"
  },
  ageGate: {
    heading: "Xác Nhận Độ Tuổi",
    subHeading: "Bạn có đủ 18 tuổi để truy cập website này?",
    confirmBtn: "Tôi đã trên 18 tuổi",
    rejectBtn: "Tôi chưa đủ tuổi",
    warning: "Uống rượu bia có thể gây ảnh hưởng đến sức khỏe. Vui lòng thưởng thức có trách nhiệm."
  },
  navbar: {
    logoImage: "/logo-nqt.svg",
    logoText: "Nam Quốc Tửu",
    logoSubText: "est. 18xx",
    menuHome: "Trang Chủ",
    menuStory: "Di Sản",
    menuProducts: "Bộ Sưu Tập",
    menuProcess: "Quy Trình",
    menuTraceability: "Tra Cứu",
    contactButton: "Liên Hệ",
    mobileMenuCta: "Đặt Hàng Ngay"
  },
  hero: {
    topTagline: "Tinh hoa đại ngàn",
    mainTitle: "Nam Quốc Tửu",
    subTitle: "Heritage Spirit",
    description: "\"Một tuyệt tác được dệt nên từ 32 loại thảo mộc rừng và nguồn nước suối Nặm Cắt thanh khiết.\"",
    buttonText: "Thưởng Thức",
    backgroundImage: "https://images.unsplash.com/photo-1758637689499-b3b477a5fecb?q=80&w=2070&auto=format&fit=crop"
  },
  home: {
    intro: {
      tagline: "Di sản trăm năm",
      title: "Hồn cốt",
      subtitle: "người Tày",
      quote: "\"Một hương vị đánh thức mọi giác quan, nơi quá khứ và hiện tại giao thoa bên dòng suối Nặm Cắt.\"",
      body1: "Men Lá Bằng Phúc không chỉ là một thức uống, đó là kết tinh của thời gian. Được sinh ra từ những cánh rừng già Bắc Kạn, nơi nguồn nước suối chảy qua những tầng đá ngầm ngàn năm.",
      body2: "Sự hòa quyện giữa gạo nếp nương thơm lừng và 32 loại lá thuốc bí truyền tạo nên vị 'ngọt môi, ấm lòng' vương vấn mãi không quên.",
      image: "https://images.unsplash.com/photo-1561535893-bb7a98c7ee45?q=80&w=1000&auto=format&fit=crop",
      floatingText: "\"Vị ngọt hậu tự nhiên không thể tìm thấy ở bất cứ đâu.\""
    },
    values: {
      title: "Tinh Hoa Hội Tụ",
      subtitle: "Core Values",
      description: "Những giá trị cốt lõi làm nên thương hiệu Bằng Phúc.",
      items: [
        {
          icon: "Leaf",
          title: "Men Lá Tự Nhiên",
          desc: "100% thảo mộc tự nhiên từ rừng sâu. Không hóa chất, không hương liệu."
        },
        {
          icon: "Droplets",
          title: "Nguồn Nước Vàng",
          desc: "Bí quyết nằm ở nước suối Nặm Cắt. Vị ngọt hậu thanh khiết độc bản."
        },
        {
          icon: "Award",
          title: "Chuẩn OCOP 4 Sao",
          desc: "Quy trình hiện đại, khử Aldehyde, an toàn tuyệt đối cho sức khỏe."
        }
      ]
    },
    collection: {
      tagline: "Collection",
      title: "Master\nPiece",
      description: "Tuyệt phẩm thiết kế dành riêng cho những khoảnh khắc đặc biệt. Sang trọng, tinh tế và đầy ắp ý nghĩa.",
      buttonText: "Khám phá bộ sưu tập",
      bgImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop"
    },
    traceabilityBanner: {
      bgText: "TRUST",
      quote: "\"Minh bạch là sự tôn trọng cao nhất dành cho khách hàng.\"",
      title: "Xác thực nguồn gốc"
    }
  },
  story: {
    header: {
      title: "Bằng Phúc",
      subtitle: "Di sản",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    chapter1: {
      label: "Chương I",
      title: "Ngọn Lửa Không Tắt",
      quote: "\"Giữa đại ngàn Đông Bắc, nơi sương mù quanh năm ôm ấp từng nếp nhà sàn, người Tày đã đúc kết một triết lý: rượu không chỉ là thức uống — đó là ngôn ngữ của tâm hồn.\"",
      dropCapText: "T",
      content: "ừ thế kỷ XVIII, tại xã Bằng Phúc, huyện Chợ Đồn, tỉnh Bắc Kạn, những mẻ rượu men lá đầu tiên đã ra đời. Không phải ngẫu nhiên mà người Tày chọn nơi này để giữ lửa nghề — nơi có rừng già che chở, nơi có suối Nậm Cắt luân lưu qua từng tầng đá cổ. Trong đời sống của người Tày, rượu men lá không đơn giản là thức uống. Nó hiện diện trong lễ cúng thần rừng, trong đám cưới, trong buổi lễ Lồng Tồng xuống đồng đầu xuân. Chén rượu được rót không phải để say, mà để kết nối — giữa người với người, giữa người với đất trời, giữa hiện tại với tổ tiên.",
      image: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?q=80&w=1000&auto=format&fit=crop",
      imageCaption: "Hình 01. Những bánh men lá được phơi tự nhiên giữa đại ngàn Bắc Kạn"
    },
    section2: {
      title: "Linh Hồn Ẩn Trong Lá Và Nước",
      content: "Điều làm nên sự khác biệt của Men Lá Bằng Phúc không nằm ở công nghệ — mà nằm ở tri thức được truyền miệng qua bao thế hệ. Từ 19 đến 32 loại thảo mộc được thu hái theo mùa: có loại chỉ mọc trên đỉnh núi cao hơn 800m, có loại chỉ ra lá vào tháng giêng khi sương còn đọng. Người thợ giỏi nhận ra lá tốt bằng mùi hương, bằng màu sắc, bằng cảm giác của ngón tay — chứ không phải bằng máy móc hay phân tích hóa học. Nhưng ngay cả khi mang đúng những lá thuốc ấy đến vùng đất khác, rượu vẫn không đạt được vị ngọt hậu đặc trưng. Bởi một nửa linh hồn của rượu nằm ở suối Nậm Cắt — nguồn nước chảy qua các địa tầng đặc biệt, mang theo khoáng chất tự nhiên tạo nên vị êm dịu và hương thơm không thể sao chép."
    },
    highlight: {
      title: "Lời Người Giữ Lửa",
      content: "\"Có những năm rượu công nghiệp tràn lan, người ta hỏi tôi sao không làm theo cho nhanh, cho rẻ. Tôi chỉ trả lời: cái gì nấu bằng lá rừng, bằng nước suối, bằng đôi tay người — thì không thể vội được. Tôi giữ nghề này không phải vì không có lựa chọn nào khác. Tôi giữ vì tôi biết: một ngày nào đó, người ta sẽ tìm lại những thứ thật.\""
    },
    section3: {
      title: "Từ Bản Làng Ra Thế Giới",
      content: "Nam Quốc Tửu chính thức được công nhận OCOP 4 sao — không phải bằng cách thay đổi công thức, mà bằng cách nâng chuẩn quy trình: hệ thống lọc khử Aldehyde hiện đại, bao bì được thiết kế xứng tầm, và cam kết minh bạch về nguồn gốc từng mẻ rượu. Hôm nay, từ những buổi họp mặt gia đình ở Hà Nội đến những bàn tiệc tại Sài Gòn, Nam Quốc Tửu đang kể câu chuyện của bản làng Bằng Phúc — không phải như một di vật của quá khứ, mà như một tinh hoa đang sống, đang lớn, đang vươn ra."
    },
    signature: {
      name: "Bà Tâm",
      role: "Nghệ nhân sáng lập • Thôn Nà Hồng, Bằng Phúc"
    }
  },
  productsPage: {
    header: {
      tagline: "The Collection",
      title: "Bộ Sưu Tập",
      subtitle: "Tinh hoa chưng cất từ đại ngàn"
    },
    b2b: {
      tagline: "Partnership",
      title: "Trở thành Đại Lý Chính Thức",
      content: "Cùng chúng tôi mang tinh hoa đại ngàn đến với mọi miền tổ quốc. Chính sách ưu đãi đặc biệt dành cho đối tác chiến lược.",
      buttonText: "Liên hệ hợp tác"
    }
  },
  processPage: {
    header: {
      tagline: "Craftsmanship",
      title: "Quy Trình Tạo Tác",
      subtitle: "\"Mỗi giọt rượu là kết quả của sự kiên nhẫn và tỉ mỉ qua hàng nghìn giờ.\""
    },
    bottomQuote: "\"Thời gian là gia vị quan trọng nhất.\""
  },
  traceabilityPage: {
    header: {
      title: "Xác Thực Nguồn Gốc",
      subtitle: "Nhập số điện thoại đại lý để kiểm tra chứng nhận ủy quyền chính hãng OCOP."
    }
  },
  contactPage: {
    title: "Liên Hệ Đặt Hàng",
    subtitle: "Quý khách có nhu cầu mua lẻ, mua sỉ hoặc đăng ký làm đại lý, vui lòng liên hệ với chúng tôi qua thông tin dưới đây hoặc điền vào biểu mẫu.",
    addressLabel: "Địa chỉ sản xuất",
    hotlineLabel: "Hotline",
    emailLabel: "Email",
    formTitle: "Gửi Tin Nhắn",
    formNameLabel: "Họ Tên",
    formPhoneLabel: "Số Điện Thoại",
    formInterestLabel: "Loại sản phẩm quan tâm",
    formMessageLabel: "Lời Nhắn",
    submitButton: "Gửi Yêu Cầu",
    interestOptions: [
      "Chai 500ml (Dùng thử)",
      "Can 10 Lít (Sỉ/Nhà hàng)",
      "Đăng ký đại lý",
      "Khác"
    ]
  },
  footer: {
    brand: {
      since: "Since 19xx",
      titleLine1: "",
      titleHighlight: "Nam Quốc Tửu",
      description: "Tinh hoa ẩm thực dân tộc Tày. Sản phẩm OCOP 4 sao, gìn giữ hương vị truyền thống hàng trăm năm bên dòng suối Nặm Cắt."
    },
    sections: {
      linksTitle: "Khám Phá",
      contactTitle: "Liên Hệ"
    },
    bottom: {
      copyright: "Nam Quốc Tửu. All rights reserved.",
      disclaimer: "Uống rượu có trách nhiệm. Không lái xe khi đã uống rượu."
    }
  }
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: "Rượu Men Lá Chai Thủy Tinh",
    volume: "500ml",
    type: "Lẻ",
    description: "Thiết kế sang trọng, phù hợp làm quà biếu hoặc sử dụng trong các bữa ăn gia đình ấm cúng.",
    image: "https://picsum.photos/id/431/600/800"
  },
  {
    id: 'p2',
    name: "Rượu Men Lá Can Lớn",
    volume: "10 Lít",
    type: "Sỉ",
    description: "Giải pháp kinh tế cho nhà hàng, quán ăn hoặc các sự kiện lớn. Giữ trọn hương vị truyền thống.",
    image: "https://picsum.photos/id/225/600/800"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Tìm lá thuốc rừng",
    description: [
      "Thu hái từ 19-32 loại lá thuốc tự nhiên.",
      "Chọn lá có mùi thơm đặc biệt và dược tính tốt."
    ],
    icon: "Leaf"
  },
  {
    step: 2,
    title: "Chuẩn bị men",
    description: [
      "Lá rửa sạch, phơi khô, đun lấy nước cốt.",
      "Gạo nếp ngâm nước lá, xay bột, nặn thành viên men."
    ],
    icon: "Sprout"
  },
  {
    step: 3,
    title: "Ủ rượu",
    description: [
      "Hấp gạo thành xôi, để nguội.",
      "Trộn men, ủ từ 30-60 ngày để chuyển hóa tự nhiên."
    ],
    icon: "Hourglass"
  },
  {
    step: 4,
    title: "Chưng cất & Lọc",
    description: [
      "Chưng cất thủ công giữ hương vị.",
      "Lọc khử aldehyde và tạp chất bằng máy hiện đại."
    ],
    icon: "FlaskConical"
  },
  {
    step: 5,
    title: "Đóng chai",
    description: [
      "Đóng chai/can chính hãng.",
      "Bảo quản tiêu chuẩn OCOP 4 sao."
    ],
    icon: "PackageCheck"
  }
];

export const BENEFITS: Benefit[] = [
  { title: "Hỗ trợ tiêu hóa", description: "Giúp kích thích tiêu hóa, ăn ngon miệng hơn." },
  { title: "Ấm bụng", description: "Rất tốt cho người có hệ tiêu hóa yếu, hay bị lạnh bụng." },
  { title: "Không đau đầu", description: "Đã được khử Andehit, uống êm, tỉnh táo nhanh." },
  { title: "Bổ máu & Lợi tiểu", description: "Nhờ thành phần thảo dược quý từ núi rừng." }
];

export const MOCK_DISTRIBUTORS: Distributor[] = [
  { phone: "09012345678", name: "Đại lý Cầu Giấy - Hà Nội", address: "123 Cầu Giấy, Hà Nội", status: "active" },
  { phone: "0988888888", name: "Đại lý Quận 1 - TP.HCM", address: "45 Lê Lợi, Q1, TP.HCM", status: "active" },
  { phone: "0912345678", name: "Đại lý Đà Nẵng", address: "78 Nguyễn Văn Linh, Đà Nẵng", status: "active" },
];

export const MOCK_NEWS: BlogPost[] = [
  {
    id: 'n1',
    title: "Lễ hội Lồng Tồng và chén rượu men lá đầu xuân",
    slug: "le-hoi-long-tong-va-chen-ruou-men-la",
    excerpt: "Mỗi dịp xuân về, người Tày tại Bằng Phúc lại dâng lên thần linh những chén rượu thơm nồng, cầu mong một năm mưa thuận gió hòa.",
    content: "Lễ hội Lồng Tồng (xuống đồng) là lễ hội quan trọng bậc nhất của người Tày...",
    date: "12/03/2024",
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=800&auto=format&fit=crop",
    category: "Văn Hóa",
    author: "Ban Biên Tập"
  },
  {
    id: 'n2',
    title: "Bằng Phúc đạt chuẩn OCOP 4 sao: Hành trình khẳng định vị thế",
    slug: "bang-phuc-dat-chuan-ocop-4-sao",
    excerpt: "Sau nhiều nỗ lực cải tiến quy trình lọc và bao bì, Nam Quốc Tửu đã chính thức được công nhận OCOP 4 sao.",
    content: "Đây là kết quả của sự nỗ lực không ngừng nghỉ...",
    date: "28/02/2024",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=800&auto=format&fit=crop",
    category: "Tin Tức",
    author: "Nguyễn Văn A"
  },
  {
    id: 'n3',
    title: "Cách thưởng thức rượu men lá chuẩn vị người bản địa",
    slug: "cach-thuong-thuc-ruou-men-la-chuan-vi",
    excerpt: "Rượu ngon phải có bạn hiền, và phải biết cách uống để cảm nhận hết tầng hương thảo mộc ẩn sâu trong từng giọt.",
    content: "Để cảm nhận hết hương vị, hãy uống từ từ...",
    date: "15/01/2024",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
    category: "Kiến Thức",
    author: "Nghệ nhân B"
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: "Anh Hoàng Nam",
    role: "CEO TechStart - Hà Nội",
    content: "Tôi rất ấn tượng với vị êm dịu và hương thơm thảo mộc tự nhiên của rượu. Đã mua làm quà biếu đối tác và nhận được phản hồi rất tích cực.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 't2',
    name: "Chị Minh Thư",
    role: "Chủ nhà hàng Ẩm Thực Việt",
    content: "Khách hàng của tôi rất thích loại rượu này vì uống vào không bị đau đầu. Đây là sản phẩm chủ lực trong menu đồ uống của nhà hàng.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 't3',
    name: "Bác Nguyễn Văn Hùng",
    role: "Khách hàng thân thiết",
    content: "Rượu chuẩn vị men lá ngày xưa. Uống vào thấy ấm bụng, ngủ ngon. Tôi đã giới thiệu cho cả hội cựu chiến binh dùng thử.",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg"
  }
];

export const MOCK_FAQS: FAQItem[] = [
  {
    question: "Rượu Men Lá Bằng Phúc có gây đau đầu không?",
    answer: "Sản phẩm của chúng tôi được sản xuất theo quy trình OCOP 4 sao, đã qua hệ thống lọc khử Aldehyde và Methanol hiện đại. Vì vậy, rượu uống rất êm, dịu và cam kết không gây đau đầu hay mệt mỏi sau khi uống."
  },
  {
    question: "Rượu có thể bảo quản được trong bao lâu?",
    answer: "Rượu men lá càng để lâu càng ngon (quá trình hạ thổ tự nhiên). Nếu bảo quản ở nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp, rượu có thể để được nhiều năm mà hương vị ngày càng đầm."
  },
  {
    question: "Tôi muốn mua sỉ hoặc làm đại lý thì chính sách thế nào?",
    answer: "Chúng tôi có chính sách chiết khấu hấp dẫn và hỗ trợ marketing cho các đại lý. Vui lòng liên hệ trực tiếp hotline hoặc điền form đăng ký để được bộ phận kinh doanh tư vấn chi tiết."
  },
  {
    question: "Nam Quốc Tửu có hỗ trợ vận chuyển đi tỉnh không?",
    answer: "Có. Chúng tôi liên kết với các đơn vị vận chuyển uy tín để giao hàng toàn quốc (Viettel Post, GHTK...). Sản phẩm được đóng gói chống sốc kỹ lưỡng, đảm bảo an toàn tuyệt đối khi đến tay khách hàng."
  }
];
