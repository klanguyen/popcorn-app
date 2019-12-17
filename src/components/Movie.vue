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

    <v-container v-else>
        <v-layout wrap>
            <v-flex xs12 mr-1 ml-1>
                <v-card>
                    <v-img
                        :src="posterImage(singleMovie)"
                        aspect-ratio="2"
                    ></v-img>
                    <v-card-title primary-title>
                        <div>
                            <h2 class="headline mb-0">
                                {{ singleMovie.title }}
                            </h2>
                            <p>{{ singleMovie.release_date }}</p>
                            <p>{{ singleMovie.overview }}</p>
                            <h3>Runtime:</h3>
                            {{ singleMovie.runtime }} minutes
                            <h3>Genres:</h3>
                            <ul
                                v-for="(item, index) in movieGenres"
                                :key="index"
                            >
                                <li>{{ item.name }}</li>
                            </ul>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn text color="green" @click="back">back</v-btn>
                    </v-card-actions>
                    <!--if the user logged in-->
                    <div v-if="loggedIn">
                        <v-card-actions>
                            <v-btn
                                v-if="gottaWatched"
                                text
                                color="green"
                                @click="removeGottaWatch"
                                >UnGottaWatch</v-btn
                            >
                            <v-btn
                                v-else
                                text
                                color="green"
                                @click="addToGottaWatchList"
                                >GottaWatch</v-btn
                            >
                        </v-card-actions>
                        <v-card-actions>
                            <v-btn
                                v-if="watched"
                                text
                                color="green"
                                @click="removeWatched"
                                >UnWatched</v-btn
                            >
                            <v-btn
                                v-else
                                text
                                color="green"
                                @click="addToWatchedList"
                                >Watched</v-btn
                            >
                        </v-card-actions>
                    </div>
                    <!--if the user did not log in-->
                    <div v-else>
                        <v-card-actions>
                            <v-btn text color="green">
                                <!-- TODO: get tooltips to work -->
                                <v-tooltip
                                    light
                                    content="Login to add this movie to your gotta watch list"
                                >
                                    GottaWatch
                                </v-tooltip>
                            </v-btn>
                        </v-card-actions>
                        <v-card-actions>
                            <v-btn text color="green">
                                <v-tooltip
                                    light
                                    content="Login to add this movie to your watched list"
                                >
                                    Watched
                                </v-tooltip>
                            </v-btn>
                        </v-card-actions>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import movieApi from '@/MovieApi';
import { db } from '@/firebase';
import 'firebase/firestore';
import firebase from 'firebase/app';

var MovieList = function() {
    return {
        movie: null,
        datetime: new Date(),
        owner: '',
        movieId: ''
    };
};

