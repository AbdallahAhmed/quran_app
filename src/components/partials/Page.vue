<template>

    <span ref="page" :class="'page-' + page[0].page_id" :data-id="page[0].page_id">
        <slot></slot>
    </span>

</template>

<script>

    import debounce from './../../helpers/debounce';
    import inView from 'in-view';

    export default {

        name: "QuranPage",

        props: ["page"],

        mounted() {

            let id = this.page[0].page_id;

            // Saving last rendered page

            this.$store.commit("PAGE", id);

            inView(".page-" + id)

                .on('enter', () => {

                    setTimeout(() => {

                       // inView(".page-" + id)

                         //   .once('enter', () => {
                                console.log(".page-" + id + " has been viewed");
                          //  });

                    }, 10000);


                    console.log("hello" + id);
                })

                .on('exit', () => {
                    // Bye Bye
                });

        }
    }
</script>
