<template>
<!-- 选择销售合同信息 -->
  <div class="ycdxPop" v-if="tipShow">
    <el-dialog :visible.sync="tipShow" title="选择销售合同信息" :show-close=false :before-close="tipsCancle" width="1230px" class="popup_box">
      <div class="">
				<!-- 搜索 -->
        <el-col class="el-col el-col-btn">
          <div class="button-div">
            <el-button icon="el-icon-search" class="query-button"  @click="queryData">查询</el-button>
            <el-button icon="el-icon-refresh" @click="clearNone">重置</el-button>
          </div>
        </el-col>
        <div class="index-div3 index-div4">
          <p class="hide-input" v-if="show" @click="inputShow()">更多条件 <i class="el-icon-caret-bottom"></i></p>
          <p class="hide-input" v-else @click="inputShow()">收起<i class="el-icon-caret-top"></i></p>
          <div class="dialog-search-div">
            <el-col :span="5" class="el-col">
              <label>公司</label>
              <el-input v-model="companyName.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
            <span class='comicon' @click="componyTip"><i class="el-icon-search" ></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>部门</label>
              <el-input v-model="branchName.branchName" class="el-inputs" placeholder="请选择" disabled></el-input>
            <span class='comicon' @click="departmentTip"><i class="el-icon-search" ></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>客户</label>
              <el-input
                v-model="custName.customerName"
                class="el-inputs"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="customerTip">
                <i class="el-icon-search"></i>
              </span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>外部合同号</label>
              <el-input
                v-model="extCode"
                class="el-inputs"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>销售合同号</label><el-input v-model="soContractNo" class="el-inputs" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>生效日期开始</label>
              <el-date-picker
                v-model="contractBeginDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>生效日期结束</label>
              <el-date-picker
                v-model="contractEndDate"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerClose"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>业务员</label>
              <el-input v-model="staffName.empName" class="el-inputs" placeholder="请选择" disabled></el-input>
            <span class='comicon' @click="staffTip"><i class="el-icon-search" ></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>项目号</label>
              <el-input v-model="projectName.projectCode" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class='comicon' @click="projectTip"><i class="el-icon-search" ></i></span>
            </el-col>
          </div>
        </div>
        <!-- 穿梭框 -->
        <div class="flex_center">
          <div class="flex_table">
            <div class="table_div">
              <el-table border center :data="tableData" class="el-table" ref="multipleTable"
              v-loading="loading" height="140" style="width:100%">
                <el-table-column width="55" label="">
                <template scope="scope">
                    <el-radio v-model="radio" :label="scope.$index" @change="radiochange(scope.row)">
                        &nbsp;
                    </el-radio>
                </template>
              </el-table-column>
                <el-table-column prop="soContractNo" label="销售合同号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="extCode" label="外部合同号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="custName" label="客户名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="contractStatus" label="状态" show-overflow-tooltip>
                  <template scope="scope">
                    <span v-for="(item, index) in status" :key="index">
                      <span v-if="item.dict_code == scope.row.contractStatus">{{item.dict_value}}</span>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="contractBeginDate" label="签订日期" show-overflow-tooltip>
                  <template scope="scope">
                    {{$timeFun(scope.row.contractEndDate, 1)}}
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 物料表格 -->
            <div class="table_div">
              <el-table border center :data="tableWl" class="el-table" ref="multipleTable"
              v-loading="loadingWl" height="140" style="width:100%" @selection-change="handleChange">
                <el-table-column fixed type="selection" width="50">
                </el-table-column>
                <el-table-column prop="soRowno" label="行号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="goodsCode" label="物料编号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="goodsName" label="物料名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="goodsCat" label="物料大类" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="goodsSpec" label="物料规格" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="itemQty" label="订单数量" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="originAmt" label="业务币含税金额" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="taxRate" label="增值税率" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 点击选项框 -->
          <div class="flex_span">
            <p class="el-icon-arrow-right icon" @click="left"></p>
            <p class="el-icon-arrow-left icon" @click="right"></p>
          </div>
          <!-- 点击选项框 -->
          <div class="flex_table">
            <div class="input-div">
              <el-col :span="13" class="el-col">
                <label>转换比率:</label>
                <el-input v-model="rate" @input="change" class="el-inputs" placeholder="请输入"></el-input>
              </el-col>
              <!-- <el-col class="el-col el-col-btn">
                <div class="button-div2">
                  <el-button icon="el-icon-check" class="query-button" @click="queryData">确认</el-button>
                  <el-button icon="el-icon-close" @click="clearNone">取消</el-button>
                </div>
              </el-col> -->
              <el-table border center :data="tableXs" class="el-table" ref="multipleTable"
              v-loading="loadingXs" height="300" style="width:100%" @selection-change="handleXs">
                <el-table-column fixed type="selection" width="50">
                </el-table-column>
                <!-- <el-table-column prop="soContractNo" label="销售合同号" show-overflow-tooltip>
                </el-table-column> -->
                <el-table-column prop="soRowno" label="行号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="goodsCode" label="物料号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="goodsName" label="物料名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="goodsCat" label="物料大类" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="goodsSpec" label="物料规格" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="itemQty" label="订单数量" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="originAmt" label="业务币含税金额" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="taxRate" label="增值税率" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <!-- 穿梭框 -->
        <!-- <el-divider></el-divider>
          <div class="el-table-div">
            <el-pagination
              @size-change="handleSizeChange" @current-change="currentChange"
                :current-page="pageNum" :page-sizes="[100, 200, 300,500]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div> -->
			</div>
      <slot></slot>
  		<div slot="footer" class="button-div2">
		    <el-button icon="el-icon-check" type="primary" @click="ycdxSure()">确 定</el-button>
		    <el-button icon="el-icon-close" @click="ycdxCancle()">取 消</el-button>
  		</div>
    </el-dialog>
    <!-- 选择公司弹窗 -->
    <compony-select v-if="componyShow" :tipShow='componyShow' @tipsCancle="tipsCancle" @tipsSure="tipsSure">
    </compony-select>
    <!-- 选择部门弹窗 -->
    <department-select v-if="departmentShow" :tipShow='departmentShow' :data='companyName' @departmentCancle="departmentCancle" @departmentSure="departmentSure">
    </department-select>
    <!-- 选择员工弹窗 -->
    <staff-select v-if="staffShow" :tipShow='staffShow' :data='branchName' @staffCancle="staffCancle" @staffSure="staffSure">
    </staff-select>
    <!-- 选择项目弹窗 -->
    <project-select v-if="projectShow" :tipShow='projectShow' @projectCancle="projectCancle" @projectSure="projectSure">
    </project-select>
    <!-- 选择客户弹窗 -->
    <customer-select
      v-if="customerShow"
      :tipShow="customerShow"
      @customerCancle="customerCancle"
      @customerSure="customerSure"
    ></customer-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import projectSelect from "@/components/projectSelect.vue";
