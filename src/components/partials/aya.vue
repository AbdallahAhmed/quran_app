<template>

    <span class="quran-aya" @click="activate(aya_row)"
          :class="{active: isActivated(aya_row)}" :style="{ 'font-size': font_size + 'px' }">
        {{ aya_row.text }}
        <span class="aya-num">  ﴿ {{ aya_row.numberinsurat }} ﴾ </span>
    </span>

</template>


<script>

    export default {

        name: "Aya",

        props: [
            'aya_row'
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
                    this.$store.commit("AYA", aya);
                }

            },

            isActivated(aya) {
                return this.aya.id == aya.id
            }
        }

    }

</script>
