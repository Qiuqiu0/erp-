<template>
    <!--提货单凭证打印模板-->
  <div class="billOfLading content-div">
    <div class="button-div2"><!--style="margin-top:20px;text-align:right;padding-right:20%;"-->
        <div class="search-div">
            <el-col :span="12" class="el-col" style="text-align:center">
                <label style="margin-left:-80px" class="index-label">打印模板</label>
                <el-radio-group v-model="modelRadio">
                    <el-radio :label="1">木材</el-radio>
                    <el-radio :label="2">钢材</el-radio>
                </el-radio-group>
            <!-- </el-col>
            <el-col :span="5" class="el-col"> -->
                <label class="index-label">购货单位</label>
                <el-radio-group v-model="custNameRadio">
                    <el-radio :label="1">显示</el-radio>
                    <el-radio :label="2">隐藏</el-radio>
                </el-radio-group>
                <!-- <el-button type="primary" style="width:80px;margin-left:150px" @click="billSure()">打印</el-button> -->
                <el-button type="primary" style="width:80px;margin-left:100px" @click="billSure()">打印</el-button>
                <el-button v-if="$actionFlag(`F017`)" type="primary" style="width:80px;margin-left:20px"  @click="pdfPrinting()">下载</el-button>
            </el-col>
            <!-- <el-col :span="5" class="el-col">
               
            </el-col> -->
         </div>
        
    </div> 
    <div ref="print" style="margin:0 auto;margin-top:20px;">
        <h3 style="text-align:center;margin:20px;font-size:16px;">中林国际经贸有限公司提货单（货权转移凭证）</h3>
        <table class="table table-srtiped table-bordered" align="center" valign="center">
            <tr>
                <td class="column">提货单号</td>
                <td colspan="3"  class="value">{{doNo}}</td>
                <td class="column">提货期限</td>
                <td colspan="4"  class="value">{{blTimeline}}</td>
            </tr>
            <tr>
                <td class="column">购货单位</td>
                <td colspan="3" v-if="custNameRadio==2" class="value"> </td>
                <td colspan="3" v-else class="value">{{custName}}</td>
                <td class="column">开户银行及账号</td>
                <td colspan="4" v-if="custNameRadio==2" class="value"></td>
                 <td colspan="4" v-else class="value">{{custBankInfo}}</td>
            </tr>
            <tr>
                <td  class="column">税号</td>
                <td colspan="3" v-if="custNameRadio==2" class="value"></td>
                <td colspan="3" v-else class="value">{{custTaxNo}}</td>
                <td class="column">地址及电话</td>
                <td colspan="4" class="value">{{addrAndTel}}</td>
            </tr>
            <tr>
                <td class="column">提货仓库</td>
                <td class="value">{{warehouseName}}</td>
                <td class="column">电话</td>
                <td class="value">{{warehouseTel}}</td>
                <td class="column">联系人</td>
                <td class="value">{{warehouseLinkName}}</td>
                <td class="column">仓库地址</td>
                <td class="value" colspan="2">{{warehouseAddr}}</td>
            </tr>
            <tr>
                <td colspan="3" rowspan="2" class="column">商品名</td>
                <td rowspan="2" class="column">计量单位</td>
                <td colspan="2" class="column">开单数</td>
                <td colspan="2" class="column">实发数</td>
                <td colspan="3" rowspan="2"  class="column">船名 标注</td>
            </tr>
            <tr v-if="modelRadio==2">
                <td class="column">件数</td>
                <td class="column">重量</td>
                <td class="column">件数</td>
                <td class="column">重量</td>
            </tr>
            <tr v-else>
                <td class="column">根数/件数</td>
                <td class="column">方数</td>
                <td class="column">根数/件数</td>
                <td class="column">方数</td>
            </tr>
            <tr v-for="(item,index) in itemsList" :key="index">
                <td colspan="3" class="value">{{item.goodsName}}</td>
                <td class="value">{{item.itemUnitName}}</td>
                <td class="value">{{item.secQty}}</td>
                <td class="value">{{item.sheetQty}}</td>
                <td v-if="doStatus!=10450025" class="value"> </td>
                <td v-else class="value">{{item.secQty}}</td>
                <td v-if="doStatus!=10450025" class="value"> </td>
                <td v-else class="value">{{item.itemQty}}</td>
                <td  class="value">{{item.shipName}}</td>
            </tr>
            <tr>
                <td colspan="3" class="value"></td>
                <td class="column">合计</td>
                <td class="value">{{total.secQty}}</td>
                <td class="value">{{total.sheetQty}}</td>
                <td v-if="doStatus!=10450025" class="value"> </td>
                <td v-else class="value">{{total.secQty}}</td>
                <td v-if="doStatus!=10450025" class="value"> </td>
                <td v-else class="value">{{total.itemQty}}</td>
                <td  class="value"></td>
            </tr>
            <tr>
                <td colspan="1" class="column">备注</td>
                <td colspan="8" class="value" :formatter="wrapText" style="text-align:left;padding-left:5px;font-size:15px">
                    {{blRemark}}
                </td>
            </tr>
            <tr>
                <td class="column">制单人</td>
                <td colspan="2" class="value">{{createdName}}</td>
                <td class="column">制单日期</td>
                <td colspan="5"  class="value">{{doDate}}</td>
            </tr>
        </table>
        <p class="tips">1、本提单须加盖“中林国际经贸有限公司提货专用章”有效；</p>
        <p class="tips">2、提货期限届满后，货物风险即转移至购货单位；</p>
        <p class="tips">3、提货时，确认提货与本单位数量是否相符，如有数量异议请立即提出，请在收货后三天内提出，逾期本单位不承担相关责任。</p>
    </div> 
  </div>
