<template>

    <div class="page" data-page="search">

        <div class="navbar">
            <div class="navbar-inner">

                <div class="left">
                    <a href="#" class="link icon-only" @click="$app.router.back()">
                        <i class="icon f7-icons">arrow-right</i>
                    </a>
                </div>

                <div class="center">
                    <form @submit.prevent="search" class="category-search-form">
                        <input type="search" name="q" class="search-key" v-model="key"/>
                    </form>
                </div>

                <div class="right">
                    <a class="link" @click="search">
                        <i class="f7-icons search-btn">search_strong</i>
                    </a>
                </div>

            </div>
        </div>

        <div class="page-content">

            <div class="catgories-list" v-show="mode == 'categories' || !key">
                <a class="category-row" v-for="category in categories" :href="'/category/' + category.id">
                    <div class="category-name">{{ category.name }}</div>
                    <img v-if="category.image" class="category-image" :src="category.image.medium_thumbnail"/>
                </a>
            </div>

            <div class="posts-list" v-show="mode == 'search' && key">

                <a class="post-row" v-for="post in posts">

                    <a :href="'/video/' + post.id" class="row">

                        <div class="col-25" v-show="post.image">
                            <img :src="post.image.medium_thumbnail" alt="">
                        </div>

                        <div class="col-75 text-align-right">
                            <div class="series_name" v-if="post.series">{{ post.series.name }}</div>
                            <div>{{ post.title }}</div>
                        </div>
                    </a>

                </a>

                <div class="well" v-show="Array.isArray(posts) && posts.length == 0">لا توجد فيديوهات مطابقة لكلمة البحث
                </div>
            </div>

        </div>

    </div>


</template>

<script>

    import Vue from 'vue';

    export default {

        data() {
            return {
                key: "",
                mode: "categories",
                posts: false
            }
        },

        computed: {
            categories() {
                return this.$store.getters.categories;
            }
        },

        methods: {

            search() {

                const self = this;

                if (this.key == "") return self.$f7.alert("أدخل كلمة البحث");

                self.$f7.showIndicator();

                self.mode = 'search';

                Vue.http.get("videos/list", {
                    params: {
                        q: this.key,
                        offset: 0,
                        limit: 8,
                    }
                }).then(function (response) {
                    if (response.body.status) {
                        self.$f7.hideIndicator();
                        self.$f7.initImagesLazyLoad(".homepage");
                        self.posts = response.body.videos;
                    }
                }, function (response) {
                    self.$f7.hideIndicator();
                    self.$f7.addNotification({
                        message: response.body.data ? response.body.data : self.$app.trans("connection_error"),
                        hold: 8000
                    });
                });
            }
        }
    }

</script>


<style scoped>

    .category-row {
        display: block;
        background: #2e2e2e;
        color: #bbbbc1;
        border-radius: 7px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        margin: 15px;
        font-weight: bold;
        overflow: hidden;
    }

    .post-row {
        display: block;
        color: #bbbbc1;
        margin: 15px;
        font-weight: bold;
    }

    .post-row img {
        width: 90px;
        border-radius: 4px;
    }

    .search-key {
        height: 38px !important;
        background: #737373 !important;
        color: #fff !important;
        border-radius: 2px !important;
        border: 0px !important;
        padding: 7px !important;
    }

    .series_name {
        margin-bottom: 5px;
        font-weight: normal;
    }

    .search-btn {
        width: 46px;

    }

    .category-image {
        opacity: 0.4;
        width: 100%;
        height: 100%;
    }

    .category-name {
        position: absolute;
        text-align: center;
        width: 92%;
        color: #fff;
        font-size: 18px;
        display: block;
    }

    .navbar-inner .center {
        position: unset !important;
        margin: 0;
        text-align: center !important;
        width: 93%;
    }

    .navbar-inner .right{
        width: 50px
    }

    .category-search-form{
        width: 100%;
    }

</style>
