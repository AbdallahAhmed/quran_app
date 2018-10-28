<template>
  <div>
    <div @click="openDetails" class="contest-card-unauthed row" v-for="contest in contests" :key="contest.id">
      <div class="jastfy-img col-30">
        <div style="direction:rtl">
          <img class="kas-img" src="../../assets/img/noun_users_140450@2x.png" />
          <span style="font-size:14px; margin-top:3px; margin-left: 3px;" >5</span>         
          <span> عضو </span>         
        </div>
      </div>
      <div class="col-50">
        <strong> <h1 class="contest-title">المسابقة الاولى</h1> </strong> 
        <h2 class="contest-text"> الهدف من المسابقة </h2>
      </div>
      <div class="col-20 jastfy-img">
        <img class="kas-img" src="../../assets/img/Group 1034@2x.png" />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
      loading: true
    }
  },
  computed:{
    contests(){
      return this.$store.getters.contests;
    }
  },
  methods:{
    openDetails(){
      console.log("Details");
    },
    loadmore(){
      this.loading = true;
      this.$store.dispatch("getContests").then(()=>{
        this.loading = false;
      });
    }
  },
  created(){
    if(!this.$store.getters.contests){
      this.$store.dispatch("getContests").then(()=>{
        this.loading = false;
      });
    }else{
      this.loading = false;
    }
  }
};
</script>

<style scoped>

.contest-card-unauthed{
  height: 100px;
  background-color: white;
  width: 90%;
  margin: 20px auto;
  text-align: justify;
}
.jastfy-img{
  display: flex;
  justify-content: space-around; 
  align-items: center;
  height: 100%;
}
.kas-img{
  max-height: 25px;
  margin: 0 auto;
  display: block;
}
.contest-text, .contest-title{
  text-align: right;
}
.contest-title{
  font-size: 20px;
  margin-bottom: 0px;
}
.contest-text{
  font-weight: 100;
  margin-top: 0px;
}
</style>
