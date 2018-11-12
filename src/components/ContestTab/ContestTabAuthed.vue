<template>

    <div class="page-container" :style="$app.t('dir')">

        <div class="loader-wrapper" :hidden="!loading">
            <div class="preloader color-green" :hidden="!loading"></div>
        </div>

        <div :hidden="loading" class="contest-wrapper">

            <p class="page-title">
                <span class="row"><a class="left"> {{$app.t("contests")}}</a>
                    <a href="/allcontests" class="link right">{{$app.t("all_contests")}}</a>
                </span>
            </p>

            <div>
                <div class="contest-cards-comming" v-if="showed">
                    <div class="contest-cards-list swiper-comming">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide contest-cards-item" v-for="contest  in contests.data" :key="contest.id">
                                <div>
                                    <a class="title link" @click="openContestDetailes(contest.id)">{{contest.name}}</a>
                                    <div class="row">
                                        <div class="col-50 flex-align-expired">
                                            <img width="20" src="./../../assets/img/clock2.png">
                                            <span class="time">{{toTime(contest.expired_at)}}</span>
                                        </div>
                                        <div class="col-50 flex-align-expired">
                                            <img width="20" src="./../../assets/img/person.png">
                                            <span class="time">{{$app.t('member')}} {{contest.member_counter}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row button-list">
                                    <div class="col">
                                        <button class=" btn btn-quran btn-margin flex-align" @click="_share(contest.name)">
                                            <div>{{$app.t("share")}}</div>
                                            <div class="paddingtop10">
                                                <img src="../../assets/img/share_y.png" alt="share">
                                            </div>
                                        </button>
                                    </div>
                                    <div class="col">
                                        <button @click="()=> contest.is_joined ? leave(contest.id): join(contest.id) " class="col btn btn-quran btn-margin">{{contest.is_joined?
                                            $app.t('quit'):$app.t('enroll')}}
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="page-title">
                    <span class="row">
                        <a> {{$app.t("current_contest")}}</a>
                    </span>
                </p>

                <div class="contest-current">
                    <div class="contest-cards-item" v-if="current&&current.id">
                        <div class="row">
                            <div class="col-60 time">
                                <a class="title link" @click="openContestDetailes(current.id)">{{current.name}}</a>
                                <div>{{current.creator?current.creator.first_name:null}}</div>
                                <br>
                            </div>
                            <div class="time col-40" style="display:flex; flex-direction: column; align-items:flex-start;">
                                <div class="flex-align-expired">
                                    <img width="20" src="./../../assets/img/clock2.png">
                                    <span class="time">{{toTime(current.expired_at)}}</span>
                                </div>
                                <div class="flex-align-expired">
                                    <img width="20" src="./../../assets/img/person.png">
                                    <span class="time">{{$app.t('member')}} {{current.member_counter}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row" style="justify-content: flex-start;">
                            <button class="col-33 btn btn-quran btn-margin flex-align" @click="_share(current.name)">
                                <div>{{$app.t("share")}}</div>
                                <div class="paddingtop10">
                                    <img src="../../assets/img/share_y.png" alt="share">
                                </div>
                            </button>
                            <button @click="leave(current.id)" class="col-33 btn btn-quran btn-margin" v-if="current.is_joined">{{$app.t('quit')}}
                            </button>
                        </div>
                    </div>
                    <div v-if="!(current&&current.id)" class="row contest-cards-item">
                        <p>{{$app.t("before_create_contest")}}</p>
                        <a class="contest-button link col-1col-50" href="/newcontest">
                            {{$app.t('create_contest')}}
                        </a>
                    </div>
                </div>
            </div>
            <div>
                <p class="page-title">
                    <span class="row"><a class="left"> {{$app.t("old_contests")}}</a>
                        <a href="/expiredcontests" class="link right">{{$app.t("all_contests")}}</a>
                    </span>
                </p>

                <div class="contest-cards-old" v-if="showed">
                    <div class="contest-cards-list swiper-old" >
                        <div class="swiper-wrapper">
                            <div class="swiper-slide contest-cards-item" v-for="contest in contests.expired" :key="contest.id">
                                <a class="title link">{{contest.name}}</a>
                                <div class="row">
                                    <div class="col-50 flex-align-expired">
                                        <img class="kas-img" src="../../assets/img/noun_calender_652711.png" />
                                        <span style="font-size:0.9em;margin-top:5px;">{{moment(contest.expired_at)}}</span>
                                    </div>
                                    <div class="col-50 flex-align-expired">
                                        <img class="kas-img" src="../../assets/img/Group 1034@2x.png" />
                                        <span>{{contest.creator.first_name +' '+contest.creator.last_name}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.contest-cards-comming {
  margin-bottom: 10px;
  margin-right: 10px;
}

.contest-cards-old {
  margin-right: 10px;
}
</style>
<script>
import moment from "moment";
import mixin from "../../mixin";

export default {
  mixins: [mixin],

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
      let sliced = {};
      sliced.data = this.$store.getters.contests_authed_tab.data.slice(0,5);
      sliced.expired = this.$store.getters.contests_authed_tab.expired.slice(0,5);
      return sliced;
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
    moment(...args) {
      return moment(...args).format("YYYY/MM/DD");
    },
    toTime(time) {
      let s = moment.duration(moment(time).diff(moment(), "seconds"));
      return `${parseInt(s / 3600)}:${parseInt(s / 60) % 60}:${s % 60}`;
    },
    openContestDetailes(id) {
      this.$f7router.navigate(`/contest/${id}`);
    },
    leave(id) {
      this.$f7.dialog.confirm(this.$app.t("comfirm_quit"), () => {
        this.$f7.dialog.preloader(this.$app.t("leaving_contest"));
        this.$store
          .dispatch("leaveContest", id)
          .then(() => {
            this.$f7.dialog.close();
            let done = this.$f7.dialog
              .create({
                title: this.$app.t("you_quit_the_contest_succsesfuly"),
                buttons: []
              })
              .open();
            setTimeout(() => {
              done.close();
            }, 1700);
          })
          .catch(err => {
            if (err.status == 401) {
              this.$f7router.navigate("/login");
              this.$f7.dialog.close();
            } else {
              this.$f7.dialog.alert(this.$app.t("error"));
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
          ? this.$app.t("comfirm_join_quit")
          : this.$app.t("comfirm_join"),
        () => {
          this.$f7.dialog.preloader(this.$app.t("joining_contest"));
          this.$store
            .dispatch("joinContest", id)
            .then(() => {
              this.$f7.dialog.close();
              let done = this.$f7.dialog
                .create({
                  title: this.$app.t("you_joined_the_contest_succsesfuly"),
                  buttons: []
                })
                .open();
              setTimeout(() => {
                done.close();
              }, 1700);
            })
            .catch(err => {
              console.log(err);
              if (err.status == 401) this.$f7router.navigate("/login");
              else {
                this.$f7.dialog.alert(this.$app.t("error"));
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
.contest-current {
  margin: 22px 3px;
}

.time {
  padding: 5px;
}

.swiper-old .swiper-wrapper .contest-cards-item {
  padding: 20px;
  margin-top: 20px;
}

.page-container {
  height: auto;
  padding-bottom: 12vh;
}

.kas-img {
  max-width: 18px;
  padding: 10px;
}

.flex-align-expired {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}

.btn-margin {
  margin-left: 8px;
}

.flex-align {
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
}

.paddingtop10 {
  padding-top: 10px;
}

.btn-quran.flex-align {
  padding-bottom: 4px;
  padding-top: 4px;
}

.contest-current,
.contest-wrapper .page-container .page-title {
  width: 100%;
  margin: 0 auto;
}

.contest-current .contest-cards-item {
  width: 90%;
}

.page-container {
  width: 100%;
}
</style>
