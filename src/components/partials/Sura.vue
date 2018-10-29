<template>

    <div>

        <div class="quran-head" :id="'sura-' + sura.id" v-if="sura">

            <div class="sura-header">

                <a href="/sections" class="sura-name link bounceIn">
                    <img src="../../assets/img/arrow-down.png" class="sura-name-arrow">
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

            <div class="quran-basmla" v-if="sura && sura.id !== 9">
                <a>
                    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </a>
            </div>

            <div class="block quran-sura">

                <page v-for="page in pages" :page="page" :id="page[0].page_id" v-if="sura">
                    <aya v-for="aya in page" :aya_row="aya"></aya>
                </page>

            </div>

        </div>

    </div>

</template>

<script>

    import inView from 'in-view';

    export default {

        name: "Sura",

        props: ["sura"],

        computed: {

            last_sura() {
                return this.$store.getters.last_sura;
            },

            page() {
                return this.$store.getters.page;
            },

            pages() {
                return this.sura.pages;
            }
        },


        mounted() {

            // inView("#sura-" + this.sura.id)
            //     .on("enter", () => {
            //         this.$store.commit("LAST_SURA", this.sura.id);
            //         this.$store.commit("SURA", this.sura);
            //     });

        },

        components: {
            "page": require("../partials/Page.vue"),
            "aya": require("../partials/aya.vue")
        }
    }
</script>
