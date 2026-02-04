"use client";

import { useState, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";
import { usePathname } from "next/navigation";

export function TutorialGuide({ run, onFinish }) {
    const pathname = usePathname();
    const [steps, setSteps] = useState([]);

    const stepsConfig = {
        // Global / Home steps
        default: [
            {
                target: "body",
                content: "Chào mừng bạn đến với Skin Profile Manager! Đây là hệ thống quản lý hồ sơ da liễu chuyên nghiệp.",
                placement: "center",
            },
            {
                target: 'a[href="/records/new"]',
                content: "Bắt đầu bằng cách bấm vào đây để tạo hồ sơ khách hàng mới.",
            },
            {
                target: 'a[href="/records"]',
                content: "Quản lý và xem lại danh sách tất cả hồ sơ khách hàng tại đây.",
            },
            {
                target: 'a[href="/dashboard"]',
                content: "Xem báo cáo thống kê chi tiết về tình trạng da của khách hàng.",
            },
        ],
        // Records List Page
        "/records": [
            {
                target: "body",
                content: "Đây là trang quản lý danh sách hồ sơ. Bạn có thể xem, tìm kiếm và quản lý tất cả khách hàng.",
                placement: "center",
            },
            {
                target: 'a[href="/records/new"]', // Create button
                content: "Bấm nút này để thêm một khách hàng mới vào hệ thống.",
            },
            {
                target: "button:has(svg.feather-download)", // Export button - heuristic selector, or we add ID later
                content: "Xuất toàn bộ dữ liệu hồ sơ ra file JSON để lưu trữ hoặc backup.",
            },
            {
                target: ".grid > div:first-child", // First card
                content: "Mỗi thẻ đại diện cho một hồ sơ khách hàng với thông tin tóm tắt và ảnh đại diện.",
            },
            {
                target: ".grid > div:first-child a[href^='/records/']", // View button in first card
                content: "Bấm 'Xem' để truy cập chi tiết hồ sơ.",
            },
        ],
        // Dashboard Page
        "/dashboard": [
            {
                target: "h1",
                content: "Dashboard cung cấp cái nhìn tổng quan về dữ liệu khách hàng của bạn.",
                placement: "bottom",
            },
            {
                target: ".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4", // Stats cards container
                content: "Các thẻ thống kê nhanh về số lượng hồ sơ và tình trạng xử lý.",
            },
            {
                target: ".recharts-responsive-container", // Chart
                content: "Biểu đồ trực quan giúp bạn phân tích xu hướng và đặc điểm da của khách hàng.",
            },
            {
                target: "button:has(svg.feather-download)", // Export button
                content: "Bạn cũng có thể xuất dữ liệu báo cáo từ đây.",
            },
        ],
        // New Record Page
        "/records/new": [
            {
                target: "h1",
                content: "Tại đây bạn sẽ nhập thông tin chi tiết để tạo hồ sơ mới.",
                placement: "bottom",
            },
            {
                target: ".border-dashed", // Upload area
                content: "Kéo thả hoặc bấm để tải lên ảnh khuôn mặt của khách hàng.",
            },
            {
                target: ".flex.flex-wrap.gap-2", // Zone tabs
                content: "Chọn từng vùng trên khuôn mặt để đánh giá chi tiết tình trạng da.",
            },
            {
                target: "button:has(svg.feather-check-circle)", // Save button
                content: "Sau khi điền xong, đừng quên bấm 'Hoàn tất' để lưu hồ sơ.",
            },
        ],
    };

    useEffect(() => {
        // Determine which steps to show based on pathname
        let currentSteps = stepsConfig.default;

        if (pathname === "/records") {
            currentSteps = stepsConfig["/records"];
        } else if (pathname === "/dashboard") {
            currentSteps = stepsConfig["/dashboard"];
        } else if (pathname === "/records/new") {
            currentSteps = stepsConfig["/records/new"];
        } else if (pathname.startsWith("/records/") && pathname.endsWith("/edit")) {
            // Logic for edit page if needed
            currentSteps = stepsConfig["/records/new"]; // Reuse new record steps for now
        }

        setSteps(currentSteps);
    }, [pathname]);

    const handleCallback = (data) => {
        const { status } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            onFinish();
        }
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            showProgress
            showSkipButton
            callback={handleCallback}
            styles={{
                options: {
                    primaryColor: "#EC4899",
                    textColor: "#831843",
                    zIndex: 10000,
                },
            }}
            locale={{
                back: "Quay lại",
                close: "Đóng",
                last: "Hoàn thành",
                next: "Tiếp theo",
                skip: "Bỏ qua",
            }}
        />
    );
}
