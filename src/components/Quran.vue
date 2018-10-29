<template>

    <div>

        <navbar></navbar>

        <div v-infinite-scroll="getNextSuras" class="ptr-content" data-ptr-distance="55">

            <div class="ptr-preloader">
                <div class="preloader"></div>
                <div class="ptr-arrow"></div>
            </div>

            <sura v-for="sura in suras" :sura="sura"></sura>

        </div>

    </div>

</template>

<script>

    import Vue from 'vue';
    import PullTo from 'vue-pull-to';

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

            this.Dom7('.ptr-content').on('ptr:refresh', () => {

                this.$store.commit("LOADER", true);

                this.$store.dispatch("get_sura", {surah_id: this.getPrevId()}).then((response) => {

                    this.suras = [response.data.data].concat(this.suras);

                    this.$f7.ptr.done();

                    this.$store.commit("LOADER", false);

                });
            });

        },

        methods: {

            load(id) {

                this.$store.commit("LOADER", true);

                this.$store.dispatch("get_sura", {surah_id: id}).then((response) => {
                    this.suras = [response.data.data];
                    this.$store.commit("LOADER", false);
                });

            },

            getNextSuras() {

                if (this.suras.length) {

                    this.$store.commit("LOADER", true);

                    this.$store.dispatch("get_sura", {surah_id: this.getNextId()}).then((response) => {

                        //this.suras = [response.data.data];

                        this.suras.push(response.data.data);

                        // this.Dom7('.page-content').scrollTop(0, 300);

                        this.$store.commit("LOADER", false);


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
            "sura": require("./partials/Sura.vue"),
            "test": require("./partials/Test.vue"),
        }
    }

</script>


<style scoped>
    .loading-bar {
        height: 40px;
        text-align: center;
        line-height: 40px;
    }

    .icon-loading {
        transform: rotate(0deg);
        animation-name: loading;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    @keyframes loading {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
