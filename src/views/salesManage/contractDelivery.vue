<template>
 <el-dialog :visible.sync="contractTipShow" title="选择销售合同" :show-close="false" width="1100px" class="popup_box">
    <div class="index" id="contractDelivery">
         <!--按钮样式-->
        <div class="index-div3 index-div4">
            <p class="hide-input" @click="inputShow(2)">
              <i class="el-icon-d-caret"></i>
            </p>
            <div  v-show="contractData.show">
               <el-col :span="5" class="el-col">
                  <label>公司</label>
                    <el-select clearable  size="small" class="el-select"   v-model="contractData.companyId" @change="getBranchByCompanyId()" placeholder="请选择" >
                    <el-option v-for="item in contractData.companyList"
                                :key="item.companyId"  
                                :label="item.companyName"
                                :value="item.companyId"
                        ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>部门</label>
                    <el-select clearable  size="small" class="el-select"  v-model="contractData.branchId" placeholder="请选择" >
                      <el-option v-for="item in contractData.orgList"
                                  :key="item.branchId"  
                                  :label="item.branchName"
                                  :value="item.branchId"
                          ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>客户</label>
                    <el-select clearable  size="small" class="el-select"  v-model="contractData.customerId" placeholder="请选择" >
                      <el-option v-for="item in contractData.custList"
                                  :key="item.customerId"  
                                  :label="item.customerName"
                                  :value="item.customerId"
                          ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>销售合同号</label>
                    <el-input  class="el-inputs" v-model="contractData.soContractId" size="small"  placeholder="请选择"></el-input>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>外部合同号</label>
                    <el-input  class="el-inputs" v-model="contractData.extCode" size="small"  placeholder="请选择"></el-input>
                </el-col> 
                <el-col :span="5" class="el-col">
                    <label>签订日期</label>
                    <el-date-picker
                        class="el-input2"
                        v-model="contractData.signTime"
                        type="daterange"
                        size="mini"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        >
                    </el-date-picker>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>有效日期</label>
                    <el-date-picker
                        v-model="contractData.contractEndDate"
                        class="el-input2"
                        type="daterange"
                        size="mini"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        >
                    </el-date-picker>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>创建日期</label>
                    <el-date-picker
                        class="el-input2"
                        v-model="contractData.createdTime"
                        type="daterange"
                        size="mini"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        >
                    </el-date-picker>
                </el-col>
                <el-col class="el-col-btn" style="margin-bottom:20px">
                    <div class="button-div">
                        <el-button class="query-button">查询</el-button>
                        <el-button  @click="resetData();">重置</el-button>
                    </div>
                </el-col>
            </div>
        </div>
        <div class="el-table-div">
            <el-table border center  
                ref="multipleTable"
                :data="contractData.tableData" 
                tooltip-effect="dark"
                @select-all="dialogCheck" 
                @select="dialogCheck"
                @selection-change="handleChange" 
                class="el-table" v-loading="loading">
                <el-table-column type="selection" width="45" align="center"></el-table-column> 
                <el-table-column type="index" width="50" label="序号">
                </el-table-column>
                <el-table-column prop="soContractId" label="销售合同号" width="120px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="extCode" label="外部合同号" width="120px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="custName" label="客户">
                </el-table-column>
                <el-table-column prop="contractEndDate" label="有效日期"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="createdName" label="创建人"  >
                </el-table-column>
                <el-table-column prop="createdTime" label="创建时间" >
                </el-table-column>
                <el-table-column prop="updatedName" label="修改人"  >
                </el-table-column>
                <el-table-column prop="updatedTime" label="修改日期">
                </el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pageNum" :page-sizes="[100, 200, 300,500]" :page-size="contractData.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="contractData.total">
            </el-pagination>
        </div>
        <div class="button-div2">
            <el-button  @click="contEidtPage()" class="query-button">确定</el-button>
            <el-button  @click="cancel(2)">取消</el-button>
        </div>
    </div>
 </el-dialog>
