<template>
  <div class="tabNinth content-div2 contract_css_link">
    <div class="input-div input-div-bor bortop0">
      <el-tabs
        class="el-tabs"
        v-model="activeName2"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="盈亏测算"
          name="first"
          :style="navColor"
        ></el-tab-pane>
        <el-tab-pane label="采购商品" name="second"></el-tab-pane>
      </el-tabs>
      <div v-show="activeName2 == 'first'">
        <!-- 盈亏测算 -->
        <ean-list
          :companyName="companyName"
          :coin="coin"
          :rcTable="rcTable"
          ref="ean"
          @getData="getData"
        ></ean-list>
      </div>
      <!-- 盈亏测算 -->
      <div v-show="activeName2 == 'second'">
        <!-- <div class="table_title">采购商品详情</div> -->
        <div class="flex_center">
          <div class="button-div">
            <el-button icon="el-icon-plus" class="query-button" @click="addList"
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
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- <el-table-column prop="soRowno" label="序号"></el-table-column> -->
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="supplierName"
              label="供应商"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="poNo"
              label="采购合同号"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="poRowno"
              label="采购合同行号"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="wvNo"
              label="采购入库单号"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="wvRowno"
              label="采购入库单行号"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="goodsCode"
              label="物料编号"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="goodsName"
              label="物料名称"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="goodsCat"
              label="物料大类"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="goodsSpec"
              label="物料规格"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="itemUnitName"
              label="基础单位"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="itemQty"
              label="数量"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="secUnitName"
              label="第二单位"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="secQty"
              label="第二数量"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="currencyCode"
              label="币种"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="currencyRate"
              label="汇率"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="originPrice"
              label="单价"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="originAmt"
              label="金额"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="taxRate"
              label="进口增值税率%"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="taxAmt"
              label="进口增值税额"
            >
            </el-table-column>
            <!-- <el-table-column
              width="150"
              show-overflow-tooltip
              prop="gwCode"
              label="海关编码"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.gwCode" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              label="关税计征方式"
              width="150"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-for="item in gwList" :key="item.dict_code">
                  <span v-if="item.dict_code == scope.row.gwCalcType">{{
                    item.dict_value
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="gwPrice"
              label="关税单价"
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="gwAmt"
              label="关税金额"
            >
            </el-table-column> -->
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="remark"
              label="备注"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 选择合同弹窗 -->
    <cg-select
      v-if="cgShow"
      :tipShow="cgShow"
      @cgCancle="cgCancle"
      @cgSure="cgSure"
    ></cg-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import cgSelect from "@/components/cgSelect.vue";
import eanList from "@/views/contractMange/BEanalyze";
import Bmange from "@/api/contractMange/bmange";
import BAmange from "@/api/contractMange/bAmange";
import Count from "@/assets/js/calculation";
import "@/assets/css/contract.scss";
export default {
  name: "tabNinth",
  data() {
    return {
      cgShow: false, //采购合同显示
      activeName2: "first", //标签页
      tableYk: [], //盈亏测算表格
      col: [], //盈亏测算列
      row: [], //盈亏测算行
      companyName: {}, //公司数据
      coin: {}, //业务币
      rcTable: `od_so_simulate`,
      //
      tableData: [], //通讯表格
      selectioned: [], //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      gwList: [], //关税征集列表
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      loading: true, //表格loading
      widthRow: `grid-template-columns:repeat(8,12.5%);flex:8;`, //盈亏测算样式
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
    this.gwzs();
    if (this.$route.query.isChange) {
      this.getDetailHis();
    } else {
      this.getDetail();
    }
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
    this.$root.Bus.$on("companyNine", e => {
      this.companyName = e;
    });
    this.$root.Bus.$on("coin", e => {
      this.coin = e;
    });
  },
  methods: {
    //获取信息
    getDetail() {
      let params = {
        soContractId: this.$route.query.id,
        pageSize: 999
      };
      Bmange.getykWl(params)
        .then(res => {
          this.tableData = res.data;
        })
        .catch();
    },
    getDetailHis() {
      let params = {
        soContractId: this.$route.query.id,
        pageSize: 999
      };
      BAmange.getykWl(params)
        .then(res => {
          this.tableData = res.data;
        })
        .catch();
    },
    to() {
      this.$refs.ean.postData();
    },
    getData(e) {
      let data = {
        odSoSimulateList: e,
        soContractProfileSimulateDetailList: this.tableData
      };
      if (this.$route.query.id) {
        for (const item of this.tableData) {
          item.soContractId = this.$route.query.id;
        }
      }
      this.$emit("get", data, 6);
    },
    //汇率查询
    // pariList(e, list) {
    //   let params = {
    //     formCurrencyId: this.bwbData.functionalCurrencyId,
    //     toCurrencyId: e
    //   };
    //   Bmange.pariList(params)
    //     .then(res => {
    //       if (res.data.length >= 1) {
    //         list.cellValue = res.data.parities;
    //       } else {
    //         list.cellValue = 1;
    //       }
    //     })
    //     .catch();
    // },
    gwzs() {
      Bmange.hgzs()
        .then(res => {
          this.gwList = res.data;
        })
        .catch();
    },
    handleClick() {},
    //弹窗打开
    addList() {
      this.cgShow = true;
    },
    //弹窗关闭
    cgCancle() {
      this.cgShow = false;
    },
    //弹窗确定获取数据
    cgSure(e) {
      let params = {
        poNo: e.poNo
      };
      //获取物料明细
      Bmange.getCwl(params)
        .then(res => {
          for (const item of res.data) {
            let obj = {};
            obj = { ...item, ...e };
            obj.version = item.version;
            obj.contractDetailId = ``;
            this.tableData.push(obj);
          }
        })
        .catch();
      this.cgShow = false;
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
            if (item.contractDetailId) {
              idSav.push(item.contractDetailId);
            } else {
              idNo.push(item);
            }
          }
          let params = {
            contractDetailIdList: idSav.join(",")
          };
          idSav.length &&
            Bmange.delykWl(params)
              .then(res => {
                this.$openSuccess(res.message);
              })
              .catch();
          this.deleIndex(this.selectioned, this.tableData);
        })
        .catch();
    },
    //删除方法
    deleIndex(e, list) {
      for (const get of e) {
        let del = list.findIndex(item => {
          return (
            item.one == get.one && item.contractDetailId == get.contractDetailId
          );
        });
        list.splice(del, 1);
      }
    },
    //表格选择
    handleChange(e) {
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
    },
    tableData: {
      handler() {
        let rol = 0;
        let vat = 0;
        for (const item of this.tableData) {
          rol = Count.accAdd(rol, item.taxAmt);
          vat = Count.accAdd(vat, item.contractAmtVat);
        }
        //税额
        this.$root.Bus.$emit(`taxAmt`, rol);
        //采购货价（含税）
        this.$root.Bus.$emit(`vat`, vat);
      },
      deep: true
    }
  },
  components: {
    eanList,
    cgSelect
  }
};
</script>

<style lang="scss">
</style>
