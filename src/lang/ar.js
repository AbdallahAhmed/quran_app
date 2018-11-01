export default {
    name: "القران",

    close: "إغلاق",

    choose_app: "إختر تطبيق",
    surah: "سورة",
    number_ayat: "عدد الايات",
    search_ayat: "بحث عن الأيات",
    no_result: "لا يوجد نتائج بحث",
    alarms: "التنبيهات",
    repetition: "تكرار",
    never: "أبدا",
    daily: "يوميا",
    reminder_never: " اليوم تذكير بتلاوة بعض آيات القرآن",
    reminder_daily: "تذكير بتلاوة بعض آيات القرآن اليومية",
    error: "خطأ",
    my_fav: "آياتي المفضلة",
    fav: "المفضلة",
    no_ayat: "لا يوجد آيات",
    delete_aya: "هل تريد حذف الآية ؟",
    quran_share: "انشر القرأن",

    setting: "اﻷعدادات",
    login: "تسجيل الدخول",
    edit_profile: " تعديل الملف الشخصى",
    eval_app: "هل تريد تقييم التطبيق ؟",
    shared_done: "تمت المشاركة",
    share_message: "يرجي تحميل تطبيق القرآن الكريم من متجر جوجل بلاي من الرابط",
    save: "حفظ",
    saving: "جاري الحفظ",
    themes: "الشكل",
    font_size: "حجم الخط",
    lang: "اللغة",
    signup: "  مستخدم جديد",
    forget_password: "نسيت كلمة المرور؟",
    login_loading: "جاري تسجيل الدخول",
    error_login: "البريد الكترونى وكلمة المرور غير صحيحين",
    add_user: "إنشاء حساب",
    restore_pass: "استرجاع كلمة المرور",
    check_email: "إفحص بريدك الكترونى",
    send: "إرسال",
    email: "البريد الإلكتروني",
    confirm_pass:"تاكيد كلمة المرور",
    password: "كلمة المرور",
    v_code:"كود الدخول",
    curr_khatma:"الخاتمة الحالية",
    progress:"تقدمك",
    completed_at:"أكتمل فى",
    hour:"ساعة",
    hours:"ساعات",
    spent:"قضيت",
    hours_left:"ساعة متبقية تقربيأ",
    send_thawaab:" ارسل الثوب إلى صديق",
    last_khatma:"الخاتمة السابقة ",
    started_at:"بدأ فى",
    enroll:"إشتراك",
    enrolled:"مشترك",
    saved:"تم الحفظ",
    copied:"تم النسخ",
    err:"خطأ",
    "exist":"هل تريد الخروج من البرنامج ؟",
    "his_aya":"أياتها",
    "quran": "القرآن الكريم",
    "ok" : "موافق",
    "cancel" : "إلغاء",

    "password_mismatched" : "كلمة المرور لا تماثل التأكيد",

    messages: {
        _default: function(n) {
            return "قيمة الحقل " + n + " غير صحيحة.";
        },
        after: function(n, e) {
            var r = e[0];
            return n + " يجب ان يكون بعد " + r + ".";
        },
        alpha_dash: function(n) {
            return n + " قد يحتوي على حروف او الرموز - و _.";
        },
        alpha_num: function(n) {
            return n + " قد يحتوي فقط على حروف وارقام.";
        },
        alpha_spaces: function(n) {
            return n + " قد يحتوي فقط على حروف ومسافات.";
        },
        alpha: function(n) {
            return n + " يجب ان يحتوي على حروف فقط.";
        },
        before: function(n, e) {
            var r = e[0];
            return n + " يجب ان يكون قبل " + r + ".";
        },
        between: function(n, e) {
            var r = e[0],
                t = e[1];
            return "قيمة " + n + " يجب ان تكون ما بين " + r + " و " + t + ".";
        },
        confirmed: function(n, e) {
            e[0];
            return n + " لا يماثل التأكيد.";
        },
        date_between: function(n, e) {
            var r = e[0],
                t = e[1];
            return n + " يجب ان يكون ما بين " + r + " و " + t + ".";
        },
        date_format: function(n, e) {
            var r = e[0];
            return n + " يجب ان يكون على هيئة " + r + ".";
        },
        decimal: function(n, e) {
            void 0 === e && (e = ["*"]);
            var r = e[0];
            return (
                n +
                " يجب ان يكون قيمة رقمية وقد يحتوي على " +
                ("*" === r ? "" : r) +
                " ارقام عشرية."
            );
        },
        digits: function(n, e) {
            var r = e[0];
            return (
                n +
                " يجب ان تحتوي فقط على ارقام والا يزيد عددها عن " +
                r +
                " رقم."
            );
        },
        dimensions: function(n, e) {
            var r = e[0],
                t = e[1];
            return n + " يجب ان تكون بمقاس " + r + " بكسل في " + t + " بكسل.";
        },
        email: function(n) {
            return n + " يجب ان يكون بريدا اليكتروني صحيح.";
        },
        ext: function(n) {
            return "نوع ملف " + n + " غير صحيح.";
        },
        image: function(n) {
            return n + " يجب ان تكون صورة.";
        },
        in: function(n) {
            return "الحقل " + n + " يجب ان يكون قيمة صحيحة.";
        },
        ip: function(n) {
            return n + " يجب ان يكون ip صحيح.";
        },
        max: function(n, e) {
            var r = e[0];
            return (
                "الحقل " + n + " يجب ان يحتوي على " + r + " حروف على الأكثر."
            );
        },
        mimes: function(n) {
            return "نوع ملف " + n + " غير صحيح.";
        },
        min: function(n, e) {
            var r = e[0];
            return "الحقل " + n + " يجب ان يحتوي على " + r + " حروف على الأقل.";
        },
        not_in: function(n) {
            return "الحقل " + n + " غير صحيح.";
        },
        numeric: function(n) {
            return n + " يمكن ان يحتوي فقط على ارقام.";
        },
        regex: function(n) {
            return "الحقل " + n + " غير صحيح.";
        },
        required: function(n) {
            return n + " مطلوب.";
        },
        size: function(n, e) {
            var r = e[0];
            return n + " يجب ان يكون اقل من " + r + " كيلوبايت.";
        },
        url: function(n) {
            return "الحقل " + n + " يجب ان يكون رابطاً صحيحاً.";
        }
    },

    attributes: {
        username: "إسم المستخدم",
        name: "إسم المستخدم",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        confirm_password: "تأكيد كلمة المرور",
        first_name: "الإسم الأول",
        last_name: "الإسم الأخير",
        form_subject: "الموضوع",
        form_messages: "الرسالة",

        confirm_password: "كلمة المرور"
    }
};
