import Http from "./HttpService";

class ProductsService extends Http {
  BASE_URL = "/products";

  getProduct(id) {
    return this.get(`${this.BASE_URL}/${id}`);
  }

  getAllList(urlRequest) {
    return this.get(`${this.BASE_URL}?${urlRequest}`);
  }
}

export default new ProductsService();
