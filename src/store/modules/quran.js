import Vue from 'vue';

export default {

    state: {
        "aya": false,
        "juz_sections": {}
    },

    getters: {
        juz_sections: (state) => {
            return state.juz_sections
        },
        aya: (state) => {
            return state.aya
        }
    },

    mutations: {
        JUZ_SECTION(state, data) {
            state.juz_sections = data;
        },
        AYA(state, status = false) {
            state.aya = status;
        }
    },

    actions: {

        get_sura(store, id) {
            return Vue.http.get("surah", {params: {surah_id: id, lang: "ar"}});
        },

        save_aya(store, id) {
            return Vue.http.post("bookmarks/create", {params: {ayah_id: id}});
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
