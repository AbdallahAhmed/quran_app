<template>
  <div class="page" :class="'page-login'">

    <navbar>
      <template slot="left">
        <a href="" class="link back navbar-back">
          <i class="f7-icons">arrow_left</i>
        </a>
      </template>
    </navbar>
    <div class="contest-detailes">
      <div class="row">
        <div class=" col-42 is-150px">
          <button class="btn green-btn" > أنضم</button>
          <button class="btn yellow-btn" > تجاهل</button>
        </div>
        <div class="col-55">
          <div class="title sm"> المسابقة </div>
          <div class="user-and-goal"> 
              <div>المنشيء : اسم المستخدم</div>
              <div>الهدف من المسابقة</div>
          </div>
        </div>
      </div>
      <div class="row" style="padding:20px; text-align: right;">
        <div class="col-45 row">
          
          <div class="col-70">
              <div class="title sm"> تاريخ الإنتهاء </div>
              <div class="date"> 4/9/2018 </div>
          </div>
        <div class="col-30">
              <img class="img" src="./../assets/img/noun_calender_652711.png"/>
          </div>
        </div>
        <div class="col-45 row">
          
          <div class="col-70">
              <div class="title sm"> تاريخ البدأ </div>
              <div class="date"> 4/9/2018 </div>
          </div>
        <div class="col-30">
              <img class="img" src="./../assets/img/noun_calender_652711.png"/>
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
      loading: true
    };
  },
  computed: {
    contest() {
      return this.$store.getters.contestDetailes;
    }
  },
  created() {
    this.$store.dispatch("getContests").then(() => {
      this.loading = false;
    });
  },
  components: {
    navbar: require("./partials/Navbar.vue")
  }
};
</script>

<style scoped>
.contest-detailes {
  background-color: white;
  padding: 10px;
}

.title{
  text-align: right;
  font-size: 1.6em;
  font-weight: bold;
  color:#37734a;
}
.user-and-goal{
  color: gray;
  font-size: 1.1em;
  text-align: right;
}
.btn{
  border: none;
  height: 45px;
  width: 140px ;
  color: white;
  margin-top: 5px;
  font-weight: bold;
}
.yellow-btn{
  background: #f6c624;
}
.green-btn{
  background-color: #37734a;
}

.is-150px{
  width: 150px;
}


.date{
  font-size: 0.8em;
  color: gray;
  margin: 3px;
}

.sm{
  font-size: 1em;
}
.img{
  padding-top: 6px;
}
</style>
