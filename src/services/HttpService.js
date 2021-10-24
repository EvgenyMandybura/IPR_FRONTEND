import axios from "axios";

import StorageService from "./StorageService";

function logoutAndRedirect() {
  let location = window.location;
  location.href = location.origin + "/logout";
  StorageService.user.clear();
  StorageService.session.clear();
}

class Http {
  constructor() {
    this.instance = Http.createInstance({
      baseURL: `/api/`,
    });
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
