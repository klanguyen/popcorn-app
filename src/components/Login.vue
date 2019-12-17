<template>
    <!--<div class="login">
    <img src="../../public/popcorn.png" width="300px">
    <h3>Popcorn - The Movie Library</h3>
    <input type="text" v-model="email" placeholder="Email address" class="input" required>
    <br/>
    <input type="password" v-model="password" placeholder="Password" class="input" required>
    <br/>
    <button @click="login" class="button">Login</button>
    <p>
      or Sign In with Google <br/>
      <button @click="socialLogin" class="social-button">
        <img alt="Google Logo" src="../../public/google-logo.png">
      </button>
    </p>
    <p><router-link to="/signup">
      New Here? Create a new account.
    </router-link></p>
  </div>-->
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login Form</v-toolbar-title>
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
                        <v-btn
                            color="danger"
                            to="/signup"
                            >Sign Up</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            :disabled="!valid"
                            @click="submit"
                            >Login</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Login',

    data() {
        return {
            valid: false,
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
        submit() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('userLogin', {
                    email: this.email,
                    password: this.password
                });
                // eslint-disable-next-line no-console
                console.log('Logged in as ' + this.email);
            }
        }
        /*socialLogin(){
                const provider = new firebase.auth.GoogleAuthProvider();

                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then((result) => {
                        this.$router.replace('/home');
                    }).catch((err) => {
                        alert(err.message);
                });
            },*/
    }

    // create leaderboard entry for user signing in with Google
    // for the first time
    /*created: function(userId) {
            db.runTransaction(function(transaction){
                let docRef = db.collection('popcornBoard').doc(userId);

                return transaction.get(docRef).then(function(doc) {
                    if(!doc.exists) {
                        // create leaderboard entry with matching id
                        db.collection('popcornBoard').doc(docRef.user.uid).set({
                            displayName: this.email.substring(0,this.email.indexOf('@')),
                            // new user earns 10 points
                            score: 10,
                        }).catch(function(error) {
                            console.error('Error creating board document' ,error);
                        });
                    }
                });
            }).then(function() {
                console.log("Leaderboard entry created!");
            }).catch(function(error) {
                console.error("Transaction failed: ", error);
            });
        },*/
};
</script>

<style scoped>
.login {
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
    color: black;
    text-decoration: underline;
}

p {
    margin-top: 40px;
    font-size: 13px;
}
h1,
h2 {
    font-weight: normal;
}

.social-button {
    width: 75px;
    background: white;
    padding: 10px;
    border-radius: 100%;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    outline: 0;
    border: 0;
}
.social-button:active {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
.social-button img {
    width: 100%;
}
</style>
