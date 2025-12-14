# TÀI LIỆU YÊU CẦU PHẦN MỀM (SRS)

## HỆ THỐNG QUẢN LÝ DỊCH VỤ CHĂM SÓC THÚ CƯNG - PAW LOVERS

---

## I. GIỚI THIỆU CHUNG & QUY TRÌNH NGHIỆP VỤ TỔNG QUAN

### 1.1. Giới thiệu hệ thống

Hệ thống quản lý dịch vụ chăm sóc thú cưng tại trung tâm **PAW LOVERS** được xây dựng nhằm hỗ trợ đội ngũ bác sĩ thú y và nhân viên trong việc quản lý toàn diện quá trình khám chữa bệnh và chăm sóc thú cưng. Hệ thống này giúp xử lý các nghiệp vụ liên quan đến thông tin thú cưng, hồ sơ khám bệnh, dịch vụ chăm sóc như tắm, spa, cắt tỉa lông, lưu trú, tiêm ngừa hoặc khám bệnh. Đồng thời, hệ thống còn mang lại sự tiện lợi vượt trội cho chủ nuôi trong việc đặt lịch hẹn một cách nhanh chóng, theo dõi tình trạng sức khỏe của thú cưng, thanh toán dịch vụ dễ dàng và nhận các thông báo quan trọng.

Trung tâm PAW LOVERS hiện phục vụ hàng nghìn lượt thú cưng mỗi năm cho nhiều đối tượng chủ nuôi khác nhau, từ cá nhân đến hộ gia đình và thậm chí là các trại thú cưng nhỏ. Trung tâm hoạt động liên tục tất cả các ngày trong tuần, kể cả ngày lễ, và thường xuyên cập nhật dịch vụ mới cũng như điều chỉnh quy trình nghiệp vụ để nâng cao chất lượng.

### 1.2. Phạm vi dự án

Hệ thống tập trung vào các chức năng cốt lõi sau:

- **Quản lý thông tin thú cưng và chủ nuôi**: Lưu trữ và quản lý thông tin cơ bản về thú cưng (tên, loài, giống, tuổi, cân nặng, tình trạng sức khỏe) và chủ nuôi (thông tin cá nhân, tài khoản).
- **Quản lý dịch vụ**: Quản lý danh mục dịch vụ (tắm, spa, khám, tiêm ngừa) và giá cả.
- **Quản lý chuồng nuôi**: Theo dõi tình trạng chuồng nuôi (trống, đang sử dụng, bảo trì) và phân bổ chuồng cho thú cưng lưu trú.
- **Quản lý lịch hẹn**: Xử lý đặt lịch khám và dịch vụ chăm sóc, theo dõi trạng thái lịch hẹn.
- **Quản lý hồ sơ khám**: Ghi nhận và cập nhật thông tin khám chữa bệnh, chẩn đoán, kết quả điều trị.
- **Quản lý thanh toán**: Tạo hóa đơn và theo dõi thanh toán dịch vụ.
- **Báo cáo thống kê**: Cung cấp các báo cáo cơ bản về số lượt dịch vụ, doanh thu, tình trạng lưu trú.

### 1.3. Quy trình nghiệp vụ tổng quan

#### Quy trình đặt lịch và sử dụng dịch vụ:

1. **Chủ nuôi đăng ký tài khoản** → Hệ thống tạo tài khoản và mã chủ nuôi
2. **Chủ nuôi thêm thông tin thú cưng** → Hệ thống tạo mã thú cưng và lưu thông tin
3. **Chủ nuôi đặt lịch dịch vụ** (trực tuyến hoặc tại quầy lễ tân) → Hệ thống kiểm tra lịch trống và tạo lịch hẹn
4. **Nhân viên lễ tân xác nhận lịch** → Hệ thống cập nhật trạng thái lịch hẹn
5. **Đến ngày hẹn, thực hiện dịch vụ**:
   - Nếu là khám: Bác sĩ cập nhật hồ sơ khám, chẩn đoán
   - Nếu là dịch vụ chăm sóc: Nhân viên chăm sóc cập nhật tình trạng trước/sau dịch vụ
   - Nếu là lưu trú: Nhân viên lễ tân thực hiện check-in chuồng, nhân viên chăm sóc theo dõi hàng ngày
6. **Hoàn tất dịch vụ** → Hệ thống tạo hóa đơn
7. **Chủ nuôi thanh toán** → Hệ thống cập nhật trạng thái thanh toán
8. **Nếu là lưu trú**: Nhân viên lễ tân thực hiện check-out chuồng → Hệ thống tính phí và cập nhật trạng thái chuồng

---

## II. DANH SÁCH CÁC TÁC NHÂN (ACTORS)

Hệ thống có 5 tác nhân chính:

### 2.1. Quản lý trung tâm (Manager)

- **Mô tả**: Người có quyền truy cập toàn bộ dữ liệu và chức năng của hệ thống, quản lý cấu hình hệ thống, xem báo cáo tổng hợp.
- **Quyền hạn**:
  - Quản lý hồ sơ thú cưng (thêm/sửa/xóa)
  - Quản lý dịch vụ (thêm/sửa/xóa, cập nhật giá)
  - Quản lý chuồng nuôi (thiết lập thông tin, đánh số)
  - Xem báo cáo thống kê

### 2.2. Bác sĩ thú y (Veterinarian)

- **Mô tả**: Chuyên gia khám chữa bệnh cho thú cưng, tạo và cập nhật hồ sơ khám bệnh.
- **Quyền hạn**:
  - Xem lịch khám theo ngày
  - Xem thông tin thú cưng
  - Tạo và cập nhật hồ sơ khám
  - Chỉ định chuồng nuôi y tế (cách ly)

### 2.3. Nhân viên chăm sóc (Care Staff)

- **Mô tả**: Nhân viên thực hiện các dịch vụ chăm sóc như tắm, spa, cắt tỉa lông, theo dõi thú cưng lưu trú.
- **Quyền hạn**:
  - Xem lịch phân công dịch vụ
  - Cập nhật tình trạng thú cưng trước/sau dịch vụ
  - Ghi nhận yêu cầu từ chủ nuôi
  - Cập nhật trạng thái vệ sinh chuồng nuôi
  - Theo dõi thú cưng lưu trú (cập nhật hoạt động hàng ngày)

### 2.4. Nhân viên lễ tân (Receptionist)

- **Mô tả**: Nhân viên tiếp nhận khách hàng, xử lý đặt lịch, điều phối chuồng nuôi, check-in/check-out.
- **Quyền hạn**:
  - Tiếp nhận và xử lý yêu cầu đặt lịch
  - Xác thực thông tin tài khoản chủ nuôi
  - Điều phối chuồng nuôi (gán chuồng cho thú cưng lưu trú)
  - Thực hiện check-in/check-out chuồng
  - In/gửi phiếu đặt lịch
  - Cập nhật trạng thái lịch hẹn

### 2.5. Chủ nuôi (Pet Owner)

- **Mô tả**: Khách hàng sử dụng dịch vụ, quản lý thông tin thú cưng của mình, đặt lịch và theo dõi dịch vụ.
- **Quyền hạn**:
  - Đăng ký và quản lý tài khoản
  - Thêm và quản lý thông tin thú cưng
  - Đặt lịch khám/dịch vụ trực tuyến
  - Theo dõi lịch hẹn
  - Xem tình trạng chăm sóc và hóa đơn

---

## III. ĐẶC TẢ CHỨC NĂNG CHI TIẾT

### MODULE 1: QUẢN LÝ TRUNG TÂM (MANAGER)

#### 1.1. Quản lý hồ sơ thú cưng

##### 1.1.1. Thêm thú cưng mới

**Input:**

- Form nhập liệu gồm các trường:
  - Tên thú cưng (tenthucung) - Bắt buộc, text
  - Loài (loai) - Bắt buộc, dropdown (chó, mèo, thỏ, chim, hamster, vẹt, bò sát...)
  - Giống (giong) - Tùy chọn, text
  - Giới tính (gioitinh) - Bắt buộc, radio (Đực/Cái)
  - Tuổi (tuoi) - Bắt buộc, number (tháng hoặc năm)
  - Cân nặng (cannang) - Bắt buộc, number (kg)
  - Màu sắc (mau) - Tùy chọn, text
  - Tình trạng sức khỏe ban đầu (tinh trang) - Tùy chọn, textarea
  - Mã chủ nuôi (machunoi) - Bắt buộc, dropdown/autocomplete

**Process:**

1. Hệ thống validate dữ liệu đầu vào (kiểm tra trường bắt buộc, định dạng)
2. Hệ thống tự động tạo mã định danh duy nhất cho thú cưng (mathucung) - format: PET-YYYYMMDD-XXX (ví dụ: PET-20241201-001)
3. Hệ thống kiểm tra mã chủ nuôi có tồn tại trong hệ thống
4. Hệ thống lưu thông tin vào bảng `Pets` với các trường: mathucung, tenthucung, loai, giong, gioitinh, tuoi, cannang, mau, tinh trang, machunoi, ngaytao
5. Hệ thống tạo bản ghi lịch sử trong bảng `PetHistory` ghi nhận việc tạo mới

**Output:**

- Thông báo thành công: "Đã thêm thú cưng [Tên] thành công với mã [Mã]"
- Hiển thị lại danh sách thú cưng với thú cưng vừa thêm
- Nếu lỗi: Hiển thị thông báo lỗi cụ thể (ví dụ: "Mã chủ nuôi không tồn tại")

##### 1.1.2. Sửa thông tin thú cưng

**Input:**

- Mã thú cưng (mathucung) - Để xác định thú cưng cần sửa
- Form nhập liệu tương tự như thêm mới, nhưng đã điền sẵn dữ liệu hiện tại
- Chỉ cho phép sửa: tên, loài, giống, giới tính, tuổi, cân nặng, màu sắc, tình trạng sức khỏe
- Không cho phép sửa: mã thú cưng, mã chủ nuôi

**Process:**

1. Hệ thống load thông tin hiện tại của thú cưng dựa trên mathucung
2. Hệ thống validate dữ liệu đầu vào
3. Hệ thống cập nhật các trường đã thay đổi vào bảng `Pets`
4. Hệ thống tạo bản ghi lịch sử trong `PetHistory` ghi nhận việc cập nhật (lưu dữ liệu cũ và mới)

**Output:**

- Thông báo thành công: "Đã cập nhật thông tin thú cưng [Tên] thành công"
- Hiển thị lại thông tin thú cưng đã được cập nhật
- Nếu lỗi: Hiển thị thông báo lỗi

##### 1.1.3. Xóa thú cưng

**Input:**

- Mã thú cưng (mathucung) - Để xác định thú cưng cần xóa
- Xác nhận xóa (checkbox hoặc button xác nhận)

**Process:**

1. Hệ thống kiểm tra thú cưng có đang có lịch hẹn đang chờ xử lý hoặc đang trong quá trình dịch vụ không
2. Nếu có: Hiển thị cảnh báo và không cho phép xóa
3. Nếu không: Hệ thống kiểm tra thú cưng có hồ sơ khám/dịch vụ đã hoàn thành không
4. Nếu có hồ sơ: Hệ thống đánh dấu thú cưng là "Đã xóa" (soft delete) thay vì xóa hoàn toàn
5. Nếu không có hồ sơ: Hệ thống xóa hoàn toàn khỏi bảng `Pets`
6. Hệ thống tạo bản ghi lịch sử trong `PetHistory` ghi nhận việc xóa

