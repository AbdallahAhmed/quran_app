<template>

    <div :class="'navbar-fixed page-profile'">

        <navbar></navbar>

        <div class="login-page">

            <div class="header-islamic row">
                <div class="header-islamic-content">
                    <img :src="user.photo?user.photo.thumbnail:'user-avater.png'" class="avater"
                         alt="user avater">
                    <p v-if="check"> {{user.first_name }} {{ user.last_name }}</p>
                    <p v-if="!check">
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

                            <img src="./../assets/img/_share.png" alt="Fav">

                        </a>
                    </div>
                </div>

                <button type="submit" class="link" v-if="check">
                    تعديل الملف الشخصى
                </button>

                <button type="submit" @click="$f7router.navigate('/login')" class="link" v-if="!check">
                    تسجيل الدخول
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

        },

        data: function () {
            return {
                serverErrors: []
            }
        },
        computed: {
            check() {
                if (this.$store.getters.auth) {
                    return true;
                }
                return false;
            },
            user() {
                return this.$store.getters.user;
            }
        },

        components: {
            "navbar": require("./partials/Navbar.vue")
        },


    }

</script>

