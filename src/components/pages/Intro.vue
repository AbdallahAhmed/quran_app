<template>

    <div class="page" data-page="intro">

        <home-nav-bar></home-nav-bar>

        <div class="page-content" style="background: rgb(234, 234, 234)">

            <div class="catgories-list">

                <div class="category-row" v-for="category in categories">

                    <a :href="'/category/' + category.id">
                        <img v-if="category.image" class="category-image" :src="category.image.medium_thumbnail"/>
                    </a>

                    <div class="category-data">
                        <a class="category-name" :href="'/category/' + category.id">{{ category.name }}</a>

                        <div class="subscription-info">
                            <img class="subscription-icon" src="../../assets/img/videos.png"/>
                            <span class="subscription-count">{{ category.posts_count }}</span>
                        </div>

                        <follow :category="category"></follow>
                    </div>

                    <br/>

                </div>

            </div>

            <div style="clear: both"></div>

            <a href="#" @click="openHome" v-show="!loading && categories.length" :disabled="loading"
               class="button button-big button-fill bg-black bg-dark-gray btn-next">
                التالي
            </a>

            <div class="text-center">
                <br/>
                <f7-preloader v-show="loading"></f7-preloader>
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
            categories() {
                return this.$store.getters.categories;
            }
        },

        mounted() {

            const self = this;

            this.$store.dispatch('categories');
        },

        methods: {
            openHome() {

                this.loading = true;

                this.$app.reload();

            }
        },

        components: {
            follow: require("../partials/Follow.vue"),
            'home-nav-bar': require("../partials/HomeNavbar.vue")
        }
    }

</script>


<style scoped>

    .catgories-list {
        padding: 10px;
    }

    .category-row {
        margin: 3%;
        background: #fff;
        width: 44%;
        float: right;
        border-radius: 5px;
        height: 180px;
    }

    .category-data {
        text-align: center;
        width: 50%;
        margin: 0 auto;
    }

    .category-image {
        width: 100%;
        border-radius: 5px 5px 0 0;
        max-height: 85px;
    }

    .category-name {
        text-align: center;
        font-size: 18px;
        text-shadow: none;
        font-size: 15px;
    }

    .subscription-icon {
        width: 20px;
    }

    .subscription-count {
        color: #a7a7a7;
        position: relative;
        bottom: 5px;
    }

    .subscription-info {
        margin: 3px 5px;
    }

    .btn-next {
        clear: both;
        width: 50%;
        margin: 20px auto;
        margin-top: 10px;
    }

</style>
