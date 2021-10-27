import axios from "axios";

import StorageService from "./StorageService";
import STATUS_CODE from "../constants/statusCodes";
import { AUTH, LANGUAGE, SKIP_AUTH } from "../constants/headers";



const interceptorsResponse = [
  (response) => response.data,
  (error) => {
    let dataObject = {},
        statusCode;
    const { response } = error;
    const { UNAUTHORIZED } = STATUS_CODE;
    const { refreshToken } = StorageService.session.value;
    if (response) {
      dataObject = response.data;
    }

    statusCode =
        dataObject.code || dataObject.statusCode || (response && response.status);
    const isUnauth =
        statusCode === UNAUTHORIZED || statusCode === "Unauthorized";

    const { error: errorObj } = dataObject;

    if (
        errorObj &&
        errorObj.length > 0 &&
        errorObj[0].message !== "Token invalid" &&
        errorObj[0].key !== "custom"
    ) {
    }
    return Promise.reject(errorObj || new Error("Something went wrong"));
  },
];

function logoutAndRedirect() {
  let location = window.location;
  location.href = location.origin + "/logout";
  StorageService.user.clear();
  StorageService.session.clear();
}

const interceptorsRequest = [
  (request) => {
    const pattern = /^((http|https):\/\/s3)/;
    const skipAuthorization = request.headers[SKIP_AUTH] || false;
    if (!(pattern.test(request.url) || skipAuthorization)) {
      const { accessToken } = StorageService.session.value;
      request.headers = {
        [AUTH]: accessToken ? `Bearer ${accessToken}` : "",
        [LANGUAGE]: "en",
      };
    }

    delete request.headers[SKIP_AUTH];
    return request;
  },
  (err) => Promise.reject(err),
];

class Http {
  constructor() {
    this.instance = Http.createInstance({
      baseURL: `/api/`,
    });

    this.instance.interceptors.request.use(...interceptorsRequest);
   // this.instance.interceptors.response.use(...interceptorsResponse);
  }

  static createInstance() {
    return axios.create.apply(axios, arguments);
  }

  get() {
    return this.instance.get.apply(this.instance, arguments);
  }

  patch() {
    return this.instance.patch.apply(this.instance, arguments);
  }

  put() {
    return this.instance.put.apply(this.instance, arguments);
  }

  post() {
    return this.instance.post.apply(this.instance, arguments);
  }

  delete() {
    return this.instance.delete.apply(this.instance, arguments);
  }
}


Http.api = {
  common: process.env.REACT_APP_BASE_URL,
};

export default Http;