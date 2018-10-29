<template>

    <div class="page page-fav " data-page="fav">

        <navbar>
            <template slot="left">
                <a href="" class="link back navbar-back">
                    <i class="f7-icons">arrow_left</i>
                </a>
            </template>
        </navbar>

        <div class="page-content" style="direction: rtl">
            <div class="row page-setting-nav">
                <div class="col-100">
                    <p>آياتي المفضلة</p>
                </div>
            </div>

            <div class="page-container">
                <div class="fav-aya-list">

                    <div class="fav-aya-item" v-for="aya in saved_ayat" :key="aya.id">
                        <div class="title">
                            <a  class="delete-aya" @click="removeAya(aya.id)">
                                <i class="f7-icons">close</i>
                            </a>
                            <a class="surah" v-if="aya.surah" :href="'/home/quran/'+aya.surat_id">
                                {{aya.surah.name}}
                            </a>
                        </div>
                        <div class="content">
                            <p>{{aya.text}}</p>
                        </div>
                    </div>
                    <p class="no-found" v-if="saved_ayat.length==0">لا يوجد آيات </p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {

        mounted() {

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
                this.$f7.dialog.confirm('هل تريد حذف الآية ؟', () => {
                    this.$store.dispatch('remove_saved_aya',id)
                });
            }
        },

        components: {
            navbar: require("./partials/Navbar.vue")
        }
    }

</script>
