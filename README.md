# do-an-thu-cung
Đồ án web Next.js quản lý thú cưng

## Mục tiêu dự án
Xây dựng nền tảng quản lý thú cưng (thêm, chỉnh sửa, xóa, xem lịch sử chăm sóc) sử dụng Next.js, Tailwind CSS và các thư viện hỗ trợ khác để cung cấp trải nghiệm người dùng hiện đại.

## Chuẩn bị môi trường
- Cài Node.js 18.x hoặc cao hơn (khuyến nghị dùng pnpm nếu thuận tiện nhưng hiện tại dự án dùng npm).
- Cài Visual Studio Code hoặc IDE bất kỳ, mở thư mục gốc `do-an-thu-cung`.
- Tải các thư viện hỗ trợ bằng `npm install`.

## Chạy dự án
1. Mở terminal trong thư mục gốc.
2. Chạy `npm run dev` để bắt đầu server Next.js ở `http://localhost:3000`.
3. Chỉnh sửa các trang trong thư mục `app` và các component riêng trong `components`. Các kiểu dùng chung nằm trong `styles`.

## Kiểm tra & đóng gói
- `npm run lint` để kiểm tra lint (ESLint + Standard Next.js rules).
- `npm run build` để dựng bản production trước khi deploy.

## Cấu trúc chính
- `app/`: định nghĩa route và layout.
- `components/`: các widget tái sử dụng trong nhiều trang.
- `styles/`: CSS toàn cục, hiện đang dùng module thuần.
- `public/`: ảnh và tài nguyên tĩnh.

## Hướng dẫn đóng góp
1. Tạo branch mới theo dạng `feature/<mô tả>` hoặc `bugfix/<mô tả>`.
2. Tạo commit rõ ràng, mô tả logic thay đổi và liệt kê những file ảnh hưởng.
3. Trước khi tạo PR, chạy `npm run lint` và kiểm tra giao diện nếu thay đổi CSS.
4. Khi cần thảo luận, thêm issue hoặc nhắn trong kênh nhóm, ghi rõ trạng thái hiện tại và những phần cần phối hợp.

## Liên hệ
Gặp [Tên người quản lý/giáo viên] để xin tài liệu bổ sung hoặc ghi nhận tiến độ.
