<template>
  <div class="tabFifth">
    <div class="input-div input-div-bor bortop0"
         style="padding-left: 0;">
      <el-divider></el-divider>
      <div class="flex_center">
        <!-- <div class="button-div">
          <el-upload class="upload-demo"
                     :action="action"
                     :before-upload="beforeUpload"
                     :on-success="handleAvatarSuccess"
                     :headers="uploadHeaders"
                     :multiple="false"
                     :show-file-list="false">
            <el-button class="query-button olbutton">附件存档</el-button>
            <span style="vertical-align: middle;">文件上传上限20M</span>
          </el-upload>
        </div> -->
        <div class="button-div"
             style="width:100%">
          <el-upload class="upload-demo"
                     style="width:100%"
                     ref="newupload"
                     action="action"
                     :before-upload="beforeUpload"
                     :headers="uploadList.uploadHeaders"
                     :multiple="false"
                     :auto-upload="false"
                     :on-remove="handleRemove"
                     :limit="1"
                     :file-list="uploadList.fileList">
            <el-button slot="trigger"
                       style="color:#3E3F42;"
                       size="small"
                       icon="el-icon-paperclip">选取文件</el-button>
            <el-button style="margin-left: 10px;"
                       size="small"
                       class="addBut"
                       icon="el-icon-upload"
                       @click="submitUpload">上传</el-button>
          </el-upload>
        </div>
      </div>
      <div class="">
        <el-table border
                  center
                  :data="uploadList.tableList"
                  stripe
                  class="el-table">
          <el-table-column label="序号"
                           type="index"
                           show-overflow-tooltip
                           width="55">
          </el-table-column>
          <el-table-column show-overflow-tooltip
                           prop="fileOldName"
                           label="文件名称">
          </el-table-column>
           <el-table-column show-overflow-tooltip  label="类型">
            <template slot-scope="scope">
              {{scope.row.fileType==2?"双签":"普通"}}
            </template>
          </el-table-column>
          <!-- <el-table-column show-overflow-tooltip
                           label="类型">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fileType"
                        placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip
                           label="文档类型名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fileSuffix"
                        placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip
                           prop="signature"
                           label="签章情况">
          </el-table-column> -->
          <el-table-column show-overflow-tooltip
                           prop="createdTime"
                           label="上传时间">
            <template slot-scope="scope">
              {{scope.row.createdTime|time}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip
                           prop="createdBy"
                           label="上传人">
            <!-- <template slot-scope="scope">
              <el-input
                v-model="scope.row.createdBy" 
                placeholder="请输入内容"
              ></el-input>
            </template> -->
          </el-table-column>
          <el-table-column prop="paritiesDate"
                           label="文件操作">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"  @click="download(scope.row)">下载</el-button>
              <el-button @click="handleClick(scope.row)"
                         type="text"
                         size="small">删除</el-button>
              <!-- <el-button type="text"
                         size="small">预览</el-button>
              <el-button type="text"
                         size="small">打印</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/component";
import Bmange from "@/api/contractMange/bmange";
import { getFiles } from "@/api/contractMange/frameProtocol";
export default {
  name: "tabFifth",
  data () {
    return {
      action: "#", //'/oss',
      sysid: "ac3284d42dcdbc883c3b65981c4fa5e2", //文件上传的参数
      //附件上传
      uploadList: {
        tableList: [],
        fileList: [], //文件
        // sysid: "ac3284d42dcdbc883c3b6598c4fa5e2", //文件上传的参数
        uploadHeaders: { "content-Type": "multipart/form-data" } //文件上传的格式
      },
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      isChangeContract: false,//是否为变更订单
      isChange: null,
      tempTableData: [],//变更暂存
    };
  },
  created () {
    this.initData();
    //获取信息
  },
  methods: {
    initData () {
      let url = window.location.href;
      if (url.indexOf("contractId=") != -1) {
        if (url.indexOf("isChange=") != -1) {
          this.isChangeContract = true
          this.isChange = 1
        }
        let businessId = url.split("contractId=")[1];
        const subForm = new FormData();
        subForm.append("businessId", businessId);
        getFiles(subForm)
          .then(res => {
            this.uploadList.tableList = res.data;
          })
          .catch(() => { });
      }
    },
    //获取信息
    to () {
      let data
      if (!this.isChangeContract) {
        data = this.uploadList.tableList;
      } else {
        if (this.tempTableData) {
          data = this.uploadList.tableList.concat(this.tempTableData)
        } else {
          data = this.uploadList.tableList;
        }
      }
      return data;
    },
    //文件上传
    // beforeUpload (file) {
    //   let formdata = new FormData();
    //   formdata.append("file", file); //传文件
    //   formdata.append("_sysid_", this.sysid); //传其他参数
    //   api.uploadFile(formdata).then(res => {
    //     let list = {
    //       fileOldName: res.data.oldFilename,
    //       fileNewName: res.data.newFilename,
    //       fileType: 1, //文件类型
    //       rowno: (this.uploadList.tableList.length + 1) * 10,
    //       fileServerAddress: res.data.filePath
    //     };
    //     this.uploadList.tableList.unshift(list);
    //   });
    //   return false;
    // },
    //文件上传
    beforeUpload (file) {
      var that = this;
      let _this = this.uploadList;
      let formdata = new FormData();
      formdata.append("file", file); //传文件
      //formdata.append('_sysid_',_this.sysid);//传其他参数
      api.uploadFile(formdata).then(function (res) {
        if (res.code == "success") {
          _this.fileList = [];
          let fileData = res.data;
          var list = {
            fileOldName: fileData.oldFilename,
            fileNewName: fileData.newFilename,
            fileType: 1, //文件类型
            fileSuffix: fileData.fileExt,//文件扩展名
            // fileAbsolutePath:"",//文件绝对路径
            // fileRelativePaths:"",//文件相对路径
            // rowno: (this.uploadList.tableList.length + 1) * 10,
            fileServerAddress: fileData.filePath,//文件服务器地址
            createdTime: that.$nowDate(),
            isInactive: 0,//启用，禁用
            createdBy: sessionStorage.getItem("userName") || "admin",
          };
          _this.tableList.unshift(list);
        }
      });
      return false;
    },
    //确定上传
    submitUpload () {
      //确定上传
      this.$refs.newupload.submit();
    },
    //移除
    handleRemove (file, fileList) { },
    handleAvatarSuccess (res, file) {
      // eslint-disable-next-line no-console
      console.log(res, file);
    },
     //下载
    download(row) {
      window.open(row.fileServerAddress);
    },
    // 点击删除
    handleClick (e) {
      this.$confirm("确定删除吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.isChangeContract) {
            //非框架变更
            if (e.accessoryId) {
              let params = {
                accessoryId: e.accessoryId,
                version: e.version
              };
              Bmange.delFif(params)
                .then(res => {
                  // this.deleIndex(e, this.uploadList.tableList);
                  this.$openSuccess(res.message);
                  // this.uploadList.tableList.remove(e)
                  let index = this.uploadList.tableList.indexOf(e);
                  this.uploadList.tableList.splice(index, 1);
                })
                .catch();
            }
          } else {
            //框架变更    非调接口删除
            const temp = e
            temp.isInactive = 2
            console.log('this.tempTableData :', this.tempTableData);
            this.tempTableData.push(temp)
            let index = this.uploadList.tableList.indexOf(e);
            this.uploadList.tableList.splice(index, 1);
            this.$openSuccess('删除成功，变更后生效')
          }
        })
        .catch();
    },
    //删除方法
    deleIndex (e, list) {
      let del = list.findIndex(item => {
        return item.rowno == e.rowno || item.businessId == e.businessId;
      });
      list.splice(del, 1);
    }
  }
};
</script>

