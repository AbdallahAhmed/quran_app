import Vue from 'vue';

export default {

    state: {},

    getters: {},

    mutations: {},

    actions: {

        get_sura(store, id) {
            return Vue.http.get("surah", {params: {surah_id: id, lang: "ar"}});
        },

        save_aya(store, id) {
            return Vue.http.post("bookmarks/create", {params: {ayah_id: id}});
        },

    }
}
