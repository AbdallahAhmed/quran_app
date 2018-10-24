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
                    <p>تسجيل الدخول </p>
                </div>
            </div>

            <div class="form-container">

                <span class="help" v-if="serverErrors.length!=0" v-for="error in serverErrors" :key="error">
                    {{error}}
                </span>

                <form @submit.prevent="login">
                    <div class="input-border">

                        <input type="text" name="email" placeholder=" البريد الكترونى " v-model="user.email"
                               v-validate="'required|email'" autocomplete="false">
                    </div>
                    <span v-show="errors.has('email')&&submitted"
                          class="help is-danger">{{ errors.first('email') }}</span>
                    <div class="input-border">
                        <input type="password" name="password" placeholder="كلمة المرور" v-model="user.password"
                               v-validate="'required'" autocomplete="false" />
                    </div>
                    <span v-show="errors.has('password')&&submitted" class="help is-danger">{{ errors.first('password') }}</span>

                    <button type="submit">
                        تسجيل
                    </button>
                </form>


                <div class="row">

                    <div class="col-50">
                        <a class="forget-password" href="/register">
                            مستخدم جديد
                        </a>
                    </div>

                    <div class="col-50">
                        <a class="forget-password" href="/forgetpassword">
                            نسيت كلمة المرور؟
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
        beforeCreate() {
            // if(this.$app.auth.check()){
            //   this.$f7router.back();
            // }
        },
        data: function () {
            return {

                user: {
                    email: "",
                    password: ""
                },
                serverErrors: [],
                submitted: false
            }
        },
        methods: {
            login() {
                this.submitted = true;
                var self = this;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        self.$f7.preloader.show();
                        self.$store.dispatch('login', self.user).then((response) => {
                            self.$f7router.navigate('home/quran/1');

                            self.$f7.preloader.hide();
                        }, (res) => {
                            self.serverErrors = ['البريد الكترونى وكلمة المرور غير صحيحة'];
                            self.$f7.preloader.hide();
                        });
                        return;
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

