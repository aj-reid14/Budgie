import axios from "axios";

export default {
  login: function(data) {
    // console.log(data)
    return axios.post("/api/home/login", data)
  },
  register: function(data) {
    // console.log(data)
    return axios.post("/api/home/register", data)
  },
  verify: function(data) {
    console.log(data)
    return axios.post("/api/home/:id", data)
  },
  createUser: function(username, data) {
    return axios.post("/api/home/" + username, data)
  }
};
