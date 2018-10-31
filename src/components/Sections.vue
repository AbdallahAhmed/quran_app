<template>

    <f7-page :class="'page-sections no-toolbar'">

        <navbar>
            <template slot="left">
                <a href="" class="link back navbar-back">
                    <i class="f7-icons">arrow_left</i>
                </a>
            </template>
        </navbar>

        <div class="loader-wrapper" v-if="loading">
            <div class="preloader color-green"></div>
        </div>

        <div class="section-wrapper" id="main-scrollable" v-if="juz_sections" :hidden="loading">
            <div class="row no-gap">
                <div class="col-15 number-list">
                    <a href="javascript:void(0)" @click="scrollTo(number+1,$event)" :id="number"
                       v-for="number in Array.from({length: 30}, (_, id) => (id))"
                       v-text="(number+1)%5==0||number==0?number+1:'.'" :key="number"></a>
                </div>
                <div class="col-85 juz-list " v-if="juz_sections">

                    <div class="juz-wrapper" v-for="(juz,index) in juz_sections" :key="juz.name_en">
                        <h2 class="juz-title">{{ lang=="ar"?juz.name_ar:juz.name_en}}</h2>
                        <div class="juz-content">

                            <div class="swiper-container-juz">
                                <div class="swiper-wrapper swiper-slide-surah-card">

                                    <div class="swiper-slide" v-for="surah in juz.swar">
                                        <a class="surah-card">
                                            <a class="surah-title link" :href="'/home/quran/'+ surah.id + '/' + index">
                                                {{surah.id}}.&nbsp;&nbsp; {{lang=="en"?
                                                surah.englishname:surah.name.split('سورة')[1]}}
                                            </a>

                                            <div class="surah-info">
                                                <span>{{$app.trans('number_ayat')}} {{surah.numberOfAyats}}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </f7-page>

</template>

<style>
</style>

<script>
    import {mapState} from "vuex";

    export default {
        created() {

        },
        data() {
            return {
                prev: 0,
                loading: true,
                juz_sections: false,
            };
        },
        methods: {
            scrollTo(index, event) {
                this.$$(".section-wrapper#main-scrollable").scrollTop(
                    this.$$(".juz-wrapper:nth-child(" + index + ")").offset().top -
                    57 +
                    this.$$(".section-wrapper#main-scrollable").scrollTop(),
                    1000
                );

            },
        },
        components: {
            navbar: require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        },
        computed: {
            lang() {
                return this.$store.getters.locale;
            }
        },
        mounted() {
            this.$store.dispatch("get_juz_section").then(() => {
                this.juz_sections = this.$store.getters.juz_sections;
                this.loading = false;
            }).then(() => {
                var swiper = this.$f7.swiper.create(".swiper-container-juz", {
                    spaceBetween: 0,
                    slidesPerView: 1.5
                });
            });
        }
    }
</script>


<style scoped>
    .juz-title {
    }
</style>
