import './globals.css';
import { LogoIcon } from './components/icons/LogoIcon';
import Sidebar from './Sidebar';
import IconLink from './features/board/components/BoardItem';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <body className="h-full">
        <div className="grid gap-x-[2px] grid-rows-[max-content_1fr] grid-cols-[300px_1fr] max-h-screen min-h-full">
          <div className="bg-white row-start-1 row-end-2 col-start-1 col-end-2 header">
            <Link href="/">
              {<LogoIcon className="p-8" textColor="fill-black" />}
            </Link>
          </div>
          <div className="row-start-2 row-end-3 col-start-1 col-end-2 h-full">
            <Sidebar />
          </div>

          <div className="row-start-1 row-end-3 col-start-2 col-end-3 ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
