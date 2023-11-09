// import axios from 'axios';
import axios from './customize-axios';

const fetchAllUser = () => {
    return axios.get("/api/users?page=1")
}

export { fetchAllUser };