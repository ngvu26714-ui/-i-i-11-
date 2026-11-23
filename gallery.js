


"use strict";

// ======================================================
// BBB11 - THƯ VIỆN ẢNH THEO HOẠT ĐỘNG
// Lưu ảnh: Supabase Storage
// Giao diện: Xanh quân đội - vàng ánh kim
// ======================================================

(function () {
    const BUCKET_URL =
        "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/";

    // ==================================================
    // DANH SÁCH HOẠT ĐỘNG
    // Muốn thêm nhiều ảnh vào một hoạt động,
    // thêm ảnh vào mảng images của hoạt động đó.
    // ==================================================

  
const GALLERY_ACTIVITIES = [
    // KHU VỰC 01
    {
        id: "01. Lễ tuyên thệ chiến sĩ mới",
        title: "LỄ TUYÊN THỆ CHIẾN SĨ MỚI",
        album: " LỄ TUYÊN THỆ CHIẾN SĨ MỚI",
        description: "Ghi lại những khoảnh khắc thiêng liêng và đáng nhớ của người chiến sĩ.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-01.jpg.jpg", title: "Van nghe", description: "Toàn cảnh buổi lễ" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-08.jpg.jpg", title: "Ảnh 02", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-34.jpg.jpg", title: "Ảnh 03", description: "" },
            { src: "", title: "Ảnh 04", description: "" },
            { src: "", title: "Ảnh 05", description: "" },
            { src: "", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-02.jpg.jpg", title: "", description: "" }
        ]
    },

    // KHU VỰC 02
    {
        id: "DẤU ẤN THAO TRƯỜNG",
        title: "HUẤN LUYỆN CHIẾN SĨ",
        album: "DẤU ẤN THAO TRƯỜNG",
        description: "Những ngày tháng rèn luyện ý chí, bản lĩnh và tinh thần vượt khó.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-18.jpg", title: "Giờ huấn luyện", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-19.jpg", title: "Vượt nắng thắng mưa", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-20.jpg", title: "Đồng đội trên thao trường", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-21.jpg", title: "Quyết tâm giành kết quả cao", description: "" },
            { src: "", title: "Ảnh 05", description: "" },
            { src: "", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

    // KHU VỰC 03
    {
        id: "VỮNG VÀNG BẢN LĨNH CHÍNH TRỊ",
        title: "HỌC TẬP CHÍNH TRỊ",
        album: " HỌC TẬP CHÍNH TRỊ",
        description: "Không ngừng học tập, nâng cao nhận thức và trách nhiệm của người quân nhân.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-16.jpg", title: "Ảnh 01", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-17.jpg", title: "Ảnh 02", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-44.jpg", title: "Ảnh 03", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-47.jpg", title: "Ảnh 04", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-48.jpg", title: "Ảnh 05", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-45.jpg", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

    // KHU VỰC 04
    {
        id: "TÌNH ĐỒNG CHÍ, NGHĨA ĐỒNG ĐỘI",
        title: "VĂN NGHỆ",
        album: "- Hoạt động văn nghệ",
        description: "Lưu giữ những khoảnh khắc sẻ chia, đoàn kết và gắn bó.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-03.jpg.jpg", title: "Ảnh 01", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-04.jpg.jpg", title: "Ảnh 02", description: "" },
            { src: "", title: "Ảnh 03", description: "" },
            { src: "", title: "Ảnh 04", description: "" },
            { src: "", title: "Ảnh 05", description: "" },
            { src: "", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

    // KHU VỰC 05
    {
        id: "ĐẠI ĐỘI 11 - MỘT TẬP THỂ, MỘT QUYẾT TÂM",
        title: "Hình ảnh lưu niệm",
        album: "THỂ DỤC THỂ THAO",
        description: "Những hình ảnh đẹp, ghi dấu chặng đường trưởng thành của đơn vị.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-22.jpg", title: "Ảnh 01", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-23.jpg", title: "Ảnh 02", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-43.jpg", title: "Ảnh 03", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-58.jpg", title: "Ảnh 04", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-59.jpg", title: "Ảnh 05", description: "" },
            { src: "", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

    // KHU VỰC 06
    {
        id: " Hình ảnh vệ sinh môi trường",
        title: "CHUNG TAY XÂY DỰNG DOANH TRẠI XANH",
        album: "NGÀY CHỦ NHẬT XANH",
        description: "Tuổi trẻ Đại đội 11 chung tay vệ sinh môi trường, xây dựng doanh trại chính quy, xanh, sạch, đẹp.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-05.jpg.jpg", title: "Ảnh 01", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-06.jpg.jpg", title: "Ảnh 02", description: "" },
            { src: "", title: "Ảnh 03", description: "" },
            { src: "", title: "Ảnh 04", description: "" },
            { src: "", title: "Ảnh 05", description: "" },
            { src: "", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

    // KHU VỰC 07
    {
        id: "ĐỘNG VIÊN TƯ TƯỞNG CHIẾN SĨ",
        title: "SINH HOẠT CHÍNH TRỊ",
        album: "NGÀY SINH HOẠT CHÍNH TRỊ ",
        description: "động viên hỏi thăm dò ý kiến tù chiến sĩ đến cán bộ.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-49.jpg", title: "Ảnh 01", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-50.jpg", title: "Ảnh 02", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-51.jpg", title: "Ảnh 03", description: "" },
            { src: "", title: "Ảnh 04", description: "" },
            { src: "", title: "Ảnh 05", description: "" },
            { src: "", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

   
    // KHU VỰC 09
    {
        id: "TỌA ĐÀM THANH NIÊN",
        title: "TUỔI TRẺ BẢN LĨNH , KHÁT VỌNG CỐNG HIẾN",
        album: "TỌA ĐÀM THANH NIÊN",
        description: "Những buổi trao đổi, chia sẻ kinh nghiệm, phát huy tinh thần trách nhiệm và khát vọng cống hiến của tuổi trẻ.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-09.jpg.jpg", title: "Ảnh 01", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-30.jpg", title: "Ảnh 02", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-31.jpg", title: "Ảnh 03", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-32.jpg", title: "Ảnh 04", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-33.jpg", title: "Ảnh 05", description: "" },
            { src: "", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

   
    // KHU VỰC 12
    {
        id: "HOẠT ĐỘNG ĐOÀN",
        title: "TUỔI TRẺ ĐẠI ĐỘI 11 , TIÊN PHONG, BẢN LĨNH, CỐNG HIẾN",
        album: "HOẠT ĐỘNG ĐOÀN",
        description: "Lưu giữ những hình ảnh nổi bật của đoàn viên, thanh niên Đại đội 11 trong các hoạt động Đoàn.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-35.jpg", title: "Ảnh 01", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-36.jpg", title: "Ảnh 02", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-37.jpg", title: "Ảnh 03", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-38.jpg", title: "Ảnh 04", description: "" },
            { src: "", title: "Ảnh 05", description: "" },
            { src: "", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

    // KHU VỰC 13
    {
        id: "HỘI THI VÀ THI ĐUA",
        title: "THI ĐUA QUYẾT THẮNG , VỮNG BƯỚC TIẾN LÊN",
        album: " HỘI THI , HỘI THAO , VÀ PHONG TRÀO THI ĐUA ",
        description: "Lưu giữ những khoảnh khắc tiêu biểu trong các hội thi, hội thao và phong trào thi đua của cán bộ, chiến sĩ Đại đội 11.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-41.jpg", title: "Ảnh 01", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-42.jpg", title: "Ảnh 02", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-57.jpg", title: "Ảnh 03", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-60.jpg", title: "Ảnh 04", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-61.jpg", title: "Ảnh 05", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-62.jpg", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

    // KHU VỰC 14
    {
        id: "THĂM HỎI VÀ ĐỘNG VIÊN",
        title: "Thăm hỏi, động viên và sẻ chia",
        album: "CÁN BỘ CHIẾN SĨ THĂM HỎI ĐỘNG VIÊN",
        description: "Ghi lại những khoảnh khắc thăm hỏi ân cần, động viên kịp thời và sẻ chia chân thành với cán bộ, chiến sĩ. Qua đó lan tỏa tinh thần đoàn kết, tình đồng chí, đồng đội.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-39.jpg", title: "Ảnh 01", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-40.jpg", title: "Ảnh 02", description: "" },
            { src: "", title: "Ảnh 03", description: "" },
            { src: "", title: "Ảnh 04", description: "" },
            { src: "", title: "Ảnh 05", description: "" },
            { src: "", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

    // KHU VỰC 15
    {
        id: "Phòng Hồ Chí Minh",
        title: "Học Tập Những Kiến Thức",
        album:"PHÒNG HỒ CHÍ MINH ",
        description: "Ghi lại những hình ảnh tiêu biểu trong công tác học tập rèn luyện của đơn vị, từ chăm lo đời sống, bảo đảm ăn ở, quân trang đến duy trì vệ sinh, xây dựng cảnh quan doanh trại chính quy.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-24.jpg", title: "Ảnh 01", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-25.jpg", title: "Ảnh 02", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-27.jpg", title: "Ảnh 03", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-28.jpg", title: "Ảnh 04", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-29.jpg", title: "Ảnh 05", description: "" },
            { src: "", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

    // KHU VỰC 17
    {
        id: "CÔNG TÁC DÂN VẬN",
        title: "CÔNG TÁC DÂN VẬN",
        album: "CÔNG TÁC DÂN VẬN",
        description: "Ghi lại những hình ảnh tiêu biểu của cán bộ, chiến sĩ Đại đội 11 trong các hoạt động dân vận, giúp đỡ nhân dân, tham gia lao động, vệ sinh môi trường và xây dựng nếp sống văn minh tại địa phương.",
        images: [
            { src: "", title: "Ảnh 01", description: "" },
            { src: "", title: "Ảnh 02", description: "" },
            { src: "", title: "Ảnh 03", description: "" },
            { src: "", title: "Ảnh 04", description: "" },
            { src: "", title: "Ảnh 05", description: "" },
            { src: "", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

    // KHU VỰC 18
    {
        id: "KỶ NIỆM VÀ TRUYỀN THỐNG",
        title: "Hình ảnh kỷ niệm của đơn vị",
        album: "KỶ NIỆM VÀ TRUYỀN THỐNG",
        description: "Lưu giữ kỷ niệm đẹp, phát huy truyền thống và niềm tự hào Đại đội 11.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-07.jpg.jpg", title: "Ảnh 01", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-52.jpg", title: "Ảnh 02", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-53.jpg", title: "Ảnh 03", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-54.jpg", title: "Ảnh 04", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-55.jpg", title: "Ảnh 05", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-56.jpg", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

    // KHU VỰC 19
    {
        id: "Công Tác Chăm Hoa Tết",
        title: "Hoạt Động Trồng Hoa Tết",
        album: "CÔNG TÁC CHĂM HOA TẾT ",
        description: "Các hình ảnh hoạt động chăm trồng hoa tết.",
        images: [
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-12.jpg", title: "Ảnh 01", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-13.jpg", title: "Ảnh 02", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-14.jpg", title: "Ảnh 03", description: "" },
            { src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-15.jpg", title: "Ảnh 04", description: "" },
            { src: "", title: "Ảnh 05", description: "" },
            { src: "", title: "Ảnh 06", description: "" },
            { src: "", title: "Ảnh 07", description: "" },
            { src: "", title: "Ảnh 08", description: "" },
            { src: "", title: "Ảnh 09", description: "" },
            { src: "", title: "Ảnh 10", description: "" }
        ]
    },

    
];


    // ==================================================
    // CSS GIAO DIỆN
    // ==================================================

    const STYLE = `
    .bbb-gallery {
        color: #f4f5ed;
        background: linear-gradient(145deg,#101b16,#234b38,#122019);
        border: 1px solid #c9a746;
        border-radius: 18px;
        padding: 22px;
        font-family: Arial, sans-serif;
    }

    .bbb-gallery * { box-sizing: border-box; }

    .bbb-gallery h2 {
        color: #ffe6a0;
        margin: 0 0 10px;
        font-size: 26px;
    }

    .bbb-gallery .intro {
        color: #d4dfd5;
        line-height: 1.7;
    }

    .bbb-gallery .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 20px 0;
    }

    .bbb-gallery input,
    .bbb-gallery select {
        min-width: 0;
        flex: 1;
        padding: 12px;
        border-radius: 9px;
        border: 1px solid #bda653;
        background: #17291f;
        color: #fff0b3;
        font-size: 15px;
    }

    .bbb-gallery .status {
        color: #f1d98c;
        margin: 12px 0;
    }

    .bbb-gallery .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(220px,1fr));
        gap: 18px;
    }

    .bbb-gallery .card {
        background: #17291f;
        border: 1px solid #8ca68b;
        border-radius: 13px;
        overflow: hidden;
        transition: .25s;
    }

    .bbb-gallery .card:hover {
        transform: translateY(-4px);
        border-color: #e8c66a;
        box-shadow: 0 8px 22px #0006;
    }

    .bbb-gallery .cover {
        width: 100%;
        height: 175px;
        object-fit: cover;
        display: block;
        cursor: pointer;
        background: #0c1711;
    }

    .bbb-gallery .info { padding: 14px; }

    .bbb-gallery .info h3 {
        color: #ffe6a0;
        font-size: 16px;
        margin: 0 0 8px;
    }

    .bbb-gallery .desc {
        color: #cbd7cc;
        font-size: 13px;
        line-height: 1.6;
        min-height: 38px;
    }

    .bbb-gallery button {
        cursor: pointer;
        border: 1px solid #d7b957;
        border-radius: 8px;
        background: linear-gradient(135deg,#d5b45a,#f7e4a0);
        color: #1b2b20;
        padding: 10px 13px;
        font-weight: bold;
    }

    .bbb-gallery button:hover { filter: brightness(1.08); }

    #bbbActivityViewer,
    #bbbLightbox {
        position: fixed;
        inset: 0;
        z-index: 999999;
        background: #07100df5;
        color: #fff;
        overflow: auto;
        padding: 22px;
    }

    #bbbActivityViewer .viewer-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 15px;
        margin-bottom: 20px;
    }

    #bbbActivityViewer h2 { color: #ffe6a0; }

    #bbbActivityViewer .photo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(180px,1fr));
        gap: 12px;
    }

    #bbbActivityViewer .photo {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border: 1px solid #c9a746;
        border-radius: 9px;
        cursor: pointer;
    }

    #bbbLightbox {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 80px 65px 125px;
        overflow: hidden;
    }

    #bbbLightbox .light-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        transition: transform .2s;
    }

    #bbbLightbox .image-area {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    #bbbLightbox .tools {
        position: absolute;
        top: 15px;
        left: 15px;
        right: 70px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    #bbbLightbox .close {
        position: absolute;
        top: 15px;
        right: 15px;
    }

    #bbbLightbox .nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 30px;
        min-width: 45px;
    }

    #bbbLightbox .prev { left: 10px; }
    #bbbLightbox .next { right: 10px; }

    #bbbLightbox .caption {
        position: absolute;
        bottom: 12px;
        left: 12px;
        right: 12px;
        text-align: center;
        padding: 12px;
        background: #14251deF;
        border: 1px solid #c9a746;
        border-radius: 10px;
    }

    #bbbLightbox .caption strong {
        display: block;
        color: #ffe6a0;
        margin-bottom: 5px;
    }

    @media(max-width:600px) {
        .bbb-gallery { padding: 13px; }
        .bbb-gallery .grid { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 9px; }
        .bbb-gallery .cover { height: 125px; }
        .bbb-gallery .info { padding: 9px; }
        .bbb-gallery .info h3 { font-size: 13px; }
        .bbb-gallery .desc { font-size: 12px; }
        #bbbActivityViewer { padding: 10px; }
        #bbbActivityViewer .photo-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
        #bbbActivityViewer .photo { height: 130px; }
        #bbbLightbox { padding: 90px 8px 145px; }
        #bbbLightbox .tools { top: 8px; left: 8px; right: 55px; gap: 4px; }
        #bbbLightbox .tools button,
        #bbbLightbox .close { font-size: 12px; padding: 8px; }
        #bbbLightbox .close { top: 8px; right: 8px; }
    }
    `;

    function esc(value) {
        return String(value ?? "").replace(/[&<>"']/g, ch => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[ch]);
    }

    // ==================================================
    // TRANG THƯ VIỆN ẢNH
    // ==================================================

    window.galleryPage = function () {
        return `
        <section id="bbbGallery" class="bbb-gallery">
            <style>${STYLE}</style>
            <h2>🖼️ THƯ VIỆN ẢNH BBB11</h2>
            <p class="intro">
                Lưu giữ hình ảnh hoạt động, huấn luyện và sinh hoạt Đại đội 11.
            </p>
            <div class="toolbar">
                <input id="bbbGallerySearch" type="search"
                    placeholder="🔍 Tìm hoạt động...">
                <select id="bbbGalleryAlbum">
                    <option value="">Tất cả album</option>
                    ${GALLERY_ACTIVITIES.map(a =>
                        `<option value="${esc(a.album)}">${esc(a.album)}</option>`
                    ).join("")}
                </select>
            </div>
            <p class="status" id="bbbGalleryStatus"></p>
            <div class="grid" id="bbbGalleryGrid"></div>
        </section>`;
    };

    // ==================================================
    // HIỂN THỊ ALBUM
    // ==================================================

    
window.loadGallery = function () {
    const root = document.getElementById("bbbGallery");
    if (!root) return;

    const grid = root.querySelector("#bbbGalleryGrid");
    const search = root.querySelector("#bbbGallerySearch").value
        .trim().toLowerCase();
    const album = root.querySelector("#bbbGalleryAlbum").value;

    const list = GALLERY_ACTIVITIES
        .map(activity => ({
            ...activity,
            images: activity.images.filter(image =>
                image.src && image.src.trim() !== ""
            )
        }))
        .filter(activity =>
            activity.images.length > 0 &&
            (!album || activity.album === album) &&
            (activity.album + " " + activity.title + " " +
             activity.description).toLowerCase().includes(search)
        );

    root.querySelector("#bbbGalleryStatus").textContent =
        "Có " + list.length + " album ảnh.";

    grid.innerHTML = list.map((activity, i) => `
        <article class="card">
            <img class="cover"
                src="${esc(activity.cover || activity.images[0].src)}"
                alt="${esc(activity.album)}"
                data-activity="${i}">
            <div class="info">
                <h3>${esc(activity.album)}</h3>
                <p class="desc">${esc(activity.description)}</p>
                <button type="button" data-open="${i}">
                    📂 Xem ${activity.images.length} ảnh
                </button>
            </div>
        </article>
    `).join("");

    grid.querySelectorAll("[data-open], [data-activity]").forEach(el => {
        el.addEventListener("click", () => {
            openActivity(
                list[Number(el.dataset.open ?? el.dataset.activity)]
            );
        });
    });
};


    // ==================================================
    // XEM TẤT CẢ ẢNH TRONG MỘT HOẠT ĐỘNG
    // ==================================================

    function openActivity(activity) {
        document.getElementById("bbbActivityViewer")?.remove();

        const viewer = document.createElement("div");
        viewer.id = "bbbActivityViewer";

        viewer.innerHTML = `
            <div class="viewer-head">
                <div>
                    <h2>${esc(activity.album)}</h2>
                    <p>${esc(activity.description)}</p>
                    <p>${activity.images.length} ảnh</p>
                </div>
                <button type="button" id="bbbActivityClose">✕ Đóng</button>
            </div>
            <div class="photo-grid">
                ${activity.images.map((p, i) => `
                    <img class="photo"
                        src="${esc(p.src)}"
                        alt="${esc(p.title || activity.album)}"
                        data-photo="${i}"
                        loading="lazy">
                `).join("")}
            </div>
        `;

        viewer.querySelector("#bbbActivityClose").onclick = () => viewer.remove();

        viewer.querySelectorAll("[data-photo]").forEach(img => {
            img.onclick = () => openLightbox(
                activity.images,
                Number(img.dataset.photo),
                activity
            );
        });

        document.body.appendChild(viewer);
    }

    // ==================================================
    // PHÓNG TO, CHUYỂN ẢNH, TRÌNH CHIẾU
    // ==================================================

    function openLightbox(images, start, activity) {
        document.getElementById("bbbLightbox")?.remove();

        let index = start;
        let zoom = 1;
        let timer = null;
        let touchX = 0;

        const box = document.createElement("div");
        box.id = "bbbLightbox";
        box.innerHTML = `
            <div class="tools">
                <button data-action="minus">− Thu nhỏ</button>
                <button data-action="plus">＋ Phóng to</button>
                <button data-action="reset">⤢ Kích thước gốc</button>
                <button data-action="play">▶ Trình chiếu</button>
            </div>
            <button class="close" data-action="close">✕ Đóng</button>
            <button class="nav prev" data-action="prev">‹</button>
            <div class="image-area">
                <img class="light-image" alt="">
            </div>
            <button class="nav next" data-action="next">›</button>
            <div class="caption">
                <strong class="caption-title"></strong>
                <span class="caption-desc"></span>
                <div class="caption-count"></div>
            </div>
        `;

        const image = box.querySelector(".light-image");
        const title = box.querySelector(".caption-title");
        const desc = box.querySelector(".caption-desc");
        const count = box.querySelector(".caption-count");
        const playButton = box.querySelector('[data-action="play"]');

        function render() {
            const item = images[index];
            zoom = 1;
            image.style.transform = "scale(1)";
            image.src = item.src;
            image.alt = item.title || activity.album;
            title.textContent = item.title || activity.album;
            desc.textContent = item.description || activity.description || "";
            count.textContent = (index + 1) + " / " + images.length;
        }

        function go(n) {
            index = (n + images.length) % images.length;
            render();
        }

        function stopPlay() {
            if (timer !== null) clearInterval(timer);
            timer = null;
            playButton.textContent = "▶ Trình chiếu";
        }

        function close() {
            stopPlay();
            document.removeEventListener("keydown", keyHandler);
            box.remove();
        }

        function keyHandler(e) {
            if (!document.getElementById("bbbLightbox")) return;
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") go(index - 1);
            if (e.key === "ArrowRight") go(index + 1);
            if (e.key === "+" || e.key === "=") zoomImage(0.2);
            if (e.key === "-") zoomImage(-0.2);
        }

        function zoomImage(delta) {
            zoom = Math.max(0.4, Math.min(3, zoom + delta));
            image.style.transform = "scale(" + zoom + ")";
        }

        box.addEventListener("click", e => {
            const btn = e.target.closest("[data-action]");
            if (!btn) {
                if (e.target === box) close();
                return;
            }

            switch (btn.dataset.action) {
                case "close": close(); break;
                case "prev": go(index - 1); break;
                case "next": go(index + 1); break;
                case "plus": zoomImage(0.2); break;
                case "minus": zoomImage(-0.2); break;
                case "reset":
                    zoom = 1;
                    image.style.transform = "scale(1)";
                    break;
                case "play":
                    if (timer !== null) {
                        stopPlay();
                    } else {
                        playButton.textContent = "⏸ Dừng trình chiếu";
                        timer = setInterval(() => go(index + 1), 3000);
                    }
                    break;
            }
        });

        const area = box.querySelector(".image-area");
        area.addEventListener("touchstart", e => {
            touchX = e.changedTouches[0].screenX;
        }, { passive: true });

        area.addEventListener("touchend", e => {
            const dx = e.changedTouches[0].screenX - touchX;
            if (Math.abs(dx) > 50) go(dx > 0 ? index - 1 : index + 1);
        }, { passive: true });

        document.body.appendChild(box);
        document.addEventListener("keydown", keyHandler);
        render();
    }

    // ==================================================
    // TỰ ĐỘNG NẠP DỮ LIỆU KHI TÌM KIẾM / LỌC ALBUM
    // ==================================================

    document.addEventListener("input", e => {
        if (e.target?.id === "bbbGallerySearch") window.loadGallery();
    });

    document.addEventListener("change", e => {
        if (e.target?.id === "bbbGalleryAlbum") window.loadGallery();
    });

    console.log("BBB11: Đã nạp thư viện ảnh.");

})();
