<template>
  <div class="tabThird content-div2 contract_css_link">
    <!-- 付款方式 -->
    <div class="input-div input-div-bor bortop0">
      <!-- <div class="table_title">付款方式</div> -->
      <div class="">
        <div class="button-div">
          <el-button
            icon="el-icon-plus"
            class="query-button"
            @click="fkfsaddList"
            >创建</el-button
          >
          <el-button icon="el-icon-minus" @click="setUp">删除</el-button>
        </div>
      </div>
      <div class>
        <el-table
          border
          center
          :data="tableData"
          class="el-table"
          ref="multipleTable"
          @selection-change="handleChange"
          :summary-method="getSummaries"
          show-summary
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- <el-table-column
            label="序号"
            prop="rowno"
            width="55"
            show-overflow-tooltip
          ></el-table-column> -->
          <el-table-column
            label="序号"
            type="index"
            width="55"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="paymentType"
            label="付款类型"
          >
            <template slot-scope="scope">
              <span v-for="(item, index) in sklxList" :key="index">
                <span v-if="item.dict_code == scope.row.paymentType">{{
                  item.dict_value
                }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="paymentWay"
            label="付款方式"
          >
            <template slot-scope="scope">
              <span v-for="(item, index) in skfsList" :key="index">
                <span v-if="item.dict_code == scope.row.paymentWay">{{
                  item.dict_value
                }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="creditType"
            label="信用证类型"
          >
            <template slot-scope="scope">
              <span v-for="(item, index) in xyzlxList" :key="index">
                <span v-if="item.dict_code == scope.row.creditType">{{
                  item.dict_value
                }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="day" label="天数">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="rate" label="*比例%">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="vatAmt"
            label="业务币金额"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="prePaymentDate"
            label="预计付款日期"
            width="170"
          >
            <template slot-scope="scope">
              <div>
                {{ $timeFun(scope.row.prePaymentDate, true) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="remark" label="备注">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 付款方式 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cmange from "@/api/contractMange/cmange";
import CAmange from "@/api/contractMange/cAmange";
import Count from "@/assets/js/calculation";
export default {
  name: "tabThird",
  data() {
    return {
      tableData: [], //通讯表格
      selectioned: [], //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      sklxList: [],
      skfsList: [],
      xyzlxList: [],
      loading: true, //表格loading
      matterList: [], //基础信息物料表格
      rateTol: ``, //总比例
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      show: true
    };
  },
  created() {
    this.sklx();
    this.skfs();
    this.xyzlx();
    //获取信息
    if (this.$route.query.isChange) {
      this.getDetailHis();
    } else {
      this.getDetail();
    }
  },
  mounted() {
    this.$root.Bus.$on("orgList", e => {
      let a = JSON.stringify(e);
      this.orgList = JSON.parse(a);
      if (!e.length) this.changeOrg();
    });
    this.$root.Bus.$on("matterList", e => {
      this.matterList = e;
      this.tableData.forEach((item, index) => {
        this.vatAmtCh(item, index);
        this.vatAmt(item, index);
      });
    });
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    getDetail() {
      //拆分式不调用
      if (this.$route.query.children) return false;
      let params = {
        poId: this.$route.query.id,
        pageSize: 999
      };
      Cmange.getSk(params)
        .then(res => {
          for (const item of res.data) {
            item.paymentType = item.paymentType && item.paymentType.toString();
            item.paymentWay = item.paymentWay && item.paymentWay.toString();
            item.creditType = item.creditType && item.creditType.toString();
          }
          this.tableData = res.data;
        })
        .catch();
    },
    getDetailHis() {
      //拆分式不调用
      if (this.$route.query.children) return false;
      let params = {
        poId: this.$route.query.id,
        pageSize: 999
      };
      CAmange.getSk(params)
        .then(res => {
          for (const item of res.data) {
            item.paymentType = item.paymentType && item.paymentType.toString();
            item.paymentWay = item.paymentWay && item.paymentWay.toString();
            item.creditType = item.creditType && item.creditType.toString();
          }
          this.tableData = res.data;
        })
        .catch();
    },
    to() {
      this.rateTol = 0;
      for (const item of this.tableData) {
        if (!item.paymentType) {
          this.$openWarning(`付款类型`);
          return false;
        }
        if (!item.paymentWay) {
          this.$openWarning(`付款方式`);
          return false;
        }
        this.rateTol = Count.accAdd(this.rateTol, item.rate);
      }
      if (this.rateTol != 100) {
        this.$openWarning(`总比例需保持100%`);
        return false;
      }
      let data = this.tableData;
      if (this.$route.query.id) {
        for (let item of this.tableData) {
          item.poId = this.$route.query.id;
        }
      }
      this.$emit("get", data, 2);
    },
    //获取付款类型
    sklx() {
      Cmange.fklx()
        .then(res => {
          this.sklxList = res.data;
        })
        .catch();
    },
    //获取付款方式
    skfs() {
      Cmange.fkfs()
        .then(res => {
          this.skfsList = res.data;
        })
        .catch();
    },
    //信用证类型方式
    xyzlx() {
      Cmange.xyzlx()
        .then(res => {
          this.xyzlxList = res.data;
        })
        .catch();
    },
    //含税金额变动
    vatAmtCh(e, index) {
      let row = e;
      //比例
      row.rate = this.$rate(row.vatAmt, this.matterList);
      this.$set(this.tableData, index, row);
    },
    //比例输入 推金额
    vatAmt(e, index) {
      let row = e;
      row.vatAmt = this.$vatAmt(row.rate, this.matterList);
      this.$set(this.tableData, index, row);
    },
    //删除
    setUp() {
      if (!this.selectioned.length) {
        this.$openWarning("未选择数据");
        return false;
      }
      this.$confirm("确定删除吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let idSav = []; //修改数据
          let idNo = []; //新建数据
          for (const item of this.selectioned) {
            if (item.paymentId) {
              idSav.push(item.paymentId);
            } else {
              idNo.push(item);
            }
          }
          let params = {
            paymentIdList: idSav.join(",")
          };
          if (this.$route.query.isChange) {
            idSav.length &&
              CAmange.delSK(params)
                .then(res => {
                  this.$openSuccess(res.message);
                })
                .catch();
          } else {
            idSav.length &&
              Cmange.delSK(params)
                .then(res => {
                  this.$openSuccess(res.message);
                })
                .catch();
          }
          this.deleIndex(this.selectioned, this.tableData);
        })
        .catch();
    },
    //删除方法
    deleIndex(e, list) {
      for (const get of e) {
        let del = list.findIndex(item => {
          return item.one == get.one && item.paymentId == get.paymentId;
        });
        list.splice(del, 1);
      }
    },
    //付款方式表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    ///付款方式创建数据
    fkfsaddList() {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        rowno: (this.tableData.length + 1) * 10,
        paymentWay: ``, //付款方式
        paymentType: ``, //付款类型
        creditType: ``, //信用证类型
        day: ``, //
        rate: ``, //
        vatAmt: ``, //含税金额
        prePaymentDate: ``, //预付款日期
        remark: ``
      };
      let newTbale = [];
      newTbale.unshift(data);
      this.tableData = newTbale.concat(this.tableData);
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (index === 6 || index === 7) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                // return prev + curr;
                let res = Count.accAdd(prev, curr); //parseFloat(prev + curr);
                return res;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = "N/A";
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
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
  }
};
</script>

<style lang="scss">
</style>
