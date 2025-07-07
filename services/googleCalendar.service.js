import { google } from "googleapis";
import dotenv from "dotenv";
import formatDate from "../utils/formatDate.js";
import { CALENDAR_MAX_EVENTS } from "../utils/config.js";

dotenv.config({ path: ".env.local" });

class GoogleCalendarService {
  constructor() {
    this.auth = null;
    this.calendar = null;
    this.initAuth();
  }

  /**
   * Initialize Google authentication
   */
  initAuth() {
    if (this.auth) return;

    try {
      const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

      const credentials = {
        type: process.env.GOOGLE_TYPE,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      };

      if (!credentials.private_key) {
        throw new Error("GOOGLE_PRIVATE_KEY is not set");
      }

      if (!credentials.client_email) {
        throw new Error("GOOGLE_CLIENT_EMAIL is not set");
      }

      if (!credentials.type) {
        throw new Error("GOOGLE_TYPE is not set");
      }

      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
      });
      this.calendar = google.calendar({ version: "v3", auth: this.auth });
    } catch (error) {
      console.error("Google Calendar Service initialization error:", error);
      throw error;
    }
  }

  /**
   * Get calendar events
   */
  async getCalendarEvents() {
    try {
      const response = await this.calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        timeMin: new Date().toISOString(),
        maxResults: CALENDAR_MAX_EVENTS,
        singleEvents: true,
        orderBy: "startTime",
      });

      const events = response.data.items;

      if (!events || events.length === 0) {
        return {
          success: true,
          message: "No upcoming events found.",
          events: [],
        };
      }

      // Format events for response
      const formattedEvents = events.map((event) => {
        const start = formatDate(event.start.dateTime || event.start.date);
        const end = formatDate(event.end.dateTime || event.end.date);

        return {
          id: event.id,
          summary: event.summary,
          start,
          end,
          description: event.description || "",
          location: event.location || "",
        }
      });

      return {
        success: true,
        events: formattedEvents,
      };
    } catch (error) {
      console.error("Error authenticating with Google Calendar:", error);
      return {
        success: false,
        events: [],
        error: "Failed to authenticate with Google Calendar",
        details: error.message,
      };
    }
  }
}

export default new GoogleCalendarService();
