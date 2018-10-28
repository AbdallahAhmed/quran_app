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

                <form @submit.prevent="login">
                    <div class="input-border">

                        <input type="text" name="email" placeholder=" البريد الكترونى " v-model="user.email"
                               v-validate="'required|email'" autocomplete="false">
                    </div>

                    <!--<span v-show="errors.has('email')&&submitted"-->
                          <!--class="help is-danger">{{ errors.first('email') }}</span>-->

                    <div class="input-border">
                        <input type="password" name="password" placeholder="كلمة المرور" v-model="user.password"
                               v-validate="'required'" autocomplete="false"/>
                    </div>

                    <!--<span v-show="errors.has('password')&&submitted" class="help is-danger">{{ errors.first('password') }}</span>-->

                    <button type="submit" class="link">
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

                        self.$f7.dialog.preloader('جاري تسجيل الدخول');

                        self.$store.dispatch('login', self.user).then((response) => {
                            self.$f7router.back();
                        }, (res) => {
                            self.$f7.notification.create({
                                subtitle: 'البريد الكترونى وكلمة المرور غير صحيحين'
                            }).open();
                        }).then(()=>{
                            self.$f7.dialog.close();
                        });

                    }else{

                        self.$f7.notification.create({
                            subtitle: 'البريد الكترونى وكلمة المرور غير صحيحين'
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

