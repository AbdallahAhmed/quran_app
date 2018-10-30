<template>

    <span ref="page" :id="'page-'+id">
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

            // inView("#page-" + id)
            //     .on("enter", () => {
            //         this.$store.commit("LAST_PAGE", id);
            //     });

            inView("#page-" + id)

                .on("enter", () => {

                    if (!this.isViewed()) {

                        this.timer = setInterval(() => {

                            if (this.seconds >= this.getPageReadTime()) {

                                clearInterval(this.timer);
                                this.timer = false;

                                // mark as seen

                                this.$store.dispatch("read_page", id);

                                // Saving last viewed page

                                this.$store.commit("PAGE", id);

                            }

                            if (inView("#page-" + id).check()) {

                                this.seconds++;

                                console.log(this.id + " - " + this.seconds + " - " + this.getPageReadTime());
                            }


                        }, 1000);

                    }

                })

                .on("exit", () => {
                    clearInterval(this.timer);
                    this.timer = false;
                });

        },


        methods: {

            getPageReadTime() {
                return this.page.reduce((sum, aya) => {
                    return Math.ceil(sum + (aya.text.split(' ').length * 0.28));
                }, 0)
            },

            isViewed: function () {
                return this.$store.getters.current_khatema.pages.indexOf(this.id) > -1
            }
        }
    }
</script>


<style>
    .bg-grey {
        /*text-shadow: 1px 1px 1px #248e11;*/
        /*opacity: 0.4;*/
    }
</style>
