import Vue from 'vue';

export default {

    state: {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || null
    },

    getters: {

        user(state) {
            return state.user;
        },

        token(state) {
            return state.token;
        },

        auth(state) {

            if (state.token && state.user) {
                return true;
            }

            return false;
        }
    },

    mutations: {

        token(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },

        user(state, user) {
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },

        logout(state) {

            state.user = {};
            localStorage.removeItem("user");

            state.token = null;
            localStorage.removeItem("token");
        }
    },

    actions: {

        login(store, user) {

            return Vue.http.post("auth", user).then(function (response) {

                if (response.body.status) {

                    store.commit("token", response.body.data.token);
                    store.commit("user", response.body.data.user);

                } else {
                    throw new Error("auth failed");
                }
            });

        },

        register(store, user) {

            return Vue.http.post("register", user).then(function (response) {

                if (response.body.status) {

                    store.commit("token", response.body.data.token);
                    store.commit("user", response.body.data.user);

                }
            });

        },

        edit_profile(store, user) {

            return Vue.http.post("user/edit", user).then(function (response) {
                if (response.body.status) {
                    Vue.http.get("user/details").then(function (response) {
                        if (response.body.status) {

                            let user = response.body.user;

                            user.name = user.first_name;

                            //if (response.body.user.image) {
                            //     user.photo_url = response.body.user.image.path;
                            // }

                            store.commit("user", user);
                        }
                    });
                }
            });
        }
    }
}
