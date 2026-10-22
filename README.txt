# Restaurant Review Generator - Static MVP

## Files

- index.html - Main page
- style.css - Mobile-friendly styling
- script.js - Review logic and restaurant configuration

## Setup

1. Open `script.js`.
2. Find the `RESTAURANT` configuration near the top.
3. Change:
   - `name`
   - `logo`
   - `googleReviewUrl`
   - review text if desired.
4. Open `index.html` in a browser to test.

## Google review link

Replace:

https://www.google.com/maps

with the restaurant's actual Google Maps review URL.

The website copies the customer's selected review and opens Google Maps. The customer then pastes/edits the review and submits it themselves.

## Deploy for free

You can upload these three files to a static host such as Cloudflare Pages or GitHub Pages.

No server, database, API key, or monthly backend cost is required.

## QR code

Once the site has a public URL, create a QR code pointing to that URL and print it on restaurant tables, bills, receipts, etc.

## Important

The customer chooses their own star rating. The experience buttons are used to tailor the review suggestions; they do not force a particular Google rating.
