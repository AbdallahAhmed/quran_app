<template>

    <div :class="'page-section'">
        <navbar></navbar>
        <div class="section-wrapper infinite-scroll-content infinite-scroll-bottom" @infinite="search">
            <div class="row no-gap">
                <div class="col-100 search-wrapper ">
                    <!-- Searchbar with auto init -->
                    <form class="searchbar" onsubmit="return false">
                        <div class="searchbar-inner">
                            <div class="searchbar-input-wrap">
                                <input type="search" id="input-search" class="search-input rollIn"
                                       placeholder=" بحث عن الايات"
                                       v-model="searchQuery" maxlength="50" @input="search" @keydown="clear">
                                <i class="searchbar-icon" @click="search"></i>
                                <!--<span class="input-clear-button"></span>-->
                            </div>
                            <span class="searchbar-disable-button">Cancel</span>
                        </div>
                    </form>
                </div>
            </div>

            <div  class="row" >
                <div class="searchbar-backdrop"></div>
                <!-- hide-on-search element -->
                <div class="searchbar-hide-on-search" v-if="searchQuery.length==0">
                    <p><label for="input-search">بحث عن الأيات</label></p>
                </div>

                <div class="searchbar-hide-on-search" v-if="searchQuery.length!=0&&results.length==0&&!loading">
                    <p>لا يوجد نتائج بحث</p>
                </div>

                <div class="searchbar-found" v-if="searchQuery.length!=0">
                    <ul>
                        <li v-for="ayat of results">
                            <div class="row">
                                <a :href="'/preview/' + ayat.page_id + '/' + ayat.id" class="col-80">
                                    {{ayat.text}}
                                </a>
                                <a :href="'/preview/' + ayat.page_id + '/' + ayat.id" class="col-20 tab-link">{{ayat.surah.name}}</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="infinite-scroll-preloader">
                <div class="preloader"></div>
            </div>
        </div>

    </div>

</template>
<style>
    .infinite-scroll-preloader {
        margin-top:-15px;
        margin-bottom: 10px;
        text-align: center;
        display: none;
    }
    .infinite-scroll-preloader .preloader {
        width:34px;
        height:34px;
    }
</style>
<script>
    import debounce from './../helpers/debounce';

    var $vm = null;
    export default {
        created() {
            $vm = this;
        },
        mounted(){
            $vm.preloader = document.getElementsByClassName('infinite-scroll-preloader')[0];
        },
        data() {
            return {
                searchQuery: '',
                results: [],
                loading: false,
                offset: 0,
                max: false,
                preloader: ''
            };
        },
        methods: {
            search: debounce(function () {
                if ($vm.searchQuery.trim().length == 0 || $vm.max) {
                    return;
                }
                //$vm.$f7.preloader.show();
                $vm.preloader.style.display = 'block';
                $vm.loading = true;
                $vm.$http.get('search', {
                    params: {
                        q: $vm.searchQuery,
                        offset: $vm.offset
                    }
                }).then((res) => {
                    if (res.body.data.length >= 14)
                        $vm.offset += res.body.data.length;
                    else{
                        $vm.preloader.style.display = 'none';
                        $vm.max = true;
                    }

                    for (var i = 0; i < res.body.data.length; i++)
                        $vm.results.push(res.body.data[i]);

                    $vm.loading = false;
                    //$vm.$f7.preloader.hide();
                }, (res) => {

                });
            }, 750),
            clear(e) {
                $vm.results = [];
                $vm.offset = 0;
                $vm.max = false;
                $vm.preloader.style.display = 'none';
                if (e.keyCode == 13) {
                    $vm.search();
                }
            }
        },
        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        }
    }
</script>
