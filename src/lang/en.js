export default {
    name: "Quran",

    close: "Close",

    choose_app: "Choose App",

    surah: "Surah",

    number_ayat: "Number of ayat",

    search_ayat: "Search for ayat",

    no_result: "No result found",
    alarms: "Alarms",
    repetition: "Repetition",
    never: "Never",
    daily: "Daily",
    reminder_never: "A reminder to recite some verses of the Qur'an",
    reminder_daily: "A reminder to recite some of the Quran's daily verses",
    error: "error",
    my_fav: "My bookmarks",
    fav: "Bookmarks",
    no_ayat: "No ayat exists",
    delete_aya: "Do you want to delete the aya ?",
    quran_share: "Quran share",

    setting: "Setting",
    login: "Login",
    edit_profile: "Edit profile",
    eval_app: "Evaluate app?",
    shared_done: "Shared successfully",

    share_message:
        "Please download the Quran app from the Google Play store of the link",

    save: "Save",

    saving: "Saving",
    themes: "Theme",

    font_size: "Font size",
    lang: "Language",

    signup: "Sign up",
    forget_password: " Forgot your password?",
    login_loading: "Signing in",
    add_user: "Sign up",

    error_login: "Your email and password are incorrect",

    restore_pass: "Restore your password",
    check_email: "Check your email",
    send: "Send",
    email: "Email",
    confirm_pass: "Confirm password",
    password: "Password",
    v_code: "Verification Code",
    curr_khatma: "Current Khatma",
    progress: "Progress",
    completed_at: "Completed at",
    hour: "Hour",
    hours: "Hours",
    spent: "spent",
    hours_left: "Hours Left",
    send_thawaab: "Send Thawaab to a friend",
    last_khatma: "Last Khatma",
    started_at: "Started at",
    enroll: "Enroll",
    enrolled: "Enrolled",
    saved: "Saved",
    copied: "Copied",
    err: "Error",
    "exist": "Do you want to exit the program ?",
    "quran": "Holly quran",
    "ok" : "OK",
    "cancel" : "Cancel",
    messages: {
        _default: function (e) {
            return "The " + e + " value is not valid.";
        },
        after: function (e, n) {
            var t = n[0];
            return "The " + e + " must be after " + t + ".";
        },
        alpha_dash: function (e) {
            return (
                "The " +
                e +
                " may contain alpha-numeric characters as well as dashes and underscores."
            );
        },
        alpha_num: function (e) {
            return "The " + e + " may only contain alpha-numeric characters.";
        },
        alpha_spaces: function (e) {
            return (
                "The " +
                e +
                " may only contain alphabetic characters as well as spaces."
            );
        },
        alpha: function (e) {
            return "The " + e + " may only contain alphabetic characters.";
        },
        before: function (e, n) {
            var t = n[0];
            return "The " + e + " must be before " + t + ".";
        },
        between: function (e, n) {
            var t = n[0],
                a = n[1];
            return "The " + e + " must be between " + t + " and " + a + ".";
        },
        confirmed: function (e) {
            return "The " + e + " confirmation does not match.";
        },
        credit_card: function (e) {
            return "The " + e + " is invalid.";
        },
        date_between: function (e, n) {
            var t = n[0],
                a = n[1];
            return "The " + e + " must be between " + t + " and " + a + ".";
        },
        date_format: function (e, n) {
            var t = n[0];
            return "The " + e + " must be in the format " + t + ".";
        },
        decimal: function (e, n) {
            void 0 === n && (n = ["*"]);
            var t = n[0];
            return (
                "The " +
                e +
                " must be numeric and may contain " +
                ("*" === t ? "" : t) +
                " decimal points."
            );
        },
        digits: function (e, n) {
            var t = n[0];
            return (
                "The " +
                e +
                " must be numeric and exactly contain " +
                t +
                " digits."
            );
        },
        dimensions: function (e, n) {
            var t = n[0],
                a = n[1];
            return (
                "The " + e + " must be " + t + " pixels by " + a + " pixels."
            );
        },
        email: function (e) {
            return "The " + e + " must be a valid email.";
        },
        ext: function (e) {
            return "The " + e + " must be a valid file.";
        },
        image: function (e) {
            return "The " + e + " must be an image.";
        },
        in: function (e) {
            return "The " + e + " must be a valid value.";
        },
        ip: function (e) {
            return "The " + e + " must be a valid ip address.";
        },
        max: function (e, n) {
            var t = n[0];
            return (
                "The " + e + " may not be greater than " + t + " characters."
            );
        },
        max_value: function (e, n) {
            var t = n[0];
            return "The " + e + " must be " + t + " or less.";
        },
        mimes: function (e) {
            return "The " + e + " must have a valid file type.";
        },
        min: function (e, n) {
            var t = n[0];
            return "The " + e + " must be at least " + t + " characters.";
        },
        min_value: function (e, n) {
            var t = n[0];
            return "The " + e + " must be " + t + " or more.";
        },
        not_in: function (e) {
            return "The " + e + " must be a valid value.";
        },
        numeric: function (e) {
            return "The " + e + " may only contain numeric characters.";
        },
        regex: function (e) {
            return "The " + e + " format is invalid.";
        },
        required: function (e) {
            return "The " + e + " is required.";
        },
        size: function (e, n) {
            var t = n[0];
            return "The " + e + " must be less than " + t + " KB.";
        },
        url: function (e) {
            return "The " + e + " is not a valid URL.";
        }
    },

    attributes: {
        username: "Username",
        name: "Name",
        email: "Email",
        password: "Password",
        repassword: "Confirm Password",
        first_name: "First name",
        last_name: "Last Name",
        confirm_password: "Confirm password"
    }
};
