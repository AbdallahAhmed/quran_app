import Vue from 'vue';

export default {

    state: {
        khatema: {
            pages: [],
        },

        MIN_PER_PAGE: 4
    },

    getters: {
        currentKhatema(state) {
            return state.khatema;
        }
    },

    mutations: {
        FILL_CURRENT_KHATEMA(state, khatema) {
            if (khatema) {
                state.khatema = khatema;
                return;
            }
            state.khatema = {
                pages: [],
                created_at: Date.now().toISOString()
            };

            // save Khatema to currentObject
            state.user.current_khatema = state.khatema;

            // save user Data
            localStorage.setItem("user", JSON.stringify(state.user));
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
        },

    },

    actions: {

        read_page(state, page_id) {
            state.commit('READ_PAGE', page_id);

            var promise = null;
            // if khatema completed
            if (state.khatema.pages.length >= 604) {


                state.khatema.completed = 1;

                state.khatema.completed_at = Date.now().toISOString();


                promise = Vue.http.post("khatemas/update", state.khatema);


                state.commit('FILL_CURRENT_KHATEMA')

            } else {

                promise = Vue.http.post("khatemas/update", state.khatema).then((response)=> {

                    state.commit('FILL_CURRENT_KHATEMA',response.body.data)

                },(response)=>{


                });
                // action Update
            }

            return promise;
        }
    }
}
