<template>
    <!--框架合同更改前后对比页面-->
    <div id="frameworkContract" class="content-view">
        <el-collapse v-model="activeNames" @change="handleChange" style="margin-top:30px">
            <el-collapse-item title="合同信息" v-if="!odPoContractIsNull ||contractInfoTable.length" name="1">
                <div class="index">
                    <div class="input-div input-div3">
                        <el-col v-if="odFwContract.companyName" :span="10" class="el-col">
                            <label>公司</label>
                            <el-input
                                v-model="odFwContract.companyName.oldValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odFwContract.companyName.newValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odFwContract.orgName" :span="10" class="el-col">
                            <label>部门</label>
                            <el-input
                                
                                v-model="odFwContract.orgName.oldValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odFwContract.orgName.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odFwContract.empName" :span="10" class="el-col">
                            <label>业务员</label>
                       
                            <el-input
                                
                                v-model="odFwContract.empName.oldValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odFwContract.empName.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odFwContract.contractCat" :span="10" class="el-col">                  
                            <label>协议类型</label>        
                            <el-input
                                
                                v-model="odFwContract.contractCat.oldValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odFwContract.contractCat.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col :span="10" v-if="odFwContract.custName" class="el-col">
                            <label>客户</label>
                       
                                
                            <el-input  v-model="odFwContract.custName.oldValue"
                                        class="el-inputs"
                                        disabled></el-input>
                            <label>更改后</label>
                            <el-input v-model="odFwContract.custName.newValue"
                                        class="el-inputs"
                                        disabled></el-input>
                        </el-col>
                        <el-col :span="10" v-if="odFwContract.supplierName" class="el-col">
                            <label>供应商</label>
                            
                            <el-input  v-model="odFwContract.supplierName.oldValue"
                                        class="el-inputs"
                                        disabled></el-input>
                             <label>更改后</label>
                            <el-input v-model="odFwContract.supplierName.newValue"
                                        class="el-inputs"
                                        disabled></el-input>
                      
                        </el-col>
                        <el-col :span="10" v-if="odFwContract.projectCode" class="el-col">
                            <label>项目号</label>
     
                            <el-input
                                v-model="odFwContract.projectCode.oldValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odFwContract.projectCode.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col :span="10" v-if="odFwContract.projectName" class="el-col">
                            <label>项目名称</label>

                            <el-input
                                v-model="odFwContract.projectName.oldValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odFwContract.projectName.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odFwContract.signTime" :span="10" class="el-col">
                            <label>签订日期</label>
                            
                            <el-input  class="el-inputs" v-model="odFwContract.signTime.oldValue"  disabled>
                            </el-input>
                             <label>更改后</label>
                            <el-input class="el-inputs" v-model="odFwContract.signTime.newValue"  disabled>
                            </el-input>
                        </el-col>
                        <el-col v-if="odFwContract.contractEndDate" :span="10" class="el-col">
                            <label>有效期限</label>
                           
                            <el-input  class="el-inputs" v-model="odFwContract.contractEndDate.oldValue"  disabled>
                            </el-input>
                             <label>更改后</label>
                            <el-input class="el-inputs" v-model="odFwContract.contractEndDate.newValue"  disabled>
                            </el-input>
                        </el-col>
                        <el-col v-if="odFwContract.extCode" :span="10" class="el-col">
                            <label>外部合同号</label>
                          
                            <el-input
                            
                            v-model="odFwContract.extCode.oldValue"
                            class="el-inputs"
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                                v-model="odFwContract.extCode.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odFwContract.currencyName" :span="10" class="el-col">
                            <label>业务币币别</label>
                         
                            <el-input
                            
                            v-model="odFwContract.currencyName.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odFwContract.currencyName.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odFwContract.currencyRate" :span="10" class="el-col">
                            <label>本位币汇率</label>
                            
                            <el-input
                            
                            v-model="odFwContract.currencyRate.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                            <el-input
                                v-model="odFwContract.currencyRate.newValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odFwContract.signPlace" :span="10" class="el-col">
                            <label>签约地点</label>
                           
                            <el-input
                            
                            v-model="odFwContract.signPlace.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odFwContract.signPlace.newValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odFwContract.payType" :span="10" class="el-col">
                            <label>付款类型</label>
                         
                            <el-input
                            
                            v-model="odFwContract.payType.oldValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                            v-model="odFwContract.payType.newValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                        </el-col>
                        <el-col v-if="odFwContract.payWay" :span="10" class="el-colc">
                            <label>付款方式</label>
                          
                            <el-input
                            
                            v-model="odFwContract.payWay.oldValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                            v-model="odFwContract.payWay.newValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                        </el-col>
                        <el-col v-if="odFwContract.usance" :span="10" class="el-colc">
                            <label>票期</label>
                          
                            <el-input
                            
                            v-model="odFwContract.usance.oldValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                            v-model="odFwContract.usance.newValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                        </el-col>
                        <el-col v-if="odFwContract.contractAmt" :span="10" class="el-col">
                            <label>协议金额</label>
                           
                            <el-input          
                            v-model="odFwContract.contractAmt.oldValue"
                            class="el-inputs"
                            disabled
                    
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                            v-model="odFwContract.contractAmt.newValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                        </el-col>
                        <el-col v-if="odFwContract.remark" :span="24" class="el-col-textarea" style="text-align:left;margin-left: 0;padding-left: 8px;">
                            <label style="width:6.2%">备注</label>
                          
                            <el-input
                            
                            type="textarea"
                            autosize
                            v-model="odFwContract.remark.oldValue"
                            size="small"
                            class="el-textarea"
                            style="width:40%"
                            resize="none"
                            disabled
                            >
                            </el-input>
                            <label style="width:6.2%">更改后</label>
                            <el-input
                            type="textarea"
                            autosize
                            v-model="odFwContract.remark.newValue"
                            size="small"
                            class="el-textarea el-textarea2"
                            style="width:40%"
                            resize="none"
                            disabled
                            >
                            </el-input>
                        </el-col>
                    </div>
                    <div class="table-div" v-if="contractInfoTable.length">
                        <p  class="table-div-p">合同明细</p>
                        <div v-for="(item,index) in contractInfoTable" :key="index">
                            <table class="table" align="center" valign="center">
                                <tr>
                                    <th></th>
                                    <th>物料号</th>
                                    <th>物料名称</th>
                                    <th>物料大类</th>
                                    <th>物料规格</th>
                                    <th>基础单位</th>
                                    <th>数量</th>
                                    <th>业务币含税单价</th>
                                    <th>业务币不含税单价</th>
                                    <th>业务币含税金额</th>
                                    <th>业务币不含税金额</th>
                                    <th>增值税率%</th>
                                    <th>增值税额</th>  
                                    <th>第二单位</th>
                                    <th>第二数量</th>
                                    <th>备注</th>
                                </tr>
                                <tr v-if="item.oldValue">
                                    <td><p>原始值</p></td>
                                    <td :title="item.oldValue.goodsCode"><p>{{item.oldValue.goodsCode}}</p></td>
                                    <td :title="item.oldValue.goodsName"><p>{{item.oldValue.goodsName}}</p></td>
                                    <td :title="item.oldValue.goodsCategoryName"><p>{{item.oldValue.goodsCategoryName}}</p></td>
                                    <td :title="item.oldValue.goodsSpec"><p>{{item.oldValue.goodsSpec}}</p></td>
                                    <td><p>{{item.oldValue.itemUnit}}</p></td>
                                    <td><p>{{item.oldValue.itemQty}}</p></td>
                                    <td><p>{{item.oldValue.originPrice}}</p></td>
                                    <td><p>{{item.oldValue.unorginPrice}}</p></td>
                                    <td><p>{{item.oldValue.originAmt}}</p></td>
                                    <td><p>{{item.oldValue.unorginAmt}}</p></td>
                                    <td><p>{{item.oldValue.taxRate}}</p></td>
                                    <td><p>{{item.oldValue.taxAmt}}</p></td>
                                    <td><p>{{item.oldValue.secUnit}}</p></td>
                                    <td><p>{{item.oldValue.secQty}}</p></td>
                                    <td :title="item.oldValue.remark"><p>{{item.oldValue.remark}}</p></td>
                                </tr>
                                 <tr v-if="item.newValue">
                                    <td><p>更改后</p></td>
                                    <td :title="item.newValue.goodsCode"><p>{{item.newValue.goodsCode}}</p></td>
                                    <td :title="item.newValue.goodsName"><p>{{item.newValue.goodsName}}</p></td>
                                    <td :title="item.newValue.goodsCategoryName"><p>{{item.newValue.goodsCategoryName}}</p></td>
                                    <td :title="item.newValue.goodsSpec"><p>{{item.newValue.goodsSpec}}</p></td>
                                    <td><p>{{item.newValue.itemUnit}}</p></td>
                                    <td><p>{{item.newValue.itemQty}}</p></td>
                                    <td><p>{{item.newValue.originPrice}}</p></td>
                                    <td><p>{{item.newValue.unorginPrice}}</p></td>
                                    <td><p>{{item.newValue.originAmt}}</p></td>
                                    <td><p>{{item.newValue.unorginAmt}}</p></td>
                                    <td><p>{{item.newValue.taxRate}}</p></td>
                                    <td><p>{{item.newValue.taxAmt}}</p></td>
                                    <td><p>{{item.newValue.secUnit}}</p></td>
                                    <td><p>{{item.newValue.secQty}}</p></td>
                                    <td :title="item.newValue.remark"><p>{{item.newValue.remark}}</p></td>
                                </tr>
                            </table>
                         </div>
                    </div>
                </div>
            </el-collapse-item>
            <!-- <el-collapse-item title="合同条款" v-if="odFwContractTermList.length" name="2">
                <div v-for="(item,index) in odFwContractTermList" :key="index">
                    <table class="table table2" align="center" valign="center">
                        <tr>
                            <th></th>
                            <th>条款内容</th>
                        </tr>
                        <tr v-if="item.oldValue">
                            <td><p>原始值</p></td>
                            <td :title="item.oldValue.termContent"><p>{{item.oldValue.termContent}}</p></td>
                        
                        </tr>
                            <tr v-if="item.newValue">
                            <td><p>更改后</p></td>
                            <td :title="item.newValue.termContent"><p>{{item.newValue.termContent}}</p></td>
                        </tr>
                    </table>
               
                </div>
            </el-collapse-item>
            <el-collapse-item title="打印及附件" v-if="sysSystemAccessoryList.length" name="3">
                <div v-for="(item,index) in sysSystemAccessoryList" :key="index">
                    <table class="table table2" align="center" valign="center">
                        <tr>
                            <th></th>
                            <th>文件名称</th>
                            <th>类型</th>
                            <th>上传时间</th>
                            <th>上传人</th>         
                        </tr>
                        <tr v-if="item.oldValue">
                            <td><p>原始值</p></td>
                            <td :title="item.oldValue.fileOldName"><p>{{item.oldValue.fileOldName}}</p></td>
                            <td><p>{{item.oldValue.fileType==2?"双签":"普通"}}</p></td>
                            <td><p>{{item.oldValue.createdTime | time }}</p></td>
                            <td><p>{{item.oldValue.createdName}}</p></td>                           
                        </tr>
                            <tr v-if="item.newValue">
                            <td><p>更改后</p></td>
                            <td :title="item.newValue.fileOldName"><p>{{item.newValue.fileOldName}}</p></td>
                            <td><p>{{item.newValue.fileType==2?"双签":"普通"}}</p></td>
                            <td><p>{{item.newValue.createdTime | time }}</p></td>
                            <td><p>{{item.newValue.createdName}}</p></td>
                        </tr>
                    </table>
                </div>
            </el-collapse-item> -->
        </el-collapse>
    </div>

