export const BASE_URL =
  process.env.REACT_APP_PRODUCTION_ENV === "DEV"
    ? "http://localhost:8080/"
    : "https://dropai.app/";
