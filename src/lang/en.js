export default {

    name: "Quran",

    close: "Close",

    choose_app: "Choose App",

    surah: "Surah",

    number_ayat: "Number of ayat",

    "search_ayat": "Search for ayat",

    "no_result": "No result found",


    messages: {
        _default: function (e) {
            return "The " + e + " value is not valid."
        }, after: function (e, n) {
            var t = n[0];
            return "The " + e + " must be after " + t + "."
        }, alpha_dash: function (e) {
            return "The " + e + " may contain alpha-numeric characters as well as dashes and underscores."
        }, alpha_num: function (e) {
            return "The " + e + " may only contain alpha-numeric characters."
        }, alpha_spaces: function (e) {
            return "The " + e + " may only contain alphabetic characters as well as spaces."
        }, alpha: function (e) {
            return "The " + e + " may only contain alphabetic characters."
        }, before: function (e, n) {
            var t = n[0];
            return "The " + e + " must be before " + t + "."
        }, between: function (e, n) {
            var t = n[0], a = n[1];
            return "The " + e + " must be between " + t + " and " + a + "."
        }, confirmed: function (e) {
            return "The " + e + " confirmation does not match."
        }, credit_card: function (e) {
            return "The " + e + " is invalid."
        }, date_between: function (e, n) {
            var t = n[0], a = n[1];
            return "The " + e + " must be between " + t + " and " + a + "."
        }, date_format: function (e, n) {
            var t = n[0];
            return "The " + e + " must be in the format " + t + "."
        }, decimal: function (e, n) {
            void 0 === n && (n = ["*"]);
            var t = n[0];
            return "The " + e + " must be numeric and may contain " + ("*" === t ? "" : t) + " decimal points."
        }, digits: function (e, n) {
            var t = n[0];
            return "The " + e + " must be numeric and exactly contain " + t + " digits."
        }, dimensions: function (e, n) {
            var t = n[0], a = n[1];
            return "The " + e + " must be " + t + " pixels by " + a + " pixels."
        }, email: function (e) {
            return "The " + e + " must be a valid email."
        }, ext: function (e) {
            return "The " + e + " must be a valid file."
        }, image: function (e) {
            return "The " + e + " must be an image."
        }, in: function (e) {
            return "The " + e + " must be a valid value."
        }, ip: function (e) {
            return "The " + e + " must be a valid ip address."
        }, max: function (e, n) {
            var t = n[0];
            return "The " + e + " may not be greater than " + t + " characters."
        }, max_value: function (e, n) {
            var t = n[0];
            return "The " + e + " must be " + t + " or less."
        }, mimes: function (e) {
            return "The " + e + " must have a valid file type."
        }, min: function (e, n) {
            var t = n[0];
            return "The " + e + " must be at least " + t + " characters."
        }, min_value: function (e, n) {
            var t = n[0];
            return "The " + e + " must be " + t + " or more."
        }, not_in: function (e) {
            return "The " + e + " must be a valid value."
        }, numeric: function (e) {
            return "The " + e + " may only contain numeric characters."
        }, regex: function (e) {
            return "The " + e + " format is invalid."
        }, required: function (e) {
            return "The " + e + " is required."
        }, size: function (e, n) {
            var t = n[0];
            return "The " + e + " must be less than " + t + " KB."
        }, url: function (e) {
            return "The " + e + " is not a valid URL."
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
}
