<template>
    <f7-page :class="'page-khatima'">

        <navbar></navbar>

        <div class="loader-wrapper" v-if="false">
            <div class="preloader color-green"></div>
        </div>


        <p class="page-title">{{$app.t('progress')}}</p>
        <div class="khatima-list">
            <div class="khatima-wrapper">
                <h1 class="khatima-title">{{$app.t('curr_khatma')}} </h1>
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
                                <span>{{$app.t('completed_at')}} </span>
                                <span> 25 {{$app.t('hour')}}  </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="gauge gauge-khatima">

                    <p class="gauge-content">
                        <span>{{$app.t("spent")}}</span>
                        <span>10</span>
                        <span>{{$app.t("hours")}}</span>
                    </p>
                </div>
                <div class="row footer">
                    <div class="col-100">
                        <p>40 {{$app.t('hours_left')}}</p>
                    </div>
                </div>

            </div>
            <button class="btn-quran btn-send">
               {{$app.t('send_thawaab')}}
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
