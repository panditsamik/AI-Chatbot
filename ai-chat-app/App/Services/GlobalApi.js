import axios from "axios";

const BASE_URL = "http://192.168.0.105:3000/api/bardapi?ques=";

const getBardApi = (userMsg) => axios.get(BASE_URL + userMsg);

export default { getBardApi };
