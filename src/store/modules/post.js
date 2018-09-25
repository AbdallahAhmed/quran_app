import Vue from 'vue';

export default {

    state: {
        card: false,
        posts: [],
        explore_posts: [],
        subscription_posts: [],
        hot_posts: [],
        saved_posts: [],
        liked_posts: [],
        viewed_posts: [],
        category_posts: [],
        post: false
    },

    getters: {

        card(state) {
            return state.card;
        },

        posts(state) {
            return state.posts;
        },

        explore_posts(state) {
            return state.explore_posts;
        },

        subscription_posts(state) {
            return state.subscription_posts;
        },

        hot_posts(state) {
            return state.hot_posts;
        },

        category_posts(state) {
            return state.category_posts;
        },

        post(state) {
            return state.post;
        },

        saved_posts(state) {
            return state.saved_posts
        },

        liked_posts(state) {
            return state.liked_posts;
        },

        viewed_posts(state) {
            return state.viewed_posts;
        },

        // saved_videos(state) {
        //     return state.saved_videos;
        // }

    },

    mutations: {

        card(state, card) {
            state.card = card;
        },

        posts(state, posts) {
            state.posts = posts;
        },

        explore_posts(state, posts) {
            state.explore_posts = posts;
        },

        subscription_posts(state, posts) {
            state.subscription_posts = posts;
        },

        clear_subscription_posts(state) {
            state.subscription_posts = [];
        },

        hot_posts(state, posts) {
            state.hot_posts = posts;
        },

        category_posts(state, posts) {
            state.category_posts = posts;
        },

        post(state, post) {
            return state.post = post;
        },

        saved_posts(state, posts) {
            state.saved_posts = posts;
        },

        liked_posts(state, posts) {
            state.liked_posts = posts;
        },

        viewed_posts(state, posts) {
            state.viewed_posts = posts;
        }

    },

    actions: {

        explore_posts(store, append = true) {

            return Vue.http.get("videos/list", {
                params: {
                    offset: store.getters.explore_posts.length,
                    limit: 8,
                }
            }).then(function (response) {
                if (response.body.status) {
                    if (append) {
                        store.commit("explore_posts", store.getters.explore_posts.concat(response.body.videos));
                    } else {
                        store.commit("explore_posts", response.body.videos);
                    }
                }
            });
        },

        subscription_posts(store, append = true) {
            return Vue.http.get("videos/followed_categories_posts", {
                params: {
                    limit: 8,
                    offset: store.getters.subscription_posts.length
                }
            }).then(function (response) {
                if (append) {
                    store.commit("subscription_posts", store.getters.subscription_posts.concat(response.body.videos));
                } else {
                    store.commit("subscription_posts", response.body.videos);
                }
            });
        },

        hot_posts(store, append = true) {

            return Vue.http.get("videos/list", {
                params: {
                    list_type: 'hot',
                    offset: store.getters.hot_posts.length,
                    limit: 8,
                }
            }).then(function (response) {
                if (response.body.status) {
                    if (append) {
                        store.commit("hot_posts", store.getters.hot_posts.concat(response.body.videos));
                    } else {
                        store.commit("hot_posts", response.body.videos);
                    }
                }
            });
        },

        saved_posts(store, append = true) {

            return Vue.http.get("videos/list", {
                params: {
                    limit: 8,
                    offset: store.getters.saved_posts.length,
                    list_type: 'saved',
                }
            }).then(function (response) {
                if (response.body.status) {
                    if (append) {
                        store.commit("saved_posts", store.getters.saved_posts.concat(response.body.videos));
                    } else {
                        store.commit("saved_posts", response.body.videos);
                    }
                }
            });
        },

        liked_posts(store, append = true) {

            return Vue.http.get("videos/list", {
                params: {
                    limit: 8,
                    offset: store.getters.liked_posts.length,
                    list_type: 'favorites',
                }
            }).then(function (response) {
                if (response.body.status) {
                    if (append) {
                        store.commit("liked_posts", store.getters.liked_posts.concat(response.body.videos));
                    } else {
                        store.commit("liked_posts", response.body.videos);
                    }
                }
            });

        },

        viewed_posts(store, append = true) {

            return Vue.http.get("videos/list", {
                params: {
                    limit: 8,
                    offset: store.getters.viewed_posts.length,
                    list_type: 'history',
                }
            }).then(function (response) {
                if (response.body.status) {
                    if (append) {
                        store.commit("viewed_posts", store.getters.viewed_posts.concat(response.body.videos));
                    } else {
                        store.commit("viewed_posts", response.body.videos);
                    }
                }
            });

        },

        like(store, post) {

            ["explore_posts", "hot_posts", "subscription_posts", "saved_posts", "liked_posts", "category_posts", "post"]
                .forEach(function (key) {
                    if (key == "post") {

                        let p = store.getters.post;

                        if (p) {
                            p.liked = !p.liked;
                            store.commit(key, p);
                        }

                    } else {
                        store.commit(key, store.getters[key].map(function (row) {

                            if (row.id == post.id) {
                                row.liked = !row.liked;
                            }

                            return row;
                        }));
                    }
                });

            var liked_posts = store.getters.liked_posts;

            if (!post.liked) {
                store.commit("liked_posts", liked_posts.filter(function (row) {
                    return row.id != post.id;
                }));
            }

            return Vue.http.get("videos/like", {
                params: {
                    'post_id': post.id
                }
            });
        },

        save(store, post) {

            ["explore_posts", "hot_posts", "subscription_posts", "liked_posts", "saved_posts", "category_posts", "post"]
                .forEach(function (key) {
                    if (key == "post") {

                        let p = store.getters.post;

                        if (p) {
                            p.saved = !p.saved;
                            store.commit(key, p);
                        }

                    } else {
                        store.commit(key, store.getters[key].map(function (row) {

                            if (row.id == post.id) {
                                row.saved = !row.saved;
                            }

                            return row;
                        }));
                    }
                });

            if (!post.saved) {
                store.commit("saved_posts", store.getters.saved_posts.filter(function (row) {
                    return row.id != post.id;
                }));
            }

            return Vue.http.get("videos/save", {
                params: {
                    'post_id': post.id,
                }
            })
        },

        read_post(store, post) {

            let viewed_posts = store.getters.viewed_posts;

            viewed_posts.unshift(post);

            store.commit("viewed_posts", viewed_posts);

            return Vue.http.get("videos/view", {
                params: {
                    'post_id': post.id,
                }
            })
        },

        unread_post(store, post) {

            store.commit("viewed_posts", store.getters.viewed_posts.filter(function (row) {
                return row.id != post.id
            }));

            return Vue.http.get("user/delete_history", {
                params: {
                    'video_id': post.id,
                }
            })
        },


        category_posts(store, category_id) {


            store.commit("category_posts", []);

            return Vue.http.get("videos/list", {params: {category_id: category_id}}).then(function (response) {
                if (response.body.status) {
                    store.commit("category_posts", store.getters.category_posts.concat(response.body.videos));
                }
            });
        },

        post(store, post_id) {

            store.commit("post", false);

            return Vue.http.get("videos/video_details", {params: {video_id: post_id}}).then(function (response) {
                if (response.body.status) {
                    store.commit("post", response.body.video);
                }
            });
        },

    }

}
