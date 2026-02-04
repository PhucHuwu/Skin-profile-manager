# Yêu Cầu Dự Án: Hệ Thống Thu Thập Dữ Liệu AI cho Cửa Hàng SPA

## 1. Mục Tiêu Dự Án

Xây dựng ứng dụng web để thu thập và quản lý dữ liệu tình trạng da mặt của khách hàng, phục vụ cho việc huấn luyện mô hình AI phân tích da trong tương lai.

## 2. Chức Năng Chi Tiết

### 2.1. Xác Thực Người Dùng

**Mô tả:** Hệ thống đăng nhập bảo mật cho nhân viên SPA.

**Yêu cầu:**

- Trang đăng nhập với form đơn giản
- Thông tin đăng nhập mặc định:
    - Username: `admin`
    - Password: `123`
- Sau khi đăng nhập thành công, chuyển hướng đến trang nhập liệu
- Có nút đăng xuất trên header
- Session timeout sau 2 giờ không hoạt động

**UI/UX:**

- Form đăng nhập ở giữa màn hình
- Logo SPA ở phía trên form
- Thông báo lỗi rõ ràng khi đăng nhập sai
- Responsive trên mobile và desktop

---

### 2.2. Upload Ảnh Khuôn Mặt

**Mô tả:** Cho phép upload ảnh khuôn mặt khách hàng để phân tích tình trạng da.

**Yêu cầu:**

- Hỗ trợ định dạng: JPG, PNG, HEIC
- Kích thước tối đa: 10MB
- Hiển thị preview ảnh sau khi upload
- Cho phép xóa và upload lại ảnh mới
- Lưu trữ ảnh với tên file duy nhất (UUID hoặc timestamp)
- Nén ảnh xuống kích thước phù hợp (ví dụ: max 1920x1920px) để tiết kiệm dung lượng

**UI/UX:**

- Khu vực drag & drop để upload ảnh
- Hoặc nút "Chọn ảnh" để mở file browser
- Hiển thị ảnh preview với khung hình vuông hoặc 4:3
- Icon xóa ảnh ở góc trên phải của preview
- Loading indicator khi đang upload

**Ví dụ:**

```
[Khu vực upload]
┌─────────────────────────┐
│   📷                    │
│   Kéo thả ảnh vào đây   │
│   hoặc nhấn để chọn     │
└─────────────────────────┘

[Sau khi upload]
┌─────────────────────────┐
│  [Ảnh khuôn mặt]    ❌  │
│                         │
└─────────────────────────┘
```

---

### 2.3. Nhập Thông Tin Tình Trạng Da Quan Sát Được

**Mô tả:** Phân loại tình trạng da cho từng vùng trên khuôn mặt dựa trên quan sát trực tiếp.

**Các vùng trên khuôn mặt:**

1. Trán (Forehead)
2. Má trái (Left Cheek)
3. Má phải (Right Cheek)
4. Mũi (Nose)
5. Cằm (Chin)
6. Quanh miệng (Around Mouth)

**Nhãn phân loại cho mỗi vùng:**

- **Loại da:**
    - Da khô (Dry)
    - Da dầu (Oily)
    - Da hỗn hợp (Combination)
    - Da thường (Normal)
- **Tình trạng mụn:**
    - Không mụn (Clear)
    - Mụn nhẹ 1-3 nốt (Mild: 1-3 spots)
    - Mụn trung bình 4-10 nốt (Moderate: 4-10 spots)
    - Mụn nhiều >10 nốt (Severe: >10 spots)
- **Mức độ đỏ/viêm:**
    - Không đỏ (None)
    - Đỏ nhẹ (Mild)
    - Đỏ trung bình (Moderate)
    - Đỏ nặng (Severe)
- **Lỗ chân lông:**
    - Lỗ chân lông nhỏ (Small pores)
    - Lỗ chân lông to (Large pores)
    - Lỗ chân lông rất to (Very large pores)

**UI/UX:**

- Hiển thị sơ đồ khuôn mặt chia thành 6 vùng
- Mỗi vùng có form radio buttons cho các nhãn
- Có thể click vào từng vùng trên sơ đồ để focus vào form tương ứng
- Màu sắc highlight vùng đang được chọn
- Validation: Bắt buộc chọn ít nhất loại da cho mỗi vùng

