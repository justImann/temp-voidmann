import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { FloatingDock } from '@/components/ui/floating-dock';
import { portfolioLinks } from '@/lib/dock-links';
import { StickyBanner } from '@/components/ui/sticky-banner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nuriman',
  description: 'Your friendly neighborhood programmer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StickyBanner className="bg-gradient-to-b from-orange-500 to-orange-600">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            THIS SITE IS STILL UNDER DEVELOPMENT BUT YOU CAN FOLLOW MY IG ANW{' '}
            {/* I'm just open for part time work! Plss contact me on my{' '} */}
            {/* <a href="#" className="transition duration-200 hover:underline">
              LinkedIn
            </a> */}
            <a
              target="_blank"
              href="https://instagram.com/iimannr_"
              className="transition duration-200 hover:underline"
            >
              @iimannr_
            </a>
          </p>
        </StickyBanner>

        <main className="max-w-2xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4">
          <FloatingDock
            mobileClassName="translate-y-20" // only for demo, remove for production
            items={portfolioLinks}
          />
        </div>
      </body>
    </html>
  );
}
