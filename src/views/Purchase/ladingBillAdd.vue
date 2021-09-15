<template>
  <!-- 采购创建 -->
  <div class="ladingBillAdd index" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      title="采购合同信息"
      :show-close="false"
      :close-on-click-modal="false"
      width="1100px"
      class="popup_box"
    >
        <div class="button-div" style="text-align:left">
          <el-button
            class="query-button"
            @click="conList" icon="el-icon-search"
            >查询</el-button>
          <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
        </div>
        <!-- 搜索 -->
        <div class="index-div3 index-div4">
          <p class="hide-input" v-if="show" @click="inputShow()">更多条件 <i class="el-icon-caret-bottom"></i></p>
         <p class="hide-input" v-else @click="inputShow()">收起<i class="el-icon-caret-top"></i></p>
          <div class="dialog-search-div">
          <el-col :span="5" class="el-col">
          <label>公司</label>
          <el-input
            v-model="companyName.companyName"
            class="el-inputs"
            size="small"
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
            size="small"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="departmentTip"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>供应商</label>
          <el-input
            v-model="supplierName.supplierName"
            class="el-inputs"
            size="small"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="supplierTip"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
            <el-col :span="5" class="el-col">
              <label style="width:31%">采购合同号</label
              ><el-input
                v-model="poNo"
                class="el-inputs"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-colc">
              <label  style="width:31%" class="dataTop">签订时间</label>
              <el-date-picker
                v-model="value9"
                type="daterange"
                class="el-input2"
                size="mini"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                default-value="2010-10-01"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>业务员</label>
              <el-input v-model="bizPersonName.empName"
               class="el-inputs" 
               placeholder="请选择" 
               disabled>
              </el-input>
              <span class="comicon" @click="staffPopup">
                <i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label style="width:31%">创建人</label
              > <el-input
                v-model="createdName"
                class="el-inputs"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>外部合同号</label
              ><el-input
                v-model="extCode"
                class="el-inputs"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
          </div>
        </div>
        <!-- 表格 -->
        <div class="el-table-div wutabstyle">
          <el-table
            border
            center
            :data="tableData"
            class="el-table"
            ref="multipleTable"
            v-loading="loading"
            @row-click="rowClick"
            :row-class-name="tableRowClassName"
          >
            <el-table-column width="64">
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
              label="采购合同号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="extCode"
              label="外部合同号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="供应商"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="signTime"
              label="签订日期"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="createdName"
              label="创建人"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="createdTime"
              label="创建时间"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="updatedName"
              label="修改人"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="updatedTime"
              label="修改日期"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
          <!--分页background-->
          <el-pagination background  @size-change="handleSizeChange"
            @current-change="currentChange"
            :current-page="pageNum" :page-sizes="[100, 200, 300,500]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      <slot></slot>
      <div class="button-div2">
        <el-button type="primary" @click="tipsSure()" icon="el-icon-check">确定</el-button>
        <el-button @click="ladingBillCancle()" icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
     <!-- 选择公司弹窗 -->
      <compony-select
        v-if="componyShow"
        :tipShow="componyShow"
        @tipsCancle="tipsCancle"
        @tipsSure="componySure"
      >
      </compony-select>
        <!-- 选择部门弹窗 -->
      <department-select
        v-if="departmentShow"
        :tipShow="departmentShow"
        :data="companyName"
        @departmentCancle="departmentCancle"
        @departmentSure="departmentSure"
      >
      </department-select>
      <!-- 选择供应商弹窗 -->
      <supplier-Select
        v-if="supplierShow"
        :tipShow="supplierShow"
        @supplierCancle="supplierCancle"
        @supplierSure="supplierSure"
      ></supplier-Select>
       <!-- 选择员工弹窗 -->
    <staff-select
      v-if="staffShow"
      :tipShow="staffShow"
      @staffCancle="staffCancel"
      @staffSure="staffSure"
    ></staff-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/ladingBill/ladingBill";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import supplierSelect from "@/components/supplierSelect.vue";
