# Audit — Japan 2026

**Verification date:** 2026-09-28

## Repository inventory

Original repository tree contained:
- `README.md`
- `index.html`
- `manifest.json`
- `deepseek_javascript_20260914_b5cdbd.js`
- `hero-tokyo.jpg`
- `hero-kyoto.jpg`
- `hero-osaka.jpg`
- `icon-192.png`
- `icon-512.png`

The original `index.html` is a single large static page (~99,732 characters / 1,378 lines) with embedded CSS and JS and 107 external links.

## Critical findings

### 1. Arrival date/time
The original page says **15:00 arrival in Narita**. The uploaded itinerary PDF says:
- 17 Nov 2026: Moscow → Guangzhou, CZ8028, 14:50 → 05:15+1.
- 18 Nov 2026: Guangzhou → Narita T1, CZ8101, 08:10 → **13:15**.
- Connection in Guangzhou: **2 h 55 min**, baggage checked through.

The site now treats 13:15 as USER DATA from the itinerary PDF and 15:00 as an estimate for reaching the hotel.

### 2. Return flight
The original page only shows `CZ648` and an early-morning departure routine. The uploaded itinerary specifies:
- **1 Dec 2026, 15:40, Haneda T3 → Beijing Daxing, arrival 18:55, CZ648**
- **2 Dec 2026, 13:15, Beijing Daxing → Moscow, arrival 17:10, CZ341**
- The itinerary recommends arriving at Haneda at least 3 hours before departure.

The plan therefore needs a morning departure-to-airport block, not a 05:30 airport departure.

### 3. Tokyo hotel address conflict
Original page:
`2-8-1 Asakusa, Taito-ku, Tokyo 111-0032`

Official ano Hotel asakusa page:
`1-14-7 Higashi-Komagata, Sumida-ku, Tokyo 130-0005`
and approximately 8 minutes on foot from Asakusa Station.

This is preserved as a CONFLICT rather than silently overwritten.

### 4. Senso-ji evening timing
The original route schedules the visit at 17:00. Official Senso-ji information gives the main hall seasonal opening hours; the evening visit should therefore be described as an exterior/precinct visit unless the exact 2026 seasonal hours support interior access.

### 5. Shinjuku Gyoen
Official 2026 calendar shows:
- 19 Nov 2026: open.
- 16 Nov, 24 Nov, 30 Nov: closed Mondays.
General official hours for 1 Oct–14 Mar: **09:00–16:30**, last entry **16:00**.

The original `14:00–16:30` slot is therefore feasible but has no arrival buffer after 16:00; it should not be extended.

### 6. Mount Takao ropeway
Official Takao cable car/lift page currently lists:
- November weekday final cable-car departure: 17:45.
- Saturday/Sunday/holiday: 18:00.
- One-way fare: **¥490**.
The original says ¥480.

### 7. Kiyomizu-dera
Official 2026 special night viewing:
**21–30 Nov 2026**, open until **21:30**, last entry 21:00.
This supports the 22 Nov evening visit.

### 8. Tenryu-ji
Official 2026 schedule includes special early garden access:
**14–30 Nov 2026 from 07:30**.
Garden admission is **¥500**.
This is relevant to the 24 Nov Arashiyama day.

### 9. Kinkaku-ji
Official source currently lists:
- 09:00–17:00
- Adult **¥500**
Original page says ¥400.

### 10. Osaka Castle
Original page says 09:00–17:00 and ¥600.
Current sources indicate the adult ticket is **¥1,200**. Opening-hour information differs between current official/municipal references (09:00–17:00 vs 09:00–18:00), so the rebuilt site keeps the item as CONFLICT until the venue's final 2026 notice is checked.

### 11. Nara / Todai-ji
Official Todai-ji:
- Nov–Mar Great Buddha Hall: **08:00–17:00**
- Adult admission **¥800**
Original page says 07:30–17:30 and ¥600.

### 12. Himeji Castle
Official Himeji Castle:
- 09:00–17:00
- Entry until 16:00
- Adult **¥2,500**
- Himeji Castle + Koko-en combined ticket **¥2,600**
Original page says ¥1,000 / ¥1,050.

### 13. Katsuo-ji
Official:
- Sunday/holiday: 08:00–17:00
- Last admission 16:30
- Adult/high-school+ **¥500**
Original page says ¥400.

### 14. PWA/service worker bug
The original repository contains `deepseek_javascript_20260914_b5cdbd.js`, but the HTML registers `./sw.js`. No `sw.js` exists in the repository tree. Therefore the service worker registration cannot work as written.

## Route integrity

### Preserved
- Tokyo 18–22 Nov
- Kyoto 22–25 Nov
- Osaka 25–30 Nov
- Tokyo 30 Nov–1 Dec
- Tokyo → Kyoto → Osaka → Tokyo sequence
- Day-by-day themes and alternatives
- Food suggestions and price ranges, marked UNVERIFIED where not source-checked

### Items requiring attention
- Exact Shinkansen trains and fares are not present in the source and are not invented.
- Exact local transit times are not available for every leg; estimates are labeled ESTIMATE.
- Several restaurant prices and individual opening hours are still UNVERIFIED.
- Flight schedule should be rechecked in the airline booking system immediately before travel; the uploaded itinerary is the controlling USER DATA for the booked flights.

## Budget
The original repository did **not** contain a reliable consolidated budget section. It contains scattered ticket, transport and food prices. The rebuilt data therefore does not fabricate a grand total. A future budget pass should calculate:
1. flights from the actual booking,
2. hotels from actual reservations,
3. intercity transport,
4. local transit,
5. attraction tickets using verified 2026 prices,
6. food using current menus,
7. contingency.

## Privacy
The source PDF contains passenger names, booking reference and e-ticket numbers. These were deliberately excluded from the public static site.
