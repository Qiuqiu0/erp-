<template>
    <div class="redict-div content-div">
        <div v-show="type==1" class="redict-shadow">
             <img src="./imgs/loading.gif" alt="">
        </div>
        <p v-show="type==2" class="err-msg">{{errMsg}}</p>
    </div>
</template>
<script>
import {getRedictToOaUrl} from "@/api/index.home";
export default {
    name:"redictToOa",
    data(){
        return{
            errMsg:"",
            type:1,//成功或者失败
        }
    },
    created(){
       this.init();
    },
    methods:{
        init(){
            let data={
                token:this.$getUrl("auth_token")
            }
            getRedictToOaUrl(data).then(res=>{
                if(res.code=="success"){
                    this.type=1;
                    window.location.href=res.data;
                }else{
                    this.type=2;
                    this.errMsg=e.message;
                }
            }).catch(e=>{
                console.log(e);
                this.type=2;
                this.errMsg=e.message;
                    
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .redict-div{
        margin:0 auto;
        height:100vh;
        width: 100%;
        background-color:#3da7f3;
        text-align: center;
    }
    .err-msg{
        margin: 0 auto;
        font-size: 20px;
        color: #fff;
        text-align: center;
        position: relative;
        top: 50% ;
        left: 50% ;
        transform: translateY(-50%) translateX(-50%);   
        text-align: center;
        
    }
    .redict-shadow{
        height: 100%;
        width: 100%;
        position:absolute;
        left:0;
        top:0;
        z-index:998;
        display:block;
        img{
            position:absolute;
            top: 50% ;
            left: 50% ;
            transform: translateY(-50%) translateX(-50%);   

        }
    }
</style>