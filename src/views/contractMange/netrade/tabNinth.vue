<template>
  <div class="tabNinth content-div2 contract_css_link">
    <div class="input-div input-div-bor bortop0">
      <el-tabs class="el-tabs" v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="盈亏测算" name="first" :style="navColor"></el-tab-pane>
        <el-tab-pane label="销售商品" name="second"></el-tab-pane>
      </el-tabs>
      <div v-show="activeName2 == 'first'">
        <!-- 盈亏测算 -->
        <ean-list  :companyName= 'companyName' :rcTable='rcTable' ref='ean' @getData='getData'></ean-list>
      </div>
      <!-- 盈亏测算 -->
      <div v-show="activeName2 == 'second'">
        <!-- <div class="table_title">采购商品详情</div> -->
        <div class="flex_center">
        <div class="button-div">
          <el-button icon="el-icon-plus" class="query-button" @click="addList">创建</el-button>
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
            <!-- <el-table-column show-overflow-tooltip prop="supplierName" label="供应商">
            </el-table-column> -->
            <el-table-column show-overflow-tooltip prop="soContractNo" label="销售合同号">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="extCode" label="外部合同号">
            </el-table-column>
            <!-- <el-table-column show-overflow-tooltip prop="wvNo" label="采购入库单号">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="wvRowno" label="采购入库单行号">
            </el-table-column> -->
            <el-table-column show-overflow-tooltip prop="goodsCode" label="物料编号">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="goodsName" label="物料名称">
            </el-table-column>
            <!-- <el-table-column show-overflow-tooltip prop="goodsCat" label="物料大类">
            </el-table-column> -->
            <el-table-column show-overflow-tooltip prop="goodsSpec" label="物料规格">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="itemUnitName" label="基础单位">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="itemQty" label="数量">
            </el-table-column>
            <!-- <el-table-column show-overflow-tooltip prop="secUnitName" label="第二单位">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="secQty" label="第二数量">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="currencyCode" label="币种">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="currencyRate" label="汇率">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="originPrice" label="单价">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="originAmt" label="金额">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="taxRate" label="进口增值税率%">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="taxAmt" label="进口增值税额">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="gwCode" label="海关编码">
              <template slot-scope="scope">
                <el-input v-model="scope.row.gwCode" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="" label="关税计征方式" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>
                  <el-select v-model="scope.row.gwCalcType" placeholder="请选择">
                    <el-option
                      v-for="item in gwList"
                      :key="item.dict_code"
                      :label="item.dict_value"
                      :value="item.dict_key"
                    ></el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="gwPrice" label="关税单价">
              <template slot-scope="scope">
                <el-input v-model="scope.row.gwPrice" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column> -->
            <!-- <el-table-column show-overflow-tooltip prop="gwAmt" label="关税金额">
              <template slot-scope="scope">
                <el-input v-model="scope.row.gwAmt" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column> -->
            <el-table-column show-overflow-tooltip prop="originPrice" label="含税售价">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="remark" label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 选择合同弹窗 -->
    <contract-select
      v-if="contractShow"
      :tipShow="contractShow"
      @contractClose="contractClose"
      @contractTrue="contractTrue"
    ></contract-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import contractSelect from "@/components/contractSale.vue";
