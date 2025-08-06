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
    default: "Shiva Bhattacharjee - Full Stack Developer",
  },
  description:
    "Hello there I am Shiva a full stack developer and I love to build products that make people's life easier.",
  keywords: [
    "Shiva Bhattacharjee",
    "Full Stack Developer",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Web Development",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Shiva Bhattacharjee" }],
  creator: "Shiva Bhattacharjee",
  publisher: "Shiva Bhattacharjee",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://notion-avatar.app/api/svg/eyJmYWNlIjo0LCJub3NlIjozLCJtb3V0aCI6MSwiZXllcyI6MTAsImV5ZWJyb3dzIjoxLCJnbGFzc2VzIjoxMCwiaGFpciI6MzIsImFjY2Vzc29yaWVzIjowLCJkZXRhaWxzIjowLCJiZWFyZCI6MCwiZmxpcCI6MSwiY29sb3IiOiJ0cmFuc3BhcmVudCIsInNoYXBlIjoibm9uZSJ9",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theshiva.xyz",
    title: "Shiva Bhattacharjee - Full Stack Developer",
    description:
      "Hello there I am Shiva a full stack developer and I love to build products that make people's life easier.",
    siteName: "Shiva Bhattacharjee Portfolio",
    images: [
      {
        url: "https://theshiva.xyz/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Shiva Bhattacharjee - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiva Bhattacharjee - Full Stack Developer",
    description:
      "Hello there I am Shiva a full stack developer and I love to build products that make people's life easier.",
    images: ["https://theshiva.xyz/opengraph.png"],
    creator: "@sh17va", 
  },
  alternates: {
    canonical: "https://theshiva.xyz",
    types: {
      "application/rss+xml": [{ url: "https://theshiva.xyz/rss.xml", title: "RSS Feed" }],
    },
  },
};
const goldmanFont = Goldman({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shiva Bhattacharjee",
    jobTitle: "Full Stack Developer",
    description: "Full stack developer who loves to build products that make people's life easier",
    url: "https://theshiva.xyz",
    image: "https://theshiva.xyz/opengraph.png",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
