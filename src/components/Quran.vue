<template>

    <div>

        <navbar></navbar>

        <div class="scroll-area">

            <vue-scroll
                @refresh-start="getPrevSura"
                @load-start="getNextSura">

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
            this.sura_id = parseInt(this.$f7route.params.sura_id || this.sura.id || 1);
            this.load(this.sura_id);
        },

        methods: {

            load(id) {

                this.$store.commit("LOADER", true);

                this.$store.dispatch("get_sura", {surah_id: id}).then((response) => {
                    this.suras = [response.data.data];
                    this.$store.commit("LOADER", false);
                });

            },

            getNextSura(x, y, done) {

                if (this.suras.length) {

                    this.$store.commit("LOADER", true);

                    this.$store.dispatch("get_sura", {surah_id: this.getNextId()}).then((response) => {

                        this.suras.push(response.data.data);

                        this.$store.commit("LOADER", false);

                        done();

                    });

                }
            },

            getPrevSura(x, y, done) {

                this.$store.commit("LOADER", true);

                this.$store.dispatch("get_sura", {surah_id: this.getPrevId()}).then((response) => {

                    this.suras = [response.data.data].concat(this.suras);

                    this.$f7.ptr.done();

                    this.$store.commit("LOADER", false);

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
            "navbar": require("./partials/Navbar.vue"),
            "sura": require("./partials/Sura.vue"),
            "test": require("./partials/Test.vue"),
        }
    }

</script>

<style>

    .scroll-area {
        height: 36rem;
        overflow: auto;
    }

</style>