**Ví dụ layout:**

```
┌─────────────────────────────────────────┐
│         PHÂN TÍCH VÙNG DA MẶT           │
├─────────────────────────────────────────┤
│  [Sơ đồ khuôn mặt]     │  [Form nhập]   │
│                        │                │
│      ┌─────┐           │  VÙNG: Trán    │
│      │ Trán│           │  ○ Da khô      │
│      └─────┘           │  ● Da dầu      │
│   ┌───┐   ┌───┐        │  ○ Da hỗn hợp  │
│   │Má │   │Má │        │  ○ Da thường   │
│   │ T │   │ P │        │                │
│   └───┘   └───┘        │  Mụn:          │
│      ┌─────┐           │  ○ Không mụn   │
│      │ Mũi │           │  ● Mụn nhẹ     │
│      └─────┘           │  ...           │
│   ┌──────────┐         │                │
│   │ Quanh    │         │                │
│   │ miệng    │         │                │
│   └──────────┘         │                │
│      ┌─────┐           │                │
│      │ Cằm │           │                │
│      └─────┘           │                │
└─────────────────────────────────────────┘
```

---

### 2.4. Nhập Thông Tin Bổ Sung

**Mô tả:** Thu thập thông tin cá nhân và các tình trạng da không quan sát được bằng mắt thường.

**Thông tin cá nhân:**

- **Tuổi:**
    - Input type: Number
    - Range: 15-80
    - Ví dụ: 25
- **Giới tính:**
    - Radio buttons: Nam / Nữ / Khác
- **Họ và tên (tùy chọn):**
    - Input type: Text
    - Tối đa 100 ký tự
    - Ví dụ: Nguyễn Văn A

**Tình trạng da không thấy bằng mắt:**

- **Độ ẩm da (Hydration Level):**
    - Radio: Rất khô / Khô / Bình thường / Ẩm / Rất ẩm
- **Độ đàn hồi (Elasticity):**
    - Radio: Kém / Trung bình / Tốt / Rất tốt
- **Nếp nhăn (Wrinkles):**
    - Radio: Không có / Nếp nhăn nhỏ / Nếp nhăn rõ / Nếp nhăn sâu
- **Sắc tố/Nám (Pigmentation):**
    - Radio: Không có / Nhẹ / Trung bình / Nặng
- **Độ nhạy cảm (Sensitivity):**
    - Radio: Không nhạy cảm / Hơi nhạy cảm / Nhạy cảm / Rất nhạy cảm
- **Tiền sử dị ứng:**
    - Textarea: Mô tả các sản phẩm hoặc thành phần gây dị ứng
    - Ví dụ: "Dị ứng với retinol, alcohol"
- **Sản phẩm đang sử dụng:**
    - Textarea: Liệt kê các sản phẩm skincare đang dùng
    - Ví dụ: "Sữa rửa mặt Cetaphil, kem dưỡng Cerave, serum Vitamin C"
- **Ghi chú thêm (tùy chọn):**
    - Textarea: Bất kỳ thông tin bổ sung nào
    - Tối đa 500 ký tự

**UI/UX:**

- Form layout rõ ràng với labels
- Required fields có dấu (\*)
- Tooltip/helper text cho các trường khó hiểu
- Validation real-time khi blur khỏi input

---

### 2.5. Lưu Trữ và Chỉnh Sửa Dữ Liệu

**Mô tả:** Cho phép lưu và cập nhật thông tin đã nhập.

**Yêu cầu:**

- Nút "Lưu tạm" (Draft): Lưu dữ liệu chưa hoàn thiện, có thể quay lại chỉnh sửa
- Nút "Hoàn tất" (Submit): Lưu dữ liệu đã hoàn chỉnh
- Tự động lưu (Auto-save) mỗi 2 phút để tránh mất dữ liệu
- Hiển thị thông báo khi lưu thành công
- Mỗi bản ghi có ID duy nhất và timestamp

**Chỉnh sửa:**

