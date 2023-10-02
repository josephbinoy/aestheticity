import './globals.css'
import Navbar from '../components/Navbar'
import MyFooter from '../components/Footer'

export const metadata = {
  title: 'Aestheticity',
  description: 'Image Gallery Website for the cultured',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <MyFooter />
      </body>
    </html>
  )
}
