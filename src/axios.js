/**
 *  2018/9/21  lize
 */
import axios from 'axios'

let baseUrl = '/api';

let headers = {};

const AXIOS = axios.create({
  
  baseURL: baseUrl,
  
  withCredentials: true,
  
  headers: headers
  
});

export default AXIOS
