import Vue from 'vue';

export default {

    state: {
        "aya": false,
        "juz_sections": false,
        "saved_ayat": JSON.parse(localStorage.getItem("saved_ayat")) || [],
        "page": parseInt(localStorage.getItem("page")) || 0,
        "sura": JSON.parse(localStorage.getItem("sura")) || false,
        "last_sura": parseInt(localStorage.getItem("last_sura")) || 0,
        "last_page": parseInt(localStorage.getItem("last_page")) || 0,
        "last_part": parseInt(localStorage.getItem("last_part")) || 1,
        "loader": true,
        "scroll": parseInt(localStorage.getItem("scroll")) || 0,
    },

    getters: {
        juz_sections: (state) => {
            return state.juz_sections
        },

        aya: (state) => {
            return state.aya
        },

        loader: (state) => {
            return state.loader
        },

        sura: (state) => {
            return state.sura
        },

        last_sura: (state) => {
            return state.last_sura;
        },

        last_part_id: (state) => {
            return state.last_part
        },

        last_part: (state) => {
            return state.juz_sections[state.last_part];
        },

        last_page: (state) => {
            return state.last_page;
        },

        page: (state) => {
            return state.page
        },

        saved_ayat: (state) => {
            return state.saved_ayat;
        },

        scroll: (state) => {
            return state.scroll;
        },
    },

    mutations: {

        LOADER(state, status = true) {
            state.loader = status;
        },

        JUZ_SECTION(state, data) {
            state.juz_sections = data;
        },

        AYA(state, status = false) {
            state.aya = status;
        },

        PAGE(state, page = 1) {
            state.page = page;
            localStorage.setItem("page", parseInt(state.page));
        },

        LAST_SURA(state, sura) {
            state.last_sura = sura;
            localStorage.setItem("last_sura", parseInt(state.last_sura));
        },

        LAST_PART(state, part) {
            state.last_part = part;
            localStorage.setItem("last_part", parseInt(state.last_part));
        },

        LAST_PAGE(state, page) {
            state.last_page = page;
            localStorage.setItem("last_page", parseInt(state.last_page));
        },

        SCROLL(state, scroll) {
            state.scroll = scroll;
            localStorage.setItem("scroll", parseInt(state.scroll));
        },

        SURA(state, sura) {

            state.sura = sura;
            localStorage.setItem("sura", JSON.stringify(state.sura));

            state.page = parseInt(Object.keys(state.sura.pages)[0]);
            localStorage.setItem("page", state.page);
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
                return ayat_id != item.id;
            })
            state.saved_ayat = ayat;
            localStorage.setItem("saved_ayat", JSON.stringify(state.saved_ayat));
        }
    },

    actions: {

        get_sura(store, options = {}) {
            options.lang = "ar";

            if (window.getFileAsJson) {
                if (options.surah_id == 2) {
                    return Promise.all([
                        window.getFileAsJson(`suras/${options.surah_id}-1.json`),
                        window.getFileAsJson(`suras/${options.surah_id}-2.json`),
                        window.getFileAsJson(`suras/${options.surah_id}-3.json`),
                    ]).then((res) => {
                        var first = res[0];
                        first.data.data.pages = Object.assign({}, res[1].data.data.pages, first.data.data.pages, res[2].data.data.pages)
                        return first;
                    });
                }
                return getFileAsJson(`suras/${options.surah_id}.json`);
            }
            return Vue.http.get("surah", {params: options})
        },

        get_page(store, page_id) {
            return Vue.http.get("page", {
                params: {
                    lang: "ar",
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
                    store.commit('SAVED_AYAT', (JSON.parse(localStorage.getItem("saved_ayat")) || []));
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
            return new Promise((resolve, reject) => {
                var sections = require('./../../assets/quran/juz_surat');
                commit('JUZ_SECTION', sections);
                resolve(sections);

            })
        }

    }
}
