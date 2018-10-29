<template>

    <div>
        <div v-for="i in 30">
            {{ sura.text }}
        </div>
    </div>

</template>

<script>

    export default  {
        props: ["sura"]
    }

</script>
