import { Quicksand } from "next/font/google";
import "./globals.css";
import '../styles/scss/common.scss';
import '../styles/scss/font.scss';
import { ReduxProvider } from "@/redux/provider";
import Header from "@/wsui/Header/Header";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const quicksand = Quicksand({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children, meta }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={quicksand.className}
      >
        <ReduxProvider>
          <Header />
          <div className='h-screen mt-6'>
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
