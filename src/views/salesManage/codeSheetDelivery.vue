<template>
  <el-dialog :visible.sync="codeSheetList.tipShow" title="选择列表" :show-close="false" :before-close="cancel()" width="1100px" class="popup_box">
        <div class="index" id="codeSheetDelivery">
          <!--按钮样式-->
          <div class="button-div">
              <el-button @click="initCodeSheetList()" class="query-button" icon="el-icon-search">查询</el-button>
              <el-button @click="resetCodeSheetList()">重置</el-button>
          </div>
          <div class="index-div3">
              <p class="hide-input" @click="inputShow()">
                <i class="el-icon-d-caret"></i>
              </p>
              <div  v-show="codeSheetList.show">
                  <h3 style="padding:10px">码单发货</h3>
                  <el-col :span="5" class="el-col">
                      <label>仓库</label>
                      <el-select clearable  size="small" class="el-select"  v-model="codeSheetList.warehouseCode" placeholder="请选择" >
                        <el-option v-for="item in codeSheetList.warehouseList"
                                    :key="item.warehouseCode"  
                                    :label="item.warehouseName"
                                    :value="item.warehouseCode"
                            ></el-option>
                      </el-select>
                  </el-col>
                  <el-col :span="5" class="el-col">
                      <label>公司</label>
                       <el-select clearable  size="small" class="el-select"   v-model="codeSheetList.companyId" @change="getBranchByCompanyId()" placeholder="请选择" >
                        <el-option v-for="item in codeSheetList.companyList"
                                    :key="item.companyId"  
                                    :label="item.companyName"
                                    :value="item.companyId"
                            ></el-option>
                      </el-select>
                  </el-col>
                  <el-col :span="5" class="el-col">
                      <label>部门</label>
                     <el-select clearable  size="small" class="el-select"  v-model="codeSheetList.branchId" placeholder="请选择" >
                        <el-option v-for="item in codeSheetList.orgList"
                                    :key="item.branchId"  
                                    :label="item.branchName"
                                    :value="item.branchId"
                            ></el-option>
                      </el-select>
                  </el-col>
                  <el-col :span="5" class="el-col">
                      <label>客户</label>
                      <el-select clearable  size="small" class="el-select"  v-model="codeSheetList.customerId" placeholder="请选择" >
                        <el-option v-for="item in codeSheetList.custList"
                                    :key="item.customerId"  
                                    :label="item.customerName"
                                    :value="item.customerId"
                            ></el-option>
                      </el-select>
                  </el-col>
                  <el-col :span="5" class="el-col">
                      <label>码单号</label>
                      <el-input  class="el-inputs" v-model="codeSheetList.dockSoNo" size="small"  placeholder="请选择"></el-input>
                  </el-col> 
                  <el-col :span="5" class="el-col">
                      <label>发货日期</label>
                      <el-date-picker
                          class="el-input2"
                          v-model="sendDateTime"
                          type="daterange"
                          size="mini"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['00:00:00', '23:59:59']"
                          >
                      </el-date-picker>
                  </el-col>
                <el-col :span="5" class="el-col">
                      <label>外部码单号</label>
                      <el-input  class="el-inputs" v-model="codeSheetList.dockExtNo" size="small"  placeholder="请选择"></el-input>
                  </el-col>
                  <el-col :span="5" class="el-col">
                      <label>车号</label>
                      <el-input  class="el-inputs" v-model="codeSheetList.carNo" size="small"  placeholder="请选择"></el-input>
                  </el-col>
                  <el-col :span="5" class="el-col">
                      <label>船号</label>
                      <el-input  class="el-inputs" v-model="codeSheetList.shipNo" size="small"  placeholder="请选择"></el-input>
                  </el-col>
              </div>
          </div>
          <div class="el-table-div">
              <el-table border center  
                  ref="multipleTable"
                  :data="codeSheetList.tableData" 
                  tooltip-effect="dark"
                  @select-all="dialogCheck" 
                  @selection-change="handleChange" 
                  @row-click="rowClick"
                  class="el-table" v-loading="loading">
                  <el-table-column type="selection" width="45" align="center"></el-table-column> 
                  <el-table-column type="index" width="50" label="序号">
                  </el-table-column>
                  <el-table-column prop="warehouseName" label="仓库" width="120px"  :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="custName" label="客户" width="120px" :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="dockSoNo" label="码单号" width="150px" :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="rowNo" label="码单行号" width="150px" :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="sendDate" label="发货日期" width="120px"  :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="goodsCode" label="物料编号" :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="goodsName" label="物料名称" :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="goodsCat" label="物料大类" :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="goodsSpec" label="物料规格" :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="unitName" label="基础单位" :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="itemQty" label="数量">
                  </el-table-column>
                  <el-table-column prop="secUnit" label="第二单位">
                  </el-table-column>
                  <el-table-column prop="secQty" label="第二数量">
                  </el-table-column>
                  <el-table-column prop="currencyCode" label="币种" :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="originPrice" label="单价">
                  </el-table-column>
                  <el-table-column prop="originAmt" label="含税金额">
                  </el-table-column>
                  <el-table-column prop="remark" label="备注" width="120px" :show-overflow-tooltip="true">
                  </el-table-column>
              </el-table>
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="pageNum" :page-sizes="[100, 200, 300,500]" :page-size="codeSheetList.pageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="codeSheetList.total">
              </el-pagination>
          </div>
          <div class="button-div2">
              <el-button @click="toEidtPage()" class="query-button">确定</el-button>
              <el-button  @click="cancel()">取消</el-button>
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
import warehouseSelect from "@/components/warehouseSelect.vue";
export default {
  name: "codeSheetDelivery",
  data() {
    return {
    codeSheetList:{
        tipShow:false,
        companyId:'', //公司名
        companyList:[],
        branchId:'', //部门
        orgList:[],
        warehouseCode:'', //仓库名称
        warehouseList:[],
        customerId:'', //客户名称
        custList:[],
        dockSoNo:"",//码单号
        dockExtNo:"",//外部码单号
        sendDate:"",//发货日期
        shipNo:"",//船号
        carNo:"",//车号
        sendDateTime: [], //发货日期
        show: true, //查询条件显示隐藏
        selectioned:[], //选中
        loading: false,
        tableData: [],
        pageSize:100,
        pageNum:1,
        total:0,

    }  
    };
  },
  created(){
    this.initCodeSheetList();
  },
  methods: {
      rowClick(row){
        this.$refs.multipleTable.toggleRowSelection(row);
    },
    //码单信息查询
    initCodeSheetList(){
      var that=this.codeSheetList;
      if(that.companyId){
        var companyId=that.companyId;
      }
      if(that.branchName.branchName){
        var branchId=that.branchName.branchCode;
      }
      if(that.warehouseCode){
        var warehouseCode=that.warehouseCode;
      }
      if(that.customerId){
        var customerId=that.customerId;
      }
      if(that.dockSoNo){
        var dockSoNo=that.dockSoNo;
      }
      if(that.sendDateTime.length){
        var sendDate=that.sendDateTime[0];
        var sendDateEnd=that.sendDateTime[1];
      }
      if(that.dockExtNo){
        var dockExtNo=that.dockExtNo;
      }
      if(that.carNo){
        var carNo=that.carNo;
      }
      if(that.shipNo){
        var shipNo=that.shipNo;
      }
      let data={
          pageSize:that.pageSize,
          pageNum:that.pageNum,
          companyId:companyId,//公司
          branchId:branchId,//部门
          custCode:custCode,//客户
          warehouseCode:warehouseCode,//仓库
          sendDate:sendDate,//发货开始日期
          sendDateEnd:sendDateEnd,//发货结束日期
          carNo:carNo,//车号
          shipNo:shipNo,//船号
          dockExtNo:dockExtNo,//外部码单号
          dockSoNo:dockSoNo,//码单号
        }
        sApi.socketDockSoList(data).then(res=>{
          if(res.code="success"){
              this.total=res.total;  
              let list=res.data;
              for(let i=0;i<list.length;i++){
                  list[i].sendDate=this.$timeFun(list[i].sendDate,true);
              }
              this.tableData=list;
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
    toEidtPage(){
      localStorage.removeItem("ids");
      if (this.codeSheetList.selectioned.length==0) {//判断是否选中
          this.$message({
              duration: 1000,
              showClose: true,
              message: '未选择数据',
              type: 'warning'
          });
        return;
      }
      var warehouse=this.codeSheetList.selectioned[0].warehouseCode;
      var ids=[];//获取码单明细id
      ids.push(this.codeSheetList.selectioned[0].dockItemsId);
      for(let i=1;i<this.codeSheetList.selectioned.length;i++){
        if(this.codeSheetList.selectioned[i].warehouseCode!=warehouse){
           this.$message({
              duration: 1000,
              showClose: true,
              message: '请选择同一个仓库的数据',
              type: 'warning'
          });
          return;
        }
        ids.push(this.codeSheetList.selectioned[i].dockItemsId);
        
      }
      localStorage.setItem("ids",JSON.stringify(ids));
      this.$router.push({  //核心语句
          path:"/index/salesManage/retailShipment", //跳转的路径
          query:{type:3}  
      })
    },
    //获取仓库
        getWarehouseList(){
             let data={};
           sApi.getBbWarehouseListSimple(data).then(res => {
				    this.codeSheetList.warehouseList = res.data;
            }).catch(); 
        },
        //获取公司列表
        getCompanyList(){
            let data={};
           sApi.selectBbCompanyBase(data).then(res => {
				      this.codeSheetList.companyList = res.data;
            }).catch(); 
        },
         //根据公司的id获取部门
        getBranchByCompanyId(e){
            console.log(e);
            let data={
                companyId:this.codeSheetList.companyId
            }
            sApi.selectBbBranch(data).then(res => {
				      this.codeSheetList.branchList = res.data;
            }).catch(); 
        },
        //获取客户
        getCustomerList(){
            let data={};
           sApi.selectCustomerList(data).then(res => {
				      this.codeSheetList.customerList = res.data;
            }).catch(); 
        },
    //分页
    handleSizeChange(val) {
      this.codeSheetList.pageSize = val;
      this.initCodeSheetList();
    },
    handleCurrentChange(val) {
      this.codeSheetList.pageNum = val;
      this.initCodeSheetList();
    },
    //表格选择
    handleChange(e) {
      this.codeSheetList.selectioned = e;
    },
    inputShow() {
      if (this.codeSheetList.show) {
        this.codeSheetList.show = false;
      } else {
        this.codeSheetList.show = true;
      }
    },
    resetCodeSheetList(){
      this.codeSheetList.pageSize=10,
      this.codeSheetList.pageNum=1,
      this.codeSheetList.companyId='';
      this.codeSheetList.branchId='';
      this.codeSheetList.customerId='';
      this.codeSheetList.warehouseCode='';
      this.codeSheetList.sendDateTime=[];
      this.codeSheetList.dockSoNo='';
      this.codeSheetList.dockExtNo='';
      this.codeSheetList.carNo='';
      this.codeSheetList.shipNo='';
    },
    //表格单选
    dialogCheck(selection, row) {
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.codeSheetList.selectioned = row;
        this.codeSheetList.index = this.codeSheetList.tableData.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //取消
    cancel() {
      this.codeSheetList.tipShow=false;
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
    .el-icon-search:before{
    font-size: 16px !important;
  }
</style>
<style lang="scss" scoped>
#codeSheetDelivery {
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
