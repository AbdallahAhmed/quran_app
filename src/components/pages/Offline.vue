<template>

    <div class="page" data-page="offline">


        <div class="offline-box">

            <img src="../../assets/img/navbarLogo.png" alt="logo" />

            <h1> خطأ في الإتصال </h1>

            <a href="#" @click="$app.reload()">
                أعد المحاولة
            </a>

        </div>


    </div>

</template>


<style scoped>

    .offline-box{
        text-align: center;
        margin-top: 70px;
    }

    .page{
       background: #2e2e2e
    }

    h1{
        color: #656565;
        text-shadow: 1px 1px 0 #000;
        font-size: 20px;
    }

    img{
        width: 52px;
    }


</style>
