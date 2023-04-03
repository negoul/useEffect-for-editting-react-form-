import http from "service/http.service";
import * as urls from "config/url.config";

const generalAPIs = {
  fetchConfigs() {
    return new Promise((resolve, reject) => {
      http.get(urls.GENERAL_GET_CONFIGS)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    })
  }
};

export default generalAPIs;
