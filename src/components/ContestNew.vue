<template>
  <f7-page :class="'page-khatima'">

    <navbar>
      <template slot="left">
        <a href="" class="link back navbar-back">
          <i class="f7-icons">arrow_left</i>
        </a>
      </template>
    </navbar>
    <p class="page-title">{{$app.t('create_contest')}}</p>

    <form class="from-container" @submit.prevent="submit" :style="$app.t('dir')">
      <label class="mar-10-h">{{$app.t('contest_name')}}</label>
      <input class="new-contest-input" name="name" v-model="contest.name" :class="{'err':errors.name}" />
      <label class="mar-10-h">{{$app.t('contest_goal')}}</label>
      <textarea class="new-contest-input new-contest-textarea" name="gaol" v-model="contest.goal" :class="{'err':errors.goal}" />
      <div class="row d2" :style="$app.t('dir')">           
            <div class="col-50" >
              <label>{{$app.t('start_date')}}</label>
              <input type="text"  readonly="readonly" class="new-contest-input col-100" @change="updateStartDate" id="start-date" name="start_date" :class="{'err':errors.start_date}"/>
            </div>
            <div class="col-50" >
              <label>{{$app.t('end_date')}}</label>
              <input type="text"  readonly="readonly" class="new-contest-input col-100" @change="updateEndDate" id="end-date" name="end_date" :class="{'err':errors.end_date}"/>
            </div>
        </div>
        <div class="row d2" :style="$app.t('dir')">           
            <div class="col-50" >
              <label>{{$app.t('from_juz')}}</label>
              <input type="number" min="0" max="30" v-model="contest.juz_from" class="new-contest-input col-100" :class="{'err':errors.juz_from}" />
            </div>
            <div class="col-50" >
              <label>{{$app.t('to_juz')}}</label>
              <input type="number" min="0" max="30" v-model="contest.juz_to" class="new-contest-input col-100" :class="{'err':errors.juz_to}"/>
            </div>
            <button class="contest-button green" href="/newcontest">
                {{$app.t("create_contest")}}
            </button>
            <button class="contest-button yellow " href="/newcontest">
                {{$app.t('create_contest_and_share')}}
            </button>
        </div>    
      </form>
  </f7-page>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      loading: false,
      contest: {},
      errors: {}
    };
  },
  mounted() {
    this.$f7.calendar.create({
      inputEl: "#start-date",
      dateFormat: "yyyy-mm-dd",
      value: [new Date()],
      closeOnSelect: true
    });
    this.$f7.calendar.create({
      inputEl: "#end-date",
      dateFormat: "yyyy-mm-dd",
      closeOnSelect: true
    });
  },
  methods: {
    updateEndDate({ target: { value } }) {
      this.contest.expired_at = value;
    },
    updateStartDate({ target: { value } }) {
      this.contest.start_at = value;
    },
    submit() {
      this.loading = true;
      this.validate().then(valid => {
        if (valid) {
          this.contest.start_at += " 00:00:00";
          this.contest.expired_at += " 23:59:59";
          this.$f7.dialog.preloader(this.$app.t("creating_contest"));

          this.$store
            .dispatch("createContest", this.contest)
            .then(response => {
              setTimeout(() => this.$f7router.back(), 500);
            })
            .catch(err => {
              this.$f7.notification
                .create({
                  subtitle: this.$app.t("error")
                })
                .open();
            })
            .finally(() => {
              setTimeout(() => this.$f7.dialog.close(), 500);
            });
        } else {
          this.$f7.notification
            .create({
              subtitle: this.$app.t("error_check_red")
            })
            .open();

          this.$f7.dialog.close();
        }
      });

      return false;
    },
    validate() {
      this.errors = {};
      return new Promise((resolve, reject) => {
        if (!(this.contest.name && this.contest.name.length > 0)) {
          this.errors.name = true;
        }
        if (!(this.contest.start_at && this.contest.start_at.length > 0)) {
          this.errors.start_date = true;
        }
        if (!(this.contest.expired_at && this.contest.expired_at.length > 0)) {
          this.errors.end_date = true;
        }
        if (
          !(
            this.contest.expired_at &&
            this.contest.start_at &&
            (moment(this.contest.expired_at).isAfter(this.contest.start_at) ||
              this.contest.expired_at === this.contest.start_at)
          )
        ){
          this.errors.start_date = true;
          this.errors.end_date = true;
        }
          if (!(this.contest.juz_from && this.contest.juz_from > 0)) {
            this.errors.juz_from = true;
          }
        if (!(this.contest.juz_to && this.contest.juz_to > 0)) {
          this.errors.juz_to = true;
        }
        if (
          !(
            this.contest.juz_from &&
            this.contest.juz_to &&
            parseInt(this.contest.juz_from) < parseInt(this.contest.juz_to)
          )
        ) {
          this.errors.juz_from = true;
          this.errors.juz_to = true;
        }

        if (Object.keys(this.errors).length > 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    }
  },
  components: {
    navbar: require("./partials/Navbar.vue")
  }
};
</script>

<style scoped>
.from-container {
  padding-bottom: 70px !important;
}
.new-contest-input {
  width: 80%;
  display: block;
  padding: 10px;
  margin: 20px auto;
  background: #faf8f8;
  border: #d3d2d2 solid 1px;
  margin-top: 10px;
}

.new-contest-textarea {
  width: calc(80% + 20px);
}

.d2 {
  width: calc(80% + 26px);
  margin: 0 auto;
}
.mar-10-h {
  width: calc(80% + 20px);
  display: block;
  margin: 0 auto;
  margin-top: 20px;
}

label {
  font-weight: bold;
  margin-top: 20px;
  font-size: 1.3em;
}

.contest-button {
  height: 50px;
  border: none;
  color: white;
  font-size: 1.2em;
  margin-bottom: 20px;
}
.yellow {
  background: #f6c624;
}
.green {
  background-color: #37734a;
}

.err {
  border: red 1px solid;
}
</style>

<style>
.preloader-inner-gap {
  display: none !important;
  width: 0px !important;
}
</style>
