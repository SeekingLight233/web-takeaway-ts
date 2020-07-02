import axios from 'axios';

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    },
);
