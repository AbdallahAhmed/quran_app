<template>

    <div>

        <navbar></navbar>

        <div class="quran-head" v-if="sura">

            <!--<div class="page-title"> lfsagsdg </div>-->

            <div class="sura-header">

                <a href="/sections" class="sura-name link bounceIn">

                    <img src="../assets/img/arrow-down.png" class="sura-name-arrow">
                    {{ sura.juz_name }}

                </a>

            </div>


            <div class="sura-stats row rollIn">

                <a class="col-50 sura-ayat-count link">
                    <span> {{ sura.numberOfAyats }} </span>
                    أياتها
                </a>

                <a href="/sections" class="col-50 sura-part-num link">
                    {{ sura.name }}
                </a>

            </div>

        </div>


        <div class="page-content">


            <div class="loader-wrapper" v-if="!sura">
                <div class="preloader color-green"></div>
            </div>


            <div class="quran-basmla" v-if="sura">
                <a>
                    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </a>
            </div>

            <div class="block quran-sura" v-if="sura">

                <span v-for="page in sura.pages">
                     <span v-for="aya of page" class="quran-aya bounceIn" @click="activate(aya)"
                           :class="{active: isActivated(aya)}" :style="{ 'font-size': font_size + 'px' }">
                        {{ aya.text }}

                         <span class="aya-num">  ﴿ {{ aya.numberinsurat }} ﴾ </span>

                     </span>

                </span>


            </div>

        </div>


    </div>

</template>

<style>

    .loader-wrapper {
        text-align: center;
        margin-top: 30px;
    }

    .black_mode .page-content{
        background: #000000;
    }

    .black_mode .quran-aya{
        color: #ffffff;
    }

    .black_mode .quran-head{
        background: #000000;
    }

    .black_mode .quran-navbar{
        background: #000000 !important;
    }

    .black_mode .navbar-logo{
        background: #000000;
    }

    .black_mode{
        background: #000000 !important;
    }

    #quran-tab{
        padding-bottom: 0;
    }


</style>

<script>

    import Vue from 'vue';

    export default {

        computed: {
            aya() {
                return this.$store.getters.aya;
            },

            font_size(){
                return this.$store.getters.font_size;
            }
        },

        data() {
            return {
                sura: false,
                active: 0
            }
        },

        mounted() {

            let sura_id = this.$f7route.params.sura_id || 1;

            this.$store.dispatch("get_sura", {surah_id: sura_id}).then((response) => {
                this.sura = response.data.data;
            });
        },


        events: {
            close: function () {

                this.active = 0;
                this.$store.commit("AYA", false);
            }
        },


        methods: {

            activate(aya) {

                if (this.active != aya.number) {
                    this.active = aya.number;
                    this.$store.commit("AYA", aya);
                } else {
                    this.active = 0;
                    this.$store.commit("AYA", false);
                }

            },

            isActivated(aya) {
                return aya.number == this.active;
            },

            close() {
                this.active = 0;
                this.$store.commit("AYA", false);
            }
        },

        components: {
            "navbar": require("./partials/Navbar.vue")
        },



    }

</script>
