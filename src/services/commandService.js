import { ApiEndpoints } from "../helpers/configHelper";
import AuthService from "./authService";

class CommandService {
  static uploadVoiceCommand(commandBlob, type) {
    if (!commandBlob || commandBlob.size == 0) {
      throw { message: "Unexpected voice command." };
    }

    const reader = new FileReader();
    reader.readAsDataURL(commandBlob);

    return new Promise(async (resolve, reject) => {
      // resolve("8b78e84f-1894-452a-a42b-1333f49867ca");
      // return;

      reader.onloadend = async () => {
        var base64data = reader.result.split(",")[1];
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
            reject({ message: "Server error. The command cannot be parsed." });
          }
        }
      };

      reader.onerror = (err) => {
        reject({ message: "Unexpected error occurred." });
      };
    });
  }

  static async getCommandResult(commandId) {
    if (!commandId) {
      throw { message: "Invalid command" };
    }

    return new Promise(async (resolve, reject) => {
      // resolve("Rua do Brasil");
      // return;

      let attempts = 0;
      let response = await this.runCommandRequest(commandId);

      console.log("Polling Command: ", commandId);
      while (!response.ok && attempts < 15) {
        await new Promise((r) => setTimeout(r, 5000));
        response = await this.runCommandRequest(commandId);
        attempts++;
      }

      if (response.ok) {
        var jResponse = await response.json();
        resolve(jResponse.data.transcript);
      } else {
        if (jResponse.status == 401) {
          reject({ message: "Unauthorized." });
        } else {
          reject({ message: "Voice command cannot be transcripted." });
        }
      }
    });
  }

  static async runCommandRequest(commandId) {
    let response = await fetch(`${ApiEndpoints.GET_COMMAND_TEXT}${commandId}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${AuthService.getAuthToken()}`,
      }),
      mode: "cors",
      cache: "default",
    });
    return response;
  }
}

export default CommandService;
