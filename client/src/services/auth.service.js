import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = (requestBody) => {
    return this.api.post("/user/login", requestBody);
    // same as
    // return axios.post("http://localhost:5005/user/login");
  };

  signup = (requestBody) => {
    return this.api.post("/user/signup", requestBody);
    // same as
    // return axios.post("http://localhost:5005/user/singup");
  };

  verify = () => {
    return this.api.get("/user/verify");
    // same as
    // return axios.post("http://localhost:5005/user/verify");
  };

  refresh = () => {
    return this.api.get("/user/refresh");
  };
}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;
