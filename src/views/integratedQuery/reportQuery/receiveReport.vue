<template>
    <!--收发存报表-->
    <div class="receiveReport content-div">
        <div class="button-div button-div-query auto-sibling">
            <el-button class="query-button" @click="queryData()" icon="el-icon-search">查询</el-button>
			<el-button @click="resetData()" icon="el-icon-refresh">重置</el-button>
        </div>
        <div class="index-div3 auto-sibling">
            <p class="hide-input" v-if="show" @click="inputShow()">
                更多条件 <i class="el-icon-caret-bottom"></i>
            </p>
            <p class="hide-input" v-else @click="inputShow()">
                收起<i class="el-icon-caret-top"></i>
            </p>
            <div class="search-div">
                <el-col :span="5" class="el-colc">
                    <label>分类</label>
                    <el-select   size="small" class="el-inputs el-select" @change="changeType" v-model="type"  placeholder="请选择" >
                        <el-option v-for="item in typeList"
                                    :key="item.value"  
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                </el-col>
               <el-col :span="5" class="el-col">
                    <label>公司</label>
                    <el-input v-model="companyName.companyName" class="el-inputs" size="small" placeholder="请选择" disabled></el-input>
                    <span class='comicon' @click="componyTip"><i class="el-icon-search" ></i></span>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>部门</label>
                    <el-input v-model="branchName.branchName" size="small" class="el-inputs"  placeholder="请选择" disabled></el-input>
                    <span class='comicon' @click="departmentTip"><i class="el-icon-search" ></i></span>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>业务员</label>
                    <el-input v-model="staffName.empName" size="small" class="el-inputs"  placeholder="请选择" disabled></el-input>
                    <span class='comicon' @click="staffTip"><i class="el-icon-search" ></i></span>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>物料编码</label>
                    <el-input v-model="matterName.skuName" size="small" class="el-inputs"  placeholder="请选择" disabled></el-input>
                    <span class='comicon' @click="matterTips"><i class="el-icon-search" ></i></span>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>批次号</label>
                    <el-input  size="small" v-model="batchCode" class="el-inputs" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="5" class="el-col">
                        <label>财务账期</label>
                        <el-date-picker
                                type="month"
                                size="small"
                                v-model="accountingMonth"
                                placeholder="请选择"
                                value-format="yyyy-MM"
                                >
                        </el-date-picker>   
                </el-col>
            </div>
        </div>
        <div class="button-div auto-sibling">
            <el-button @click="download()"  v-if="$actionFlag(`F001`)"  icon="el-icon-download">导出</el-button>
        </div>
        <!-- 表格  开始 -->
        <div class="el-table-div" v-auto>
            <el-table 
                border center 
                v-if="tableFlag"
                class="el-table el-table-info"
                ref="multipleTable"
                :data="tableData" 
                height="calc(100% - 35px)"
                :row-class-name="tableRowClassName"
                v-loading="loading">
                <el-table-column type="index" width="50" label="序号">
                </el-table-column>
                <el-table-column  prop="orgName" label="部门"  width="120px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column v-if="selectedType!=1" prop="bizPersonName" label="业务员" width="100px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column v-if="selectedType!=1 && selectedType!=2 && selectedType!=3"  label="批次号" width="100px" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isDetail==1"></div>
                        <div v-else>{{scope.row.batchCode}}</div>
                    </template>
                </el-table-column>
                <el-table-column v-if="selectedType!=1 && selectedType!=2"  prop="goodsName" label="物料名称" width="100px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column v-if="selectedType!=1 && selectedType!=2"   prop="categoryShowName" label="物料大类" width="140px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column v-if="selectedType!=1 && selectedType!=2"   prop="goodsSpec" label="物料规格" width="140px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column v-if="selectedType!=1 && selectedType!=2"   prop="unitName" label="计量单位" width="100px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column v-if="selectedType!=1 && selectedType!=2 && selectedType!=3 && selectedType!=4"  prop="moveTypeName" label="凭证类型" width="100px" :show-overflow-tooltip="true">
                </el-table-column>

                <el-table-column label="期初存货">
                    <el-table-column label="数量" prop="beginQty"  show-overflow-tooltip>
                        <template slot-scope="scope">
                             <div class="content_right">
                            <span>{{$numberToFixed(scope.row.beginQty,3)}}</span>
                             </div>
                        </template>
                    </el-table-column>

                    <el-table-column v-if="selectedType!=1 && selectedType!=2 && selectedType!=3 && selectedType!=4" 
                    width="120" label="单价" prop="beginPrice" show-overflow-tooltip>
                        <template slot-scope="scope">
                             <div class="content_right">
                            {{$numberToFixed(scope.row.beginPrice,6)}}
                             </div>
                        </template>
                    </el-table-column>

                    <el-table-column  label="金额" prop="beginAmt"  show-overflow-tooltip>
                        <template slot-scope="scope">
                             <div class="content_right">
                            {{$moneyFormat(scope.row,scope.column,scope.row.beginAmt)}}
                             </div>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column label="本期入库">
                    <el-table-column label="数量" prop="nowQtyIn"  show-overflow-tooltip>
                        <template slot-scope="scope">
                             <div class="content_right">
                            <span>{{$numberToFixed(scope.row.nowQtyIn,3)}}</span>
                             </div>
                        </template>
                    </el-table-column>

                    <el-table-column v-if="selectedType!=1 && selectedType!=2 && selectedType!=3 && selectedType!=4"
                    width="120"   label="单价" prop="nowPriceIn"  show-overflow-tooltip>
                        <template slot-scope="scope">
                             <div class="content_right">
                            {{$numberToFixed(scope.row.nowPriceIn,6)}}
                             </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="金额" prop="nowAmtIn"  show-overflow-tooltip>
                        <template slot-scope="scope">
                             <div class="content_right">
                            {{$moneyFormat(scope.row,scope.column,scope.row.nowAmtIn)}}
                             </div>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column label="本期出库">
                    <el-table-column label="数量" prop="nowQtyOut"  show-overflow-tooltip>
                         <template slot-scope="scope">
                            <div class="content_right">
                                <span>{{$numberToFixed(scope.row.nowQtyOut,3)}}</span>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column v-if="selectedType!=1 && selectedType!=2 && selectedType!=3 && selectedType!=4"
                    width="120"   label="单价" prop="nowPriceOut"  show-overflow-tooltip>
                        <template slot-scope="scope">
                             <div class="content_right">
                                {{$numberToFixed(scope.row.nowPriceOut,6)}}
                             </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="金额" prop="nowAmtOut"  show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div class="content_right">
                                {{$moneyFormat(scope.row,scope.column,scope.row.nowAmtOut)}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column label="期末存货">
                    <el-table-column  label="数量"  prop="endQty"  show-overflow-tooltip>
                         <template slot-scope="scope">
                            <div class="content_right">
                                <span>{{$numberToFixed(scope.row.endQty,3)}}</span>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column v-if="selectedType!=1 && selectedType!=2 && selectedType!=3 && selectedType!=4"  
                    width="120"
                    label="单价" prop="endPrice"  show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div class="content_right">
                            {{$numberToFixed(scope.row.endPrice,6)}}
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="金额" prop="endAmt"  show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div class="content_right">
                            {{$moneyFormat(scope.row,scope.column,scope.row.endAmt)}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column v-if="selectedType==0" width="100"  label="业务过账日期" prop="warrantPostDate" show-overflow-tooltip></el-table-column>
                <el-table-column v-if="selectedType==0"  width="100" label="财务过账日期" prop="financialPostingDate" show-overflow-tooltip></el-table-column>
                <el-table-column v-if="selectedType==0"  width="100" label="财务凭证号" prop="warrantPostCode" show-overflow-tooltip></el-table-column>
            </el-table>
            
        </div>
        <!-- 选择公司弹窗 -->
        <compony-select v-if="componyShow" :tipShow='componyShow' @tipsCancle="tipsCancle" @tipsSure="tipsSure">
        </compony-select>
        <!-- 选择部门弹窗 -->
        <department-select v-if="departmentShow" :tipShow='departmentShow' :data='companyName' 
            @departmentCancle="departmentCancle" @departmentSure="departmentSure">
        </department-select>
        <!-- 选择员工弹窗 -->
        <staff-select v-if="staffShow" :tipShow='staffShow' :data={} @staffCancle="staffCancle" @staffSure="staffSure">
        </staff-select>
        <!--选择物料号-->
        <matter-select v-if="matterShow" :tipShow='matterShow'  @matterCancle="matterCancle" @matterSure="matterSure">
        </matter-select>
    </div>
</template>
<script>
import api from "@/api/reportQuery/bill";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import matterSelect from "@/components/matterSelect.vue";
import { Loading } from "element-ui";
export default {
  name: "receiveReport",
  data() {
    return {
      componyShow: false, //公司弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      matterShow: false, //物料弹窗
      companyName: {},
      branchName: {},
      staffName: {},
      matterName: {},
      typeList: [
        { label: "部门", value: 1 },
        { label: "部门+业务员", value: 2 },
        { label: "部门+业务员+物料名称", value: 3 },
        { label: "部门+业务员+物料名称+批次", value: 4 },
        { label: "不做分类（按物料+批次排序展示）", value: 0 }
      ], //分类
      type: 0,
      accountingMonth: "", //财务账期
      batchCode: "", //批次号
      loading: false,
      tableData: [],
      show: true,
      tableFlag: true,
      selectedType: "" //选中的分类
    };
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    matterSelect
  },
  created(){
     if(window.IsShowDefaultCompanyInfo){
        this.companyName=window.defaultCompanyInfo;
      }
  },
  methods: {
    //改变分类
    changeType(val) {
      this.type = val;
      // if(this.type==0){
      //     this.tableFlag=false;
      //     setTimeout(()=>{
      //         this.tableFlag=true;
      //     },100);
      // }
    },
    //下载
    download() {
      if (JSON.stringify(this.companyName) === "{}") {
        this.$openWarning("请选择公司");
        return;
      }
      if (this.accountingMonth == "") {
        this.$openWarning("请选择财务账期");
        return;
      }
      if (this.batchCode) {
        var batchCode = this.batchCode;
      }
      let data = {
        accountingMonth: this.accountingMonth,
        batchCode: batchCode,
        bizPersonCode: this.staffName.empCode,
        companyCode: this.companyName.companyCode,
        companyId: this.companyName.companyId,
        goodsCode: this.matterName.skuCode,
        orgCode: this.branchName.branchCode,
        type: this.type
      };
      //使用Element loading-start 方法
      var loading2 = Loading.service({
        lock: true,
        text: "加载中...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      api
        .exportInventory(data)
        .then(res => {
          if (res.code == "fail") {
            this.$openWarning(res.message);
          } else {
            const blob = new Blob([res.data]);
            const a = document.createElement("a");
            const url = window.URL.createObjectURL(blob);
            const filename = "收发存报表.xls";
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
          }
          loading2.close();
        })
        .catch(e => {
          loading2.close();
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.isDetail == "0") {
        return "grey-row";
      } else {
        return "white-row";
      }
    },
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    queryData() {
      if (JSON.stringify(this.companyName) === "{}") {
        this.$openWarning("请选择公司");
        return;
      }
      if (this.accountingMonth == "") {
        this.$openWarning("请选择财务账期");
        return;
      }
      this.loading = true;
      if (this.batchCode) {
        var batchCode = this.batchCode;
      }
      let data = {
        accountingMonth: this.accountingMonth,
        batchCode: batchCode,
        bizPersonCode: this.staffName.empCode,
        companyCode: this.companyName.companyCode,
        companyId: this.companyName.companyId,
        goodsCode: this.matterName.skuCode,
        orgCode: this.branchName.branchCode,
        type: this.type
      };
      api
        .getInventoryInOutOnHandList(data)
        .then(res => {
          if (res.code == "success") {
            this.selectedType = this.type;
            this.tableData = res.data;
            this.tableData.forEach(item => {
              if (item.financialPostingDate) {
                item.financialPostingDate = this.$timeFun(
                  item.financialPostingDate,
                  true
                );
              }
              if (item.warrantPostDate) {
                item.warrantPostDate = this.$timeFun(
                  item.warrantPostDate,
                  true
                );
              }
            });
          } else {
            this.$openWarning(res.message);
          }
          this.loading = false;
        })
        .catch();
    },
    resetData() {
      this.accountingMonth = "";
      this.batchCode = "";
      this.staffName = {};
       if(window.IsShowDefaultCompanyInfo){
        this.companyName=window.defaultCompanyInfo;
      }else{
        this.companyName = {}; //公司
      }
      this.matterName = {};
      this.branchName = {};
      this.type = 0;
    },
    //公司弹窗打开
    componyTip() {
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyName = e;
      this.companyCode = e.companyCode;
      this.branchName = "";
    },
    //部门弹窗打开
    departmentTip() {
      // if (this.companyName == ``) {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.departmentShow = true;
    },
    //部门弹窗关闭
    departmentCancle() {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure(e) {
      this.departmentShow = false;
      this.branchName = e;
    },
    //员工弹窗打开
    staffTip() {
      this.staffShow = true;
    },
    //员工弹窗关闭
    staffCancle() {
      this.staffShow = false;
    },
    //员工弹窗确定获取数据
    staffSure(e) {
      this.staffShow = false;
      this.staffName = e;
      this.staffCode = e.empCode;
    },
    //物料号弹窗
    matterTips() {
      this.matterShow = true;
    },
    //物料号弹窗关闭
    matterCancle() {
      this.matterShow = false;
    },
    //物料号确定获取数据
    matterSure(e) {
      this.matterShow = false;
      this.matterName = e;
    }
  }
};
</script>
<style lang="scss">
.receiveReport {
  .el-table-info tr th {
    background: #78aef9 !important;
  }
  .el-table-info .grey-row {
    background: #f2f2f2;
  }
  .el-table-info .white-row {
    background: #fff;
  }
}
</style>
