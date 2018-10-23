<template>
    <div :class="'navbar-fixed  page-khatima'">

        <navbar></navbar>

        <div class="loader-wrapper" v-if="loading">
            <div class="preloader color-green"></div>
        </div>


        <p class="page-title">تقدمك</p>
        <div class="khatima-list" v-if="khatemas.pending.id">
            <div class="khatima-wrapper">
                <h1 class="khatima-title">الخاتمة الحالية </h1>

                <div class="gauge gauge-init gauge-khatima"
                     data-type="circle"
                     :data-value="percentage(khatemas.pending.pages)"
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
                        <p>40 ساعة متبقية تقربيأ</p>
                    </div>
                </div>
            </div>
        </div>


        <div class="khatima-list">
            <div class="khatima-wrapper">
                <h1 class="khatima-title">الخاتمة السابقة </h1>
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

                <div class="gauge gauge-init gauge-khatima"
                     data-type="circle"
                     data-value="0.75"
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
                        <p>40 ساعة متبقية تقربيأ</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {

        data() {
            return {
                khatemas: {
                    completed:[],
                    pending:{}
                },
                loading:false
            };
        },

        created() {

            this.loading=true;
            this.$http.get("khatemas").then((response) => {
                this.khatemas = response.data.data;
                this.loading=false;
            });

        },

        computed:{
            percentage(pages){
               return JSON.parse(pages).length/604
            }
        },
        components: {
            "navbar": require("./partials/Navbar.vue"),
        },

        mounted() {
        }
    }
</script>