import eanList from "@/views/contractMange/CgBEanalyzeCopy";
import Cmange from "@/api/contractMange/cmange";
import Count from "@/assets/js/calculation";
import "@/assets/css/contract.scss";
export default {
  name: "tabNinth",
  data() {
    return {
      contractShow: false, //销售合同显示
      activeName2: "first", //标签页
      tableYk: [], //盈亏测算表格
      col: [], //盈亏测算列
      row: [], //盈亏测算行
      companyName: {}, //公司数据
      coin: ``, //业务币
      rcTable: `od_po_simulate`,
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
      show: true,
      quChange: false ,//是否为变更合同,
      tempTableData:[],
      // $root.Bus: this.$BusFactory(this)
    };
  },
  created() {
    if (this.$route.query.change) {
      this.quChange = true;
    }
    // this.gwzs();
    this.$route.query.id && this.getDetail();
  },
  mounted() {
    
    this.$root.Bus.$on("companyNine", e => {
      this.companyName = e;
    });
    //以销定采的关联合同
    let list = this.$store.state.route.params.eight || [];
    let obj = {};
    let peon = list.reduce((cur, next) => {
      obj[next.soContractId]
        ? ""
        : (obj[next.soContractId] = true && cur.push(next));
      return cur;
    }, []);
    for (const item of peon) {
      this.contractTrue(item);
    }
  },
  methods: {
    //获取信息
    getDetail() {
      let params = {
        poId: this.$route.query.id,
        pageSize: 999
      };
      Cmange.getykWl(params)
        .then(res => {
          this.tableData = res.data;
        })
        .catch();
    },
    to() {
      this.tableData.concat(this.tempTableData);
      this.$refs.ean.postData();
    },
    getData(e) {
      let data = {
        odPoSimulateList: e,
        poContractProfileSimulateDetailList: this.tableData
      };
      if (this.$route.query.id) {
        for (const item of this.tableData) {
          item.poId = this.$route.query.id;
        }
      }
      this.$emit("get", data, 6);
    },
    gwzs() {
      Cmange.hgzs()
        .then(res => {
          this.gwList = res.data;
        })
        .catch();
    },
    handleClick() {},
    //弹窗打开
    addList() {
      this.contractShow = true;
    },
    //弹窗关闭
    contractClose() {
      this.contractShow = false;
    },
    //弹窗确定获取数据
    contractTrue(e) {
      let params = {
        soContractId: e.soContractId,
        pageSize: 999
      };
      //获取物料明细
      Cmange.getCwl(params)
        .then(res => {
          for (const item of res.data) {
            let one = `${new Date().valueOf() + "s" + Math.random()}`;
            let obj = { ...item, ...e };
            obj.version = item.version;
            obj.contractDetailId = ``;
            obj.taxAmt = item.originTaxAmt;
            if (!obj.one) {
              obj.one = one;
            }
            this.tableData.push(obj);
          }
          if (this.tableData.length) {
            // this.$root.Bus.$emit("coin", this.tableData[0].originCurrencyCode);
          }
        })
        .catch();
      this.contractShow = false;
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
          if(this.$route.query.change){
            this.selectioned.map((item, index) => {
              this.tableData.splice(this.tableData.indexOf(item), 1);
              item.isInactive = 2;
            });
            this.tempTableData.concat(this.selectioned);
            this.$openSuccess("删除成功，变更后生效");
          }else{
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
              contractDetailIdList: idSav.join(","),
              poId: this.$store.state.contraDelData.cgCon.poId,
              version: this.$store.state.contraDelData.cgCon.version
            };
            idSav.length &&
              Cmange.delykWl(params)
                .then(res => {
                  this.$openSuccess(res.message);
                })
                .catch();
            this.deleIndex(this.selectioned, this.tableData);
          }
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
 
  watch: {
   
    tableData: {
      handler() {
        let vat = 0; //销售收入（含税）
        let originTaxAmt = 0; //销项增值税
        for (const item of this.tableData) {
          vat = Count.accAdd(vat, item.originAmt); //销售 业务币含税金额汇总
          originTaxAmt = Count.accAdd(originTaxAmt, item.taxAmt); //销售 业务币增值税额汇总
        }
        //销售收入（含税）
        this.$root.Bus.$emit(`contractAmtVat`, { a: vat, b: `内贸` });
        //销项增值税
        this.$root.Bus.$emit(`originTaxAmt`, { a: originTaxAmt, b: `内贸` });
      },
      deep: true
    }
  },
  components: {
    eanList,
    contractSelect
  }
};
</script>

<style lang="scss">
</style>
