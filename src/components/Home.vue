<template>

    <div :class="{page: true, 'navbar-fixed': true}">


        <main-toolbar v-if="!aya"></main-toolbar>

        <options-toolbar v-if="aya"></options-toolbar>

        <div class="tabs">

            <div id="khatima-tab" class="page-content tab page-khatima"
                 :class="{'tab-active' : $store.getters.home_tab == 'khatima'}">
                <khatima-tab></khatima-tab>
            </div>

            <div id="competition-tab" class="page-content tab"
                 :class="{'tab-active' : $store.getters.home_tab == 'competition', 'unathed': !$app.auth.check() }">
                <competition/>
            </div>

            <div id="quran-tab" class="page-content tab"
                 :class="{'tab-active' : $store.getters.home_tab == 'quran', 'black_mode': black_mode == 'black'}">
                <quran></quran>
            </div>

            <div id="search-tab" class="page-content tab" :class="{'tab-active' : $store.getters.home_tab == 'search'}">
                <search></search>
            </div>

            <div id="profile-tab" class="page-content tab"
                 :class="{'tab-active' :  $store.getters.home_tab == 'profile'}">
                <profile></profile>
            </div>

        </div>

    </div>


</template>

<script>

    export default {

        computed: {

            aya() {
                return this.$store.getters.aya;
            },

            quran: function () {
                return this.$store.getters.tabs.quran;
            },

            black_mode() {
                return this.$store.getters.color_theme;
            }

        },


        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue"),
            "options-toolbar": require("./partials/OptionsToolbar.vue"),
            // "quran": require("./Quran.vue"),
            "quran": require("./QuranTab/index.vue"),
            "search": require("./Search.vue"),
            "profile": require("./MyProfile.vue"),
            "khatima-tab": require("./KhatimaTab.vue"),
            "login": require("./Login.vue"),
            "competition": require("./ContestTab/index.vue")
        },
        mounted() {
            // this.$$('.tab').on('tab:show', function () {
            //     console.log('event test');
            // })
        }
    }

</script>
