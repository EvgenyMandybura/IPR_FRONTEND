import Http from "./HttpService";
import StorageService from "./StorageService";

const USER_PLACEHOLDER = {
  firstName: "FirstName",
  lastName: "LastName",
};

class AuthService extends Http {
  getUser() {
    const user = StorageService.user.value;
    return user ? user : USER_PLACEHOLDER;
  }

  login(model) {
    this.clearUser();
    return this.post("/auth/login", model)
      .then((user) => {
        console.log("Success login", user);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  signOut() {
    return this.delete("/sessions").then(() => {
      this.clearUser();
    });
  }

  register(model) {
    this.clearUser();
    return this.post("/auth/signup", model);
  }

  storeUser(userData, remember = false) {
    const { user } = userData.data;
    const storage = remember ? localStorage : sessionStorage;
    StorageService.user.storage = storage;
    StorageService.user.value = user;
  }

  clearUser() {
    StorageService.user.clear();
  }
}

export default new AuthService();
