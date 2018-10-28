<template>

    <f7-page :class="'navbar-fixed '">

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
                    <p class="page-title">إسترجاع الرقم السري</p>
                </div>
            </div>

            <div class="form-container">

                <form @submit.prevent="forgetPassword">

                    <div class="input-border">
                        <input type="text" name="email" placeholder=" البريد الكترونى " v-model="user.email"
                               v-validate="'required|email'" autocomplete="false">
                    </div>

                    <button type="submit">
                        أرسال
                    </button>


                </form>

            </div>
        </div>
        <div class="popup popup-reset">
            <div class="page">
                <navbar></navbar>

                <div class="login-page">
                    <div class="header-islamic row">
                        <div class="header-islamic-content">
                            <img src="../assets/img/user-avater.png" class="avater" alt="user avater">
                            <p class="page-title">إفحص بريدك الكترونى</p>

                        </div>
                    </div>

                    <div class="form-container">

                        <form @submit.prevent="resetPassword">

                            <div class="input-border">

                                <input type="text" :class="{'errors':errors.has('code')&&submitted}" name="code"
                                       placeholder="كود الدخول" v-model="user.code"
                                       v-validate="'required'" autocomplete="false"/>
                            </div>

                            <div class="input-border">
                                <input type="password" :class="{'errors':errors.has('password')&&submitted}"
                                       name="password"
                                       placeholder="كلمة المرور" v-model="user.password"
                                       v-validate="'required'" autocomplete="false"/>
                            </div>

                            <div class="input-border">
                                <input type="password" :class="{'errors':errors.has('confirm_password')&&submitted}"
                                       name="confirm_password" placeholder="تاكيد كلمة المرور"
                                       v-model="user.confirm_password"
                                       v-validate="'confirmed:password'" autocomplete="false"/>
                            </div>

                            <button type="submit">
                                أرسال
                            </button>

                        </form>

                    </div>
                </div>
            </div>

        </div>

    </f7-page>
</template>

<style>


</style>

<script>

    import {mapState} from 'vuex';

    export default {

        beforeCreate() {
            if (this.$app.auth.check()) {
                this.$f7router.back();
            }
        },

        data: function () {
            return {

                user: {
                    email: "",
                    password: "",
                    confirm_password: "",
                    code: ""
                },
                serverErrors: [],
                submitted: false,
                popup: null
            }
        },

        methods: {

            forgetPassword() {

                this.submitted = true;

                var self = this;

                this.$validator.validateAll(this.user.email).then((valid) => {

                    if (valid) {

                        self.$f7.dialog.preloader('جاري الفحص');

                        self.$store.dispatch('forgetPassword', self.user).then((response) => {

                            self.popup.open();

                        }, (res) => {

                            self.$f7.notification.create({
                                subtitle: 'البريد الكترونى غير مسجل مسبقاً'
                            }).open();

                        }).then(() => {
                            self.$f7.dialog.close();
                        });

                    } else {

                        self.$f7.notification.create({
                            subtitle: self.$validator.errors.items[0].msg
                        }).open();

                        self.$f7.dialog.close();

                    }

                });
            },

            resetPassword() {

                this.submitted = true;

                var self = this;

                this.$validator.validateAll(this.user).then((valid) => {

                    if (valid) {

                        self.$f7.dialog.preloader('جاري الفحص');

                        self.$http.post('auth/reset-password', self.user).then((response) => {

                            self.popup.close();

                            self.$store.commit('user', response.body.data.user);
                            self.$store.commit('token', response.body.data.token);
                            self.$f7router.navigate('home/quran/1');

                        }, (res) => {

                            self.$f7.notification.create({
                                subtitle: 'الكود غير صحيح'
                            }).open();

                        }).then(() => {
                            self.$f7.dialog.close();
                        });
                    } else {

                        self.$f7.notification.create({
                            subtitle: self.$validator.errors.items[0].msg
                        }).open();

                        self.$f7.dialog.close();

                    }

                });

            },


        },
        mounted() {
            this.popup = this.$f7.popup.create({
                el: '.popup-reset'
            });
        },
        components: {
            "navbar": require("./partials/Navbar.vue")
        }
    }

</script>

