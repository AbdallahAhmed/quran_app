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

            <div class="quran-basmla" v-if="sura">
                <a>
                    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </a>
            </div>

            <div class="block quran-sura">
                <quran-page v-for="page in pages" :page="page" v-if="sura">
                     <span v-for="aya in page" class="quran-aya" @click="activate(aya)"
                           :class="{active: isActivated(aya)}" :style="{ 'font-size': font_size + 'px' }">

                         {{ aya.text }}

                         <span class="aya-num">  ﴿ {{ aya.numberinsurat }} ﴾ </span>
                     </span>
                </quran-page>
            </div>

        </div>

    </div>

</template>

<script>

    import Vue from 'vue';


    export default {

        computed: {

            aya() {
                return this.$store.getters.aya;
            },

            font_size() {
                return this.$store.getters.font_size;
            },

            sura() {
                return this.$store.getters.sura;
            },

            page() {
                return this.$store.getters.page;
            },

            pages() {
                return this.$store.getters.pages;
            }

        },

        data() {
            return {
                active: 0
            }
        },

        mounted() {
            let sura_id = this.$f7route.params.sura_id || this.sura.id || 1;

            if (this.Dom7('.page-' + this.page).length) {
                //  alert("scrolling..");
                this.Dom7('.page-content').scrollTop(this.Dom7('.page-' + this.page).offset().top, 300);
            }

            this.$store.dispatch("get_sura", {surah_id: sura_id}).then((response) => {

                this.$store.commit("SURA", response.data.data);

                // Increment views

                setTimeout(() => {
                    this.$store.dispatch("read_page", this.$store.getters.page);
                }, 5000);
            });

            this.Dom7('.page-content').on('scroll', (e) => {

                var elem = this.Dom7(e.currentTarget);

                if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()) {

                    // Increment page

                    this.$store.commit("PAGE", this.$store.getters.page + 1);

                    setTimeout(() => {
                        this.$store.dispatch("read_page", this.$store.getters.page);
                    }, 5000);
                }
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
                    aya.surah = this.sura;
                    delete aya.surah.pages;
                    this.$store.commit("AYA", aya);
                } else {
                    this.active = 0;
                    this.$store.commit("AYA", false);
                }

            },


            isActivated(aya) {
                return aya.number == this.active && this.aya;
            },


        },

        beforeRouteLeave(to, from, next) {
        },

        components: {
            "navbar": require("./partials/Navbar.vue"),
            "quran-page": require("./partials/QuranPage.vue")
        }


    }

</script>
