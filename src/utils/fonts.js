import { Inter } from "next/font/google";
import localFont from "next/font/local";

// Google Font Import
const inter_init = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Cera Round Pro Font Import
const cera_round_pro_init = localFont({
  src: [
    {
      path: "./fonts/CeraRoundProThin.otf",
      weight: "100",
      style: "thin",
    },
    {
      path: "./fonts/CeraRoundProLight.otf",
      weight: "300",
      style: "light",
    },
    {
      path: "./fonts/CeraRoundProRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/CeraRoundProMedium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./fonts/CeraRoundProBold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/CeraRoundProBlack.otf",
      weight: "900",
      style: "black",
    }
  ],
  variable: "--font-cera",
});

// Doto Font Import (Updated)
const doto_font_init = localFont({
  src: [
    {
      path: "./fonts/static/Doto_Rounded-Thin.ttf",
      weight: "100",
      style: "thin",
    },
    {
      path: "./fonts/static/Doto_Rounded-ExtraLight.ttf",
      weight: "200",
      style: "extra-light",
    },
    {
      path: "./fonts/static/Doto_Rounded-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "./fonts/static/Doto_Rounded-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/static/Doto_Rounded-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./fonts/static/Doto_Rounded-SemiBold.ttf",
      weight: "600",
      style: "semi-bold",
    },
    {
      path: "./fonts/static/Doto_Rounded-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/static/Doto_Rounded-ExtraBold.ttf",
      weight: "800",
      style: "extra-bold",
    },
    {
      path: "./fonts/static/Doto_Rounded-Black.ttf",
      weight: "900",
      style: "black",
    }
  ],
  variable: "--font-doto",
});

export const dotoFont = doto_font_init.variable;
export const inter = inter_init.variable;
export const ceraRoundPro = cera_round_pro_init.variable;
