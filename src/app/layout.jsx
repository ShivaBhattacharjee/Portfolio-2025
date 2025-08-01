import { Libre_Baskerville, Zen_Dots, Goldman } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NavigationBar from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import FloatingSkull from "@/components/Floating";
import OnekoCat from "@/components/OnekoCat";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: {
    template: "%s | Shiva Bhattacharjee",
    default: "Shiva Bhattacharjee",
  },
  description:
    "Hello there I am Shiva a full stack developer and I love to build products that make people's life easier.",
  icons: {
    icon: "https://notion-avatar.app/api/svg/eyJmYWNlIjo0LCJub3NlIjozLCJtb3V0aCI6MSwiZXllcyI6MTAsImV5ZWJyb3dzIjoxLCJnbGFzc2VzIjoxMCwiaGFpciI6MzIsImFjY2Vzc29yaWVzIjowLCJkZXRhaWxzIjowLCJiZWFyZCI6MCwiZmxpcCI6MSwiY29sb3IiOiJ0cmFuc3BhcmVudCIsInNoYXBlIjoibm9uZSJ9",
  },
};
const goldmanFont = Goldman({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto] overflow-x-hidden">
            <NavigationBar />
            <main className={goldmanFont.className}>
              <OnekoCat/>
              {children}
              <FloatingSkull />
            </main>
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
