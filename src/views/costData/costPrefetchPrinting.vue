<template>
    <!--提货单凭证打印模板-->
  <div class="billOfLading content-div">
    <div class="button-div2" style="margin: 0 auto;width: 50%;text-align: right;padding:10px"><!--style="margin-top:20px;text-align:right;padding-right:20%;"-->
        <el-button type="primary" style="width:80px;margin-left:150px" @click="billSure()">打印</el-button>
    </div> 
    <div ref="print" style="margin:0 auto;margin-top:20px;">
        <h3 style="text-align:center;margin:20px;font-size:16px;">费用预提单</h3>
        <table class="table table-srtiped table-bordered" align="center" valign="center">
            <tr class="text-left">
                <td class="column">部门</td>
                <td colspan="8"  class="value">{{orgName}}</td>
             </tr>
             <tr class="text-left">
                <td class="column">供应商</td>
                <td colspan="8"  class="value">{{supplierName}}</td>
            </tr>
             <tr class="text-left">
                <td class="column">预提单号</td>
                <td colspan="8" class="value">{{prefetchCode}}</td>
            </tr>
             <tr class="text-left">
                <td class="column">费用环节</td>
                <td colspan="8" class="value">{{bizOccurrence==10600005?"采购":"销售"}}</td>
            </tr>
             <tr class="text-left">
                <td  class="column">过账日期</td>
                <td colspan="8"  class="value">{{postDate}}</td>
            </tr>
             <tr class="text-left">
                <td class="column">财务凭证号</td>
                <td colspan="8" class="value">{{warrantCode}}</td>
            </tr>
            <tr class="text-center">
                <td class="column">费用名称</td>
                <td class="column">合同号</td>
                <td class="column">入库单号</td>
                <td class="column">物料名称</td>
                <td class="column">批次号</td>
                <td class="column">数量</td>
                <td class="column">基础单位</td>
                <td class="column">预提金额（不含税）</td>
                <td class="column">预提金额（含税）</td>
            </tr>
            <tr class="text-center" v-for="(item,index) in costPrintEntities" :key="index">
                <td class="value">{{item.costName}}</td>
                <td class="value">{{item.contractNo}}</td>
                <td class="value">{{item.wvNo}}</td>
                <td class="value">{{item.goodsName}}</td>
                <td class="value">{{item.batchCode}} </td>
                <td class="value">{{item.batchQyt}}</td>
                <td class="value">{{item.goodsUnit}} </td>
                <td class="value">{{item.untaxAmount}}</td>
                <td class="value">{{item.taxAmount}}</td>
            </tr>
            <tr class="text-center">
                <td colspan="3" class="column">合计</td>
                <td class="value"></td>
                <td class="value"></td>
                <td class="value">{{total.batchQyt}}</td>
                <td class="value"></td>
                <td class="value">{{total.untaxAmount}}</td>
                <td class="value">{{total.taxAmount}}</td>
            </tr>
        </table>
    </div>
  </div>
  
</template>
<script>
import api from "@/api/component";
export default {
    name:"costPrefetchPrinting",
    data(){
        return{
            orgName:'',//部门
            supplierName:'',//供应商
            prefetchCode:'',//预提单号
            bizOccurrence:'',//费用环节05是采购
            postDate:'',//过账日期
            costPrintEntities:[],//明细
            total:{},//合计
            warrantCode:'',
        }
    },
    created(){
        this.initData();
    },
    methods:{
        initData(){
            api.costPrefetchPrint(sessionStorage.getItem("prefetchId")).then(res=>{
                if(res.code=="success"){
                    let resultData=res.data;
                    this.orgName=resultData.orgName;
                    this.orgName=resultData.orgName//部门
                    this.supplierName=resultData.supplierName//供应商
                    this.prefetchCode=resultData.prefetchCode//预提单号
                    this.warrantCode=resultData.warrantCode;
                    this.bizOccurrence=resultData.bizOccurrence//费用环节05是采购
                    this.postDate=this.$timeFun(resultData.postDate,true);;//过账日期
                    if(resultData.costPrintEntities.length>1){
                        let items=resultData.costPrintEntities;
                        this.total=items[items.length-1];//合计取最后一条
                        this.costPrintEntities=items.splice(0,items.length-1);//去掉最后一条
                    }else{
                        this.total=resultData.costPrintEntities;
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
        vertical-align:middle;
        font-size: 12px;
        font-family: 'Arial Normal', 'Arial';
        color: #333333;
        padding:6px 0;
  }
  .table .text-center td{
      text-align:center;
  }
.table .text-left td{
      text-align: left;
       padding-left: 10px;
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
    width:120px;
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
