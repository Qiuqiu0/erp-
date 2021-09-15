<template>
  <!-- 采购创建 -->
  <div class="ladingBillAddRow" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      title="采购合同信息"
      :show-close="false"
      width="1100px"
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
          v-loading="loading"
          @row-dblclick="dblclick"
          @row-click="rowClick"
          :row-class-name="tableRowClassName"
        >
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
            prop="contractNo"
            width="100"
            label="采购合同号"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="extCode"
            width="100"
            label="外部合同号"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="contractRowno"
            width="120"
            label="采购合同行号"
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
            prop="arrivedQty"
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
        <el-button type="primary" @click="ladingBillAddRowSure()"
          icon="el-icon-check">确认</el-button
        >
        <el-button @click="ladingBillCancle()" icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/ladingBill/ladingBill";
export default {
  name: "ladingBillAddRow",
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
      selectioned: null, //表格选中项
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
      getData: ``, //单选数据
      value9: "", //生效时间
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
      show: true
    };
  },
  props: {
    tipShow: {
      type: Boolean
    }
  },
  created() {
    //获取表格
    if (localStorage.getItem("poId")) {
      this.poId = localStorage.getItem("poId");
      console.log("321", this.poId);
      this.conLists();
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
    radiochange(e) {
      this.getData = e;
    },
    //关闭
    ladingBillCancle() {
      this.$emit("ladingBillCancle");
      this.radio = false;
      this.getData = "";
    },
    //确定
    ladingBillAddRowSure() {
      this.$emit("ladingBillAddRowSure", this.getData);
      this.radio = false;
      this.getData = ``;
      this.$router.push({
        //核心语句
        path: "/index/Purchase/ladingBillEstablish", //跳转的路径
        query: { poId: this.getData.poId }
      });
      this.$emit("ladingBillCancle");
    },
    conLists(){
     let params = {
        poId: this.poId
      };
      api.selectOdPoContract(params)
      .then(res =>{
         this.loading = false;
          let extCode = res.data.extCode;
          this.formList = { ...res.data, extCode };
          this.conList()
      })
    },
    //获取表格
    conList() {
      let params = {
        poId: this.poId
      };
      api
        .selectOdPoContractDetail(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
             this.tableData.forEach((item,index)=>{
              item.contractRowno = res.data[index].poRowno;
              item.contractNo = res.data[index].poNo;
              item.arrivedQty = res.data[index].itemQty
              item.extCode = this.formList.extCode
            })
        })
        .catch(() => {
          this.loading = false;
        });
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
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex;
    },
    //单行点击
    rowClick(e) {
       this.getData = e;
       this.radio = e.index;
    },
     //单行双击
    dblclick (e) {
      this.selectioned = e;
      this.index = this.tableData.indexOf(e);
      this.$set(this.tableData, this.tableData.indexOf(e), e);
    },
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
