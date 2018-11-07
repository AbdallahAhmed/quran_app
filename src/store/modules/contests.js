import Vue from "vue";

const getters = {
    contests: state => state.unauthedContests.data,
    contests_authed_tab: state => state.contests,
    currentContest: state => state.currentContest,
    allContests: state => state.contests.data,
    expiredContests: state => state.contests.expired
};

const state = {
    unauthedContests: {
        data: [],
        offset: 0
    },
    contests: {
        data: [],
        expired: [],
        offset: 0,
        expiredOffset: 0
    },
    currentContest: {}
};

const actions = {
    getContests({ commit, state }) {
        return Vue.http
            .get(`contests`, {
                params: {
                    offset: state.unauthedContests.offset,
                    limit: 5,
                    status: "all"
                }
            })
            .then(res => {
                commit("CONTESTS", res.body.data.all);
                return res.body.data.all;
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
                    status: "all"
                }
            })
            .then(res => {
                commit("ALL_CONTESTS", res.body.data.all);
                return res.body.data.all;
            });
    },
    loadExpiredContests({ commit, state }) {
        return Vue.http
            .get("contests", {
                params: {
                    offset: state.contests.expiredOffset,
                    limit: 5,
                    status: "expired"
                }
            })
            .then(res => {
                commit("EXPIRED_CONTESTS", res.body.data.expired);
                return res.body.data.expired;
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
    },
    createContest({ commit }, payload) {
        return Vue.http.post("contests/create", payload).then(res => {
            commit("CREATE_CONTEST", res.body.data);
        });
    }
};

const mutations = {
    CONTESTS(state, payload) {
        state.unauthedContests.offset = state.unauthedContests.offset + 5;
        state.unauthedContests.data = state.unauthedContests.data.concat(
            payload
        );
    },
    CONTESTS_AUTHED_TAB(state, payload) {
        state.currentContest = payload.current[0] ? payload.current[0] : {};
        state.contests.data = payload.all;
        state.contests.expired = payload.expired;
        state.contests.offset += 5;
        state.contests.expiredOffset += 5;
    },
    ALL_CONTESTS(state, payload) {
        state.contests.data = state.contests.data.concat(payload);
        state.contests.offset += 5;
    },
    EXPIRED_CONTESTS(state, payload) {
        state.contests.expired = state.contests.expired.concat(payload);
        state.contests.expiredOffset += 5;
    },
    JOIN_CONTEST(state, payload) {
        var contests = state.contests.data;
        for (let i = 0; i < contests.length; i++) {
            if (contests[i].id == payload) {
                contests[i].is_joined = true;
                contests[i].member_counter++;
                state.currentContest = contests[i];
            } else contests[i].is_joined = false;
        }
        state.contests.data = contests;
    },
    LEAVE_CONTEST(state, payload) {
        var contests = state.contests.data;
        for (let i = 0; i < contests.length; i++)
            if (contests[i].id == payload) {
                contests[i].is_joined = false;
                state.currentContest = {};
                contests[i].member_counter--;
            }
        state.contests.data = contests;
        state.currentContest = {};
    },
    CREATE_CONTEST(state, payload) {
        state.currentContest = payload;
        state.contests.data = state.contests.data.concat([payload]);
        state.contests.offset++;
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};
