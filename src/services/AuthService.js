import Http from "./HttpService";
import StorageService from "./StorageService";
import axios from "axios";

const USER_PLACEHOLDER = {
  firstName: "FirstName",
  lastName: "LastName",
};

const REMEMBER_ME_DEFAULT = true;

const AUTH_URL = "auth";

class AuthService extends Http {
  getUser() {
    const user = StorageService.user.value;
    return user ? user : USER_PLACEHOLDER;
  }

  login(model, remember = REMEMBER_ME_DEFAULT) {
    this.clearUser();
    return this.post("/sessions", model).then((authUser) => {
      this.storeUser(authUser, remember);
      return authUser;
    });
  }

  signOut() {
    return this.delete("/sessions").then(() => {
      this.clearUser();
    });
  }

  register(model) {
    this.clearUser();
    return this.post(`${AUTH_URL}/signup`, model);
  }

  storeUser(userData, remember = false) {
    const { session, user } = userData.data;
    const storage = remember ? localStorage : sessionStorage;
    StorageService.user.storage = storage;
    StorageService.session.storage = storage;

    StorageService.user.value = user;
    StorageService.session.value = session;
  }

  clearUser() {
    StorageService.user.clear();
    StorageService.session.clear();
  }
}

export default new AuthService();
