<template>
    <div class="invoiceApplicationForm content-div" >
        <div class="search-div button-div2">
            <el-col :span="24" class="el-col">
                <el-button type="primary" style="width:80px;margin-left:188px" @click="billSure()">打印</el-button>
            </el-col>
         </div>
        <div ref="print" style="margin:0;">
            <h3 style="text-align:center;margin:10px;font-size:16px;">中林国际经贸有限公司开票申请单</h3>
            <ul class="cont-ul">
                <li style="width:50%">申请日期：<span>{{invoiceDate}}</span></li>
                <!-- <li>销售合同号：<span>{{soContractNo}}</span></li> -->
                <li style="width:49%;text-align:right">发票申请单据号：<span>{{invoiceCode}}</span></li>
            </ul>
            <table class="table table-bordered" align="center" valign="center" style="width:980px">
                <tr class="text-letf">
                    <td class="column"><div style="width:82px">申请部门</div></td>
                    <td colspan="11"  class="value">{{orgName}}</td>
                </tr>
                <tr class="text-letf">
                    <td class="column"><div style="width:82px">销售单位</div></td>
                    <td colspan="11"  class="value">{{custName}}</td>
                </tr>
                <tr class="text-letf">
                    <td class="column"><div style="width:82px">纳税人识别号</div></td>
                    <td colspan="11"  class="value">{{custTaxNo}}</td>
                </tr>
                <tr class="text-letf" >
                    <td class="column"><div style="width:82px">地址、电话</div></td>
                    <td colspan="11"  class="value">{{invoiceAddress}}/{{custTelephone}}</td>
                </tr>
                <tr class="text-letf" >
                    <td class="column">开户行及账号</td>
                    <td colspan="11"  class="value">{{bankName}}/{{bankAccount}}</td>
                </tr>
                <tr class="text-letf">
                    <td class="column">开票类型</td>
                    <td colspan="11"  class="value">
                        {{invoiceType}}
                        <!-- <ul class="cont-ul cont-ul2">
                            <li><el-checkbox v-model="isVatSpecialInvoice" disabled>增值税专用发票</el-checkbox></li>
                            <li><el-checkbox v-model="isVatNormalInvoice" disabled>增值税普通发票</el-checkbox></li>
                            <li><el-checkbox v-model="isProformaInvoice" disabled>形式发票</el-checkbox></li>
                        </ul> -->
                        
                    </td>
                </tr>
                <tr>
                    <th class="column">大类</th>
                    <th class="column">品名</th>
                    <th class="column">规格型号</th>
                    <th class="column" >单位</th>
                    <th class="column">数量</th>
                    <th class="column">单价(含税)</th>
                    <th class="column">不含税金额</th>
                    <th class="column" >税率</th>
                    <th class="column">税额</th>
                    <th class="column">价税合计</th> 
                    <th class="column" style="width:90px">销售合同号</th>   
                    <th class="column" style="width:98px">发货单号</th>  
                </tr>
                <tr v-for="(item,index) in odSoInvoiceItemsList" :key="index">
                    <td class="column">{{item.invoiceGoodsCat}}</td>
                    <td class="column value2">{{item.invoiceGoodsName}}</td>
                    <td class="column value2">{{item.invoiceGoodsSpec}}</td>
                    <td class="column">{{item.firstUnitName}}</td> 
                    <td class="column value2 cont-right">{{item.invoiceQty}}</td>
                    <td class="column value2 cont-right">{{item.originPrice}}</td>
                    <td class="column value2 cont-right">{{item.originAmtVat}}</td>
                    <td class="column value2">{{item.taxRate}}</td>
                    <td class="column value2 cont-right">{{item.originTaxAmt}}</td>
                    <td class="column value2 cont-right">{{item.originAmt}}</td>
                    <td class="column value2">{{item.soContractNo}}</td>   
                    <td class="column value2">{{item.doNo}}</td>  
                     
                </tr>
                <tr>
                    <td class="column" colspan="3">合计</td>
                    <td class="column"></td>
                    <td class="column value2 cont-right">{{invoiceQtySum}}</td>
                    <td class="column"></td>
                    <td class="column value2 cont-right">{{originAmtVatSum}}</td>
                    <td class="column"></td>
                    <td class="column value2 cont-right">{{originTaxAmtSum}}</td>
                    <td class="column value2 cont-right">{{originAmtSum}}</td>
                    <td class="column"></td>
                    <td class="column"></td>
                </tr>
                <tr class="text-letf">
                    <td class="column" colspan="12">金额大写：<span>{{invoiceAmtVat}}</span></td>
                </tr>
                <tr>
                    <td colspan="1" class="column">备注</td>
                    <td colspan="11" class="value" :formatter="wrapText" style="text-align:left;padding-left:5px;font-size:15px">
                        {{remark}}
                    </td>
                </tr>
            </table>
            <ul class="cont-ul cont-ul3">
                <li>业务申请人：<span>{{createdName}}</span></li>
                <li>业务员：<span>{{bizPersonName}}</span></li>
                <li>财务核算：<span>{{auditBy}}</span></li><!--倪梦娜-->
            </ul>
        </div>
    </div> 
