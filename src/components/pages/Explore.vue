<template>

    <div class="page-content infinite-scroll pull-to-refresh-content">

        <div class="pull-to-refresh-layer">
            <f7-preloader></f7-preloader>
            <div class="pull-to-refresh-arrow"></div>
        </div>

        <categories></categories>

        <div class="cards-list">

            <div class="dark-overlay" v-show="overlay"></div>

            <card v-for="(post ,index) in explore_posts"
                  :post="post"
                  :index="index"
                  :key="post.id"
                  feed="explore"
            ></card>
        </div>

        <div class="well" v-show="!loading && explore_posts.length == 0">
            لا توجد فيديوهات
        </div>

        <div class="infinite-scroll-preloader" :class="{active: loading}">
            <f7-preloader></f7-preloader>
        </div>

    </div>

</template>

<script>

    import debounce from './../../helpers/debounce';

    export default {

        data() {
            return {
                loading: false
            }
        },

        computed: {

            card() {
                return this.$store.getters.card;
            },

            explore_posts() {
                return this.$store.getters.explore_posts;
            },

            overlay() {
                return this.$store.getters.overlay;
            }
        },

        mounted() {

            const self = this;

            self.$store.commit("overlay", false);

            self.getExplorePosts(false);

            this.$$('.infinite-scroll').on('infinite', debounce(function () {
                self.getExplorePosts(true);
            }, 450));

            self.$$('.pull-to-refresh-content').on("ptr:refresh", function () {
                self.getExplorePosts(false);
            });

        },

        methods: {

            getExplorePosts(append) {

                const self = this;

                self.loading = true;

                self.$store.dispatch("explore_posts", append).then(function (response) {
                    self.loading = false;
                    self.$f7.initImagesLazyLoad(".homepage");
                    self.$f7.pullToRefreshDone();
                }, function (response) {
                    self.loading = false;
                    self.$f7.pullToRefreshDone();
                    self.$f7.addNotification({
                        message: self.$app.trans("connection_error"),
                        hold: 3000
                    });
                });
            }

        },

        components: {
            card: require("./../partials/Card.vue"),
            categories: require("./../partials/Categories.vue"),
        }
    }

</script>


<style scoped>

</style>
