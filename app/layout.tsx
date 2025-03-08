import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SkillConnect - Talent Assessment Platform',
  description: 'A comprehensive platform for assessing and managing talent acquisition',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#714b67',
  applicationName: 'SkillConnect',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  )
} 