<style lang="scss">
// .tabFifth {
//   .el_flex {
//     display: flex;
//     align-items: center;
//   }

//   .el-date-editor.el-input {
//     width: auto;
//   }

//   .table_title {
//     font-weight: bold;
//     font-size: 16px;
//   }
//   .bcakfff {
//     background: #ffffff;
//     padding: 10px 0px;
//   }
//   .formBox {
//     display: flex;
//     align-items: center;
//     margin-bottom: 10px;
//     &:last-child {
//       margin-bottom: 0;
//     }
//     .lablel {
//       width: 103px;
//       text-align: right;
//       font-size: 12px;
//       padding-right: 20px;
//     }
//     .labelInput {
//       width: 200px;
//     }
//     .el-input__inner {
//       height: 30px;
//       width: 200px;
//     }
//     .el-input__icon {
//       line-height: 30px;
//     }
//     .el-select .el-input__inner {
//       width: 200px;
//     }
//   }
//   //   .flex_center {
//   //     display: flex;
//   //     margin-bottom: 0;
//   //     .table_title {
//   //       margin-bottom: 0;
//   //       margin-right: 10px;
//   //     }
//   //     .button-div {
//   //       margin: 0;
//   //     }
//   //   }
//   .el-tabs__item {
//     width: auto !important;
//   }
//   header {
//     font-size: 36px;
//     font-weight: bold;
//     text-align: center;
//     margin-bottom: 5px;
//   }
//   .el-col {
//     position: relative;
//     .comicon {
//       width: 170px;
//       height: 20px;
//       position: absolute;
//       right: 6px;
//       top: 7px;
//       cursor: pointer;
//     }
//     .absoLab {
//       position: absolute;
//       left: -4px;
//     }
//     .absdfzx {
//       position: absolute;
//       left: 0;
//       top: 0;
//     }
//   }
//   .input-div-bor {
//     border-bottom: 0;
//     margin-bottom: 0;
//     padding: 10px;
//   }
//   .bortop0 {
//     border-top: 0;
//   }

//   .el-tabs__header {
//     margin-bottom: 0;
//   }
//   .olbutton {
//     width: auto !important;
//     margin-right: 10px;
//   }
//   .el-input__inner {
//     height: 30px;
//     line-height: 30px;
//   }
//   .el-select__caret {
//     line-height: normal;
//   }
//   label {
//     position: relative;
//   }
// }
</style>