- Có danh sách các bản ghi đã lưu (cả draft và completed)
- Click vào bản ghi để mở form chỉnh sửa
- Pre-fill tất cả thông tin đã nhập trước đó
- Hiển thị thông tin "Lần chỉnh sửa cuối: 2026-02-04 14:30"
- Có lịch sử chỉnh sửa (version history) - tùy chọn nâng cao

**UI/UX:**

- Buttons cố định ở cuối form
- Confirmation dialog khi thoát mà chưa lưu
- Loading state khi đang lưu
- Success toast message

**Ví dụ:**

```
[Footer của form]
┌─────────────────────────────────────────┐
│  Lần lưu cuối: 14:30 - 04/02/2026       │
│                                         │
│  [Lưu tạm]  [Hoàn tất]  [Hủy]          │
└─────────────────────────────────────────┘
```

---

### 2.6. Xem Lại Thông Tin

**Mô tả:** Hiển thị chi tiết một bản ghi đã lưu ở chế độ xem (read-only).

**Yêu cầu:**

- Trang chi tiết hiển thị đầy đủ thông tin:
    - Ảnh khuôn mặt (full size, có thể zoom)
    - Thông tin cá nhân
    - Bảng tổng hợp tình trạng da theo từng vùng
    - Thông tin bổ sung
    - Metadata: Ngày tạo, người tạo, lần sửa cuối
- Nút "Chỉnh sửa" để chuyển sang chế độ edit
- Nút "Xuất PDF" để export thông tin (tùy chọn)
- Nút "In" để in thông tin khách hàng

**UI/UX:**

- Layout 2 cột: Ảnh bên trái, thông tin bên phải
- Cards/Sections rõ ràng cho từng loại thông tin
- Màu sắc highlight cho các vấn đề da cần chú ý
- Responsive trên mobile

**Ví dụ layout:**

```
┌─────────────────────────────────────────────────┐
│  ← Quay lại  [Chỉnh sửa]  [Xuất PDF]  [In]     │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────┐   THÔNG TIN KHÁCH HÀNG        │
│  │             │   Họ tên: Nguyễn Văn A         │
│  │   [Ảnh]     │   Tuổi: 25                     │
│  │             │   Giới tính: Nữ                │
│  │             │   Ngày khám: 04/02/2026        │
│  └─────────────┘                                │
│                                                 │
│  PHÂN TÍCH DA THEO VÙNG                         │
│  ┌─────────────────────────────────────────┐   │
│  │ Vùng    │ Loại da │ Mụn  │ Đỏ │ Lỗ chân│   │
│  ├─────────────────────────────────────────┤   │
│  │ Trán    │ Da dầu  │ Nhẹ  │ Có │ To     │   │
│  │ Má trái │ Hỗn hợp │Không │Không│Nhỏ    │   │
│  │ ...     │ ...     │ ...  │... │ ...    │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  THÔNG TIN BỔ SUNG                              │
│  Độ ẩm: Khô                                     │
│  Độ đàn hồi: Tốt                                │
│  ...                                            │
└─────────────────────────────────────────────────┘
```

---

### 2.7. Dashboard Thống Kê

**Mô tả:** Trang tổng quan về dữ liệu đã thu thập, phục vụ quản lý và theo dõi.

**Yêu cầu thống kê:**

**1. Số liệu tổng quan (Cards):**

- Tổng số bản ghi (Total Records)
- Số bản ghi hoàn thiện (Completed)
- Số bản ghi nháp (Drafts)
- Số bản ghi được tạo trong tuần/tháng này
- Độ tuổi trung bình của dữ liệu

**2. Biểu đồ phân bổ nhãn:**

a) **Biểu đồ tròn - Phân bổ loại da:**

- Da khô: 30%
- Da dầu: 25%
- Da hỗn hợp: 35%
- Da thường: 10%

b) **Biểu đồ cột - Phân bổ tình trạng mụn:**

- Trục X: Các mức độ (Không, Nhẹ, TB, Nặng)
- Trục Y: Số lượng bản ghi

c) **Biểu đồ nhiệt (Heatmap) - Vấn đề da theo vùng:**

- Hiển thị vùng nào hay gặp vấn đề nhất
- Ví dụ: Vùng T (trán, mũi) hay bị dầu và mụn

d) **Biểu đồ đường - Xu hướng theo thời gian:**

