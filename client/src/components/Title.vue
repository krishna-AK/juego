<template>
<div id = "Title">
    <div v-if = !$store.state.is_logged_in>
        <h1 align = "center" >Juego.io</h1>
    </div>
</div>
</template>

<script>

export default {
  name: 'Title',
}

</script>

<style scoped>
   
    #Title{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        font-size: 20px;
        font-weight: bold;
        color:rgb(90, 47, 121);
        border-radius: 10px;
    }
</style>
