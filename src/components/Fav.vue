<template>

    <div class="page page-fav " data-page="fav">

        <navbar></navbar>

        <div class="page-content" style="direction: rtl">
            <div class="row page-setting-nav">
                <div class="col-20">
                    <p>المفضله</p>
                </div>
                <div class="col-20 center">
                    <a class="back link"> <i class="f7-icons size-22 back-icon color-white">chevron_left</i> </a>
                </div>
            </div>

            <div class="page-container">
                <div class="fav-aya-list">
                    <div class="fav-aya-item" v-for=" aya in  saved_ayat" :key="aya.id">
                        <div class="title">
                            <a  class="delete-aya" @click="removeAya(aya.id)">
                                <i class="f7-icons">close</i>
                            </a>
                            <a class="surah" :href="'/home/quran/'+aya.surat_id">
                                {{aya.surah.name}}
                            </a>
                        </div>
                        <div class="content">
                            <p>{{aya.text}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {

        created() {
            this.$f7.preloader.show();
            this.$store.dispatch('get_saved_ayat').then((res) => {
                this.$f7.preloader.hide();
            }, () => {
                this.$f7.preloader.hide();
            });
        },
        computed: {

            saved_ayat: {
                get: function () {
                    return this.$store.getters.saved_ayat;
                }
            },

        },
        methods:{
            removeAya(id){
                this.$store.dispatch('remove_saved_aya',id).then((res) => {

                }, () => {

                });
            }
        },
        components: {
            navbar: require("./partials/Navbar.vue")
        },
        mounted() {

        }

    }

</script>
