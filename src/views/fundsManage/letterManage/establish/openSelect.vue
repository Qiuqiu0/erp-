<template>
  <!-- 公司列表 -->
  <div class="openSelect" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      append-to-body
      title="单据信息"
      :show-close="false"
      :before-close="establishClose"
      width="1200px"
      class="popup_box"
    >
      <div class="index">
         <div class="button-div">
            <el-button
              class="query-button"
              
              @click="queryData"
              icon="el-icon-search">查询</el-button
            >
            <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
          </div>
        <!-- 搜索 -->
        <div class="input-div">
          <p class="hide-input" v-if="show" @click="inputShow()">更多条件 <i class="el-icon-caret-bottom"></i></p>
          <p class="hide-input" v-else @click="inputShow()">收起<i class="el-icon-caret-top"></i></p>
          <div class="dialog-search-div">
            <el-col :span="5" class="el-col">
              <label>公司</label>
              <el-input
                v-model="companyName.companyName"
                class="el-inputs"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="componyTip"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>部门</label>
              <el-input
                v-model="branchName.branchName"
                class="el-inputs"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="departmentTip"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>采购合同号</label>
              <el-input  class="el-inputs" v-model="poNo" placeholder="请选择"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>外部合同号</label>
              <el-input  class="el-inputs" v-model="extCode" placeholder="请选择"></el-input>
            </el-col>
             <el-col :span="5" class="el-col">
              <label>创建日期</label>
              <el-date-picker
                style="width:70%;"
                v-model="createdTime"
                type="daterange"
                size="mini"
                value-format="timestamp"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>供应商代码</label>
              <el-input v-model="supplierInfo.supplierName" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="comicon" @click="supplierPopup"><i class="el-icon-search"></i></span>
            </el-col>
          </div>
        </div>
        <!-- 表格 -->
        <el-divider></el-divider>
        <div class="el-table-div">
          <el-table
            border
            center
            :data="tableData"
            class="el-table"
            ref="multipleTable"
            v-loading="loading"
          >
            <el-table-column type="index" label="序号" width="55"> </el-table-column>
            <el-table-column width="55" label="">
              <template scope="scope">
                <el-radio
                  :label="scope.$index"
                  v-model="radio"
                  @change="radiochange(scope.row)"
                >
                  &nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="poNo"
              label="采购订单号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="extCode"
              label="采购订单外部编号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="contractAmtVat"
              label="合同金额"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column 
            width="120px"
            prop="supplierName" 
            :show-overflow-tooltip="true"
            label="供应商"> 
            </el-table-column>
            <el-table-column
              prop="overShortageRate"
              label="合同金额(溢短上线)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
          <!--分页background-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="currentChange"
            :current-page="pageNum"
            :page-sizes="[100, 200, 300,500]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
      <slot></slot>
      <div class="button-div2">
        <el-button type="primary" @click="establishTrue()"  icon="el-icon-check">确 定</el-button>
        <el-button @click="establishClose()" icon="el-icon-close">取 消</el-button>
      </div>
      <!-- 选择公司弹窗 -->
        <compony-select
          v-if="componyShow"
          :tipShow="componyShow"
          @tipsCancle="tipsCancle"
          @tipsSure="tipsSure"
        >
        </compony-select>
        <!-- 选择部门弹窗 -->
        <department-select
          v-if="departmentShow"
          :tipShow="departmentShow"
          :data="companyName"
          @departmentCancle="departmentCancle"
          @departmentSure="departmentSure"
        ></department-select>
        <!--供应商弹窗-->
        <supplier-select 
          v-if="supplierShow" 
          :tipShow="supplierShow"
          @supplierCancle="supplierCancel"
          @supplierSure="supplierSure">
        </supplier-select>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue"; //公司组件
