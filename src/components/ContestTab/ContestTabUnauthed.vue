<template>
  <div>
    <div class="contest-card-unauthed" v-for="contest in contests" :key="contest.id">
      
    </div>

  </div>
</template>

<script>
export default {
  computed:{
    contests(){
      return[
        {
          id:1
        },
        {
          id:2
        },
        {
          id:3
        }
      ]
    }
  }
};
</script>

<style scoped>
.contest-card-unauthed{
  height: 100px;
  background-color: white;
  width: 90%;
}
</style>