**Output:**

- Thông báo thành công: "Đã xóa thú cưng [Tên] thành công"
- Nếu không thể xóa: Hiển thị cảnh báo "Không thể xóa thú cưng đang có lịch hẹn hoặc đang sử dụng dịch vụ"
- Cập nhật lại danh sách thú cưng

#### 1.2. Quản lý dịch vụ

##### 1.2.1. Thêm dịch vụ mới

**Input:**

- Form nhập liệu gồm:
  - Tên dịch vụ (tendichvu) - Bắt buộc, text
  - Loại dịch vụ (loaidichvu) - Bắt buộc, dropdown (Tắm, Spa, Khám, Tiêm ngừa, Cắt tỉa lông, Lưu trú)
  - Mô tả (mota) - Tùy chọn, textarea
  - Giá (gia) - Bắt buộc, number (VNĐ)
  - Đơn vị tính (donvitinh) - Bắt buộc, dropdown (Lần, Ngày, Tháng)
  - Trạng thái (trangthai) - Bắt buộc, radio (Hoạt động/Tạm ngưng)

**Process:**

1. Hệ thống validate dữ liệu đầu vào
2. Hệ thống kiểm tra tên dịch vụ có trùng với dịch vụ đang hoạt động không
3. Hệ thống tự động tạo mã dịch vụ (madichvu) - format: SVC-XXX (ví dụ: SVC-001)
4. Hệ thống lưu vào bảng `Services` với các trường: madichvu, tendichvu, loaidichvu, mota, gia, donvitinh, trangthai, ngaytao
5. Hệ thống đồng bộ danh sách dịch vụ cho ứng dụng chủ nuôi (nếu dịch vụ ở trạng thái "Hoạt động")

**Output:**

- Thông báo thành công: "Đã thêm dịch vụ [Tên] thành công"
- Hiển thị lại danh sách dịch vụ với dịch vụ vừa thêm
- Nếu trùng tên: Hiển thị cảnh báo "Tên dịch vụ đã tồn tại"

##### 1.2.2. Sửa thông tin dịch vụ

**Input:**

- Mã dịch vụ (madichvu) - Để xác định dịch vụ cần sửa
- Form nhập liệu tương tự như thêm mới, đã điền sẵn dữ liệu hiện tại
- Cho phép sửa tất cả các trường trừ mã dịch vụ

**Process:**

1. Hệ thống load thông tin hiện tại của dịch vụ
2. Hệ thống validate dữ liệu đầu vào
3. Hệ thống kiểm tra nếu đổi tên: tên mới có trùng với dịch vụ khác đang hoạt động không
4. Hệ thống cập nhật vào bảng `Services`
5. Nếu thay đổi giá hoặc trạng thái: Hệ thống đồng bộ lại cho ứng dụng chủ nuôi

**Output:**

- Thông báo thành công: "Đã cập nhật dịch vụ [Tên] thành công"
- Hiển thị lại thông tin dịch vụ đã được cập nhật

##### 1.2.3. Xóa/Tạm ngưng dịch vụ

**Input:**

- Mã dịch vụ (madichvu)
- Hành động: Xóa hoặc Tạm ngưng

**Process:**

1. Nếu chọn "Tạm ngưng":
   - Hệ thống cập nhật trạng thái dịch vụ thành "Tạm ngưng"
   - Hệ thống ẩn dịch vụ khỏi danh sách hiển thị cho chủ nuôi
   - Dịch vụ vẫn tồn tại trong hệ thống nhưng không thể đặt lịch mới
2. Nếu chọn "Xóa":
   - Hệ thống kiểm tra dịch vụ có đang được sử dụng trong các lịch hẹn đang chờ hoặc đang thực hiện không
   - Nếu có: Không cho phép xóa, đề xuất tạm ngưng
   - Nếu không: Hệ thống đánh dấu xóa (soft delete) hoặc xóa hoàn toàn

**Output:**

- Thông báo thành công: "Đã [Tạm ngưng/Xóa] dịch vụ [Tên] thành công"
- Cập nhật lại danh sách dịch vụ

#### 1.3. Quản lý danh mục chuồng nuôi

##### 1.3.1. Thêm chuồng nuôi mới

**Input:**

- Form nhập liệu gồm:
  - Số chuồng (sochuong) - Bắt buộc, text/number (ví dụ: C001, C002)
  - Vị trí (vitri) - Bắt buộc, text (ví dụ: Tầng 1 - Khu A)
  - Kích thước (kichthuoc) - Bắt buộc, dropdown (Nhỏ, Vừa, Lớn, Rất lớn)
  - Loại thú cưng phù hợp (loaithucung) - Bắt buộc, multi-select (Chó nhỏ, Chó lớn, Mèo, Thú cưng đặc biệt)
  - Mô tả (mota) - Tùy chọn, textarea
  - Trạng thái ban đầu (trangthai) - Mặc định: "Trống"

**Process:**

1. Hệ thống validate dữ liệu đầu vào
2. Hệ thống kiểm tra số chuồng có trùng với chuồng đã tồn tại không
3. Hệ thống tự động tạo mã chuồng (machuong) - format: CAGE-XXX hoặc sử dụng số chuồng làm mã
4. Hệ thống lưu vào bảng `Cages` với các trường: machuong, sochuong, vitri, kichthuoc, loaithucung, mota, trangthai, ngaytao

**Output:**

- Thông báo thành công: "Đã thêm chuồng [Số chuồng] thành công"
- Hiển thị lại danh sách chuồng nuôi

##### 1.3.2. Sửa thông tin chuồng nuôi

**Input:**

- Mã chuồng (machuong)
- Form nhập liệu tương tự như thêm mới, đã điền sẵn dữ liệu hiện tại
- Cho phép sửa: vị trí, kích thước, loại thú cưng phù hợp, mô tả
- Không cho phép sửa: số chuồng (nếu đang có thú cưng sử dụng)

**Process:**

1. Hệ thống load thông tin hiện tại của chuồng
2. Hệ thống kiểm tra chuồng có đang có thú cưng sử dụng không
3. Nếu có: Chỉ cho phép sửa mô tả, không cho phép sửa các thông tin ảnh hưởng đến phân bổ
4. Hệ thống validate và cập nhật vào bảng `Cages`

**Output:**

- Thông báo thành công: "Đã cập nhật thông tin chuồng [Số chuồng] thành công"

#### 1.4. Xem báo cáo dịch vụ lưu trú

##### 1.4.1. Báo cáo tình trạng chuồng nuôi

**Input:**

- Bộ lọc (tùy chọn):
  - Trạng thái: Tất cả / Trống / Đang dùng / Bảo trì
  - Khu vực: Tất cả / Tầng 1 / Tầng 2 / ...
  - Kích thước: Tất cả / Nhỏ / Vừa / Lớn / Rất lớn

**Process:**

1. Hệ thống truy vấn dữ liệu từ bảng `Cages` kết hợp với bảng `PetCageAssignments` (nếu có)
2. Hệ thống tính toán số lượng chuồng theo từng trạng thái
3. Hệ thống nhóm dữ liệu theo các tiêu chí lọc
4. Hệ thống sắp xếp danh sách chuồng theo số chuồng hoặc vị trí

**Output:**

- Bảng danh sách chuồng nuôi hiển thị:
  - Số chuồng
  - Vị trí
  - Kích thước
  - Loại thú cưng phù hợp
  - Trạng thái hiện tại
  - Thông tin thú cưng đang sử dụng (nếu có)
  - Ngày bắt đầu sử dụng (nếu đang dùng)
- Thống kê tổng quan: Tổng số chuồng, Số chuồng trống, Số chuồng đang dùng, Số chuồng bảo trì

##### 1.4.2. Báo cáo thú cưng đang/sắp kết thúc lưu trú

**Input:**

- Bộ lọc:
  - Loại: Đang lưu trú / Sắp kết thúc (trong vòng X ngày)
  - Khoảng thời gian: Tùy chọn

**Process:**

1. Hệ thống truy vấn từ bảng `PetCageAssignments` kết hợp với `Pets` và `Owners`
2. Hệ thống lọc các bản ghi có trạng thái "Đang lưu trú"
3. Hệ thống tính toán ngày kết thúc dự kiến dựa trên ngày bắt đầu và thời gian lưu trú
4. Hệ thống lọc các thú cưng có ngày kết thúc trong khoảng thời gian được chọn
5. Hệ thống sắp xếp theo ngày kết thúc (sắp kết thúc nhất trước)

**Output:**

- Bảng danh sách thú cưng hiển thị:
  - Mã thú cưng
  - Tên thú cưng
  - Tên chủ nuôi
  - Số điện thoại chủ nuôi
  - Số chuồng
  - Ngày bắt đầu lưu trú
  - Ngày kết thúc dự kiến
  - Số ngày còn lại
- Cảnh báo màu sắc: Đỏ (sắp kết thúc trong 1 ngày), Vàng (sắp kết thúc trong 3 ngày), Xanh (còn nhiều thời gian)

#### 1.5. Xem báo cáo thống kê đơn giản

##### 1.5.1. Báo cáo số lượt dịch vụ theo tháng

**Input:**

- Tháng/Năm cần xem báo cáo - Dropdown chọn tháng và năm
- Loại dịch vụ (tùy chọn): Tất cả / Tắm / Spa / Khám / Tiêm ngừa / ...

**Process:**

1. Hệ thống truy vấn từ bảng `Appointments` hoặc `ServiceRecords`
2. Hệ thống lọc các bản ghi có trạng thái "Đã hoàn thành" trong tháng/năm được chọn
3. Hệ thống nhóm theo loại dịch vụ
4. Hệ thống đếm số lượt dịch vụ theo từng loại
5. Hệ thống tính tổng số lượt dịch vụ

**Output:**

- Biểu đồ cột hoặc bảng thống kê hiển thị:
  - Tên loại dịch vụ
  - Số lượt dịch vụ
  - Tỷ lệ phần trăm so với tổng
- Tổng số lượt dịch vụ trong tháng
- So sánh với tháng trước (tăng/giảm bao nhiêu %)

##### 1.5.2. Báo cáo doanh thu tổng theo tháng

**Input:**

- Tháng/Năm cần xem báo cáo - Dropdown chọn tháng và năm

**Process:**

1. Hệ thống truy vấn từ bảng `Invoices`
2. Hệ thống lọc các hóa đơn có trạng thái "Đã thanh toán" trong tháng/năm được chọn
3. Hệ thống tính tổng doanh thu từ cột `tongtien` của các hóa đơn
4. Hệ thống nhóm theo loại dịch vụ (nếu cần chi tiết)
5. Hệ thống tính doanh thu theo từng loại dịch vụ

**Output:**

- Biểu đồ tròn hoặc bảng thống kê hiển thị:
  - Tổng doanh thu trong tháng (VNĐ)
  - Doanh thu theo từng loại dịch vụ
  - Tỷ lệ phần trăm từng loại dịch vụ
- So sánh với tháng trước (tăng/giảm bao nhiêu VNĐ và %)

