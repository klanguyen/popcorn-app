<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Create A New Account</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                name="email"
                                label="Email"
                                type="email"
                                v-model="email"
                                :rules="emailRules"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                name="password"
                                label="Password"
                                id="password"
                                type="password"
                                required
                                v-model="password"
                                :rules="passwordRules"
                            >
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            :disabled="!valid"
                            @click="submit(email, password)"
                            >Join</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { db } from '@/firebase';

var User = function() {
    return {
        userName: '',
        email: '',
        photoURL: null,
        uid: '',
        badges: [],
        gottaWatchList: [],
        watchedList: []
    };
};

export default {
    name: 'SignUp',

    data() {
        return {
            authUser: null,
            user: null,
            valid: false,
            newUser: new User(),
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v =>
                    v.length >= 6 ||
                    'Password must be greater than 6 characters'
            ]
        };
    },

    methods: {
        submit(email, password) {
            if (this.$refs.form.validate()) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(function(docRef) {
                        // create user object with matching id
                        // could also use email address (or anything)
                        // but id is easiest for permissions
                        db.collection('popcornUsers')
                            .doc(docRef.user.uid)
                            .set({
                                userName: email.substring(0, email.indexOf('@')),
                                email: email,
                                photoURL: null,
                                badges: [],
                                gottaWatchList: [],
                                watchedList: []
                            })
                            .catch(function(error) {
                                // eslint-disable-next-line no-console
                                console.error(
                                    'Error creating user document',
                                    error
                                );

                                // TODO: handle errors
                            });

                        // create leaderboard entry with matching id
                        // could also use email address (or anything)
                        // but id is easiest for permissions
                        db.collection('popcornBoard')
                            .doc(docRef.user.uid)
                            .set({
                                displayName: email.substring(0, email.indexOf('@')),
                                // user earns 10pts for creating new account
                                points: 10
                            })
                            .catch(function(error) {
                                // eslint-disable-next-line no-console
                                console.error(
                                    'Error creating board document',
                                    error
                                );

                                // TODO: handle errors
                            });

                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        // eslint-disable-next-line no-console
                        console.error('Create User Error', error);

                        // TODO: let the user know there was an error
                    });
                this.$router.push('/login');
            }
        }
    },
    computed: {
        loggedIn() {
            return this.authUser && this.authUser.uid;
        }
    }
};
</script>

<style scoped>
.sign-up {
    margin-top: 40px;
}
input {
    align-self: center;
    margin: 10px 0;
    width: auto;
    padding: 15px;
}
button {
    margin: 10px 0;
    background-color: #0476f2;
}
a {
    color: #2c3e50;
}
p {
    margin-top: 40px;
    font-size: 13px;
}
h3 {
    font-weight: normal;
}
</style>
