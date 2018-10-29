<template>
    <div style="direction: rtl" class="contest-wrapper">
        <p class="page-title">
            <span class="row">
                 <a class="col-70"> المسابقات</a>
            <a href="#" class="link col-30">الكل المسابقات</a>

            </span>
        </p>
        <div class="page-container">
            <div class="contest-cards-comming" v-if="showed">
                <div class="contest-cards-list swiper-comming">
                    <div class="swiper-wrapper">
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
                 <a class="col-70"> المسابقة لمنضم ليها</a>
            </span>
            </p>

            <div class="contest-current">

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
    .contest-card-unauthed {
        height: 100px;
        background-color: white;
        width: 90%;
    }
</style>
