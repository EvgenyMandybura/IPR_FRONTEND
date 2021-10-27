import Http from "./HttpService";
import StorageService from "./StorageService";

class ProductsService extends Http {
  BASE_URL = "/products";

  getProduct(id) {
    return this.get(`${this.BASE_URL}/${id}`, {
      Authorization: `Bearer ${StorageService.session.value}`,
    });
  }

  getAllList(urlRequest) {
    return this.get(`${this.BASE_URL}?${urlRequest}`);
  }
}

export default new ProductsService();