</template>
<script>
import api from "@/api/component";
import {Loading } from "element-ui";
export default {
    name:"billOfLading",
    data(){
        return{
            doNo:"",//单号
            blTimeline:"",//提货期限
            custName:"",//购货单位
            custBankInfo:"",//开户银行及账号
            custTaxNo:"",//税号
            addrAndTel:"",//地址及电话
            warehouseName:"",//提货仓库
            warehouseTel:"",//电话
            warehouseLinkName:"",//联系人
            warehouseAddr:"",//仓库地址
            itemsList:[],
            total:{},//合计
            createdName:"",//制单人
            doDate:"",//制单日期
            doId:"",
            modelRadio:'1',
            custNameRadio:'1',
            blRemark:"",//提货人信息
            doStatus:'',
        }
    },
    created(){
        this.initData();
    },
    methods:{
        //pdf打印
        pdfPrinting(){
            let data={
                doId:sessionStorage.getItem("doId"),
                templateType:this.modelRadio==1?0:1,
                isShowPurchase:this.custNameRadio==1?1:0

            }
              //使用Element loading-start 方法
            var loading2 = Loading.service({
                lock: true,
                text: "加载中...",
                background: "rgba(0, 0, 0, 0.7)"
            });
            api.privateSaleOrderSent(data).then(res=>{
                if(res.code=="fail"){
                    this.$openWarning(res.message);
                }else{
                    const blob = new Blob([res.data]);
                    const a = document.createElement("a");
                    const url = window.URL.createObjectURL(blob);
                    const filename ="提货单.pdf";
                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                }
                loading2.close();
            }).catch(e=>{
                loading2.close();
             });
        
        },
        wrapText: function(row, column, cellValue){
            return cellValue.replace(",","\n");
        },

        initData(){
            let data={
                doId:sessionStorage.getItem("doId")
            }
            api.selectSaleOrder4Pickup(data).then(res=>{
                if(res.code=="success"){
                    let result=res.data[0];
                    if(result.externalBlNo){
                        this.doNo=result.externalBlNo;//外部提单号
                    }else{
                        this.doNo=result.doNo;//单号
                    }
                    if(result.blTimeline){
                        this.blTimeline=this.$timeFun(result.blTimeline,true);//提货期限
                    }
                    this.custName=result.custName;//购货单位
                    this.custBankInfo=result.custBankInfo;//开户银行及账号
                    this.custTaxNo=result.custTaxNo;//税号
                    this.addrAndTel=result.addrAndTel;//地址及电话
                    this.warehouseName=result.warehouseName;//提货仓库
                    this.warehouseTel=result.warehouseTel;//电话
                    this.warehouseLinkName=result.warehouseLinkName;//联系人
                    this.warehouseAddr=result.warehouseAddr;//仓库地址
                    if(result.itemsList.length>1){
                        let items=result.itemsList;
                        this.total=items[items.length-1];//合计取最后一条
                        this.itemsList=items.splice(0,items.length-1);//去掉最后一条
                    }else{
                        this.total=result.itemsList;
                    } 
                    this.createdName=result.createdName;
                    this.blRemark=result.blRemark;
                    this.doStatus=result.doStatus;
                    if(result.doDate){
                        this.doDate=this.$timeFun(result.doDate,true);
                    }
                }else{
                    this.$openWarning(res.message);
                }
            }).catch(e=>{
                console.log(e.message);
            });
        },
        billSure(){
            this.$print(this.$refs.print);
        },
    },
}
</script>
<style type="text/css" media="print">
    @page{size:landscape;}
     html,body{
        height:auto;
    };
</style>
<style lang="scss" scoped>
    .content-div{border: 0;}
   .table{
       border-collapse:colapse;
       border-spacing:0;
       background-color:transparent;
       display:table;
       max-width:100%;
       height:100%;
       width:980px;
       margin:0 auto;
       margin-bottom: 10px;
   }
   .table td{
        text-align:center;
        vertical-align:middle;
        font-size: 12px;
        font-family: 'Arial Normal', 'Arial';
        color: #333333;
        padding:6px 0;
         white-space: pre-line;
         min-width: 100px;
  }
  .table-bordered {
    border: 1px solid #ddd;
  }
  *{
    margin: 0px;
    padding: 0px;
  }
  .column{width:120px;}
  .column,.value{
    border:1px solid #333;
  }
  .tips{
      font-size: 12px;
      line-height: 30px;
      margin:0 auto;
      width:980px;
  }
  .search-div{
      width: 100%;
    overflow: hidden;
    background: #ffffff;
    text-align: left;
    position: relative;
   line-height: 26px;
  }
  .search-div .el-col-5{
    width: 23%;
    position: relative;
    margin-top: 10px;
    float: left;
}
.search-div .el-radio{
      margin-left: 20px;
      font-size: 14px;
}
.index-label{
     display: inline-block;
    width: 8%;
    text-align: right;
    font-size: 14px;
    vertical-align: middle;
}
.index-label::after{
    content: "\FF1A";
}
.search-div .el-radio-group{
    display:inline-block;
    width: 12%;
    vertical-align: -2px;
}
 
</style>
