<template>
  <div id="stockReport" class="content-div">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
      <el-col :span="5" class="el-col">
        <label>公司</label>
        <el-input v-model="companyInfo.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
        <span class="moreIcon" @click="companyPopup"><i class="el-icon-search"></i></span>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>部门</label>
        <el-input v-model="branchInfo.branchName" class="el-inputs" placeholder="请选择" disabled></el-input>
        <span class="moreIcon" @click="branchPopup"><i class="el-icon-search"></i></span>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>物料编号</label>
        <el-input v-model="matterInfo.skuCode" class="el-inputs" placeholder="请选择" disabled></el-input>
        <span class="moreIcon" @click="matterPopup"><i class="el-icon-search"></i></span>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>批次号</label>
        <el-input v-model="batchCode" class="el-inputs"></el-input>
      </el-col>
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
        :row-key="getRowKey"
        :expand-row-keys="expandArray"
        @expand-change="expandChange"
        @row-click="selectedRow">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.reportDetailData" v-loading="loadingRow">
              <el-table-column prop="docNo" label="入库单据号" min-width="150" show-overflow-tooltip></el-table-column>
              <el-table-column label="入库时间" min-width="160" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.batchInvTime | time}}</span>
                </template>
              </el-table-column>
              <el-table-column label="入库数量" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="content_right">
                      <span>{{$numberToFixed(scope.row.batchInvQtyS,3)}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="库存数量" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="content_right">
                  <span>{{$numberToFixed(scope.row.invQtyS,3)}}</span>
              </div>
                </template>
              </el-table-column>
              <el-table-column label="第二入库数量" min-width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="content_right">
                  <span>{{$numberToFixed(scope.row.batchInvQtySSec,3)}}</span>
              </div>
              </template>
            </el-table-column>
            <el-table-column label="第二库存数量" min-width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="content_right">
                  <span>{{$numberToFixed(scope.row.secUnitQty,3)}}</span>
              </div>
              </template>
            </el-table-column>
              <el-table-column label="可用数量" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="content_right">
                  <span>{{$numberToFixed(scope.row.unlimitedQtyS,3)}}</span>
              </div>
                </template>
              </el-table-column>
              <el-table-column label="占用数量" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="content_right">
                  <span>{{$numberToFixed(scope.row.reservedQtyS,3)}}</span>
              </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="odCompanyName" label="公司" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="odOrgName" label="部门" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="odSkuCode" label="物料编号" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="odSkuName" label="物料名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="odBatchCode" label="批次号" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="入库总数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
             <div class="content_right">
                  <span>{{$numberToFixed(scope.row.odBatchInvQtyS,3)}}</span>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="库存总数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="content_right">
                  <span>{{$numberToFixed(scope.row.odInvQtyS,3)}}</span>
              </div>
          </template>
        </el-table-column>
         <el-table-column label="第二入库总数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="content_right">
                  <span>{{$numberToFixed(scope.row.batchInvQtySSec,3)}}</span>
              </div>
          </template>
        </el-table-column>
         <el-table-column label="第二库存总数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="content_right">
                  <span>{{$numberToFixed(scope.row.secUnitQty,3)}}</span>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="库存成本" min-width="150" show-overflow-tooltip>
           <template slot-scope="scope">
                <div class="content_right">
              {{$moneyFormat(scope.row,scope.column,scope.row.odInvAmt)}}
                </div>
          </template>
        </el-table-column>
        <el-table-column label="可用总数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="content_right">
                  <span>{{$numberToFixed(scope.row.unlimitedQtyS,3)}}</span>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="占用总数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="content_right">
                  <span>{{$numberToFixed(scope.row.odReservedQtyS,3)}}</span>
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
    <!--物料编号弹窗-->
    <matter-select v-if="matterShow" :tipShow="matterShow" @matterCancle="matterCancel" @matterSure="matterSure"></matter-select>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ReportApi from "@/api/reportQuery/report";
import companySelect from "@/components/componySelect";
import branchSelect from "@/components/departmentSelect";
import matterSelect from "@/components/matterSelect";
export default {
  name: "stockReport",
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
      loading: false,
      loadingRow: false,
      getRowKey: row => {
        return row.odBatchCode; //使用该字段作为唯一标识
      },
      expandArray: [], //展开该数组中包含的所有明细行
      page: 1,
      pageSize: 100,
      total: 0,
      navColor: {
        button: {
          backgroundColor: ""
        }
      }
    };
  },
  created() {
     if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //获取表格
    stockReportList() {
      let params = {
        pageNum: this.page,
        rows: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        orgCode: this.branchInfo.branchCode,
        skuCode: this.matterInfo.skuCode,
        batchCode: this.batchCode
      };
      params = this.$queryFilter(params);
      this.loading = true;
      ReportApi.stockReportList(params).then(res => {
        this.loading = false;
        this.reportData = res.data.list;
        this.total = res.data.total;
        this.reportData.forEach(item => {
          item.reportDetailData = [];
          item.isLoaded = false;
        });
      }).catch(() => {
        this.loading = false;
      });
    },
    //查询
    query() {
      this.page = 1;
      this.stockReportList();
    },
    //重置
    reset() {
      if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }else{
        this.companyInfo = {}; //公司
      }
      this.branchInfo = "";
      this.matterInfo = "";
      this.batchCode = "";
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
    //展开明细行
    expandChange(row, rows) {
      if (rows.length) {
        this.expandArray = [];
        this.expandArray.push(row.odBatchCode); //只展开一行
        //获取明细行
        this.getDetailRow(row);
      } else { //全部收起
        this.expandArray = [];
      }
    },
    selectedRow(e) {
      this.$refs.expandTable.toggleRowExpansion(e, true);
    },
    //获取明细行
    getDetailRow(row) {
      //加载过数据时不再加载
      if (row.isLoaded) {
        return false;
      }
      this.loadingRow = true;
      ReportApi.stockReportDetailRow({
        batchCode: row.odBatchCode
      }).then(res => {
        this.loadingRow = false;
        //重新展开该行(加载的数据不刷新)
        this.expandArray = [];
        this.expandArray.push(row.odBatchCode);
        row.reportDetailData = res.data;
        row.isLoaded = true;
      }).catch(() => {
        this.loadingRow = false;
      });
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
    }
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    }
  },
  components: {
    companySelect,
    branchSelect,
    matterSelect
  }
};
</script>
<style lang="scss">
#stockReport {
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
  .el-col-5 {
    height: 32px;
  }
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