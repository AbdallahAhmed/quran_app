<template>

    <div>

        <navbar></navbar>

        <div class="center quran-loader" v-if="!suras.length">
            <f7-preloader class="color-green"></f7-preloader>
        </div>

        <div class="scroll-area">
            <vue-scroll ref="quran" @handle-scroll-complete="handeScroll" @refresh-start="getPrevSura"
                        @load-start="getNextSura">
                <sura v-for="sura in suras" :sura="sura" :key="sura.id"></sura>
            </vue-scroll>
        </div>

    </div>

</template>

<script>

    import EventBus from "../events";


    export default {

        data() {
            return {
                suras: [],
                sura_id: 0,
                blocking: false,
            }
        },

        computed: {
            last_sura() {
                return this.$store.getters.last_sura;
            },
            last_page() {
                return this.$store.getters.last_page;
            },
        },

        mounted() {

            let page = this.$store.getters.last_page;
            let scroll = this.$store.getters.scroll;
            let sura_id = parseInt(this.$f7route.params.sura_id || this.last_sura || 1);
            let part_id = this.$f7route.params.part_id;

            this.$store.dispatch("get_sura", {surah_id: sura_id}).then((response) => {

                this.suras = [response.data.data];

                setTimeout(() => {

                    if (part_id && response.data.data.juz_id != part_id) {

                        this.$refs['quran'].scrollTo({
                            x: 0,
                            y: this.Dom7("[part='" + part_id + "']").eq(0).offset().top
                        });
                    } else {

                        this.$refs['quran'].scrollTo({
                            x: 0,
                            y: scroll
                        });
                    }

                }, 2000);


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
                        return done();
                    }

                    this.blocking=true;
                    this.$store.dispatch("get_sura", {surah_id: prev_id}).then((response) => {

                        this.suras = [response.data.data].concat(this.suras);

                        // Saving last viewed page

                        this.$store.commit("LAST_SURA", response.data.data.id);

                        // Saving last viewed page

                        this.$store.commit("LAST_PAGE", response.data.data.page_id);

                        done();
                        this.blocking=false;

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
            }
        },

        components: {
            "navbar":
                require("./partials/Navbar.vue"),
            "sura":
                require("./partials/Sura.vue"),
            "test":
                require("./partials/Test.vue"),
        }
    }

</script>

<style>

    .scroll-area {
        height: 36rem;
        overflow: auto;
    }

    .quran-loader {
        margin: 50px 0;
    }

    .__refresh, .__load {
        margin: 30px 0;
    }

</style>
