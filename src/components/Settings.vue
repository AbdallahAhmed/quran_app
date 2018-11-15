<template>

    <div class="page  page-setting " data-page="settings">

        <navbar>
            <template slot="left">
                <a href="" class="link back navbar-back">
                    <i class="f7-icons">arrow_left</i>
                </a>
            </template>
        </navbar>

        <div class="page-content">

            <div class="row page-setting-nav">
                <div class="col-80">
                    <p>{{$app.trans('setting')}}</p>
                </div>
            </div>

            <div class="page-container">
                <p>{{$app.trans('themes')}} </p>
                <div class="row ">
                    <div class="col-50">
                        <a :style="{ 'font-size': font_size + 'px' }" class="button-themes button-themes-back"
                           :class="{'active':color_theme=='black'}" @click="color_theme='black'">
                            وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ
                        </a>
                    </div>
                    <div class="col-50">
                        <a :style="{ 'font-size': font_size + 'px' }" class="button-themes button-themes-white"
                           :class="{'active':color_theme=='white'}" @click="color_theme='white'">
                            وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ
                        </a>
                    </div>
                </div>
                <br>
                <hr>

                <p>{{$app.trans('font_size')}}</p>

                <div class="row">
                    <div class="col-100">
                        <div class="range-slider">
                            <input type="range" min="0" max="100" step="1" :value="font_range">
                        </div>
                    </div>
                </div>
                <div class="row fonts-wrapper">
                    <div class="col font-lg">{{$app.trans('font_size')}}</div>
                    <div class="col font-md">{{$app.trans('font_size')}}</div>
                    <div class="col font-sm">{{$app.trans('font_size')}}</div>
                </div>
                <br>
                <hr>
                <p>{{$app.trans('lang')}}</p>
                <p class="row button-lang">
                    <button class="col link" :class="{'active':locale=='ar'}" @click="locale='ar'">العربية</button>
                    <button class="col link" :class="{'active':locale=='en'}" @click="locale='en'">English</button>
                </p>
                <div class="empty-gap"></div>
            </div>
        </div>
    </div>

</template>

<style scoped>
    .page-container {
        margin: auto;
    }
</style>
<script>

    export default {

        computed: {

            font_size() {
                return this.$store.getters.font_size;
            },

            locale: {

                get: function () {
                    return this.$store.getters.locale;
                },

                set: function (locale) {
                    this.$store.commit("locale", locale);
                }
            },

            color_theme: {

                get: function () {
                    return this.$store.getters.color_theme;
                },

                set: function (status) {
                    this.$store.commit("color_theme", status);
                }
            },
            font_range: {

                get: function () {
                    return this.$store.getters.font_range;
                },

                set: function (status) {
                    this.$store.commit("font_range", status);
                }
            },

        },

        components: {
            navbar: require("./partials/Navbar.vue")
        },
        mounted() {
            var range = this.$f7.range.create({
                el: '.range-slider',
                on: {
                    change: (val) => {
                        this.font_range = val.value;
                    }
                }
            })
        },

        methods: {
            back() {
                this.$store.commit("home_tab", "login");
                this.$f7router.back();
            }
        }

    }

</script>
