import Http from "./HttpService";
import StorageService from "./StorageService";

class UsersService extends Http {
  BASE_URL = "/users";

  getProfile(id) {
    return this.get(`${this.BASE_URL}/${id}`).then(({ data }) => {
      StorageService.user.value = data;
      return { data };
    });
  }
}

export default new UsersService();
