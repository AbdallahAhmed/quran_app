import Vue from 'vue';

export default {

    state: {
        "aya": false,
        "juz_sections": false,
        // "saved_ayat": JSON.parse(localStorage.getItem("saved_ayat")) || []
        "saved_ayat": [],
    },

    getters: {
        juz_sections: (state) => {
            return state.juz_sections
        },
        aya: (state) => {
            return state.aya
        },
        saved_ayat: (state, ayat) => {
            return state.saved_ayat;
        },
    },

    mutations: {
        JUZ_SECTION(state, data) {
            state.juz_sections = data;
        },
        AYA(state, status = false) {
            state.aya = status;
        },
        SAVED_AYA: (state, ayat) => {
            if (!state.saved_ayat.find((item) => {
                return ayat.id === item.id;
            })) {
                state.saved_ayat.unshift(ayat);
            }
            localStorage.setItem("saved_ayat", JSON.stringify(state.saved_ayat));
        },
        SAVED_AYAT: (state, ayat) => {
            state.saved_ayat = ayat;
            localStorage.setItem("saved_ayat", JSON.stringify(state.saved_ayat));
        },
        REMOVE_AYAT: (state, ayat_id) => {
            let ayat = state.saved_ayat.filter((item) => {
                return ayat_id!=item.id;
            })
            console.log(ayat,ayat_id);
            state.saved_ayat = ayat;
            localStorage.setItem("saved_ayat", JSON.stringify(state.saved_ayat));
        }
    },

    actions: {

        get_sura(store, options = {}) {
            options.lang = "ar";
            return Vue.http.get("surah", {params: options});
        },

        get_page(store, page_id) {
            return Vue.http.get("page", {
                params: {
                    lang : "ar",
                    page_id: page_id
                }
            });
        },

        save_aya(store, aya) {
            store.commit('SAVED_AYA', aya);
            return Vue.http.post("bookmarks/create", {ayah_id: aya.id});
        },
        get_saved_ayat(store) {
            return Vue.http.get("bookmarks").then(
                (res) => {
                    store.commit('SAVED_AYAT', res.body.data);
                }, () => {
                });
        },
        remove_saved_aya(store, id) {
            return Vue.http.post("bookmarks/delete", {ayah_id: id}).then(
                (res) => {
                    store.commit('REMOVE_AYAT', id);
                }, () => {
                    store.commit('REMOVE_AYAT', id);
                });
        },
        get_juz_section({commit}) {
            return Vue.http.get("juz_surat.json").then(resposne => {
                commit('JUZ_SECTION', resposne.body);
            }, (response) => {
                console.log('is not loaded')
            });
        }

    }
}
