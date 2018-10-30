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

                <page v-for="page in sura.pages" :page="page" :id="page[0].page_id" v-if="sura">
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
            }
        },


        mounted() {

            inView("#sura-" + this.sura.id)
                .on("enter", (el) => {
                    this.$store.commit("LAST_SURA", this.sura.id);
                });

        },


        methods: {


            isElementVisible(el) {
                var rect = el.getBoundingClientRect(),
                    vWidth = window.innerWidth || doc.documentElement.clientWidth,
                    vHeight = window.innerHeight || doc.documentElement.clientHeight,
                    efp = function (x, y) {
                        return document.elementFromPoint(x, y)
                    };

                // Return false if it's not in the viewport
                if (rect.right < 0 || rect.bottom < 0
                    || rect.left > vWidth || rect.top > vHeight)
                    return false;

                // Return true if any of its four corners are visible
                return (
                    el.contains(efp(rect.left, rect.top))
                    || el.contains(efp(rect.right, rect.top))
                    || el.contains(efp(rect.right, rect.bottom))
                    || el.contains(efp(rect.left, rect.bottom))
                );
            }
        },

        components: {
            "page": require("../partials/Page.vue"),
            "aya": require("../partials/aya.vue")
        }
    }
</script>
