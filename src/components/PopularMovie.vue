<template>
    <v-container v-if="loading">
        <div class="text-xs-center">
            <v-progress-circular
                indeterminate
                :size="150"
                :width="8"
                color="green"
            >
            </v-progress-circular>
        </div>
    </v-container>

    <v-container v-else grid-list-xl>
        <v-layout wrap>
            <v-flex xs4 v-for="(item, index) in movieResult" :key="index" mb-2>
                <v-card>
                    <v-img
                        :src="posterImage(item)"
                        aspect-ratio="1"
                        :alt="item.title"
                    ></v-img>

                    <v-card-title primary-title>
                        <div>
                            <h2>{{ item.title }}</h2>
                            <div>Release Date: {{ item.release_date }}</div>
                            <div>Type: Movie</div>
                            <div>Ratings: {{ item.vote_average }}</div>
                        </div>
                    </v-card-title>

                    <v-card-actions class="justify-center">
                        <v-btn text color="green" @click="singleMovie(item.id)"
                            >View</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            movieResult: [],
            loading: true
        };
    },

    mounted() {
        let baseUrl = 'https://api.themoviedb.org/3/movie/popular';
        let config = {
            params: {
                api_key: '2c573ec30ab8ddc9b36a3e0a9f05b9b0'
            }
        };
        axios
            .get(baseUrl, config)
            .then(response => {
                if (response.data.total_results > 0) {
                    this.movieResult = response.data.results;
                    this.loading = false;
                }
            })
            .catch(error => {
                // called when a 4xx or 5xx error is received
                // error, most likely a bad search
                // or lost internet connection
                // eslint-disable-next-line no-console
                console.error('AJAX QUERY ERROR', error);
            });
    },

    computed: {},

    methods: {
        singleMovie(id) {
            this.$router.push('/movie/' + id);
        },

        posterImage(item) {
            let baseImgUrl = 'https://image.tmdb.org/t/p/';
            return baseImgUrl.concat('w154', item.poster_path);
        }
    }
};
</script>
