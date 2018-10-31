<template>

    <div class="page" :class="'page-login'">

        <navbar>
            <template slot="left">
                <a href="" class="link back navbar-back">
                    <i class="f7-icons">arrow_left</i>
                </a>
            </template>
        </navbar>

        <div class="login-page">
            <div class="header-islamic row">
                <div class="header-islamic-content">
                    <img src="../assets/img/user-avater.png" class="avater" alt="user avater">
                    <p> {{$app.trans('login')}} </p>
                </div>
            </div>

            <div class="form-container">

                <form @submit.prevent="login">
                    <div class="input-border">

                        <input type="text" name="email" :placeholder="$app.trans('attributes.email')" v-model="user.email"
                               v-validate="'required|email'" autocomplete="false">
                    </div>


                    <div class="input-border">
                        <input type="password" name="password" :placeholder="$app.trans('attributes.password')" v-model="user.password"
                               v-validate="'required'" autocomplete="false"/>
                    </div>


                    <button type="submit" class="link">
                        {{$app.trans('login')}}
                    </button>
                </form>


                <div class="row">

                    <div class="col-50">
                        <a class="forget-password" href="/register">
                            {{$app.trans('signup')}}
                        </a>
                    </div>


                    <div class="col-50">
                        <a class="forget-password" href="/forgetpassword">
                           {{$app.trans('forget_password')}}
                        </a>
                    </div>
                </div>


            </div>
        </div>


    </div>


</template>

<style>




</style>

<script>

    import {mapState} from 'vuex';

    export default {

        data: function () {
            return {
                user: {
                    email: "",
                    password: ""
                },
                submitted: false
            }
        },

        methods: {

            login() {

                this.submitted = true;

                var self = this;

                this.$validator.validateAll(this.user).then((valid) => {

                    if (valid) {

                        self.$f7.dialog.preloader(self.$app.trans('login_loading'));

                        self.$store.dispatch('login', self.user).then((response) => {
                            setTimeout(()=> self.$f7router.back() , 500);
                        }, (res) => {
                            self.$f7.notification.create({
                                subtitle: self.$app.trans('error_login')
                            }).open();
                        }).then(()=>{
                            setTimeout(()=> self.$f7.dialog.close() , 500);
                        });

                    }else{

                        self.$f7.notification.create({
                            subtitle: self.$app.trans('error_login')
                        }).open();

                        self.$f7.dialog.close();
                    }

                });

                return false;
            },
        },

        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        }
    }

</script>

