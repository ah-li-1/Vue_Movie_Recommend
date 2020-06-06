<template>
    <div class="in-movies-show-child">
        <div class="posters"><img src="../assets/p480747492.jpg" height="200"></div>
        <div class="movieMsg">
            <h2>肖申克的救赎</h2>
            <star :score="9.5"></star>
            <p>9.7分</p>
            <p>导演:导演</p>
            <p>主演:主演</p>
        </div>
    </div>
</template>

<script>
    import star from '../star/star'
    export default {
        name: "SmallView",
        data(){
            return{

            }
        },
        components: {
            star: star
        },
    }
</script>

<style scoped>
    body {
        margin: 0;
        padding: 0;
    }
    h1 {
        text-align: center;
    }
    .in-movies-wrap {
        text-decoration: none;
        font-size: 0;
        padding: 0 100px;
    }
    .in-movies-show {
        background-color: #000000;
        padding: 10px 20px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 0;
    }
    .in-movies-show-child {
        display: flex;
        align-items: flex-end;
        padding-bottom: 10px;
        border-bottom: 1px solid #d6d6d6;
    }
    .in-movies-show p {
        font-size: 14px;
        color: #666;
    }
    .movieMsg {
        flex: 1;
        padding-left: 20px;
        vertical-align: top;
    }
    .movieMsg h2 {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 10px;
        color:antiquewhite
    }
</style>