<template>

    <div>

        <navbar></navbar>

        <div class="center quran-loader" v-if="!suras.length">
            <f7-preloader class="color-green"></f7-preloader>
        </div>

        <div class="scroll-area">

            <vue-scroll ref="quran" @refresh-start="getPrevSura" @load-start="getNextSura">

                <sura v-for="sura in suras" :sura="sura"></sura>

            </vue-scroll>

        </div>

    </div>


</template>

<script>

    export default {

        data() {
            return {
                suras: [],
                sura_id: 0
            }
        },

        computed: {
            sura() {
                return this.$store.getters.sura;
            }
        },

        mounted() {

            let sura_id = parseInt(this.$f7route.params.sura_id || this.sura.id || 1);
            let part_id = this.$f7route.params.part_id;

            this.$store.dispatch("get_sura", {surah_id: sura_id}).then((response) => {

                this.suras = [response.data.data];

                console.log(response.data.data);

                if (part_id) {

                    setTimeout(() => {

                        if (response.data.data.juz_id != part_id) {
                            this.$refs['quran'].scrollTo({
                                x: 0,
                                y: this.Dom7("[part='" + part_id + "']").eq(0).offset().top
                            });
                        }

                    });

                }
            });

        },

        methods: {

            getNextSura(x, y, done) {

                let next_id = this.getNextId();

                if (next_id > 114) {
                    return done();
                }

                if (this.suras.length) {

                    this.$store.dispatch("get_sura", {surah_id: this.getNextId()}).then((response) => {

                        this.suras.push(response.data.data);

                        done();

                    });

                }
            },

            getPrevSura(x, y, done) {

                let prev_id = this.getPrevId();

                if (prev_id <= 0) {
                    return done();
                }

                this.$store.dispatch("get_sura", {surah_id: prev_id}).then((response) => {

                    this.suras = [response.data.data].concat(this.suras);

                    done();

                });
            },


            getNextId() {
                return this.suras[this.suras.length - 1].id + 1;
            },

            getPrevId() {
                return this.suras[0].id - 1;
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

</style>
