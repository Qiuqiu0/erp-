<template>
  <div id="inventoryReport" class="content-div">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <div class="index-div3 auto-sibling">
      <p class="hide-input" v-if="queryArea" @click="queryAreaShow()">更多条件<i class="el-icon-caret-bottom"></i></p>
      <p class="hide-input" v-else @click="queryAreaShow()">收起<i class="el-icon-caret-top"></i></p>
      <div class="search-div">
          <el-col :span="5" class="el-col">
            <label>公司</label>
            <el-input v-model="companyInfo.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
            <span class="comicon" @click="companyPopup"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>部门</label>
            <el-input v-model="branchInfo.branchName" class="el-inputs" placeholder="请选择" disabled></el-input>
            <span class="comicon" @click="branchPopup"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>物料编号</label>
            <el-input v-model="matterInfo.skuCode" class="el-inputs" placeholder="请选择" disabled></el-input>
            <span class="comicon" @click="matterPopup"><i class="el-icon-search"></i></span>
          </el-col>
          <!-- <el-col :span="5" class="el-col">
            <label>物料名称</label>
            <el-input v-model="matterInfo.skuCode" class="el-inputs" placeholder="请选择" disabled></el-input>
            <span class="moreIcon" @click="matterPopup"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>物料规格</label>
            <el-input v-model="batchCode" class="el-inputs"></el-input>
          </el-col> -->
          <el-col :span="5" class="el-col">
            <label>仓库名称</label>
            <el-input v-model="warehouseName.warehouseName" size="small" class="el-inputs" placeholder="请选择" disabled></el-input>
            <span  class='comicon' @click="warehouseTips"><i class="el-icon-search" ></i></span>
          </el-col>
            <!-- <el-col :span="5" class="el-col">
                <label>采购供应商</label>
                <el-input v-model="matterInfo.skuCode" class="el-inputs" placeholder="请选择" disabled></el-input>
                <span class="moreIcon" @click="matterPopup"><i class="el-icon-search"></i></span>
          </el-col> -->
          <el-col :span="5" class="el-col">
            <label>入库单号</label>
            <el-input v-model="docNo" class="el-inputs"></el-input>
          </el-col>
          <!-- <el-col :span="5" class="el-col">
            <label>采购合同号</label>
            <el-input v-model="batchCode" class="el-inputs"></el-input>
          </el-col> -->
          <el-col :span="5" class="el-col">
            <label>批次号</label>
            <el-input v-model="batchCode" class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>入库时间</label>
            <el-date-picker
                v-model="batchInvTime"
                type="daterange"
                class="el-inputs el-input2"
                size="mini"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-col>
      </div>
    </div>
    <div class="button-div auto-sibling">
        <el-button @click="download()"  v-if="$actionFlag(`F001`)"  icon="el-icon-download">导出</el-button>
    </div>
    <!--查询结果-->
    <div class="el-table-div" v-auto>
      <el-table
        class="el-table"
        border
        center
        height="calc(100% - 35px)"
        :data="reportData"
        v-loading="loading"
        ref="expandTable"
        show-summary
        :summary-method="getSummaries">
        <el-table-column prop="companyName" label="公司" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orgName" label="部门" min-width="180" show-overflow-tooltip></el-table-column>
         <el-table-column prop="warehouseName" label="仓库" min-width="180" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="skuCode" label="物料编号" min-width="100" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="skuName" label="物料名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="propertyInfo" label="物料规格" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="batchCode" label="批次号" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="docNo" label="入库单据号" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="入库时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{scope.row.batchInvTime | time2Date}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="batchInvQtyS" label="入库总数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
             <div class="content_right">
            <span>{{$numberToFixed(scope.row.batchInvQtyS, 3)}}</span>
             </div>
          </template>
        </el-table-column>
        <el-table-column prop="batchInvQtySSec" label="第二入库总数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
             <div class="content_right">
            <span>{{$numberToFixed(scope.row.batchInvQtySSec,3)}}</span>
             </div>
          </template>
        </el-table-column>
        <el-table-column prop="invQtyS" label="库存总数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
             <div class="content_right">
            <span>{{$numberToFixed(scope.row.invQtyS,3)}}</span>
             </div>
          </template>
        </el-table-column>
         <el-table-column prop="secUnitQty" label="第二库存总数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
             <div class="content_right">
            <span>{{$numberToFixed(scope.row.secUnitQty,3)}}</span>
             </div>
          </template>
        </el-table-column>
        <el-table-column label="库存成本" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
             <div class="content_right">
                  {{$moneyFormat({},{},scope.row.invAmt)}}
             </div>
          </template>
          
        </el-table-column>
        <el-table-column prop="unlimitedQtyS" label="可用总数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
             <div class="content_right">
            <span>{{$numberToFixed(scope.row.unlimitedQtyS,3)}}</span>
             </div>
          </template>
        </el-table-column>
        <el-table-column prop="reservedQtyS" label="占用总数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
             <div class="content_right">
            <span>{{$numberToFixed(scope.row.reservedQtyS, 3)}}</span>
             </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageArea"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentChange"
        @size-change="currentSize"
        :current-page="page"
        :page-sizes="[100, 200, 300,500]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <!--公司弹窗-->
    <company-select v-if="companyShow" :tipShow="companyShow" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
    <!--部门弹窗-->
    <branch-select v-if="branchShow" :tipShow="branchShow" :data="companyInfo" @departmentCancle="branchCancel" @departmentSure="branchSure"></branch-select>
      <!--选择仓库-->
    <warehouse-select v-if="warehouseShow" :tipShow='warehouseShow'  @warehouseCancle="warehouseCancle" @warehouseSure="warehouseSure">
    </warehouse-select>
    <!--物料编号弹窗-->
    <matter-select v-if="matterShow" :tipShow="matterShow" @matterCancle="matterCancel" @matterSure="matterSure"></matter-select>
  </div>