</template>
<script>
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {getDictionary} from "@/api/contractMange/frameProtocol";
import api from "@/api/contractChange/contractChange";
export default {
    name:'frameworkContract',
    data() {
      return {
        activeNames: ['1'],
        contractInfoTable:[],//合同明细   
        odFwContractTermList:[],//合同条款
        sysSystemAccessoryList:[],//打印及复印件
        odFwContract:{},//合同基本信息
        payTypeList: [],//付款类型
        paymentList: [],//付款方式
        contractType: [],//合同类型
        isInaTypeList: [],//协议状态
         odPoContractIsNull:true,//判断对象是否为空
      };
    },
    created(){
        this.initDictionary();
    },
    methods:{
        handleChange(val) {
            console.log(val);
        },
        initData(){
            let data={
                id:this.$getUrl("id")//"7f40f2420e5c479c83cf38bc6f265ec4"
            }
            api.getOdContractChangeLog(data).then(res=>{
                if(res.code=="success"){
                    if(res.data==null){
                        this.$openWarning(res.message);
                        return;
                    } 
                    if(res.data.odFwContract && JSON.stringify(res.data.odFwContract)!= "{}"){
                        this.odPoContractIsNull=false;
                        this.odFwContract=res.data.odFwContract;
                        if(this.odFwContract.contractCat){
                            this.contractType.forEach(item=>{
                                if(this.odFwContract.contractCat.oldValue==item.dict_key){
                                    this.odFwContract.contractCat.oldValue=item.dict_value;
                                }
                                if(this.odFwContract.contractCat.newValue==item.dict_key){
                                    this.odFwContract.contractCat.newValue=item.dict_value;
                                }
                            })
                        }
                        if(this.odFwContract.signTime){
                            if(this.odFwContract.signTime.oldValue){
                                this.odFwContract.signTime.oldValue=this.$timeFun(this.odFwContract.signTime.oldValue,1);
                            }
                            if(this.odFwContract.signTime.newValue){
                                this.odFwContract.signTime.newValue=this.$timeFun(this.odFwContract.signTime.newValue,1);
                            }
                        }
                        if(this.odFwContract.contractEndDate){
                            if(this.odFwContract.contractEndDate.oldValue){
                                this.odFwContract.contractEndDate.oldValue=this.$timeFun(this.odFwContract.contractEndDate.oldValue,1);
                            }
                            if(this.odFwContract.contractEndDate.newValue){
                                this.odFwContract.contractEndDate.newValue=this.$timeFun(this.odFwContract.contractEndDate.newValue,1);
                            }
                        }
                        if(this.odFwContract.payType){
                            this.payTypeList.forEach(it=>{
                                if(this.odFwContract.payType.oldValue==it.dict_key){
                                    this.odFwContract.payType.oldValue=it.dict_value;
                                }
                                if(this.odFwContract.payType.newValue==it.dict_key){
                                    this.odFwContract.payType.newValue=it.dict_value;
                                }
                            })
                        }
                        if(this.odFwContract.payWay){
                            this.paymentList.forEach(it2=>{
                                if(this.odFwContract.payWay.oldValue==it2.dict_key){
                                    this.odFwContract.payWay.oldValue=it2.dict_value;
                                }
                                if(this.odFwContract.payWay.newValue==it2.dict_key){
                                    this.odFwContract.payWay.newValue=it2.dict_value;
                                }
                            })
                        }
                    }else{
                        this.odPoContractIsNull=true;
                    }
                    if(res.data.odFwContractItemsList){
                        let odFwList=res.data.odFwContractItemsList;//采购明细
                        odFwList.forEach((item,index)=>{
                            if(item.oldValue){
                                this.originAmtCh(item.oldValue,index);
                            }
                            if(item.newValue){
                                this.originAmtCh(item.newValue,index);
                            }
                            
                        });
                        this.contractInfoTable=odFwList;
                    }
                    this.odFwContractTermList=res.data.odFwContractTermList;
                    this.sysSystemAccessoryList=res.data.sysSystemAccessoryList;
                }
                console.log(res);
            }).catch();
        },
        //采购含税金额变动
        originAmtCh(e, index) {
            //采购不含税金额
            e.unorginAmt = this.$unorginAmt(e.originAmt, e.taxRate);
             //采购不含税单价
            e.unorginPrice = this.$unPrice(e.unorginAmt, e.itemQty);
            // //本币不含税金额 unBaseAmt
            // e.unBaseAmt = this.$tybbnhsje(e.baseAmt, e.baseTax);
            //  //本币不含税单价 unBasePrice
            // e.unBasePrice = this.$unPrice(e.unBaseAmt, e.itemQty);
            this.$set(this.contractInfoTable, index, e);
        },
        initDictionary() {
            const payType = new FormData();
            payType.append("dictNo", 1020);
            getDictionary(payType).then(res => {
                this.payTypeList = res.data;
            });
            const payment = new FormData();
            payment.append("dictNo", 1021);
            getDictionary(payment).then(res => {
                this.paymentList = res.data;
            });
            const contractType = new FormData();
            contractType.append("dictNo", 1089);
            getDictionary(contractType).then(res => {
                this.contractType = res.data;
            });
             setTimeout(()=>{
                this.initData();
            },1000)
        },
    }
}
</script>

