<template>

    <div class="page" data-page="subscription">

        <div class="navbar">
            <div class="navbar-inner">
                <div class="left">
                    <a href="#" class="link icon-only" @click="$app.router.back()">
                        <i class="icon f7-icons">arrow-right</i>
                    </a>
                </div>
                <div class="center">
                    <a href="" class="link">
                    تعديل الإشتراك
                    </a>
                </div>
                <div class="right">
                    <a href="/settings" class="link icon-only">
                        <i class="icon f7-icons">gear_fill</i>
                    </a>
                </div>
            </div>
        </div>

        <div class="page-content" style="background: rgb(234, 234, 234)">

            <div class="catgories-list row">

                <div class="category-row row col-50" v-for="category in categories">

                    <div class="col-40">
                        <a :href="'/category/' + category.id">
                            <img v-if="category.image" class="category-image" :src="category.image.medium_thumbnail"/>
                        </a>
                    </div>

                    <div class="col-60" style="text-align: center; padding: 5px">
                        <a class="category-name" :href="'/category/' + category.id">{{ category.name }}</a>
                        <follow  :category="category"></follow>
                    </div>

                </div>
            </div>

        </div>

    </div>

</template>

<script>

    import Vue from 'vue';

    export default {

        computed: {
            categories() {
                return this.$store.getters.categories;
            }
        },

        components: {
            follow: require("../partials/Follow.vue")
        }
    }

</script>


<style scoped>

    .catgories-list{
        padding: 10px;
    }

    .category-row {
        margin-bottom: 20px;
        background: #fff;
        height: 75px;
        padding: 5px;
    }

    .category-image {
        width: 100%;
        height: 100%;
        border-radius: 0;
    }

    .category-name {
        text-align: center;
        font-size: 18px;
        text-shadow: none;
        font-size: 15px;
    }

</style>
