<template>
  <!-- 采购创建 -->
  <div class="warehousingAddRow" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      :title="type == 3 ? '提单信息' : '采购合同信息'"
      :show-close="false"
      width="1100px"
      :close-on-click-modal="false"
      class="popup_box"
    >
      <el-divider></el-divider>
      <div class="el-table-div">
        <el-table
          border
          center
          :data="tableData"
          class="el-table"
          ref="multipleTable"
          @select="handleDataSelect"
          @row-click="rowClick"
          v-loading="loading"
        >
          <!-- <el-table-column width="55"
                           label="">
            <template scope="scope">
              <el-radio :label="scope.$index"
                        v-model="radio"
                        @change="radiochange(scope.row)">
                &nbsp;
              </el-radio>
            </template>
          </el-table-column> -->
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="poNo"
            width="120"
            v-if="type != 3"
            label="采购合同号"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="poRowno"
            width="120"
            :label="type == 3 ? '合同行号' : '采购合同行号'"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="extPoNo"
            v-if="type != 3"
            width="100"
            label="外部合同号"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="extPoNo"
            v-if="type != 3"
            width="100"
            label="提单号"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="blRowno"
            v-if="type == 3"
            width="100"
            label="提单行号"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="goodsCode"
            width="100"
            label="物料编号"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="goodsName"
            width="100"
            label="物料名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="goodsCategoryName"
            width="100"
            label="物料大类"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="goodsSpec"
            width="100"
            label="物料规格"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="itemUnitName"
            width="100"
            label="基础单位"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="itemQty"
            width="100"
            label="到货数量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="secUnitName"
            width="100"
            label="第二单位"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="secQty"
            width="100"
            label="第二数量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            width="100"
            label="备注"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>
      <slot></slot>
      <div class="button-div2">
        <el-button
          type="primary"
          @click="warehousingAddRowSure()"
          icon="el-icon-check"
          >确认</el-button
        >
        <el-button @click="warehousingAddRowCancle()" icon="el-icon-close"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import api from "@/api/ladingBill/ladingBill";
export default {
  name: "warehousingAddRow",
  data() {
    return {
      tableData: [], //表格
      companyList: [],
      companyId: "",
      contractDuration: "",
      branchList: [],
      bizPersion: "",
      createdName: "",
      formList: {},
      tableAssign: "", //表格深拷贝数据
      selectioned: [], //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      companyCode: ``, //公司代码
      orgCode: ``, //部门名称
      supplierId: "", //供应商
      extCode: "", //外部合同号
      companyShort: ``, //公司简称
      isInactive: "", //状态
      radio: false, //单选状态
      getData: [], //单选数据
      value9: "", //生效时间
      stateList: [
        { value: 0, label: "启用" },
        { value: 1, label: "禁用" }
      ], //状态列表
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
      poId: "",
      blId: "",
      type: null
    };
  },
  props: {
    tipShow: {
      type: Boolean
    },
    externalPoNo: {
      type: String
    }
  },
  created() {
    this.type = localStorage.getItem("type");
    //获取表格
    this.poId = localStorage.getItem("poId");
    this.blId = localStorage.getItem("blId");
    if (localStorage.getItem("type") == 3) {
      this.getBlList();
    } else {
      this.getContractList();
    }
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    inputShow() {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    //选择数据
    // radiochange (e) {
    //   this.getData = e;
    //   if (localStorage.getItem("type") == 3) {
    //     this.getData.erpPoNo = e.contractNo;
    //     this.getData.extPoNo = e.extCode;
    //   } else {
    //     this.getData.erpPoNo = e.poNo;
    //   }
    // },
    //关闭
    warehousingAddRowCancle() {
      this.$emit("warehousingAddRowCancle");
      this.radio = false;
      this.getData = "";
    },
    //确定
    warehousingAddRowSure() {
      this.$emit("warehousingAddRowSure", this.getData);
      this.radio = false;
      this.getData = ``;
      //   this.$router.push({
      //     //核心语句
      //     path: "/index/Purchase/warehousingDetails", //跳转的路径
      //     query: { poId: this.getData.poId }
      //   });
      this.$emit("warehousingAddRowCancle");
    },
    //获取表格
    getContractList() {
      let params = {
        poId: this.poId
      };
      api
        .selectOdPoContractDetail(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.tableData.map(item => {
            item.extPoNo = this.externalPoNo;
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getBlList() {
      let params = {
        blId: this.blId
      };
      api
        .odBlDetail(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data.odBlItemsList;
          this.tableData.map((item, index) => {
            item.poNo = item.contractNo;
            item.poRowno = item.contractRowno;
            item.extPoNo = item.extCode;
            item.blNo = res.data.bizBlNo;
          });
        })
        .catch(() => {
          this.loading = false;
        });
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
    handleDataSelect(selection, row) {
      this.getData = selection;
    },
    //单行点击
    rowClick(e) {
      //   this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.index = this.tableData.indexOf(e);
      this.selectioned.push(e);
      this.radio = this.index;
      this.handleDataSelect(this.selectioned, e);
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
.warehousingAddRow {
  .input-div .el-col .el-input__icon {
    line-height: 20px;
  }
}
</style>
