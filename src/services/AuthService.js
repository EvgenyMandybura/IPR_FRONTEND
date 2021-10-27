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
        this.storeUser(user);
        return user;
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
    return this.post("/auth/signup", model)
      .then((user) => {
      this.storeUser(user);
      console.log("Success register", user);
      return user;
    })
      .catch((err) => {
        console.log("err", err);
      });
  }

  storeUser(userData, ) {
    const { user, token } = userData.data;
    const storage = sessionStorage;
    StorageService.user.storage = storage;
    StorageService.session.storage = storage;

    StorageService.user.value = user;
    StorageService.session.value = token;
  }

  clearUser() {
    StorageService.user.clear();
  }
}

export default new AuthService();
