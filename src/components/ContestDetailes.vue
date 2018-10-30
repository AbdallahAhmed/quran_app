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

    <div v-else class="contest-detailes">
      <div class="row rtl padding10">

        <div class="col-55">
          <div class="title sm"> {{contest.name}} </div>
          <div class="user-and-goal">
            <div>المنشيء : {{contest.creator&& contest.creator.first_name}}</div>
            <div>{{contest.goal}}</div>
          </div>
        </div>
        <div class=" col-42 is-150px">
          <button class="btn green-btn" @click="()=>contest.is_joined?leave():join()"> {{contest.is_joined?"خروج":"أنضم"}}</button>
          <button class="btn yellow-btn"> تجاهل</button>
        </div>
      </div>
      <div class="row rtl padding10">
        <div class="col-45 row">
          <div class="col-30">
            <img class="img" src="./../assets/img/noun_calender_652711.png" />
          </div>
          <div class="col-70">

            <div class="title sm"> تاريخ الإنتهاء </div>
            <div class="date"> {{moment(contest.expired_at)}}</div>
          </div>

        </div>

        <div class="col-45 row">
          <div class="col-30">
            <img class="img" src="./../assets/img/noun_calender_652711.png" />
          </div>
          <div class="col-70">
            <div class="title sm"> تاريخ البدأ </div>
            <div class="date"> {{moment(contest.start_at)}}</div>
          </div>

        </div>

        <div class="col-45 row">
          <div class="col-30">
            <img class="img" src="../assets/img/noun_users_140450@2x.png" />
          </div>
          <div class="col-70">
            <div class="title sm"> عدد الأعضاء </div>
            <div class="date"> {{contest.member_counter}} عضو</div>
          </div>

        </div>
      </div>

      <!-- ~~~~~~~~~ users list ~~~~~~~~~~ -->
      <div v-for="user of contest.members" :key="user.id">
        <div class="row" style="margin-top:30px;">
          <div class="img-div" :style="{backgroundImage: 'url(http://misharialafasy.net/wp-content/uploads/2014/09/5.jpg)'}" />
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
              20
            </div>
            <div class="flex1 ds-flex">
              ساعة
            </div>
          </div>

          <div class="col-25 ds-flex flex-col">
            <div class="flex1 ds-flex">
              <img class="sm-img" src="./../assets/img/noun_calender_652711.png" />
            </div>
            <div class="flex1 ds-flex">
              20
            </div>
            <div class="flex1 ds-flex">
              صفحة متبقية
            </div>
          </div>

          <div class="col-25 ds-flex flex-col">
            <div class="flex1 ds-flex">
              <img class="sm-img" src="./../assets/img/noun_calender_652711.png" />
            </div>
            <div class="flex1 ds-flex">
              20
            </div>
            <div class="flex1 ds-flex">
              صفحة مقروئة
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
    moment(...args) {
      return moment(...args).format("YYYY/MM/DD");
    },
    leave() {
      console.log("leave");
      this.$f7.dialog.confirm("هل تريد الخروج من المسابقة ؟", () => {
        this.$f7.dialog.preloader("جاري الخروج من المسابقة");
        this.$http
          .post("contests/leave", {
            contest_id: this.contest.id
          })
          .then(() => {
            this.contest.is_joined = false;
            this.$f7.dialog.close();
          })
          .catch(err => {
            this.$f7.dialog.alert("حاول مرة أخرى في وقت لاحق!", "خطأ !");
            setTimeout(() => {
              this.$f7.dialog.close();
            }, 2000);
          });
      });
    },
    join() {
      console.log("join");
      this.$f7.dialog.confirm(
        this.currentContest
          ? "هل تريد الأنضمام في هذه المسابقة و الخروج من المسابقة الحالية ؟"
          : "هل تريد الأنضمام في هذه المسابقة ؟",
        () => {
          this.$f7.dialog.preloader("جاري الإنضمام إلى المسابقة");
          this.$http
            .post("contests/join", {
              contest_id: this.contest.id
            })
            .then(() => {
              this.contest.is_joined = true;
            })
            .catch(err => {
              if (err.status == 401) this.$f7router.navigate("/login");
              else {
                this.$f7.dialog.alert("حاول مرة أخرى في وقت لاحق!", "خطأ !");
                setTimeout(() => {
                  this.$f7.dialog.close();
                }, 2000);
              }
            })
            .finally(() => {
              this.$f7.dialog.close();
            });
        }
      );
    }
  },
  components: {
    navbar: require("./partials/Navbar.vue")
  }
};
</script>

<style scoped>
.page{
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
  color: gray;
  font-size: 1.1em;
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
  font-size: 0.8em;
  color: gray;
  margin: 3px;
}

.sm {
  font-size: 1em;
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
.col-45 {
  margin-top: 15px;
}
.flex1 {
  flex: 1;
}
</style>

<style>
.preloader-inner-gap{
  display: none !important;
  width: 0px !important;
}
</style>
