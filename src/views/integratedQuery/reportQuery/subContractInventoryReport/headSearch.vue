<template>
  <div class="index-div3 input-div" id="input-div">
    <p class="hide-input" v-if="show" @click="inputShow()">
      更多条件
      <i class="el-icon-caret-bottom"></i>
    </p>
    <p class="hide-input" v-else @click="inputShow()">
      收起
      <i class="el-icon-caret-top"></i>
    </p>
    <div class="search-div">
      <!--公司选择-->
      <compony-select class="el-col el-col-5" :companyName.sync="companyName"></compony-select>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5"
        :branchName.sync="branchName"
        :companyName="companyName"
      ></department-select>
      <!--供应商选择-->
      <supplier-select :customer="customer" class="el-col el-col-5" :supplier.sync="supplier"></supplier-select>
      <!--合同类型选择  -->
      <!-- <poContract-type-select :labelName="'合同类型'" :poContractType.sync="poType"></poContract-type-select> -->
      <el-col :span="5" class="el-col">
        <label>库龄区间</label>
        <el-input
          style="width:31.5%!important;"
          class="el-inputs"
          v-model="WarehouseAgeL"
          @change="WarehouseAgeLChangeHandler"
          v-input-filter:int
          size="small"
          type="number"
          placeholder="请输入"
        ></el-input>至
        <el-input
          class="el-inputs"
          style="width:31%!important;"
          v-model="WarehouseAgeH"
          v-input-filter:int
          size="small"
          type="number"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>船名</label>
        <el-input v-model="shipName" class="el-inputs" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>外部合同号</label>
        <el-input v-model="extCode" class="el-inputs" placeholder="请输入"></el-input>
      </el-col>
      <!-- 物料选择 -->
      <matter-select :goods.sync="goods" :labelName="'物料编码'" class="el-col el-col-5"></matter-select>
      <el-col :span="5" class="el-col">
        <label>入库日期</label>
        <el-date-picker
          style="width:70%"
          class="el-input-date"
          size="mini"
          v-model="postDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col class="el-col el-col-btn"></el-col>
    </div>
  </div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect2";
import matterSelect from "@/views/integratedQuery/conponents/matterSelect";
import poContractTypeSelect from "@/views/integratedQuery/conponents/poContractTypeSelect";
export default {
  name: "headSearch",
  components: {
    componySelect,
    departmentSelect,
    supplierSelect,
    poContractTypeSelect,
    matterSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      customer: {}, //客户
      supplier: {}, //供应商
      WarehouseAgeL: "", //库龄low
      WarehouseAgeH: "", //库龄high
      poType: "", // 合同类型
      shipName: "", //船名
      extCode: "", //外部合同号
      goods: {}, //物料号
      postDate: "", //入库日期
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true
    };
  },
  created(){
    if(window.IsShowDefaultCompanyInfo){
        this.companyName=window.defaultCompanyInfo;
      }
  },
  methods: {
    inputShow() {
      this.show = this.$showOne(this.show);
      this.$parent.$forceUpdate()
    },
    clearNone() {
      if(window.IsShowDefaultCompanyInfo){
        this.companyName=window.defaultCompanyInfo;
      }else{
        this.companyName = {}; //公司
      }
      this.branchName = {}; //部门
      this.supplier = {}; //供应商
      this.WarehouseAgeL = ""; //库龄low
      this.WarehouseAgeH = ""; //库龄high
      this.poType = ""; // 合同类型
      this.shipName = ""; //船名
      this.extCode = ""; //外部合同号
      this.goods = {}; //物料号
      this.postDate = ""; //入库日期
    },
    postData() {
      let params = {
        companyCode: this.companyName.companyCode, //公司
        companyId: this.companyName.companyId, //公司Id
        orgCode: this.branchName.branchCode, //部门
        orgId: this.branchName.branchId, //部门Id
        supplierCode: this.supplier.supplierCode, //供应商
        supplierId: this.supplier.supplierId, //供应商id
        warehouseAgeL: this.WarehouseAgeL, //库龄low
        warehouseAgeH: this.WarehouseAgeH, //库龄high
        poType: this.poType, // 合同类型
        shipName: this.shipName, //船名
        extCode: this.extCode, //外部合同号
        goodsName: this.goods.goodsName, //物料号
        // goodsId: this.goods.goodsId //物料ID
      };
      if (this.postDate) {
        params.beginPostDate = this.postDate[0];
        params.endPostDate = this.postDate[1];
      } else {
        params.beginPostDate = "";
        params.endPostDate = "";
      }
      this.$emit("getSearchs", params);
    },
    WarehouseAgeLChangeHandler(val) {
      this.WarehouseAgeH = val;
    }
  },
  mounted() {}
};
</script>
