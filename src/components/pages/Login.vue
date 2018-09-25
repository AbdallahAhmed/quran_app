<template>

    <div class="page no-navbar" data-page="login">

        <div class="page-content">

            <div class="page-title">
                <a href="/">
                    <img class="site-logo" src="../../assets/img/logo.png"/>
                </a>
                <br/><br/>

                اشترك الآن لتستطيع تغيير صورة الملف الشخصي
                ومزامنة اعداداتك على  مختلف المنصات
            </div>

            <!-- Login form -->

            <form @submit.prevent="login">

                <f7-block>

                    <a class="button button-big button-fill button-main bg-facebook" @click="loginWithFacebook">
                        <div class="row">
                            <div class="col-60 button-main-title">الإستمرار بحساب Facebook</div>
                            <div class="col-20">
                                <i class="f7-icons button-main-icon">social_facebook_fill</i>
                            </div>
                        </div>
                    </a>

                    <a class="button button-big button-fill button-main bg-twitter" @click="loginWithTwitter">
                        <div class="row">
                            <div class="col-60 button-main-title">الإستمرار بحساب Twitter</div>
                            <div class="col-20">
                                <i class="f7-icons button-main-icon">social_twitter_fill</i>
                            </div>
                        </div>
                    </a>

                    <a class="button button-big button-fill button-main bg-google" @click="loginWithGoogle">
                        <div class="row">
                            <div class="col-60 button-main-title">الإستمرار بحساب Google</div>
                            <div class="col-20">
                                <i class="f7-icons button-main-icon">social_googleplus</i>
                            </div>
                        </div>
                    </a>

                    <a href="/local_login" class="button button-big button-fill button-main bg-white">
                        <div class="row">
                            <div class="col-60 color-gray button-main-title">الدخول بالبريد الإلكتروني</div>
                            <div class="col-20">
                                <i class="f7-icons color-gray button-main-icon">email_fill</i>
                            </div>
                        </div>
                    </a>

                </f7-block>

            </form>
        </div>
    </div>

</template>


<script>

    export default {

        data: function () {
            return {
                user: {
                    email: "",
                    password: "",
                },
                submitted: false
            }
        },

        mounted(){
            this.$store.commit("guest_alert", false);
        },

        methods: {

            loginWithFacebook: function () {

                var self = this;

                facebookConnectPlugin.login(["email"],

                    function () {

                        facebookConnectPlugin.api("me/?fields=id,name,email", ["email"], function (user) {

                            self.$f7.showPreloader(self.$app.trans("please_wait"));

                            new Promise(function (resolve, reject) {

                                if (window.FirebasePlugin) {
                                    window.FirebasePlugin.getToken(function (token) {
                                        resolve(token);
                                    });
                                } else {
                                    resolve(null);
                                }

                            }).then(function (token) {

                                self.$store.dispatch("register", {
                                    type: "facebook",
                                    username: "facebook_" + user.id,
                                    name: user.name,
                                    email: user.id + "@facebook.com",
                                    password: "secret_of_" + user.id,
                                    social_id: user.id,
                                    android_key: token
                                }).then(function () {
                                    self.$f7.hidePreloader();
                                    self.$app.router.load("/intro");
                                });

                            });

                        }, function (error) {
                            // Data fetch error
                            self.$f7.hidePreloader();
                        });
                    },
                    function (error) {
                        // Login error
                        self.$f7.hidePreloader();
                    });

            },

            loginWithTwitter: function () {

                var self = this;

                self.$f7.showPreloader(this.$app.trans("please_wait"));

                TwitterConnect.login(

                    function (user) {

                        new Promise(function (resolve, reject) {

                            if (window.FirebasePlugin) {
                                window.FirebasePlugin.getToken(function (token) {
                                    resolve(token);
                                });
                            } else {
                                resolve(null);
                            }

                        }).then(function (token) {

                            self.$store.dispatch("register", {
                                type: "twitter",
                                username: user.userName,
                                name: user.userName,
                                email: user.userName + "@twitter.com",
                                password: "secret_of_" + user.userId,
                                social_id: user.userId,
                                android_key: token
                            }).then(function () {
                                self.$f7.hidePreloader();
                                self.$app.router.load("/intro");
                            });

                        });

                    }, function (error) {
                        // API error
                        self.$f7.hidePreloader();
                    }
                );

            },

            loginWithGoogle: function () {

                var self = this;

                self.$f7.showPreloader(this.$app.trans("please_wait"));

                window.plugins.googleplus.login(
                    {},
                    function (user) {

                        new Promise(function (resolve, reject) {

                            if (window.FirebasePlugin) {
                                window.FirebasePlugin.getToken(function (token) {
                                    resolve(token);
                                });
                            } else {
                                resolve(null);
                            }

                        }).then(function (token) {

                            self.$store.dispatch("register", {
                                type: "google",
                                username: user.givenName,
                                name: user.displayName,
                                email: user.userId + "@google.com",
                                password: "secret_of_" + user.userId,
                                social_id: user.userId,
                                android_key: token
                            }).then(function () {
                                self.$f7.hidePreloader();
                                self.$app.router.load("/intro");
                            });

                        });

                    },
                    function (msg) {
                        // API error
                        self.$f7.hidePreloader();
                    }
                );
            }
        }
    }

</script>
