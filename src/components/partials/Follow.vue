<template>

    <div class="subscription-btn" :class="{puffIn: animated}">
        <a href="#" @click="follow" v-if="!category.followed && !isLoading" class="button on-state">إشتراك</a>
        <a href="#" @click="follow" v-if="category.followed && !isLoading" class="button color-gray off-state">مشترك</a>
        <a href="#"  v-if="isLoading">
            <img src="../../assets/img/loader.gif">
        </a>
    </div>

</template>

<script>

    export default {

        props: [
            "category",
            "animated"
        ],

        data(){
            return {
                isLoading: false
            }
        },

        methods: {

            follow() {

                const self = this;

                if (!self.$app.auth.check()) {
                    return self.$store.dispatch('guest_alert', true);
                }

                self.isLoading = true;

                self.$store.commit("clear_subscription_posts");

                self.$store.dispatch("subscribe_category", this.category.id).then(function () {
                    self.isLoading = false;
                    self.$store.dispatch("subscription_posts");
                });
            }
        }
    }

</script>


<style>

    .on-state, .on-state:visited {
        margin: 5px 0;
        height: 25px;
        line-height: 25px;
        font-size: 11px;
        border: 1px solid #c1cb37 !important;
        color: #c1cb37 !important;
    }

    .off-state, .on-state:visited {
        margin: 5px 0;
        background: #f3f3f3;
        height: 25px;
        line-height: 25px;
        font-size: 11px;
        opacity: 0.8;
        border: 1px solid #e1e1e1;
    }

</style>
