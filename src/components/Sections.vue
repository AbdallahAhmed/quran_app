<template>

    <f7-page :class="'navbar-fixed page-sections'">

        <navbar class="nav-shadow"></navbar>

        <main-toolbar></main-toolbar>


        <div class="section-wrapper">
            <div class="row no-gap">
                <div class="col-15 number-list">
                    <a href="javascript:void(0)" @click="scrollTo(number+1)" :id="number"
                       v-for="number in Array.from({length: 30}, (_, id) => (id))"
                       v-text="(number+1)%5==0||number==0?number+1:'.'" :key="number"></a>
                </div>
                <div class="col-85 juz-list " v-if="juz_sections.length!=0">

                    <div class="juz-wrapper" v-for="(juz,index) in juz_sections" :key="juz.name_ar">
                        <h2 class="juz-title">{{juz.name_ar}}</h2>
                        <div class="juz-content">

                            <div data-space-between="0" data-slides-per-view="1.5" class="swiper-container ">
                                <div class="swiper-wrapper swiper-slide-surah-card">

                                    <div class="swiper-slide" v-for="surah in juz.swar">
                                        <a class="surah-card">
                                            <div class="surah-title">
                                                {{surah.id}} {{surah.name.split('سورة')[1]}}
                                            </div>
                                            <div class="surah-info">
                                                <span>عدد الايات  {{surah.numberOfAyats}}</span>
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

    import {mapState} from 'vuex';

    export default {
        created() {
            this.$store.dispatch('get_juz_section').then(() => {
                console.log('tets')
                var swiper = this.$f7.swiper.create('.swiper-container', {
                    spaceBetween: 0,
                    slidesPerView: 1.5
                });
            })
        },
        data() {
            return {
                prev: 0
            };
        },
        methods: {
            scrollTo(index) {
                this.$$('.section-wrapper').scrollTop(
                    this.$$('.juz-wrapper:nth-child(' + index + ')').offset().top-57+
                    this.$$('.section-wrapper').scrollTop(),
                    1000
                )
            }
        },
        computed: {
            juz_sections() {
                return this.$store.getters.juz_sections
            }
        },
        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        }
    }

</script>