---

### MODULE 2: BÁC SĨ THÚ Y (VETERINARIAN)

#### 2.1. Xem danh sách lịch khám theo ngày

##### 2.1.1. Xem lịch khám

**Input:**

- Ngày cần xem - Date picker (mặc định: ngày hiện tại)
- Bộ lọc (tùy chọn):
  - Trạng thái: Tất cả / Chờ xử lý / Đang khám / Đã hoàn thành / Đã hủy
  - Loại dịch vụ: Tất cả / Khám / Tiêm ngừa

**Process:**

1. Hệ thống truy vấn từ bảng `Appointments` kết hợp với `Pets`, `Owners`, `Services`
2. Hệ thống lọc các lịch hẹn:
   - Có loại dịch vụ là "Khám" hoặc "Tiêm ngừa"
   - Trong ngày được chọn
   - Được phân công cho bác sĩ hiện tại (hoặc tất cả nếu là quản lý)
3. Hệ thống sắp xếp theo giờ hẹn (sớm nhất trước)
4. Hệ thống nhóm theo khung giờ (nếu cần)

**Output:**

- Danh sách lịch khám hiển thị dạng lịch hoặc danh sách:
  - Giờ hẹn
  - Tên thú cưng
  - Tên chủ nuôi
  - Số điện thoại
  - Loại dịch vụ
  - Trạng thái
  - Ghi chú (nếu có)
- Tổng số lịch khám trong ngày
- Số lịch theo từng trạng thái

#### 2.2. Truy cập thông tin cơ bản của thú cưng

##### 2.2.1. Xem thông tin thú cưng

**Input:**

- Mã thú cưng (mathucung) - Từ danh sách lịch khám hoặc tìm kiếm

**Process:**

1. Hệ thống truy vấn từ bảng `Pets` kết hợp với `Owners`
2. Hệ thống load thông tin cơ bản: tên, loài, giống, giới tính, tuổi, cân nặng, màu sắc, tình trạng sức khỏe hiện tại
3. Hệ thống load lịch sử khám gần nhất từ bảng `MedicalRecords` (nếu có)

**Output:**

- Form hiển thị thông tin thú cưng (chỉ đọc):
  - Mã thú cưng
  - Tên thú cưng
  - Loài, giống
  - Giới tính, tuổi, cân nặng, màu sắc
  - Tình trạng sức khỏe hiện tại
  - Thông tin chủ nuôi (tên, số điện thoại)
  - Lịch sử khám gần nhất (nếu có)

#### 2.3. Cập nhật tình trạng khám

##### 2.3.1. Ghi chẩn đoán và cập nhật hồ sơ khám

**Input:**

- Mã lịch hẹn (malichhen) hoặc Mã thú cưng (mathucung)
- Form nhập liệu:
  - Thời gian bắt đầu khám (thoigianbatdau) - DateTime picker (mặc định: thời gian hiện tại)
  - Thời gian kết thúc khám (thoigianketthuc) - DateTime picker
  - Chẩn đoán (chandoan) - Bắt buộc, textarea
  - Tình trạng trước khám (tinh trang truoc) - Tùy chọn, textarea
  - Tình trạng sau khám (tinh trang sau) - Tùy chọn, textarea
  - Ghi chú (ghichu) - Tùy chọn, textarea
  - Yêu cầu cách ly (yeucau cachly) - Checkbox (nếu cần)

**Process:**

1. Hệ thống kiểm tra lịch hẹn có tồn tại và thuộc về bác sĩ hiện tại không
2. Hệ thống validate dữ liệu (thời gian kết thúc phải sau thời gian bắt đầu)
3. Hệ thống tạo hoặc cập nhật bản ghi trong bảng `MedicalRecords`:
   - Mã hồ sơ khám (mahoso) - Tự động tạo
   - Mã thú cưng
   - Mã lịch hẹn
   - Mã bác sĩ (từ session đăng nhập)
   - Thời gian bắt đầu/kết thúc
   - Chẩn đoán
   - Tình trạng trước/sau
   - Ghi chú
4. Hệ thống cập nhật trạng thái lịch hẹn thành "Đã hoàn thành"
5. Nếu có yêu cầu cách ly: Hệ thống tạo yêu cầu phân bổ chuồng cách ly (xem 2.4)

**Output:**

- Thông báo thành công: "Đã cập nhật hồ sơ khám cho [Tên thú cưng] thành công"
- Hiển thị lại hồ sơ khám vừa tạo/cập nhật
- Nếu có yêu cầu cách ly: Hiển thị thông báo "Đã gửi yêu cầu phân bổ chuồng cách ly"

#### 2.4. Chỉ định khu vực chuồng nuôi y tế

##### 2.4.1. Yêu cầu phân bổ chuồng cách ly

**Input:**

- Mã thú cưng (mathucung)
- Mã hồ sơ khám (mahoso) - Liên kết với hồ sơ khám vừa tạo
- Lý do cách ly (lydo cachly) - Bắt buộc, textarea (ví dụ: "Bệnh truyền nhiễm", "Cần chăm sóc đặc biệt sau phẫu thuật")
- Yêu cầu đặc biệt (yeucau dacbiet) - Tùy chọn, textarea

**Process:**

1. Hệ thống tạo bản ghi yêu cầu trong bảng `CageAssignmentRequests`:
   - Mã yêu cầu (mayeucau) - Tự động tạo
   - Mã thú cưng
   - Mã hồ sơ khám
   - Mã bác sĩ yêu cầu
   - Lý do cách ly
   - Yêu cầu đặc biệt
   - Trạng thái: "Chờ xử lý"
   - Loại: "Cách ly y tế"
2. Hệ thống gửi thông báo cho nhân viên lễ tân về yêu cầu mới
3. Hệ thống cập nhật trạng thái thú cưng thành "Cần cách ly"

**Output:**

- Thông báo thành công: "Đã gửi yêu cầu phân bổ chuồng cách ly cho [Tên thú cưng]"
- Hiển thị mã yêu cầu để theo dõi
- Thông báo: "Nhân viên lễ tân sẽ xử lý yêu cầu này"

#### 2.5. Tạo hồ sơ khám mới hoặc bổ sung thông tin cơ bản

##### 2.5.1. Tạo hồ sơ khám mới (không qua lịch hẹn)

**Input:**

- Mã thú cưng (mathucung) - Tìm kiếm hoặc chọn từ danh sách
- Form nhập liệu tương tự như 2.3.1, nhưng không có mã lịch hẹn

**Process:**

1. Hệ thống kiểm tra thú cưng có tồn tại không
2. Hệ thống validate dữ liệu
3. Hệ thống tạo bản ghi trong bảng `MedicalRecords` (tương tự 2.3.1)
4. Hệ thống không cập nhật trạng thái lịch hẹn (vì không có lịch hẹn)

**Output:**

- Thông báo thành công: "Đã tạo hồ sơ khám mới cho [Tên thú cưng]"
- Hiển thị lại hồ sơ khám vừa tạo

##### 2.5.2. Bổ sung thông tin cơ bản cho thú cưng

**Input:**

- Mã thú cưng (mathucung)
- Form nhập liệu để cập nhật:
  - Tuổi (tuoi) - Nếu thay đổi
  - Cân nặng (cannang) - Nếu thay đổi
  - Tình trạng sức khỏe (tinh trang) - Cập nhật mới

**Process:**

1. Hệ thống load thông tin hiện tại của thú cưng
2. Hệ thống cập nhật các trường đã thay đổi vào bảng `Pets`
3. Hệ thống tạo bản ghi lịch sử trong `PetHistory` ghi nhận việc cập nhật

**Output:**

- Thông báo thành công: "Đã cập nhật thông tin thú cưng [Tên] thành công"
- Hiển thị lại thông tin đã cập nhật

---

### MODULE 3: NHÂN VIÊN CHĂM SÓC (CARE STAFF)

#### 3.1. Nhận lịch phân công dịch vụ

##### 3.1.1. Xem lịch phân công dịch vụ

**Input:**

- Ngày cần xem - Date picker (mặc định: ngày hiện tại)
- Bộ lọc (tùy chọn):
  - Trạng thái: Tất cả / Chờ xử lý / Đang thực hiện / Đã hoàn thành
  - Loại dịch vụ: Tất cả / Tắm / Spa / Cắt tỉa lông

**Process:**

1. Hệ thống truy vấn từ bảng `Appointments` kết hợp với `Pets`, `Owners`, `Services`
2. Hệ thống lọc các lịch hẹn:
   - Có loại dịch vụ là "Tắm", "Spa", "Cắt tỉa lông"
   - Được phân công cho nhân viên hiện tại (hoặc tất cả nếu chưa phân công)
   - Trong ngày được chọn
3. Hệ thống sắp xếp theo giờ hẹn
4. Hệ thống hiển thị thông tin chi tiết về dịch vụ cần thực hiện

**Output:**

- Danh sách lịch phân công hiển thị:
  - Giờ hẹn
  - Tên thú cưng
  - Tên chủ nuôi
  - Loại dịch vụ
  - Trạng thái
  - Ghi chú đặc biệt (nếu có)
- Tổng số dịch vụ được phân công trong ngày

#### 3.2. Cập nhật tình trạng thú cưng trước và sau dịch vụ

##### 3.2.1. Cập nhật tình trạng dịch vụ

**Input:**

- Mã lịch hẹn (malichhen) hoặc Mã dịch vụ (madichvu)
- Form nhập liệu:
  - Thời gian bắt đầu (thoigianbatdau) - DateTime picker
  - Thời gian kết thúc (thoigianketthuc) - DateTime picker
  - Tình trạng trước dịch vụ (tinh trang truoc) - Bắt buộc, textarea
  - Tình trạng sau dịch vụ (tinh trang sau) - Bắt buộc, textarea
  - Kết quả chăm sóc (ket qua) - Tùy chọn, textarea
  - Ghi chú (ghichu) - Tùy chọn, textarea

**Process:**

1. Hệ thống kiểm tra lịch hẹn có tồn tại và được phân công cho nhân viên hiện tại không
2. Hệ thống validate dữ liệu
3. Hệ thống tạo hoặc cập nhật bản ghi trong bảng `ServiceRecords`:
   - Mã bản ghi (mabanghi) - Tự động tạo
   - Mã lịch hẹn
   - Mã thú cưng
   - Mã dịch vụ
   - Mã nhân viên (từ session đăng nhập)
   - Thời gian bắt đầu/kết thúc
   - Tình trạng trước/sau
   - Kết quả chăm sóc
   - Ghi chú
4. Hệ thống cập nhật trạng thái lịch hẹn thành "Đã hoàn thành"
5. Hệ thống tự động tạo hóa đơn (nếu chưa có) hoặc cập nhật hóa đơn hiện có

**Output:**

- Thông báo thành công: "Đã cập nhật tình trạng dịch vụ [Tên dịch vụ] cho [Tên thú cưng] thành công"
- Hiển thị lại bản ghi dịch vụ vừa tạo/cập nhật

#### 3.3. Ghi nhận yêu cầu bổ sung từ chủ nuôi

##### 3.3.1. Ghi nhận yêu cầu thay đổi hoặc hủy dịch vụ

**Input:**

