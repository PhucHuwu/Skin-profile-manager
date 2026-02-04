"use client";

import { Lora, Raleway } from "next/font/google";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const lora = Lora({
    subsets: ["latin", "vietnamese"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-lora",
    display: "swap",
});

const raleway = Raleway({
    subsets: ["latin", "vietnamese"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-raleway",
    display: "swap",
});

export default function RootLayout({ children }) {
    return (
        <html lang="vi" className={`${lora.variable} ${raleway.variable}`}>
            <head>
                <title>Skin Profile Manager - Hệ Thống Thu Thập Dữ Liệu SPA</title>
                <meta name="description" content="Hệ thống thu thập và quản lý dữ liệu tình trạng da mặt khách hàng" />
            </head>
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
