import APIConfig from "../../config/APIConfig.ts";
import axios, { AxiosInstance } from "axios";

export default class AuthService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: APIConfig.baseURL(),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async login(username: string, password: string) {
    return await this.client.post("/signin", {
      username,
      password,
    });
  }

  // TODO: Implement Backend Logic to Make This Endpoint Functional
  async logout() {
    return this.client.post("/logout");
  }

  async register(
    username: string,
    password: string,
    name: string,
  ) {
    return this.client.post("/signup", {
      username,
      password,
      name
    });
  }
}