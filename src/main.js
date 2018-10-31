/**
 * F7 Themes
 * Avaiable themes ['ios', 'material']
 */
const theme = 'material';

import Vue from 'vue';
import App from './components/App.vue';
import VueResource from 'vue-resource';
import VueCordova from 'vue-cordova';
import VueScroller from 'vue-scroller'
import Routes from './routes';
import {store} from './store/store';
import {i18n} from "./i18n";
import debounce from "./helpers/debounce";
import {isElementInView} from "./helpers/helpers";

import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';

Vue.use(vuescroll);

Vue.prototype.$vuescrollConfig = {

    rail: {
        background: '#207249',
    },

    bar: {
        background: '#207249',
        opacity: 0.4
    },

    vuescroll: {

        mode: 'slide',
        sizeStrategy: 'percent',
        detectResize: true,
        pullRefresh: {
            enable: true,
            tips: {
                deactive: '',
                active: '',
                start: '',
                beforeDeactive: ''
            }
        },

        pushLoad: {
            enable: true,
            auto: true,
            autoLoadDistance: 10,
            tips: {
                deactive: '',
                active: '',
                start: '',
                beforeDeactive: ''
            },
        },

        scroller: {
            bouncing: true
        }
    }
};

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/css/framework7.css';

import Application from './components/App.vue';

require('framework7-icons/css/framework7-icons.css');
require('./assets/css/styles.css');
require('./assets/css/ltr.css');
require('./assets/css/animations.css');

Vue.use(VueResource);

Vue.use(VueScroller);

import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

Vue.use(VueCordova, {});

Vue.conf = require("./config").items;
Vue.prototype.$config = Vue.conf;


//English to Arabic digits.
String.prototype.toAr = function () {
    return this.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
}


/**
 *  Application object
 */
Vue.app = {

    vue: false,

    cordova: false,

    f7: false,

    mainView: false,

    dom: false,

    i18n: i18n,

    store: store,

    initialize: function () {

        const self = this;

        /**
         * set API base url
         * @type {string}
         */
        Vue.http.options.root = Vue.app.config.get("url");

        let locale = store.getters.locale;

        alert(locale);

        /**
         * append access token to every request
         */
        Vue.http.interceptors.push(function (request, next) {

            if (Vue.app.auth.check()) {
                request.headers.set('Authorization', 'Bearer ' + Vue.app.auth.token());
            }

            next();
        });

        /**
         * initializing vue instance
         * @type {Vue$3|Vue}
         */
        this.vue = new Vue({

            el: '#app',

            render: h => h(App),

            i18n,
            store,

            components: {
                app: Application
            }
        });

    },

    on: function (service, callback) {

        return document.addEventListener(service, function () {
            callback(Vue.app);
        });

    },

    /**
     * application config
     */
    config: {

        /**
         * get config item value
         * @param item
         * @returns {boolean}
         */
        get: function (item) {
            return Vue.conf[item] !== undefined ? Vue.conf[item] : false;
        },

        /**
         * set config item value
         * @param name
         * @param value
         */
        set: function (name, value) {
            Vue.conf[name] = value;
        }

    },

    isElementInView: isElementInView,

    debounce: debounce,

    auth: {

        /**
         * get logged user
         * @returns {boolean}
         */
        user: function (field) {

            if (field) {

                // if(field == "photo_url"){
                //     if(store.getters.user && store.getters.user.image !== undefined){
                //         return store.getters.user.image.medium_thumbnail
                //     }else{
                //         return false;
                //     }
                // }

                if (field == "photo_url") {
                    return store.getters.user.image ? store.getters.user.image.medium_thumbnail : false;
                } else {
                    return store.getters.user[field] !== undefined ? store.getters.user[field] : false;
                }

            }

            return store.getters.user;
        },

        /**
         * get user token
         * @returns {Vue.app.auth.token|*|getters.token|null|token}
         */
        token: function () {
            return store.getters.token;
        },

        /**
         * get user token expiration
         * @returns {*|getters.expiration|number|expiration}
         */
        expiration: function () {
            return store.getters.expiration;
        },

        /**
         * check user
         * @returns {boolean}
         */
        check: function () {

            if (store.getters.auth) {
                return true;
            }

            return false;
        },

        logout: function () {
            Vue.app.store.commit('logout');
            Vue.app.reload();
        }
    },

    /**
     * get current locale
     * @returns {string}
     */
    theme: function () {
        return theme;
    },

    /**
     * check current theme if IOS
     * @returns {boolean}
     */
    isIOS: function () {
        return this.theme() === "ios";
    },

    /**
     * check current theme if android/material
     * @returns {boolean}
     */
    isMaterial: function () {
        return this.theme() === "material";
    },

    /**
     * get current application locale
     */
    locale: function () {
        return this.store.getters.locale;
    },

    /**
     * get current application direction
     * @returns {string}
     */
    direction: function () {
        return this.store.getters.locale === "ar" ? "rtl" : "ltr";
    },

    /**
     * check current application direction if rtl
     * @returns {boolean}
     */
    isRTL: function () {
        return this.direction() === "rtl";
    },

    /**
     * check current application direction if ltr
     * @returns {boolean}
     */
    isLTR: function () {
        return this.direction() === "ltr";
    },

    /**
     * get translations
     * @param key
     * @returns {TranslateResult|VueI18n.TranslateResult|*}
     */
    trans: function (key) {
        return this.i18n.t(key, this.store.getters.locale)
    },
    t: function (key) {
        return this.i18n.t(key, this.store.getters.locale)
    },
    /**
     * application router object
     */
    router: {

        /**
         * redirect to a given url
         * @param url
         * @returns {*}
         */
        load: function (url) {
            return Vue.app.vue.$f7Router.mainView.router.loadPage(url);
        },

        /**
         * redirect to previous url
         * @returns {*}
         */
        back: function () {
            return Vue.app.vue.$f7Router.framework7.mainView.router.back();
        }
    },

    reload() {

        if (device.platform == 'Android') {
            document.location.href = "android.html";
        } else if (device.platform == 'iOS') {
            document.location.href = "ios.html";
        }
    }
};

