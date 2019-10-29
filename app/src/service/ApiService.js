import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/users";

class ApiService {
  fetchUserById(userId) {
    return axios.get(USER_API_BASE_URL + "/" + userId);
  }

  deleteUser(userId) {
    return axios.delete(USER_API_BASE_URL + "/" + userId);
  }

  addUser(user) {
    return axios.post("" + USER_API_BASE_URL, user);
  }

  editUser(user) {
    return axios.put(USER_API_BASE_URL + "/" + user.id, user);
  }

  fetchUsers() {
    return axios.get(USER_API_BASE_URL);
  }
}

export default new ApiService();
