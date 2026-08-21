#!/usr/bin/env bash
# Local smoke test for the SEO-critical surfaces. Usage: bash scripts/smoke-seo.sh [port]
# Builds, starts `next start`, curls key routes, prints pass/fail markers, stops the server.
set -u
cd "$(dirname "$0")/.." || exit 1
PORT=${1:-3799}
npm run build 2>&1 | grep -E "(Failed|Type error|✓ Compiled|✓ Generating)" | head -6
echo "build-exit=${PIPESTATUS[0]}"
npx next start -p "$PORT" >/tmp/gpa-smoke.log 2>&1 &
sleep 9
code() { curl -s -m 120 -o /dev/null -w '%{http_code}' "http://localhost:$PORT$1"; }
J=$(curl -s "http://localhost:$PORT/jordan/gold-price/21k")
echo "jordan title: $(echo "$J" | grep -o '<title>[^<]*</title>' | sed 's/<[^>]*>//g')"
echo "jordan h1:    $(echo "$J" | grep -o '<h1[^>]*>[^<]*</h1>' | head -1 | sed 's/<[^>]*>//g')"
echo "price-table=$(echo "$J" | grep -c price-table-heading) recent=$(echo "$J" | grep -c recent-prices-heading) currency=$(echo "$J" | grep -c currency-table-heading) chart=$(echo "$J" | grep -c '/charts/gold/jod/1y') FinancialProduct=$(echo "$J" | grep -o '"@type":"FinancialProduct"' | wc -l) InStock=$(echo "$J" | grep -c InStock) stale-src=$(echo "$J" | grep -c 'goldapi.io')"
for u in /en/uae/gold-price/22k /historical-gold-prices /historical-gold-prices/2010 /research /rss.xml /llms.txt /sitemap.xml "/charts/gold/sar/1y?lang=ar" /jordan/gold-price/21k/opengraph-image /gold-price/21k/opengraph-image /embed/ticker; do
  printf "%-45s %s\n" "$u" "$(code "$u")"
done
for u in /fr /tr /ur /hi /tr/turkey/gold-price/22k /ur/pakistan/gold-price/24k /hi/india/gold-price/22k /fr/jordan/gold-price/21k /widgets /offline /sw.js "/charts/gold/inr/1y?lang=hi" /ur/uae/gold-price/22k/opengraph-image; do
  printf "%-45s %s
" "$u" "$(code "$u")"
done
echo "tr title: $(curl -s "http://localhost:$PORT/tr/turkey/gold-price/22k" | grep -o '<title>[^<]*</title>' | sed 's/<[^>]*>//g')"
echo "hreflang count (want 7): $(curl -s "http://localhost:$PORT/jordan/gold-price/21k" | grep -oi 'hreflang="[^"]*"' | wc -l)"
echo "embed footer leak: $(curl -s "http://localhost:$PORT/embed/ticker" | grep -c '<footer')  (want 0)"
echo "--- server errors:"; grep -iE "error|⨯|MISSING" /tmp/gpa-smoke.log | head -5
powershell -Command "\$c=Get-NetTCPConnection -LocalPort $PORT -State Listen -ErrorAction SilentlyContinue; if(\$c){Stop-Process -Id (\$c.OwningProcess|Select-Object -First 1) -Force}; 'server stopped'"
