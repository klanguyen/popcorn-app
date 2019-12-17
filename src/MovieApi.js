import axios from 'axios';

export default {
    fetchMovieCollection(name) {
        let url = 'https://api.themoviedb.org/3/search/movie';
        /*let config = {
            params: {
                api_key: '2c573ec30ab8ddc9b36a3e0a9f05b9b0',
                query: name // search keyword
            }
        };*/
        return axios.get(url.concat('?api_key=', '2c573ec30ab8ddc9b36a3e0a9f05b9b0&query=',name)).then(response => {
            return response.data;
        });
    },

    fetchSingleMovie(id) {
        let url = 'https://api.themoviedb.org/3/movie/';
        let apiKey = '2c573ec30ab8ddc9b36a3e0a9f05b9b0';
        return axios.get(url.concat(id, '?api_key=', apiKey)).then(response => {
            return response.data;
        });
    }
};
