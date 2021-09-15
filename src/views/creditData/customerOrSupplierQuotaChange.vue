<template>
  <div id="supplierCredit">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
      <p class="hide-input" v-if="queryArea" @click="queryAreaShow()">更多条件<i class="el-icon-caret-bottom"></i></p>
      <p class="hide-input" v-else @click="queryAreaShow()">收起<i class="el-icon-caret-top"></i></p>
      <div class="search-div">
        <el-col :span="5" class="el-col">
          <label>公司</label>
          <el-input v-model="companyInfo.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="comicon" @click="companyPopup"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>部门</label>
          <el-select  v-model="branchInfo"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :remote-method="getDepartment"
                  collapse-tags
                  value-key="branchId"
            >
            <el-option
                v-for="item in departmentList"
                :key="item.branchId"
                :label="item.branchName"
                :value="item">
            </el-option>
          </el-select>
          <span class="comicon" @click="branchPopup" style="width: 10%;z-index: 2"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
         <el-col :span="5" class="el-col">
          <label>客户</label>
          <el-select
            v-model="customerInfo"
            class="el-inputs"
            placeholder="请选择"
            multiple
            filterable
            remote
            :remote-method="getCustomer"
            collapse-tags
            value-key="customerId"
          >
            <el-option
                v-for="item in customerList"
                :key="item.customerId"
                :label="item.customerName"
                :value="item">
            </el-option>
          </el-select>
          <span class="comicon" @click="customerPopup" style="width: 10%;z-index: 2"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
         <el-col :span="5" class="el-col">
            <label>供应商</label>
            <el-select  v-model="supplierInfo"
                    class="el-inputs"
                    placeholder="请选择"
                    multiple
                    filterable
                    remote
                    :remote-method="getSupplier"
                    collapse-tags
                    value-key="supplierId"
          >
          <el-option
              v-for="item in supplierList"
              :key="item.supplierId"
              :label="item.supplierName"
              :value="item">
          </el-option>
          </el-select>
          <span class="comicon" @click="supplierPopup" style="width: 10%;z-index: 2"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>状态</label>
          <el-select  v-model="creditStatusInfo"
                    class="el-inputs"
                    placeholder="请选择"
                    multiple
                    collapse-tags
            >
            <el-option
                v-for="it in creditStatusList"
                :key="it.dict_order"
                :label="it.dict_value"
                :value="it.dict_key">
            </el-option>
         </el-select>   
        </el-col>
        <el-col :span="5" class="el-col">
          <label>申请单号</label>
          <el-input v-model="applyCode" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>申请日期</label>
          <el-date-picker v-model="applyTime"  
            type="daterange"
            class="el-selects"
            :clearable="false"
            size="mini"
            start-placeholder="开始日期"
            end-placeholder="结束日期"></el-date-picker>
        </el-col>
      </div>
    </div>
    <!--列表信息-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-folder-add"  @click="addData(1)">创建</el-button>
      <el-button icon="el-icon-edit" v-if="$actionFlag(`F002`)"  @click="addData(2)">修改</el-button>
      <el-button icon="el-icon-delete" v-if="$actionFlag(`F003`)"  @click="deleteData">删除</el-button>
      <el-button icon="el-icon-data-line" v-if="$actionFlag(`F004`)" @click="addData(3)">查看</el-button>
      <el-button icon="el-icon-finished" v-if="$actionFlag(`F005`)"  @click="submitData">提交</el-button>
      <el-button icon="el-icon-receiving" v-if="$actionFlag(`F006`)"  @click="handleToExamine">审批</el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        class="el-table"
        border
        center
        height="calc(100% - 35px)"
        :data="creditData"
        v-loading="loading"
        ref="multipleTable"
        @selection-change="handleChange"
        @select-all="singleSelect"
        @select="singleSelect"
        @row-click="singleSelectRow">
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column type="index" label="序号" width="60" fixed></el-table-column>
        <el-table-column prop="applyCode" label="申请单号" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="companyName" label="公司" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="branchName" label="部门" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="custSupplyName" label="客商名称" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="appliedAmt" label="已审批额度金额" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column  label="授信有效期" min-width="180" show-overflow-tooltip>
          <template  slot-scope="scope">
            <span> {{ scope.row.grantingStart | time2Date}}至{{scope.row.grantingEnd | time2Date}}</span>
          </template>
        </el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="alterAmt" label="调整额度金额" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="applyTime" label="申请日期" min-width="180" show-overflow-tooltip>
           <template slot-scope="scope">
            <span>{{scope.row.createdTime | time2Date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creditStatus" label="状态" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
              <div>
                <span
                    v-show="scope.row.creditStatus == it.dict_key"
                    v-for="it in creditStatusList"
                    :key="it.dict_order"
                  >{{ it.dict_value }}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createdName" label="创建人" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createdTime" label="创建日期" min-width="180" show-overflow-tooltip>
           <template slot-scope="scope">
            <span>{{scope.row.createdTime | time2Date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedName" label="修改人" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updatedTime" label="修改日期" min-width="180" show-overflow-tooltip>
           <template slot-scope="scope">
            <span>{{scope.row.updatedTime | time2Date}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageArea"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentChange"
        @size-change="currentSize"
        :current-page="pageNum"
        :page-sizes="[100,200,300,500]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
      <!--公司弹窗-->
    <company-select v-if="companyShow" :tipShow="companyShow" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
     <!--部门弹窗-->
    <branch-select v-if="branchShow" :tipShow="branchShow" :data="companyInfo" @departmentCancle="branchCancel" @departmentSure="branchSure"></branch-select>
    <!--供应商弹窗-->
    <supplier-select v-if="supplierShow" :tipShow="supplierShow" :filterQuery="parentFilter" @supplierCancle="supplierCancel" @supplierSure="supplierSure"></supplier-select>
     <!--客户弹窗-->
    <customer-select v-if="customerShow" :tipShow="customerShow" :filterQuery="parentFilter" @customerCancle="customerCancel" @customerSure="customerSure"></customer-select>
      <!--审核弹窗 开始-->
    <el-dialog
      :visible.sync="examineShow"
      :close-on-click-modal="false"
      :show-close="false"
      title="审核"
      width="400px"
      class="popup_box"
    >
      <div class="examine-dialog">
        <el-col :span="24" class="el-col">
          <label><span class="must-full">*</span>审核</label>
          <el-select
            clearable
            size="small"
            class="el-select"
            @change="examineSelect"
            v-model="examineValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in examineList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col v-if="examineValue===0" :span="24" class="el-col">
          <label style="vertical-align:top">驳回原因</label>
          <el-input
            type="textarea"
            autosize
            v-model="unReason"
            size="small"
            class="el-textarea"
            placeholder="请输入"
          >
          </el-input>
        </el-col>
      </div>
      <div class="button-div2">
        <el-button
          @click="examineSure"
          icon="el-icon-check"
          :disabled="examineStatus"
          >确定</el-button
        >
        <el-button @click="examineCancle" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--审核弹窗 结束-->
  </div>
</template>
<script>
import companySelect from "@/components/componySelect";
import PopupApi from "@/api/component";
import api from "@/api/creditData/credit";
import Compony from "@/api/comdepartment/componySelect";
import branchSelect from "@/components/departmentSelect2";
import customerSelect from "@/components/customerSelect2";
import supplierSelect from "@/components/supplierSelect2";
export default {
  name: "customerOrSupplierQuotaChange",
  data() {
    return {
        companyShow:false,
        companyInfo:{},
        startyear:'',
        endyear:'',
        queryArea:true,
        pageNum:1,
        pageSize:100,
        total:0,
        loading:false,
        supplierShow:false,
        supplierList:[],
        supplierInfo:[],
        customerShow:false,
        customerList:[],
        customerInfo:[],
        departmentList:[],
        branchShow:false,//公司
        branchInfo:[],
        creditData:[],//列表数据
        selectedIndex:'',//列表选中的下标
        applyTime:[],//申请时间
        creditStatusInfo:[],//状态
        creditStatusList:[],
        applyCode:'',//申请单号
        examineShow:false,
        examineValue: "", //审核选中的值
        examineList: [
          { value: 1, label: "通过" },
          { value: 0, label: "驳回" },
        ],
        unReason: "", //驳回原因   
        examineStatus:'',
        parentFilter: {
          isSubsidiary: 0 //只过滤出母公司供应商
        },

    }
  },
  created(){
    let data=this.$getQueryData(this);
    this.supplierInfo=data.bbSupplierBaseList;
    this.supplierList=data.bbSupplierBaseList;
    this.customerInfo=data.bbCustomerBaseList;
    this.customerList=data.bbCustomerBaseList;
    this.departmentList=data.bbBranchBaseList;
    this.branchInfo=data.bbBranchBaseList;
    this.creditStatusInfo=data.creditStatusList;
    if(data.applyTimeStart){
      this.applyTime[0]=data.applyTimeStart;
      this.applyTime[1]=data.applyTimeEnd;
    }
    this.getStatusData();
    this.initData();
  },
  methods:{
     cell({row, column, rowIndex, columnIndex}) {
    //第八列添加 red 类
        if(column.property=="appliedAmt" || column.property=="alterAmt"){
        return 'rightTd'
        }else{
        return "";
        }
    },
      //状态字典
    getStatusData() {
      api.dicQuery({
        dictNo: 1165
      }).then(res => {
        this.creditStatusList = res.data;
      }).catch();
    },
    initData(){
      let data={
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        applyCode:this.applyCode,
        applyTimeStart:this.applyTime.length?this.applyTime[0]:'',
        applyTimeEnd:this.applyTime.length?this.applyTime[1]:'',
        companyCode:this.companyCode,
        bbSupplierBaseList:this.supplierInfo,
        bbCustomerBaseList:this.customerInfo,
        bbBranchBaseList:this.branchInfo,
        creditStatusList:this.creditStatusInfo
      }
      data.companyInfo=this.companyInfo;
      this.$setQueryData(this,data);
      api.selectCmCompanyCreditGrantingList(data).then(res=>{
        this.creditData=res.data.list;
        this.total=res.data.total;
      })
    },
    //查询
    query() {
      this.page = 1;
      this.initData();
    },
    //重置
    reset() {
      this.supplierInfo=[];
      this.customerInfo=[];
      this.branchInfo=[];
      this.applyTime=[];//申请时间
      this.creditStatusInfo=[];//状态
      this.applyCode='';//申请单号
      this.companyInfo={};
    },
    addData(type){
       if(type!=1 && this.selectedIndex == null){
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      if(type==2){
         let row=this.creditData[this.selectedIndex];
         if (row.creditStatus != "11650005" && row.creditStatus != "11650020") {
          this.$openWarning("该状态的单据不可修改");
          return false;
        }
      }
      this.$router.push({
        name: "customerOrSupplierQuotaChangeEdit",
        query:{
          type:type,
         merchantsId:type!=1?this.creditData[this.selectedIndex].grantingId:''
        }
      });
    },
     //删除
    deleteData() {
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let row = this.creditData[this.selectedIndex];
      if (row.creditStatus != "11650005" && row.creditStatus != "11650020") {
        this.$openWarning("该状态的单据不可删除");
        return false;
      }
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          id: row.id,
          version: row.version
        };
        api.deleteCmCompanyCreditGrantingItems(params).then(res => {
          this.$openSuccess(res.message);
          this.initData();
        }).catch();
      });
    },
    //提交 
     submitData(type) {
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let row = this.creditData[this.selectedIndex];
      if (row.creditStatus != "11650005" && row.creditStatus != "11650020") {
        this.$openWarning("该状态的单据不可提交");
        return false;
      }
      api.submitCmCompanyCreditGranting({id:row.grantingId}).then(res => {
        this.$openSuccess(res.message);
        this.initData();
      }).catch();
      
    }, 
    //审核
    handleToExamine(){
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let row = this.creditData[this.selectedIndex];
      if (row.creditStatus != "11650010") {
        this.$openWarning("该状态的单据不可审核");
        return false;
      }
      this.examineValue = ""; ////审核选中的值
      this.examineStatus = true;
      this.unReason='';
      this.examineShow=true;
    },
     //审核下拉选中的值
    examineSelect(e) {
      this.examineValue = e; //审核选中的值
      if (this.examineValue!=='') {
        this.examineStatus = false;
      } else {
        this.examineStatus = true;
      }
    },
    //取消
    examineCancle() {
      this.examineShow = false; //审核弹窗
      this.examineValue = ""; ////审核选中的值
      this.unReason='';
      this.examineStatus = true;
    },
    //确定
    examineSure() {
      if (this.examineStatus) {
        this.$openWarning("请选择审核状态");
        return;
      } 
     //isPass 0 不通过  1,通过
     let grantingId=this.creditData[this.selectedIndex].grantingId;
     let data={
       isPass:this.examineValue,
       id:grantingId
     }
     if(data.isPass==0){
       data.unReason=this.unReason;
     }
      api.approveCmCompanyCreditGranting(data)
        .then((res) => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
            this.examineShow = false;
            this.initData();
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //部门远程搜索
     getDepartment(str){
      if(!str){
        return
      }
      let params = {
        pageNum: 1,
        rows: 200,
        companyId: this.companyInfo.companyId ,
        branchName: str,
        branchCode: '',
        isCollected:0
      };
      Compony.brnchList2(params)
          .then(res => {
            this.departmentList = res.data.list;
          })
          .catch(() => {
          });
    },
    //供应商远程搜索
    getSupplier(str){
      if(!str){
        return
      }
      PopupApi.supplierSelect2({
        page: 1,
        pageSize: 200,
        supplierName: str,
        //isInactive: 0,
        isCollected:0
      }).then(res => {
        if (res.code == "success") {
          this.supplierList = res.data.list;
        } else {
          this.$openWarning(res.message);
        }
      })
    },
     //客户远程搜索
    getCustomer(str){
      if(!str){
        return
      }
      let params = {
        pageNum: 1,
        rows: 200,
        customerName: str,
        isCollected:0
      };
      PopupApi.customerSelect2(params)
          .then(res => {
            this.customerList =  res.data.list;
          })
          .catch(() => {
          });

    },
    //列表单选
    handleChange(e) {
      if (e.length === 0) {
        this.selectedIndex = null;
      }
    },
    singleSelect(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length === 0) {
        return;
      }
      if (row) {
        this.$refs.multipleTable.toggleRowSelection(row, true);
        this.selectedIndex = this.creditData.indexOf(row);
      }
    },
    singleSelectRow(e) {
      this.$refs.multipleTable.toggleRowSelection(e);
      this.selectedIndex = this.creditData.indexOf(e);
    },
    //是否显示查询区域
    queryAreaShow() {
      this.queryArea = this.$showOne(this.queryArea);
    },
      //翻页
    currentChange(e) {
      this.page = e;
      //this.supplierCreditList();
    },
    //单页数量
    currentSize(e) {
      this.page = 1;
      this.pageSize = e;
     // this.supplierCreditList();
    },
    //公司弹窗
    companyPopup() {
      this.companyShow = true;
    },
    //公司弹窗关闭
    companyCancel() {
      this.companyShow = false;
    },
    //公司弹窗确定并传值
    companySure(e) {
      this.companyShow = false;
      this.companyInfo = e;
    },
    //部门弹窗
    branchPopup() {
      this.branchShow = true;
    },
    //部门弹窗关闭
    branchCancel() {
      this.branchShow = false;
    },
    //部门弹窗确定并传值
    branchSure(e) {
      this.branchShow = false;
      this.branchInfo = e;
      this.departmentList = e;
    },
     //供应商弹窗
    supplierPopup() {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancel() {
      this.supplierShow = false;
    },
    //供应商弹窗确定并传值
    supplierSure(e) {
      this.supplierShow = false;
      this.supplierInfo = e;
      this.supplierList = e;
    },
    //客户弹窗
    customerPopup() {
      this.customerShow = true;
    },
    //客户弹窗关闭
    customerCancel() {
      this.customerShow = false;
    },
    //客户弹窗确定并传值
    customerSure(e) {
      this.customerShow = false;
      this.customerInfo = e;
      this.customerList = e;
    },
  },
  components:{
    companySelect,
    branchSelect,
    customerSelect,
    supplierSelect

  }
 
};
</script>
<style lang="scss" scoped>
::-webkit-scrollbar{
  display: block;
}
.el-selects {
    width: 70% !important;
    .el-input__inner {
      width: 100%;
    }
    .el-select__tags {
      .el-tag--light {
        height: auto !important;
        line-height: normal !important;
      }
    }
  }
.index .el-button.is-disabled,
.index .el-button.is-disabled:focus,
.index .el-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #fff;
  border: 1px solid #ebeef5;
}
</style>

