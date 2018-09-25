import Vue from 'vue';

export default {

    state: {
        categories: [],
    },

    getters: {
        categories: function (state) {
            return state.categories;
        }
    },

    mutations: {
        categories: function (state, posts) {
            state.categories = posts;
        }
    },

    actions: {

        categories: function (store, categories) {
            return Vue.http.get("videos/categories", {params: {with: ['followed']}}).then(function (response) {
                if (response.status === 200) {
                    store.commit("categories", response.body.categories);
                }
            });
        },

        category(store, category_id) {
            return Vue.http.get("videos/category_details", {params: {category_id: category_id}});
        },

        subscribe_category(store, category_id) {

            var self = this;

            return Vue.http.get("videos/follow_category", {params: {category_id: category_id}}).then(function () {

                let categories = store.getters.categories.map(function (category) {

                    if (category.id == category_id) {
                        category.followed = !category.followed;
                    }

                    return category;
                });

                store.commit("categories", categories);
            });
        }
    }

}