- Mã lịch hẹn (malichhen)
- Loại yêu cầu (loaiyeucau) - Radio: Thay đổi dịch vụ / Hủy dịch vụ / Yêu cầu bổ sung
- Nội dung yêu cầu (noidung) - Bắt buộc, textarea
- Xác nhận từ chủ nuôi (xacnhan) - Checkbox (nếu có)

**Process:**

1. Hệ thống kiểm tra lịch hẹn có tồn tại và đang ở trạng thái nào
2. Hệ thống tạo bản ghi yêu cầu trong bảng `ServiceRequests`:
   - Mã yêu cầu (mayeucau) - Tự động tạo
   - Mã lịch hẹn
   - Mã nhân viên ghi nhận
   - Loại yêu cầu
   - Nội dung
   - Trạng thái: "Chờ xử lý"
   - Thời gian ghi nhận
3. Nếu là "Hủy dịch vụ": Hệ thống cập nhật trạng thái lịch hẹn thành "Đã hủy" (sau khi được xác nhận)
4. Nếu là "Thay đổi dịch vụ": Hệ thống gửi thông báo cho nhân viên lễ tân để xử lý
5. Hệ thống gửi thông báo cho quản lý hoặc lễ tân về yêu cầu mới

**Output:**

- Thông báo thành công: "Đã ghi nhận yêu cầu [Loại yêu cầu] từ chủ nuôi"
- Hiển thị mã yêu cầu để theo dõi
- Thông báo: "Yêu cầu sẽ được xử lý bởi nhân viên lễ tân"

#### 3.4. Cập nhật trạng thái vệ sinh của chuồng nuôi

##### 3.4.1. Cập nhật trạng thái chuồng

**Input:**

- Mã chuồng (machuong) - Chọn từ danh sách hoặc quét mã
- Trạng thái mới (trangthai) - Dropdown: Trống / Đang có thú / Đang bảo trì / Đang dọn dẹp
- Ghi chú (ghichu) - Tùy chọn, textarea (ví dụ: "Đã vệ sinh xong", "Cần sửa chữa cửa")

**Process:**

1. Hệ thống kiểm tra chuồng có tồn tại không
2. Hệ thống kiểm tra trạng thái hiện tại:
   - Nếu chuồng đang có thú cưng và chuyển sang "Trống": Hệ thống cảnh báo cần check-out trước
   - Nếu chuồng đang "Trống" và chuyển sang "Đang có thú": Hệ thống cảnh báo cần check-in trước
3. Hệ thống cập nhật trạng thái vào bảng `Cages`
4. Hệ thống tạo bản ghi lịch sử trong bảng `CageStatusHistory`:
   - Mã lịch sử (malichsu) - Tự động tạo
   - Mã chuồng
   - Trạng thái cũ
   - Trạng thái mới
   - Mã nhân viên cập nhật
   - Thời gian cập nhật
   - Ghi chú

**Output:**

- Thông báo thành công: "Đã cập nhật trạng thái chuồng [Số chuồng] thành [Trạng thái]"
- Nếu có cảnh báo: Hiển thị cảnh báo "Vui lòng thực hiện check-in/check-out trước khi thay đổi trạng thái"
- Cập nhật lại danh sách chuồng nuôi

#### 3.5. Theo dõi thú cưng lưu trú

##### 3.5.1. Cập nhật hoạt động hàng ngày cho thú cưng lưu trú

**Input:**

- Mã thú cưng (mathucung) - Chọn từ danh sách thú cưng đang lưu trú
- Ngày cập nhật (ngaycapnhat) - Date picker (mặc định: ngày hiện tại)
- Form nhập liệu:
  - Hoạt động ăn uống (hoatdong anuong) - Bắt buộc, textarea (ví dụ: "Ăn hết 200g thức ăn", "Uống nước bình thường")
  - Hoạt động vệ sinh (hoatdong vesinh) - Bắt buộc, textarea (ví dụ: "Đi vệ sinh bình thường", "Cần theo dõi")
  - Tình trạng sức khỏe (tinh trang) - Bắt buộc, textarea
  - Ghi chú đặc biệt (ghichu) - Tùy chọn, textarea
  - Hình ảnh (hinh anh) - Tùy chọn, upload file (nếu cần)

**Process:**

1. Hệ thống kiểm tra thú cưng có đang lưu trú không (truy vấn từ `PetCageAssignments`)
2. Hệ thống validate dữ liệu
3. Hệ thống tạo bản ghi trong bảng `DailyCareRecords`:
   - Mã bản ghi (mabanghi) - Tự động tạo
   - Mã thú cưng
   - Mã chuồng (từ bảng `PetCageAssignments`)
   - Mã nhân viên (từ session đăng nhập)
   - Ngày cập nhật
   - Hoạt động ăn uống
   - Hoạt động vệ sinh
   - Tình trạng sức khỏe
   - Ghi chú
   - Hình ảnh (nếu có)
   - Thời gian ghi nhận
4. Hệ thống cập nhật thời gian cập nhật cuối cùng trong `PetCageAssignments`

**Output:**

- Thông báo thành công: "Đã cập nhật hoạt động hàng ngày cho [Tên thú cưng] ngày [Ngày]"
- Hiển thị lại bản ghi vừa tạo
- Nếu có vấn đề về sức khỏe: Hiển thị cảnh báo "Cần thông báo cho bác sĩ"

##### 3.5.2. Xem lịch sử hoạt động của thú cưng lưu trú

**Input:**

- Mã thú cưng (mathucung)
- Khoảng thời gian: Từ ngày - Đến ngày

**Process:**

1. Hệ thống truy vấn từ bảng `DailyCareRecords`
2. Hệ thống lọc theo mã thú cưng và khoảng thời gian
3. Hệ thống sắp xếp theo ngày (mới nhất trước)

**Output:**

- Danh sách các bản ghi hoạt động hàng ngày hiển thị:
  - Ngày
  - Hoạt động ăn uống
  - Hoạt động vệ sinh
  - Tình trạng sức khỏe
  - Ghi chú
  - Nhân viên ghi nhận
  - Hình ảnh (nếu có)

---

### MODULE 4: NHÂN VIÊN LỄ TÂN (RECEPTIONIST)

#### 4.1. Tiếp nhận và xử lý yêu cầu đặt lịch

##### 4.1.1. Xử lý đặt lịch tại quầy

**Input:**

- Thông tin chủ nuôi:
  - Mã chủ nuôi (machunoi) hoặc Số điện thoại / Email - Để tìm kiếm tài khoản
- Thông tin đặt lịch:
  - Mã thú cưng (mathucung) - Dropdown (từ danh sách thú cưng của chủ nuôi)
  - Loại dịch vụ (loaidichvu) - Dropdown
  - Dịch vụ cụ thể (madichvu) - Dropdown (từ danh sách dịch vụ thuộc loại đã chọn)
  - Ngày hẹn (ngayhen) - Date picker
  - Giờ hẹn (giohen) - Time picker
  - Ghi chú (ghichu) - Tùy chọn, textarea

**Process:**

1. Hệ thống tìm kiếm tài khoản chủ nuôi dựa trên mã/số điện thoại/email
2. Nếu không tìm thấy: Hiển thị form đăng ký tài khoản mới
3. Hệ thống kiểm tra lịch trống:
   - Truy vấn từ bảng `Appointments`
   - Kiểm tra xem có lịch hẹn nào trùng thời gian không
   - Kiểm tra khả năng của nhân viên/bác sĩ (nếu có phân công)
4. Nếu lịch trống: Hệ thống tạo lịch hẹn trong bảng `Appointments`:
   - Mã lịch hẹn (malichhen) - Tự động tạo
   - Mã chủ nuôi
   - Mã thú cưng
   - Mã dịch vụ
   - Ngày giờ hẹn
   - Trạng thái: "Đã xác nhận" (vì đặt tại quầy)
   - Ghi chú
   - Mã nhân viên xử lý (từ session đăng nhập)
5. Nếu lịch kín: Hệ thống đề xuất các khung giờ trống gần nhất hoặc đưa vào danh sách chờ

**Output:**

- Nếu thành công:
  - Thông báo: "Đã đặt lịch thành công"
  - Hiển thị mã lịch hẹn
  - Hiển thị nút "In phiếu đặt lịch" hoặc "Gửi phiếu đặt lịch điện tử"
- Nếu lịch kín:
  - Hiển thị danh sách khung giờ trống gần nhất
  - Đề xuất đưa vào danh sách chờ
  - Hiển thị nút "Đăng ký danh sách chờ"

#### 4.2. Xác thực thông tin tài khoản chủ nuôi

##### 4.2.1. Kiểm tra thông tin tài khoản

**Input:**

- Mã chủ nuôi (machunoi) hoặc Số điện thoại / Email

**Process:**

1. Hệ thống truy vấn từ bảng `Owners` (hoặc `Accounts`)
2. Hệ thống load thông tin:
   - Tên chủ nuôi
   - Địa chỉ
   - Số điện thoại
   - Email
   - Trạng thái tài khoản (Hoạt động / Tạm khóa / Hết hạn)
   - Lịch sử đặt lịch (số lần, lần gần nhất)
   - Lịch sử vi phạm (nếu có)
3. Hệ thống kiểm tra cảnh báo:
   - Có lịch sắp đến hạn chưa thanh toán không
   - Có lịch đã quá hạn thanh toán không
   - Có vi phạm hủy lịch nhiều lần không

**Output:**

- Form hiển thị thông tin tài khoản:
  - Thông tin cá nhân (tên, địa chỉ, số điện thoại, email)
  - Trạng thái tài khoản (với màu sắc: Xanh = Hoạt động, Vàng = Cảnh báo, Đỏ = Tạm khóa)
  - Danh sách lịch hẹn trước đây (số lượng, lần gần nhất)
  - Cảnh báo (nếu có):
    - "Có [X] lịch hẹn sắp đến hạn thanh toán"
    - "Có [X] lịch hẹn đã quá hạn thanh toán"
    - "Tài khoản đã hủy lịch [X] lần, cần đặt cọc cao hơn"
  - Danh sách thú cưng của chủ nuôi

#### 4.3. Điều phối chuồng nuôi

##### 4.3.1. Tìm kiếm và gán chuồng trống phù hợp

**Input:**

- Mã thú cưng (mathucung)
- Loại yêu cầu: Lưu trú thông thường / Cách ly y tế (từ yêu cầu của bác sĩ)
- Thông tin thú cưng (để hệ thống gợi ý):
  - Kích thước thú cưng (từ thông tin cân nặng, loài)
  - Loài thú cưng

**Process:**

1. Hệ thống load thông tin thú cưng từ bảng `Pets`:
   - Loài, cân nặng (để xác định kích thước phù hợp)
   - Tình trạng sức khỏe (để xác định có cần cách ly không)
2. Nếu là cách ly y tế: Hệ thống truy vấn yêu cầu từ bảng `CageAssignmentRequests`
3. Hệ thống truy vấn danh sách chuồng từ bảng `Cages`:
   - Lọc các chuồng có trạng thái "Trống"
   - Lọc các chuồng phù hợp với kích thước và loài thú cưng
   - Nếu cách ly: Lọc các chuồng ở khu vực cách ly (nếu có)
