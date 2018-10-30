import Vue from "vue";

const getters = {
    contests: state => state.unauthedContests.data,
    contests_authed_tab: state => state.contests,
    currentContest: state => state.currentContest,
    allContests: state => state.contests.data
};

const state = {
    unauthedContests:{
        data: [],
        offset: 0
    },
    contests: {
        data: [],
        expired: [],
        offset: 0,
        expiredOffset:0
    },
    currentContest: {},
};

const actions = {
    getContests({ commit, state }) {
        Vue.http
            .get(`contests`, {
                params: { offset: state.unauthedContests.offset, limit: 10 }
            })
            .then(res => {
                commit("CONTESTS", res.body.data);
            });
    },
    getAuthedContests({ commit, state }) {
        return Vue.http
            .get(`contests`, {
                params: {
                    offset: state.contests.offset,
                    limit: 5,
                    status: "all|expired|current"
                }
            })
            .then(res => {
                commit("CONTESTS_AUTHED_TAB", res.body.data);
            });
    },
    loadAllContests({ commit, state }) {
        return Vue.http
            .get("contests", {
                params: {
                    offset: state.contests.offset,
                    limit: 5,
                    status:'all'
                }
            })
            .then(res => {
                commit("ALL_CONTESTS", res.body.data.all);
                return res.body.data.all;
            });
    },
    leaveContest({ commit, state }, payload) {
        return Vue.http
            .post("contests/leave", {
                contest_id: payload
            })
            .then(() => {
                commit("LEAVE_CONTEST", payload);
            });
            
    },
    joinContest({ commit, state }, payload) {
        return Vue.http
            .post("contests/join", {
                contest_id: payload
            })
            .then(() => {
                commit("JOIN_CONTEST", payload);
            });
    }
};

const mutations = {
    CONTESTS(state, payload) {
        state.unauthedContests = {
            offset: state.unauthedContests.offset + 10,
            data: state.unauthedContests.data.concat(payload)
        };
    },
    CONTESTS_AUTHED_TAB(state, payload) {
        state.currentContest = payload.current[0] ? payload.current[0] : {};
        state.contests.data = payload.all;
        state.contests.expired = payload.expired;
        state.contests.offset += 5;

    },
    ALL_CONTESTS(state, payload) {
        state.contests.data = (state.contests.data).concat(payload);
        state.contests.offset += 5;
        console.log(state.contests.offset)
    },
    JOIN_CONTEST(state, payload) {
        var contests = state.contests.data;
        for (let i = 0; i < contests.length; i++) {
            if (contests[i].id == payload) {
                contests[i].is_joined = true;
                state.currentContest = contests[i];
            } else contests[i].is_joined = false;
        }
        state.contests.data = contests;
    },
    LEAVE_CONTEST(state, payload) {
        var contests = state.contests.data;
        for (let i = 0; i < contests.length; i++)
            if (contests[i].id == payload) 
            (contests[i].is_joined = false) || (state.currentContest = {});
        state.contests.data = contests;
        state.currentContest = {};

    }
};

export default {
    state,
    mutations,
    getters,
    actions
};
