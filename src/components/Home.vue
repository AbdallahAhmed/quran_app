<template>

    <f7-page :class="'navbar-fixed'">

        <navbar></navbar>
        <main-toolbar v-if="!active"></main-toolbar>
        <options-toolbar v-if="active"></options-toolbar>

        <div class="quran-head">

            <!--<div class="page-title"> lfsagsdg </div>-->

            <div class="sura-header">

                <a href="/sections" class="sura-name link">

                    <img src="../assets/img/arrow-down.png" class="sura-name-arrow">

                    سورة الكهف

                </a>

            </div>


            <div class="sura-stats row">

                <a class="col-50 sura-ayat-count link">
                    أياتها ٥
                </a>

                <a class="col-50 sura-part-num link">
                    الجزء الأول

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

                    <span class="quran-aya" v-for="i in 40" @click="activate(i)" :class="{active: isActivated(i)}">
                        إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
                       <span class="quran-aya-separator"></span>
                        <span class="aya-num">12</span>
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
                active: 0
            }
        },


        methods: {
            activate(i) {
                if (this.active == i) {
                    this.active = 0;
                } else {
                    this.active = i;
                }

            },

            isActivated(i) {
                return i == this.active;
            }
        },

        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue"),
            "options-toolbar": require("./partials/OptionsToolbar.vue")
        }
    }

</script>
