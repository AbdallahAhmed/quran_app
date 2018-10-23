import Vue from 'vue';
import Vuex from 'vuex';
import quran from './modules/quran';

Vue.use(Vuex);

const state = {
    locale: "ar",
    home_tab: "quran",
    color_theme: localStorage.getItem("color_theme") || 'white',
    font_range: localStorage.getItem("font_range") || '50',
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || null,
    khatema: JSON.parse(localStorage.getItem("user")).current_khatema || {pages: []},
    current_khatema: {pages: []},
    alert_at: {
        "hour": null,
        "min": null,
        "time": null,
        occur: 0
    }
};

const getters = {

    user(state) {
        return state.user;
    },

    alert_at() {
        return state.alert_at;
    },

    token(state) {
        return state.token;
    },

    auth(state) {

        if (state.token && state.user) {
            return true;
        }

        return false;
    },

    locale(state) {
        return state.locale;
    },

    color_theme(state) {
        return state.color_theme;
    },

    font_range(state) {
        return state.font_range;
    },

    home_tab(state) {
        return state.home_tab;
    },

    font_size(state) {

        let range = state.font_range;

        if (range < 50) {
            let size = 19 + (range / 100) * 10;
            return size;
        } else {
            let size = 19 + (range / 100) * 10;
            console.log(size);
            return size;
        }

    },
    tabs(state) {
        return state.tabs;
    }
    ,

    direction(state) {
        return state.locale == "ar" ? "rtl" : "ltr";
    }
    ,
    current_khatema(state) {
        return state.khatema;
    }
};

const mutations = {

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
    },

    home_tab(state, home_tab) {
        state.home_tab = home_tab;
    },

    locale(state, locale) {
        state.locale = locale;
        localStorage.setItem("locale", locale);
    },

    color_theme(state, color_theme) {
        state.color_theme = color_theme;
        localStorage.setItem("color_theme", color_theme);
    },

    font_range(state, font_range) {
        state.font_range = font_range;
        localStorage.setItem("font_range", font_range);
    },

    FILL_CURRENT_KHATEMA(state, khatema) {

        if (khatema) {
            state.khatema = khatema;
            state.user.current_khatema = state.khatema;
            localStorage.setItem("user", JSON.stringify(state.user));
            return;
        }

        state.khatema = {
            pages: [],
            created_at: Date.now().toISOString()
        };

    },
    READ_PAGE(state, page_id) {

        // init new khatma if not exist
        if (!(state.khatema && state.khatema.pages)) {
            if (state.user && state.user.current_khatema) {
                state.khatema = state.user.current_khatema;

            } else {

                state.khatema = {
                    pages: [],
                    created_at: Date.now().toISOString()
                }

            }
        }


        // if you has object
        if (!state.khatema.pages.find((item) => {
            return item === page_id;
        })) {
            state.khatema.pages.push(page_id);
        }

        // save Khatema to currentObject
        state.user.current_khatema = state.khatema;


        // save user Data
        localStorage.setItem("user", JSON.stringify(state.user));
    }
};

const actions = {

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

    forgetPassword(store, email) {
        return Vue.http.post("auth/forget-password", email);
    },

    read_page({state, commit}, page_id) {

        commit('READ_PAGE', page_id);

        var promise = null;

        // if khatema completed

        if (state.khatema.pages.length >= 604) {

            state.khatema.completed = 1;

            state.khatema.completed_at = Date.now().toISOString();


            promise = Vue.http.post("khatemas/update", state.khatema);


            commit('FILL_CURRENT_KHATEMA')

        } else {

            promise = Vue.http.post("khatemas/update", {
                page_id: page_id
            }).then((response) => {

                let data = response.body.data;

                data.pages = JSON.parse(data.pages);


                commit('FILL_CURRENT_KHATEMA', data)

            }, (response) => {


            });
        }

        return promise;
    }
};

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: [
        quran
    ]
});
