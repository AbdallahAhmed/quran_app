<template>

    <div>

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
                           :class="{active: isActivated(aya)}">
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
    }


</style>

<script>

    import Vue from 'vue';

    export default {

        computed: {
            aya() {
                return this.$store.getters.aya;
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

            this.$store.dispatch("get_sura", sura_id).then((response) => {
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


    }

</script>
