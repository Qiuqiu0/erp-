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
      <!--客户选择-->
      <customer-select :customer.sync="customer" class="el-col el-col-5" :supplier="supplier"></customer-select>
      <el-col :span="5" class="el-col">
        <label>财务账期</label>
        <!-- <el-date-picker
          class="el-input-date"
          size="mini"
          v-model="accoutingMonth"
          format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker> -->
         <el-date-picker
            style="width:70%"
            class="el-input-date"
            v-model="accoutingMonth"
            size="mini"
            type="monthrange"
            range-separator="-"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            value-format="yyyy-MM">
        </el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>出库日期</label>
        <el-date-picker
          style="width:70%"
          class="el-input-date"
          size="mini"
          v-model="doDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>分类汇总</label>
        <el-select v-model="groupBy" placeholder="请选择" class="el-inputs" size="small">
          <el-option
            v-for="item in options"
            :key="item.dict_key"
            :label="item.dict_value"
            :value="item.dict_key"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-col>
      <el-col class="el-col el-col-btn"></el-col>
    </div>
  </div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import staffSelect from "@/views/fundsManage/conponents/staffSelect";
import customerSelect from "@/views/fundsManage/conponents/customerSelect2";
import matterSelect from "@/views/integratedQuery/conponents/matterSelect";
export default {
  name: "headSearch",
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    customerSelect,
    matterSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      customer: {}, //客户
      supplier: {}, //供应商
      staff: {}, //业务员
      goods: {}, //物料号
      doDate: "", //出库日期
      accoutingMonth: "", //账期
      groupBy: 0, //分类汇总
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      options: [
        { dict_key: 1, dict_value: "按部门+物料" },
        { dict_key: 2, dict_value: "按部门+物料+客户" },
        { dict_key: 0, dict_value: "不汇总（默认）" }
      ],
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
      this.customer = {}; //客户
      this.staff = {}; //业务员
      this.goods = {}; //物料号
      this.accoutingMonth = ""; //账期
      this.groupBy = 0;
      this.doDate = ""; //出库日期
    },
    postData() {
     if(JSON.stringify(this.companyName) === "{}"){
          this.$openWarning("请选择公司");
          return;
      }
      if(this.accoutingMonth==""){
          this.$openWarning("请选择财务账期");
          return;
      }
      let params = {
        companyCode: this.companyName.companyCode, //公司
        companyId: this.companyName.companyId, //公司Id
        orgCode: this.branchName.branchCode, //部门
        orgId: this.branchName.branchId, //部门Id
        customerCode: this.customer.customerCode, //客户
        customerId: this.customer.customerId, //客户id,
        bizPersonCode: this.staff.empCode,
        bizPersonName: this.staff.empName,
        goodsCode: this.goods.goodsCode, //物料号
        groupBy: this.groupBy
        // goodsId:this.goods.goodsId, //物料ID
      };
      if (this.accoutingMonth) {
        params.accoutingMonthBeginStr = this.accoutingMonth[0];
        params.accoutingMonthEndStr = this.accoutingMonth[1];
      } else {
        params.accoutingMonthBeginStr = "";
        params.accoutingMonthEndStr = "";
      }
      if (this.doDate) {
        params.doDateBegin = this.doDate[0];
        params.doDateEnd = this.doDate[1];
      } else {
        params.doDateBegin = "";
        params.doDateEnd = "";
      }
      this.$emit("getSearchs", params);
    }
  },
  mounted() {}
};
</script>
