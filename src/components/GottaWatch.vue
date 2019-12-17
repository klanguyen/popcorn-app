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

    <v-container v-else-if="empty">
        <div class="text-xs-center">
            <h2>No Movie in GottaWatch list</h2>
        </div>
    </v-container>

    <v-container v-else grid-list-xl>
        <v-layout wrap>
            <v-flex
                xs4
                v-for="(item, index) in gottaWatchList"
                :key="index"
                mb-2
            >
                <v-card>
                    <v-img
                        :src="posterImage(item.movie)"
                        aspect-ratio="1"
                        :alt="item.movie.title"
                    ></v-img>

                    <v-card-title primary-title>
                        <div>
                            <h2>{{ item.movie.title }}</h2>
                            <div>Release Date: {{ item.movie.release_date }}</div>
                            <div>Type: Movie</div>
                            <div>Ratings: {{ item.movie.vote_average }}</div>
                        </div>
                    </v-card-title>

                    <v-card-actions class="justify-center">
                        <v-btn text color="green" @click="singleMovie(item.movieId)"
                            >View</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {db} from '../firebase';
export default {
    data() {
        return {
            gottaWatchList: [],
            empty: false,
            loading: true,
            user: this.$store.state.user.user
        };
    },

    mounted: function() {
        this.fetchGottaWatchList();
        this.empty = this.gottaWatchList.length === 0;
    },

    computed: {},

    methods: {
        singleMovie(id) {
            this.$router.push('/movie/' + id);
        },

        posterImage(item) {
            let baseImgUrl = 'https://image.tmdb.org/t/p/';
            return baseImgUrl.concat('w154', item.poster_path);
        },

        async fetchGottaWatchList() {
            this.gottaWatchList = [];
            var self = this;
            // load list from database to local
            await db
                .collection('popcornUsers')
                .doc(this.user.uid)
                .collection('gottaWatchList')
                .orderBy('datetime')
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // eslint-disable-next-line no-console
                        self.gottaWatchList.push(doc.data());
                    });
                })
                .catch(function(error) {
                    // eslint-disable-next-line no-console
                    console.log('Error getting documents: ', error);
                });
            // eslint-disable-next-line no-console
            console.log(this.gottaWatchList.length === 0);
            this.loading = false;
            for(let i in this.gottaWatchList){
                // eslint-disable-next-line no-console
                console.log(i);
            }
        },
    }
};
</script>
