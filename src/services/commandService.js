import { ApiEndpoints } from "../helpers/configHelper";
import AuthService from "./authService";

class CommandService {
  static uploadVoiceCommand(commandBlob, type) {
    if (!commandBlob) {
      throw { message: "Unexpected voice command." };
    }

    const reader = new FileReader();
    reader.readAsDataURL(commandBlob);

    return new Promise(async (resolve, reject) => {
      reader.onloadend = async () => {
        var base64data = reader.result;
        let response = await fetch(ApiEndpoints.UPLOAD_COMMAND, {
          method: "POST",
          headers: new Headers({
            Authorization: `Bearer ${AuthService.getAuthToken()}`,
          }),
          body: JSON.stringify({ type: type ?? "wav", fileB64: base64data }),
          mode: "cors",
          cache: "default",
        });

        if (response.ok) {
          let jResponse = await response.json();
          resolve(jResponse.data.id);
        } else {
          if (response.status == 401) {
            reject({ message: "Unauthorized." });
          } else {
            reject({ message: "Server error." });
          }
        }
      };

      reader.onerror = (err) => {
        reject({ message: "Unexpected error occurred." });
      };
    });
  }

  static async getCommandResult(commandId, callback, error) {
    if (!commandId) {
      throw { message: "Invalid command" };
    }

    return new Promise(async (resolve, reject) => {
      let attempts = 0;
      let jResponse = await this.runCommandRequest(commandId);

      // TODO
      while (jResponse !== "ok" && attempts < 10) {
        jResponse = await this.runCommandRequest(commandId);
        console.log(attempts);

        attempts++;
      }

      if (jResponse === "ok") {
        resolve("Isto eé um texto");
      } else {
        reject({ message: "Cannot get voice command transcription" });
      }
    });
  }

  static async runCommandRequest(commandId) {
    return new Promise((resolve, rej) => {
      resolve("ok");
    });
    // let response = await fetch(`${ApiEndpoints.GET_COMMAND_TEXT}${commandId}`, {
    //   method: "GET",
    //   headers: new Headers({
    //     Authorization: `Bearer ${AuthService.getAuthToken()}`,
    //   }),
    //   mode: "cors",
    //   cache: "default",
    // });
    // return await response.json();
  }
}

export default CommandService;
