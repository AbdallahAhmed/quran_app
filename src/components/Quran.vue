<template>

    <div>

        <navbar></navbar>

        <sura :sura="sura"></sura>



    </div>

</template>

<script>

    import Vue from 'vue';

    export default {

        computed: {
            sura() {
                return this.$store.getters.sura;
            }
        },

        mounted() {

            let sura_id = this.$f7route.params.sura_id || this.sura.id || 1;

            if (this.Dom7('.page-' + this.page).length) {
             //   this.Dom7('.page-content').scrollTop(this.Dom7('.page-' + this.page).offset().top, 300);
            }

            this.$store.dispatch("get_sura", {surah_id: sura_id}).then((response) => {

                this.$store.commit("SURA", response.data.data);

                // Increment views

                // setTimeout(() => {
                //     this.$store.dispatch("read_page", this.$store.getters.page);
                // }, 5000);
            });

            this.Dom7('.page-content').on('scroll', (e) => {

                var elem = this.Dom7(e.currentTarget);

                if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()) {

                    // Increment page

                    this.$store.commit("PAGE", this.$store.getters.page + 1);

                   // alert(this.$store.getters.page);
                   // this.$store.commit("PAGE", this.$store.getters.page + 1);

                    // setTimeout(() => {
                    //     this.$store.dispatch("read_page", this.$store.getters.page);
                    // }, 5000);

                    //this.$store.dispatch("read_page", this.$store.getters.page);
                }
            });

        },

        components: {
            "navbar": require("./partials/Navbar.vue"),
            "sura": require("./partials/Sura.vue")
        }


    }

</script>
