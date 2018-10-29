import Vue from "vue";

const getters = {
    contests: state => state.contests.data,
    contests_authed_tab: state => state.contests_authed_tab,
    current_contest: state => state.current_contest,
};

const state = {
    contests: {
        data: [],
        offset: 0
    },
    contests_authed_tab: {
        all: [],
        expired: [],

    },
    current_contest: {},
};

const actions = {
    getContests({commit, state}) {
        Vue.http
            .get(`contests`, {
                params: {offset: state.contests.offset, limit: 10}
            })
            .then(contests => {
                commit("CONTESTS", contests.body.data);
            });
    },
    getAuthedContests({commit, state}) {
        return Vue.http.get(`contests`, {
            params: {
                offset: state.contests.offset,
                limit: 10,
                'status': 'all|expired|current'
            }
        })
            .then(res => {
                commit("CONTESTS_AUTHED_TAB", res.body.data);
            });
    }
};

const mutations = {
    CONTESTS(state, payload) {
        state.contests = {offset: state.contests.offset + 10, data: state.contests.data.concat(payload)};
    },
    CONTESTS_AUTHED_TAB(state, payload) {
        state.current_contest = payload.current[0] ? payload.current[0] : {};
        state.contests_authed_tab = payload;
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};
