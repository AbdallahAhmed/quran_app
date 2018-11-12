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

        <div class="center quran-loader" v-if="loading">
            <f7-preloader class="color-green"></f7-preloader>
        </div>
        <div v-if="!loading" class="sura-stats row rollIn">

            <a class="sura-ayat-count link">
                <span> {{ sura&&sura.numberOfAyats }} </span>
                {{$app.trans('his_aya')}}
            </a>

            <a href="/sections" class="sura-part-num link">
                {{ sura&& ($store.getters.locale=="ar") ? sura.name : sura.englishname}}
            </a>
            <a href="/sections" class="sura-part-num">
                {{ part&& ($store.getters.locale=="ar") ? part.name_ar:part.name_en}}
            </a>

        </div>
        <div class="scroll-area">
            <div class="quran-head" v-if="sura">

                <!-- <div class="sura-header">

                            <a href="/sections" class="sura-name link bounceIn">
                                <img src="../../assets/img/arrow-down.png" class="sura-name-arrow">
                                {{ $store.getters.locale=="ar"? sura.juz_name:sura.juz_name_en }}
                            </a>

                        </div> -->

            </div>
            <vue-scroll ref="quran" @handle-scroll-complete="handeScroll" @refresh-start="getPrevSura"
                        @load-start="getNextSura">

                <div class="page-content">

                    <div class="block quran-sura">

                        <page v-for="(page, i) in pages" :page="page" :key="page[0].page_id" :id="page[0].page_id">
                            <aya v-for="aya in page" :aya_row="aya" :key="aya.id" :surah="get_surah(aya.surat_id)">
                                <div class="quran-basmla"
                                     v-if="aya.numberinsurat==1||(aya.surat_id==1&&aya.numberinsurat==2)">
                                    <a v-if="(aya.surat_id !== 9)">
                                        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                                    </a>
                                </div>
                            </aya>
                            <!-- <hr> -->
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
                loading: true
            };
        },

        computed: {
            last_sura() {
                return this.$store.getters.last_sura;
            },
            last_page() {
                return this.$store.getters.last_page;
            },
            sura() {
                return (
                    this.get_surah(this.$f7route.params.sura_id) ||
                    this.get_surah(this.$store.getters.last_sura)
                );
            },
            part() {
                return this.$store.getters.last_part;
            }
        },
        watch: {
            last_sura(val) {
                this.$f7route.params.sura_id = val;
            }
        },
        created() {
            this.last_saved_sura = this.last_sura;
            this.last_saved_page = this.last_page;
            this.last_saved_scroll = this.$store.getters.scroll;
        },
        mounted() {
            let page = this.last_saved_page;
            let scroll = this.last_saved_scroll;
            let sura_id = parseInt(
                this.$f7route.params.sura_id || this.last_saved_sura || 1
            );
            let part_id = this.$f7route.params.part_id;
            Promise.all([this.$store.dispatch("get_juz_section"),

                this.$store
                    .dispatch("get_sura", {surah_id: sura_id})
                    .then(response => {
                        this.suras = [response.data.data];

                        for (let page in response.data.data.pages) {
                            this.pages.push(response.data.data.pages[page]);
                        }

                        setTimeout(() => {
                            if (part_id && response.data.data.juz_id != part_id) {
                                this.$refs["quran"].scrollTo({
                                    x: 0,
                                    y:
                                        this.Dom7("[part='" + part_id + "']")
                                            .eq(0)
                                            .offset().top - 160
                                });
                            } else {
                                this.$refs["quran"].scrollTo({
                                    x: 0,
                                    y:
                                        this.Dom7("#page-" + page)
                                            .eq(0)
                                            .offset().top - 50
                                });
                            }
                        }, 2000);
                    })]
            ).then(()=>{
                this.loading = false;
            }).catch(err=> console.log(err));
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
                        this.$store
                            .dispatch("get_sura", {surah_id: next_id})
                            .then(response => {
                                this.suras.push(response.data.data);
                                for (let page in response.data.data.pages) {
                                    this.pages.push(response.data.data.pages[page]);
                                }
                                done();
                                this.blocking = false;
                            });
                    }
                }
                done();
            },

            getPrevSura(x, y, done) {
                if (!this.blocking) {
                    let prev_id = this.getPrevId();
                    if (prev_id <= 0) {
                        this.$store.commit("LAST_PAGE", 1);
                        return done();
                    }

                    this.blocking = true;
                    this.$store
                        .dispatch("get_sura", {surah_id: prev_id})
                        .then(response => {
                            this.suras = [response.data.data].concat(this.suras);
                            var temp_pages = Object.values(response.data.data.pages).reverse();

                            for (let page of temp_pages) {
                                this.pages.unshift(page);
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
                return this.suras.find(surh => {
                    return surh.id == id;
                });
            }
        },

        components: {
            navbar: require("./../partials/Navbar.vue"),
            sura: require("./../partials/Sura.vue"),
            page: require("../partials/Page.vue"),
            aya: require("../partials/aya.vue")
        }
    };
</script>

<style>
    .scroll-area {
        height: calc(100vh - 100px);
        /* padding-bottom: 80px; */
        overflow: auto;
    }

    .quran-loader {
        margin: 50px 0;
    }

    .__refresh,
    .__load {
        margin: 30px 0;
    }

    #page-1 {
        height: 100vh;
    }

    .quran-sura > span {
        display: block;
        direction: rtl;
    }

    .empty-gap {
        width: 100%;
        height: 70px;
    }
</style>

<style scoped>
    .sura-stats a {
        flex: 1;
    }

    @media screen and (max-width: 500px) {
        .sura-stats a:not(:last-of-type) {
            flex: initial;
            padding: 0 15px;
        }
    }
</style>