</template>
<script>
import { mapState } from "vuex";
import api from "@/api/reportQuery/report";
import companySelect from "@/components/componySelect";
import branchSelect from "@/components/departmentSelect";
import matterSelect from "@/components/matterSelect";
import warehouseSelect from "@/components/warehouseSelect.vue";
import {Loading } from "element-ui";
export default {
  name: "inventoryReport",
  data() {
    return {
      //查询条件
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      branchInfo: "",
      branchShow: false, //是否显示部门弹窗
      matterInfo: "",
      matterShow: false, //是否显示物料编号弹窗
      batchCode: "",
      //查询结果
      reportData: [],
      batchInvTime:[],//入库时间
      loading: false,
      loadingRow: false,
      page: 1,
      pageSize: 100,
      total: 0,
      docNo:"",//入库单号
      warehouseShow:false,//仓库
      warehouseName:{},//仓库
      sumTol: {},//总计
      queryArea:true,
    };
  },
  created() {
     if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      } 
  },
  methods: {
    //是否显示查询区域
    queryAreaShow() {
      this.queryArea = this.$showOne(this.queryArea);
    },
    //获取表格
    stockReportList() {
      if(this.batchInvTime.length){
        var batchInvTimeStart=this.batchInvTime[0];
        var batchInvTimeEnd=this.batchInvTime[1];
      }
      let params = {
        pageNum: this.page,
        rows: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        orgCode: this.branchInfo.branchCode,
        skuCode: this.matterInfo.skuCode,
        batchCode: this.batchCode,
        batchInvTimeStart:batchInvTimeStart,
        batchInvTimeEnd:batchInvTimeEnd,
        warehouseCode:this.warehouseName.warehouseCode,
        docNo:this.docNo
      };
      params = this.$queryFilter(params);
      this.loading = true;
      api.dataList(params).then(res => {
        this.loading = false;
        this.reportData = res.data.list;
        this.total = res.data.total;
      }).catch(() => {
        this.loading = false;
      });
    },
    
     //获取总计
    getSum() {
       if(this.batchInvTime.length){
        var batchInvTimeStart=this.batchInvTime[0];
        var batchInvTimeEnd=this.batchInvTime[1];
      }
      let params = {
        pageNum: this.page,
        rows: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        orgCode: this.branchInfo.branchCode,
        skuCode: this.matterInfo.skuCode,
        batchCode: this.batchCode,
        batchInvTimeStart:batchInvTimeStart,
        batchInvTimeEnd:batchInvTimeEnd,
        warehouseCode:this.warehouseName.warehouseCode,
        docNo:this.docNo
      };
      params = this.$queryFilter(params);
        api.dataSum(params).then(res => {
            this.sumTol = res.data;
        }).catch();
    },
     download(){
      if(this.batchInvTime.length){
        var batchInvTimeStart=this.batchInvTime[0];
        var batchInvTimeEnd=this.batchInvTime[1];
      }
      let params = {
        pageNum: this.page,
        rows: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        orgCode: this.branchInfo.branchCode,
        skuCode: this.matterInfo.skuCode,
        batchCode: this.batchCode,
        batchInvTimeStart:batchInvTimeStart,
        batchInvTimeEnd:batchInvTimeEnd,
        warehouseCode:this.warehouseName.warehouseCode,
        docNo:this.docNo
      };
      params = this.$queryFilter(params);
       //使用Element loading-start 方法
      var loading2 = Loading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)"
      });
      api.exportOdInventoryList(params).then(res=>{
        if(res.code=="fail"){
          this.$openWarning(res.message);
        }else{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="收发存报表.xls";
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
    //查询
    query() {
      this.page = 1;
      this.stockReportList();
      this.getSum();
    },
    //重置
    reset() {
       if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }else{
        this.companyInfo = {}; //公司
      }
      this.branchInfo ={};
      this.matterInfo ={};
      this.batchCode = "";
      this.docNo="";
      this.warehouseName={};
      this.batchInvTime=[];
      
    },
    //公司弹窗
    companyPopup() {
      this.companyShow = true;
    },
    //公司弹窗关闭
    companyCancel() {
      this.companyShow = false;
    },
    //公司弹窗确定并传值
    companySure(e) {
      this.companyShow = false;
      this.companyInfo = e;
      this.branchInfo = "";
    },
    //部门弹窗
    branchPopup() {
      // if (this.companyInfo == "") {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.branchShow = true;
    },
    //部门弹窗关闭
    branchCancel() {
      this.branchShow = false;
    },
    //部门弹窗确定并传值
    branchSure(e) {
      this.branchShow = false;
      this.branchInfo = e;
    },
    //仓库弹窗
    warehouseTips() {
      this.warehouseShow = true;
    },
    //仓库弹窗关闭
    warehouseCancle() {
      this.warehouseShow = false;
    },
    //仓库弹窗确定获取数据
    warehouseSure(e) {
      this.warehouseShow = false;
      this.warehouseName = e;
    },
    //物料编号弹窗
    matterPopup() {
      this.matterShow = true;
    },
    //物料编号弹窗关闭
    matterCancel() {
      this.matterShow = false;
    },
    //物料编号弹窗确定并传值
    matterSure(e) {
      this.matterShow = false;
      this.matterInfo = e;
    },
    //翻页
    currentChange(e) {
      this.page = e;
      this.stockReportList();
    },
    //单页数量
    currentSize(e) {
      this.page = 1;
      this.pageSize = e;
      this.stockReportList();
    },
         //总计
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
            if (index === 0) {
            sums[index] = "总计";
            return;
            }
            let key = column.property;
            if (["batchInvQtyS","invQtyS","batchInvQtySSec",
            "secUnitQty","unlimitedQtyS","reservedQtyS"].findIndex(it => it == key) !== -1) {
                sums[index] =this.sumTol?this.$sumTolFormat(this.sumTol[key]):"";
            } else {
                sums[index] = "";
            }
        });
        this.$nextTick(() => {
            this.$refs.expandTable.doLayout();
        });
        return sums;

    },
  },
  components: {
    companySelect,
    branchSelect,
    matterSelect,
    warehouseSelect
  }
};
</script>
<style lang="scss">
#inventoryReport {
  .el-col {
    position: relative;
    .moreIcon {
      width: 70%;
      height: 24px;
      position: absolute;
      top: 0;
      right: 0;
      padding: 4px 5px;
      cursor: pointer;
    }
  }
  .is-disabled {
    .el-input__inner {
      color: #666;
      cursor: pointer;
    }
  }
  // .el-col-5 {
  //   height: 32px;
  // }
  label {
    display: inline-block;
    width: 30%;
    vertical-align: middle;
  }
  .el-inputs,
  .el-selects {
    width: 70%;
    .el-input__inner {
      width: 100%;
    }
  }
  .input-div .el-col:last-child {
    margin-bottom: 0;
  }
  .pageArea {
    margin: 10px 0 0 20px;
  }
}
</style>