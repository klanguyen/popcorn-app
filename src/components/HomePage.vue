<template>
    <v-container grid-list-xl>
        <v-layout wrap>
            <v-flex xs4 mb-2>
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            Discover
                        </div>
                    </v-card-title>
                    <v-card-subtitle
                        ><i class="fas fa-fire-alt"></i
                    ></v-card-subtitle>
                    <v-card-text>
                        <p>Already finished GottaWatch movies?</p>
                        <p>Discover the popular ones!</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="green" @click="toPopular"
                            >Popular Movies</v-btn
                        >
                    </v-card-actions>
                </v-card>

                <v-card>
                    <v-card-title primary-title>
                        <div>
                            Whatta Watch?
                        </div>
                    </v-card-title>
                    <v-card-subtitle
                        ><i class="fas fa-clipboard-list"></i
                    ></v-card-subtitle>
                    <v-card-text>
                        <p>Ready to watch your movies?</p>
                        <p>See what you gotta watch!</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="green" @click="toGottaWatch"
                            >GottaWatch Movies</v-btn
                        >
                    </v-card-actions>
                </v-card>

                <v-card>
                    <v-card-title primary-title>
                        <div>
                            Check your Watched
                        </div>
                    </v-card-title>
                    <v-card-subtitle
                    ><i class="fas fa-clipboard-list"></i
                    ></v-card-subtitle>
                    <v-card-text>
                        <p>Are you a record person?</p>
                        <p>See what you watched!</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="green" @click="toWatched"
                        >Watched Movies</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'HomePage',

    methods: {
        toPopular() {
            this.$router.push('/popular');
        },
        toGottaWatch() {
            if(this.$store.state.isAuthenticated)
            {
                this.$router.push('/gotta-watch');
            } else
            this.$router.push('/login');
        },
        toWatched() {
            if(this.$store.state.isAuthenticated)
            {
                this.$router.push('/watched');
            } else
                this.$router.push('/login');
        }
    }
};
</script>
