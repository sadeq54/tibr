#!/usr/bin/env bash
# Post-deploy check against PRODUCTION. Usage: bash scripts/prod-check.sh [base-url]
# Confirms the deploy is serving the SEO-critical surfaces (titles, hreflang,
# tables, schema, sitemap, feeds, images, PWA) before you touch Search Console.
set -u
B="${1:-https://goldpricesarabia.com}"
UA="Mozilla/5.0 (compatible; GoldPricesArabia-deploy-check/1.0)"
code() { curl -s -m 60 -A "$UA" -o /dev/null -w '%{http_code} %{content_type}' "$B$1"; }
title() { curl -s -m 60 -A "$UA" "$B$1" | grep -o '<title>[^<]*</title>' | sed 's/<[^>]*>//g' | head -1; }

echo "== status ($B)"
for u in / /en /fr /tr /ur /hi /jordan/gold-price/21k /saudi-arabia/gold-price/21k /tr/turkey/gold-price/22k /ur/pakistan/gold-price/24k /hi/india/gold-price/22k /gold-price/22k /research /historical-gold-prices /widgets /offline /sw.js /manifest.webmanifest /sitemap.xml /llms.txt /rss.xml /robots.txt "/charts/gold/sar/1y?lang=ar" /jordan/gold-price/21k/opengraph-image; do
  printf "%-44s %s\n" "$u" "$(code "$u")"
done

echo "== titles"
for u in /jordan/gold-price/21k /saudi-arabia/gold-price/21k /en/uae/gold-price/22k /tr/turkey/gold-price/22k /hi/india/gold-price/22k; do echo "$u => $(title "$u")"; done

echo "== jordan page signals (want: hreflang-links=7 price-table=1 recent=1 currency=1 FinancialProduct=6 InStock=0)"
J=$(curl -s -m 60 -A "$UA" "$B/jordan/gold-price/21k")
echo "hreflang-links=$(echo "$J" | grep -oi '<link[^>]*hreflang=' | wc -l) price-table=$(echo "$J" | grep -c price-table-heading) recent=$(echo "$J" | grep -c recent-prices-heading) currency=$(echo "$J" | grep -c currency-table-heading) FinancialProduct=$(echo "$J" | grep -o '"@type":"FinancialProduct"' | wc -l) InStock=$(echo "$J" | grep -c InStock) $(echo "$J" | grep -o '<html lang="[^"]*" dir="[^"]*"')"

echo "== sitemap"
S=$(curl -s -m 60 -A "$UA" "$B/sitemap.xml"); echo "urls=$(echo "$S" | grep -o '<loc>' | wc -l) fr=$(echo "$S" | grep -c '<loc>'"$B"'/fr')"

echo "== home headers"
curl -sI -m 60 -A "$UA" "$B/" | grep -iE "^(cache-control|x-robots-tag|strict-transport)" | head -4
