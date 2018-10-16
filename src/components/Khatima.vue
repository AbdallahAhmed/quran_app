<template>
    <f7-page :class="'page-khatima'">

        <navbar></navbar>

        <div class="loader-wrapper" v-if="false">
            <div class="preloader color-green"></div>
        </div>


        <p class="page-title">تقدمك</p>
        <div class="khatima-list">
            <div class="khatima-wrapper">
                <h1 class="khatima-title">الخاتمة الحالية </h1>
                <div class="row info">
                    <div class="col-50">
                        <div class="row">
                            <div class="col-30">
                                <img src="./../assets/img/noun_calender_652711.png"/>
                            </div>
                            <div class="col-70">
                                <span>أكتمل فى </span>
                                <span>09/09/2018</span>
                            </div>
                        </div>

                    </div>
                    <div class="col-50">
                        <div class="row">
                            <div class="col-30">
                                <img src="./../assets/img/clock.png"/>
                            </div>
                            <div class="col-70">
                                <span>أكتمل فى </span>
                                <span> 25 ساعة  </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="gauge gauge-khatima">

                    <p class="gauge-content">
                        <span>قضيت</span>
                        <span>10</span>
                        <span>ساعات</span>
                    </p>
                </div>
                <div class="row footer">
                    <div class="col-100">
                        <p>40 ساعة متبقية تقربيأ</p>
                    </div>
                </div>

            </div>
            <button class="btn-quran btn-send">
                ارسل الثوب إلى صديق
            </button>


        </div>
    </f7-page>

</template>

<script>

    export default {
        data() {
            return {};
        },
        created() {

        }, components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        },
        mounted() {
            var gauge = this.$f7.gauge.create({
                el: '.gauge-khatima',
                type: 'circle',
                value: 0.75,
                size: 120,
                borderColor: '#f5be3a',
                borderWidth: 4,
                valueText: '',
            });
            console.log(gauge);
        }
    }
</script>
