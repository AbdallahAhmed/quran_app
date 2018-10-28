import Vue from "vue";

const getters = {
  contests: state => state.contests.data
};

const state = {
    contests: {
        data: [],
        offset: 0
    }
};

const actions = {
    getContests({ commit, state }) {
        Vue.http
            .get(`contests`, {
                params: { offset: state.contests.offset, limit: 10 }
            })
            .then(contests => {
                commit("CONTESTS", contests);
            });
    }
};

const mutations = {
    CONTESTS(state, payload) {
        state.contests = { offset: state.contests.offset+10 , data: payload};
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};
