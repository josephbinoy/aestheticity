import Navbar from "@/components/Navbar"
export default function Template({ children }) {
    return <div>
    <Navbar />
    {children}
    </div>
  }