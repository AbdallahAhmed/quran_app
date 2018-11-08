<template>

    <span class="quran-aya" @click="activate(aya_row)" :part="aya_row.juz_id"
          :class="{active: isActivated(aya_row)}" :style="{ 'font-size': font_size + 'px' }">
        <slot></slot>
        {{ aya_row.text }}
        <span class="aya-num">  ﴿ {{ aya_row.numberinsurat }} ﴾ </span>
        <div class="emty-gap" v-if="aya_row.number==6236">

        </div>
    </span>

</template>

<style>
    .emty-gap{
        width: 100%;
        height: 250px;
    }
</style>

<script>

    export default {

        name: "Aya",

        props: [
            'aya_row',
            'surah'
        ],

        computed: {
            aya() {
                return this.$store.getters.aya;
            },

            font_size() {
                return this.$store.getters.font_size;
            }
        },

        methods: {

            activate(aya) {

                if (aya.id == this.aya.id) {
                    this.$store.commit("AYA", false);
                } else {
                    aya.surah = Object.assign({}, this.surah, {});
                    delete aya.surah.pages;
                    this.$store.commit("AYA", aya);
                }

            },

            isActivated(aya) {
                return this.aya.id == aya.id
            }
        }

    }

</script>
