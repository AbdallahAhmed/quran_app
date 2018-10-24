<template>

    <span ref="page" :class="'page-' + page[0].page_id">
        <slot></slot>
    </span>

</template>

<script>

    import debounce from './../../helpers/debounce';

    export default {

        name: "QuranPage",

        props: ["page"],

        mounted() {

            let self = this;

            self.$$('.page-content').scroll(debounce(function () {

                // console.log(self.$refs.page);

                let isElementInView = self.$app.isElementInView(self.$$(self.$refs.page), false, self.$$);

                if (isElementInView) {
                    console.log("yes");
                } else {
                    // console.log("no");
                }


            }, 200));


        }
    }
</script>
