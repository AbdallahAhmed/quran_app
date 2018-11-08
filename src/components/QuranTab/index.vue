<template>

    <div>

        <div class="quran-navbar row">

            <div class="col-30">
                <slot name="left"></slot>
            </div>

            <div class="col-40 center">
                <a href="/home/quran" class="navbar-logo">
                    <img src="../../assets/img/app-logo.png" alt="">
                </a>
            </div>

            <div class="col-30">
                <slot name="right"></slot>
            </div>
        </div>

        <div class="center quran-loader" v-if="!suras.length">
            <f7-preloader class="color-green"></f7-preloader>
        </div>

        <div class="scroll-area">
            <div class="quran-head" v-if="sura">

                <div class="sura-header">

                    <a href="/sections" class="sura-name link bounceIn">
                        <img src="../../assets/img/arrow-down.png" class="sura-name-arrow">
                        {{ $store.getters.locale=="ar"? sura.juz_name:sura.juz_name_en }}
                    </a>

                </div>

                <div class="sura-stats row rollIn">

                    <a class="col-50 sura-ayat-count link">
                        <span> {{ sura.numberOfAyats }} </span>
                        {{$app.trans('his_aya')}}
                    </a>

                    <a href="/sections" class="col-50 sura-part-num link">
                        {{ $store.getters.locale=="ar"? sura.name : sura.englishname}}
                    </a>

                </div>

            </div>
            <vue-scroll ref="quran" @handle-scroll-complete="handeScroll" @refresh-start="getPrevSura"
                        @load-start="getNextSura">

                <div class="page-content">

                    <div class="block quran-sura">

                        <page v-for="(page, i) in pages" :page="page" :key="page[0].page_id" :id="page[0].page_id">
                            <aya v-for="aya in page" :aya_row="aya" :key="aya.id" :surah="get_surah(aya.surat_id)">
                                <div class="quran-basmla" v-if="aya.numberinsurat==1||(aya.surat_id==1&&aya.numberinsurat==2)">
                                    <a>
                                        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                                    </a>
                                </div>
                            </aya>
                            <hr>
                        </page>

                    </div>

                </div>

            </vue-scroll>
        </div>

    </div>

</template>

<script>

    import EventBus from "./../../events.js";

    export default {

        data() {
            return {
                suras: [],
                sura_id: 0,
                blocking: false,
                pages: [],
            }
        },

        computed: {
            last_sura() {
                return this.$store.getters.last_sura;
            },
            last_page() {
                return this.$store.getters.last_page;
            },
            sura() {
                return this.get_surah(this.$store.getters.last_sura)
            }
        },

        mounted() {

            let page = this.$store.getters.last_page;
            let scroll = this.$store.getters.scroll;
            let sura_id = parseInt(this.$f7route.params.sura_id || this.last_sura || 1);
            let part_id = this.$f7route.params.part_id;

            this.$store.dispatch("get_sura", {surah_id: sura_id}).then((response) => {

                this.suras = [response.data.data];

                for (let page in response.data.data.pages) {
                    this.pages.push(response.data.data.pages[page])
                }


                setTimeout(() => {

                    if (part_id && response.data.data.juz_id != part_id) {

                        this.$refs['quran'].scrollTo({
                            x: 0,
                            y: this.Dom7("[part='" + part_id + "']").eq(0).offset().top-160
                        });
                    } else {

                        this.$refs['quran'].scrollTo({
                            x: 0,
                            y: scroll
                        });
                    }

                }, 2000);

            }).then(()=>{

                let page = this.$store.getters.last_page;
                this.$refs['quran'].scrollTo({
                    x: 0,
                    y: this.Dom7("#page-"+page).offset().top-160
                });
            });

        },

        methods: {

            getNextSura(x, y, done) {

                if (!this.blocking) {
                    let next_id = this.getNextId();
                    if (next_id > 114) {
                        return done();
                    }

                    if (this.suras.length) {

                        this.blocking = true;
                        this.$store.dispatch("get_sura", {surah_id: next_id}).then((response) => {

                            this.suras.push(response.data.data);
                            for (let page in response.data.data.pages) {
                                this.pages.push(response.data.data.pages[page])
                            }
                            done();
                            this.blocking = false;
                        });

                    }
                }
                done()
            },

            getPrevSura(x, y, done) {

                if (!this.blocking) {
                    let prev_id = this.getPrevId();
                    if (prev_id <= 0) {
                        this.$store.commit("LAST_PAGE", 1);
                        return done();
                    }

                    this.blocking = true;
                    this.$store.dispatch("get_sura", {surah_id: prev_id}).then((response) => {

                        this.suras = [response.data.data].concat(this.suras);
                        var temp_pages=Object.values(response.data.data.pages).reverse();

                        for (let page of temp_pages) {
                            this.pages.unshift(page)
                        }

                        // Saving last viewed page

                        this.$store.commit("LAST_SURA", response.data.data.id);

                        // Saving last viewed page

                        this.$store.commit("LAST_PAGE", response.data.data.page_id);

                        done();
                        this.blocking = false;

                    });
                }
            },


            getNextId() {
                return this.suras[this.suras.length - 1].id + 1;
            },

            getPrevId() {
                return this.suras[0].id - 1;
            },

            handeScroll(v) {
                this.$store.commit("SCROLL", v.scrollTop);
                EventBus.$emit("vscroll");
            },
            get_surah(id) {
                return this.suras.find((surh) => {
                    return surh.id == id;
                })
            }
        },

        components: {
            "navbar":
                require("./../partials/Navbar.vue"),
            "sura":
                require("./../partials/Sura.vue"),
            "page": require("../partials/Page.vue"),
            "aya": require("../partials/aya.vue")
        }
    }

</script>

<style>

    .scroll-area {
        height: 100vh;
        padding-bottom: 80px;
        overflow: auto;
    }

    .quran-loader {
        margin: 50px 0;
    }

    .__refresh, .__load {
        margin: 30px 0;
    }

    #page-1 {
        height: 100vh;
    }

    .quran-sura > span {
        display: block;
        direction: rtl;
    }
    .empty-gap{
        width: 100%;
        height: 70px;
    }
</style>
