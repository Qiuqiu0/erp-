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
      <!-- 业务员选择 -->
      <staff-select
        class="el-col el-col-5"
        :branchName="branchName"
        :companyName="companyName"
        :labelName="'业务员'"
        :staff.sync="staff"
      ></staff-select>
      <!-- 物料选择 -->
      <matter-select :goods.sync="goods" :labelName="'物料号'" class="el-col el-col-5"></matter-select>
      <!--供应商选择-->
      <supplier-select :customer="customer" class="el-col el-col-5" :supplier.sync="supplier"></supplier-select>
      <el-col :span="5" class="el-col">
        <label>过账日期</label>
        <el-date-picker
          style="width:70%"
          class="el-input-date"
          size="mini"
          v-model="postTime"
          format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <!-- <el-col :span="5" class="el-col">
        <label>创建日期</label>
        <el-date-picker
          class="el-input-date"
          size="mini"
          v-model="createDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col> -->
      <el-col class="el-col el-col-btn"></el-col>
    </div>
  </div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import staffSelect from "@/views/fundsManage/conponents/staffSelect";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect2";
import matterSelect from "@/views/integratedQuery/conponents/matterSelect";
export default {
  name: "headSearch",
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    supplierSelect,
    matterSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      customer: {}, //客户
      supplier: {}, //供应商
      staff: {}, //业务员
      goods:{},//物料号
      postTime:"",//过账日期
      createDate: "", //创建日期
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
      this.staff= {}; //业务员
      this.goods = {}; //物料号
      this.createDate = ""; //创建日期
      this.postTime = ""; //过账日期
    },
    postData() {
      if(JSON.stringify(this.companyName) === "{}"){
          this.$openWarning("请选择公司");
          return;
      }
      let params = {
        companyCode: this.companyName.companyCode, //公司
        // companyId: this.companyName.companyId, //公司Id
        orgCode: this.branchName.branchCode, //部门
        // orgId: this.branchName.branchId, //部门Id
        supplierCode: this.supplier.supplierCode, //供应商
        // supplierId: this.supplier.supplierId, //供应商id,
        bizPersonCode:this.staff.empCode,
        bizPersonName:this.staff.empName,
        goodsCode:this.goods.goodsCode, //物料号
        // goodsId:this.goods.goodsId, //物料ID
      };
      if (this.createDate) {
        params.createdTimeBegin = this.createDate[0];
        params.createdTimeEnd = this.createDate[1];
      } else {
        params.createdTimeBegin = "";
        params.createdTimeEnd = "";
      }
      if (this.postTime) {
        params.beginAccountDate = this.postTime[0];
        params.endAccountDate = this.postTime[1];
      } else {
        params.beginAccountDate = "";
        params.endAccountDate = "";
      }
      this.$emit("getSearchs", params);
    }
  },
  mounted() {}
};
</script>
