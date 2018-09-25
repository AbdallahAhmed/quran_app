<template>

    <div class="page no-navbar" data-page="register">

        <div class="page-content">
            <div class="page-title">
                <a href="/">
                    <img class="site-logo" src="../../assets/img/logo.png"/>
                </a>
                <br/>
            </div>

            <!-- Register form -->

            <form @submit.prevent="register">

                <div class="list-block">

                    <ul>
                        <!-- Name -->

                        <li>
                            <div class="item-content">
                                <div class="item-media"><i class="icon f7-icons">person</i></div>
                                <div class="item-inner">
                                    <input name="name" autocomplete="off"
                                           v-validate="'required|min:2|max:20'"
                                           v-model="user.name"
                                           type="text" :placeholder="$app.trans('first_name')">
                                </div>
                            </div>
                        </li>

                        <!-- Email -->

                        <li>
                            <div class="item-content">
                                <div class="item-media"><i class="icon f7-icons">email</i></div>
                                <div class="item-inner">
                                    <div class="item-input">
                                        <input type="email" name="email" autocomplete="off" v-validate="'required|email'"
                                               v-model="user.email"
                                               :placeholder="$app.trans('email')">
                                    </div>
                                </div>
                            </div>
                        </li>

                        <!-- Password -->

                        <li>
                            <div class="item-content">
                                <div class="item-media"><i class="icon f7-icons">lock</i></div>
                                <div class="item-inner">
                                    <div class="item-input">
                                        <input name="password" autocomplete="off" v-validate="'required|min:8'"
                                               v-model="user.password"
                                               type="password" :placeholder="$app.trans('password')">
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>

                    <f7-block>

                        <button style="width: 100%" type="submit"
                                class="button button-big button-fill bg-black bg-dark-gray"
                                :disabled="submitted">{{ $app.trans('register') }}
                        </button>

                        <br/>

                        <a href="/local_login" class="button button-big">{{ $app.trans('have_an_account') }}</a>

                    </f7-block>

                </div>

            </form>
        </div>
    </div>

</template>

<script>

    export default {

        data: function () {
            return {

                user: {
                    name: "",
                    email: "",
                    password: "",
                    android_key: "",
                    ios_key: "",
                },

                submitted: false
            }
        },

        mounted(){
            this.$store.commit("guest_alert", false);
        },

        methods: {

            register: function () {

                const self = this;

                self.$f7.showPreloader(this.$app.trans("please_wait"));

                self.submitted = true;

                self.$validator.validateAll(self.user).then(function (valid) {

                    if (valid) {

                        new Promise(function (resolve, reject) {

                            if (window.FirebasePlugin) {
                                window.FirebasePlugin.getToken(function (token) {
                                    resolve(token);
                                });
                            } else {
                                resolve(null);
                            }

                        }).then(function (token) {

                            self.user.android_key = token;

                            self.$store.dispatch("register", self.user).then(function () {

                                // 200 ok response

                                self.$f7.addNotification({
                                    title: self.$app.trans('register'),
                                    message: self.$app.trans('register_success'),
                                    hold: 3000
                                });

                                self.$app.router.load("/intro");

                            }, function (response) {

                                // other responses

                                self.$f7.addNotification({
                                    title: self.$app.trans('register'),
                                    message: response.body.data ? response.body.data : self.$app.trans("connection_error"),
                                    hold: 3000
                                });

                            }).then(function (response) {
                                self.submitted = false;
                                self.$f7.hidePreloader();
                            });

                        });

                    } else {


                        self.$f7.addNotification({
                            title: self.$app.trans('register'),
                            message: self.$validator.errors.items[0].msg,
                            hold: 3000
                        });

                        self.submitted = false;
                        self.$f7.hidePreloader();
                    }

                });
            }
        }
    }

</script>
