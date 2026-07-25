import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aydencompany.github.io"),
  title: "유재형 | 직무 맞춤형 AI·데이터 교육",
  description:
    "다양한 조직과 직무를 위한 생성형 AI·데이터 실무 교육. 기업, 공공기관, 학교의 업무 환경에 맞춘 참여형 교육을 설계합니다.",
  icons: {
    icon: "./favicon.png",
    shortcut: "./favicon.png",
  },
  openGraph: {
    title: "유재형 | 직무 맞춤형 AI·데이터 교육",
    description:
      "생성형 AI를 실제 업무의 변화로 연결하는 직무 맞춤형 실무 교육",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ROOT. AI & DATA EDUCATION - JAEHYEONG YU",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "유재형 | 직무 맞춤형 AI·데이터 교육",
    description:
      "생성형 AI를 실제 업무의 변화로 연결하는 직무 맞춤형 실무 교육",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
