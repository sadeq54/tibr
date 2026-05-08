export type Country = {
  slug: string;
  cc: string;
  name_en: string;
  name_ar: string;
  currency: string;
  flag: string;
};

export const COUNTRIES: Country[] = [
  { slug: "usa", cc: "US", name_en: "USA", name_ar: "الولايات المتحدة", currency: "USD", flag: "🇺🇸" },
  { slug: "europe", cc: "EU", name_en: "Europe", name_ar: "أوروبا", currency: "EUR", flag: "🇪🇺" },
  { slug: "argentina", cc: "AR", name_en: "Argentina", name_ar: "الأرجنتين", currency: "ARS", flag: "🇦🇷" },
  { slug: "australia", cc: "AU", name_en: "Australia", name_ar: "أستراليا", currency: "AUD", flag: "🇦🇺" },
  { slug: "bahrain", cc: "BH", name_en: "Bahrain", name_ar: "البحرين", currency: "BHD", flag: "🇧🇭" },
  { slug: "brazil", cc: "BR", name_en: "Brazil", name_ar: "البرازيل", currency: "BRL", flag: "🇧🇷" },
  { slug: "canada", cc: "CA", name_en: "Canada", name_ar: "كندا", currency: "CAD", flag: "🇨🇦" },
  { slug: "china", cc: "CN", name_en: "China", name_ar: "الصين", currency: "CNY", flag: "🇨🇳" },
  { slug: "colombia", cc: "CO", name_en: "Colombia", name_ar: "كولومبيا", currency: "COP", flag: "🇨🇴" },
  { slug: "croatia", cc: "HR", name_en: "Croatia", name_ar: "كرواتيا", currency: "EUR", flag: "🇭🇷" },
  { slug: "denmark", cc: "DK", name_en: "Denmark", name_ar: "الدنمارك", currency: "DKK", flag: "🇩🇰" },
  { slug: "egypt", cc: "EG", name_en: "Egypt", name_ar: "مصر", currency: "EGP", flag: "🇪🇬" },
  { slug: "hong-kong", cc: "HK", name_en: "Hong Kong", name_ar: "هونغ كونغ", currency: "HKD", flag: "🇭🇰" },
  { slug: "hungary", cc: "HU", name_en: "Hungary", name_ar: "المجر", currency: "HUF", flag: "🇭🇺" },
  { slug: "india", cc: "IN", name_en: "India", name_ar: "الهند", currency: "INR", flag: "🇮🇳" },
  { slug: "indonesia", cc: "ID", name_en: "Indonesia", name_ar: "إندونيسيا", currency: "IDR", flag: "🇮🇩" },
  { slug: "japan", cc: "JP", name_en: "Japan", name_ar: "اليابان", currency: "JPY", flag: "🇯🇵" },
  { slug: "jordan", cc: "JO", name_en: "Jordan", name_ar: "الأردن", currency: "JOD", flag: "🇯🇴" },
  { slug: "kuwait", cc: "KW", name_en: "Kuwait", name_ar: "الكويت", currency: "KWD", flag: "🇰🇼" },
  { slug: "lebanon", cc: "LB", name_en: "Lebanon", name_ar: "لبنان", currency: "LBP", flag: "🇱🇧" },
  { slug: "libya", cc: "LY", name_en: "Libya", name_ar: "ليبيا", currency: "LYD", flag: "🇱🇾" },
  { slug: "macau", cc: "MO", name_en: "Macau", name_ar: "ماكاو", currency: "MOP", flag: "🇲🇴" },
  { slug: "malaysia", cc: "MY", name_en: "Malaysia", name_ar: "ماليزيا", currency: "MYR", flag: "🇲🇾" },
  { slug: "mexico", cc: "MX", name_en: "Mexico", name_ar: "المكسيك", currency: "MXN", flag: "🇲🇽" },
  { slug: "myanmar", cc: "MM", name_en: "Myanmar", name_ar: "ميانمار", currency: "MMK", flag: "🇲🇲" },
  { slug: "new-zealand", cc: "NZ", name_en: "New Zealand", name_ar: "نيوزيلندا", currency: "NZD", flag: "🇳🇿" },
  { slug: "nigeria", cc: "NG", name_en: "Nigeria", name_ar: "نيجيريا", currency: "NGN", flag: "🇳🇬" },
  { slug: "north-macedonia", cc: "MK", name_en: "North Macedonia", name_ar: "مقدونيا الشمالية", currency: "MKD", flag: "🇲🇰" },
  { slug: "norway", cc: "NO", name_en: "Norway", name_ar: "النرويج", currency: "NOK", flag: "🇳🇴" },
  { slug: "pakistan", cc: "PK", name_en: "Pakistan", name_ar: "باكستان", currency: "PKR", flag: "🇵🇰" },
  { slug: "philippines", cc: "PH", name_en: "Philippines", name_ar: "الفلبين", currency: "PHP", flag: "🇵🇭" },
  { slug: "qatar", cc: "QA", name_en: "Qatar", name_ar: "قطر", currency: "QAR", flag: "🇶🇦" },
  { slug: "russia", cc: "RU", name_en: "Russia", name_ar: "روسيا", currency: "RUB", flag: "🇷🇺" },
  { slug: "saudi-arabia", cc: "SA", name_en: "Saudi Arabia", name_ar: "السعودية", currency: "SAR", flag: "🇸🇦" },
  { slug: "serbia", cc: "RS", name_en: "Serbia", name_ar: "صربيا", currency: "RSD", flag: "🇷🇸" },
  { slug: "singapore", cc: "SG", name_en: "Singapore", name_ar: "سنغافورة", currency: "SGD", flag: "🇸🇬" },
  { slug: "south-africa", cc: "ZA", name_en: "South Africa", name_ar: "جنوب أفريقيا", currency: "ZAR", flag: "🇿🇦" },
  { slug: "south-korea", cc: "KR", name_en: "South Korea", name_ar: "كوريا الجنوبية", currency: "KRW", flag: "🇰🇷" },
  { slug: "sweden", cc: "SE", name_en: "Sweden", name_ar: "السويد", currency: "SEK", flag: "🇸🇪" },
  { slug: "switzerland", cc: "CH", name_en: "Switzerland", name_ar: "سويسرا", currency: "CHF", flag: "🇨🇭" },
  { slug: "taiwan", cc: "TW", name_en: "Taiwan", name_ar: "تايوان", currency: "TWD", flag: "🇹🇼" },
  { slug: "thailand", cc: "TH", name_en: "Thailand", name_ar: "تايلاند", currency: "THB", flag: "🇹🇭" },
  { slug: "turkey", cc: "TR", name_en: "Turkey", name_ar: "تركيا", currency: "TRY", flag: "🇹🇷" },
  { slug: "uk", cc: "GB", name_en: "United Kingdom", name_ar: "المملكة المتحدة", currency: "GBP", flag: "🇬🇧" },
  { slug: "uae", cc: "AE", name_en: "United Arab Emirates", name_ar: "الإمارات", currency: "AED", flag: "🇦🇪" },
  { slug: "vietnam", cc: "VN", name_en: "Vietnam", name_ar: "فيتنام", currency: "VND", flag: "🇻🇳" },
];

export const COUNTRY_BY_SLUG: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.slug, c])
);

export const COUNTRY_BY_CC: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.cc, c])
);

export const ALL_CURRENCIES: string[] = Array.from(
  new Set(COUNTRIES.map((c) => c.currency)),
);

export function currencyForCC(cc: string | null | undefined): string | null {
  if (!cc) return null;
  return COUNTRY_BY_CC[cc.toUpperCase()]?.currency ?? null;
}

export function countryName(c: Country, locale: string): string {
  return locale === "ar" ? c.name_ar : c.name_en;
}