4. Hệ thống sắp xếp chuồng theo độ phù hợp (chuồng phù hợp nhất trước)
5. Hệ thống hiển thị danh sách gợi ý cho nhân viên chọn

**Output:**

- Danh sách chuồng gợi ý hiển thị:
  - Số chuồng
  - Vị trí
  - Kích thước
  - Loại thú cưng phù hợp
  - Độ phù hợp (ví dụ: "Rất phù hợp", "Phù hợp")
- Nút "Chọn chuồng" cho mỗi chuồng
- Nếu không có chuồng trống: Hiển thị thông báo "Không có chuồng trống phù hợp, vui lòng kiểm tra lại sau"

##### 4.3.2. Gán chuồng cho thú cưng

**Input:**

- Mã chuồng (machuong) - Từ danh sách gợi ý
- Mã thú cưng (mathucung)
- Ngày bắt đầu lưu trú (ngaybatdau) - Date picker (mặc định: ngày hiện tại)
- Ngày kết thúc dự kiến (ngayketthuc) - Date picker (tùy chọn)
- Ghi chú (ghichu) - Tùy chọn, textarea

**Process:**

1. Hệ thống kiểm tra chuồng có đang trống không
2. Hệ thống kiểm tra thú cưng có đang ở chuồng khác không (nếu có, cần check-out trước)
3. Hệ thống tạo bản ghi trong bảng `PetCageAssignments`:
   - Mã phân bổ (maphanbo) - Tự động tạo
   - Mã thú cưng
   - Mã chuồng
   - Ngày bắt đầu
   - Ngày kết thúc dự kiến
   - Trạng thái: "Đang lưu trú"
   - Ghi chú
   - Mã nhân viên phân bổ (từ session đăng nhập)
4. Hệ thống cập nhật trạng thái chuồng thành "Đang có thú"
5. Nếu có yêu cầu cách ly: Hệ thống cập nhật trạng thái yêu cầu thành "Đã xử lý"

**Output:**

- Thông báo thành công: "Đã gán chuồng [Số chuồng] cho [Tên thú cưng] thành công"
- Hiển thị thông tin phân bổ vừa tạo
- Hiển thị nút "Thực hiện Check-in" (xem 4.4)

#### 4.4. Thực hiện Check-in/Check-out chuồng

##### 4.4.1. Check-in chuồng

**Input:**

- Mã phân bổ chuồng (maphanbo) hoặc Mã thú cưng (mathucung)
- Thời gian check-in thực tế (thoigian checkin) - DateTime picker (mặc định: thời gian hiện tại)
- Ghi chú (ghichu) - Tùy chọn, textarea

**Process:**

1. Hệ thống kiểm tra bản ghi phân bổ có tồn tại và ở trạng thái "Chờ check-in" hoặc "Đang lưu trú" không
2. Hệ thống cập nhật bản ghi trong `PetCageAssignments`:
   - Thời gian check-in thực tế
   - Trạng thái: "Đang lưu trú"
   - Ghi chú
3. Hệ thống tạo bản ghi lịch sử trong `CageCheckInOutHistory`:
   - Mã lịch sử (malichsu) - Tự động tạo
   - Mã phân bổ
   - Loại: "Check-in"
   - Thời gian
   - Mã nhân viên (từ session đăng nhập)
4. Hệ thống cập nhật trạng thái chuồng thành "Đang có thú" (nếu chưa cập nhật)

**Output:**

- Thông báo thành công: "Đã check-in chuồng [Số chuồng] cho [Tên thú cưng] thành công"
- Hiển thị thông tin check-in: Thời gian, Chuồng, Thú cưng
- Hiển thị thông báo: "Bắt đầu tính phí lưu trú từ thời điểm này"

##### 4.4.2. Check-out chuồng

**Input:**

- Mã phân bổ chuồng (maphanbo) hoặc Mã thú cưng (mathucung)
- Thời gian check-out thực tế (thoigian checkout) - DateTime picker (mặc định: thời gian hiện tại)
- Ghi chú (ghichu) - Tùy chọn, textarea

**Process:**

1. Hệ thống kiểm tra bản ghi phân bổ có tồn tại và ở trạng thái "Đang lưu trú" không
2. Hệ thống tính toán số ngày lưu trú:
   - Lấy thời gian check-in và thời gian check-out
   - Tính số ngày (làm tròn lên nếu quá một phần ngày)
3. Hệ thống tính phí lưu trú:
   - Lấy giá dịch vụ lưu trú từ bảng `Services`
   - Tính: Số ngày × Giá/ngày
4. Hệ thống cập nhật bản ghi trong `PetCageAssignments`:
   - Thời gian check-out thực tế
   - Số ngày lưu trú
   - Phí lưu trú
   - Trạng thái: "Đã kết thúc"
   - Ghi chú
5. Hệ thống tạo bản ghi lịch sử trong `CageCheckInOutHistory` (tương tự check-in)
6. Hệ thống cập nhật trạng thái chuồng thành "Trống" (sau khi nhân viên chăm sóc xác nhận vệ sinh)
7. Hệ thống tự động tạo hoặc cập nhật hóa đơn với phí lưu trú

**Output:**

- Thông báo thành công: "Đã check-out chuồng [Số chuồng] cho [Tên thú cưng] thành công"
- Hiển thị thông tin check-out:
  - Thời gian check-in/check-out
  - Số ngày lưu trú
  - Phí lưu trú (VNĐ)
- Hiển thị thông báo: "Phí lưu trú đã được thêm vào hóa đơn"
- Hiển thị nút "Xem hóa đơn"

#### 4.5. In hoặc gửi phiếu đặt lịch điện tử

##### 4.5.1. Tạo và gửi phiếu đặt lịch

**Input:**

- Mã lịch hẹn (malichhen)
- Phương thức: In phiếu / Gửi email / Gửi SMS / Cả hai

**Process:**

1. Hệ thống truy vấn thông tin lịch hẹn từ bảng `Appointments` kết hợp với `Pets`, `Owners`, `Services`
2. Hệ thống tạo nội dung phiếu đặt lịch:
   - Mã phiếu đặt lịch (maphieu) - Có thể dùng mã lịch hẹn hoặc tạo mã riêng
   - Thông tin chủ nuôi (tên, số điện thoại, email)
   - Thông tin thú cưng (tên, loài)
   - Thông tin dịch vụ (tên dịch vụ, giá)
   - Ngày giờ hẹn
   - Địa chỉ trung tâm
   - Hướng dẫn chuẩn bị (nếu có)
3. Nếu chọn "In phiếu":
   - Hệ thống tạo file PDF hoặc HTML để in
   - Hiển thị cửa sổ in của trình duyệt
4. Nếu chọn "Gửi email":
   - Hệ thống lấy email chủ nuôi từ bảng `Owners`
   - Hệ thống gửi email với nội dung phiếu đặt lịch (HTML hoặc PDF đính kèm)
   - Hệ thống ghi nhận thời gian gửi trong bảng `AppointmentNotifications`
5. Nếu chọn "Gửi SMS":
   - Hệ thống lấy số điện thoại chủ nuôi
   - Hệ thống gửi SMS với nội dung tóm tắt (mã lịch hẹn, ngày giờ, dịch vụ)
   - Hệ thống ghi nhận thời gian gửi

**Output:**

- Nếu in: Hiển thị cửa sổ in hoặc tải file PDF
- Nếu gửi email: Thông báo "Đã gửi phiếu đặt lịch đến email [Email]"
- Nếu gửi SMS: Thông báo "Đã gửi SMS đến số [Số điện thoại]"
- Hiển thị lịch sử gửi (nếu có)

#### 4.6. Cập nhật trạng thái lịch hẹn

##### 4.6.1. Cập nhật trạng thái

**Input:**

- Mã lịch hẹn (malichhen)
- Trạng thái mới (trangthai) - Dropdown: Chờ xử lý / Đã xác nhận / Đang thực hiện / Đã hoàn thành / Đã hủy
- Lý do (nếu hủy) (lydo) - Tùy chọn, textarea

**Process:**

1. Hệ thống kiểm tra lịch hẹn có tồn tại không
2. Hệ thống kiểm tra quy tắc chuyển trạng thái:
   - "Chờ xử lý" → "Đã xác nhận" / "Đã hủy": Cho phép
   - "Đã xác nhận" → "Đang thực hiện" / "Đã hủy": Cho phép
   - "Đang thực hiện" → "Đã hoàn thành" / "Đã hủy": Cho phép
   - "Đã hoàn thành": Không thể thay đổi
   - "Đã hủy": Không thể thay đổi (trừ khi có quyền đặc biệt)
3. Hệ thống cập nhật trạng thái vào bảng `Appointments`
4. Nếu hủy: Hệ thống ghi nhận lý do và cập nhật số lần hủy của chủ nuôi (nếu cần)
5. Hệ thống tạo bản ghi lịch sử trong `AppointmentStatusHistory`:
   - Mã lịch sử (malichsu) - Tự động tạo
   - Mã lịch hẹn
   - Trạng thái cũ
   - Trạng thái mới
   - Mã nhân viên cập nhật
   - Thời gian cập nhật
   - Lý do (nếu có)
6. Nếu chuyển sang "Đã xác nhận": Hệ thống gửi thông báo cho chủ nuôi (nếu cần)
7. Nếu chuyển sang "Đã hủy": Hệ thống xử lý hoàn tiền đặt cọc (nếu có) theo quy tắc hủy lịch

**Output:**

- Thông báo thành công: "Đã cập nhật trạng thái lịch hẹn [Mã] thành [Trạng thái]"
- Hiển thị lại thông tin lịch hẹn với trạng thái mới
- Nếu hủy: Hiển thị thông báo về chính sách hoàn tiền (nếu có)

---

### MODULE 5: CHỦ NUÔI (PET OWNER)

#### 5.1. Đăng ký tài khoản và quản lý thông tin cá nhân

##### 5.1.1. Đăng ký tài khoản mới

**Input:**

- Form đăng ký gồm các trường:
  - Họ và tên (hoten) - Bắt buộc, text
  - Số điện thoại (sodienthoai) - Bắt buộc, text (định dạng số điện thoại Việt Nam)
  - Email (email) - Bắt buộc, email (định dạng email hợp lệ)
  - Địa chỉ (diachi) - Bắt buộc, textarea
  - Mật khẩu (matkhau) - Bắt buộc, password (tối thiểu 6 ký tự)
  - Xác nhận mật khẩu (xacnhanmatkhau) - Bắt buộc, password (phải khớp với mật khẩu)
  - Đồng ý với điều khoản sử dụng (dongy) - Bắt buộc, checkbox

**Process:**

1. Hệ thống validate dữ liệu đầu vào (kiểm tra định dạng email, số điện thoại, độ mạnh mật khẩu)
2. Hệ thống kiểm tra email và số điện thoại đã tồn tại trong hệ thống chưa
3. Nếu đã tồn tại: Hiển thị thông báo lỗi "Email/Số điện thoại đã được sử dụng"
4. Nếu chưa tồn tại:
   - Hệ thống tự động tạo mã chủ nuôi (machunoi) - format: OWN-YYYYMMDD-XXX (ví dụ: OWN-20241201-001)
   - Hệ thống mã hóa mật khẩu (hash password) trước khi lưu
   - Hệ thống lưu thông tin vào bảng `Owners` với các trường: machunoi, hoten, sodienthoai, email, diachi, matkhau (đã hash), trangthai (mặc định: "Hoạt động"), ngaytao
   - Hệ thống tạo tài khoản đăng nhập trong bảng `Accounts` liên kết với `Owners`
   - Hệ thống gửi email xác nhận đăng ký (nếu có cấu hình)

