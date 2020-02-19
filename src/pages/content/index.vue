<template>
    <div>
        <div class="content">
            <div class="content-left">
                <Category @onContent="getContent"/>
            </div>
            <div class="content-right">
                <Content :contentData="contentData"/>
            </div>
        </div>
    </div>
</template>
<script>

import Category from "./contentCatery"
import Content from "./contentCon"

export default {
    name:"ContentCategory",
    data(){
        return{
            contentData:{}
        }
    },
    components:{
        Category,
        Content
    },
    methods:{
        getContent(data){
            this.contentData = data
        }
    }
}
</script>
<style scoped>
.content {
    width: 70%;
    height: 200px;
    margin: 0 auto;
    margin-top: 10px;
}

.content-left {
    float: left;
    width: 25%;
    height: 100%;
}

.content-right {
    float: left;
    width: 75%;
    height: 100%;
}

.custom-tree-node {
    display: inline-block;
    text-align: right;
    width: 100%;
}
.upload img {
    width: 200px;
}
</style>