<style>
#app{
    overflow-y: auto;
}
.input-div3{
    border: 0;
}
.input-div3 .el-col .el-inputs{
 width: 34% !important;
}
.input-div4 .el-col .el-inputs {
    width: 36% !important;
}
.input-div4 label{
    width: 16%;
}
.input-div3 label{
    width: 16%;
}
.input-div3 .el-col:nth-child(2n){
    margin-left: 10%;
}
.input-div3 .el-col label:after {
    content: "\FF1A";
}
/* .input-div3 .el-col{
    margin-bottom: 10px;
} */
.input-div3 .el-col-24{
    width: 100%;
}
.content-view{
    width: 96.2%;
    margin: 0 auto;
}
.el-collapse-item__header{
    padding-left: 10px !important;
    font-size: 14px !important;
    font-weight:bold;
}
.el-textarea.is-disabled .el-textarea__inner{
    border-color: #97999e !important;
}
.el-table .cell{
    text-align: center;
}
.input-div3 .el-col-checkbox label:after{
    content: "" !important;
}
.table-div{
      overflow-x: scroll;
       
}
.table-div-p{
    font-size:13px;
    color:#333;
    line-height: 30px;
    padding-left: 20px;
}

.table{
       border-collapse:colapse;
       border-spacing:0;
       background-color:transparent;
       display:table;
       width: 100%;
       height:100%;
       margin:0 auto;
       border: 1px solid #eaedf3;
       margin-bottom: 30px;
   }
   .table th{
        text-align: center;
        vertical-align: middle;
        font-size: 12px;
        font-family: 'Arial Normal', 'Arial';
        color: #fff;
        padding: 6px 10px;
        background: #1665d8;
        font-weight: normal;
        border: 1px solid;
        
  }
  .table td p{
    min-width: 160px;
    max-width: 160px;
    text-align: center;
    vertical-align: middle;
    font-size: 12px;
    font-family: 'Arial Normal', 'Arial';
    color: #606266;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 auto;
  }

  .table td,.table th{
    padding: 0!important;
    border: 1px solid #eaedf3;
    border-top: none!important;
    border-left: none!important;
  }
  .table tr:last-child td{
    background-color: #f2f2f2;
}
  .table-bordered {
    border: 1px solid #ddd;
  }
  *{
    margin: 0px;
    padding: 0px;
  }
.table-div::-webkit-scrollbar {
    width: 0;
    height: 12px;
    background-color: #f5f5f5;
}
.table-div::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px #4159a8;
    background-color: rgba(65,89,168,.1);
}
.table-div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #f5f5f5;
}
 
</style>
