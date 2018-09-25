<template>

    <div class="page-content infinite-scroll">

        <div class="cards-list">
            <div class="dark-overlay" v-show="overlay"></div>
            <card v-for="(post ,index) in posts"
                  :post="post"
                  :index="index"
                  :key="post.id"
                  feed="likes"
            ></card>
        </div>

        <div class="well" v-show="!loading && posts.length == 0">
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
            posts() {
                return this.$store.getters.liked_posts;
            },

            overlay(){
                return this.$store.getters.overlay;
            }
        },

        data: function () {
            return {
                loading: false,
            };
        },

        methods: {

            onF7Init() {

                const self = this;

                self.$store.commit("overlay", false);

                self.getLikedPosts();

                this.$$('.infinite-scroll').on('infinite', debounce(function () {
                    self.getLikedPosts();
                }, 450));
            },

            getLikedPosts() {

                const self = this;

                self.loading = true;

                self.$store.dispatch("liked_posts").then(function (response) {
                    self.loading = false;
                }, function (response) {
                    self.$f7.addNotification({
                        message: response.body.data ? response.body.data : self.$app.trans("connection_error"),
                        hold: 4000
                    });
                });
            },
        },

        components: {
            card: require("./../partials/Card.vue"),
        }
    }

</script>
