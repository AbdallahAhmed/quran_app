<template>

    <f7-page :class="'navbar-fixed page-forget'">

        <navbar></navbar>
        <div class="login-page">
            <div class="header-islamic row">
                <div class="header-islamic-content">
                    <img src="../assets/img/user-avater.png" class="avater" alt="user avater">
                    <p class="page-title">أسترجاع الرقم السري</p>
                </div>
            </div>

            <div class="form-container">

                <span class="help" v-if="serverErrors.length!=0" v-for="error in serverErrors" :key="error">
                    {{error}}
                </span>

                <form @submit.prevent="login">
                    <input type="text" name="email" placeholder=" البريد الكترونى " v-model="user.email"
                           v-validate="'required|email'" autocomplete="false">

                    <span v-show="errors.has('email')&&submitted"
                          class="help is-danger">{{ errors.first('email') }}</span>

                    <button type="submit">
                        أرسال
                    </button>
                </form>

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
            // if(this.$app.auth.check()){
            //   this.$f7router.back();
            // }
        },
        data: function () {
            return {

                user: {
                    email: "",
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
                        self.$store.dispatch('forgetPassword', self.user).then((response) => {

                            self.$f7.dialog.alert('أفحص بريدك الكترونى');

                            self.$f7.preloader.hide();

                        }, (res) => {
                            self.serverErrors = ['البريد الكترونى  غير صحيحة'];
                            self.$f7.preloader.hide();
                        });
                        return;
                    }

                });
                return false;
            },
        },

        components: {
            "navbar": require("./partials/Navbar.vue")
        }
    }

</script>

