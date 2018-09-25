<template>

    <div class="card demo-card-header-pic" :index="index" :data-id="post.id"
         :class="{'card-overlay': $store.getters.overlay, 'no-overlay': !$store.getters.overlay, animated: true}"
         ref="card">

        <div v-if="post">

            <div class="card-content-inner card-info row">

                <div class="titles-info col-75">
                    <div class="category-title" v-if="post.series">{{ post.series.name }}</div>
                    <a class="video-title" :href="'video/' + post.id">{{ post.title }}</a>
                </div>

                <div class="image-info col-25" v-if="post.category && post.category.image">
                    <a :href="post.category ? '/category/'+ post.category.id : '#'">
                        <img :src="post.category.image.medium_thumbnail"/>
                    </a>
                </div>

            </div>

            <div style="background: #000" class="card-header color-white no-border">

                <video width="100%" ref="video"
                       poster="http://sandbox.thewikies.com/vfe-generator/images/big-buck-bunny_poster.jpg"
                       @click="overlayToggle"
                       @ended="ended(this)"
                       @timeupdate="timeUpdateHandler"
                       :muted="!overlay || muted"
                       autobuffer
                       webkit-playsinline
                       playsinline
                       src="https://edge.flowplayer.org/playful.mp4"
                       type="video/mp4">
                    Your browser does not support HTML5 video.
                </video>

                <a href="#" class="play-icon" v-show="!video_autoplay & !overlay" @click="overlayToggle"></a>
            </div>

            <div class="card-footer">

                <div class="row" style="width: 100%">

                    <div class="col-10" v-if="$app.isIOS()"></div>

                    <div class="col-10">
                        <a href="#" class="link" @click="save">
                            <i v-if="post.saved" class="f7-icons puffIn">bookmark_fill</i>
                            <i v-if="!post.saved" class="f7-icons ">bookmark</i>
                        </a>
                    </div>

                    <div class="col-50"></div>

                    <div class="col-10"></div>

                    <div class="col-10">
                        <a href="#" class="link" @click="share()">
                            <i class="f7-icons share">share</i>
                        </a>
                    </div>

                    <div class="col-10"></div>

                    <div class="col-10">
                        <a href="#" class="link" @click="like(post)">
                            <i v-if="post.liked" class="f7-icons heart color-red puffIn">heart_fill</i>
                            <i v-if="!post.liked" class="f7-icons heart">heart</i>
                        </a>
                    </div>

                    <div class="col-10"></div>
                </div>


            </div>

            <div class="puffIn" style="padding: 10px" v-show="overlay && isCurrent">

                <div class="row">

                    <a class="col-5 link">
                        {{ showCurrentTime }}
                    </a>

                    <div class="col-85">
                        <div class="progress-bar" @click="barClickHandler" style="direction: ltr">
                            <div class="seek-bar">
                                <div class="buffer-bar" v-for="(bufferArea, index) in bufferAreas"
                                     :style="[{left: bufferArea.left}, {right: bufferArea.right}]"/>
                                <div class="play-bar" :style="{width: this.buffered}"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row player-buttons">
                    <div class="col-40 text-center">
                        <a href="" @click="volumeHandler" class="link overlay-volume-btn">
                            <img v-show="!muted" src="../../assets/img/volume-on.png"/>
                            <img v-show="muted" src="../../assets/img/volume-off.png"/>
                        </a>
                    </div>
                    <div class="col-20 text-center">
                        <a href="" class="link overlay-play-btn" @click="PlayClickHandler">
                            <i class="f7-icons" v-show="!isPlaying">play_round</i>
                            <i class="f7-icons" v-show="isPlaying">pause_round</i>
                        </a>
                    </div>
                    <div class="col-40 text-center">
                        <a href="#" @click="fullscreenClickHandler" class="link overlay-fullscreen-btn">
                            <img v-show="!isFullscreen" src="../../assets/img/fullscreen.png" class="icon-fullscreen"/>
                            <img v-show="isFullscreen" src="../../assets/img/unfullscreen.png"
                                 class="icon-unfullscreen"/>
                        </a>
                    </div>
                </div>
            </div>


        </div>

    </div>


</template>