**Output:**

- Thông báo thành công: "Đăng ký tài khoản thành công! Mã chủ nuôi của bạn: [Mã]"
- Hiển thị nút "Đăng nhập ngay" để chuyển đến trang đăng nhập
- Nếu lỗi: Hiển thị thông báo lỗi cụ thể (ví dụ: "Email đã được sử dụng", "Mật khẩu phải có ít nhất 6 ký tự")

##### 5.1.2. Xem và cập nhật thông tin cá nhân

**Input:**

- Từ trang quản lý tài khoản (sau khi đăng nhập)
- Form hiển thị thông tin hiện tại (chỉ đọc hoặc có thể chỉnh sửa):
  - Họ và tên (hoten) - Có thể sửa
  - Số điện thoại (sodienthoai) - Có thể sửa (cần xác thực nếu thay đổi)
  - Email (email) - Có thể sửa (cần xác thực nếu thay đổi)
  - Địa chỉ (diachi) - Có thể sửa
  - Mật khẩu - Nút "Đổi mật khẩu" (mở form riêng)

**Process:**

1. Hệ thống load thông tin hiện tại của chủ nuôi từ bảng `Owners` dựa trên session đăng nhập
2. Nếu người dùng cập nhật thông tin:
   - Hệ thống validate dữ liệu mới
   - Nếu thay đổi email/số điện thoại: Hệ thống kiểm tra trùng lặp với tài khoản khác
   - Hệ thống cập nhật các trường đã thay đổi vào bảng `Owners`
   - Hệ thống tạo bản ghi lịch sử thay đổi (nếu cần)
3. Nếu đổi mật khẩu:
   - Hệ thống yêu cầu nhập mật khẩu cũ để xác thực
   - Hệ thống validate mật khẩu mới (độ mạnh, khớp với xác nhận)
   - Hệ thống mã hóa và cập nhật mật khẩu mới

**Output:**

- Thông báo thành công: "Đã cập nhật thông tin cá nhân thành công"
- Hiển thị lại thông tin đã được cập nhật
- Nếu thay đổi email/số điện thoại: Hiển thị thông báo "Vui lòng xác thực email/số điện thoại mới"

#### 5.2. Quản lý thông tin thú cưng

##### 5.2.1. Thêm thú cưng mới

**Input:**

- Form nhập liệu gồm các trường:
  - Tên thú cưng (tenthucung) - Bắt buộc, text
  - Loài (loai) - Bắt buộc, dropdown (chó, mèo, thỏ, chim, hamster, vẹt, bò sát...)
  - Giống (giong) - Tùy chọn, text
  - Giới tính (gioitinh) - Bắt buộc, radio (Đực/Cái)
  - Tuổi (tuoi) - Bắt buộc, number (tháng hoặc năm)
  - Cân nặng (cannang) - Bắt buộc, number (kg)
  - Màu sắc (mau) - Tùy chọn, text
  - Tình trạng sức khỏe ban đầu (tinh trang) - Tùy chọn, textarea

**Process:**

1. Hệ thống validate dữ liệu đầu vào
2. Hệ thống tự động lấy mã chủ nuôi (machunoi) từ session đăng nhập
3. Hệ thống tự động tạo mã định danh duy nhất cho thú cưng (mathucung) - format: PET-YYYYMMDD-XXX
4. Hệ thống lưu thông tin vào bảng `Pets` với các trường: mathucung, tenthucung, loai, giong, gioitinh, tuoi, cannang, mau, tinh trang, machunoi (từ session), ngaytao
5. Hệ thống tạo bản ghi lịch sử trong bảng `PetHistory` ghi nhận việc tạo mới

**Output:**

- Thông báo thành công: "Đã thêm thú cưng [Tên] thành công với mã [Mã]"
- Hiển thị lại danh sách thú cưng với thú cưng vừa thêm
- Nút "Thêm thú cưng khác" để tiếp tục thêm

##### 5.2.2. Xem danh sách thú cưng

**Input:**

- Từ trang quản lý thú cưng (sau khi đăng nhập)
- Bộ lọc (tùy chọn):
  - Tìm kiếm theo tên (timkiem) - Text search
  - Lọc theo loài (loai) - Dropdown

**Process:**

1. Hệ thống lấy mã chủ nuôi từ session đăng nhập
2. Hệ thống truy vấn từ bảng `Pets` với điều kiện machunoi = mã chủ nuôi hiện tại
3. Hệ thống áp dụng bộ lọc (nếu có)
4. Hệ thống sắp xếp danh sách theo ngày thêm (mới nhất trước) hoặc theo tên

**Output:**

- Danh sách thú cưng hiển thị dạng card hoặc bảng:
  - Mã thú cưng
  - Tên thú cưng
  - Loài, giống
  - Tuổi, cân nặng
  - Tình trạng sức khỏe hiện tại (tóm tắt)
  - Nút "Xem chi tiết" / "Sửa" / "Xóa"
- Tổng số thú cưng
- Nút "Thêm thú cưng mới"

##### 5.2.3. Xem và sửa thông tin thú cưng

**Input:**

- Mã thú cưng (mathucung) - Từ danh sách thú cưng
- Form hiển thị thông tin hiện tại (có thể chỉnh sửa):
  - Tên thú cưng (tenthucung) - Có thể sửa
  - Loài (loai) - Có thể sửa
  - Giống (giong) - Có thể sửa
  - Giới tính (gioitinh) - Có thể sửa
  - Tuổi (tuoi) - Có thể sửa
  - Cân nặng (cannang) - Có thể sửa
  - Màu sắc (mau) - Có thể sửa
  - Tình trạng sức khỏe (tinh trang) - Có thể sửa
  - Không cho phép sửa: mã thú cưng

**Process:**

1. Hệ thống kiểm tra thú cưng có thuộc về chủ nuôi hiện tại không (bảo mật)
2. Hệ thống load thông tin hiện tại của thú cưng
3. Nếu người dùng cập nhật:
   - Hệ thống validate dữ liệu đầu vào
   - Hệ thống cập nhật các trường đã thay đổi vào bảng `Pets`
   - Hệ thống tạo bản ghi lịch sử trong `PetHistory` ghi nhận việc cập nhật

**Output:**

- Thông báo thành công: "Đã cập nhật thông tin thú cưng [Tên] thành công"
- Hiển thị lại thông tin thú cưng đã được cập nhật
- Nút "Quay lại danh sách"

##### 5.2.4. Xóa thú cưng

**Input:**

- Mã thú cưng (mathucung) - Từ danh sách hoặc trang chi tiết
- Xác nhận xóa (checkbox hoặc button xác nhận)

**Process:**

1. Hệ thống kiểm tra thú cưng có thuộc về chủ nuôi hiện tại không
2. Hệ thống kiểm tra thú cưng có đang có lịch hẹn đang chờ xử lý hoặc đang trong quá trình dịch vụ không
3. Nếu có: Hiển thị cảnh báo và không cho phép xóa
4. Nếu không: Hệ thống đánh dấu thú cưng là "Đã xóa" (soft delete) hoặc xóa hoàn toàn (tùy quy tắc nghiệp vụ)
5. Hệ thống tạo bản ghi lịch sử trong `PetHistory` ghi nhận việc xóa

**Output:**

- Thông báo thành công: "Đã xóa thú cưng [Tên] thành công"
- Nếu không thể xóa: Hiển thị cảnh báo "Không thể xóa thú cưng đang có lịch hẹn hoặc đang sử dụng dịch vụ"
- Cập nhật lại danh sách thú cưng

#### 5.3. Đặt lịch khám hoặc dịch vụ trực tuyến

##### 5.3.1. Đặt lịch dịch vụ

**Input:**

- Form đặt lịch gồm các trường:
  - Chọn thú cưng (mathucung) - Bắt buộc, dropdown (từ danh sách thú cưng của chủ nuôi)
  - Loại dịch vụ (loaidichvu) - Bắt buộc, dropdown (Tắm, Spa, Khám, Tiêm ngừa, Cắt tỉa lông, Lưu trú)
  - Dịch vụ cụ thể (madichvu) - Bắt buộc, dropdown (từ danh sách dịch vụ thuộc loại đã chọn, hiển thị giá)
  - Ngày hẹn (ngayhen) - Bắt buộc, Date picker (chỉ cho phép chọn ngày từ hôm nay trở đi)
  - Giờ hẹn (giohen) - Bắt buộc, Time picker (theo khung giờ làm việc của trung tâm)
  - Ghi chú (ghichu) - Tùy chọn, textarea
  - Xác nhận đặt cọc (xacnhandatcoc) - Checkbox (hiển thị số tiền đặt cọc)

**Process:**

1. Hệ thống validate dữ liệu đầu vào
2. Hệ thống kiểm tra thú cưng có thuộc về chủ nuôi hiện tại không
3. Hệ thống kiểm tra lịch trống:
   - Truy vấn từ bảng `Appointments`
   - Kiểm tra xem có lịch hẹn nào trùng thời gian không
   - Kiểm tra khả năng của nhân viên/bác sĩ (nếu có phân công)
4. Nếu lịch trống:
   - Hệ thống tính phí đặt cọc (theo quy tắc nghiệp vụ)
   - Hệ thống tạo lịch hẹn trong bảng `Appointments`:
     - Mã lịch hẹn (malichhen) - Tự động tạo
     - Mã chủ nuôi (từ session)
     - Mã thú cưng
     - Mã dịch vụ
     - Ngày giờ hẹn
     - Trạng thái: "Chờ xử lý" (vì đặt trực tuyến, cần xác nhận)
     - Ghi chú
   - Hệ thống tạo bản ghi thanh toán đặt cọc (nếu có)
   - Hệ thống gửi thông báo cho nhân viên lễ tân về lịch hẹn mới
5. Nếu lịch kín: Hệ thống đề xuất các khung giờ trống gần nhất hoặc đưa vào danh sách chờ

**Output:**

- Nếu thành công:
  - Thông báo: "Đã đặt lịch thành công! Mã lịch hẹn: [Mã]"
  - Hiển thị thông tin lịch hẹn: Ngày giờ, Dịch vụ, Thú cưng, Trạng thái
  - Hiển thị thông báo: "Lịch hẹn của bạn đang chờ xác nhận. Bạn sẽ nhận được thông báo khi được xác nhận."
  - Nút "Xem chi tiết lịch hẹn"
- Nếu lịch kín:
  - Hiển thị danh sách khung giờ trống gần nhất
  - Đề xuất đưa vào danh sách chờ
  - Hiển thị nút "Đăng ký danh sách chờ"

##### 5.3.2. Xem danh sách lịch hẹn

**Input:**

- Từ trang quản lý lịch hẹn (sau khi đăng nhập)
- Bộ lọc (tùy chọn):
  - Trạng thái: Tất cả / Chờ xử lý / Đã xác nhận / Đang thực hiện / Đã hoàn thành / Đã hủy
  - Khoảng thời gian: Tất cả / Hôm nay / Tuần này / Tháng này / Tùy chọn (từ ngày - đến ngày)

