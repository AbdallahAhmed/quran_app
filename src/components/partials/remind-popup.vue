<template>
    <div class="popup popup-about">
        <navbar>
            <template slot="left">
                <a class="link navbar-back popup-close">
                    <i class="f7-icons">arrow_left</i>
                </a>
            </template>
        </navbar>

        <div class="page-content page-khatima">

            <p class="row page-title">{{popupTitle}}</p>

            <div class="scroll-area">
                <ul class="days">
                    <li v-for="(item, index) in items_list" :key="index"  :class="{checked : item.checked}" @click="clicked(index, item)">{{item.text}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "days-popup",
        components: {
            navbar: require("./Navbar.vue")
        },
        props: ['items', 'popupTitle'],
        data() {
            return {
                items_list: this.items
            }
        },
        mounted() {
            console.log(this.items)
        },
        methods: {
            clicked(index, item) {
                item.checked = !item.checked;
                /*this.$emit('updateItem', index)*/
            }
        }
    }
</script>

<style scoped>
    .popup {
        background: #F5F5F5;
    }
    ul {
        list-style: none;
        text-align: right;
        padding: 0;
    }

    .ltr ul {
        text-align: left;
    }

    ul li {
        background-color: #ffffff;
        padding: 15px;
        margin: 0 25px 15px;
    }
    ul li.checked {
        background-image: url("../../assets/img/check.png");
        background-repeat: no-repeat;
        background-position: left 15px center;
    }
</style>