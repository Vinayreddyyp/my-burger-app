import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8b57a.firebaseio.com/'
});

export default instance;