- Số lượng bản ghi được tạo theo tuần/tháng

e) **Biểu đồ cột ngang - Phân bổ độ tuổi:**

- 15-20: 15 bản ghi
- 21-30: 50 bản ghi
- 31-40: 30 bản ghi
- ...

**3. Bộ lọc (Filters):**

- Lọc theo khoảng thời gian (date range picker)
- Lọc theo loại da
- Lọc theo độ tuổi
- Lọc theo giới tính
- Lọc theo tình trạng (Completed/Draft)

**4. Bảng danh sách:**

- Danh sách tất cả các bản ghi với thông tin tóm tắt
- Columns: ID, Ảnh thumbnail, Tên, Tuổi, Loại da chủ đạo, Ngày tạo, Trạng thái, Actions
- Có pagination (10/20/50 items per page)
- Có search box để tìm kiếm theo tên hoặc ID
- Có sort theo các cột
- Actions: Xem, Sửa, Xóa

**UI/UX:**

- Dashboard layout với grid system
- Cards cho số liệu ở trên cùng
- Biểu đồ responsive, sử dụng Chart.js hoặc Recharts
- Color scheme nhất quán
- Export dashboard thành PDF hoặc Excel (tùy chọn)

**Ví dụ layout:**

```
┌──────────────────────────────────────────────────────────┐
│  DASHBOARD - THỐNG KÊ DỮ LIỆU                            │
├──────────────────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │ Tổng    │ │Hoàn tất │ │ Nháp    │ │ Tuần này│        │
│  │  150    │ │  120    │ │   30    │ │   15    │        │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│                                                          │
│  ┌──────────────────────┐  ┌──────────────────────┐     │
│  │ Phân bổ loại da      │  │ Tình trạng mụn       │     │
│  │  [Biểu đồ tròn]      │  │  [Biểu đồ cột]       │     │
│  └──────────────────────┘  └──────────────────────┘     │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Bộ lọc: [Date] [Loại da] [Tuổi] [Giới tính]     │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ ID │Ảnh│ Tên      │Tuổi│Loại da│Ngày   │Actions │   │
│  ├──────────────────────────────────────────────────┤   │
│  │001 │📷 │Nguyễn... │ 25 │Da dầu │02/04  │👁️ ✏️ 🗑️│   │
│  │002 │📷 │Trần...   │ 30 │Hỗn hợp│02/03  │👁️ ✏️ 🗑️│   │
│  │... │...│...       │... │...    │...    │...     │   │
│  └──────────────────────────────────────────────────┘   │
│  [< Trước]  1 2 3 ... 10  [Sau >]                       │
└──────────────────────────────────────────────────────────┘
```

---

### 2.8. Hướng Dẫn Sử Dụng (Tutorial Guide)

**Mô tả:** Cung cấp hướng dẫn từng bước cho người dùng mới sử dụng hệ thống.

**Yêu cầu:**

- Nút "Hướng dẫn sử dụng" luôn hiển thị ở header hoặc góc màn hình
- Khi click, hiển thị dialog/modal hướng dẫn từng bước
- Có thể điều hướng: Tiếp theo / Quay lại / Bỏ qua
- Highlight các phần tử UI được đề cập trong từng bước
- Tự động đóng khi hoàn thành hoặc người dùng bỏ qua

**Các bước hướng dẫn:**

1. **Bước 1 - Chào mừng:**
    - Tiêu đề: "Chào mừng đến với Hệ thống Thu thập Dữ liệu SPA"
    - Nội dung: "Hệ thống giúp bạn ghi nhận và quản lý thông tin tình trạng da của khách hàng một cách dễ dàng."
    - Hình ảnh/Icon minh họa

2. **Bước 2 - Upload ảnh:**
    - Highlight khu vực upload ảnh
    - Hướng dẫn: "Click hoặc kéo thả ảnh khuôn mặt khách hàng vào đây"
    - Lưu ý: Hỗ trợ JPG, PNG, tối đa 10MB

3. **Bước 3 - Phân tích vùng da:**
    - Highlight sơ đồ khuôn mặt 6 vùng
    - Hướng dẫn: "Click vào từng vùng trên khuôn mặt và chọn tình trạng da tương ứng"
    - Ví dụ: "Vùng trán: Da dầu, Mụn nhẹ"

