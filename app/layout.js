import ScrollToTop from "@/components/widgets/scroll-to-top";
import Navbar from "@/components/features/navbar";
import Footer from "@/components/features/footer";
import { Toaster } from "@/components/ui/sonner";
import CTA from "@/components/features/cta";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata = {
	title: {
	  default: "HYSF 水中コネクタ",
	  template: "%s - HYSF 水中コネクタ"
	},
	description: "HYSF 水中コネクタ",
	openGraph: {
	  title: "HYSF 水中コネクタ",
	  description:
		"HYSF Technology は中国の大手メーカーであり、海洋、深海、淡水用途向けのカスタム水中コネクタを提供しています。IP68 等級で高い信頼性を確保。今すぐ製品をご覧ください。",
	  images: [
		{
		  url: "/opengraph-image.png",
		  width: 1200,
		  height: 630,
		  alt: "HYSF 水中コネクタ"
		}
	  ],
	  locale: "ja_JP",
	  type: "website"
	},
	twitter: {
	  card: "summary_large_image",
	  title: {
		default: "HYSF 水中コネクタ",
		template: "%s - HYSF 水中コネクタ"
	  },
	  description:
		"HYSF Technology は中国の大手メーカーであり、海洋、深海、淡水用途向けのカスタム水中コネクタを提供しています。IP68 等級で高い信頼性を確保。今すぐ製品をご覧ください。",
	  images: [
		{
		  url: "/opengraph-image.png",
		  alt: "HYSF 水中コネクタ"
		}
	  ]
	}
  };

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar />
				{children}
				<CTA />
				<Footer />
				<ScrollToTop />
				<Toaster richColors position="top-right" />
			</body>
		</html>
	);
}
