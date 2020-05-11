import Config from "../config.json";

export const ApiEndpoints = {
  TOKEN: Config.api + "auth/token",
  UPLOAD_COMMAND: Config.api + "command/upload",
  GET_COMMAND_TEXT: Config.api + "command/",
  SEARCH_ADDRESS: Config.api + "address/search",
  GET_ADDRESS_PRICE: Config.api + "address/price",
  START_TRIP: Config.api + "trip/start",
  CHECK_TRIP: Config.api + "trip/check",
  RATE_DRIVER: Config.api + "trip/rate",
};
