import axios from 'axios';

const api = axios.create({
    baseURL: 'http://gpaiva-servicos-app.umbler.net'
});

export default api;