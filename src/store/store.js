import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/user';
import Post from './modules/post';
import Category from './modules/category';
import quran from './modules/quran';

Vue.use(Vuex);

const state = {
    locale: "ar",
    unread: 0,
    allow_notifications: localStorage.getItem("allow_notifications") || 1,
    notifications: [],
    video_autoplay: localStorage.getItem("video_autoplay") || 1,
    guest_alert: false,
    overlay: false
};

const getters = {

    locale(state) {
        return state.locale;
    },

    direction(state) {
        return state.locale == "ar" ? "rtl" : "ltr";
    },

    guest_alert(state) {
        return state.guest_alert;
    },

    unread(state) {
        return state.unread;
    },

    allow_notifications(state) {
        return state.allow_notifications;
    },

    notifications(state) {
        return state.notifications;
    },

    video_autoplay(state) {
        return parseInt(state.video_autoplay);
    },

    overlay(state) {
        return state.overlay;
    }
};

const mutations = {

    locale(state, locale) {
        state.locale = locale;
        localStorage.setItem("locale", locale);
    },

    guest_alert(state, value) {
        state.guest_alert = value;
    },

    unread(state, count) {
        state.unread = count;
    },

    overlay(state, overlay) {
        console.log("->" + overlay);
        state.overlay = overlay;
    },

    allow_notifications(state, value) {
        state.allow_notifications = value;
        localStorage.setItem("allow_notifications", value);
    },

    notifications(state, notifications) {
        state.notifications = notifications;
    },

    video_autoplay(state, value) {
        state.video_autoplay = value;
        localStorage.setItem("video_autoplay", value);
    }
};

const actions = {

    guest_alert(store, value) {
        store.commit('guest_alert', value);
    },

    unread(state, count) {
        return Vue.http.get("notifications/get_new").then(function (response) {
            store.commit("unread", response.body.count);
        });
    },

    read(state, notification_id) {
        return Vue.http.get("notifications/read", {params: {notification_id: notification_id}}).then(function (response) {

            let notifications = store.getters.notifications.map(function (notification) {

                if (notification.id == notification_id) {
                    notification.seen = 1;
                }

                return notification;
            });

            store.commit("unread", store.getters.unread - 1);
        });
    },

    notifications(store) {
        return Vue.http.get("notifications/list_notifications").then(function (response) {
            store.commit("notifications", response.body.notifications);
        });
    }
};

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: [
        User,
        Post,
        Category,
        quran
    ]
});
