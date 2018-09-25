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

                    سورة الكهف

                </a>

            </div>


            <div class="sura-stats row">

                <a class="col-50 sura-ayat-count link">
                    أياتها {{ sura.length }}
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

                    <span v-for="aya in sura" class="quran-aya"  @click="activate(aya)" :class="{active: isActivated(aya)}">
                        {{ aya.text }}
                       <span class="quran-aya-separator"></span>
                        <span class="aya-num">{{ aya.numberinsurat }}</span>
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

            this.$store.dispatch("get_sura", 1).then((response) => {
                this.sura = response.data.data.slice(0);

                console.log(this.sura);
            });
        },


        methods: {

            activate(aya) {

                if (this.active != aya.number) {
                    this.aya = aya;
                    this.active = aya.number;
                }else{
                    this.active = 0;
                }

            },

            isActivated(aya) {
                return aya.number == this.active;
            },


            close(){
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
