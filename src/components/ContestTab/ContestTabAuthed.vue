<template>
    <div style="direction: rtl" class="contest-wrapper">
        <p class="page-title">
            <span class="row"><a class="left"> المسابقات</a>
            <a href="/allcontests" class="link right">الكل المسابقات</a>

            </span>
        </p>
        <div class="page-container">
            <div class="contest-cards-comming" v-if="showed">
                <div class="contest-cards-list swiper-comming">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide contest-cards-item">
                            <a class="title">المسابقة الاولى</a>
                            <div class="contest-goal">
                                الهدف من المسابقة
                            </div>
                            <span class="time">50:10:30</span>
                            <a class="share link">
                                <img src="./../../assets/img/share-black.png" alt="share">
                            </a>
                            <a class="contest-button link">
                                دخول المسابقة
                            </a>
                        </div>
                        <div class="swiper-slide contest-cards-item">
                            <p class="title">المسابقة الاولى</p>
                            <div class="contest-goal">
                                الهدف من المسابقة
                            </div>
                            <span class="time">50:10:30</span>
                            <a class="share link">
                                <img src="./../../assets/img/share-black.png" alt="share">
                            </a>
                            <a class="contest-button link">
                                دخول المسابقة
                            </a>
                        </div>
                        <div class="swiper-slide contest-cards-item">
                            <p class="title">المسابقة الاولى</p>
                            <div class="contest-goal">
                                الهدف من المسابقة
                            </div>
                            <span class="time">50:10:30</span>
                            <a class="share link">
                                <img src="./../../assets/img/share-black.png" alt="share">
                            </a>
                            <a class="contest-button link">
                                دخول المسابقة
                            </a>
                        </div>
                        <div class="swiper-slide contest-cards-item">
                            <p class="title">المسابقة الاولى</p>
                            <div class="contest-goal">
                                الهدف من المسابقة
                            </div>
                            <span class="time">50:10:30</span>
                            <a class="share link">
                                <img src="./../../assets/img/share-black.png" alt="share">
                            </a>
                            <a class="contest-button link">
                                دخول المسابقة
                            </a>
                        </div>
                        <div class="swiper-slide contest-cards-item">
                            <p class="title">المسابقة الاولى</p>
                            <div class="contest-goal">
                                الهدف من المسابقة
                            </div>
                            <span class="time">50:10:30</span>
                            <a class="share link">
                                <img src="./../../assets/img/share-black.png" alt="share">
                            </a>
                            <a class="contest-button link">
                                دخول المسابقة
                            </a>
                        </div>
                        <div class="swiper-slide contest-cards-item">
                            <p class="title">المسابقة الاولى</p>
                            <div class="contest-goal">
                                الهدف من المسابقة
                            </div>
                            <span class="time">50:10:30</span>
                            <a class="share link">
                                <img src="./../../assets/img/share-black.png" alt="share">
                            </a>
                            <a class="contest-button link">
                                دخول المسابقة
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <p class="page-title">
            <span class="row">
                 <a class="col-70"> المسابقة المنضم ليها</a>
            </span>
            </p>

            <div class="contest-current">
                <div class="contest-cards-item">
                    <div class="row">
                        <a class="title col-50">المسابقة الاولى</a>
                        <span class="time col-30">50:10:30</span>
                        <a class="share link col-20">
                            <img src="./../../assets/img/share-black.png" alt="share">
                        </a>
                    </div>
                    <div class="row">
                        <div class="contest-goal col-50">
                            الهدف من المسابقة
                        </div>
                        <a class="contest-button link col-50">
                            خروج
                        </a>
                    </div>
                </div>
            </div>


            <p class="page-title">
            <span class="row"><a class="left"> المسابقات</a>
            <a href="#" class="link right">الكل المسابقات</a>

            </span>
            </p>


            <div class="contest-cards-old" v-if="showed">
                <div class="contest-cards-list swiper-comming">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide contest-cards-item">
                            <div class="kas">
                                <img class="kas-img" src="../../assets/img/Group 1034@2x.png" />

                            </div>
                            <a class="title">المسابقة الاولى</a>
                            <div class="contest-goal">
                                الهدف من المسابقة
                            </div>

                            <div class="member-number">
                                11 عضو انضموا
                            </div>
                        </div>
                        <div class="swiper-slide contest-cards-item">
                            <div class="kas">
                                <img class="kas-img" src="../../assets/img/Group 1034@2x.png" />

                            </div>
                            <a class="title">المسابقة الاولى</a>
                            <div class="contest-goal">
                                الهدف من المسابقة
                            </div>

                            <div class="member-number">
                                11 عضو انضموا
                            </div>
                        </div>
                        <div class="swiper-slide contest-cards-item">
                            <div class="kas">
                                <img class="kas-img" src="../../assets/img/Group 1034@2x.png" />

                            </div>
                            <a class="title">المسابقة الاولى</a>
                            <div class="contest-goal">
                                الهدف من المسابقة
                            </div>

                            <div class="member-number">
                                11 عضو انضموا
                            </div>
                        </div>
                        <div class="swiper-slide contest-cards-item">
                            <div class="kas">
                                <img class="kas-img" src="../../assets/img/Group 1034@2x.png" />

                            </div>
                            <a class="title">المسابقة الاولى</a>
                            <div class="contest-goal">
                                الهدف من المسابقة
                            </div>

                            <div class="member-number">
                                11 عضو انضموا
                            </div>
                        </div>
                        <div class="swiper-slide contest-cards-item">
                            <div class="kas">
                                <img class="kas-img" src="../../assets/img/Group 1034@2x.png" />

                            </div>
                            <a class="title">المسابقة الاولى</a>
                            <div class="contest-goal">
                                الهدف من المسابقة
                            </div>

                            <div class="member-number">
                                11 عضو انضموا
                            </div>
                        </div>
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
                first_time: true,
            }
        },
        computed: {
            showed() {

                return this.first_time ? this.$store.getters.home_tab == 'competition' : true;
            }
        },
        mounted() {

        },
        updated() {
            if (this.first_time && this.showed) {
                var swiper = this.$f7.swiper.create('.swiper-comming', {
                    spaceBetween: 0,
                    slidesPerView: 'auto'
                })

                this.first_time = false;
            }
        },
    }
</script>

<style scoped>

</style>
