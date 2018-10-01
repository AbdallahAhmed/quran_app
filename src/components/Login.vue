<template>

    <f7-page :class="'navbar-fixed page-login'">

        <navbar></navbar>

        <main-toolbar></main-toolbar>


        <div class="login-page">
            <div class="header-islamic row">
                <div class="header-islamic-content">
                    <img src="../assets/img/user-avater.png"  class="avater" alt="user avater">
                    <p>تسجيل الدخول </p>
                </div>
            </div>

            <div class="form-container">

                <form onsubmit="return false">
                    <input type="email"  placeholder=" البريد الكترونى "  autocomplete="false">
                    <input type="password"  placeholder="كلمة المرور"   autocomplete="false">
                    <button type="submit">
                        تسجيل
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

        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        }
    }

</script>

