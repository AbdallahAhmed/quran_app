<template>

    <div :class="'page-section'">

        <div  id="scroll" class="section-wrapper">
            <div class="row no-gap">
                <div class="col-100 search-wrapper">
                    <!-- Searchbar with auto init -->
                    <form class="searchbar" onsubmit="return false">
                        <div class="searchbar-inner">
                            <div class="searchbar-input-wrap">
                                <input type="search" id="input-search" class="search-input rollIn" placeholder=" بحث عن الايات"
                                       v-model="searchQuery" maxlength="50" @keyup="search" @keydown="clearResults">
                                <i class="searchbar-icon" @click="search"></i>
                                <!--<span class="input-clear-button"></span>-->
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

                <div  class="searchbar-found" v-if="searchQuery.length!=0">
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

    </div>

</template>
<script>
    import debounce from './../helpers/debounce';


    var $vm = null;
    export default {
        created() {
            $vm = this;
        },
        mounted(){
           this.$$('#scroll').scroll(this.handleScroll);
        },
        data() {
            return {
                searchQuery: '',
                results: new Array(),
                loading: false,
                offset: 0
            };
        },
        methods: {
            search: debounce(function () {
                if ($vm.searchQuery.trim().length == 0) {
                    return;
                }
                $vm.$f7.preloader.show();
                $vm.loading = true;
                $vm.$http.get('search', {
                    params: {
                        q: $vm.searchQuery,
                        offset: $vm.offset
                    }
                }).then((res) => {
                    if(res.body.data.length >= 14)
                        $vm.offset += res.body.data.length;

                    for(var i = 0; i < res.body.data.length; i++)
                        $vm.results.push(res.body.data[i]);

                    $vm.loading = false;
                    $vm.$f7.preloader.hide();
                }, (res) => {

                });
            }, 750),
            handleScroll(e){
                if((e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight)){
                    $vm.search($vm.searchQuery);
                }
            },
            clearResults(e){
                $vm.searchQuery = '';
                $vm.results = new Array();
                $vm.offset = 0;
            }
        },
        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        }
    }
</script>