import staffSelect from "@/components/staffSelect";
export default {
  name: "ladingBillAdd",
  data() {
    return {
      tableData: [], //表格
      companyId: "",
      poNo: "",
      branchList: [],
      bizPersonName:'',
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
      companyName: ``, //公司
      branchName: ``, //部门
      supplierName: "", //供应商
      orgCode: ``, //部门名称
      supplierCode: "", //供应商
      bizStatus: "", //业务员
      createdlist: [], //创建人
      extCode: "", //外部合同号
      companyShort: ``, //公司简称
      componyShow: false, //公司弹窗
      departmentShow:false,
      supplierShow:false,
      staffShow:false,
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
    this.conList();
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
      this.show = this.$dialogShowOne(this.show);
    },
    //选择数据
    radiochange(e) {
      this.getData = e;
    },
    //关闭
    ladingBillCancle() {
      this.$emit("ladingBillCancle");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    tipsSure() {
      if (!this.getData) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return;
      }
      this.$router.push({
        //核心语句
        path: "/index/Purchase/ladingBillEstablish", //跳转的路径
        query: { poId: this.getData.poId }
      });
      this.$emit("ladingBillCancle");
    },
    branchChange(val) {
      this.branchCode = val;
      // console.log('val',val)
    },
    //创建人
    createdChange(val) {
      this.createdName = val;
    },
    //获取表格
    conList() {
      if (this.companyName.companyName) {
        var companyName = this.companyName.companyName;
      }
      if(this.companyName.companyCode){
        var companyCode = this.companyName.companyCode
      }
       if(this.branchName.branchCode){
        var branchCode = this.branchName.branchCode
      }
       if( this.bizPersonName.empCode){
        var bizPersonCode =  this.bizPersonName.empCode
      }
       if( this.supplierName.supplierName){
        var supplierName =  this.supplierName.supplierName
      }
      if( this.supplierName.supplierCode){
        var supplierCode =  this.supplierName.supplierCode
      }
      if( this.bizPersonName.empName){
        var bizPersonName =  this.bizPersonName.empName
      }
       if(this.createdName){
        var createdName = this.createdName
      }
       if(this.extCode){
        var extCode = this.extCode
      }
      if(this.value9 && this.value9.length){
        var startDate = this.value9[0]
         var endDate = this.value9[1]
      }
      if(this.poNo){
        var poNo = this.poNo
      }
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        poType: "10140010",
        poNo:poNo,
        companyName:companyName,
        companyCode:companyCode,
        supplierName:supplierName,
        supplierCode:supplierCode,
        bizPersonName:bizPersonName,
        bizPersonCode:bizPersonCode,
        createdName:createdName,
        orgCode:branchCode,
        extCode: extCode,
        startDate:startDate,
        endDate:endDate
      };
      api
        .selectOdPoContractInfo(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data.list;
          this.tableData.forEach(item => {
            item.createdTime = this.$timeFun(item.createdTime, 1);
            item.updatedTime = this.$timeFun(item.updatedTime, 1);
            item.signTime = this.$timeFun(item.signTime, 1);
          });
          this.total = res.data.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //查询
    queryData() {
      this.conList();
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
    componySure(e) {
      this.componyShow = false;
      this.companyName = e;
    },
    //供应商弹窗打开
    supplierTip() {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancle() {
      this.supplierShow = false;
    },
    //供应商确认获取数据
    supplierSure(e) {
      this.supplierShow = false;
      this.supplierName = e;
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
     //业务员弹窗
    staffPopup() {
      this.staffShow = true;
    },
    //业务员弹窗关闭
    staffCancel() {
      this.staffShow = false;
    },
    //业务员弹窗确定并传值
    staffSure(e) {
      this.staffShow = false;
      this.bizPersonName = e
     
    },
    //清空选项
    clearNone() {
      this.companyName ="";
      this.branchName ="";
      this.supplierName ="";
      this.branchCode = ``;
      this.value9 = [];
      this.bizPersonName = "";
      this.createdName = "";
      this.extCode = "";
      this.poNo = "";
      this.poType = "";
      this.radio = false;
      this.conList();
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.conList();
      this.radio = false;
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.conList();
      this.radio = false;
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
    }
  },
  components: {
    componySelect,
    departmentSelect,
    supplierSelect,
    staffSelect
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
.ladingBillAdd {
  .el-select.el-select--mini {
    width: 100px !important;
  }
   .wutabstyle label::after {
    content:none !important;
}
}
</style>
<style lang="scss" scoped>
.dataTop {
  vertical-align: top;
}
</style>
