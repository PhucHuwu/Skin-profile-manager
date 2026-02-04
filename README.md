# Skin Profile Manager

Hệ thống thu thập và quản lý dữ liệu tình trạng da mặt của khách hàng cho cửa hàng SPA.

## 🎨 Design System

**Style:** Soft UI Evolution  
**Colors:** Pink + Lavender (#EC4899, #F9A8D4, #8B5CF6)  
**Typography:** Lora (headings) + Raleway (body)  
**Theme:** Professional, wellness, healthcare

## 📋 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS
- **Charts:** Recharts
- **Forms:** React Hook Form
- **Tutorial:** React Joyride
- **Icons:** React Icons (Feather Icons)

## 🚀 Setup

### Prerequisites

Bạn cần fix npm cache permission trước:

```bash
sudo chown -R $(whoami) ~/.npm
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

### Login Credentials

```
Username: admin
Password: 123
```

## 📁 Project Structure

```
skin-profile-manager/
├── app/                    # Next.js App Router
│   ├── layout.jsx         # Root layout
│   ├── page.jsx           # Home page
│   ├── login/             # Login page
│   └── dashboard/         # Dashboard page
├── components/            # Reusable components
│   ├── common/           # Shared UI
│   ├── layout/           # Layout components
│   └── features/         # Feature components
├── lib/                  # Utilities
├── hooks/                # Custom hooks
├── context/              # React Context
├── data/                 # Mock data
└── public/               # Static assets
```

## 🎯 Features

- ✅ Đăng nhập demo (admin/123)
- 🚧 Upload ảnh khuôn mặt
- 🚧 Phân tích vùng da (6 vùng)
- 🚧 Form thông tin bổ sung
- 🚧 Lưu trữ LocalStorage
- 🚧 Dashboard với biểu đồ
- 🚧 Xuất JSON
- 🚧 Hướng dẫn sử dụng

## 🎨 Design Guidelines

- ❌ Không dùng emoji làm icons
- ✅ Dùng SVG icons từ react-icons
- ✅ cursor-pointer cho tất cả clickable elements
- ✅ Hover states với smooth transitions (200-300ms)
- ✅ Focus states visible
- ✅ Responsive: 375px, 768px, 1024px, 1440px

## 📝 Development Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/skin-profile-manager)

Hoặc:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 📄 License

Demo application for educational purposes.
