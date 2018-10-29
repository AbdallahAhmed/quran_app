<template>

    <div>
        <navbar></navbar>

        <scroller :on-infinite="down" :on-refresh="up" refresh-text="">
            <sura v-for="sura in suras" :sura="sura"></sura>
        </scroller>

    </div>

</template>

<script>

    import Vue from 'vue';

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

        created() {

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

            up(done) {

                this.$store.commit("LOADER", true);

                this.$store.dispatch("get_sura", {surah_id: this.getPrevId()}).then((response) => {

                    this.suras = [response.data.data].concat(this.suras);

                    this.$store.commit("LOADER", false);

                    done();

                });

            },

            down(done) {

                if (this.suras.length) {

                    this.$store.commit("LOADER", true);

                    this.$store.dispatch("get_sura", {surah_id: this.getNextId()}).then((response) => {

                        this.suras.push(response.data.data);

                        // this.Dom7('.page-content').scrollTop(0, 300);

                        this.$store.commit("LOADER", false);

                        done();

                    });

                }


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
            "sura": require("./partials/Sura.vue")
        }


    }

</script>

<style>
    ._v-container {
        margin-top: 50px
    }
</style>

