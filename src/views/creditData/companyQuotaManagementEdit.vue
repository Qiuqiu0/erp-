<template>
  <div id="creditGroupCreditEdit">
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
            <span class="comicon" @click="companyPopup"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5" class="el-col">
                <label>申请日期</label>
                <el-date-picker v-model="applyTime" type="date" class="el-selects" placeholder="申请日期"></el-date-picker>
            </el-col>
          <el-col :span="5" class="el-col el-col-required">
            <label><span class="must-full">*</span> 年度</label>
            <el-date-picker
              class="el-inputs"
              v-model="creditYear"
              align="right"
              size="small"
              type="year"
              value-format="yyyy"
               :class="errorKey.includes('creditYear') ? 'inputRed' : ''"
              format="yyyy"
              placeholder="年份"
            ></el-date-picker>
          </el-col>
          <el-col :span="5" class="el-col el-col-required">
              <label class="text_too_long"><span class="must-full">*</span> 信用额度</label>
              <el-input v-model="creditAmt" :class="errorKey.includes('creditAmt') ? 'inputRed' : ''" class="el-inputs" :oninput="creditAmt = $filterPriceNum(creditAmt, 2)"></el-input>
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
  </div>
</template>
<script>
import companySelect from "@/components/componySelect";
import api from "@/api/creditData/credit";
import uploadApi from "@/api/component";
export default {
  name: "companyQuotaManagementEdit",
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
      creditYear:'',
      creditStatus:'',//状态
      remark:'',//备注
      creditAmt:'',//信用额度金额
      applyCode:'',
      applyTime:"",
      type:'',//type 1,添加 ，2 修改，3查看
      quotaId:'',
      version:'',
    };
  },
  created() {
    this.getStatusData();
    this.type=this.$route.query.type;
    this.quotaId=this.$route.query.quotaId;
    if(this.quotaId){
      this.getDetailData();
    }
     
  },

  methods: {
    //查看数据
    getDetailData(){
      let data={
        id:this.quotaId
      }
      api.selectCmCompanyCreditList(data).then(res=>{
        let data=res.data.list;
        if(data.length){
          this.companyInfo={
            companyCode:data[0].companyCode,
            companyName:data[0].companyName,
            companyId:data[0].companyId
          };
          this.creditYear=data[0].creditYear;
          this.creditAmt=data[0].creditAmt;
          this.creditStatus=data[0].creditStatus;
          this.applyTime=data[0].applyTime;
          this.applyCode=data[0].applyCode;
          this.version=data[0].version;
          this.remark=data[0].remark;
          this.selectFileList(data[0].id);
        }
      })
    },
     //审核状态字典
    getStatusData() {
      api.dicQuery({
        dictNo: 1164
      }).then(res => {
        this.statusList = res.data;
      }).catch();
    },
    save(){
      this.errorKey=[];
      if(!Object.keys(this.companyInfo).length){
        this.errorKey.push('companyInfo')
      }
      if(!this.creditYear){
        this.errorKey.push("creditYear");
      }
       if(!this.creditAmt){
        this.errorKey.push("creditAmt");
      }
      
      if(this.errorKey.length>0){
        this.$openWarning('请将必填项补充完整！')
        return false;
      }
      let data={
        companyCode: this.companyInfo.companyCode,
        companyName: this.companyInfo.companyName,
        companyId:this.companyInfo.companyId,
        creditYear:this.creditYear,
        creditAmt:this.creditAmt,
        creditStatus:this.creditStatus,
        applyCode:this.applyCode,
        applyTime:this.applyTime,
        remark:this.remark,
        id:this.quotaId,
        version:this.version,
         sysSystemAccessoryList:this.uploadList.tableList,//附件上传
      }
       api.saveCmCompanyCredit(data).then(res => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
              this.$router.push({  
                path:'/index/creditData/companyQuotaManagement', //跳转的路径    
            });
           
          } else {
            this.$openWarning(res.message);
          }
        }).catch();
    },
    //取消
    goBack() {
        this.$router.push({  
                path:'/index/creditData/companyQuotaManagement', //跳转的路径    
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
 
  },

  components: {
    companySelect,
 
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
#creditGroupCreditEdit{
  .input-div .el-col-24{
  width: 100%;
  text-align: left;
}
}

</style>
