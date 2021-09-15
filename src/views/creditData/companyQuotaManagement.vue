<template>
  <div id="supplierCredit">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="initData()">查询</el-button>
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
      <div class="search-div">
        <el-col :span="5" class="el-col">
          <label>公司</label>
          <el-input v-model="companyInfo.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="moreIcon" @click="companyPopup"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>会计年度</label>
          <el-date-picker
            class="el-inputs"
            v-model="startyear"
            align="right"
            size="small"
            type="year"
            value-format="yyyy"
            format="yyyy"
            placeholder="开始年份"
          ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <el-date-picker
          class="el-inputs"
          v-model="endyear"
          align="right"
          size="small"
          type="year"
          value-format="yyyy"
          format="yyyy"
          placeholder="结束年份"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
          <label>状态</label>
          <el-select  v-model="statusData"
                    class="el-inputs"
                    placeholder="请选择"
                    multiple
                    collapse-tags
            >
            <el-option
                v-for="item in statusList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code">
            </el-option>
         </el-select>   
        </el-col>
      </div>
    </div>
    <!--列表信息-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-folder-add" v-if="$actionFlag(`F001`)"  @click="addData(1)">创建</el-button>
      <el-button icon="el-icon-edit"  v-if="$actionFlag(`F002`)"  @click="addData(2)">修改</el-button>
      <el-button icon="el-icon-delete" v-if="$actionFlag(`F003`)"  @click="deleteData">删除</el-button>
      <el-button icon="el-icon-data-line" v-if="$actionFlag(`F004`)" @click="addData(3)">查看</el-button>
      <el-button icon="el-icon-finished" v-if="$actionFlag(`F005`)"  @click="submitData">提交</el-button>
      <el-button icon="el-icon-receiving" v-if="$actionFlag(`F006`)"  @click="handleToExamine">审批</el-button>
      <el-button icon="el-icon-unlock" v-if="$actionFlag(`F007`)"  @click="changeStatus(1)">启用</el-button>
      <el-button icon="el-icon-lock" v-if="$actionFlag(`F008`)"  @click="changeStatus(2)">停用</el-button>
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
        <el-table-column prop="companyCode" label="公司代码" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="companyName" label="公司名称" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="creditYear" label="年度" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="creditAmt" label="信用额度" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="creditStatus" label="状态" min-width="180" show-overflow-tooltip>
           <template slot-scope="scope">
              <div>
                <span
                    v-show="scope.row.creditStatus == it.dict_code"
                    v-for="it in statusList"
                    :key="it.dict_code"
                  >{{ it.dict_value }}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="applyTime" label="申请日期" min-width="180" show-overflow-tooltip>
           <template slot-scope="scope">
            <span>{{scope.row.applyTime | time2Date}}</span>
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
      <!--公司弹窗-->
    <company-select v-if="companyShow" :tipShow="companyShow" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
    </div>
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
import api from "@/api/creditData/credit";
export default {
  name: "companyQuotaManagement",
  data() {
    return {
        companyShow:false,
        companyInfo:{},
        startyear:'',
        endyear:'',
        statusList:[],
        statusData:[],
        pageNum:1,
        pageSize:100,
        total:0,
        creditData:[],
        loading: false,
        selectedIndex: null, //列表选中下标
        examineShow: false, //审核弹窗
        examineValue: "", //审核选中的值
        examineList: [
          { value: 1, label: "通过" },
          { value: 0, label: "驳回" },
        ],
        unReason: "", //驳回原因   
        examineStatus:'',
        pickerOptions:{}
    }
  },
   watch:{
     startyear(val) {
      let that = this;
      if (val > that.endyear) {
        that.endyear = "";
      }
      this.pickerOptions = {
        disabledDate(time) {
          return time.getTime() < new Date(that.startyear).getTime();
        }
      };
    }
  },
  created(){
    let data=this.$getQueryData(this);
    this.statusData=data.creditStatusList;
    this.startyear=data.creditYearStart;
    this.endyear=data.creditYearEnd;
    this.getStatusData();
    this.initData();
  },
  methods:{
     cell({row, column, rowIndex, columnIndex}) {
    //第八列添加 red 类
        if(column.property=="creditAmt"){
        return 'rightTd'
        }else{
        return "";
        }
    },
      //审核状态字典
    getStatusData() {
      api.dicQuery({
        dictNo: 1164
      }).then(res => {
        this.statusList = res.data;
      }).catch();
    },
    //
    initData(){
      let data={
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        companyCode:this.companyInfo.companyCode,
        creditStatusList:this.statusData,
        creditYearStart:this.startyear,
        creditYearEnd:this.endyear
      }
      this.$setQueryData(this,data);
      api.selectCmCompanyCreditList(data).then(res=>{
        this.creditData=res.data.list;
        this.total=res.data.total;
      })
    },
     
        //创建
    addData(type) {
      if(type!=1 && this.selectedIndex == null){
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      if(type==2){
        let row=this.creditData[this.selectedIndex];
         if (row.creditStatus != "11640005" && row.creditStatus != "11640020") {
          this.$openWarning("该状态的单据不可修改");
          return false;
        }
      }
      this.$router.push({
        name: "companyQuotaManagementEdit",
        query:{
          type:type,
          quotaId:type!=1?this.creditData[this.selectedIndex].id:''
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
      if (row.creditStatus != "11640005" && row.creditStatus != "11640020") {
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
        api.deleteCmCompanyCredit(params).then(res => {
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
      if (row.creditStatus != "11640005" && row.creditStatus != "11640020") {
        this.$openWarning("该状态的单据不可提交");
        return false;
      }
      api.submitCmCompanyCredit(row).then(res => {
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
      if (row.creditStatus != "11640010") {
        this.$openWarning("该状态的单据不可审核");
        return false;
      }
      this.examineValue = ""; ////审核选中的值
      this.unReason='';
      this.examineStatus = true;
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
     let data=this.creditData[this.selectedIndex];
     data.isPass=this.examineValue;
     if(data.isPass==0){
       data.unReason=this.unReason;
     }
      api.approveCmCompanyCredit(data)
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
    //启用，停用
    changeStatus(type){
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let row = this.creditData[this.selectedIndex];
      if(type==1){
        if (row.creditStatus!='11640025') {
          this.$openWarning("该状态的单据不可启用");
          return false;
        }
        row.creditStatus='11640015';
      }else{
         if (row.creditStatus!='11640015') {
          this.$openWarning("该状态的单据不可停用");
          return false;
        }
        row.creditStatus='11640025';
      } 
      api.updateCmCompanyCreditStatus(row).then(res=>{
        if (res.code == "success") {
            this.$openSuccess('修改成功');
            this.initData();
          } else {
            this.$openWarning(res.message);
          }
      })
    },
    reset(){
      this.statusData=[];
      this.companyInfo={};
      this.startyear='';
      this.endyear='';
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
      //翻页
    currentChange(e) {
      this.pageNum = e;
      this.initData();
    },
    //单页数量
    currentSize(e) {
      this.pageNum = 1;
      this.pageSize = e;
     this.initData();
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
  },
  components:{
    companySelect
  }
 
};
</script>
<style lang="scss">
 .el-col {
    position: relative;
    .moreIcon {
      width: 65%;
      height: 24px;
      position: absolute;
      top: 0;
      right: 0;
      padding: 4px 5px;
      cursor: pointer;
    }
  }
  
</style>
<style scoped>
.index .el-button.is-disabled,
.index .el-button.is-disabled:focus,
.index .el-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #fff;
  border: 1px solid #ebeef5;
}
</style>