<script>

    import debounce from './../../helpers/debounce';

    function floatToPercent(number) {
        return `${number.toFixed(4) * 100}%`;
    }

    export default {

        props: [
            'post',
            'feed',
            'index'
        ],

        data() {
            return {
                video: false,
                isPlaying: false,
                buffered: 0,
                bufferAreas: [],
                showCurrentTime: '00:00',
                isFullscreen: false,
                muted: false
            }
        },

        computed: {

            video_autoplay() {
                return this.$store.getters.video_autoplay;
            },

            card: function () {
                return this.$store.getters.card;
            },

            isCurrent() {

                if (!this.card) {
                    return false;
                }

                return this.card.post.id == this.post.id && this.card.feed == this.feed;
            },

            overlay() {
                return this.$store.getters.overlay;
            }

        },

        watch: {
            card(card) {

                let video = this.$refs.video;

                if (card) {
                    if (card.post.id == this.post.id && card.feed == this.feed) {
                        if (video.paused) {
                            return video.play();
                        }
                    }
                }

                if (video.played) {
                    video.pause();
                }
            }
        },

        mounted: function () {

            let self = this;

            self.video = this.$refs.video;

            const fullscreenEvents = [
                'fullscreenchange',
//                'webkitfullscreenchange',
//                'mozfullscreenchange',
//                'msfullscreenchange',
//                'MSFullscreenChange',
            ];

            fullscreenEvents.forEach(fullscreenEvent => {
                document.addEventListener(fullscreenEvent, () => {
                    this.checkIsFullscreen();
                });
            });

            this.fullscreenElement = self.$refs.card;

            // Play the first card

            if (self.video_autoplay) {
                setTimeout(function () {
                    if (self.$app.isElementInView(self.$$(self.video), true, self.$$)) {
                        self.$store.commit("card", {feed: self.feed, post: self.post});
                    }
                }, 500);
            }


            // Scroll event

            self.$$('.page-content').scroll(debounce(function () {

                let isElementInView = self.$app.isElementInView(self.$$(self.video), true, self.$$);

                if (self.video_autoplay) {
                    if (isElementInView) {
                        if (!self.card || ( self.card && self.card.post.id != self.post.id)) {
                            self.$store.commit("card", {feed: self.feed, post: self.post});
                        }
                    } else if (!isElementInView && self.card && self.card.post.id == self.post.id) {
                        //  self.$store.commit("card", false);
                    }
                }

                if (!self.video_autoplay) {
                    if (!isElementInView) {

                        if (self.card && self.card.post.id == self.post.id) {
                            self.$store.commit("card", false);
                        }

                    }
                }

            }, 200));

            if (self.$app.auth.check() && !self.post.viewed) {
                self.$$(self.video).on('timeupdate', debounce(function () {
                    if (self.video.currentTime >= 10) {
                        self.$store.dispatch('read_post', self.post).then(function (response) {
                            self.$$(self.video).off('timeupdate')
                        })
                    }
                }, 1000));
            }


        },

        activated() {

            let self = this;

            if (self.video_autoplay && self.$app.isElementInView(self.$$(self.video), true, self.$$)) {
                self.$store.commit("card", {feed: self.feed, post: self.post});
            }

        },

        methods: {

            bufferStateCheck(buffered) {
                const areas = [];
                for (let i = 0; i < buffered.length; i++) {
                    const area = {};
                    area.left = floatToPercent(buffered.start(i) / this.video.duration);
                    area.right = floatToPercent(1 - buffered.end(i) / this.video.duration);
                    areas.push(area);
                }
                this.bufferAreas = areas;
            },

            timeUpdateHandler(e) {
                this.buffered = floatToPercent(e.target.currentTime / e.target.duration);
                this.showCurrentTime = this.timeConvert(e.target.currentTime);
                this.isPlaying = !e.target.paused;
            },

            barClickHandler(e) {
                const rate = e.offsetX / e.target.clientWidth;
                this.seek(rate);
            },

            seek(rate) {
                this.buffered = floatToPercent(rate);
                this.video.currentTime = this.video.duration * rate;
            },

            timeConvert(seconds) {
                let h = 0, m = 0, s = 0;
                h = parseInt(seconds / 3600, 10);
                m = parseInt(seconds / 60, 10) - h * 60;
                s = parseInt(seconds % 60, 10);
                return `${h === 0 ? '' : `${this.timeToString(h)}:`}${this.timeToString(m)}:${this.timeToString(s)}`;
            },

            timeToString(time) {
                if (time < 10) {
                    return `0${time}`;
                }
                return time;
            },

            overlayToggle: debounce(function (e) {

                if (this.isFullscreen) {
                    return false;
                }

                if (!this.isCurrent) {

                    console.log("play");

                    if (!this.overlay) {
                        this.$store.commit("overlay", !this.overlay);
                    } else {
                        this.$store.commit("overlay", true);
                    }

                    if (!this.autoplay) {
                        this.$store.commit("card", {feed: this.feed, post: this.post});
                    }
                } else {

                    console.log("pause");

                    if (!this.overlay) {
                        this.$store.commit("overlay", !this.overlay);
                    } else {
                        this.$store.commit("overlay", false);
                    }

                    if (!this.autoplay && !this.overlay) {
                        this.$store.commit("card", false);
                    }
                }

            }, 50),

            like() {

                if (!this.$app.auth.check()) {
                    return this.$store.dispatch('guest_alert', true);
                }

                this.$store.dispatch('like', this.post);
            },

            save() {

                if (!this.$app.auth.check()) {
                    return this.$store.dispatch('guest_alert', true);
                }

                this.$store.dispatch('save', this.post);
            },

            ended(video) {
                let next_index = this.index + 1;
                let selector = "div[index='" + next_index + "']";
                var card = this.$$(selector);
                // this.$$('.page-content').scrollTop(card.offset().top - 75, 1000);
            },

            PlayClickHandler() {
                if (this.isPlaying) {
                    this.video.pause();
                    this.isPlaying = false;
                } else {
                    this.video.play();
                    this.isPlaying = true;
                }
            },

            volumeHandler() {
                if (this.video.muted) {
                    this.video.muted = false;
                    this.muted = false;
                } else {
                    this.video.muted = true;
                    this.muted = true;
                }
            },

            fullscreenClickHandler() {
                if (this.isFullscreen) {
                    this.isFullscreen = false;
                    this.exitFullscreenHandler();
                } else {
                    this.isFullscreen = true;
                    this.requestFullscreenHandler();
                }
            },

            // into fullscreen
            requestFullscreenHandler() {
                if (this.fullscreenElement.requestFullscreen) {
                    this.fullscreenElement.requestFullscreen();
                } else if (this.fullscreenElement.mozRequestFullScreen) {
                    this.fullscreenElement.mozRequestFullScreen();
                } else if (this.fullscreenElement.webkitRequestFullscreen) {
                    this.fullscreenElement.webkitRequestFullscreen();
                } else if (this.fullscreenElement.msRequestFullscreen) {
                    this.fullscreenElement.msRequestFullscreen();
                } else if (this.fullscreenElement.webkitEnterFullscreen) {
                    this.fullscreenElement.webkitEnterFullscreen();
                }
            },

            exitFullscreenHandler() {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            },

            checkIsFullscreen() {
                const fullscreenElement = document.fullscreenElement ||
                    document.webkitFullscreenElement ||
                    document.mozFullScreenElement || document.msFullscreenElement;
                this.isFullscreen = fullscreenElement === this.fullscreenElement;
            },

            share() {

                /*var videoUrl = "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4";
                window.plugins.streamingMedia.playVideo(videoUrl, {
                    orientation: 'landscape',
                    shouldAutoClose: true,  // true(default)/false
                    controls: true // true(default)/false. Used to hide controls on fullscreen
                });*/

                this.$emit("share", this.post);

                window.plugins.socialsharing.shareWithOptions({
                    subject: this.post.title,
                    url: "http://api.thirty.dotdev.ae/details/" + this.post.id,
                    chooserTitle: 'إختر تطبيق'
                });
            }

        }
    }

