<template>
    <f7-page :class="'navbar-fixed page-section'">

        <navbar></navbar>

        <main-toolbar></main-toolbar>


        <div class="section-wrapper">
            <div class="row no-gap">
                <div class="col-100 search-wrapper">
                    <!-- Searchbar with auto init -->
                    <form class="searchbar" onsubmit="return false">
                        <div class="searchbar-inner">
                            <div class="searchbar-input-wrap">
                                <input type="search" id="input-search" placeholder=" بحث عن الايات"
                                       v-model="searchQuery" @input="search">
                                <i class="searchbar-icon" @click="search"></i>
                                <span class="input-clear-button"></span>
                            </div>
                            <span class="searchbar-disable-button">Cancel</span>
                        </div>
                    </form>
                </div>
            </div>

            <div class="row">
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
                                <a class="col-80">
                                    {{ayat.text}}
                                </a>
                                <a class="col-20">{{ayat.surah.name}}</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </f7-page>
</template>
<script>
    import debounce from './../helpers/debounce';

    var $vm = null;
    export default {
        created() {
            $vm = this;
        },
        data() {
            return {
                searchQuery: '',
                results: [],
                loading:false
            };
        },
        methods: {
            search: debounce(function () {
                if($vm.searchQuery.trim().length==0){
                    return;
                }
                $vm.$f7.preloader.show();
                $vm.loading=true;
                $vm.$http.get('search', {
                    params: {
                        q: $vm.searchQuery
                    }
                }).then((res) => {
                    $vm.results = res.body.data;
                    $vm.loading=false;
                    $vm.$f7.preloader.hide();
                }, (res) => {

                });
            },750)
        },
        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        }
    }
</script>
