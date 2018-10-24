<template>

    <div class="page" data-name="preview">

        <options-toolbar v-if="aya"></options-toolbar>

        <div class="sura-stats row rollIn">

            <a @click="back" class="link preview-back">
                <i class="f7-icons">arrow_left</i>
            </a>

            <a class="col-50 sura-part-num" style="background: none">
                {{ sura }}
            </a>

        </div>

        <div class="page-content">


            <div class="block quran-sura">

                <span v-for="aya of page" class="quran-aya" @click="activate(aya)"
                      :class="{active: isActivated(aya), current: isFocused(aya)}">

                    {{ aya.text }}

                     <span class="aya-num">  ﴿ {{ aya.numberinsurat }}  ﴾ </span>

                 </span>

            </div>


        </div>


    </div>

</template>

<style>

    .loader-wrapper {
        text-align: center;
    }

    .current {
        background: #F6C625;
    }


</style>

<script>

    import Vue from 'vue';

    export default {

        computed: {
            aya() {
                return this.$store.getters.aya;
            },
            sura() {

                if (this.page.length) {
                    return this.page[0].surah.name;
                }

                return "";

            }
        },

        data() {
            return {
                page: [],
                aya_id: 0,
                active: 0,
            }
        },

        mounted() {

            this.aya_id = this.$f7route.params.aya_id || 1;

            let page_id = this.$f7route.params.page_id || 1;

            this.$store.dispatch("get_page", page_id).then((response) => {

                this.page = response.data.data

                this.page.forEach((aya) => {
                    if (aya.id == this.aya_id) {
                        this.$store.commit("AYA", aya);
                    }
                });

                console.log(this.page);
            });
        },

        events: {
            close: function () {
                this.active = 0;
                this.$store.commit("AYA", false);
            }
        },

        methods: {

            activate(aya) {

                if (this.active != aya.number) {
                    this.active = aya.number;
                    this.$store.commit("AYA", aya);
                } else {
                    this.active = 0;
                    this.$store.commit("AYA", false);
                }

            },


            isActivated(aya) {
                return aya.number == this.active && this.aya;
            },

            isFocused(aya) {
                return aya.id == this.aya_id;
            },

            back() {
                this.$store.commit("AYA", false);
                this.$f7router.back()
            }
        },

        components: {
            "options-toolbar": require("./partials/OptionsToolbar.vue"),
        }


    }

</script>
