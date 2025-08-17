import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import Dashboard from "@/components/Dashboard";

export const metadata = {
  title: 'Docura',
  description: 'Document processing app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <Navbar />
        {children}
        <Dashboard />
      </ThemeProvider>
    </html>
  )
}