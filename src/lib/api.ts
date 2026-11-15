import { Platform } from "react-native";
import { CampusEvent } from "../data/events";

const EVENTS_URL =
  __DEV__ && Platform.OS === "web"
    ? "/api/events.json"
    : "https://yeldar-hub.github.io/iwamad-mobile/api/events.json";

export async function fetchEvents(): Promise<CampusEvent[]> {
  const response = await fetch(EVENTS_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
