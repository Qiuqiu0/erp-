<template>
  <div id="projectMaintenanceEdit" class="content-div2">
    <!--按钮样式-->
    <div class="button-div">
      <el-button
        v-if="!dataInfo.projectId && type != 3"
        class="query-button"
        @click="saveData(1)"
        icon="el-icon-suitcase">保存</el-button
      >
      <el-button v-else-if="type != 3" class="query-button" icon="el-icon-suitcase" @click="saveData(2)"
        >保存</el-button
      >
      <el-button v-if="type != 3" @click="cancel()" icon="el-icon-close">取消</el-button>
      <el-button v-if="type == 3" @click="cancel()" icon="el-icon-back">返回</el-button>
    </div>
    <el-form :disabled="type == 3" action="">
    <div class="index-div3">
      <el-col :span="12" class="el-col-required">
        <label> <span class="must-full">*</span>项目编码 </label>
        <el-input
          class="el-input"
          :class="errorKey.includes('projectCode') ? 'inputRed' : ''"
          type="text"
          v-if="!dataInfo.projectId"
          size="small"
          v-model="dataInfo.projectCode"
          @input="handleProjectCode(dataInfo.projectCode)"
          placeholder="请输入"
        ></el-input>
        <el-input
          class="el-input"
          :class="errorKey.includes('projectCode') ? 'inputRed' : ''"
          v-else
          size="small"
          type="text"
          :disabled="true"
          v-model="dataInfo.projectCode"
          @input="handleProjectCode(dataInfo.projectCode)"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="12" class="el-col-required">
          <label><span class="must-full">*</span>公司</label>
          <el-input v-model="dataInfo.conName.companyName" :class="errorKey.includes('conName') ? 'inputRed' : ''" class="el-inputs" size="small" placeholder="请选择" disabled></el-input>
          <span v-if="type!=3" class='comicon' @click="componyTip"><i class="el-icon-search" ></i></span>
      </el-col>
      <el-col :span="12" class="el-col-required">
        <label> <span class="must-full">*</span>项目名称 </label>
        <el-input
          size="small"
          class="el-input"
          :class="errorKey.includes('projectName') ? 'inputRed' : ''"
          v-model="dataInfo.projectName"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!-- <el-col :span="12">
          <label><span class="must-full">*</span>客户名称</label>
          <el-input  class="el-inputs" v-model="dataInfo.custName.customerName" size="small" placeholder="请选择" disabled></el-input>
          <span class='comicon' @click="customerTips"><i class="el-icon-search" ></i></span>
      </el-col> -->
      <el-col :span="12">
        <label>项目说明</label>
        <el-input
          class="el-input"
          size="small"
          v-model="dataInfo.projectExplain"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="12">
        <label>项目所在地</label>
        <el-input
          class="el-input"
          size="small"
          v-model="dataInfo.projectAddress"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="12" class="el-col-required">
        <label> <span class="must-full">*</span>项目类型 </label>
        <el-select
          clearable
          size="small"
          class="el-select"
          :class="errorKey.includes('projectType') ? 'inputRed' : ''"
          v-model="dataInfo.projectType"
          placeholder="请选择"
        >
          <el-option
            v-for="item in projectTypeList"
            :key="item.dict_code"
            :label="item.dict_value"
            :value="item.dict_code"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="12" class="el-col-required">
        <label> <span class="must-full">*</span>项目状态 </label>
        <el-select
          clearable
          size="small"
          class="el-select"
          :class="errorKey.includes('isInactive') ? 'inputRed' : ''"
          v-model="dataInfo.isInactive"
          placeholder="请选择"
        >
          <el-option
            v-for="item in propertiesList"
            :key="item.status"
            :label="item.label"
            :value="item.status"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="12" class="el-col-required">
        <label> <span class="must-full">*</span>项目有效期 </label>
        <el-date-picker
          class="el-input2"
          :class="errorKey.includes('time') ? 'inputRed' : ''"
          v-model="time"
          type="daterange"
          size="mini"
          range-separator="—"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-col>
    </div>
    </el-form>
    <!-- 表格 -->
    <div class="el-table-div">
      <div class="button-div">
        <el-upload
          class="upload-demo"
          ref="newupload"
          action="#"
          :before-upload="beforeUpload"
          :headers="uploadHeaders"
          :multiple="false"
          :auto-upload="false"
          :on-remove="handleRemove"
          :limit="1"
          :file-list="fileList"
          v-if="type != 3"
        >
          <el-button
            slot="trigger"
            class="addBut"
            size="small"
            icon="el-icon-paperclip"
            type="button"
            style="margin-right:10px"
            >选取文件</el-button
          >
          <el-button
          size="small"
          class="addBut"
          type="button"
          icon="el-icon-upload"
          @click="submitUpload"
          >上传</el-button
        >
        </el-upload>
      </div>
      <el-table
        :data="tableList"
        ref="table"
        tooltip-effect="dark"
        border
        stripe
        style="width: 100%"
        @select-all="dialogCheck"
        @select="dialogCheck"
        @selection-change="handleChangeTable"
        max-height="300"
      >
        <el-table-column
          v-if="type != 3"
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
        <el-table-column prop="fileOldName" label="文件名称"></el-table-column>
        <!-- <el-table-column prop="fileType" label="文件类型"></el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">下载</el-button>
              <el-button v-if="type!= 3" size="mini" type="text"  @click="delData(scope.$index, scope.row)">删除</el-button>
              <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">预览</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">打印</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    
     <!-- 选择公司弹窗 -->
    <compony-select :ztz='ztz' v-if="dataInfo.componyShow" :tipShow='dataInfo.componyShow' @tipsCancle="tipsCancle" @tipsSure="tipsSure">
    </compony-select>
    <!--选择销售客户 -->
    <customer-select v-if="dataInfo.customerShow" :tipShow='dataInfo.customerShow'  @customerCancle="customerCancle" @customerSure="customerSure">
    </customer-select>
  </div>
