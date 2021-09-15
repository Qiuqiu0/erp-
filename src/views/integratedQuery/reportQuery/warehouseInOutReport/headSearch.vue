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
      <!--客户选择-->
      <!-- <customer-select :customer.sync="customer" class="el-col el-col-5" :supplier="supplier"></customer-select> -->
      <!--供应商选择-->
      <!-- <supplier-select :customer="customer" class="el-col el-col-5" :supplier.sync="supplier"></supplier-select> -->
      <warehouseType-select :labelName="'单据类型'" :warehouseType.sync="orderType"></warehouseType-select>
      <el-col :span="5" class="el-col">
        <label>出入库单号</label>
        <el-input v-model="orderNo" class="el-inputs" placeholder="请输入"></el-input>
      </el-col>
      <!-- 物料编码 -->
      <matter-select :goods.sync="goods" :labelName="'物料编码'" class="el-col el-col-5"></matter-select>
      <!-- 物料名称 -->
      <el-col :span="5" class="el-col">
        <label>物料名称</label>
        <el-input v-model="goodsName" class="el-inputs" placeholder="请输入"></el-input>
      </el-col>
      <!-- 库存方向 -->
      <el-col :span="5" class="el-col">
        <label>库存方向</label>
        <el-select
          v-model="moveTypeFlag"
          placeholder="请选择"
          size="small"
          clearable
        >
          <el-option label="全部" :value="0"></el-option>
          <el-option label="入库" :value="1"></el-option>
          <el-option label="出库" :value="2"></el-option>
        </el-select>
      </el-col>
      <!-- 仓库选择 -->
      <warehouse-select :warehouse.sync="warehouse" :labelName="'仓库'" class="el-col el-col-5"></warehouse-select>
      <el-col :span="5" class="el-col">
        <label>出入库日期</label>
        <el-date-picker
          style="width:70%"
          class="el-input-date"
          size="mini"
          v-model="orderDate"
          format="yyyy-MM-dd"
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
import customerSelect from "@/views/fundsManage/conponents/customerSelect";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect";
import matterSelect from "@/views/integratedQuery/conponents/matterSelect";
import warehouseSelect from "@/views/integratedQuery/conponents/warehouseSelect";
import warehouseTypeSelect from "@/views/integratedQuery/conponents/warehouseTypeSelect";
export default {
  name: "headSearch",
  components: {
    componySelect,
    departmentSelect,
    customerSelect,
    supplierSelect,
    matterSelect,
    warehouseSelect,
    warehouseTypeSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      customer: {}, //客户
      supplier: {}, //供应商
      orderType: "", //业务类型
      orderNo: "", //出入库单号
      goods: {}, //物料编码
      goodsName:'', //物料名称
      moveTypeFlag: 0, //库存方向 0 全部 1入库  2 出库
      warehouse:{},//仓库
      orderDate: "", //出入库日期
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
      this.customer={}; //客户 
      this.orderType=""; //业务类型
      this.orderNo=""; //出入库单号
      this.goods={}; //物料编码
      this.goodsName=''; //物料名称
      this.moveTypeFlag= 0; //库存方向 0 全部 1入库  2 出库
      this.warehouse={};//仓库
      this.orderDate=""; //出入库日期
    },
    postData() {
      let params = {
        companyCode: this.companyName.companyCode, //公司
        companyId: this.companyName.companyId, //公司Id
        orgCode: this.branchName.branchCode, //部门
        orgId: this.branchName.branchId, //部门Id
        customerCode: this.customer.customerCode, //客户
        customerId: this.supplier.customerId, //客户id
        supplierCode: this.supplier.supplierCode, //供应商
        supplierId: this.supplier.supplierId, //供应商id
        moveType:this.orderType,//业务类型
        orderNo:this.orderNo,// 出入库单号
        goodsCode: this.goods.goodsCode, //物料号
        goodsName: this.goodsName, //物料ID
        moveTypeFlag:this.moveTypeFlag,// 库存方向 0 全部 1入库  2 出库
        warehouseCode:this.warehouse.warehouseCode //仓库
      };
      if (this.orderDate) {
        params.beginOrderDate = this.orderDate[0];
        params.endOrderDate = this.orderDate[1];
      } else {
        params.beginOrderDate = "";
        params.endOrderDate = "";
      }
      this.$emit("getSearchs", params);
    }
  },
  mounted() {}
};
</script>
