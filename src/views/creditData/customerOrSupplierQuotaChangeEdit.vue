<template>
  <div id="customerOrSupplierQuotaChangeEdit">
    <!--操作按钮-->
    <div class="button-div">
      <el-button v-if="type!=3" icon="el-icon-suitcase" @click="save">保存</el-button>
      <el-button v-if="type!=3" icon="el-icon-close" @click="goBack">取消</el-button>
      <el-button v-if="type==3" icon="el-icon-back" @click="goBack">返回</el-button>
    </div>
    <el-tabs class="el-tabs" type="card" v-model="currTab">
      <el-tab-pane label="基本信息" name="basic">
        <div class="input-div">
          <el-form :disabled="type==3">
          <el-col :span="5" class="el-col el-col-required">
            <label><span class="must-full">*</span> 公司</label>
            <el-input v-model="companyInfo.companyName" :class="errorKey.includes('companyInfo') ? 'inputRed' : ''" class="el-inputs" placeholder="请选择" disabled></el-input>
            <span v-if="type==1" class="comicon" @click="companyPopup"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5" class="el-col">
                <label>申请日期</label>
                <el-date-picker v-model="applyTime" type="date" class="el-selects" placeholder="申请日期"></el-date-picker>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>申请单号</label>
            <el-input v-model="applyCode" class="el-inputs" disabled></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
                <label>状态</label>
                <el-select v-model="creditStatus" class="el-selects" placeholder="请选择" disabled>
                  <el-option v-for="(item, index) in statusList" :key="index" :label="item.dict_value" :value="item.dict_key"></el-option>
                </el-select>
          </el-col> 
          <el-col :span="24"  class="el-col-textarea">
              <label style="width:7.31%">备注</label>
              <el-input
                  type="textarea"
                  autosize
                  rows="2"
                  v-model="remark"
                  size="small"
                  class="el-textarea"
                  placeholder="请输入"
                  style="width:88%"
                  >
              </el-input>
          </el-col>
          </el-form>
        </div>
          <!-- 表格 -->
        <div class="button-div" v-if="type!=3" style="display: flex">
            <el-button class="addBut" icon="el-icon-plus"  @click="addRow()">添加行</el-button>
            <el-button class="addBut" @click="deleteRow()" icon="el-icon-minus" >删除行</el-button>
            <el-upload
                action="#"
                auto-upload
                :before-upload="itemBeforeUpload"
                :show-file-list="false"
                style="width: 64px;padding:0 6px 0 5px"
            >
                <el-button icon="el-icon-upload2">导入</el-button>
            </el-upload>
            <el-button   icon="el-icon-download" @click="downloadTemplate">客商额度调整模板下载</el-button>
        </div>
        <div class="el-table-div">
              <!-- 表格 -->
            <el-table border center  
                ref="table" 
                :data="tableData" 
                tooltip-effect="dark"
                max-height="320"
               @selection-change="handleChange"
                @select-all="singleSelect"
                @select="singleSelect"
                @row-dblclick="costDblclick"
                class="el-table">
                <el-table-column v-if="type!=3" type="selection" width="80" align="center"></el-table-column> 
                <el-table-column label="部门" width="178px" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <div v-if="scope.row.edit && !scope.row.id && type!=3">
                      <el-input v-model="scope.row.branchName" size="small" class="el-inputs"  placeholder="请选择" disabled></el-input>
                      <span  class='comicon2' @click="departmentTip"><i class="el-icon-search" ></i></span>
                    </div>
                    <div v-else>
                      {{ scope.row.branchName }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="客商类型" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <div v-if="scope.row.edit && !scope.row.id && type!=3">
                        <el-select v-model="scope.row.custSupplyType" @change="changeType" clearable >
                          <el-option value='' label="请选择"></el-option>
                          <el-option :value="0" label="客户"></el-option>
                          <el-option :value="1" label="供应商"></el-option>
                        </el-select>
                    </div>
                    <div v-else>
                      {{scope.row.custSupplyType==1?"供应商":(scope.row.custSupplyType===0?"客户":'')}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="客商名称" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <div v-if="scope.row.edit && !scope.row.id && type!=3">
                      <el-input v-model="scope.row.custSupplyName" size="small" class="el-inputs"  placeholder="请选择" disabled></el-input>
                      <span  class='comicon2' @click="supplierPopup"><i class="el-icon-search" ></i></span>
                    </div>
                    <div v-else>
                      {{ scope.row.custSupplyName }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="appliedAmt" label="已审批额度金额"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="授信有效期" width="178px" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <div>
                      {{ scope.row.grantingStart | time2Date}}至{{scope.row.grantingEnd | time2Date}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="taxAmt" label="调整额度金额"  :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <div v-if="scope.row.edit && type!=3">
                      <el-input
                      type="number"
                        v-model="scope.row.alterAmt"
                        size="mini"
                        class="el-inputs"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                    <div v-else>
                      {{ scope.row.alterAmt }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="备注"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.edit && type!=3">
                      <el-input
                        v-model="scope.row.remark"
                        size="mini"
                        class="el-inputs"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                    <div v-else>
                      {{ scope.row.remark }}
                    </div>
                  </template>
                </el-table-column>
            </el-table>
        </div>
      </el-tab-pane>
       <el-tab-pane label="打印及附件" name="attachment">
        <div class="el-table-div">
          <div class="button-div" v-if="type!=3">
            <el-upload
              class="upload-demo"
              ref="newupload"
              action="#"
              :before-upload="beforeUpload"
              :headers="uploadList.uploadHeaders"
              :multiple="false"
              :auto-upload="false"
              :on-remove="handleRemove"
              :limit="1"
              :file-list="uploadList.fileList"
            >
              <el-button
                slot="trigger"
                style="color:#3E3F42;"
                size="small"
                icon="el-icon-paperclip"
                type="button"
                >选取文件</el-button
              >
              <el-button
                style="margin-left: 10px;"
                size="small"
                class="addBut"
                icon="el-icon-upload"
                @click="submitUpload"
                >上传</el-button
              >
            </el-upload>
          </div>
          <el-table
            :data="uploadList.tableList"
            ref="table2"
            tooltip-effect="dark"
            border
            stripe
            style="width: 100%"
            @select-all="dialogCheckTable"
            @select="dialogCheckTable"
            @selection-change="handleChangeTableTable"
          >
            <el-table-column
              type="selection"
              width="45"
              align="center"
            ></el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column prop="fileOldName" label="文件名称">
            </el-table-column>
            <el-table-column prop="createdTime" label="上传时间">
            </el-table-column>
            <el-table-column prop="createdName" label="上传人"> </el-table-column>
            <el-table-column label="操作" v-if="type!=3">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="download(scope.row)">下载</el-button>
                    <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="delFile(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--公司弹窗-->
    <company-select v-if="companyShow" :tipShow="companyShow" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
    <merchants
      v-if="supplierShow" 
      :companyCode="companyInfo.companyCode"
      :orgCode="orgCode"
      :custSupplyType="custSupplyType"
      :tipShow="supplierShow"  
      @supplierCancle="supplierCancel" 
      @supplierSure="supplierSure"
    ></merchants>
     <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :data="companyInfo"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    >
    </department-select>
  </div>
</template>
<script>
import companySelect from "@/components/componySelect";
import api from "@/api/creditData/credit";
import uploadApi from "@/api/component";
import merchants from "./components/supplierOrCustomer";
import departmentSelect from "@/components/departmentSelect.vue";
import { Message, Loading } from "element-ui";
export default {
  name: "customerOrSupplierQuotaChangeEdit",
  data() {
    return {
      errorKey: [],
      //基本信息
      companyInfo:{},
      companyShow: false, //是否显示公司弹窗
      uploadList: {
        tableList:[],
        fileList:[], //文件
        sysid: "ac3284d42dcdbc883c3b6598c4fa5e2", //文件上传的参数
        uploadHeaders: { "content-Type": "multipart/form-data" } //文件上传的格式
      },
      currTab: "basic",
      statusList:[],
      creditStatus:'',//状态
      remark:'',//备注
      creditAmt:'',//信用额度金额
      applyCode:'',
      applyTime:"",
      type:'',//type 1,添加 ，2 修改，3查看
      merchantsId:'',
      version:'',
      departmentShow:false,
      selectIndex:'',
      tableData:[],
      supplierShow:false,
      orgCode:'',
      custSupplyType:'',
    };
  },
  components: {
    companySelect,
    departmentSelect,
    merchants
  },
  created() {
    this.getStatusData();
    this.type=this.$route.query.type;
    this.merchantsId=this.$route.query.merchantsId;
    if(this.merchantsId){
      this.getDetailData();
    }
     
  },

  methods: {
    //查看数据
    getDetailData(){
      let data={
        id:this.merchantsId
      }
      api.selectCmCompanyCreditGrantingById(data).then(res=>{
        let data=res.data;
        this.companyInfo={
          companyCode:data.companyCode,
          companyName:data.companyName,
          companyId:data.companyId
        };
        this.creditStatus=data.creditStatus;
        this.applyTime=data.applyTime;
        this.applyCode=data.applyCode;
        this.version=data.version;
        this.remark=data.remark;
        this.getDetailInfo(data.id);
        this.selectFileList(data.id);
      
      })
    },
    //查询明细
    getDetailInfo(id){
      api.selectCmCompanyCreditGrantingItemsList({grantingId:id}).then(res=>{
        this.tableData=res.data.list;
      })
    },
    addRow(){
      this.tableData.forEach(e=>{
        e.edit=false;
      })
      let obj={
        edit:false,
        id:'',
        branchName:'',
        branchCode:'',
        branchId:'',
        custSupplyType:'',
        custSupplyId:'',
        custSupplyCode:'',
        custSupplyName:'',
        appliedAmt:'',
        grantingStart:'',
        grantingEnd:'',
        alterAmt:'',
        remark:'',
        limitId:'',
        limitVersion:'',
      }
      this.tableData.unshift(obj);
    },
    deleteRow(){
      if(this.selectIndex===''){
        this.$openWarning("请选择要删除单据");
        return;
      }
      this.$confirm("是否确定删除?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        if(this.tableData[this.selectIndex].id){
          api.deleteCmCompanyCreditGrantingItems({id:this.tableData[this.selectIndex].id,
          version:this.tableData[this.selectIndex].version}).then(res=>{
            if(res.code=="success"){
              this.$openSuccess(res.message);
              this.tableData.splice(
                this.selectIndex,1);
              // 删除完数据之后清除勾选框
              this.$refs.table.clearSelection();
            }else{
              this.$openWarning(res.message);
            }
          })
        }else{
          this.tableData.splice(
            this.selectIndex,1);
          // 删除完数据之后清除勾选框
          this.$refs.table.clearSelection();
        }
        
      });
      
    },
    //模板下载
    downloadTemplate() {
      api
        .exportTemplate()
        .then(res => {
          console.log(res.data);
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename = "客商额度调整导入模板.xls";
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch();
    },
    //导入
    itemBeforeUpload(file) {
      if (JSON.stringify(this.companyInfo) == "{}" || this.companyInfo == "") {
        this.$openWarning("请选择公司");
        return false;
      }
        //使用Element loading-start 方法
      var loading= Loading.service({
        lock: true,
        text: "处理中...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
      let formdata = new FormData();
      formdata.append("companyCode", this.companyInfo.companyCode);
      formdata.append("file", file); //传文件
      api.importCmCompanyCreditGrantingItems(formdata).then(res => {
        if (res.code == "success") {
          let list=res.data;
          list.forEach(e=>{
            e.remark='';
            e.edit=false;
            e.id='';
          });
          this.tableData=this.tableData.concat(list);
          this.$openSuccess(res.message);
        } else {
          this.$openWarning(res.message);
        }
      });
       
    },
     //审核状态字典
    getStatusData() {
      api.dicQuery({
        dictNo: 1165
      }).then(res => {
        this.statusList = res.data;
      }).catch();
    },
    save(){
      this.errorKey=[];
      if(!Object.keys(this.companyInfo).length){
        this.errorKey.push('companyInfo')
      }
      if(this.errorKey.length>0){
        this.$openWarning('请将必填项补充完整！')
        return false;
      }
      if(this.tableData.length==0){
         this.$openWarning('明细不能为空！');
         return;
      }
      for(let i=0;i<this.tableData.length;i++){
        let obj=this.tableData[i];
        if(obj.branchName==='' || obj.custSupplyType==='' || obj.cust_supply_name===''){
          this.$openWarning('请将明细信息填写完整！');
          return;
        }
      }
      let data={
        companyCode: this.companyInfo.companyCode,
        companyName: this.companyInfo.companyName,
        companyId:this.companyInfo.companyId,
        creditStatus:this.creditStatus,
        applyCode:this.applyCode,
        applyTime:this.applyTime,
        remark:this.remark,
        id:this.merchantsId,
        version:this.version,
        saveCmCompanyCreditGrantingItemsFormList:this.tableData,
        sysSystemAccessoryList:this.uploadList.tableList,//附件上传
      }
       api.saveCmCompanyCreditGranting(data).then(res => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
             this.$router.push({  
                path:'/index/creditData/customerOrSupplierQuotaChange', //跳转的路径    
            })
           ;
          } else {
            this.$openWarning(res.message);
          }
        }).catch();
    },
    //取消
    goBack() {
       this.$router.push({  
                path:'/index/creditData/customerOrSupplierQuotaChange', //跳转的路径    
            });
           
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
    //部门弹窗打开
    departmentTip() {
      if (!Object.keys(this.companyInfo).length) {
        this.$openWarning("请先选择公司");
        return false;
      }
      this.departmentShow = true;
    },
    //部门弹窗关闭
    departmentCancle() {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure(e) {
      this.departmentShow = false;
      this.tableData[this.selectIndex].branchName=e.branchName;
      this.tableData[this.selectIndex].branchId=e.branchId;
      this.tableData[this.selectIndex].branchCode=e.branchCode;
      this.orgCode=e.branchCode;
      //this.basicData.staffName={};
    },
    //改变状态
    changeType(e){
      this.custSupplyType=e;
    },
    //供应商弹窗
    supplierPopup() {
      if(!Object.keys(this.companyInfo).length || this.orgCode==='' 
      || this.custSupplyType===''){
        this.$openWarning("请先选择公司,部门,客商类型");
        return false;
      }
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancel() {
      this.supplierShow = false;
    },
    //供应商弹窗确定并传值
    supplierSure(e) {
      this.supplierShow = false;
      this.tableData[this.selectIndex].appliedAmt=e.appliedAmt;
      this.tableData[this.selectIndex].custSupplyCode=e.custSupplyCode;
      this.tableData[this.selectIndex].custSupplyId=e.custSupplyId;
      this.tableData[this.selectIndex].custSupplyName=e.custSupplyName;
      this.tableData[this.selectIndex].grantingEnd=e.grantingEnd;
      this.tableData[this.selectIndex].grantingStart=e.grantingStart;
      this.tableData[this.selectIndex].limitId=e.limitId;
      this.tableData[this.selectIndex].limitVersion=e.limitVersion

    },
    //查询附件
    selectFileList(id){
       let data = {
        businessId: id
      };
      uploadApi.selectFileList(data)
        .then(res => {
          if (res.code == "success") {
            this.uploadList.tableList=res.data;
            this.uploadList.tableList.forEach(element => {
               element.createdTime=this.$timeFun(element.createdTime, true);
            });
          } else {
            this.$openWarning(res.message);
          }
        }).catch();
    },
    //打印及附件表格
    dialogCheckTable() {},
    //打印及附件表格
    handleChangeTableTable() {},
     //文件上传
    beforeUpload(file) {
      var that = this;
      let _this = this.uploadList;
      let formdata = new FormData();
      formdata.append("file", file); //传文件
      //formdata.append('_sysid_',_this.sysid);//传其他参数
      uploadApi.uploadFile(formdata).then(function(res) {
        if (res.code == "success") {
          _this.fileList = [];
          let fileData=res.data;
          let obj = {
            fileOldName: fileData.oldFilename,
            fileNewName: fileData.newFilename,
            fileType:"", //文件类型
            fileSuffix:fileData.fileExt,//文件扩展名
            // fileAbsolutePath:"",//文件绝对路径
            // fileRelativePaths:"",//文件相对路径
            fileServerAddress: fileData.filePath,//文件服务器地址
            createdTime: that.$nowDate(),
            isInactive:0,//启用，禁用
            createdName:sessionStorage.getItem("userName") || "admin",
          };
          _this.tableList.unshift(obj);
        }
      });
      return false;
    },
    //确定上传
    submitUpload() {
      //确定上传
      this.$refs.newupload.submit();
    },
    //移除
    handleRemove(file, fileList) {
      //  console.log(file, fileList);
    },
    //预览
    download(row){
      window.open(row.fileServerAddress);
    },
    //附件删除
    delFile(index,row){
       this.$confirm("是否确定删除？",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
        //没有保存
        if(row.accessoryId){
          let data = {
            accessoryId:row.accessoryId,
            version:row.version
          };
          uploadApi.delFif(data)
            .then(res => {
              if (res.code == "success") {
              this.$openSuccess(res.message);
              this.uploadList.tableList.splice(index,1);
              // this.selectFileList(row.businessId);
              } else {
                this.$openWarning(res.message);
              }
            }).catch();
          }else{
            this.uploadList.tableList.splice(index,1);
            this.$openSuccess("删除成功");
          }
      }).catch();  
    },
    //费用信息列表双击编辑行
    costDblclick(e) {
      this.$refs.table.clearSelection();
      this.tableData.forEach(item => {
        item.edit = e == item ? true : false;
      });
      this.custSupplyType=e.custSupplyType;
      this.branchCode=e.branchCode;
      this.selectIndex=this.tableData.indexOf(e);
      this.$refs.table.toggleRowSelection(e, true);
      this.$set(this.tableData, this.tableData.indexOf(e), e);
    },
    //列表单选
    handleChange(e) {
      if (e.length === 0) {
        this.selectIndex = null;
      }
    },
    singleSelect(selection, row) {
      this.$refs.table.clearSelection();
      if (selection.length === 0) {
        return;
      }
      if (row) {
        this.selectIndex = this.tableData.indexOf(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
    },
    singleSelectRow(e) {
      this.selectIndex = this.tableData.indexOf(e);
      this.$refs.table.toggleRowSelection(e);
    },
 
  }
};
</script>
<style lang="scss">
.index .inputRed .el-input--small .el-input__inner{
  border: 2px solid;
  border-color: #ee2e37a8 !important;
}
.index .el-col-required  .inputRed .el-input.is-disabled .el-input__inner{
  border: 2px solid;
  border-color: #ee2e37a8 !important;
}
.index  .inputRed .el-input__inner,
.index .inputRed .el-input.is-disabled .el-input__inner
{
   border: 2px solid;
  border-color: #ee2e37a8 !important;
}
// .index .el-col-required .el-input.is-disabled .el-input__inner{
//     background-color: #d9e8fd !important;
// }
#customerOrSupplierQuotaChangeEdit{
  .input-div .el-col-24{
  width: 100%;
  text-align: left;
}
}

</style>
