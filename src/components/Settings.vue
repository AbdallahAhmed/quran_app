<template>

    <div class="page page-setting " data-page="settings">

        <navbar></navbar>

        <div class="page-content">
            <div class="row page-setting-nav">
                <div class="col-90">
                    <p>الأعدادت</p>
                </div>
                <div class="col-10">
                    <a class="back"> <i class="f7-icons size-22 back-icon" style="color: #fff">chevron_left</i> </a>
                </div>
            </div>


            <div class="page-container">
                <p>الشكل </p>
                <div class="row ">
                   <div class="col-50" >
                       <a class="button-themes button-themes-back" @click="color_theme='black'">
                           وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ
                       </a>
                   </div>
                    <div class="col-50">
                        <a class="button-themes button-themes-white" @click="color_theme='white'">
                            وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ
                        </a>
                    </div>
                </div>
                <br>
                <hr>

                <p>حجم الخط</p>
                <div class="row">
                    <div class="col-100">
                        <div class="range-slider">
                            <input type="range" min="0" max="100" step="5" value="50">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col font-sm">حجم الخط</div>
                    <div class="col font-md">حجم الخط</div>
                    <div class="col font-lg">حجم الخط</div>
                </div>
                <br>
                <hr>
                <p>اللغة</p>
                <p class="row button-lang">
                    <button class="col " :class="{'active':locale=='ar'}" @click="locale='ar'">العربية </button>
                    <button class="col"  :class="{'active':locale=='en'}" @click="locale='en'">English</button>
                </p>
                <br>
            </div>
        </div>
    </div>

</template>

<script>

    export default {

        computed: {

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
        mounted(){
            var range = this.$f7.range.create({
                el: '.range-slider',
                on: {
                    change:  (val)=> {
                        this.font_range=val.value;
                    }
                }
            })
        }

    }

</script>
