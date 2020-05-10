import Config from "../config.json";

export const ApiEndpoints = {
  TOKEN: Config.api + "auth/token",
  UPLOAD_COMMAND: Config.api + "command/upload",
  GET_COMMAND_TEXT: Config.api + "command/",
};
