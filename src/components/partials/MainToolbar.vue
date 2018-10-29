<template>


    <f7-toolbar bottom-md no-shadow>

        <f7-link class="link bg-white" @click="home_tab = 'khatima'"
                 :class="{'tab-link-active': $store.getters.home_tab == 'khatima' }">
            <img src="../../assets/img/trend.png" alt="">
        </f7-link>

        <f7-link class="link bg-white" @click="home_tab = 'competition'"
                 :class="{'tab-link-active': $store.getters.home_tab == 'competition' }">
            <img src="../../assets/img/cup.png" alt="">
        </f7-link>

        <f7-link @click="home_tab = 'quran'">

            <span href="#" class="btn-main" :class="{loader: loader}">
                <img class="main-image" src="../../assets/img/mos7af.png" alt="">
            </span>

        </f7-link>

        <f7-link class="link bg-white" @click="home_tab = 'search'"
                 :class="{'tab-link-active': $store.getters.home_tab == 'search' }">
            <img src="../../assets/img/search.png" alt="">
        </f7-link>

        <f7-link class="link bg-white" @click="home_tab = 'profile'"
                 :class="{'tab-link-active': $store.getters.home_tab == 'profile' }">
            <img :src="$store.getters.user.photo?$store.getters.user-avater.photo.thumbnail:'user-avater.png'"
                 class="user-avater user-avater-tab" style="width: 30px;border: 3px solid green;" alt=""/>
        </f7-link>
    </f7-toolbar>


</template>


<style scoped>

    .btn-main {
        color: #F6C625 !important;
        background: #207249;
        border-radius: 60px;
        display: block;
        width: 60px;
        height: 60px;
        position: relative;
        top: -32px;
        text-align: center;
        line-height: 90px;
    }

    .btn-main img {
        width: 40px;
    }

    a.link {

        height: 100% !important;
        width: 68px;
    }

    a.link.tab-link-active {
        background: #f5f5f5;
    }

    .loader {
        animation: rotation 0.7s infinite linear;
    }

    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
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
            },


            loader: {
                get: function () {
                    return this.$store.getters.loader;
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
