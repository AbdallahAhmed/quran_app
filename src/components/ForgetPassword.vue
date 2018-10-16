<template>

    <f7-page :class="'navbar-fixed '">

        <navbar></navbar>

        <div class="login-page">
            <div class="header-islamic row">
                <div class="header-islamic-content">
                    <img src="../assets/img/user-avater.png" class="avater" alt="user avater">
                    <p class="page-title">أسترجاع الرقم السري</p>
                </div>
            </div>

            <div class="form-container">

                <form @submit.prevent="forgetPassword">
                    <input type="text" name="email" placeholder=" البريد الكترونى " v-model="user.email"
                           v-validate="'required|email'" autocomplete="false">

                    <span v-show="errors.has('email')&&submitted"
                          class="help is-danger">{{ errors.first('email') }}</span>

                    <button type="submit">
                        أرسال
                    </button>

                    <div class="row">

                        <div class="col-20">
                            <a class="forget-password back">
                                رجوع
                            </a>
                        </div>

                    </div>
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

                <span class="help" v-if="serverErrors.length!=0" v-for="error in serverErrors" :key="error">
                    {{error}}
                </span>
                        <form @submit.prevent="resetPassword">
                            <input type="text" :class="{'errors':errors.has('code')&&submitted}" name="code"
                                   placeholder="الرمز" v-model="user.code"
                                   v-validate="'required'" autocomplete="false"/>

                            <span v-show="errors.has('password')&&submitted" class="help is-danger">{{ errors.first('password') }}</span>

                            <input type="password" :class="{'errors':errors.has('password')&&submitted}" name="password"
                                   placeholder="كلمة المرور" v-model="user.password"
                                   v-validate="'required'" autocomplete="false"/>

                            <span v-show="errors.has('password')&&submitted" class="help is-danger">{{ errors.first('password') }}</span>

                            <input type="password" :class="{'errors':errors.has('confirm_password')&&submitted}"
                                   name="confirm_password" placeholder="تاكيد كلمة المرور"
                                   v-model="user.confirm_password"
                                   v-validate="'confirmed:password'" autocomplete="false"/>

                            <button type="submit">
                                أرسال
                            </button>

                            <button class="link popup-close" type="button">
                                الرجوع
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
                console.log(this.$validator.validateAll);
                this.$validator.validateAll(this.user.email).then((result) => {
                    if (result) {
                        self.$f7.preloader.show();
                        self.$store.dispatch('forgetPassword', self.user).then((response) => {

                            self.popup.open();

                            self.$f7.preloader.hide();

                        }, (res) => {
                            self.serverErrors = ['البريد الكترونى  غير صحيحة'];
                            self.$f7.preloader.hide()
                        })
                    }

                });
                return false;
            },
            resetPassword(){
                this.submitted = true;
                var self = this;
                this.$validator.validateAll(this.user).then((result) => {
                    console.log('test' ,self.user);
                    if (result) {
                        self.$f7.preloader.show();
                        self.$http.post('auth/reset-password', self.user).then((response) => {

                            self.$f7.preloader.hide();

                            self.popup.close();
                            self.$store.commit('user',response.body.data.user);
                            self.$store.commit('token',response.body.data.token);
                            self.$f7router.navigate('/home/quran');

                        }, (res) => {
                            self.serverErrors = ['الكود غير صحيح'];
                            self.$f7.preloader.hide();
                        });
                        return;
                    }

                });
                return false;
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

