import './globals.css'

export const metadata = {
  title: 'Aestheticity',
  description: 'Image Gallery Website for the cultured',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
