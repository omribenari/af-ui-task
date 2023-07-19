import axios from 'axios';
export default class UsersApi {
  static getUsers() {
    const url = 'https://648b31ee17f1536d65ea9242.mockapi.io/users';
    return axios.get(url);
  }
  static getUserById(id: string) {
    const url = `https://648b31ee17f1536d65ea9242.mockapi.io/users/${id}`;
    return axios.get(url);
  }
}
