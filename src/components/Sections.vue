<template>

    <f7-page :class="'navbar-fixed'">

        <navbar class="nav-shadow"></navbar>

        <main-toolbar></main-toolbar>


        <div class="page-content">
            <div class="section-wrapper">
                <div class="row no-gap">
                    <div class="col-15 number-list">
                        <a href="javascript:void(0)" v-for="number in Array.from({length: 30}, (_, id) => (id))"
                           v-text="(number+1)%5==0||number==0?number+1:'.'" :key="number"></a>
                    </div>
                    <div class="col-85 juz-list">
                        <div class="juz-wrapper">
                            <h2 class="juz-title">الجزء الاول</h2>
                            <div class="juz-content">

                                <div  data-space-between="0" data-slides-per-view="1.5" class="swiper-container swiper-init">
                                    <div class="swiper-wrapper swiper-slide-surah-card" >
                                        <div class="swiper-slide">
                                            <a class="surah-card">
                                                <div class="surah-title">
                                                    1.0 الفاتحة
                                                </div>
                                                <div class="surah-info">
                                                    <span>عدد الايات  15</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="swiper-slide">
                                            <a class="surah-card">
                                                <div class="surah-title">
                                                    1.0 الفاتحة
                                                </div>
                                                <div class="surah-info">
                                                    <span>عدد الايات  15</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="swiper-slide">
                                            <a class="surah-card">
                                                <div class="surah-title">
                                                    1.0 الفاتحة
                                                </div>
                                                <div class="surah-info">
                                                    <span>عدد الايات  15</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="swiper-slide">
                                            <a class="surah-card">
                                                <div class="surah-title">
                                                    1.0 الفاتحة
                                                </div>
                                                <div class="surah-info">
                                                    <span>عدد الايات  15</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="swiper-slide">
                                            <a class="surah-card">
                                                <div class="surah-title">
                                                    1.0 الفاتحة
                                                </div>
                                                <div class="surah-info">
                                                    <span>عدد الايات  15</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="juz-wrapper">
                            <h2 class="juz-title">الجزء الاول</h2>
                            <div class="juz-content">


                            </div>
                        </div>

                        <div class="juz-wrapper">
                            <h2 class="juz-title">الجزء الاول</h2>
                            <div class="juz-content">


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

    import Vue from 'vue';

    export default {

        data() {
            return {
                active: 0
            }
        },


        methods: {

            activate(i) {
                if (this.active == i) {
                    this.active = 0;
                } else {
                    this.active = i;
                }

            },

            isActivated(i) {
                return i == this.active;
            }
        },

        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        }
    }

</script>