**Process:**

1. Hệ thống lấy mã chủ nuôi từ session đăng nhập
2. Hệ thống truy vấn từ bảng `Appointments` kết hợp với `Pets`, `Services`
3. Hệ thống lọc các lịch hẹn có machunoi = mã chủ nuôi hiện tại
4. Hệ thống áp dụng bộ lọc trạng thái và khoảng thời gian (nếu có)
5. Hệ thống sắp xếp theo ngày giờ hẹn (sắp tới nhất trước)

**Output:**

- Danh sách lịch hẹn hiển thị dạng card hoặc bảng:
  - Mã lịch hẹn
  - Ngày giờ hẹn
  - Tên thú cưng
  - Tên dịch vụ
  - Trạng thái (với màu sắc: Xanh = Đã xác nhận, Vàng = Chờ xử lý, Xám = Đã hủy, Xanh lá = Đã hoàn thành)
  - Ghi chú (nếu có)
  - Nút "Xem chi tiết" / "Hủy lịch" (nếu chưa hoàn thành)
- Tổng số lịch hẹn
- Số lịch theo từng trạng thái

##### 5.3.3. Xem chi tiết lịch hẹn

**Input:**

- Mã lịch hẹn (malichhen) - Từ danh sách lịch hẹn

**Process:**

1. Hệ thống kiểm tra lịch hẹn có thuộc về chủ nuôi hiện tại không
2. Hệ thống truy vấn thông tin chi tiết từ bảng `Appointments` kết hợp với `Pets`, `Services`, `Owners`
3. Hệ thống load thông tin bổ sung:
   - Thông tin thú cưng
   - Thông tin dịch vụ (tên, giá, mô tả)
   - Lịch sử thay đổi trạng thái (nếu có)
   - Thông tin thanh toán (nếu có)

**Output:**

- Form hiển thị chi tiết lịch hẹn (chỉ đọc):
  - Mã lịch hẹn
  - Ngày giờ hẹn
  - Thông tin thú cưng (tên, loài, giống)
  - Thông tin dịch vụ (tên, giá, mô tả)
  - Trạng thái hiện tại
  - Ghi chú
  - Lịch sử thay đổi trạng thái (nếu có)
  - Thông tin thanh toán (nếu có)
- Nút "Hủy lịch" (nếu trạng thái cho phép)
- Nút "Quay lại danh sách"

##### 5.3.4. Hủy lịch hẹn

**Input:**

- Mã lịch hẹn (malichhen) - Từ danh sách hoặc trang chi tiết
- Lý do hủy (lydo) - Bắt buộc, textarea
- Xác nhận hủy (xacnhan) - Checkbox

**Process:**

1. Hệ thống kiểm tra lịch hẹn có thuộc về chủ nuôi hiện tại không
2. Hệ thống kiểm tra trạng thái lịch hẹn:
   - Chỉ cho phép hủy nếu trạng thái là "Chờ xử lý" hoặc "Đã xác nhận"
   - Không cho phép hủy nếu đã "Đang thực hiện" hoặc "Đã hoàn thành"
3. Hệ thống kiểm tra thời gian hủy:
   - Nếu hủy trước 24 giờ: Áp dụng quy tắc hoàn tiền đặt cọc
   - Nếu hủy trong vòng 24 giờ: Áp dụng quy tắc phí hủy
4. Hệ thống cập nhật trạng thái lịch hẹn thành "Đã hủy"
5. Hệ thống ghi nhận lý do hủy
6. Hệ thống cập nhật số lần hủy của chủ nuôi (để theo dõi vi phạm)
7. Hệ thống xử lý hoàn tiền đặt cọc hoặc tính phí hủy (theo quy tắc nghiệp vụ)
8. Hệ thống tạo bản ghi lịch sử trong `AppointmentStatusHistory`
9. Hệ thống gửi thông báo cho nhân viên lễ tân về việc hủy lịch

**Output:**

- Thông báo thành công: "Đã hủy lịch hẹn [Mã] thành công"
- Hiển thị thông tin về chính sách hoàn tiền/phí hủy:
  - "Bạn sẽ được hoàn [X]% tiền đặt cọc" (nếu hủy trước 24 giờ)
  - "Bạn sẽ bị tính phí hủy [X] VNĐ" (nếu hủy trong vòng 24 giờ)
- Cảnh báo (nếu có): "Bạn đã hủy [X] lần. Nếu hủy thêm, tài khoản có thể bị hạn chế đặt lịch trực tuyến."
- Cập nhật lại danh sách lịch hẹn

#### 5.4. Xem tình trạng chăm sóc và hóa đơn

##### 5.4.1. Xem tình trạng chăm sóc cơ bản

**Input:**

- Mã lịch hẹn (malichhen) hoặc Mã thú cưng (mathucung) - Từ danh sách lịch hẹn hoặc danh sách thú cưng

**Process:**

1. Hệ thống kiểm tra lịch hẹn/thú cưng có thuộc về chủ nuôi hiện tại không
2. Hệ thống truy vấn thông tin từ:
   - Bảng `Appointments` - Trạng thái lịch hẹn
   - Bảng `ServiceRecords` - Tình trạng dịch vụ (nếu là dịch vụ chăm sóc)
   - Bảng `MedicalRecords` - Tình trạng khám (nếu là dịch vụ khám)
   - Bảng `DailyCareRecords` - Hoạt động hàng ngày (nếu là lưu trú)
3. Hệ thống tổng hợp thông tin tình trạng chăm sóc

**Output:**

- Form hiển thị tình trạng chăm sóc:
  - Thông tin lịch hẹn (ngày giờ, dịch vụ, trạng thái)
  - Tình trạng trước dịch vụ (nếu có)
  - Tình trạng sau dịch vụ (nếu có)
  - Kết quả chăm sóc (nếu có)
  - Ghi chú từ nhân viên/bác sĩ (nếu có)
  - Hoạt động hàng ngày (nếu là lưu trú):
    - Ngày
    - Hoạt động ăn uống
    - Hoạt động vệ sinh
    - Tình trạng sức khỏe
    - Ghi chú
- Nút "Xem hóa đơn" (nếu dịch vụ đã hoàn thành)
- Nút "Quay lại"

##### 5.4.2. Xem danh sách hóa đơn

**Input:**

- Từ trang quản lý hóa đơn (sau khi đăng nhập)
- Bộ lọc (tùy chọn):
  - Trạng thái thanh toán: Tất cả / Chưa thanh toán / Đã thanh toán
  - Khoảng thời gian: Tất cả / Tháng này / Quý này / Năm này / Tùy chọn

**Process:**

1. Hệ thống lấy mã chủ nuôi từ session đăng nhập
2. Hệ thống truy vấn từ bảng `Invoices` kết hợp với `Appointments`
3. Hệ thống lọc các hóa đơn có machunoi = mã chủ nuôi hiện tại
4. Hệ thống áp dụng bộ lọc trạng thái và khoảng thời gian (nếu có)
5. Hệ thống sắp xếp theo ngày lập (mới nhất trước)

**Output:**

- Danh sách hóa đơn hiển thị dạng card hoặc bảng:
  - Mã hóa đơn
  - Ngày lập
  - Tổng tiền
  - Trạng thái thanh toán (với màu sắc: Xanh = Đã thanh toán, Đỏ = Chưa thanh toán)
  - Dịch vụ (danh sách tóm tắt)
  - Nút "Xem chi tiết" / "Thanh toán" (nếu chưa thanh toán)
- Tổng số hóa đơn
- Tổng số tiền chưa thanh toán (nếu có)

##### 5.4.3. Xem chi tiết hóa đơn

**Input:**

- Mã hóa đơn (mahoadon) - Từ danh sách hóa đơn

**Process:**

1. Hệ thống kiểm tra hóa đơn có thuộc về chủ nuôi hiện tại không
2. Hệ thống truy vấn thông tin chi tiết từ bảng `Invoices` kết hợp với `InvoiceDetails`, `Appointments`, `Services`
3. Hệ thống tính toán:
   - Tổng tiền dịch vụ
   - Phí đặt cọc (nếu có)
   - Phí hủy (nếu có)
   - Giảm giá (nếu có)
   - Tổng tiền cuối cùng

**Output:**

- Form hiển thị chi tiết hóa đơn (chỉ đọc):
  - Mã hóa đơn
  - Ngày lập
  - Thông tin chủ nuôi (tên, địa chỉ, số điện thoại)
  - Danh sách dịch vụ:
    - Tên dịch vụ
    - Số lượng
    - Đơn giá
    - Thành tiền
  - Tổng tiền dịch vụ
  - Phí đặt cọc (nếu có)
  - Phí hủy (nếu có)
  - Giảm giá (nếu có)
  - Tổng tiền cuối cùng
  - Trạng thái thanh toán
  - Phương thức thanh toán (nếu đã thanh toán)
  - Ngày thanh toán (nếu đã thanh toán)
- Nút "Tải PDF" (nếu có chức năng)
- Nút "Thanh toán" (nếu chưa thanh toán)
- Nút "Quay lại danh sách"

---

## IV. CÁC QUY TẮC NGHIỆP VỤ QUAN TRỌNG

### 4.1. Quy tắc đặt lịch và đặt cọc

#### 4.1.1. Quy tắc đặt cọc khi đặt lịch

- **Mức đặt cọc**: Tất cả chủ nuôi khi đặt lịch đều cần đặt cọc một khoản phí nhất định

  - Mức đặt cọc mặc định: 30% giá trị dịch vụ (có thể cấu hình)
  - Mức đặt cọc tối thiểu: 50,000 VNĐ
  - Đối với khách hàng có lịch sử hủy lịch nhiều lần: Mức đặt cọc có thể tăng lên 50% hoặc 100% giá trị dịch vụ

- **Xử lý đặt cọc**:
  - Khi đặt lịch thành công, hệ thống tự động tạo bản ghi thanh toán đặt cọc
  - Đặt cọc được tính vào tổng tiền hóa đơn khi thanh toán
  - Nếu hủy lịch đúng quy định: Đặt cọc được hoàn trả (xem quy tắc hủy lịch)

#### 4.1.2. Quy tắc kiểm tra lịch trống

- **Kiểm tra trùng lịch**:

  - Hệ thống không cho phép đặt lịch trùng thời gian cho cùng một nhân viên/bác sĩ
  - Khoảng thời gian giữa các lịch hẹn: Tối thiểu 15 phút (có thể cấu hình)
  - Nếu lịch đã kín: Hệ thống đề xuất các khung giờ trống gần nhất hoặc đưa vào danh sách chờ

- **Danh sách chờ**:
  - Khi lịch đã kín, chủ nuôi có thể đăng ký danh sách chờ
  - Khi có lịch trống phù hợp, hệ thống tự động thông báo cho chủ nuôi đăng ký sớm nhất (qua email/SMS)
  - Chủ nuôi có 24 giờ để xác nhận lịch từ danh sách chờ, sau đó lịch sẽ được chuyển cho người tiếp theo

### 4.2. Quy tắc hủy lịch và hoàn tiền

#### 4.2.1. Quy tắc hủy lịch

