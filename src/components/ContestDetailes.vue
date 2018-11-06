<template>
    <div class="page" :class="'page-login'">

        <navbar>
            <template slot="left">
                <a href="" class="link back navbar-back">
                    <i class="f7-icons">arrow_left</i>
                </a>
            </template>
        </navbar>

        <div class="loader-wrapper" v-if="!contest">
            <div class="preloader color-green" v-if="!contest"></div>
        </div>

        <div v-else class="contest-detailes" :style="$app.t('dir')">
            <div class="row rtl padding10">

                <div class="col-50">
                    <div class="title"> {{contest.name}}</div>
                    <div class="user-and-goal">
                        <div>
                            <!-- {{$app.t('creator')}} :  -->
                            {{contest.creator&& contest.creator.first_name}}
                        </div>
                        <!-- <div>{{contest.goal}}</div> -->
                    </div>
                </div>
                <div class="col-50">
                    <div class="time" style="display:flex; flex-direction: column; align-items:flex-start;">
                        <div class="flex-align-expired">
                            <img width="20" src="./../assets/img/clock2.png">
                            <span class="time">{{toTime(contest.expired_at)}}</span>
                        </div>
                        <div class="flex-align-expired">
                            <img width="20" src="./../assets/img/person.png">
                            <span class="time">{{$app.t('member')}} {{contest.member_counter}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row padding10">
                <button class="col-33 btn btn-quran btn-margin flex-align" @click="join(contest.id)">
                    <div>{{$app.t("share")}}</div>
                    <div class="paddingtop10">
                        <img src="./../assets/img/share_y.png" alt="share">
                    </div>
                </button>
                <button class="col-33 btn green-btn" v-if="contest.is_opened" @click="()=>contest.is_joined?leave():join()">
                    {{contest.is_joined?$app.t('quit'):$app.t('enroll')}}
                </button>
                <button class="col-33 btn yellow-btn" v-if="contest.is_opened"> {{$app.t('ignore')}}</button>
            </div>
            <div class="row rtl padding10">
                <div class="col-50 row block">
                    <div>
                        <img class="img" src="./../assets/img/noun_calender_652711.png" />
                    </div>
                    <div>

                        <div class="title sm"> {{$app.t('end_date')}}</div>
                        <div class="date"> {{moment(contest.expired_at)}}</div>
                    </div>

                </div>

                <div class="col-50 row block">
                    <div>
                        <img class="img" src="./../assets/img/noun_calender_652711.png" />
                    </div>
                    <div>
                        <div class="title sm"> {{$app.t('start_date')}}</div>
                        <div class="date"> {{moment(contest.start_at)}}</div>
                    </div>

                </div>
                <div class="col-50 row block">
                    <div>
                        <img class="img" src="../assets/img/goz2.png" />
                    </div>
                    <div>
                        <div class="title sm"> {{$app.t('from_juz')}}</div>
                        <div class="date"> {{contest.juz_from || 1}} </div>
                    </div>

                </div>

                <div class="col-50 row block">
                    <div>
                        <img class="img" src="../assets/img/goz2.png" />
                    </div>
                    <div>
                        <div class="title sm"> {{$app.t('to_juz')}}</div>
                        <div class="date"> {{contest.juz_to || 30}}</div>
                    </div>

                </div>

            </div>
            <div class="block2">
                <div>
                    <img class="img" style="opacity:0.5" src="../assets/img/noun_users_140450@2x.png" />
                </div>
                <div>
                    <div class="title sm"> {{$app.t('num_members')}}</div>
                    <div class="date"> {{contest.member_counter}} </div>
                </div>
            </div>
            <!-- ~~~~~~~~~ users list ~~~~~~~~~~ -->
            <div v-for="user of contest.members" :key="user.id">
                <div class="row" style="margin-top:30px;">
                    <div class="img-div" :style="{backgroundImage: `url(${user.photo||'http://www.jdevoto.cl/web/wp-content/uploads/2018/04/default-user-img.jpg'})`}" />
                    <strong class="p-text">{{user.first_name}}</strong>
                </div>

                <div class="row" style="direction: rtl;">

                    <div class="col-25 ds-flex flex-col">
                        <div class="flex1 ds-flex">
                            <img class="sm-img" src="./../assets/img/noun_calender_652711.png" />
                        </div>
                        <div class="flex1 ds-flex">
                            تاريخ البدأ
                        </div>
                        <div class="flex1 ds-flex">
                            <div class="date">{{moment(user.pivot.join_at)}}</div>
                        </div>
                    </div>

                    <div class="col-25 ds-flex flex-col">
                        <div class="flex1 ds-flex">
                            <img class="sm-img" src="../assets/img/clock.png" />
                        </div>
                        <div class="flex1 ds-flex">
                            {{((len(user.pivot.pages)/60).toFixed(1))}}
                        </div>
                        <div class="flex1 ds-flex">
                            {{$app.t('hour')}}
                        </div>
                    </div>

                    <div class="col-25 ds-flex flex-col">
                        <div class="flex1 ds-flex">
                            <img class="sm-img" src="./../assets/img/noun_calender_652711.png" />
                        </div>
                        <div class="flex1 ds-flex">
                            {{604-len(user.pivot.pages)}}
                        </div>
                        <div class="flex1 ds-flex">
                            {{$app.t('remaining_page')}}
                        </div>
                    </div>

                    <div class="col-25 ds-flex flex-col">
                        <div class="flex1 ds-flex">
                            <img class="sm-img" src="./../assets/img/noun_calender_652711.png" />
                        </div>
                        <div class="flex1 ds-flex">
                            {{len(user.pivot.pages)}}
                        </div>
                        <div class="flex1 ds-flex">
                            {{$app.t('read_page')}}

                        </div>
                    </div>
                </div>
            </div>

            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` -->

        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      loading: true,
      contest: null
    };
  },
  created() {
    let { contest_id } = this.$f7route.params;
    this.$http.get("contests/details", { params: { contest_id } }).then(res => {
      this.contest = res.body.data;
    });
  },
  methods: {
    toTime(time) {
      let s = moment.duration(moment(time).diff(moment(), "seconds"));
      return `${parseInt(s / 3600)}:${parseInt(s / 60) % 60}:${s % 60}`;
    },
    moment(...args) {
      return moment(...args).format("YYYY/MM/DD");
    },
    leave() {
      let { id } = this.contest;
      this.$f7.dialog.confirm(this.$app.t("comfirm_quit"), () => {
        this.$f7.dialog.preloader(this.$app.t("leaving_contest"));
        this.$store
          .dispatch("leaveContest", id)
          .then(() => {
            this.contest.is_joined = false;
            this.$f7.dialog.close();
          })
          .catch(err => {
            this.$f7.dialog.alert(this.$app.t("error"));
            setTimeout(() => {
              this.$f7.dialog.close();
            }, 2000);
          });
      });
    },
    join() {
      let { id } = this.contest;
      this.$f7.dialog.confirm(
        this.$store.getters.currentContest.id
          ? this.$app.t("comfirm_join_quit")
          : this.$app.t("comfirm_join"),
        () => {
          this.$f7.dialog.preloader(this.$app.t("joining_contest"));
          this.$store
            .dispatch("joinContest", id)
            .then(() => {
              this.contest.is_joined = true;
              this.$f7.dialog.close();
            })
            .catch(err => {
              if (err.status == 401) {
                this.$f7.dialog
                  .create({
                    title: this.$app.t("login_or_register"),
                    // text: this.$app.t(''),
                    buttons: [
                      {
                        text: this.$app.t("login"),
                        onClick: () => {
                          this.$f7router.navigate("/login");
                        }
                      },
                      {
                        text: this.$app.t("signup"),
                        onClick: () => {
                          this.$f7router.navigate("/register");
                        }
                      },
                      {
                        text: this.$app.t("cancel"),
                        onClick: () => {
                          this.$f7.dialog.close();
                        }
                      }
                    ]
                  })
                  .open();
                this.$f7.dialog.close();
              } else {
                this.$f7.dialog.alert(this.$app.t("error"));
                setTimeout(() => {
                  this.$f7.dialog.close();
                }, 2000);
              }
            });
        }
      );
    },
    percentage(pages) {
      return this.parse(pages).length / 604;
    },
    parse(pages) {
      if (!pages) {
        return [];
      }
      return typeof pages == "string" ? JSON.parse(pages) : pages;
    },

    len(pages) {
      return this.parse(pages).length;
    }
  },
  components: {
    navbar: require("./partials/Navbar.vue")
  }
};
</script>

<style scoped>
.block2{
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
}
.md .block {
  margin: 0px;
  padding: 20px 5px;
}
.md .row .col-50 {
  width: 50%;
}
.block {
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-bottom: rgb(226, 226, 226) 1px solid;
}
.block:nth-child(odd) {
  border-left: rgb(226, 226, 226) 1px solid;
}
.page {
  overflow: scroll;
  padding-bottom: 30px;
}

.contest-detailes {
  background-color: white;
}

.p-text {
  position: relative;
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 20px;
}

.p-text::before {
  content: "";
  width: 100%;
  height: 1px;
  background-color: lightgray;
  position: absolute;
  top: -39px;
  left: 0;
}
.img {
  min-width: 33px;
}

.img-div {
  border: solid #37734a 2px;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin: 0 auto;
  z-index: 1;
  background-position: center;
  background-size: cover;
}

.rtl {
  direction: rtl;
}

.padding10 {
  padding: 20px;
}

.title {
  text-align: right;
  font-size: 1.6em;
  font-weight: bold;
  color: #37734a;
}

.user-and-goal {
  color: rgb(27, 27, 27);
  font-size: 1.4em;
  text-align: right;
}

.btn {
  border: none;
  height: 45px;
  width: 140px;
  color: white;
  margin-top: 5px;
  font-weight: bold;
}

.yellow-btn {
  background: #f6c624;
}

.green-btn {
  background-color: #37734a;
}

.is-150px {
  width: 150px;
}

.date {
  font-size: 1em;
  color: gray;
  margin: 3px;
}
.time {
  padding: 5px;
}

.sm {
  font-size: 1.2em;
  text-align: center;
}

.sm-img {
  width: 20px;
  height: 20px;
}

.ds-flex {
  display: flex;
  justify-content: center;
}

.flex-col {
  flex-direction: column;
  border: 1px solid #eaeaea;
  border-right: none;
  padding: 10px;
  height: 120px;
}

.md .row .col-25 {
  width: calc((100% - 0px * 3) / 4);
}
.flex-align {
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
}
.flex-align-expired {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}
.col-45 {
  margin-top: 15px;
}

.flex1 {
  flex: 1;
}
</style>

<style>
.preloader-inner-gap {
  display: none !important;
  width: 0px !important;
}
</style>

<style>
.md .dialog-button {
  text-align: center;
  color: white;
  background-color: #207249;
  font-size: 16px;
  border: 0;
  margin-top: 5px;
  display: inline-block;
}
.md .dialog-buttons span:nth-child(-n + 2) {
  width: 49%;
}
.md .dialog-buttons span:nth-child(3) {
  width: 100%;
}
.md .dialog-buttons {
  display: block;
  height: auto;
}

.md .dialog-button,
.md .dialog-button + .dialog-button {
  margin: 5px auto;
}

.dialog-backdrop {
  background-color: rgba(255, 248, 248, 0.82);
}
</style>
