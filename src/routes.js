import Vue from 'vue';

export default [
    {
        path: '/home/:tab/:sura_id?/:part_id?',
        component: require("./components/Home.vue"),
        beforeLeave: function (routeTo, routeFrom, resolve, reject) {
            Vue.app.store.commit("AYA", false);
            resolve();
        }
    },
    {
        path: '/sections',
        component: require("./components/Sections.vue")
    }, {
        path: '/search',
        component: require("./components/Search.vue")
    }, {
        path: '/preview/:page_id/:aya_id',
        component: require("./components/Preview.vue")
    },
    {
        path: '/forgetpassword',
        component: require("./components/ForgetPassword.vue")
    },
    {
        path: '/settings',
        component: require("./components/Settings.vue")
    }, {
        path: '/fav',
        component: require("./components/Fav.vue")
    },
    {
        path: '/login',
        component: require("./components/Login.vue"),
    },
    {
        path: '/register',
        component: require("./components/Register.vue")
    }, {
        path: '/editProfile',
        component: require("./components/EditProfile.vue")
    }, {
        path: '/khatima',
        component: require("./components/Khatima.vue")
    }, {
        path: '/alerts',
        component: require("./components/Alert.vue")
    }, {
        path: "/contest/:contest_id",
        component: require("./components/ContestDetailes.vue")
    },
      {
        path: "/khatimas/:khatima_id",
        component: require("./components/Khatima.vue")
    }, {
        path: '/allcontests',
        component: require("./components/ContestsAll.vue")
    },
    {
        path: '/expiredcontests',
        component: require("./components/ContestsExpired.vue")
    },
    {
        path: '/newcontest',
        component: require("./components/ContestNew.vue")
    }
];
