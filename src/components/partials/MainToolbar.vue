<template>


    <f7-toolbar bottom-md no-shadow>

        <f7-link @click="home_tab = 'khatima'" :class="{'tab-link-active': $store.getters.home_tab == 'khatima' }">
            <img src="../../assets/img/trend.png" alt="">
        </f7-link>

        <f7-link class="link" @click="home_tab = 'competition'" :class="{'tab-link-active': $store.getters.home_tab == 'competition' }">
            <img src="../../assets/img/cup.png" alt="">
        </f7-link>

        <f7-link @click="home_tab = 'quran'" :class="{'tab-link-active': $store.getters.home_tab == 'quran' }">
            <img class="main-image" src="../../assets/img/quran.png" alt="">
        </f7-link>

        <f7-link @click="home_tab = 'search'" :class="{'tab-link-active': $store.getters.home_tab == 'search' }">
            <img src="../../assets/img/search.png" alt="">
        </f7-link>

        <f7-link @click="home_tab = 'profile'" :class="{'tab-link-active': $store.getters.home_tab == 'profile' }">
            <img :src="$store.getters.user.photo?$store.getters.user-avater.photo.thumbnail:'user-avater.png'" class="user-avater user-avater-tab" style="width: 30px;border: 3px solid green;" alt=""/>
        </f7-link>
    </f7-toolbar>


</template>


<style scoped>

    a.link {

        height: 100% !important;
        width: 100%;
    }

    a.link.tab-link-active {
        background: #f5f5f5;
    }

</style>


<script>

    export default {

        computed: {

            home_tab: {
                get: function () {
                    this.$store.getters.home_tab;
                },
                set: function (value) {
                    this.$store.commit("home_tab", value);
                }
            }
        },

        methods: {
            soon() {
                this.$f7.dialog.alert("Comming soon", 'Quran');
            }
        }
    }

</script>