import customerSelect from "@/components/customerSelect.vue";

import Cmange from "@/api/contractMange/cmange";
import Count from "@/assets/js/calculation";
export default {
  name: "ycdxPop",
  data() {
    return {
      componyShow: false, //银行弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      projectShow: false, //项目弹窗
      supplierShow: false, //供应商弹窗
      customerShow: false, //客户弹窗
      companyName: ``, //公司
      branchName: ``, //部门
      staffName: ``, //员工
      custName: {}, //客户
      projectName: ``, //项目
      supplierName: ``, //供应商
      extCode: ``, //外部合同号
      tableData: [], //销售表格
      tableWl: [], //物料表格
      tableXs: [], //销售表格
      tablist: [], //拷贝
      tableAssign: "", //表格深拷贝数据
      selectioned: [], //物料表格选中项
      selectXs: [], //销售表格选中项
      index: null, //选中index
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      contractBeginDate: ``, //协议生效日
      contractEndDate: ``, //协议到期日
      soContractNo: ``, //销售合同号
      status: [], //合同状态
      rate: ``, //转换比率 一断臂
      radio: false, //单选状态
      getData: ``, //单选数据
      arr: [], //所有单选数据
      pickerClose: {}, //日期禁止项
      loading: true, //销售表格loading
      loadingWl: false, //物料表格loading
      loadingXs: false, //销售表格loading
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true
    };
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    projectSelect,
    customerSelect
  },
  props: {
    tipShow: {
      type: Boolean
    }
  },
  created() {
    this.htzt();
    //获取表格
    this.conList();
  },
  mounted() {
    let that = this;
    if (that.contractBeginDate !== "") {
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() > that.contractBeginDate;
        }
      };
    }
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    inputShow() {
      this.show = this.$dialogShowOne(this.show);
    },
    //物料转销售
    left() {
      this.arr.push(this.getData);
      let list = []; //向右添加数据
      if (this.tableWl.length == 0) {
        this.$openWarning(`请选择物料数据`);
        return false;
      }
      this.loadingXs = true;
      this.rate = this.rate || 100;
      let rate = Count.accDiv(this.rate, 100); //转换比率
      let wl = JSON.parse(JSON.stringify(this.selectioned));
      //获取转移数据
      if (this.tableXs.length != 0) {
        list = this.selectioned.filter(dataXs => {
          let get = this.tableXs.some(dataWl => {
            return dataWl.soContractDetailId == dataXs.soContractDetailId;
          });
          return !get;
        });
      } else {
        list = wl;
      }
      this.tablist = [...this.tablist, ...JSON.parse(JSON.stringify(list))];
      //数据转移
      for (const item of list) {
        item.originTaxAmt = Count.accMul(item.originTaxAmt, rate);
        item.originAmt = Count.accMul(item.originAmt, rate);
      }
      //左侧数据删除
      this.deleIndex(this.selectioned, this.tableWl);
      this.tableXs = [...this.tableXs, ...list];
      this.loadingXs = false;
    },
    //转换比例变化
    change(e) {
      let tablist = JSON.parse(JSON.stringify(this.tablist));
      let rate = Count.accDiv(e, 100); //转换比率
      for (const item of tablist) {
        item.originTaxAmt = Count.accMul(item.originTaxAmt, rate);
        item.originAmt = Count.accMul(item.originAmt, rate);
      }
      this.tableXs = tablist;
      this.$forceUpdate();
    },
    //销售转物料
    right() {
      this.deleIndex(this.selectXs, this.tableXs);
      this.deleIndex(this.selectXs, this.tablist);
      for (const item of this.selectXs) {
        if (item.soContractNo == this.getData.soContractNo) {
          this.radiochange(item);
        }
      }
    },
    //删除方法
    deleIndex(e, list) {
      for (const get of e) {
        let del = list.findIndex(item => {
          return item.soContractDetailId == get.soContractDetailId;
        });
        list.splice(del, 1);
      }
    },
    //获取合同状态
    htzt() {
      Cmange.htzt()
        .then(res => {
          this.status = res.data;
        })
        .catch();
    },
    //选择销售合同数据
    radiochange(e) {
      this.getData = e;
      let params = {
        soContractId: e.soContractId,
        pageSize: 999
      };
      //获取物料明细
      this.loadingWl = true;
      Cmange.getCwl(params)
        .then(res => {
          if (this.tableXs.length != 0) {
            let list = [];
            let data = res.data;
            for (const dataWl of data) {
              for (const dataXs of this.tableXs) {
                if (dataWl.soContractDetailId == dataXs.soContractDetailId) {
                  dataWl.extCode = e.extCode;
                  list.push(dataWl);
                }
              }
            }
            this.deleIndex(list, data);
            for (const item of data) {
              item.extCode = e.extCode;
            }
            this.tableWl = data;
          } else {
            for (const item of res.data) {
              item.extCode = e.extCode;
            }
            this.tableWl = res.data;
          }
          this.loadingWl = false;
        })
        .catch(() => {
          this.loadingWl = false;
        });
    },
    //关闭
    ycdxCancle() {
      this.$emit("ycdxCancle");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    ycdxSure() {
      let list = [];
      for (const aaa of this.tableXs) {
        for (const bbb of this.arr) {
          if (aaa.soContractId == bbb.soContractId) {
            list.push(bbb);
          }
        }
      }
      let obj = {};
      let peon = list.reduce((cur, next) => {
        obj[next.soContractId]
          ? ""
          : (obj[next.soContractId] = true && cur.push(next));
        return cur;
      }, []);
      this.$emit("ycdxSure", peon, this.tableXs);
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //获取表格
    conList() {
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        companyCode: this.companyName.companyCode,
        companyName: this.companyName.companyName,
        orgCode: this.branchName.branchCode,
        orgName: this.branchName.branchName,
        bizPersonCode: this.staffName.empCode,
        bizPersonName: this.staffName.empName,
        custId: this.custName.customerId, //客户id
        custName: this.custName.customerName, //客户名称
        custCode: this.custName.customerCode, //客户编码
        soContractNo: this.soContractNo,
        projectCode: this.projectName.projectCode,
        projectName: this.projectName.projectName,
        contractBeginDate: this.contractBeginDate,
        contractEndDate: this.contractEndDate,
        extCode: this.extCode,
        contractStatus: `10130015`
      };
      Object.keys(params).forEach(key => {
        if (params[key] == `` || params[key] == `undefined`) {
          delete params[key];
        }
      });
      Cmange.getClist(params)
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
      this.companyName = {};
      this.branchName = {};
      this.staffName = {};
      this.soContractNo = ``;
      this.custName = {};
      this.projectName = {};
      this.contractBeginDate = ``;
      this.contractEndDate = ``;
      this.extCode = ``;
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.conList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.conList();
    },
    //物料表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    //销售表格选择
    handleXs(e) {
      this.selectXs = e;
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
      this.branchName = ``;
      this.staffName = ``;
    },
    //部门弹窗打开
    departmentTip() {
      // if (this.companyName == ``) {
      //   this.$openWarning(`请先选择公司`);
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
      this.staffName = ``;
    },
    //部门弹窗打开
    manTip() {
      this.manShow = true;
    },
    //部门弹窗关闭
    manCancle() {
      this.manShow = false;
    },
    //部门弹窗确定获取数据
    manSure(e) {
      this.manShow = false;
      this.manName = e;
    },
    //员工弹窗打开
    staffTip() {
      if (this.companyName == `` || this.branchName == ``) {
        this.$openWarning("请先选择公司和部门");
        return false;
      }
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
    },
    //项目弹窗打开
    projectTip() {
      this.projectShow = true;
    },
    //项目弹窗关闭
    projectCancle() {
      this.projectShow = false;
    },
    //项目弹窗确定获取数据
    projectSure(e) {
      this.projectShow = false;
      this.projectName = e;
    },
    //客户弹窗打开
    customerTip() {
      this.customerShow = true;
    },
    //客户弹窗关闭
    customerCancle() {
      this.customerShow = false;
    },
    //客户弹窗确定获取数据
    customerSure(e) {
      this.customerShow = false;
      this.custName = e;
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
    },
    contractBeginDate(val) {
      let that = this;
      if (val > that.contractEndDate) {
        that.contractEndDate = "";
      }
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() < that.contractBeginDate;
        }
      };
    }
  }
};
</script>

<style lang="scss">
.ycdxPop {
  margin-left: 19px;
  width: 97%;
  .el_flex {
    display: flex;
    align-items: center;
  }

  .el-date-editor.el-input {
    width: auto;
  }
  .input-div .el-col:nth-child(4n + 1) {
    margin-left: 10px;
  }
  .flex_center {
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .flex_table {
    width: 46%;
    float: left;
  }
  .table_div {
    /* height: 250px; */
    /* overflow: hidden; */
    /* overflow-y: auto; */
    &:last-child {
      margin-top: 25px;
    }
  }
  .flex_span {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 8%;
    height: 300px;
    float: left;
    .icon {
      font-size: 30px;
      border: 1px solid #000;
      padding: 20px 0;
      cursor: pointer;
    }
  }
  .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  .el-select__caret {
    line-height: normal;
  }
  label {
    position: relative;
  }
  .el-input__icon.el-icon-date {
    line-height: 25px;
  }
}
</style>
