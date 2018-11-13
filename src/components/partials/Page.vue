<template>

    <span ref="page" class="quran-page" :id="'page-'+id">
        <slot></slot>
    </span>

</template>

<script>

    import inView from 'in-view';

    export default {

        name: "Page",

        props: ["id", "page"],


        data() {
            return {
                timer: null,
                seconds: 0,
            }
        },

        computed: {},

        mounted() {

            let id = this.id;


            // EventBus.$on("vscroll", () => {
            //     if(inView("#page-" + id).check()){
            //         this.$store.commit("LAST_SURA", this.sura.id);
            //     }
            // });

            inView("#page-" + id)

                .on("enter", () => {

                    // Saving last viewed page

                    this.$store.commit("LAST_PAGE", id);

                    // Saving last viewed page

                    this.$store.commit("LAST_PART", this.$$('#page-' + id).children()[0].getAttribute('part'));
                    this.$store.commit("LAST_SURA", this.page[0].surat_id);

                    if (!this.isViewed()) {

                        this.timer = setInterval(() => {

                            if (this.seconds >= this.getPageReadTime()) {

                                clearInterval(this.timer);
                                this.timer = false;

                                // mark as seen

                                this.$store.dispatch("read_page", id);

                            }

                            if (inView("#page-" + id).check()) {

                                this.seconds++;
                                //
                                // console.log(this.page);
                                //
                                // console.log(this.id + " - " + this.seconds + " - " + this.getPageReadTime());
                            }


                        }, 1000);

                    }

                })

                .on("exit", () => {
                    /*console.log(document.querySelector('#page-' + (id + 1 )));*/
                    let last_page_id = id;
                    if (inView.is(document.querySelector('#page-' + (id - 1 )))) {
                        console.log('prev');
                        last_page_id--;

                    } else {
                        console.log('next');
                        last_page_id++;
                    };

                    // Saving last viewed page

                    this.$store.commit("LAST_PAGE", last_page_id);

                    // Saving last viewed page

                    this.$store.commit("LAST_PART", this.$$('#page-' + last_page_id).children()[0].getAttribute('part'));
                    this.$store.commit("LAST_SURA", this.page[0].surat_id);

                    clearInterval(this.timer);
                    this.timer = false;
                });

        },


        methods: {

            getPageReadTime() {
                if (this.page) {
                    return this.page.reduce((sum, aya) => {
                        return Math.ceil(sum + (aya.text.split(' ').length * 0.28));
                    }, 0)
                }

            },

            isViewed: function () {
                return this.$store.getters.current_khatema.pages.indexOf(this.id) > -1
            }
        }
    }
</script>


<style>
    .bg-grey {
        text-shadow: 1px 1px 1px #248e11;
        opacity: 0.4;
    }
    .quran-page{
    background-color: #fdfafa;
    padding: 17px;
    border: 1px #e8e8e8 solid;
    margin: 17px auto;
}
.black_mode .quran-page{
    background-color: #0e0d0d;
    padding: 17px;
    border: 1px #3e3e3e solid;
    margin: 17px auto;
}


</style>
