import Vue from "vue";
import Vuex from "vuex";
import quran from "./modules/quran";
import contests from "./modules/contests";

Vue.use(Vuex);

const state = {
    locale: localStorage.getItem("locale") || "en",
    home_tab: "quran",
    color_theme: localStorage.getItem("color_theme") || "white",
    font_range: localStorage.getItem("font_range") || "50",
    user: JSON.parse(localStorage.getItem("user")) || false,
    token: localStorage.getItem("token") || null,
    khatema: JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user")).current_khatema
        : JSON.parse(localStorage.getItem("local_khatema")) || {
        pages: [],
        created_at: new Date().toISOString()
    },
    // khatema: undefined,
    current_khatema: {pages: []},
    completed_khatema:
    JSON.parse(localStorage.getItem("completed_khatema")) || [],
    alert_at: {
        hour: null,
        min: null,
        time: null,
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
            return size;
        }
    },
    tabs(state) {
        return state.tabs;
    },
    direction(state) {
        return state.locale == "ar" ? "rtl" : "ltr";
    },
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
        var local_pages = state.khatema.pages;
        localStorage.setItem("user", JSON.stringify(user));

        // first after login
        if (state.user.current_khatema) {
            console.log("merge khatema");
            var pages = JSON.parse(state.user.current_khatema.pages) || [];
            state.khatema.pages = pages.concat(local_pages).unique();
            state.khatema.remaining_pages = 604 - state.khatema.pages.length;
            localStorage.setItem(
                "local_khatema",
                JSON.stringify(state.khatema)
            );
            state.user.current_khatema.pages = state.khatema.pages;
            state.user.current_khatema.remaining_pages = state.khatema.remaining_pages;
            localStorage.setItem("user", JSON.stringify(state.user));
        }
        if (state.user.last_khatema) {
            state.completed_khatema = state.user.last_khatema;
        }
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

    alert_at(state, alert_at) {
        state.alert_at = alert_at;
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
            if (state.user.id) {
                state.user.current_khatema = state.khatema;
                localStorage.setItem("user", JSON.stringify(state.user));
            }
            localStorage.setItem(
                "local_khatema",
                JSON.stringify(state.khatema)
            );
            return;
        }

        state.khatema = {
            pages: [],
            created_at: new Date().toISOString()
        };

        if (state.user.id) {
            state.user.current_khatema = state.khatema;
            localStorage.setItem("user", JSON.stringify(state.user));
        }

        localStorage.setItem("local_khatema", JSON.stringify(state.khatema));
    },
    SET_COMPLETED_KHATEMA(state, khatema) {
        khatema.completed = 1;
        khatema.completed_at = Date.now().toISOString();
        state.completed_khatema.push(khatema);
        state.localStorage.setItem(
            "completed_khatema",
            JSON.stringify(state.completed_khatema)
        );
    },
    READ_PAGE(state, page_id) {
        // init new khatma if not exist
        if (!(state.khatema && state.khatema.pages)) {
            // init form user current_khatema
            if (state.user && state.user.current_khatema) {
                state.khatema = state.user.current_khatema;
            } else {
                state.khatema = JSON.parse(
                    localStorage.setItem("local_khatema")
                ) || {
                    pages: [],
                    created_at: Date.now().toISOString()
                };
            }
        }
        // if you has object
        if (typeof state.khatema.pages == "string") {
            state.khatema.pages = JSON.parse(state.khatema.pages);
        }
        if (
            !state.khatema.pages.find(item => {
                return item === page_id;
            })
        ) {
            state.khatema.pages.push(page_id);
            state.khatema.remaining_pages = 604 - state.khatema.pages.length;
        }

        if (state.user.id) {
            // save Khatema to currentObject
            state.user.current_khatema = state.khatema;

            // save user Data
            localStorage.setItem("user", JSON.stringify(state.user));
        }

        localStorage.setItem("local_khatema", JSON.stringify(state.khatema));
    }
};

const actions = {
    login(store, user) {
        return Vue.http.post("auth", user).then(function (response) {
            if (response.body.status) {
                store.commit("token", response.body.data.token);
                store.commit("user", response.body.data.user);

                store.dispatch("upload_local_data");
            } else {
                throw new Error("auth failed");
            }
        });
    },

    register(store, user) {
        return Vue.http.post("auth/add_user", user).then(function (response) {
            if (response.body.status) {
                store.commit("token", response.body.data.token);
                store.commit("user", response.body.data.user);

                store.dispatch("upload_local_data");
            }
        });
    },
    profileUpdate(store, user) {
        return Vue.http.post("profile/update", user).then(function (response) {
            if (response.body.status) {
                store.commit("user", response.body.data);
            }
        });
    },

    forgetPassword(store, email) {
        return Vue.http.post("auth/forget-password", email);
    },

    read_page({state, commit}, page_id) {
        commit("READ_PAGE", page_id);

        var promise = new Promise((resolve, reject) => {
            resolve();
        });

        // if khatema completed

        if (state.khatema.pages.length >= 604) {
            if (state.user.id) {
                promise = Vue.http.post("khatemas/update", {
                    page_id: page_id
                });
            }
            commit("SET_COMPLETED_KHATEMA", state.khatema);
            commit("FILL_CURRENT_KHATEMA");
        } else {
            if (state.user.id) {
                promise = Vue.http
                    .post("khatemas/update", {
                        page_id: page_id
                    })
                    .then(
                        response => {
                            let data = response.data.data;

                            data.pages = JSON.parse(data.pages);

                            commit("FILL_CURRENT_KHATEMA", data);
                        },
                        response => {
                        }
                    );
            }
        }

        if (state.auth) {
            Vue.http.post("contests/updates", {
                page_id: page_id
            });
        }

        return promise;
    },

    upload_local_data({state, commit, rootState}) {
        Vue.http.post("khatemas/update", {
            pages: state.khatema.pages
        });

        Vue.http.post("contests/updates", {
            pages: state.khatema.pages
        });
        Vue.http.post("bookmarks/create", {
            ayah_id: (JSON.parse(localStorage.getItem("saved_ayat")) || []).map(
                function (item) {
                    return item.id;
                }
            )
        });
    }
};

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: [quran, contests]
});