</template>
<script>
import api from "@/api/component";
export default {
    name:"invoiceApplicationForm",
     data(){
        return{
            odSoInvoiceItemsList:[],
            doNoSet:"",//申请单号
            custName:"",//销售单位
            invoiceAddress:"",//地址
            custTelephone:"",//电话
            bankName:"",//开户行
            bankAccount:"",//银行账户
            isVatSpecialInvoice:"",//增值税专用发票、、
            isVatNormalInvoice:"",//增值税普通发票
            isProformaInvoice:"",//形式发票
            custTaxNo:"",//纳税人识别号
            auditBy:"",//
            bizPersonName:"",//业务员
            invoiceQtySum:"",//开票数量
            originAmtVatSum:"",//不含税
            originTaxAmtSum:"",//税额
            originAmtSum:"",//含税
            invoiceAmtVat:"",//总金额V
            invoiceDate:"",//开票日期
            soContractNo:"",//销售合同号
            orgName:"",// 
            invoiceCode:"",
            invoiceType:"",
            createdName:'',//业务申请人
            remark:"",

        }
     },
     created(){
        this.initData();
    },
    methods:{
         wrapText: function(row, column, cellValue){
            return cellValue.replace(",","\n");
        },
        initData(){
            let data={
                invoiceId:sessionStorage.getItem("invoId")
            }
            api.selectOdSoInvoicePrint(data).then(res=>{
                if(res.code=="success"){
                    // if(res.data.doNoSet.length){
                    //     let noStr=""
                    //     res.data.doNoSet.forEach((el,index) => {
                    //         if(index==0){
                    //             noStr=el;
                    //         }else{
                    //             noStr+=","+el;
                    //         }
                    //     });
                    //     this.doNoSet=noStr;//申请单号
                    // }
                    // if(res.data.soContractNoSet.length){
                    //     let contStr=""
                    //     res.data.soContractNoSet.forEach((el2,i) => {
                    //         if(i==0){
                    //             contStr=el2;
                    //         }else{
                    //             contStr+=","+el2;
                    //         }
                    //     });
                    //     this.soContractNo=contStr;
                    // }
                    if(res.data.invoiceDate){
                        this.invoiceDate=this.$timeFun(res.data.invoiceDate,true);
                    }
                    this.invoiceCode=res.data.invoiceCode;
                    this.orgName=res.data.orgName;
                    this.custName=res.data.custName;//销售单位
                    this.invoiceAddress=res.data.invoiceAddress;//地址
                    this.custTelephone=res.data.custTelephone;//电话
                    this.bankName=res.data.bankName;//开户行
                    this.bankAccount=res.data.bankAccount;//银行账户
                    // this.isVatSpecialInvoice=res.data.isVatSpecialInvoice?true:false;//增值税专用发票、、
                    // this.isVatNormalInvoice=res.data.isVatNormalInvoice?true:false;;//增值税普通发票
                    // this.isProformaInvoice=res.data.isProformaInvoice?true:false;;//形式发票
                    this.remark=res.data.remark;
                    if(res.data.isVatSpecialInvoice){
                        this.invoiceType="增值税专用发票";
                    }
                    if(res.data.isVatNormalInvoice){
                        if(this.invoiceType){
                            this.invoiceType+="，增值税专用发票";
                        }else{
                            this.invoiceType+="增值税专用发票";
                        }
                       
                    }
                    if(res.data.isProformaInvoice){
                        if(this.invoiceType){
                            this.invoiceType+="，形式发票";
                        }else{
                            this.invoiceType+="形式发票";
                        }
                    }
                    this.custTaxNo=res.data.custTaxNo;//纳税人识别号
                    this.createdName=res.data.createdName;//业务申请人
                    this.bizPersonName=res.data.bizPersonName;//业务员
                    this.invoiceQtySum=res.data.invoiceQtySum?this.getRound(res.data.invoiceQtySum,3):'';//开票数量
                    this.originAmtVatSum=res.data.originAmtVatSum?this.getRound(res.data.originAmtVatSum,2):'';//不含税
                    this.originTaxAmtSum=res.data.originTaxAmtSum?this.getRound(res.data.originTaxAmtSum,2):'';//税额
                    this.originAmtSum=res.data.originAmtSum?this.getRound(res.data.originAmtSum,2):'';//含税
                    this.invoiceAmtVat=this.toChies(res.data.invoiceAmtVat);//总金额V
                    this.odSoInvoiceItemsList=res.data.odSoInvoiceItemsFormList;
                    this.odSoInvoiceItemsList.forEach(it=>{
                        it.invoiceQty=it.invoiceQty?this.getRound(it.invoiceQty,3):'';
                        it.originAmtVat=it.originAmtVat?this.getRound(it.originAmtVat,2):''; 
                        it.originTaxAmt=it.originTaxAmt?this.getRound(it.originTaxAmt,2):''; 
                        it.originAmt=it.originAmt?this.getRound(it.originAmt,2):'';
                    })
                    this.auditBy=res.data.auditBy;
                }else{
                    this.$openWarning(res.message);
                }
            }).catch(e=>{
                console.log(e.message);
            });
        },
        getRound(value, n) {
            return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
        },
        billSure(){
            this.$print(this.$refs.print);
        },
        //金额转大写
        toChies(number){//形参
            var ret = "";
            if (number != "" && number != null && number != "0") {
                var unit = "仟佰拾亿仟佰拾万仟佰拾元角分",
                str = "";
                number += "00";
                var point = number.indexOf(".");
                if (point >= 0) {
                    number = number.substring(0, point) + number.substr(point + 1, 2);
                }
                unit = unit.substr(unit.length - number.length);
                for (var i = 0; i < number.length; i++) {
                str +=
                    "零壹贰叁肆伍陆柒捌玖".charAt(number.charAt(i)) + unit.charAt(i);
                }
                ret =
                str
                    .replace(/零(仟|佰|拾|角)/g, "零")
                    .replace(/(零)+/g, "零")
                    .replace(/零(万|亿|元)/g, "$1")
                    .replace(/(亿)万|(拾)/g, "$1$2")
                    .replace(/^元零?|零分/g, "")
                    .replace(/元$/g, "元") + "整";
            }
            return ret;
        }
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
.invoiceApplicationForm{
    // height: 970px;
    border: 0;
   // overflow-y: auto;
   
}
    .content-div{border: 0;}
   .table{
    //    table-layout:fixed;/*列宽由表格宽度和列宽度设定。*/
       border-collapse:colapse;
       border-spacing:0;
       background-color:transparent;
       display:table;
       max-width:980px;
       height:100%;
       width:980px;
       margin:0 auto;
       margin-bottom: 10px;
       overflow: hidden;
   }
   .table tr{
       width: 100%;
   }
   .table td{
        text-align:center;
        vertical-align:middle;
        font-size: 12px;
        font-family: 'Arial Normal', 'Arial';
        color: #333333;
        padding:4px 0;
  }
  .table .cont-right{
      text-align: right;
      padding-right: 5px;
  }
  .table-bordered {
    border: 1px solid #ddd;
  }
  .table .text-letf td{
      text-align: left;
     padding-left: 10px;
  }
  .table th{
    font-size: 12px;
    width:81px;
    text-align: center;
    font-weight: normal;
    padding:4px 0;
    color: #333;
  }
  *{
    margin: 0px;
    padding: 0px;
  }
//   .column{width:81px}
  .column,.value{
    
    border:1px solid #333;
  }
  .value2{
      text-align: right;
      word-wrap: break-word;
    word-break: normal;
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
.cont-ul{
    margin: 0 auto;
    text-align: center;
    width: 980px;
    overflow: hidden;
}
.cont-ul2{
    width: 100%;
    
}
.cont-ul3{
     margin-bottom: 10px;
}
.cont-ul li{
    float: left;
    width: 33%;
    text-align: left;
    padding-left: 10px;
    font-size: 12px;
    text-overflow: ellipsis;
    word-break: break-all;
    margin-bottom: 10px;
}
.cont-ul2 li{
    text-align: center;
     padding-left: 0;
     margin-bottom: 0;
}
input{
    vertical-align: -1px;
    margin-right: 4px;

}
.search-div{
      width: 100%;
    overflow: hidden;
    background: #ffffff;
    text-align: left;
    position: relative;
   line-height: 26px;
  }
.el-col-24{
        text-align: right;
    padding-right: 24%;
    margin-top: 20px;
}
</style>
