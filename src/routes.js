export default [
    {
        path: '/home/:tab/:sura_id',
        component: require("./components/Home.vue"),
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
    },  {
        path: '/fav',
        component: require("./components/Fav.vue")
    },
    // {
    //     path: '/category/:id',
    //     component: require("./components/pages/Category.vue")
    // },
    // {
    //     path: '/video/:id',
    //     component: require("./components/pages/Video.vue")
    // },
    // {
    //     path: '/settings',
    //     component: require("./components/Settings.vue")
    // },
    // {
    //     path: '/subscription',
    //     component: require("./components/pages/Subscription.vue")
    // },
    // {
    //     path: '/notifications',
    //     component: require("./components/pages/Notifications.vue")
    // },
    // {
    //     path: '/intro',
    //     component: require("./components/pages/Intro.vue")
    // },
    //
    // {
    //     path: '/about',
    //     component: require("./components/pages/About.vue")
    // },
    // {
    //     path: '/search',
    //     component: require("./components/pages/Search.vue")
    // },
    {
        path: '/login',
        component: require("./components/Login.vue"),
    },
    {
        path: '/register',
        component: require("./components/Register.vue")
    }, {
        path: '/khatima',
        component: require("./components/Khatima.vue")
    },
    // {
    //     path: '/local_login',
    //     component: require("./components/pages/LocalLogin.vue")
    // },
    // {
    //     path: '/contact',
    //     component: require("./components/pages/Contact.vue")
    // },
    // {
    //     path: '/help',
    //     component: require("./components/pages/Help.vue")
    // },
    // {
    //     path: '/edit_profile',
    //     component: require("./components/pages/EditProfile.vue")
    // },
    // {
    //     path: '/myaccount',
    //     component: require("./components/MyAccount.vue")
    // },
    // {
    //     path: '/offline',
    //     component: require("./components/Pages/Offline.vue")
    // },

];
