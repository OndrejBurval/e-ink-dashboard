import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { WEATHER_URL } from "../utils/config.js";

class WeatherService {
  constructor() {
    this.url = null;
    this.init();
  }

  /**
   * Prepare weather data
   */
  init() {
    if (this.url) return;

    const url = new URL(WEATHER_URL);

    const latitude = process.env.GPS_LATITUDE;
    const longitude = process.env.GPS_LONGITUDE;
    const timezone = process.env.TIMEZONE;

    if (!latitude) {
      throw new Error(
        "Latitude is not set. Missing GPS_LATITUDE environment variable."
      );
    }

    if (!longitude) {
      throw new Error(
        "Longitude is not set. Missing GPS_LONGITUDE environment variable."
      );
    }

    if (!timezone) {
      throw new Error(
        "Timezone is not set. Missing TIMEZONE environment variable."
      );
    }

    const currentConfig = [
      "temperature_2m",
      "weather_code",
      "rain",
      "precipitation",
      "relative_humidity_2m",
      "apparent_temperature",
      "showers",
      "snowfall",
      "cloud_cover",
      "is_day",
    ];

    url.searchParams.set("latitude", latitude);
    url.searchParams.set("longitude", longitude);
    url.searchParams.set("timezone", timezone);
    url.searchParams.set("current", currentConfig.join(","));

    this.url = url.toString();
  }

  getWeatherUrl() {
    return this.url;
  }

  /**
   * Fetch weather data
   */
  async getWeatherData() {
    try {
      const res = await fetch(this.url);
      if (!res.ok) {
        throw new Error("Weather service error: " + res.statusText);
      }

      const data = await res.json();

      return data;
    } catch (error) {
      console.error("Weather service error:", error.message);
      throw error;
    }
  }
}

export default new WeatherService();
