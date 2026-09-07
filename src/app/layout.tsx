import type { Metadata } from 'next';
import { Cormorant_Garamond, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { LangProvider, LocalizationProvider } from '@/locales';
import { Toaster } from 'sonner';

const cormorant = Cormorant_Garamond({
  subsets: ['vietnamese'],
  weight: ['400', '600', '700'],
  variable: '--font-serif-wedding',
  display: 'swap',
});

const vietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['400', '500', '600'],
  variable: '--font-sans-wedding',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lễ Vu Quy Của Thanh & Zhe Ji',
  description:
    'Cùng chung vui và chúc phúc cho ngày trọng đại của Thanh và Zhe Ji. Khám phá câu chuyện tình yêu, thông tin tiệc cưới và nhiều hơn thế nữa.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${vietnamPro.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <LangProvider>
          <LocalizationProvider>
            {children}
            <Toaster />
          </LocalizationProvider>
        </LangProvider>
      </body>
    </html>
  );
}