</template>
<script>
import ExApi from "@/api/basicData/supplier";
import componySelect from "@/components/componySelect.vue";
import customerSelect from "@/components/customerSelect.vue";
import api from "@/api/component";
export default {
  name: "projectMaintenanceEdit",
  data() {
    return {
      errorKey: [],
      ztz: 0,
      dataInfo: {
        projectCode: "", //项目代码
        projectName: "", //项目名称
        isInactive: 0, //项目状态
        projectExplain: "", //项目说明
        projectAddress: "", //地址
        endTime: "", //开始时间
        beginTime: "", //结束时间
        conName:{}, //公司名称
        componyShow:false,
        projectType: "", //项目类型
        customerShow:false,//客户弹窗
        custName:{},//客户名称
        projectId: "", //修改时页面传过来的id
        version: 0,
      },
      time: [], //时间
      customerList: [], //客户
      projectTypeList: [], //项目类型
      companyList: [], //公司数据
      propertiesList: [
        //项目状态
        {
          status: 0,
          label: "启用"
        },
        {
          status: 1,
          label: "禁用"
        }
      ],
      tableList: [], //列表
      deleteList: [], //列表删除的数据
      selectioned: null, //表格选中项
      type:"", //页面类型，1新增，2修改，3查看
      fileList: [], //文件
      sysid: "ac3284d42dcdbc883c3b65981c4fa5e2", //文件上传的参数
      uploadHeaders: { "content-Type": "multipart/form-data" } //文件上传的格式
    };
  },
  created(){
    this.projectTypeData();
    this.type = this.$route.query.type;
    if (localStorage.getItem("projectId") && this.type != 1) {
      this.dataInfo.projectId = localStorage.getItem("projectId");
      this.initData(); //修改初始化
    }
  },
  components: {
    componySelect,
    customerSelect,
  },
  methods: {
     //公司弹窗打开
    componyTip() {
        this.dataInfo.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
        this.dataInfo.componyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
        this.dataInfo.componyShow = false;
        this.dataInfo.conName = e;
    },
    //项目类型
    projectTypeData() {
      let data = {
        dictNo: 1005
      };
      ExApi.dicQuery(data)
        .then(res => {
          this.projectTypeList = res.data;
        })
        .catch();
    },
   //销售客户弹窗
    customerTips(){
        this.dataInfo.customerShow = true;
    },
      //销售客户弹窗关闭
    customerCancle() {
        this.dataInfo.customerShow = false;
    },
    //销售客户弹窗确定获取数据
    customerSure(e) {
        this.dataInfo.customerShow = false;
        this.dataInfo.custName = e;
    },
    //验证代码格式
    handleProjectCode(value){
      value = value.replace(/[^\w^\.]+/g, '').replace('.', '')
      this.dataInfo.projectCode= value;
    },
    //文件上传
    beforeUpload(file) {
      let _this = this;
      let formdata = new FormData();
      formdata.append("file", file); //传文件
      //formdata.append("_sysid_", _this.sysid); //传其他参数
      api.uploadFile(formdata).then(function(res) {
        if (res.code =="success") {
          _this.fileList = [];
          var list = {
            fileOldName: res.data.oldFilename,
            fileNewName: res.data.newFilename,
            fileType:"", //文件类型
            fileServerAddress: res.data.filePath
          };
          _this.tableList.unshift(list);
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
    //修改时列表的数据
    initData() {
      let data = {
        projectId: this.dataInfo.projectId,
        pageNum: 1,
        pageSize: 1
      };
      ExApi.projectList(data)
        .then(res => {
          if (res.code == "success") {
            this.dataInfo.projectName = res.data.list[0].projectName;
            this.dataInfo.projectCode = res.data.list[0].projectCode;
            if (res.data.list[0].projectType != null) {
              //转换为字符串
              this.dataInfo.projectType = "" + res.data.list[0].projectType;
            }
            this.dataInfo.projectAddress = res.data.list[0].projectAddress;//地址
            this.dataInfo.projectExplain = res.data.list[0].projectExplain;//说明
            // this.dataInfo.custName.customerName=res.data.list[0].customerName;//客户
            // this.dataInfo.custName.customerId=res.data.list[0].customerId;
            this.dataInfo.conName.companyName=res.data.list[0].companyName;//公司
            this.dataInfo.conName.companyId=res.data.list[0].companyId;
            this.dataInfo.isInactive = res.data.list[0].isInactive;
            this.time.push(res.data.list[0].beginTime);
            this.time.push(res.data.list[0].endTime);
            this.dataInfo.version = res.data.list[0].version; //获取版本号，修改时用
            this.dataInfo.projectId = res.data.list[0].projectId; //id同理
            this.getEnclosureList();
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //附件列表
    getEnclosureList() {
      let data = {
        businessId: this.dataInfo.projectId
      };
      ExApi.enclosureList(data)
        .then(res => {
          if (res.code == "success") {
            this.tableList = res.data;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.message,
              type: "error"
            });
          }
        })
        .catch();
    },
    // 删除
    delData(index, row) {
      this.$confirm("是否确定删除?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.type == 2) {
            //修改
            this.deleteList.push(this.tableList[index]);
            this.deleteList.forEach(item => {
              item.isInactive = 2;
            });
          }
          this.tableList.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
  //handleClick
  handleClick(e){
    //下载
    window.open(e.fileServerAddress);
  },
    //取消
    cancel() {
      this.$router.push({
        //核心语句
        path: "/index/basicData/projectMaintenance" //跳转的路径
      });
    },

    //保存数据
    saveData(type) {
      //type 1新增 2修改
      this.errorKey = [];
      if (this.dataInfo.projectCode == "") {
        this.errorKey.push('projectCode');
      }
      if (this.dataInfo.projectName == "") {
        this.errorKey.push('projectName');
      }
      if (this.dataInfo.projectType == "") {
        this.errorKey.push('projectType');
      }
      if(this.time.length) {
        this.dataInfo.beginTime = this.time[0];
        this.dataInfo.endTime = this.time[1];
      } else {
        this.errorKey.push('time');
      }
      if(JSON.stringify(this.dataInfo.conName) === '{}') {
        this.errorKey.push('conName');
      }else{
        this.dataInfo.companyId=this.dataInfo.conName.companyId;
        this.dataInfo.companyName=this.dataInfo.conName.companyName;
      }
      if(this.errorKey.length > 0) {
        this.$openWarning('请将必填项补充完整！');
        return false;
      }
      let list = [];
      let url = "";
      this.tableList.forEach(item => {
        list.push(item);
      });
      if (type == 1) {
        url = ExApi.insertProject;
      } else {
        //修改时加上删除的数据
        this.deleteList.forEach(item => {
          list.push(item);
        });
        url = ExApi.projectUpdate;
      }
      let data = this.dataInfo;
      data.list = list;
      url(data).then(res => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
            this.cancel();
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
   
    //表格选择
    handleChangeTable(e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },

    //表格单选
    dialogCheck(selection, row) {
      this.$refs.table.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.tableList.indexOf(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
    }
  }
};
</script>
<style>
.el-select:hover .el-input__inner {
  border-color: #97999e !important;
}
.el-input--small .el-input__inner {
  border-color: #97999e !important;
}

.el-select .el-input__inner,
.el-input .el-input__inner {
  font-size: 12px !important;
}
</style>
<style lang="scss" scoped>
input {
  background: #fff;
}
.index .el-col-12 {
  width: 36%;
  margin-top: 10px;
  position: relative;

}
.index-div3 {
  width: 97%;
  overflow: hidden;
  background: #ffffff;
  text-align: left;
  padding-left: 3%;
  padding-bottom: 20px;
  margin-bottom: 10px;
  .el-input,
  .el-select {
   
    width: 50%;
    .el-input__inner {
      font-size: 12px;
      width: 100%;
    }
  }
  .el-input2 {
    height:24px;
    width: 50%;
    background: #fff;
    .el-range-input {
      font-size: 12px;
      background-color: #fff !important;
    }
    border-color: #909399 !important;
  }
  label {
    display: inline-block;
    width: 21%;
    text-align: right;
  }
  label:after{content: "："}
  .must-full {
    display: inline-block;
    margin-left: -7%;
  }
  .el-date-editor {
    .el-range__close-icon {
      width: 0;
    }
    .el-range-input {
      font-size: 12px;
    }
    .el-range-separator {
      width: 12%;
      padding: 0;
      line-height: 18px;
      font-size: 12px;
    }
    .el-range__icon {
      position: relative;
    }
    .el-icon-date:before {
      position: absolute;
      top: -5px;
      left: 3px;
    }
  }
  .el-col .comicon {
    width: 50%;
    height: 20px;
    position: absolute;
    left: 19%;
    top: 3px;
    cursor: pointer;
    text-align: right;
    padding-right: 6px;
  }
  
}

.el-table-add-row {
  margin-top: 10px;
  width: 100%;
  height: 34px;
  border: 1px dashed #c1c1cd;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  line-height: 34px;
}
.addBut {
 height: 26px;
      padding: 0;
      width: auto;
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      background: rgba(234,236,242,0);
      border: none;
      color: #3e3f42;
      padding: 0 6px 0 5px;
      margin-bottom: 0;
}
.addBut:hover,.addBut:active{
    color:#3E3F42;
    border:none;
    background:rgba(234,236,242,0);
    transform: scale(1.2);
  }
  .addBut:active{
    color:#3E3F42;
  }

</style>
