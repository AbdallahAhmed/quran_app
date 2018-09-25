<template>

    <div>
        <div class="posts-list">
            <a class="post-row" v-for="post in viewed_posts">

                <div class="row">

                    <div class="col-35" v-if="post.image">
                        <a :href="'/video/' + post.id">
                            <img :src="post.image.medium_thumbnail" alt="">
                        </a>
                    </div>

                    <div class="col-55 text-align-right">
                        <div class="series_name" v-if="post.series">{{ post.series.name }}</div>
                        <a :href="'/video/' + post.id">
                            <div>{{ post.title }}</div>
                        </a>
                    </div>

                    <div class="col-10">
                        <a href="#" class="link" @click="remove_view(post)"><i class="f7-icons" hidden="true">close</i></a>
                    </div>
                </div>

            </a>
        </div>

        <div class="well" v-show="!loading && viewed_posts.length == 0">
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
            viewed_posts() {
                return this.$store.getters.viewed_posts;
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
                self.getPosts();
            },

            getPosts() {
                const self = this;

                self.loading = true;

                self.$store.dispatch("viewed_posts").then(function (response) {
                    self.loading = false;
                }, function (response) {
                    self.$f7.addNotification({
                        message: response.body.data ? response.body.data : self.$app.trans("connection_error"),
                        hold: 4000
                    });
                });
            },

            remove_view(post) {
                this.$store.dispatch('unread_post', post);
            }

        },

        components: {
            card: require("./../partials/Card.vue"),
        }
    }

</script>

<style scoped>

    .post-row {
        display: block;
        color: #bbbbc1;
        font-weight: bold;
        margin-top: 6px;
        margin-right: 6px;
    }

    .row {
        border-bottom: 1px solid #8080806b;
    }

    .post-row img {
        width: 100%;
        border-radius: 4px;
    }

    .series_name {
        margin-bottom: 5px;
        font-weight: normal;
    }

    .f7-icons {
        font-weight: bold;
        font-size: 21px;
    }

</style>
