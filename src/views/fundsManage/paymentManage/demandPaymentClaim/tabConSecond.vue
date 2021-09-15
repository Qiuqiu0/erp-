<template>
  <div class="tabFifth content-div2 contract_css_link">
    <el-form :disabled='quChange'>
    <div class="input-div input-div-bor bortop0">
      <div class="flex_center">
        <div class="button-div" style="display:flex;">
          <el-upload
            class="upload-demo"
            :action="action"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            :headers="uploadHeaders"
            :multiple="false"
            ref="newupload"
            :auto-upload="false"
            :limit="1"
            :file-list="fileList"
          >
            <el-button
              slot="trigger"
              class="addBut"
              size="small"
              type="button"
              icon="el-icon-paperclip"
            >选取文件</el-button>
            <el-button
              size="small"
              class="addBut"
              type="button"
              @click="submitUpload"
              icon="el-icon-upload"
            >上传</el-button>
           
          </el-upload>
        
        </div>
      </div>
      <div class>
        <el-table border center :data="tableData" class="el-table">
        
          <el-table-column label="序号" type="index" width="55" show-overflow-tooltip></el-table-column>
          <el-table-column show-overflow-tooltip prop="fileOldName" label="文件名称"></el-table-column>
        
          <el-table-column show-overflow-tooltip prop="createdTime" label="上传时间">
            <template slot-scope="scope">
              <div>
                {{ $timeFun(scope.row.createdTime, 1) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="createdName" label="上传人"></el-table-column>
          <el-table-column prop="paritiesDate" label="文件操作" width="235">
            <template slot-scope="scope">
              <el-button @click="down(scope.row)" type="text" size="small">下载</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
             
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/component";
import Cmange from "@/api/contractMange/cmange";
import "@/assets/css/contract.scss";
export default {
  name: "tabConSecond",
  data() {
    return {
      action: "#", //'/oss',
      sysid: "ac3284d42dcdbc883c3b65981c4fa5e2", //文件上传的参数
      uploadHeaders: { "content-Type": "multipart/form-data" }, //文件上传的格式
      tableData: [],
      fileList: [],
      quChange: false //是否为变更合同
    };
  },
  created() {
    if (this.$route.params.change) {
      this.quChange = true;
    }
    //获取信息
    this.id && this.getDetail();
  },
  methods: {
    //获取信息
    getDetail() {
      let params = {
        businessId: this.id
      };
      Cmange.getFif(params)
        .then(res => {
          this.tableData = res.data;
        })
        .catch();
    },
    to() {
      let data = this.tableData;
      this.$emit("get", data, 8);
    },
    //文件上传
    beforeUpload(file) {
      let formdata = new FormData();
      formdata.append("file", file); //传文件
      api.uploadFile(formdata).then(res => {
        let list = {
          fileOldName: res.data.oldFilename,
          fileNewName: res.data.newFilename,
          fileType: 1, //文件类型
          rowno: (this.tableData.length + 1) * 10,
          fileServerAddress: res.data.filePath,
          createdName: sessionStorage.getItem("userName") || "admin",
          createdTime: this.$nowDate()
        };
        this.tableData.unshift(list);
      });
      return false;
    },
    //确定上传
    submitUpload() {
      //确定上传
      this.$refs.newupload.submit();
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
    },
    //下载
    down(e) {
      window.open(e.fileServerAddress);
   
    },
    // 点击删除
    handleClick(e) {
      this.$confirm("确定删除吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!e.accessoryId) {
            this.deleIndex(e, this.tableData);
            return false;
          }
          let params = {
            accessoryId: e.accessoryId,
            version: e.version
          };
          Cmange.delFif(params)
            .then(res => {
              this.deleIndex(e, this.tableData);
              this.$openSuccess(res.message);
            })
            .catch();
        })
        .catch();
    },
    //删除方法
    deleIndex(e, list) {
      let del = list.findIndex(item => {
        return item.rowno == e.rowno && item.businessId == e.businessId;
      });
      list.splice(del, 1);
    }
  }
};
</script>

<style lang="scss">
</style>