<template>

    <div class="toolbar no-shadow toolbar-bottom-md toolbar-options">

        <div class="toolber-inner">

            <div class="row aya-options">

                <div class="options-message" v-if="message"> {{ message}} </div>

                <a class="col-30 link spaceInDown" @click="share" v-if="!message">
                    <img src="../../assets/img/share_inverse.png">
                </a>
                <a class="col-30 link spaceInDown" @click="copy" v-if="!message" >
                    <input type="hidden" id="clipboard" :value="aya.text"/>
                    <img src="../../assets/img/copy.png">
                </a>
                <a class="col-30 link spaceInDown" @click="save" v-if="!message">
                    <img src="../../assets/img/save.png">
                </a>

            </div>

        </div>

        <a class="link aya-options-remove jackInTheBox" @click="close">{{ $app.trans("close") }}</a>

    </div>

</template>


<script>

    export default {

        computed: {
            aya(){
                return this.$store.getters.aya;
            }
        },

        data() {
            return {
                message: "",
                share_loading:false
            }
        },

        methods: {

            share() {

                this.share_loading = true;

                window.plugins.socialsharing.shareWithOptions({

                    message: this.aya.text,
                    subject: this.aya.text,
                    chooserTitle: this.$app.trans("choose_app")

                },  () => {

                    this.share_loading = false;

                    this.message = "تم المشاركة";

                    let timer = setInterval(() => {
                        this.message = false;
                        clearInterval(timer);
                    }, 4000);
                });


            },

            save() {

                this.$store.dispatch("save_aya", this.aya).then((response) => {
                    this.sura = response.data.data;
                });

                this.message = "تم الحفظ";

                let timer = setInterval(() => {
                    this.message = false;
                    clearInterval(timer);
                }, 4000);

            },

            copy() {

                let clipboard = document.querySelector('#clipboard');

                clipboard.setAttribute('type', 'text');
                clipboard.select();

                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                } catch (err) {
                    // Do nothing
                }

                clipboard.setAttribute('type', 'hidden')
                window.getSelection().removeAllRanges();

                this.message = "تم النسخ";

                let timer = setInterval(() => {
                    this.message = false;
                    clearInterval(timer);
                }, 4000);

            },

            close() {
                this.$emit("close");
                this.$store.commit("AYA", false);
            }
        }

    }

</script>
