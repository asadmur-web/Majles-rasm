import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Majlis Canvas - لوحة المجلس',
  description: 'لعبة الرسم والتجسس التفاعلية',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-slate-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
