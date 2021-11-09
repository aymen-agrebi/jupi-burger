import axios from "axios";

const instance = axios.create({
    baseURL : 'https://jupi-burger-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;