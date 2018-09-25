<template>

    <div class="page no-navbar" data-page="category">

        <div class="page-content">

            <div class="category-details">
                <div class="category-cover">
                    <div class="row">
                        <div class="col-30"></div>
                        <div class="col-40 category-main" v-if="category">

                            <img v-if="category.image" class="category-image"
                                 :src="category.image.medium_thumbnail"/><br/><br/>

                            <div class="category-name">{{ category.name }}</div>
                            <br/>

                            <div class="subscription-info">
                                <img class="subscription-icon" src="../../assets/img/videos.png"/>
                                <span class="subscription-count">{{ category.posts_count }}</span>
                            </div>

                            <br/>

                            <follow v-if="category" :animated=true :category="category"></follow>

                        </div>
                        <div class="col-30"></div>
                    </div>
                </div>
            </div>

            <div class="well" v-if="!loading && category_posts.length == 0">
                لا توجد فيديوهات في هذا القسم
            </div>

            <div class="cards-list">
                <div class="dark-overlay" v-show="overlay"></div>
                <card v-for="(post ,index) in category_posts" :post="post" :index="index" :key="post.id"
                      feed="category"></card>
            </div>

        </div>

    </div>

</template>

<script>

    import Vue from 'vue';

    export default {

        data() {
            return {
                loading: false
            }
        },

        computed: {

            category() {

                var self = this;

                return self.$store.getters.categories.filter(function (category) {
                    return category.id == self.$route.params.id;
                }).shift();
            },

            category_posts() {
                return this.$store.getters.category_posts;
            },

            overlay() {
                return this.$store.getters.overlay;
            }
        },


        methods: {

            onF7Init() {

                const self = this;

                self.$store.commit("overlay", false);

                self.$f7.showIndicator();

                self.getPosts();

                self.$$('.pull-to-refresh-content').on("ptr:refresh", function () {
                    self.getPosts();
                });
            },

            getPosts() {

                const self = this;

                self.loading = true;

                this.$store.dispatch("category_posts", self.$route.params.id).then(function () {

                    self.loading = false;
                    self.$f7.hideIndicator();
                    self.$f7.pullToRefreshDone();
                    self.$f7.initImagesLazyLoad(".homepage");

                }, function (response) {

                    self.loading = false;
                    self.$f7.pullToRefreshDone();
                    self.$f7.hideIndicator();
                    self.$f7.addNotification({
                        message: response.body.data ? response.body.data : self.$app.trans("connection_error"),
                        hold: 8000
                    });
                });
            },
        },

        components: {
            'card': require("../partials/Card.vue"),
            'follow': require("../partials/Follow.vue")
        }
    }

</script>


<style>

    .category-details {

        color: #fff
    }

    .category-cover {
        position: relative;
        height: 250px;
        overflow: hidden;
        content: "";
        display: block;

        background: #2e2e2e;
        background-size: 100% 100%;
    }

    .category-main {
        text-align: center;
        padding: 30px 0;
    }

    .category-name {
        text-shadow: 0px 1px 1px #404040;
    }

    .category-image {
        width: 80px;
        border-radius: 7px;
    }

    .subscription-info {
        text-align: center;
    }

    .subscription-icon {
        width: 20px;
    }

    .subscription-count {
        position: relative;
        bottom: 3px;
        padding: 5px;
    }

    .subscription-btn {
        clear: both;
        margin-top: 5px;
    }
</style>
