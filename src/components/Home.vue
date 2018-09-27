<template>

    <f7-page :class="'navbar-fixed'">

        <navbar></navbar>

        <main-toolbar v-if="!active"></main-toolbar>

        <options-toolbar v-if="active || aya == {}" :aya="aya" @close="close"></options-toolbar>

        <div class="quran-head">

            <!--<div class="page-title"> lfsagsdg </div>-->

            <div class="sura-header">

                <a href="/sections" class="sura-name link">

                    <img src="../assets/img/arrow-down.png" class="sura-name-arrow">
                    {{ sura.juz_name }}
                </a>

            </div>


            <div class="sura-stats row">

                <a class="col-50 sura-ayat-count link">
                    أياتها {{ sura.numberOfAyats }}
                </a>

                <a class="col-50 sura-part-num link">
                    {{ sura.name }}
                </a>

            </div>


        </div>


        <div class="page-content">

            <div class="quran-basmla">
                <a>
                    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </a>
            </div>

            <div class="block quran-sura">


                <span v-for="page in sura.pages">
                     <span v-for="aya of page" class="quran-aya" @click="activate(aya)" :class="{active: isActivated(aya)}">
                        {{ aya.text }}
                       <span class="quran-aya-separator"></span>
                        <span class="aya-num">{{ aya.numberinsurat }}</span>
                    </span>
                </span>


            </div>

        </div>


    </f7-page>

</template>

<style>


</style>

<script>

    import Vue from 'vue';

    export default {

        data() {
            return {
                sura: [],
                aya: {},
                active: 0
            }
        },


        mounted() {

            this.$store.dispatch("get_sura", 55).then((response) => {
                this.sura = response.data.data;
            });
        },


        methods: {

            activate(aya) {

                if (this.active != aya.number) {
                    this.aya = aya;
                    this.active = aya.number;
                } else {
                    this.active = 0;
                }

            },

            isActivated(aya) {
                return aya.number == this.active;
            },


            close() {
                this.active = 0;
                this.aya = {};
            }
        },

        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue"),
            "options-toolbar": require("./partials/OptionsToolbar.vue")
        }
    }

</script>
