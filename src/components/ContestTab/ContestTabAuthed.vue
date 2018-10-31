<template>
    <div>

        <div class="loader-wrapper" :hidden="!loading">
            <div class="preloader color-green" :hidden="!loading"></div>
        </div>

        <div :hidden="loading" style="direction: rtl" class="contest-wrapper">
            <p class="page-title">
                <span class="row"><a class="left"> المسابقات</a>
                    <a href="/allcontests" class="link right">الكل المسابقات</a>

                </span>
            </p>

            <div class="page-container">
                <div class="contest-cards-comming" v-if="showed">
                    <div class="contest-cards-list swiper-comming">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide contest-cards-item" v-for="contest  in contests.data" :key="contest.id">
                                <div @click="openContestDetailes(contest.id)">
                                    <a class="title">{{contest.name}}</a>
                                    <div class="contest-goal">
                                        {{contest.goal}}
                                    </div>
                                    <span class="time">{{toTime(contest.expired_at)}}</span>
                                    <a class="share link">
                                        <img src="./../../assets/img/share-black.png" alt="share">
                                    </a>
                                </div>
                                <a class="contest-button link" @click="()=> contest.is_joined ? leave(contest.id): join(contest.id) ">
                                    {{contest.is_joined?"الخروج من المسابقة":"دخول المسابقة"}}
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
                    <div class="contest-cards-item" v-if="current&&current.id">
                        <div class="row">
                            <a class="title col-50">{{current.name}}</a>
                            <span class="time col-30">{{toTime(current.expired_at)}}</span>
                            <a class="share link col-20">
                                <img src="./../../assets/img/share-black.png" alt="share">
                            </a>
                        </div>
                        <div class="row">
                            <div class="contest-goal col-50">
                                {{current.goal}}
                            </div>
                            <a class="contest-button link col-50" @click="leave(current.id)">
                                خروج
                            </a>
                        </div>
                    </div>
                    <div v-if="!(current&&current.id)" class="row contest-cards-item contest-current">
                        <p>أبدأ فى ثواب جديد وقم بإنشاء مسابقة مع أصدقائك و عائلتك</p>
                        <a class="contest-button link col-1col-50">
                            أنشاء مسابقة جديد
                        </a>
                    </div>
                </div>

                <p class="page-title">
                    <span class="row"><a class="left"> المسابقات</a>
                        <a href="/expiredcontests" class="link right" >الكل المسابقات</a>

                    </span>
                </p>

                <div class="contest-cards-old" v-if="showed">
                    <div class="contest-cards-list swiper-old" v-for="contest in contests.expired" :key="contest.id">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide contest-cards-item">
                                <div class="kas">
                                    <img class="kas-img" src="../../assets/img/Group 1034@2x.png" />

                                </div>
                                <a class="title">{{contest.name}}</a>
                                <div class="contest-goal">{{contest.goal}}</div>

                                <div class="member-number">
                                    {{contest.member_counter}} عضو انضموا
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      first_time: true,
      loading: true
    };
  },
  computed: {
    showed() {
      return this.first_time
        ? this.$store.getters.home_tab == "competition"
        : true;
    },
    contests() {
      return this.$store.getters.contests_authed_tab;
    },
    current() {
      return this.$store.getters.currentContest;
    }
  },
  mounted() {
    this.$store.dispatch("getAuthedContests").then(() => {
      this.loading = false;
    });
  },
  updated() {
    if (this.first_time && this.showed && !this.loading) {
      var swiper = this.$f7.swiper.create(".swiper-comming", {
        spaceBetween: 0,
        slidesPerView: "auto"
      });
        var swiper = this.$f7.swiper.create(".swiper-old", {
        spaceBetween: 0,
        slidesPerView: "auto"
      });
      this.first_time = false;
    }
  },
  methods: {
    toTime(time) {
      let s = moment.duration(moment(time).diff(moment(), "seconds"));
      return `${parseInt(s / 3600)}:${parseInt(s / 60) % 60}:${s % 60}`;
    },
    openContestDetailes(id) {
      this.$f7router.navigate(`/contest/${id}`);
    },
    leave(id) {
      this.$f7.dialog.confirm("هل تريد الخروج من المسابقة ؟", () => {
        this.$f7.dialog.preloader("جاري الخروج من المسابقة");
        this.$store
          .dispatch("leaveContest", id)
          .then(() => {
            this.$f7.dialog.close();
          })
          .catch(err => {
            if (err.status == 401) {
              this.$f7router.navigate("/login");
              this.$f7.dialog.close();
            } else {
              this.$f7.dialog.alert("حاول مرة أخرى في وقت لاحق!", "خطأ !");
              setTimeout(() => {
                this.$f7.dialog.close();
              }, 2000);
            }
          });
      });
    },
    join(id) {
      this.$f7.dialog.confirm(
        this.$store.getters.currentContest.id
          ? "هل تريد الأنضمام في هذه المسابقة و الخروج من المسابقة الأخرى ؟"
          : "هل تريد الأنضمام في هذه المسابقة ؟",
        () => {
          this.$f7.dialog.preloader("جاري الإنضمام إلى المسابقة");
          this.$store
            .dispatch("joinContest", id)
            .then(() => {
              this.$f7.dialog.close();
            })
            .catch(err => {
              console.log(err);
              if (err.status == 401) this.$f7router.navigate("/login");
              else {
                this.$f7.dialog.alert("حاول مرة أخرى في وقت لاحق!", "خطأ !");
                setTimeout(() => {
                  this.$f7.dialog.close();
                }, 2000);
              }
            });
        }
      );
    }
  }
};
</script>

<style scoped>
.page-container {
  height: auto;
  padding-bottom: 12vh;

}
</style>