</template>
<script>
import { mapState } from "vuex";
import sApi from "@/api/salesManage/salesManage";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import customerSelect from "@/components/customerSelect.vue";
export default {
  name: "contractDelivery",
  data() {
    return {
      contractData:{
          companyList:[], //公司名
          companyId:"",//公司代码
          branchList:[], //部门
          branchId:'',//部门代码
          customerList:[], //客户名称
          customerId:"",//客户id
          soContractId: "", //销售合同号
          extCode:"",//外部合同号
          createdTime: [], //创建日期
          contractEndDate:[],//有效日期
          signTime:[],//签订日期
          show: true, //查询条件显示隐藏
          selectioned: "", //选中
          loading: false,
          tableData: [],
          pageSize:100,
          pageNum:1,
          total:0,
      }
     
    };
  },
 created(){
    this.selectContractInfo();
  },
  methods: {
    //查询合同信息
    selectContractInfo(){
       this.contractData.loading=true;
       var that=this.contractData;
      if(that.companyId){
        var  companyId=that.companyId;//公司
      }
      if(thithats.branchId){
        var  branchId=that.branchId;//部门
      }
      if(that.customerId){
        var  customerId=that.customerId;//销售客户
      }
      if(that.soContractId){//销售合同号
        var soContractId=that.soContractId;
      }
      if(that.extCode){//采购合同
        var extCode=that.extCode;
      }
      if(that.contractEndDate.length){
        var  contractEndDateBegin=that.contractEndDate[0];//有效日期
        var contractEndDateEnd=that.contractEndDate[1];
      }
      if(that.signTime.length){
        var signTimeBegin=that.signTime[0];//有效日期
        var signTimeDateEnd=that.signTime[1];
      }
      if(that.createdTime.length){
        var  createdTimeBegin=that.createdTime[0];//创建时间
        var  createdTimeEnd=that.createdTime[1];
      }
      let data={
        pageSize:that.pageSize,
        pageNum:that.pageNum,
        companyCode:companyCode,
        companyCode:companyCode,
        customerId:customerId,
        soContractId:soContractId,
        extCode:extCode,
        contractEndDateBegin:contractEndDateBegin,
        contractEndDateEnd:contractEndDateEnd,
        signTimeBegin:signTimeBegin,
        signTimeDateEnd:signTimeDateEnd,
        createdTimeBegin:createdTimeBegin,
        createdTimeEnd:createdTimeEnd
      }
      sApi.selectOdSoContractInfo(data).then(res => {
          if(res.code="success"){
              let list=res.data.list;
              let _this=this.contractData;
              _this.total=res.data.total;
              list.forEach(item => {//转换列表中的销售类型，单据状态
                item.contractEndDate=_this.$timeFun(item.contractEndDate,true);
                item.createdTime=_this.$timeFun(item.createdTime,true); 
                item.updatedTime=_this.$timeFun(item.updatedTime,true);  
            });
            _this.tableData=list;
            _this.loading=false;
          }else{
              this.$message({
                  duration: 1000,
                  showClose: true,
                  message: res.message,
                  type: 'error'
              });
                this.loading=false;
          }
          
      }).catch();
    },
    //点击确定跳转至编辑页
    contEidtPage(){
      localStorage.removeItem("soId");
      if (!this.contractData.selectioned) {//判断是否选中
          this.$message({
              duration: 1000,
              showClose: true,
              message: '未选择数据',
              type: 'warning'
          });
        return;
      }
      localStorage.setItem("soId",this.contractData.selectioned.soContractId);
      this.$router.push({  //核心语句
          path:"/index/salesManage/retailShipment", //跳转的路径
          query:{type:1}  
      })
    },
    //重置
    resetData(){
      this.contractData.companyId='';
      this.contractData.branchid='';
      this.contractData.customerId='';//销售客户
      this.contractData.customerId='';
      this.contractData.soContractId='';//销售合同
      this.contractData.extCode='';//外部合同
      this.contractData.createdTime=[];//创建时间
      this.contractData.signTime=[];//签订日期
      this.contractData.contractEndDate=[];//有效日期
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.selectContractInfo();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.selectContractInfo();
    },
    //表格选择
    handleChange(e) {
      if (e.length === 0) {
        this.contractData.selectioned = null;
      }
    },
    inputShow() {
      if (this.contractData.show) {
        this.contractData.show = false;
      } else {
        this.contractData.show = true;
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
        this.contractData.selectioned = row;
        this.contractData.index = this.tableData.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //取消
    cancel() {
      this.$router.push({
        //核心语句
        path: "/index/salesManage/salesIssueDoc" //跳转的路径
      });
    }
  },
  components: {
    componySelect,
    departmentSelect,
    customerSelect
  }
};
</script>
<style>
   .el-select .el-input__inner,.el-input .el-input__inner{
        font-size: 12px !important;
    }
     .el-select:hover .el-input__inner{
        border-color: #97999e !important;
    }
    .el-input--small .el-input__inner{
            border-color: #97999e !important;
        }
  .el-icon-search:before{
    font-size: 16px !important;
  }
        
</style>
<style lang="scss" scoped>
#contractDelivery {
  .el-dropdown {
    font-size: 12px;
    margin-right: 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .index-div3 {
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    text-align: left;
    margin-bottom: 10px;
    position: relative;
    min-height: 14px;
    .el-col-5 {
      width: 24%;
      position: relative;
      margin-top: 10px;
      margin-left: 10px;
    }
    .el-col-24 {
      margin-top: 10px;
      margin-left: 20px;
    }
    .el-col .el-inputs,
    .input-div .el-col .el-input__inner {
      font-size: 12px !important;
    }
    .el-col .el-select .el-input .el-input__inner {
      font-size: 12px !important;
    }
    .el-input,
    .el-select {
      width: 73%;
      font-size: 12px;
      .el-input__inner {
        font-size: 12px !important;
        width: 100%;
      }
    }
    .el-textarea {
      width: 92%;
      font-family: "MicrosoftYaHei";
      font-size: 12px;
    }
    //时间选择器
    .el-input2 {
      height: 32px;
      width: 73%;
       border-color: #909399 !important;
    }
    label {
      display: inline-block;
      width: 23%;
      text-align: left;
    }
    .el-col {
      .comicon {
        width: 73%;
        height: 20px;
        position: absolute;
        right: 16px;
        top: 7px;
        cursor: pointer;
        text-align: right;
        padding-right: 10px;
      }
      .el-col:last-child {
        margin-right: 0;
      }
    }
    .el-col-btn {
      margin: 10px;
      width: 100%;
      position: relative;
      margin-left: 0px !important;
      .button-div {
        margin: 0px auto;
        text-align: center;
      }
    }
    .hide-input {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 20px;
      width: 100%;
      cursor: pointer;
      .el-icon-d-caret {
        position: absolute;
        bottom: 0;
        left: 49.5%;
        font-size: 14px;
        color: #666;
      }
      .el-icon-d-caret:before {
        color: #999;
      }
    }
  }

  .addBut {
    height: 26px;
    padding: 0;
    width: 60px;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    background: #fff;
    border: 1px solid #31478f;
    color: #31478f;
    margin-left: 10px;
    margin-bottom: 8px;
  }
}
</style>
