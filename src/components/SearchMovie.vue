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

    <v-container v-else-if="noData">
        <div class="text-xs-center">
            <h2>No Movie found</h2>
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
import movieApi from '@/MovieApi';

export default {
    props: ['name'],

    data() {
        return {
            movieResult: [],
            loading: true,
            noData: false
        };
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
    },

    mounted() {
        movieApi
            .fetchMovieCollection(this.name)
            .then(response => {
                if (response.total_results > 0) {
                    this.movieResult = response.results;
                    this.loading = false;
                    this.noData = false;
                } else {
                    this.noData = true;
                    this.loading = false;
                }
            })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.error('AJAX QUERY ERROR', error);
            });
    }
};
</script>
