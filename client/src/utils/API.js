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
  getUser: function(username) {
    return axios.get("/api/home/" + username)
  },
  createUser: function(username, data) {
    return axios.post("/api/home/" + username, data)
  },
  addBudget: function(username, data) {
    return axios.put("/api/home/" + username, data)
  },
  addTransaction: function(username, budgetName, data) {
    return axios.put(`/api/home/${username}/${budgetName}`, data)
  },
  deleteBudget: function(username, budgetName) {
    return axios.delete(`/api/home/${username}/${budgetName}`)
  }
};