Vue.prototype.$app = Vue.app;


// APP init

Vue.app.initialize();

// Enable FastClick

// document.addEventListener('deviceready', () => {
//     FastClick.attach(document.body);
// });

/*document.addEventListener('deviceready', () => {

    if (store.getters.allow_notifications == 0) {
        return false;
    }

    if (window.localStorage.getItem('has_run') == '') {
        window.FirebasePlugin.grantPermission();
        window.localStorage.setItem('has_run', 'true');
    }

    window.FirebasePlugin.onNotificationOpen(function (notification) {

        let page = notification.page || false;
        let id = notification.id || false;

        if (!page) {
            alert("Invalid Notification");
        }

        if (page == "video" && id) {
            Vue.app.router.load("/video/" + id);
        }

    });

});*/

// Native click

document.body.addEventListener('click', () => {
    if (nativeclick !== undefined) {
        nativeclick.trigger();
    }
});

// Fix android Back behaviour

document.addEventListener('deviceready', () => {


    // StatusBar.show();

    // Bind to the back button for Android

    document.addEventListener('backbutton', function () {

        // NOTE: The back button will behave differently depending on circumstance
        // If the side panel is open, close it
        if (document.querySelector('.panel-left.active')) {
            // This will do nothing when the split-view is open
            return Vue.app.vue.$f7.closePanel();
        }
        // Close modals
        // @TODO How to handle modals we shouldn't close like a login-screen?
        if (document.querySelector('.modal-in')) {
            return Vue.app.vue.$f7.closeModal();
        }

        // If we have a back button, we want it to go back

        if (Vue.app.vue.$f7.view.main.history.length > 1) {
            return Vue.app.vue.$f7.view.main.router.back();
        } else {
            Vue.app.vue.$f7.dialog.confirm(Vue.app.trans('exist'), () => {
                window.navigator.app.exitApp();
            });
        }
    });

});

document.addEventListener('deviceready', function () {

    cordova.plugins.notification.local.hasPermission(function (granted) {
        if (!granted) {
            cordova.plugins.notification.local.requestPermission();
        }
    });

}, false);

// On offline event
document.addEventListener("offline", function () {

    //Vue.app.router.load("/offline");

    // Vue.app.f7.addNotification({
    //     message: Vue.app.trans("offline_message"),
    //     hold: false
    // });
}, false);

Object.defineProperty(Array.prototype, 'unique', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function () {
        var a = this.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }
});