4. **Bước 4 - Thông tin bổ sung:**
    - Highlight form thông tin cá nhân
    - Hướng dẫn: "Điền thông tin về tuổi, giới tính và các đặc điểm da khác"

5. **Bước 5 - Lưu dữ liệu:**
    - Highlight nút "Lưu tạm" và "Hoàn tất"
    - Hướng dẫn: "Lưu tạm để chỉnh sửa sau, hoặc Hoàn tất để lưu vĩnh viễn"

6. **Bước 6 - Xem dashboard:**
    - Highlight menu/link dashboard
    - Hướng dẫn: "Xem tổng quan và thống kê dữ liệu đã nhập tại Dashboard"

7. **Bước 7 - Xuất dữ liệu:**
    - Highlight nút "Xuất JSON"
    - Hướng dẫn: "Xuất toàn bộ dữ liệu thành file JSON khi cần"

8. **Bước 8 - Hoàn thành:**
    - Tiêu đề: "Bạn đã sẵn sàng!"
    - Nội dung: "Bắt đầu ghi nhận thông tin khách hàng ngay bây giờ"
    - Nút: "Bắt đầu"

**UI/UX:**

- Dialog overlay với backdrop mờ
- Progress indicator (Bước 1/8)
- Spotlight/Highlight phần tử được hướng dẫn
- Animation mượt mà khi chuyển bước
- Có checkbox "Không hiển thị lại" (lưu vào LocalStorage)

**Implementation:**

- Sử dụng thư viện như Intro.js, Shepherd.js, hoặc React Joyride
- Hoặc tự implement với Modal + absolute positioning

**Ví dụ UI:**

```
┌─────────────────────────────────────────────┐
│  [X]                               [1/8]    │
│                                             │
│  🎯 Bước 1: Chào mừng                       │
│                                             │
│  Hệ thống giúp bạn ghi nhận và quản lý     │
│  thông tin tình trạng da của khách hàng    │
│  một cách dễ dàng.                          │
│                                             │
│  [Bỏ qua]            [Tiếp theo →]         │
│                                             │
│  □ Không hiển thị lại                       │
└─────────────────────────────────────────────┘
```

---

## 3. Yêu Cầu Kỹ Thuật

> [!IMPORTANT]
> **ĐÂY LÀ WEB DEMO - FRONTEND ONLY**
>
> Dự án này chỉ là demo frontend, không sử dụng backend hay database thật. Tất cả dữ liệu sẽ được mock và lưu trữ trong browser (LocalStorage/SessionStorage).

### 3.1. Tech Stack

**Frontend:**

- **Framework:** React.js (hoặc Next.js nếu cần routing phức tạp)
- **Styling:** TailwindCSS (hoặc Material-UI cho component có sẵn)
- **Charts:** Chart.js, Recharts hoặc ApexCharts
- **Form Management:** React Hook Form
- **State Management:** React Context API hoặc Zustand (cho quản lý state đơn giản)
- **Icons:** React Icons hoặc Heroicons

**Không sử dụng:**

- ❌ Backend server
- ❌ Database (PostgreSQL, MongoDB, etc.)
- ❌ API endpoints thật
- ❌ Authentication service

### 3.2. Cấu Trúc Dữ Liệu (Mock Data)

**Dữ liệu mẫu (Mock Data):**
Tạo file `src/data/mockData.json` chứa 5-10 bản ghi mẫu để hiển thị trên dashboard.

**Ví dụ cấu trúc JSON:**

