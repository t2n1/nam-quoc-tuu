
import { Benefit, ProcessStep, Product, Distributor, SiteContent, BlogPost, Testimonial, FAQItem, ContactRequest } from './types';

export const APP_NAME = "Rượu Nam Quốc Tửu";
export const CONTENT_VERSION = "9";

export const INITIAL_CONTENT: SiteContent = {
  general: {
    hotline: "090 123 4567",
    address: "Thôn Nà Pài, xã Bằng Phúc, huyện Chợ Đồn, tỉnh Bắc Kạn",
    email: "htx.menlabangphuc@gmail.com",
    facebook: "#",
    isTraceabilityEnabled: true
  },
  seo: {
    defaultTitle: "Rượu Nam Quốc Tửu | Tinh Hoa Đại Ngàn",
    defaultDescription: "Sản phẩm OCOP 4 sao, 100% men lá tự nhiên từ 32 loại thảo mộc. Hương vị êm dịu, không đau đầu, đậm đà bản sắc dân tộc Tày.",
    defaultKeywords: "rượu men lá, rượu nam quốc tửu, ocop bắc kạn, rượu ngô, đặc sản tây bắc, rượu thảo dược",
    ogImage: "https://images.unsplash.com/photo-1516713026847-380d0d82d499?q=80&w=2070&auto=format&fit=crop"
  },
  ageGate: {
    heading: "Xác Nhận Độ Tuổi",
    subHeading: "Bạn có đủ 18 tuổi để truy cập website này?",
    confirmBtn: "Tôi đã trên 18 tuổi",
    rejectBtn: "Tôi chưa đủ tuổi",
    warning: "Uống rượu bia có thể gây ảnh hưởng đến sức khỏe. Vui lòng thưởng thức có trách nhiệm."
  },
  navbar: {
    logoImage: "", 
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
    backgroundImage: "https://images.unsplash.com/photo-1516713026847-380d0d82d499?q=80&w=2070&auto=format&fit=crop"
  },
  home: {
    intro: {
      tagline: "Di sản trăm năm",
      title: "Hồn cốt",
      subtitle: "người Tày",
      quote: "\"Một hương vị đánh thức mọi giác quan, nơi quá khứ và hiện tại giao thoa bên dòng suối Nặm Cắt.\"",
      body1: "Nam Quốc Tửu không chỉ là một thức uống, đó là kết tinh của thời gian. Được sinh ra từ những cánh rừng già Bắc Kạn, nơi nguồn nước suối chảy qua những tầng đá ngầm ngàn năm.",
      body2: "Sự hòa quyện giữa gạo nếp nương thơm lừng và 32 loại lá thuốc bí truyền tạo nên vị 'ngọt môi, ấm lòng' vương vấn mãi không quên.",
      image: "https://images.unsplash.com/photo-1615551910795-3b95a8634892?q=80&w=1000&auto=format&fit=crop",
      floatingText: "\"Vị ngọt hậu tự nhiên không thể tìm thấy ở bất cứ đâu.\""
    },
    headers: {
      botanicalsTagline: "Linh Hồn Của Rượu",
      botanicalsTitle: "32 Vị Thảo Mộc",
      botanicalsSubtitle: "Bí Truyền.",
      testimonialsTagline: "Testimonials",
      testimonialsTitle: "Niềm Tin",
      testimonialsSubtitle: "Khách Hàng",
      blogTagline: "Journal",
      blogTitle: "Góc Nhìn",
      blogSubtitle: "& Văn Hóa",
      faqTitle: "Giải Đáp Thắc Mắc",
      faqSubtitle: "Những điều quý khách thường quan tâm về Nam Quốc Tửu."
    },
    botanicals: [
      { name: "Lá Men Rừng", desc: "Hương thơm nồng nàn đặc trưng của núi rừng Chợ Đồn." },
      { name: "Sâm Cau", desc: "Tăng cường sức khỏe, tạo hậu vị ngọt sâu." },
      { name: "Thảo Quả", desc: "Gia tăng sự ấm áp và chiều sâu của hương vị." },
      { name: "Quế Nhục", desc: "Hương cay nhẹ, hỗ trợ tuần hoàn máu." },
    ],
    values: {
      title: "Tinh Hoa Hội Tụ",
      subtitle: "Core Values",
      description: "Những giá trị cốt lõi làm nên thương hiệu Nam Quốc Tửu.",
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
    japanExport: {
      title: "Vươn Ra Biển Lớn",
      subTitle: "Chinh phục thị trường Nhật Bản",
      description: "Tự hào là sản phẩm rượu truyền thống đầu tiên của Bắc Kạn chính thức xuất khẩu sang thị trường Nhật Bản. Vượt qua hơn 100 chỉ tiêu kiểm định khắt khe về an toàn thực phẩm, Rượu Nam Quốc Tửu đã khẳng định vị thế và chất lượng quốc tế.",
      badgeText: "Export to Japan",
      images: [
        "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2092&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2036&auto=format&fit=crop", 
      ]
    },
    gallery: {
      title: "Thư Viện Hình Ảnh",
      description: "Hình ảnh sản phẩm thực tế và những khoảnh khắc đáng nhớ tại Nhật Bản.",
      images: [
        "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?q=80&w=1000",
        "https://images.unsplash.com/photo-1615551910795-3b95a8634892?q=80&w=1000",
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800",
        "https://images.unsplash.com/photo-1563205096-75128038758b?q=80&w=2070"
      ]
    },
    collection: {
      tagline: "Collection",
      title: "Master\nPiece",
      description: "Tuyệt phẩm thiết kế dành riêng cho những khoảnh khắc đặc biệt. Sang trọng, tinh tế và đầy ắp ý nghĩa.",
      buttonText: "Khám phá bộ sưu tập",
      bgImage: "https://images.unsplash.com/photo-1563205096-75128038758b?q=80&w=2070&auto=format&fit=crop",
      image: "https://picsum.photos/id/431/600/800"
    },
    traceabilityBanner: {
      bgText: "TRUST",
      quote: "\"Minh bạch là sự tôn trọng cao nhất dành cho khách hàng.\"",
      title: "Xác thực nguồn gốc"
    }
  },
  story: {
    header: {
      tagline: "Heritage & Legacy",
      title: "Di Sản",
      subtitle: "Nam Quốc Tửu",
      quote: "\"Nơi mỗi giọt rượu kể về một huyền thoại trăm năm giữa đại ngàn.\"",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    chapter1: {
      label: "Chương I",
      title: "Khởi Nguồn Của Lửa",
      quote: "\"Giữa cái lạnh thấu xương của núi rừng Đông Bắc, người Tày đã tìm ra ngọn lửa sưởi ấm tâm hồn.\"",
      dropCapText: "T",
      content: "ừ hàng trăm năm nay, tại xã Bằng Phúc, huyện Chợ Đồn, ngọn lửa lò nấu rượu chưa bao giờ tắt. Đó không chỉ là sinh kế, mà là nét văn hóa ăn sâu vào máu thịt của người dân nơi đây. Mỗi mẻ rượu ra lò đều chứa đựng sự tỉ mỉ, kiên nhẫn và lòng tôn kính với thiên nhiên.",
      image: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?q=80&w=1000&auto=format&fit=crop",
      imageCaption: "Hình 01. Những bánh men lá được phơi khô tự nhiên"
    },
    section2: {
      title: "Hành Trình Đánh Thức Thương Hiệu",
      content: "Câu chuyện về Rượu Nam Quốc Tửu hiện đại không thể không nhắc đến bà Tâm (thôn Nà Hồng). Bà là người tiên phong đưa rượu ra khỏi lũy tre làng, đóng vào can, chai để mang đi các xã lân cận bán. Từ những chuyến đi ấy, tiếng lành đồn xa, hương vị Nam Quốc Tửu dần chinh phục những thực thực khách khó tính nhất."
    },
    highlight: {
      title: "Bí mật Nặm Cắt",
      content: "\"Nhiều người mang men lá đi nơi khác nấu, nhưng rượu không bao giờ ngon bằng. Bởi lẽ, cái hồn của rượu nằm ở nước suối Nặm Cắt. Nguồn nước chảy qua các tầng địa chất đặc biệt mang lại vị ngọt hậu và độ êm dịu mà nước máy hay nước giếng khơi không thể nào sánh được.\""
    },
    section3: {
      title: "Tầm Nhìn OCOP",
      content: "Hôm nay, HTX Rượu Nam Quốc Tửu tự hào khoác lên mình tấm áo mới: OCOP 4 sao. Chúng tôi kết hợp quy trình thủ công truyền thống với công nghệ lọc Aldehyde hiện đại, đảm bảo từng giọt rượu đến tay khách hàng không chỉ ngon mà còn an toàn tuyệt đối cho sức khỏe."
    },
    signature: {
      name: "Bà Tâm",
      role: "Nghệ nhân"
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
    bottomQuote: "Thời gian là gia vị quan trọng nhất."
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
      titleLine1: "Rượu Men Lá",
      titleHighlight: "Nam Quốc Tửu",
      description: "Tinh hoa ẩm thực dân tộc Tày. Sản phẩm OCOP 4 sao, gìn giữ hương vị truyền thống hàng trăm năm bên dòng suối Nặm Cắt."
    },
    sections: {
      linksTitle: "Khám Phá",
      contactTitle: "Liên Hệ HTX"
    },
    bottom: {
      copyright: "HTX Rượu Nam Quốc Tửu. All rights reserved.",
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
    description: "Thiết kế sang trọng, phù hợp làm quà biếu hoặc sử dụng trong các bữa ăn gia đình ấm cúng. Chai thủy tinh cao cấp bảo quản trọn vẹn hương vị.",
    image: "https://picsum.photos/id/431/600/800",
    scales: {
      sweetness: 2,
      aroma: 4,
      body: 4,
      finish: 5,
      intensity: 4
    },
    pairings: [
      { name: "Thịt Lợn Bản Gác Bếp", description: "Vị khói bếp quyện cùng men lá nồng nàn.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400" },
      { name: "Cá Suối Nướng Trõ", description: "Vị ngọt cá suối làm dịu độ nồng của rượu.", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400" }
    ]
  },
  {
    id: 'p2',
    name: "Rượu Men Lá Can Lớn",
    volume: "10 Lít",
    type: "Sỉ",
    description: "Giải pháp kinh tế cho nhà hàng, quán ăn hoặc các sự kiện lớn. Giữ trọn hương vị truyền thống trong can nhựa thực phẩm an toàn.",
    image: "https://picsum.photos/id/225/600/800",
    scales: {
      sweetness: 2,
      aroma: 3,
      body: 5,
      finish: 4,
      intensity: 5
    },
    pairings: [
      { name: "Lẩu Gà Đen H’Mông", description: "Sự ấm nóng thảo dược hòa quyện ngày đông.", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=400" },
      { name: "Dê Núi Chợ Đồn", description: "Thịt dê núi chắc ngọt hợp vị rượu mạnh.", image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=400" }
    ]
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
    image: "https://images.unsplash.com/photo-1541533260371-b8fc9b030eb3?q=80&w=800&auto=format&fit=crop",
    category: "Văn Hóa",
    author: "Ban Biên Tập"
  },
  {
    id: 'n2',
    title: "Nam Quốc Tửu đạt chuẩn OCOP 4 sao: Hành trình khẳng định vị thế",
    slug: "bang-phuc-dat-chuan-ocop-4-sao",
    excerpt: "Sau nhiều nỗ lực cải tiến quy trình lọc và bao bì, sản phẩm của HTX đã chính thức được công nhận OCOP 4 sao.",
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
    question: "Rượu Nam Quốc Tửu có gây đau đầu không?",
    answer: "Sản phẩm của chúng tôi được sản xuất theo quy trình OCOP 4 sao, đã qua hệ thống lọc khử Aldehyde và Methanol hiện đại. Vì vậy, rượu uống rất êm, dịu và cam kết không gây đau đầu hay mệt mỏi sau khi uống."
  },
  {
    question: "Rượu có thể bảo quản được trong bao lâu?",
    answer: "Sản phẩm của chúng tôi càng để lâu càng ngon (quá trình hạ thổ tự nhiên). Nếu bảo quản ở nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp, rượu có thể để được nhiều năm mà hương vị ngày càng đầm."
  },
  {
    question: "Tôi muốn mua sỉ hoặc làm đại lý thì chính sách thế nào?",
    answer: "Chúng tôi có chính sách chiết khấu hấp dẫn và hỗ trợ marketing cho các đại lý. Vui lòng liên hệ trực tiếp hotline hoặc điền form đăng ký để được bộ phận kinh doanh tư vấn chi tiết."
  },
  {
    question: "HTX có hỗ trợ vận chuyển đi tỉnh không?",
    answer: "Có. Chúng tôi liên kết với các đơn vị vận chuyển uy tín để giao hàng toàn quốc (Viettel Post, GHTK...). Sản phẩm được đóng gói chống sốc kỹ lưỡng, đảm bảo an toàn tuyệt đối khi đến tay khách hàng."
  }
];

export const MOCK_CONTACTS: ContactRequest[] = [
  { id: 'c1', name: 'Nguyễn Văn An', phone: '0912345678', interest: 'Đăng ký đại lý', message: 'Tôi muốn hỏi chính sách đại lý tại khu vực Bắc Ninh.', date: '19/12/2024', status: 'new' },
  { id: 'c2', name: 'Trần Thị Bích', phone: '0987654321', interest: 'Can 10 Lít (Sỉ/Nhà hàng)', message: 'Báo giá sỉ cho nhà hàng tiệc cưới.', date: '18/12/2024', status: 'contacted' },
  { id: 'c3', name: 'Lê Hoàng', phone: '0909090909', interest: 'Chai 500ml (Dùng thử)', message: 'Ship cod về Hà Nội bao lâu ạ?', date: '15/12/2024', status: 'done' },
];
