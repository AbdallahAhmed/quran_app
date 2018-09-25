<template>

    <div class="page" data-page="video">

        <navbar></navbar>

        <div class="page-content">

            <div class="well" v-if="!loading && !post">
                الفيديو غير موجود
            </div>

            <div class="cards-list" v-if="post">
                <div class="dark-overlay" v-show="overlay"></div>
                <card :post="post" feed="single"></card>
            </div>
        </div>

    </div>

</template>

<script>

    import Vue from 'vue';

    export default {

        computed: {
            post(){
                return this.$store.getters.post;
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

            onF7Init() {

                const self = this;

                self.$store.commit("overlay", false);

                self.$f7.showIndicator();

                self.getPost();

                self.$$('.pull-to-refresh-content').on("ptr:refresh", function () {
                    self.getPost();
                });
            },

            getPost() {

                const self = this;

                self.loading = true;

                this.$store.dispatch("post", self.$route.params.id).then(function () {

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
            'navbar': require("../partials/HomeNavbar.vue")
        }
    }

</script>


