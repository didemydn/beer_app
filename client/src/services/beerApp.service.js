import axios from "axios";

class BeerAppService{
    constructor() {
        this.api = axios.create ({
            baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
        });

        // Automatically set JWT token in the headers for every request
        this.api.interceptors.request.use((config) => {
            // Retrieve the JWT token from the local storage
            const storedToken = localStorage.getItem("authToken");
      
            if (storedToken) {
              config.headers = { Authorization: `Bearer ${storedToken}` };
            }
      
            return config;
          });
    }
    
    //POST /beers
    createBeers = async (requestBody) => {
        return this.api.post("/beer/create", requestBody);
    }

    //GET /beers
    getAllBeers = async () => {
        return this.api.get("/beers");
    }
}

const beerAppService = new BeerAppService();

export default beerAppService;