```json
{
    "records": [
        {
            "id": "REC001",
            "imageUrl": "/images/face-sample-1.jpg",
            "personalInfo": {
                "name": "Nguyễn Văn A",
                "age": 25,
                "gender": "Nữ"
            },
            "skinAnalysis": [
                {
                    "zone": "forehead",
                    "zoneName": "Trán",
                    "skinType": "oily",
                    "acneLevel": "mild",
                    "rednessLevel": "none",
                    "poreSize": "large"
                },
                {
                    "zone": "left_cheek",
                    "zoneName": "Má trái",
                    "skinType": "combination",
                    "acneLevel": "clear",
                    "rednessLevel": "mild",
                    "poreSize": "small"
                }
                // ... các vùng khác: right_cheek, nose, chin, around_mouth
            ],
            "additionalInfo": {
                "hydrationLevel": "dry",
                "elasticity": "good",
                "wrinkles": "none",
                "pigmentation": "mild",
                "sensitivity": "sensitive",
                "allergyHistory": "Dị ứng với retinol, alcohol",
                "currentProducts": "Sữa rửa mặt Cetaphil, kem dưỡng Cerave",
                "notes": "Khách hàng muốn cải thiện vùng má"
            },
            "status": "completed",
            "createdAt": "2026-02-01T10:30:00Z",
            "updatedAt": "2026-02-01T14:20:00Z"
        }
        // ... thêm 4-9 bản ghi mẫu khác
    ]
}
```

### 3.3. Lưu Trữ Dữ Liệu

**1. Ảnh khuôn mặt:**

- **Mock images:** Lưu trong thư mục `public/images/` của project
    - Đặt tên file: `face-sample-1.jpg`, `face-sample-2.jpg`, etc.
    - Chuẩn bị sẵn 5-10 ảnh khuôn mặt mẫu
- **User uploaded images:** Khi upload ảnh mới trong demo:
    - Sử dụng FileReader API để convert thành base64
    - Lưu base64 string vào LocalStorage cùng với record
    - **Lưu ý:** LocalStorage có giới hạn ~5-10MB, nên giới hạn kích thước ảnh

**2. Dữ liệu bản ghi:**

- **LocalStorage:** Lưu trữ các bản ghi người dùng tạo mới
    - Key: `skinRecords`
    - Value: JSON string của mảng records
    - Ví dụ: `localStorage.setItem('skinRecords', JSON.stringify([...records]))`
- **SessionStorage:** Lưu trữ draft tạm thời (auto-save)
    - Key: `draftRecord`
    - Clear khi đóng tab/browser
- **Mock Data:** Load từ file `mockData.json` khi khởi động app
    - Import hoặc fetch từ public folder

**3. Xuất dữ liệu JSON:**

- Nút "Xuất dữ liệu JSON" trên dashboard
- Sử dụng `Blob` API để tạo file JSON và trigger download
- File xuất sẽ bao gồm:
    - Tất cả mock data
    - Tất cả dữ liệu từ LocalStorage
    - Timestamp xuất file

**Ví dụ code xuất JSON:**

```javascript
const exportToJSON = () => {
    const mockData = require("./data/mockData.json");
    const localData = JSON.parse(localStorage.getItem("skinRecords") || "[]");

    const allData = {
        exportedAt: new Date().toISOString(),
        mockRecords: mockData.records,
        userRecords: localData,
        totalRecords: mockData.records.length + localData.length,
    };

    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `skin-records-${Date.now()}.json`;
    link.click();
};
```

### 3.4. Authentication (Demo)

**Đăng nhập giả lập:**

- **Không có backend authentication**
- Check username/password hardcoded trong code:

    ```javascript
    const LOGIN_CREDENTIALS = {
        username: "admin",
        password: "123",
    };

    const handleLogin = (username, password) => {
        if (username === LOGIN_CREDENTIALS.username && password === LOGIN_CREDENTIALS.password) {
            sessionStorage.setItem("isAuthenticated", "true");
            sessionStorage.setItem("username", username);
            return true;
        }
        return false;
    };
    ```

- Sau khi đăng nhập thành công, lưu flag vào SessionStorage
- Tự động đăng xuất khi đóng tab/browser (do dùng SessionStorage)
- Protected routes check SessionStorage để xác thực

### 3.5. Xử Lý Upload Ảnh

**Frontend-only image handling:**

```javascript
const handleImageUpload = (file) => {
    // Validate file type
    if (!["image/jpeg", "image/png", "image/heic"].includes(file.type)) {
        alert("Chỉ hỗ trợ JPG, PNG, HEIC");
        return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert("Kích thước file tối đa 10MB");
        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
        const base64Image = e.target.result;
        // Lưu vào state hoặc LocalStorage
        setImagePreview(base64Image);
        // Có thể nén ảnh trước khi lưu
    };

    reader.readAsDataURL(file);
};
```