</script>

<style scoped>

    .card {
        overflow: hidden;
        border-radius: 0;
        margin-bottom: 20px;
        margin-right: 0;
        margin-left: 0;
    }

    .card-info .titles-info .category-title {
        font-family: 'bahij';
        color: #babcca;
        margin-bottom: 13px;
    }

    .card-info .titles-info .video-title {
        font-family: 'bahij';
        color: #9e9e9e;
        font-weight: bold;
    }

    .card-info .image-info img {
        width: 70px;
        border-radius: 7px;
    }

    .demo-card-header-pic .card-header {
        height: 50vw;
        background-size: cover;
        background-position: center;
        background: #cdcdcd;
        text-shadow: 2px 1px 4px #171717;
        background-repeat: no-repeat !important;
        background-size: 100% auto !important;
        padding: 0;
    }

    .card-footer:before {
        background-color: transparent;
    }

    .card-footer {
        height: 60px !important;
    }

    .play-icon {
        background: url(../../assets/img/play.png);
        background-size: 50px;
        width: 50px;
        height: 50px;
        position: absolute;
        bottom: 35%;
        right: 43%;
        z-index: 9999;
    }

    video {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        z-index: 0;
    }

    .share {
        font-size: 23px;
    }

    .heart {
        padding-left: 1px;
    }

    .card-footer a i {
        line-height: 42px;
        height: 42px;
    }

    .progress-bar {
        position: relative;
        height: 23px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        cursor: pointer;
        -webkit-box-flex: 1;
        -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
    }

    .seek-bar {
        position: relative;
        width: 100%;
        height: 3px;
        background-color: #ffffff;
    }

    .play-bar {
        position: relative;
        height: 100%;
        background-color: #c1cb37;
        z-index: 2;
    }

    .player-buttons {
        margin-top: 10px;
    }

    .player-buttons a {
        color: #ffffff !important;
    }

    .overlay-play-btn i {
        font-size: 40px;
    }

    .overlay-fullscreen-btn {
        position: relative;
        top: 7px;

    }

    .overlay-fullscreen-btn .icon-fullscreen {
        width: 25px;
    }

    .overlay-fullscreen-btn .icon-unfullscreen {
        width: 25px;
    }

    .overlay-volume-btn img {
        width: 30px;
    }

    .overlay-volume-btn {
        position: relative;
        top: 7px;
    }

</style>