import supplierSelect from "@/components/supplierSelect";//供应商
import departmentSelect from "@/components/departmentSelect.vue"; //部门组件
import api from "@/api/letterManage/openLetter";
export default {
  name: "openSelect",
  data() {
    return {
      soContractId: "", //销售合同号
      companyName: ``, //公司
      componyShow: false, //公司
      departmentShow: false, //部门
      branchName: ``, //部门
      poNo: "", //采购订单号
      supplierShow: false, //是否显示供应商弹窗
      supplierInfo:{},
      tableData: [], //表格
      customerId: "", //客户
      createdTime: [], //创建时间
      extCode: "", //外部合同号
      tableAssign: "", //表格深拷贝数据
      selectioned: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      companyCode: ``, //公司代码
      companyName: ``, //公司名称
      companyType: ``, //公司类型
      radio: false, //单选状态
      getData: ``, //单选数据
      stateList: [{ value: 0, label: "启用" }, { value: 1, label: "禁用" }], //状态列表
      loading: true, //表格loading
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true,
      companyCurrencyCode:""
    };
  },
  props: {
    tipShow: {
      type: Boolean
    },
    paymentWay: {
      type: Number
    }
  },
  created() {},
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }

    //获取表格
    this.conList();
    // this.getCompanyList();
    // this.getCustomerList();
  },
  methods: {
    //选择数据
    radiochange(e) {
      this.getData = e;
      console.log("ddd", e);
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyName = e;
      this.branchName = this.staffName = "";
    },
    //公司弹窗打开
    componyTip() {
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
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
      this.staffName = "";
    },
    //供应商弹窗
    supplierPopup() {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancel() {
      this.supplierShow = false;
    },
    //供应商弹窗确定并传值
    supplierSure(e) {
      this.supplierShow = false;
      this.supplierInfo = e;
    },
    inputShow() {
      this.show = this.$dialogShowOne(this.show);
    },
    //关闭
    establishClose() {
      this.$emit("establishClose");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    establishTrue() {
      console.log("xxx", this.getData);
      console.log("xxx", this.radio);
      if (this.radio === false) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      } else {
        api.selectBbCompanyBaseVoByCode({companyCode:this.getData.companyCode}).then(res => {
          this.companyCurrencyCode = res.data.currencyCode;
        })
        api.getOdPoContractList({poId:this.getData.poId}).then(res => {
          this.getData.supplierCountry = res.data[0].tradeCountryName;
        }).then(res =>{
          api.getOdPoTransferInfo({poId:this.getData.poId}).then(res => {
            this.getData.deadlineLoaddate = res.data.deliveryCutoffDate;
            this.getData.sendAddress = res.data.loadingPort;
            this.getData.targetAddress = res.data.unloadingPort;
            this.getData.shipName = res.data.shipName;
          })
        }).then(res =>{
          api.getOdPoPaymentList({poId:this.getData.poId,paymentWay:10210020}).then(res => {
            if(res.data[0].creditType==10220005){
              this.getData.lcDay = true
            }
            if(res.data[0].creditType==10220010){
              this.getData.lcDay = false
            }
            this.getData.lcDueType = res.data[0].creditType;
          })
        }).then(res =>{
          api.getParitiesByCode({formCurrencyCode:this.getData.currencyCode, toCurrencyCode:this.companyCurrencyCode}).then(res => {
            this.getData.currencyRate = res.data.parities;
            this.getData.companyCurrencyCode = this.companyCurrencyCode;
          })
        }).then(res =>{
          if(this.getData.psContractCode){
            this.getData.lcProperty = 10910010
          }
          this.$router.push({
            name: "establishment",
            params: {
              data: this.getData,
              created:true,
            }
          });
        })
          api.getBbSupplierCollectionBanksBySupplierId({supplierId:this.getData.supplierId,isCollectionBank:1}).then(res => {
            if(res.data.list.length>0){
              this.getData.supplierBankName = res.data.list[0].bankName;
            }
          })
        
      }
      // this.$emit("establishTrue", this.getData);
      // this.radio = false;
      // this.getData = ``;
      // this.clearNone();
    },
    //获取表格
    conList() {
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        paymentWay:this.paymentWay,
        contractStatus:10130015,
      };
      if (this.poNo) {
        params.poNo = this.poNo;
      }
      if (this.extCode) {
        params.extCode = this.extCode;
      }
      if (this.branchName.branchCode) {
        params.orgCode = this.branchName.branchCode;
      }
      if (this.companyName.companyCode) {
        params.companyCode = this.companyName.companyCode;
      }
      if(this.supplierInfo.supplierCode){
        params.supplierCode = this.supplierInfo.supplierCode;
      }
      if (this.createdTime.length > 0) {
        params.createdTimeBegin =
          this.createdTime.length === 0 ? "" : this.createdTime[0];
        params.createdTimeEnd =
          this.createdTime.length === 0 ? "" : this.createdTime[1];
      }

      api
        .getClist(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //查询
    queryData() {
      this.conList();
    },
    //清空选项
    clearNone() {
      this.branchName = ``;
      this.companyName = ``;
      this.createdTime = "";
      this.extCode = "";
      this.poNo = "";
      this.radio = false;
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.radio = false;
      this.conList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.conList();
    },
    //表格选择
    handleChange(e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    //表格单选
    dialogCheck(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.tableData.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.index = this.tableData.indexOf(e);
      this.selectioned = e;
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
    componySelect,
    departmentSelect,
    supplierSelect
  }
};
</script>

<style lang="scss">
</style>
