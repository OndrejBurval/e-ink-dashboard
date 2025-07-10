# Google Calendar & Weather Dashboard

A modern Node.js web application that displays your Google Calendar events and local weather forecast in a beautiful dashboard. Includes screenshot functionality for display capture.

---

## Features
- 📅 **Google Calendar Integration**: View upcoming events from your Google Calendar.
- ☀️ **Weather Forecast**: See current weather data for your location (powered by Open-Meteo).
- 🖼️ **Screenshot Functionality**: Capture the dashboard as an image (uses Puppeteer and Chromium).
- ✨ **Modern UI**: Clean, responsive interface built with EJS and CSS.

---

## Requirements
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [chromium-browser](https://www.chromium.org/getting-involved/download-chromium/) (required for Puppeteer screenshots) (sudo apt install chromium-browser)

---

## Installation
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd e-ink-dashboard
   ```
2. **Install dependencies and configure environment:**
   ```bash
   npm run install
   ```
   The setup script will prompt you for your Google Calendar API credentials and weather location (latitude, longitude, timezone). It will create a `.env.local` file.

---

## Usage
- **Development mode (with auto-reload):**
  ```bash
  npm run dev
  ```
- **Production mode:**
  ```bash
  npm start
  ```
- Open your browser and go to [http://localhost:8000](http://localhost:8000)

---

## Configuration
The setup script will ask for:
- `GOOGLE_TYPE` (usually `service_account`)
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_CALENDAR_ID`
- `GPS_LATITUDE` (for weather)
- `GPS_LONGITUDE` (for weather)
- `TIMEZONE` (e.g., `Europe/Prague`)

You can also manually edit `.env.local` if needed.

---

## Screenshot Example
![Dashboard Screenshot](public/images/output.webp)

You can take or update the screenshot from the dashboard UI.

---

## Contributing
Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

---

## License
[PLACEHOLDER: Add your license here]

---

## Contact
For questions or support, please open an issue on this repository.
