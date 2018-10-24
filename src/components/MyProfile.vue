<template>

    <div :class="'navbar-fixed page-profile'">

        <navbar></navbar>

        <div class="login-page">

            <div class="header-islamic row">
                <div class="header-islamic-content">
                    <img src="../assets/img/user-avater.png" class="avater" alt="user avater">
                    <p v-if="user"> {{user.first_name}} </p>
                    <p v-if="!user">
                        <a href="/login" class="link color-green">
                            تسجيل الدخول
                        </a>
                    </p>
                </div>
            </div>

            <div class="form-container">

                <span class="help" v-if="serverErrors.length!=0" v-for="error in serverErrors" :key="error">
                    {{error}}
                </span>

                <div class="row">
                    <div class="col-50">
                        <a href="/fav" class="link btn-setting">

                            <p>المفضلة</p>

                            <img src="./../assets/img/fav.png" alt="Fav">

                        </a>
                    </div>
                    <div class="col-50">
                        <a href="/alerts" class="link btn-setting">

                            <p>التنبيهات</p>

                            <img src="./../assets/img/alarm.png" alt="Fav">

                        </a>
                    </div>
                </div>

                <div class="row">
                    <div class="col-50 ">
                        <a href="/settings" class="link btn-setting">
                            <p>الاعدادات</p>

                            <img src="./../assets/img/settings.png" alt="Fav">


                        </a>
                    </div>
                    <div class="col-50">
                        <a href="#" class="link btn-setting">
                            <p> انشر القرأن</p>

                            <img src="./../assets/img/share.png" alt="Fav">

                        </a>
                    </div>
                </div>

                <button type="submit">
                    تعديل الملف الشخصى
                </button>

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
            // if (this.$app.auth.check()) {
            //     this.$f7router.back();
            // }
        },

        data: function () {
            return {
                user: this.$app.auth.user(),
                serverErrors: []
            }
        },

        components: {
            "navbar": require("./partials/Navbar.vue")
        },


    }

</script>

