<template>
    <div :class="'navbar-fixed  page-khatima'">

        <navbar></navbar>
        <p class="page-title">تقدمك</p>



        <div class="loader-wrapper" v-if="loading">
            <div class="preloader color-green"></div>
        </div>


        <div class="khatima-list" v-if="khatemas.pending.id">
            <div class="khatima-wrapper">
                <h1 class="khatima-title">الخاتمة الحالية </h1>

                <div class="gauge  gauge-khatima gauge-khatima-current"
                     data-type="circle"
                     :data-value="percentage(khatemas.pending.pages)"
                     data-value-text=""
                     data-size="120"
                     data-border-width="4"
                     data-border-color="#f5be3a">

                    <p class="gauge-content">
                        <span>قضيت</span>
                        <span>{{((len(khatemas.pending.pages)/60).toFixed(1))}}</span>
                        <span>ساعات</span>
                    </p>
                </div>
                <div class="row footer">
                    <div class="col-100">
                        <p>{{(10-(len(khatemas.pending.pages)/60)).toFixed(1)}} ساعة متبقية تقربيأ</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="khatima-list" v-for="khtma in this.khatemas.completed" :key="khtma.id">
            <div class="khatima-wrapper">
                <h1 class="khatima-title">الخاتمة السابقة </h1>
                <div class="row info">
                    <div class="col-50">
                        <div class="row">
                            <div class="col-30">
                                <img src="./../assets/img/noun_calender_652711.png"/>
                            </div>
                            <div class="col-70">
                                <span>بدأ فى</span>
                                <span>{{moment(khtma.created_at).format('YYYY/MM/DD')}} </span>
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
                                <span>{{moment(khtma.completed_at).format('YYYY/MM/DD')}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="gauge gauge-khatima"
                     data-type="circle"
                     data-value="1"
                     data-value-text=""
                     data-size="120"
                     data-border-width="4"
                     data-border-color="#f5be3a">

                    <p class="gauge-content">
                        <span>قضيت</span>
                        <span>10</span>
                        <span>ساعات</span>
                    </p>
                </div>
                <div class="row footer">
                    <div class="col-100">
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<style>
    .page-title{
        margin-bottom: 18px;
    }
</style>
<script>

    import moment from 'moment';
    export default {

        data() {
            return {
                khatemas: {
                    completed: [],
                    pending: {}
                },
                loading: false
            };
        },

        created() {

            this.loading = true;
            this.$http.get("khatemas").then((response) => {
                this.khatemas = response.data.data;
                this.loading = false;
            }).then(() => {

                this.$$('.gauge-khatima').each((index, item) => {
                    this.$f7.gauge.create(Object.assign({}, item.dataset, {el: item}))
                });
            });

        },

        methods: {
            percentage(pages) {
                return ((JSON.parse(pages).length / 604))

            },
            len(pages) {
                return JSON.parse(pages).length
            },
            moment(...arg){
                return moment(...arg);
            }
        },
        components: {
            "navbar": require("./partials/Navbar.vue"),
        },

        mounted() {

        }
    }
</script>
1
