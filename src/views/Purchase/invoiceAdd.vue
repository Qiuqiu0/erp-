<template>
  <div class="invoiceAdd"
       v-if="tipShows">
    <el-dialog :visible.sync="tipShows"
               title="采购信息"
               :show-close="false"
               width="1100px"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               class="popup_box">
      <div class="button-div"
           style="text-align:left">
        <el-button class="query-button"
                   @click="searchFun"
                   icon="el-icon-search">查询</el-button>
        <el-button @click="clearNone"
                   icon="el-icon-refresh">重置</el-button>
      </div>
      <!-- 搜索 -->
      <div class="index-div3 index-div4">
        <p class="hide-input"
           v-if="show"
           @click="inputShow()">
          更多条件 <i class="el-icon-caret-bottom"></i>
        </p>
        <p class="hide-input"
           v-else
           @click="inputShow()">
          收起<i class="el-icon-caret-top"></i>
        </p>
        <div class="dialog-search-div">
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">公司</label>
            <el-input v-model="createForm.companyName"
                      class="el-inputs"
                      placeholder="请选择"
                      :disabled="isAllowChange"
                      required></el-input>
            <span class="comicon"
                  style="width: 10%;"
                  @click="componyTip"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">部门</label>
            <el-input v-model="createForm.orgName"
                      :disabled="isAllowChange"
                      class="el-inputs"
                      placeholder="请选择"></el-input>
            <span class="comicon"
                  style="width: 10%;"
                  @click="departmentTip"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">采购合同号</label>
            <el-input v-model="createForm.erpPoNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">外部合同号</label>
            <el-input v-model="createForm.externalPoNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col"
                  v-if="type == 0">
            <label style="width:31%">入库单号</label>
            <el-input v-model="createForm.wvNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col"
                  v-else-if="type != 0">
            <label style="width:31%">退货单号</label>
            <el-input v-model="createForm.unwvNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">供应商</label>
            <el-input v-model="createForm.supplierName"
                      :disabled="isAllowChange"
                      class="el-inputs"
                      placeholder="请选择"></el-input>
            <span class="comicon"
                  style="width: 10%;"
                  @click="supplierTip"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label style="width:31%">创建日期</label>
            <el-date-picker v-model="createdDate"
                            type="daterange"
                            class="el-input2"
                            size="mini"
                            value-format="timestamp"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label style="width:31%">完全开票</label>
            <el-select v-model="createForm.isBilled"
                       placeholder="请选择"
                       clearable
                       :disabled="isBilledDisable"
                       @change="handleIsbilledChange($event)"
                       size="small"
                       class="el-select">
              <el-option v-for="item in isBilledList"
                         :key="item.value"
                         :label="item.dict_value"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </div>
      </div>
      <!-- 表格 -->
      <el-divider></el-divider>
      <div class="el-table-div invoiceAddForm">
        <el-table border
                  center
                  :data="tableData"
                  class="el-table"
                  ref="multipleTable"
                  v-loading="loading"
                  @select="handleDataSelect"
                  @select-all="handleDataSelectall"
                  @row-click="rowClick"
                  @selection-change="handleDataSelectChange">
          <el-table-column type="selection"
                           width="55"> </el-table-column>
          <!-- <el-table-column
            width="55"
            label=""
          >
            <template scope="scope">
              <el-radio
                :label="scope.$index"
                @change="radiochange(scope.row)"
              >
                &nbsp;
              </el-radio>
            </template>
          </el-table-column> -->
          <el-table-column prop="erpPoNo"
                           label="采购合同号"
                           show-overflow-tooltip
                           width="120px">
          </el-table-column>
          <!-- <el-table-column
            prop="poRowno"
            label="采购合同行号"
            show-overflow-tooltip
          >
          </el-table-column> -->
          <el-table-column prop="externalPoNo"
                           label="外部合同号"
                           show-overflow-tooltip
                           width="120px">
          </el-table-column>
          <el-table-column v-if="type == 0"
                           prop="wvNo"
                           label="入库单号"
                           show-overflow-tooltip
                           width="120px">
          </el-table-column>
          <el-table-column v-else-if="type != 0"
                           prop="unwvNo"
                           label="退货单号"
                           show-overflow-tooltip
                           width="120px">
          </el-table-column>
          <el-table-column prop="supplierName"
                           label="供应商"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="完全开票"
                           show-overflow-tooltip
                           width="50px">
            <template scope="scope">
              {{ scope.row.isBilled == 1 ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="createdName"
                           label="创建人"
                           show-overflow-tooltip
                           width="80px">
          </el-table-column>
          <el-table-column label="创建日期"
                           width="150px"
                           show-overflow-tooltip>
            <template scope="scope">
              {{ scope.row.createdTime | time }}
            </template>
          </el-table-column>
          <el-table-column prop="updatedName"
                           label="修改人"
                           show-overflow-tooltip
                           width="80px">
          </el-table-column>
          <el-table-column prop="updatedTime"
                           label="修改日期"
                           width="150px"
                           show-overflow-tooltip>
            <template scope="scope">
              {{ scope.row.updatedTime | time }}
            </template>
          </el-table-column>
        </el-table>
        <!--分页background-->
        <el-pagination @size-change="handleSizeChange"
                       @current-change="currentChange"
                       :current-page="pageNum"
                       :page-sizes="[100, 200, 300,500]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
      <slot></slot>
      <div class="button-div2">
        <el-button type="primary"
                   @click="confirm()"
                   :disabled="isAllowConfirm"
                   icon="el-icon-check">确认</el-button>
        <el-button @click="invoiceCancle()"
                   icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 选择公司弹窗 -->
    <compony-select v-if="companyShow"
                    :tipShow="companyShow"
                    :ztz="ztz"
                    @tipsCancle="tipsCancle"
                    @tipsSure="tipsSure">
    </compony-select>
    <!-- 选择部门弹窗 -->
    <department-select v-if="departmentShow"
                       :tipShow="departmentShow"
                       :data="companyList"
                       @departmentCancle="departmentCancle"
                       @departmentSure="departmentSure">
    </department-select>
    <!-- 选择供应商弹窗 -->
    <supplier-select v-if="supplierShow"
                     :tipShow="supplierShow"
                     @supplierCancle="supplierCancle"
                     @supplierSure="supplierSure">
    </supplier-select>
  </div>
</template>
<script>
import { preInvoiceList } from "@/api/Purchase/invoice";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import supplierSelect from "@/components/supplierSelect.vue";
export default {
  name: "invoiceAdd",
  data () {
    return {
      tableData: [], //表格
      ztz: 0,
      selectedList: [], //选中数据
      selectedIndex: null, //选中索引
      companyList: {}, //公司
      createdDate: [], //创建时间
      loading: false, //表格loading
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true,
      isBilledList: [
        { dict_value: "否", value: 0 },
        { dict_value: "是", value: 1 }
      ], //是否完全开票
      companyShow: false, //公司弹窗
      departmentShow: false, //部门弹窗
      supplierShow: false, //供应商弹窗
      branchName: {}, //部门
      isAllowConfirm: false,
      isAllowChange: false,
      isBilledDisable: false,
      // createForm: {
      //   companyName: '',
      //   companyCode: '',
      //   companyId: '',
      //   orgName: '',
      //   orgCode: '',
      //   orgId: '',
      //   erpPoNo: '', //采购合同号
      //   externalPoNo: '', //外部合同号
      //   wvNo: '', //入库单号
      //   unwvNo: '', //退货单号
      //   supplierName: '',
      //   supplierCode: '',
      //   isBilled: '' //完全开票
      // }
    };
  },
  components: {
    componySelect,
    departmentSelect,
    supplierSelect
  },
  props: {
    tipShows: {
      type: Boolean
    },
    createForm: {
      type: Object
    }
  },
  created () {
    //    this.type = this.$route.query.type;
    if (localStorage.getItem("type")) {
      this.type = localStorage.getItem("type");
      if (this.type == 1) {
        this.isBilledDisable = true
      }
    }else{
      this.type=0;
    }
    // this.clearNone();
    if (window.location.href.indexOf("invoiceDetails") > 0) {
      this.isAllowChange = true;
    } else {
      this.clearNone();
    }
    this.searchFun();
  },
  methods: {
    inputShow () {
      this.show = this.$dialogShowOne(this.show);
    },
    //选择数据
    radiochange (e) {
      this.getData = e;
    },
    //是否完全开发票
    handleIsbilled (val) {
      this.createForm.isBilled = val;
    },
    //获取表格数据
    searchFun () {
      this.loading = true;
      if (this.createForm.wvNo) {
        this.createForm.preInvoiceNo = this.createForm.wvNo;
      } else {
        this.createForm.preInvoiceNo = this.createForm.unwvNo;
      }
      if(this.createdDate.length && this.createdDate){
        var createdEndDate=this.createdDate[1];
        var createdStartDate=this.createdDate[0];
      }
      preInvoiceList({
        companyCode: this.createForm.companyCode,
        orgCode: this.createForm.orgCode,
        supplierCode: this.createForm.supplierCode,
        erpPoNo: this.createForm.erpPoNo,
        externalPoNo: this.createForm.externalPoNo,
        preInvoiceNo: this.createForm.preInvoiceNo,
        createdEndDate: createdEndDate,
        createdStartDate:createdStartDate,
        isBilled: this.createForm.isBilled,
        isRedInvoice: this.type,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(res => {
          this.tableData = res.data;
          this.total = res.total;
          this.loading = false;
        })
        .catch(err => { });
    },
    confirm () {
      if (
        this.createForm.companyName == undefined ||
        this.createForm.companyName == ""
      ) {
        this.$openWarning("请选择公司");
      }
      // else if (this.createForm.orgName == undefined) {
      //   this.$openWarning('请选择部门');
      // }
      else if (this.createForm.supplierName == undefined) {
        this.$openWarning("请选择供应商");
      } else {
        let url = window.location.href;
        if (url.indexOf("invoiceDetails") > 0) {
          this.$emit("invoiceSure", [this.createForm, this.selectedList]);
        } else {
          this.$router.push({
            name: "invoiceDetails",
            params: {
              baseInfo: this.createForm,
              invoiceList: this.selectedList
            }
          })
        }
        this.$emit("invoiceSure", [this.createForm, this.selectedList]);
      }
    },
    invoiceCancle () {
      this.$emit("invoiceCancle");
      // this.radio = false;
      // this.getData = ``;
      // this.clearNone();
    },
    handleIsbilledChange (val) {
      // console.log('val :', val);
      this.searchFun()
    },
    handleDataSelect (selection, row) {
      this.selectedList = selection;
      if (selection.length == 1) {
        this.selectedIndex = this.tableData.indexOf(selection[0]);
        this.createForm.companyName = selection[0].companyName;
        this.createForm.companyCode = selection[0].companyCode;
        this.createForm.companyId = selection[0].companyId;
        this.createForm.orgName = selection[0].orgName;
        this.createForm.orgCode = selection[0].orgCode;
        this.createForm.orgId = selection[0].orgId;
        this.createForm.supplierName = selection[0].supplierName;
        this.createForm.supplierCode = selection[0].supplierCode;
        this.createForm.supplierId = selection[0].supplierId;
        this.createForm.rmbCurrencyRate = selection[0].rmbCurrencyRate;
        this.createForm.payAmtTotalRmb = selection[0].payAmtTotalRmb;
        this.createForm.currencyCodeOrigin = selection[0].currencyCodeOrigin;
        this.createForm.currencyCode = selection[0].currencyCode;
        this.createForm.bizPersonName = selection[0].bizPersonName;
        this.createForm.bizPersonCode = selection[0].bizPersonCode;
        this.createForm.baseCurrencyRate = selection[0].baseCurrencyRate;
        this.isAllowConfirm = false;
        // this.$forceUpdate();
      } else {
        let flag = false;
        for (let i = 0; i < selection.length; i++) {
          const el = selection[i];
          for (let j = i + 1; j < selection.length; j++) {
            const ele = selection[j];
            if (
              selection[i].companyCode != selection[j].companyCode ||
              selection[i].orgCode != selection[j].orgCode ||
              selection[i].supplierCode != selection[j].supplierCode
            ) {
              flag = true;
            } else {
              this.createForm.companyName = selection[i].companyName;
              this.createForm.companyCode = selection[i].companyCode;
              this.createForm.companyId = selection[i].companyId;
              this.createForm.orgName = selection[i].orgName;
              this.createForm.orgCode = selection[i].orgCode;
              this.createForm.orgId = selection[i].orgId;
              this.createForm.supplierName = selection[i].supplierName;
              this.createForm.supplierCode = selection[i].supplierCode;
              this.createForm.supplierId = selection[i].supplierId;
              this.createForm.rmbCurrencyRate = selection[i].rmbCurrencyRate;
              this.createForm.payAmtTotalRmb = selection[i].payAmtTotalRmb;
              this.createForm.bizPersonName = selection[i].bizPersonName;
              this.createForm.bizPersonCode = selection[i].bizPersonCode;
              this.createForm.currencyCodeOrigin =
                selection[0].currencyCodeOrigin;
              this.createForm.currencyCode = selection[i].currencyCode;
              this.createForm.baseCurrencyRate = selection[i].baseCurrencyRate;
              this.$forceUpdate();
            }
          }
        }
        if (flag) {
          this.isAllowConfirm = true;
        } else {
          this.isAllowConfirm = false;
        }
      }
    },
    //单行点击
    rowClick (e) {
      // this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      const temp = JSON.parse(JSON.stringify(this.selectedList))
      temp.map(item => {
        if (this.type == 1) {
          if (item.unwvId == e.unwvId) {
            return
          } else {
            this.selectedList.push(e)
          }
        } else if (this.type == 0) {
          if (item.wvId == e.unwvId) {
            return
          } else {
            this.selectedList.push(e)
          }
        }
      })
      this.handleDataSelect(this.selectedList, e)
    },
    handleDataSelectall (selection) {
      this.selectedList = selection;
      let flag = false;
      for (let i = 0; i < selection.length; i++) {
        const el = selection[i];
        for (let j = i + 1; j < selection.length; j++) {
          const ele = selection[j];
          if (
            selection[i].companyCode != selection[j].companyCode ||
            selection[i].orgCode != selection[j].orgCode ||
            selection[i].supplierCode != selection[j].supplierCode
          ) {
            flag = true;
          } else {
            this.createForm.companyName = selection[i].companyName;
            this.createForm.companyCode = selection[i].companyCode;
            this.createForm.companyId = selection[i].companyId;
            this.createForm.orgName = selection[i].orgName;
            this.createForm.orgCode = selection[i].orgCode;
            this.createForm.orgId = selection[i].orgId;
            this.createForm.supplierName = selection[i].supplierName;
            this.createForm.supplierCode = selection[i].supplierCode;
            this.createForm.supplierId = selection[i].supplierId;
            this.createForm.rmbCurrencyRate = selection[i].rmbCurrencyRate;
            this.createForm.payAmtTotalRmb = selection[i].payAmtTotalRmb;
            this.createForm.currencyCodeOrigin = selection[i].currencyCodeOrigin;
            this.createForm.currencyCode = selection[i].currencyCode;
            this.$forceUpdate();
          }
        }
      }
      if (flag) {
        this.isAllowConfirm = true;
      } else {
        this.isAllowConfirm = false;
      }
    },
    handleDataSelectChange (selection) {
      this.selectedList = selection;
    },
    //翻页
    currentChange (e) {
      this.pageNum = e;
      this.isAllowConfirm = false;
      this.clearNone();
      this.searchFun();
    },
    //更改每页条数
    handleSizeChange (e) {
      this.pageSize = e;
      this.isAllowConfirm = false;
      this.clearNone();
      this.searchFun();
    },
    //重置
    clearNone () {
      for (const k in this.createForm) {
        if (this.createForm.hasOwnProperty(k)) {
          if (window.location.href.indexOf('invoiceDetails') > 0) {
            switch (k) {
              case 'companyName':
              case 'companyId':
              case 'companyCode':
              case 'orgName':
              case 'orgId':
              case 'orgCode':
              case 'supplierName':
              case 'supplierId':
              case 'supplierCode':
                break;
              default:
                break;
            }
          } else {
            if (k != 'isBilled') {
              this.createForm[k] = "";
            }
          }
        }
      }
      this.createdDate = [];
    },
    //公司弹窗打开
    componyTip () {
      if (!this.isAllowChange) {
        this.companyShow = true;
      }
    },
    //公司弹窗关闭
    tipsCancle () {
      this.companyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure (e) {
      this.companyShow = false;
      this.companyList = e;
      this.createForm.companyName = e.companyName;
      this.createForm.companyCode = e.companyCode;
      this.createForm.companyId = e.companyId;
      this.createForm.orgName = "";
    },
    //部门弹窗打开
    departmentTip () {
      // if (this.createForm.companyName == ``) {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // } else 
      if (!this.isAllowChange) {
        this.departmentShow = true;
      }
    },
    //部门弹窗关闭
    departmentCancle () {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure (e) {
      this.departmentShow = false;
      this.createForm.orgCode = e.branchCode;
      this.createForm.orgId = e.branchId;
      this.createForm.orgName = e.branchName;
    },
    //供应商弹窗打开
    supplierTip () {
      if (!this.isAllowChange) {
        this.supplierShow = true;
      }
    },
    //供应商弹窗关闭
    supplierCancle () {
      this.supplierShow = false;
    },
    //供应商弹窗确定获取数据
    supplierSure (e) {
      this.supplierShow = false;
      this.createForm.supplierCode = e.supplierCode;
      this.createForm.supplierName = e.supplierName;
    }
  },
  watch: {}
};
</script>
<style lang="scss">
.invoiceAdd {
  .el-select.el-select--mini {
    width: 100px !important;
  }
}
.invoiceAddForm {
  label::after {
    content: "" !important;
  }
}
</style>
<style lang="scss" scoped>
.isrequired::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.isrequired::after {
  content: ":";
}
.el-table label::after {
  content: "";
}
.index .el-button.is-disabled, .index .el-button.is-disabled:focus, .index .el-button.is-disabled:hover{
     color: #fff; 
     background-color: #98a3c7; 
     border-color: #98a3c7;
}
</style>
