<template>

    <div class="page-content infinite-scroll pull-to-refresh-content">

        <div class="pull-to-refresh-layer">
            <f7-preloader></f7-preloader>
            <div class="pull-to-refresh-arrow"></div>
        </div>

        <div class="cards-list">

            <div class="dark-overlay" v-show="overlay"></div>

            <card v-for="(post ,index) in subscription_posts"
                  :post="post"
                  :index="index"
                  :key="post.id"
                  feed="videos"
            ></card>
        </div>

        <div class="well" v-show="!loading && subscription_posts.length == 0">
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

        computed: {
            subscription_posts() {
                return this.$store.getters.subscription_posts;
            },
            overlay(){
                return this.$store.getters.overlay;
            }
        },

        data() {
            return {
                loading: false
            }
        },

        methods: {

            onF7Init: function () {

                const self = this;

                self.$store.commit("overlay", false);

                if (!this.$app.auth.check()) {
                    return this.$store.dispatch('guest_alert', true);
                }

                self.loading = true;

                self.getSubscriptionPosts(false);

                self.$f7.initPullToRefresh(".pull-to-refresh-content");

                this.$$('.infinite-scroll').on('infinite', debounce(function () {
                    self.getSubscriptionPosts(true);
                }, 450));

                self.$$('.pull-to-refresh-content').on("ptr:refresh", function () {
                    self.getSubscriptionPosts(false);
                });
            },

            getSubscriptionPosts(append) {

                const self = this;

                self.loading = true;

                self.$store.dispatch("subscription_posts", append).then(function (response) {
                    self.loading = false;
                    self.$f7.initImagesLazyLoad(".homepage");
                    self.$f7.pullToRefreshDone();
                    self.$emit("finished");
                }, function (response) {
                    self.loading = false;
                    self.$f7.pullToRefreshDone();
                    self.$f7.addNotification({
                        message: response.body.data ? response.body.data : self.$app.trans("connection_error"),
                        hold: 3000
                    });
                });
            }

        },

        components: {
            card: require("./../partials/Card.vue")
        }
    }

</script>
