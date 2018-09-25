<template>
    <div class="card " v-if="categories.length">
        <div class="card-content">
            <div class="swiper-container swiper-3">
                <div class="swiper-pagination"></div>
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="category in categories" :key="category.id">
                        <span class="badge" v-if="category.unviewed_posts_count">
                            {{category.unviewed_posts_count }}
                        </span>
                        <a :href="'/category/'+ category.id" class="button button-big">
                            <img :src=" category.logo.medium_thumbnail"/>
                            <span class="category-name">{{category.name}}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

    var swiper = {
        destroy: function () {

        }
    };
    export default {

        computed: {
            categories: function () {
                return this.$store.getters.categories;
            }
        },
        methods: {

            onF7Init: function () {
                const self = this;
                this.getCategories();
                self.$$('.pull-to-refresh-content').on("ptr:refresh", function () {
                    self.getCategories();
                });
            },

            getCategories: function () {

                const self = this;

                self.$store.dispatch("categories").then(function (response) {

                    swiper = self.$f7.swiper('.swiper-3', {
                        spaceBetween: 10,
                        slidesPerView: 'auto',
                        paginationHide: false,
                        touchMoveStopPropagation: false
                    });
                    self.$$('.category-preloader').hide();
                    self.$f7.pullToRefreshDone();

                }, function (response) {

                    self.$$('.category-preloader').hide();

                    self.$f7.pullToRefreshDone();

                    self.$f7.addNotification({
                        message: response.body.data ? response.body.data : self.$app.trans("connection_error"),
                        hold: 8000
                    });
                });
            },
            beforeDestroy() {
                swiper.destroy();
            }
        },
    }

</script>

<style scoped>

    .card {
        overflow: hidden;
        border-radius: 0px;
        margin: 0 0 20px 0;
        height: 95px;
        padding: 10px;
    }

    .button {
        border: 0;
        height: 100%;
        width: 100%;
        padding: 0;
        line-height: 0;
        z-index: -1;
        color: #fff;
    }

    .button:visited{
        color: #fff;
    }

    img {
        width: 100%;
        height: 100%;
        min-width: 139px;
    }

    .swiper-slide {
        width: 100px !important;
        margin: 0 5px !important;
    }

    .badge {
        float: right;
        margin-right: -7px;
        margin-top: -6px;
        margin-bottom: -20px;
        z-index: 2;
        border: 2px solid #ffffff;
        background-color: #c1cb37;
    }

    .category-name {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        font-weight: bold;
        height: 50%;
        line-height: 70px;
        padding-bottom: 15px;
        background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.16) 47%, rgba(0, 0, 0, 0.17) 50%, rgba(0, 0, 0, 0.35) 100%); /* Chrome10-25,Safari5.1-6 */
        top: 40px;
        color: #fff;
        font-size: 14px;
    }

    .category-preloader {
        top: 35%;
        position: absolute;
        right: 50%;
    }
</style>
