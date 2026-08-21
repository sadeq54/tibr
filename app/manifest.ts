import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gold Prices Arabia — Live Gold Prices",
    short_name: "Gold Prices Arabia",
    description:
      "Live gold prices for the Arab world and beyond. 46 countries, 40+ currencies, every karat — streamed in real time.",
    // Stable identity across renames/start_url changes — lets browsers treat
    // future manifest edits as an update of the same installed app.
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "portrait",
    background_color: "#0b0a08",
    theme_color: "#0b0a08",
    lang: "ar",
    dir: "rtl",
    categories: ["finance", "business", "news"],
    icons: [
      { src: "/appIcone.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/appIcone.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/appIcone.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Live Gold Price",
        short_name: "Live",
        url: "/live-gold-price",
        icons: [{ src: "/appIcone.png", sizes: "96x96" }],
      },
      {
        name: "Gold Calculator",
        short_name: "Calculator",
        url: "/gold-calculator",
        icons: [{ src: "/appIcone.png", sizes: "96x96" }],
      },
      {
        name: "Saudi Arabia",
        short_name: "Saudi",
        url: "/saudi-arabia/gold-price/21k",
        icons: [{ src: "/appIcone.png", sizes: "96x96" }],
      },
      {
        name: "UAE",
        short_name: "UAE",
        url: "/uae/gold-price/21k",
        icons: [{ src: "/appIcone.png", sizes: "96x96" }],
      },
      {
        name: "Jordan 21K",
        short_name: "Jordan",
        url: "/jordan/gold-price/21k",
        icons: [{ src: "/appIcone.png", sizes: "96x96" }],
      },
      {
        name: "Egypt 21K",
        short_name: "Egypt",
        url: "/egypt/gold-price/21k",
        icons: [{ src: "/appIcone.png", sizes: "96x96" }],
      },
    ],
  };
}
