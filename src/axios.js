import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-plant.herokuapp.com/",
 //baseURL:"http://localhost:5000/",

});

export default instance;