**Tùy chọn nén ảnh (sử dụng Canvas API):**

```javascript
const compressImage = (base64, maxWidth = 1920) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ratio = Math.min(maxWidth / img.width, 1);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.src = base64;
    });
};
```

### 3.6. Dashboard Statistics

**Tính toán thống kê từ dữ liệu local:**

```javascript
const calculateStats = () => {
    const mockData = require("./data/mockData.json");
    const localData = JSON.parse(localStorage.getItem("skinRecords") || "[]");
    const allRecords = [...mockData.records, ...localData];

    // Tổng quan
    const stats = {
        totalRecords: allRecords.length,
        completedRecords: allRecords.filter((r) => r.status === "completed").length,
        draftRecords: allRecords.filter((r) => r.status === "draft").length,
        avgAge: Math.round(allRecords.reduce((sum, r) => sum + r.personalInfo.age, 0) / allRecords.length),
    };

    // Phân bổ loại da
    const skinTypeCount = {};
    allRecords.forEach((record) => {
        record.skinAnalysis.forEach((analysis) => {
            skinTypeCount[analysis.skinType] = (skinTypeCount[analysis.skinType] || 0) + 1;
        });
    });

    // Phân bổ mụn
    const acneCount = {};
    allRecords.forEach((record) => {
        record.skinAnalysis.forEach((analysis) => {
            acneCount[analysis.acneLevel] = (acneCount[analysis.acneLevel] || 0) + 1;
        });
    });

    return { ...stats, skinTypeCount, acneCount };
};
```

### 3.7. Yêu Cầu Performance

- **Lazy loading:** Dùng React.lazy() cho các routes/components nặng
- **Image optimization:** Resize và nén ảnh trước khi lưu vào LocalStorage
- **Debounce:** Áp dụng cho search box (300ms) và auto-save (2000ms)
- **Memoization:** Dùng React.memo, useMemo, useCallback cho optimization
- **Virtual scrolling:** Nếu danh sách bản ghi quá dài (>100 items)
- **Code splitting:** Tách code theo routes để giảm bundle size ban đầu

---

## 4. Deliverables

### 4.1. Source Code

- [ ] Source code React app đầy đủ
- [ ] File `src/data/mockData.json` với 5-10 bản ghi mẫu
- [ ] Folder `public/images/` chứa 5-10 ảnh khuôn mặt mẫu
- [ ] Component structure rõ ràng và có tổ chức
- [ ] Code có comments tiếng Việt cho các phần quan trọng

### 4.2. Documentation

- [ ] `README.md` với hướng dẫn:
    - Cách cài đặt dependencies (`npm install`)
    - Cách chạy app locally (`npm start` hoặc `npm run dev`)
    - Cấu trúc thư mục project
    - Mô tả các component chính
    - Thông tin đăng nhập (admin/123)
- [ ] Hướng dẫn sử dụng app (user guide ngắn gọn)
- [ ] Giải thích cách mock data và LocalStorage hoạt động

### 4.3. Demo Features

- [ ] Tất cả 7 chức năng hoạt động đầy đủ:
    - ✅ Đăng nhập demo (admin/123)
    - ✅ Upload và preview ảnh
    - ✅ Form nhập tình trạng da theo 6 vùng
    - ✅ Form thông tin bổ sung
    - ✅ Lưu/Chỉnh sửa dữ liệu (LocalStorage)
    - ✅ Xem chi tiết bản ghi
    - ✅ Dashboard với 5 loại biểu đồ và bảng danh sách
- [ ] Nút "Xuất JSON" hoạt động và download được file
- [ ] Responsive trên mobile và desktop
- [ ] UI/UX đẹp mắt, dễ sử dụng

### 4.4. Deployment (Tùy chọn)

- [ ] Deploy lên Vercel, Netlify hoặc GitHub Pages
- [ ] Link demo public để dễ dàng xem và test
- [ ] Instructions để deploy trong README

### 4.5. Không cần

- ❌ Backend code (Node.js, Python, etc.)
- ❌ Database setup scripts
- ❌ API documentation
- ❌ Server deployment guide
- ❌ Environment variables cho production
