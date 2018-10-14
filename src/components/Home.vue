<template>

    <f7-page :class="'navbar-fixed'">

        <navbar></navbar>

        <main-toolbar v-if="!aya"></main-toolbar>

        <options-toolbar v-if="aya"></options-toolbar>

        <div class="tabs-swipeable-wrap">
            <div class="tabs">

                <div id="khatima-tab" class="page-content  tab page-khatima ">
                    <khatima-tab></khatima-tab>
                </div>

                <div id="quran-tab" class="page-content tab tab-active">
                    <transition>
                        <component :is="quran"></component>
                    </transition>
                </div>

                <div id="search-tab" class="page-content tab">
                    <search></search>
                </div>
                <div id="login-tab" class="page-content tab">
                    <login v-if="!$app.auth.check()"></login>
                    <profile v-if="$app.auth.check()"></profile>
                </div>

            </div>
        </div>

    </f7-page>

</template>

<style>


</style>

<script>

    export default {

        computed: {
            aya() {
                return this.$store.getters.aya;
            },
            'quran': function () {
                return this.$store.getters.tabs.quran;
            }
        },

        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue"),
            "options-toolbar": require("./partials/OptionsToolbar.vue"),
            "quran": require("./Quran.vue"),
            "search": require("./Search.vue"),
            "profile": require("./MyProfile.vue"),
            "khatima-tab": require("./KhatimaTab.vue"),
            "login": require("./Login.vue")
        },
        mounted() {

        }
    }

</script>
