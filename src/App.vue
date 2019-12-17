<template>
    <v-app>
        <v-navigation-drawer
            app
            v-model="drawer"
            class="brown lighten-2"
            dark
            disable-resize-watcher
        >
            <v-list>
                <template v-for="(item, index) in items">
                    <v-list-item :key="index">
                        <v-list-item-content>
                            {{ item.title }}
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="brown darken-4" dark>
            <v-app-bar-nav-icon
                class="hidden-md-and-up"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title class="headline text-uppercase">
                <router-link to="/" tag="span" style="cursor: pointer">
                    <v-img
                        src="../public/popcorn.png"
                        max-height="100px"
                        max-width="100px"
                    ></v-img>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-flex class="xs12 sm6 md3">
                <v-text-field
                    label="Search for movies"
                    v-model="searchString"
                    solo
                    clearable
                >
                </v-text-field>
            </v-flex>
            <v-btn
                outlined
                color="white"
                :disabled="!dataAvailable"
                @click="searchMovie"
            >
                <span class="mr-2">Search</span>
            </v-btn>
            <div v-if="!isAuthenticated">
                <v-btn text @click="login">Login</v-btn>
            </div>
            <div v-else>
                <v-btn text @click="logout">Logout</v-btn>
            </div>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App',

    components: {},

    data() {
        return {
            searchString: '',
            drawer: false,
            items: [{ title: 'Popular Movies' }, { title: 'Sign In' }]
        };
    },

    methods: {
        searchMovie() {
            // eslint-disable-next-line no-unused-vars
            this.$router.push('/search/' + this.searchString);
            this.searchString = '';
        },

        login() {
            this.$router.replace('/login');
        },

        logout() {
            this.$store.dispatch('userSignOut');
            // eslint-disable-next-line no-console
            console.log('Logged out');
        }
    },

    computed: {
        dataAvailable() {
            return this.searchString !== null && this.searchString !== '';
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    }
};
</script>
<style>
</style>
