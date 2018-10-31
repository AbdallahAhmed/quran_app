<template>

    <div :id="'sura-' + sura.id">

        <div class="quran-head" v-if="sura">

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

                <page v-for="(page, i) in sura.pages" :page="page" :id="page[0].page_id" v-if="sura">
                    <aya v-for="aya in page" :aya_row="aya"></aya>
                </page>

            </div>

        </div>

    </div>

</template>

<script>

    import inView from 'in-view';
    import EventBus from "../../events";

    export default {

        name: "Sura",

        props: ["sura"],

        computed: {

            last_sura() {
                return this.$store.getters.last_sura;
            },

            page() {
                return this.$store.getters.page;
            }
        },


        mounted() {

            EventBus.$on("vscroll", () => {

                console.log("Ddf");

                if(inView("#sura-" + this.sura.id).check()){
                    this.$store.commit("LAST_SURA", this.sura.id);
                }
            });

        },


        components: {
            "page": require("../partials/Page.vue"),
            "aya": require("../partials/aya.vue")
        }
    }
</script>
