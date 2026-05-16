# 💍 Wedding Invitation — Sophia & Alexander

A modern, elegant wedding invitation website built with **React + Vite**, deployed on **Vercel**, with email via **Formspree**.

## ✨ Features

- **Hero section** — Full-screen romantic landing with animated names, floating petals, and live date
- **Countdown timer** — Live countdown to the wedding day
- **Photo gallery** — Masonry-style grid with lightbox
- **Interactive map** — Leaflet map with custom gold marker (no API key needed)
- **RSVP form** — Formspree-powered with dietary preferences & guest count
- **Scroll animations** — Sections fade in as you scroll
- **Mobile responsive** — Looks great on all screen sizes

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React + Vite | Frontend framework |
| CSS Modules | Scoped styling |
| Leaflet + react-leaflet | Interactive map (free, no API key) |
| Formspree | Email / RSVP submissions |
| Vercel | Hosting & deployment |
| Google Fonts | Cormorant Garamond + Jost |

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set your Formspree ID
Open `src/components/RSVP.jsx` and replace:
```js
const FORMSPREE_ID = 'xaqlpbjy'
```
with your own Formspree form ID from https://formspree.io

### 3. Customise the content

| File | What to change |
|------|---------------|
| `src/components/Hero.jsx` | Couple names, date, venue name |
| `src/components/Countdown.jsx` | Wedding date (`WEDDING_DATE`) |
| `src/components/Location.jsx` | Venue name, address, lat/lng coordinates |
| `src/components/Gallery.jsx` | Replace placeholder Unsplash URLs with your own photos |
| `src/components/RSVP.jsx` | RSVP deadline date |
| `index.html` | Page `<title>` |

### 4. Run locally
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

---

## 🌐 Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B — Vercel Dashboard (recommended)
1. Push this project to a GitHub repository
2. Go to https://vercel.com → New Project
3. Import your GitHub repo
4. Framework preset: **Vite**
5. Click **Deploy** — done!

The `vercel.json` file handles SPA routing automatically.

---

## 📍 Changing the Map Location

In `src/components/Location.jsx`, update the `VENUE` object:
```js
const VENUE = {
  lat: 6.9271,      // Your venue latitude
  lng: 79.8612,     // Your venue longitude
  name: 'The Grand Colombo Ballroom',
  address: 'No. 1 Galle Face, Colombo 03, Sri Lanka',
}
```

To find lat/lng: right-click any location on Google Maps → "What's here?"

---

## 📸 Adding Real Photos

Replace the `PHOTOS` array in `src/components/Gallery.jsx`:
```js
const PHOTOS = [
  { src: '/photos/engagement-1.jpg', alt: 'Engagement session' },
  { src: '/photos/engagement-2.jpg', alt: 'At the beach' },
  // ...
]
```

Place your photos in the `public/photos/` folder.

---

## 💌 Formspree Setup

1. Go to https://formspree.io and sign up
2. Create a new form
3. Copy your form ID (the part after `/f/` in the endpoint URL)
4. Paste it into `src/components/RSVP.jsx`

RSVP responses will appear in your Formspree dashboard and be emailed to you.