- **Thời gian hủy lịch**:

  - Hủy trước 24 giờ so với thời gian hẹn: Được hoàn 100% tiền đặt cọc
  - Hủy trong vòng 24 giờ (nhưng trước 12 giờ): Được hoàn 50% tiền đặt cọc
  - Hủy trong vòng 12 giờ: Không được hoàn tiền đặt cọc, bị tính phí hủy 20% giá trị dịch vụ
  - Hủy sau khi dịch vụ đã bắt đầu: Không được hoàn tiền, phải thanh toán 100% giá trị dịch vụ

- **Xử lý hủy lịch**:
  - Khi chủ nuôi hủy lịch, hệ thống tự động tính toán số tiền hoàn lại hoặc phí hủy
  - Hệ thống cập nhật số lần hủy của chủ nuôi
  - Hệ thống gửi thông báo cho nhân viên lễ tân về việc hủy lịch

#### 4.2.2. Quy tắc xử lý vi phạm hủy lịch

- **Theo dõi vi phạm**:

  - Hệ thống ghi nhận số lần hủy lịch của mỗi chủ nuôi
  - Vi phạm được tính khi: Hủy lịch trong vòng 12 giờ hoặc hủy nhiều lần liên tiếp (3 lần trở lên trong 1 tháng)

- **Biện pháp xử lý**:
  - Hủy 1-2 lần: Cảnh báo qua email/SMS
  - Hủy 3-5 lần: Tăng mức đặt cọc lên 50% giá trị dịch vụ
  - Hủy 6-10 lần: Tăng mức đặt cọc lên 100% giá trị dịch vụ
  - Hủy trên 10 lần: Tạm khóa quyền đặt lịch trực tuyến trong 30 ngày, chỉ được đặt lịch tại quầy lễ tân

### 4.3. Quy tắc tính phí lưu trú

#### 4.3.1. Tính phí lưu trú

- **Cách tính**:

  - Phí lưu trú = Số ngày lưu trú × Giá dịch vụ lưu trú/ngày
  - Số ngày lưu trú được tính từ thời gian check-in đến thời gian check-out
  - Làm tròn lên: Nếu quá một phần ngày (ví dụ: 2.5 ngày) thì tính thành 3 ngày

- **Thời gian check-in/check-out**:
  - Check-in: Thời gian thú cưng thực tế vào chuồng (ghi nhận bởi nhân viên lễ tân)
  - Check-out: Thời gian thú cưng thực tế ra khỏi chuồng (ghi nhận bởi nhân viên lễ tân)
  - Bắt đầu tính phí từ thời điểm check-in

#### 4.3.2. Xử lý thanh toán lưu trú

- **Tạo hóa đơn**:

  - Khi check-out, hệ thống tự động tính phí lưu trú
  - Phí lưu trú được thêm vào hóa đơn (có thể kết hợp với các dịch vụ khác)
  - Hóa đơn được tạo tự động hoặc cập nhật hóa đơn hiện có

- **Thanh toán**:
  - Chủ nuôi có thể thanh toán ngay sau khi check-out hoặc thanh toán sau
  - Hệ thống hỗ trợ thanh toán: Tiền mặt, chuyển khoản ngân hàng, ví điện tử

### 4.4. Quy tắc phân bổ chuồng nuôi

#### 4.4.1. Quy tắc gợi ý chuồng phù hợp

- **Tiêu chí gợi ý**:

  - Kích thước chuồng phù hợp với kích thước thú cưng (dựa trên cân nặng và loài)
  - Loại thú cưng phù hợp (chó nhỏ, chó lớn, mèo, thú cưng đặc biệt)
  - Trạng thái chuồng: Chỉ gợi ý chuồng có trạng thái "Trống"
  - Ưu tiên chuồng ở khu vực cách ly nếu thú cưng cần cách ly y tế

- **Xử lý không có chuồng trống**:
  - Nếu không có chuồng trống phù hợp: Hiển thị thông báo "Không có chuồng trống phù hợp, vui lòng kiểm tra lại sau"
  - Đề xuất đăng ký danh sách chờ chuồng (nếu có chức năng)

#### 4.4.2. Quy tắc cách ly y tế

- **Yêu cầu cách ly**:

  - Bác sĩ có thể yêu cầu cách ly cho thú cưng mắc bệnh truyền nhiễm hoặc cần chăm sóc đặc biệt
  - Yêu cầu cách ly được gửi đến nhân viên lễ tân để xử lý
  - Hệ thống ưu tiên phân bổ chuồng ở khu vực cách ly (nếu có)

- **Xử lý cách ly**:
  - Thú cưng cách ly không được ở gần các thú cưng khác
  - Chuồng cách ly cần được vệ sinh đặc biệt sau khi sử dụng
  - Nhân viên chăm sóc cần tuân thủ quy trình vệ sinh khi tiếp xúc với thú cưng cách ly

### 4.5. Quy tắc thanh toán và hóa đơn

#### 4.5.1. Tạo hóa đơn

- **Thời điểm tạo hóa đơn**:

  - Hóa đơn được tạo tự động khi dịch vụ hoàn thành (trạng thái lịch hẹn = "Đã hoàn thành")
  - Đối với dịch vụ lưu trú: Hóa đơn được tạo hoặc cập nhật khi check-out

- **Nội dung hóa đơn**:
  - Danh sách dịch vụ đã sử dụng (tên, số lượng, đơn giá, thành tiền)
  - Phí đặt cọc (nếu có, được trừ vào tổng tiền)
  - Phí hủy (nếu có)
  - Giảm giá (nếu có, dựa trên chính sách khuyến mãi hoặc khách hàng thân thiết)
  - Tổng tiền cuối cùng

#### 4.5.2. Quy tắc thanh toán

- **Phương thức thanh toán**:

  - Tiền mặt: Thanh toán trực tiếp tại quầy lễ tân
  - Chuyển khoản ngân hàng: Chủ nuôi chuyển khoản, nhân viên xác nhận và cập nhật trạng thái
  - Ví điện tử: Thanh toán qua các cổng thanh toán điện tử (nếu có tích hợp)

- **Xử lý thanh toán**:
  - Khi thanh toán thành công, hệ thống cập nhật trạng thái hóa đơn thành "Đã thanh toán"
  - Hệ thống ghi nhận phương thức thanh toán, ngày giờ thanh toán
  - Hệ thống cập nhật lịch sử thanh toán của chủ nuôi (để xác định khách hàng thân thiết)

### 4.6. Quy tắc cập nhật trạng thái lịch hẹn

#### 4.6.1. Quy tắc chuyển trạng thái

- **Luồng trạng thái hợp lệ**:

  - "Chờ xử lý" → "Đã xác nhận" / "Đã hủy": Cho phép
  - "Đã xác nhận" → "Đang thực hiện" / "Đã hủy": Cho phép
  - "Đang thực hiện" → "Đã hoàn thành" / "Đã hủy": Cho phép
  - "Đã hoàn thành": Không thể thay đổi (trừ khi có quyền đặc biệt)
  - "Đã hủy": Không thể thay đổi (trừ khi có quyền đặc biệt)

- **Người thực hiện**:
  - Chủ nuôi: Chỉ có thể hủy lịch (nếu trạng thái cho phép)
  - Nhân viên lễ tân: Có thể thay đổi tất cả trạng thái
  - Bác sĩ/Nhân viên chăm sóc: Có thể cập nhật trạng thái khi thực hiện dịch vụ

#### 4.6.2. Tự động cập nhật trạng thái

- **Khi hoàn thành dịch vụ**:
  - Khi bác sĩ cập nhật hồ sơ khám: Trạng thái lịch hẹn tự động chuyển thành "Đã hoàn thành"
  - Khi nhân viên chăm sóc cập nhật tình trạng dịch vụ: Trạng thái lịch hẹn tự động chuyển thành "Đã hoàn thành"
  - Khi trạng thái chuyển thành "Đã hoàn thành": Hệ thống tự động tạo hóa đơn

### 4.7. Quy tắc quản lý thông tin thú cưng

#### 4.7.1. Quy tắc xóa thú cưng

- **Điều kiện xóa**:

  - Không cho phép xóa nếu thú cưng đang có lịch hẹn ở trạng thái "Chờ xử lý", "Đã xác nhận", "Đang thực hiện"
  - Không cho phép xóa nếu thú cưng đang lưu trú (trạng thái chuồng = "Đang có thú")
  - Nếu thú cưng có hồ sơ khám/dịch vụ đã hoàn thành: Chỉ được đánh dấu "Đã xóa" (soft delete), không xóa hoàn toàn để giữ lịch sử

- **Xử lý xóa**:
  - Nếu không có hồ sơ: Xóa hoàn toàn khỏi bảng `Pets`
  - Nếu có hồ sơ: Đánh dấu "Đã xóa" (soft delete), thông tin vẫn tồn tại trong hệ thống nhưng không hiển thị trong danh sách thông thường

#### 4.7.2. Quy tắc cập nhật thông tin

- **Thông tin có thể cập nhật**:

  - Chủ nuôi: Có thể cập nhật tất cả thông tin cơ bản của thú cưng (tên, loài, giống, tuổi, cân nặng, màu sắc, tình trạng sức khỏe)
  - Bác sĩ: Có thể bổ sung/cập nhật thông tin y tế (tuổi, cân nặng, tình trạng sức khỏe)
  - Quản lý: Có thể cập nhật tất cả thông tin

- **Lưu lịch sử**:
  - Mỗi lần cập nhật thông tin, hệ thống tạo bản ghi lịch sử trong bảng `PetHistory` (lưu dữ liệu cũ và mới, thời gian cập nhật, người cập nhật)

### 4.8. Quy tắc báo cáo và thống kê

#### 4.8.1. Quy tắc tính toán báo cáo

- **Báo cáo số lượt dịch vụ**:

  - Chỉ tính các lịch hẹn có trạng thái "Đã hoàn thành"
  - Nhóm theo loại dịch vụ để thống kê
  - So sánh với kỳ trước (tháng trước, quý trước, năm trước)

- **Báo cáo doanh thu**:
  - Chỉ tính các hóa đơn có trạng thái "Đã thanh toán"
  - Tính tổng doanh thu từ cột `tongtien` của các hóa đơn
  - Nhóm theo loại dịch vụ để thống kê chi tiết
  - So sánh với kỳ trước (tăng/giảm bao nhiêu VNĐ và %)

#### 4.8.2. Quy tắc báo cáo lưu trú

- **Báo cáo tình trạng chuồng**:

  - Hiển thị tất cả chuồng nuôi với trạng thái hiện tại
  - Thống kê số lượng chuồng theo từng trạng thái (Trống, Đang dùng, Bảo trì)
  - Hiển thị thông tin thú cưng đang sử dụng (nếu có)

- **Báo cáo thú cưng lưu trú**:
  - Chỉ hiển thị các thú cưng có trạng thái lưu trú = "Đang lưu trú"
  - Tính toán ngày kết thúc dự kiến dựa trên ngày bắt đầu và thời gian lưu trú
  - Cảnh báo màu sắc: Đỏ (sắp kết thúc trong 1 ngày), Vàng (sắp kết thúc trong 3 ngày), Xanh (còn nhiều thời gian)

---

**KẾT THÚC TÀI LIỆU**