export default {
    props: ['id'],

    data() {
        return {
            user: this.$store.state.user.user,
            singleMovie: '',
            movieGenres: [],
            gottaWatchList: [],
            watchedList: [],
            dialog: false,
            loading: true,
            ratings: ''
        };
    },
    mounted() {
        movieApi
            .fetchSingleMovie(this.id)
            .then(response => {
                this.singleMovie = response;
                this.ratings = this.singleMovie.vote_average;
                this.movieGenres = this.singleMovie.genres;
                this.loading = false;
                this.fetchGottaWatchList();
                this.fetchWatchedList();
            })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.error('AJAX QUERY ERROR', error);
            });
    },

    computed: {
        loggedIn() {
            return firebase.auth().currentUser != null;
        },
        loggedInListOwner() {
            if (firebase.auth().currentUser) {
                return this.gottaWatchList.find(function(list) {
                    return list.owner === firebase.auth().currentUser.uid;
                }, firebase.auth().currentUser);
            }
            return null;
        },
        isListOwner() {
            if (this.loggedInListOwner) {
                return true;
            }

            return false;
        },
        gottaWatched() {
            return this.gottaWatchList.some(
                movie => movie.movieId === this.singleMovie.id
            );
        },
        watched() {
            return this.watchedList.some(
                movie => movie.movieId === this.singleMovie.id
            );
        }
    },

    methods: {
        back() {
            this.$router.push('/');
        },

        async fetchGottaWatchList() {
            this.gottaWatchList = [];
            var self = this;
            // eslint-disable-next-line no-console
            console.log(
                this.gottaWatchList.some(
                    movie => movie.movie.id === this.singleMovie.id
                )
            );
            // eslint-disable-next-line no-console
            console.log(this.gottaWatchList);
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
            console.log(
                self.gottaWatchList.some(
                    movie => movie.movie.id === this.singleMovie.id
                )
            );
            // eslint-disable-next-line no-console
            console.log(self.gottaWatchList);
        },

        async fetchWatchedList() {
            this.watchedList = [];
            var self = this;
            // load list from database to local
            await db
                .collection('popcornUsers')
                .doc(this.user.uid)
                .collection('watchedList')
                .orderBy('datetime')
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // eslint-disable-next-line no-console
                        self.watchedList.push(doc.data());
                    });
                })
                .catch(function(error) {
                    // eslint-disable-next-line no-console
                    console.log('Error getting documents: ', error);
                });

            // eslint-disable-next-line no-console
            console.log(
                this.watchedList.some(
                    movie => movie.movie.id === this.singleMovie.id
                )
            );
            // eslint-disable-next-line no-console
            console.log(this.watchedList);
        },

        backToPopular() {
            this.$router.push('/popular');
        },

        addToGottaWatchList() {
            if (!this.gottaWatched) {
                let gottaWatch = new MovieList();
                gottaWatch.movie = this.singleMovie;
                gottaWatch.owner = this.user.uid;
                gottaWatch.movieId = this.singleMovie.id;
                var self = this;
                // add to sub collection
                db.collection('popcornUsers')
                    .doc(this.user.uid)
                    .collection('gottaWatchList')
                    .add(gottaWatch)
                    .then(function() {
                        alert('Added to Gotta Watch');
                        self.backToPopular();
                    })
                    .catch(error => {
                        alert('Failed to add');
                        // eslint-disable-next-line no-console
                        console.error('Failed to add movie', error);
                    });

                // add to the array
                this.gottaWatchList.push(this.singleMovie);
            }
        },

        removeGottaWatch() {
            if (this.isListOwner) {
                // eslint-disable-next-line no-console
                console.log(this.singleMovie.id);
                var self = this;
                var deletequery = db
                    .collection('popcornUsers')
                    .doc(this.user.uid)
                    .collection('gottaWatchList')
                    .where('movieId', '==', this.singleMovie.id);
                deletequery
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            doc.ref.delete();
                            alert('UnGottaWatched!');
                            self.backToPopular();
                            self.addPoints(self.user.uid, 5);
                            // eslint-disable-next-line no-console
                            console.log('Deleted');
                        });
                    })
                    .catch(function(error) {
                        alert('Failed to UnGottaWatched');
                        // eslint-disable-next-line no-console
                        console.error('Failed: ', error);
                    });
            }
        },

        addToWatchedList() {
            if (!this.watched) {
                let watched = new MovieList();
                watched.movie = this.singleMovie;
                watched.owner = this.user.uid;
                watched.movieId = this.singleMovie.id;
                var self = this;
                // add to sub collection
                db.collection('popcornUsers')
                    .doc(this.user.uid)
                    .collection('watchedList')
                    .add(watched)
                    .then(function() {
                        alert('Added to Watched');
                        self.backToPopular();
                        self.addPoints(self.user.uid, 10);
                    })
                    .catch(error => {
                        alert('Failed to add');
                        // eslint-disable-next-line no-console
                        console.error('Failed to add movie', error);
                    });

                // add to the array
                this.watchedList.push(this.singleMovie);
            }
        },

        removeWatched() {
            if (this.isListOwner) {
                // eslint-disable-next-line no-console
                console.log(this.singleMovie.id);
                var self = this;
                var deletequery = db
                    .collection('popcornUsers')
                    .doc(this.user.uid)
                    .collection('watchedList')
                    .where('movieId', '==', this.singleMovie.id);
                deletequery
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            doc.ref.delete();
                            alert('UnWatched!');
                            self.backToPopular();
                            // eslint-disable-next-line no-console
                            console.log('Deleted');
                        });
                    })
                    .catch(function(error) {
                        alert('Failed to UnWatched');
                        // eslint-disable-next-line no-console
                        console.error('Failed: ', error);
                    });
            }
        },

        addPoints(userId, point) {
            db.runTransaction(function(transaction) {
                let docRef = db.collection('popcornBoard').doc(userId);

                return transaction
                    .get(docRef)
                    .then(function(doc) {
                        if (!doc.exists) {
                            throw 'Document does not exist!';
                        }

                        // add score
                        var newPoint = doc.data().points + point;
                        transaction.update(docRef, { points: newPoint });
                    })
                    .then(function() {
                        // eslint-disable-next-line no-console
                        console.log('Points updated!');
                        alert('Congratz! You earned ' + point + 'pts!');
                    })
                    .catch(function(error) {
                        // eslint-disable-next-line no-console
                        console.log('Transaction failed: ', error);
                    });
            });
        },

        posterImage(item) {
            let baseImgUrl = 'https://image.tmdb.org/t/p/';
            return baseImgUrl.concat('w154', item.poster_path);
        }
    }
};
</script>
