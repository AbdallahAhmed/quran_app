<template>

    <span ref="page" class="quran-page" :id="'page-'+id">
        <slot></slot>
        <div class="page-number">{{id}}</div>
    </span>

</template>

<script>

    import inView from 'in-view';

    export default {

        name: "Page",

        props: ["id", "page"],


        data() {
            return {
                seconds: 0,
            }
        },

        computed: {},

        mounted() {

            let id = this.id;

            var SpendTime = null;
            inView("#page-" + id)

                .on("enter", () => {

                    // Saving last viewed page

                    this.$store.commit("LAST_PAGE", id);

                    // Saving last viewed page

                    this.$store.commit("LAST_PART", this.$$('#page-' + id).children()[0].getAttribute('part'));
                    this.$store.commit("LAST_SURA", this.page[0].surat_id);

                    if (!this.isViewed()) {

                        SpendTime = Date.now();

                    }

                })

                .on("exit", () => {
                    /*console.log(document.querySelector('#page-' + (id + 1 )));*/
                    let last_page_id = id;
                    if (inView.is(document.querySelector('#page-' + (id - 1)))) {
                        // console.log('prev');
                        last_page_id--;

                    } else {
                        // console.log('next');
                        last_page_id++;
                    }


                    if (!this.isViewed()) {

                        let read_time = Math.min(Date.now() - SpendTime, 1000 * 60 * 4);
                        // console.log(`pages  ${id}`, read_time, Date.now() - SpendTime)

                        if (read_time >= 1000 * 60) {
                            this.$store.dispatch("read_page", {page_id: id, time: read_time});
                        }

                        if (SpendTime) {
                            SpendTime = null;
                        }

                    }


                    // Saving last viewed page

                    this.$store.commit("LAST_PAGE", last_page_id);

                    // Saving last viewed page

                    this.$store.commit("LAST_PART", this.$$('#page-' + last_page_id).children()[0].getAttribute('part'));
                    this.$store.commit("LAST_SURA", this.page[0].surat_id);

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
                return !!this.$store.getters.current_khatema.pages.find((page) => {
                    return page.page_id == this.id;
                })
            }
        }
    }
</script>


<style>
    .bg-grey {
        text-shadow: 1px 1px 1px #248e11;
        opacity: 0.4;
    }

    .quran-page {
        /*background-color: #fdfafa;
        padding: 17px;
        border: 1px #e8e8e8 solid;
        margin: 17px auto;*/
        padding: 25px 25px 0;
    }

    .black_mode .quran-page {
        background-color: #0e0d0d;
        padding: 17px;
        border: 1px #3e3e3e solid;
        margin: 17px auto;
    }
</style>
