<template>
  <div id="supplierCreditEdit">
    <!--操作按钮-->
    <div class="button-div">
      <el-button icon="el-icon-suitcase" @click="save">保存</el-button>
      <el-button icon="el-icon-close" @click="goBack">取消</el-button>
    </div>
    <el-tabs class="el-tabs" type="card" v-model="currTab">
      <el-tab-pane label="基本信息" name="basic">
        <div class="input-div">
          <el-row>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 公司</label>
              <el-input v-model="companyInfo.companyName" :class="errorKey.includes('companyInfo') ? 'inputRed' : ''" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="moreIcon" @click="companyPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 部门</label>
              <el-input v-model="branchInfo.branchName" :class="errorKey.includes('branchInfo') ? 'inputRed' : ''" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="moreIcon" @click="branchPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span>业务员</label>
              <el-input v-model="salesman.empName" :class="errorKey.includes('empName') ? 'inputRed' : ''" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="moreIcon" @click="staffPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>申请单号</label>
              <el-input v-model="applyCode" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 申请日期</label>
              <el-date-picker v-model="applyDate" :class="errorKey.includes('applyDate') ? 'inputRed' : ''" type="date" class="el-selects" placeholder="申请日期"></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 供应商代码</label>
              <el-input v-model="supplierInfo.supplierCode" :class="errorKey.includes('supplierInfo') ? 'inputRed' : ''" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="moreIcon" @click="supplierPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 供应商名称</label>
              <el-input v-model="supplierInfo.supplierName" :class="errorKey.includes('supplierInfo') ? 'inputRed' : ''" class="el-inputs" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col el-col-required">
              <label class="text_too_long"><span class="must-full">*</span> 是否受额度管控</label>
              <el-select v-model="isControlled" :class="errorKey.includes('isControlled') ? 'inputRed' : ''" class="el-selects" placeholder="请选择">
                <el-option v-for="(item, index) in isControlledDic" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col el-col-required" v-if="isMust">
              <label class="text_too_long"><span class="must-full">*</span> 授信有效期开始</label>
              <el-date-picker v-model="startTime" :class="errorKey.includes('startTime') ? 'inputRed' : ''" type="date" class="el-selects" placeholder="开始日期" :picker-options="startPicker"></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col" v-else>
              <label class="text_too_long">授信有效期开始</label>
              <el-date-picker v-model="startTime" type="date" class="el-selects" placeholder="开始日期" :picker-options="startPicker"></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col el-col-required" v-if="isMust">
              <label class="text_too_long"><span class="must-full" >*</span> 授信有效期结束</label>
              <el-date-picker v-model="endTime" :class="errorKey.includes('endTime') ? 'inputRed' : ''" type="date" class="el-selects" placeholder="结束日期" :picker-options="endPicker"></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col"  v-else>
              <label class="text_too_long"> 授信有效期结束</label>
              <el-date-picker v-model="endTime" type="date" class="el-selects" placeholder="结束日期" :picker-options="endPicker"></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>状态</label>
              <el-select v-model="auditStatus" class="el-selects" placeholder="请选择" disabled>
                <el-option v-for="(item, index) in auditStatusDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col el-col-required">
              <label class="text_too_long"><span class="must-full">*</span> 审批信用额度</label>
              <el-input v-model="creditAmt" :class="errorKey.includes('creditAmt') ? 'inputRed' : ''" class="el-inputs" :oninput="creditAmt = $filterPriceNum(creditAmt, 2)"></el-input>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 额度账期</label>
              <el-input v-model="creditNo" :class="errorKey.includes('creditNo') ? 'inputRed' : ''" class="el-inputs" :oninput="creditNo = creditNo == 0 ? '' : (creditNo + '').replace(/[^\d]/g, '') * 1"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>业务币种</label>
              <el-input v-model="coin.currencyCode" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="moreIcon" @click="coinTip"><i class="el-icon-search"></i></span>
            </el-col>
          </el-row>
          <el-row>
             <el-col :span="20" class="el-col-textarea">
              <label style="width:7.4%;vertical-align: 8px;">备注</label>
              <el-input  
              type="textarea"
              autosize
              v-model="remark"
              size="small"
              class="el-textarea"
              ></el-input>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="打印及附件" name="attachment">
        <div class="el-table-div">
          <div class="button-div">
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
            <!-- <el-table-column prop="fileType" label="类型"> </el-table-column>
            <el-table-column prop="fileType" label="文档类型名称">
            </el-table-column>
            <el-table-column prop="fileType" label="签章情况">
            </el-table-column> -->
            <el-table-column prop="createdTime" label="上传时间">
            </el-table-column>
            <el-table-column prop="createdName" label="上传人"> </el-table-column>
            <el-table-column label="操作">
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
                    <!-- <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="download(scope.row)">预览</el-button>
                    <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="download(scope.row)">打印</el-button> -->
                </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--公司弹窗-->
    <company-select v-if="companyShow" :tipShow="companyShow" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
    <!--部门弹窗-->
    <branch-select v-if="branchShow" :tipShow="branchShow" :data="companyInfo" @departmentCancle="branchCancel" @departmentSure="branchSure"></branch-select>
    <!--供应商弹窗-->
    <supplier-select v-if="supplierShow" :tipShow="supplierShow" :filterQuery="parentFilter" @supplierCancle="supplierCancel" @supplierSure="supplierSure"></supplier-select>
    <!--业务员弹窗-->
    <staff-select v-if="staffShow" :tipShow="staffShow" @staffCancle="staffCancel" @staffSure="staffSure"></staff-select>
     <!-- 选择币种弹窗 -->
    <coin-select v-if="coinShow" :tipShow="coinShow" @coinCancle="coinCancle" @coinSure="coinSure"></coin-select>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CreditApi from "@/api/creditData/credit";
import uploadApi from "@/api/component";
import staffSelect from "@/components/staffSelect";
import companySelect from "@/components/componySelect";
import branchSelect from "@/components/departmentSelect";
import supplierSelect from "@/components/supplierSelect";
import coinSelect from "@/components/coinSelect.vue";//币别
export default {
  name: "supplierCreditEdit",
  data() {
    return {
      errorKey: [],
      currTab: "basic",
      //基本信息
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      branchInfo: "",
      branchShow: false, //是否显示部门弹窗
      applyCode: "",
      applyDate: "",
      supplierInfo: "",
      supplierShow: false, //是否显示供应商弹窗
      parentFilter: {
        isSubsidiary: 0 //只过滤出母公司供应商
      },
      isControlled: "",
      isControlledDic: [
        {value: "0", label: "是"},
        {value: "1", label: "否"}
      ],
      isMust: false,
      startTime: "",
      startPicker: {}, //限制授信有效期(结束)
      endTime: "",
      endPicker: {}, //限制授信有效期(开始)
      auditStatus: "",
      auditStatusDic: [], //审核状态字典
      creditAmt: "",
      creditNo: "",
      currencyCode: "",
      currencyDic: [], //业务币种字典
      remark: "",
      creditInfo: {}, //原基本信息
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      uploadList: {
        tableList:[],
        fileList:[], //文件
        sysid: "ac3284d42dcdbc883c3b6598c4fa5e2", //文件上传的参数
        uploadHeaders: { "content-Type": "multipart/form-data" } //文件上传的格式
      },
      staffShow: false, //是否显示业务员弹窗
      salesman:{},//业务员
      coinShow: false, //币种弹窗
      coin:{},//币种
    };
  },
  created() {
    //审核状态字典
    this.auditStatusData();
    //业务币种下拉列表
    // this.currencySelect();
    //获取供应商信用额度详情
    if (this.$route.query.id) {
      this.supplierCreditDetail();
    }
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //获取供应商信用额度详情
    supplierCreditDetail() {
      CreditApi.supplierCreditList({
        supplierCreditId: this.$route.query.id
      }).then(res => {
        this.creditInfo = res.data.list[0];
        this.companyInfo = {
          companyCode: this.creditInfo.companyCode,
          companyName: this.creditInfo.companyName,
          companyId:this.creditInfo.companyId
        }
        this.branchInfo = {
          branchCode: this.creditInfo.orgCode,
          branchName: this.creditInfo.orgName,
          branchId:this.creditInfo.orgId,
        }
        this.applyCode = this.creditInfo.applyCode;
        this.applyDate = this.creditInfo.applyDate;
        this.supplierInfo = {
          supplierCode: this.creditInfo.supplierCode,
          supplierName: this.creditInfo.supplierName,
          supplierId:this.creditInfo.supplierId
        }
        this.salesman.empName = this.creditInfo.bizName;
        this.isControlled = this.creditInfo.isControlled + "";
        this.startTime = this.creditInfo.creditBegintime;
        this.endTime = new Date(this.creditInfo.creditEndtime - 24 * 3600000 + 1000);
        this.auditStatus = this.creditInfo.auditStatus + "";
        this.creditAmt = this.creditInfo.creditAmt;
        this.creditNo = this.creditInfo.creditNo;
        this.coin.currencyCode = this.creditInfo.currencyCode;
        this.remark = this.creditInfo.remark;
        this.selectFileList(this.$route.query.id);
      }).catch();
    },
    //查询附件
    selectFileList(id){
       let data = {
        businessId: this.$route.query.id
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
    //审核状态字典
    auditStatusData() {
      CreditApi.dicQuery({
        dictNo: 1030
      }).then(res => {
        this.auditStatusDic = res.data;
        if (!this.$route.query.id) {
          this.auditStatus = this.auditStatusDic[0].dict_code;
        }
      }).catch();
    },
    // //业务币种下拉列表
    // currencySelect() {
    //   CreditApi.currencySelect().then(res => {
    //     this.currencyDic = res.data;
    //     if (!this.$route.query.id) {
    //       this.currencyDic.forEach(item => {
    //         if (item.currencyShort == "CNY") {
    //           this.currencyCode = item.currencyCode;
    //         }
    //       });
    //     }
    //   }).catch();
    // },
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
    //保存
    save() {
      this.errorKey = [];
      let keyArr = ['companyInfo', 'branchInfo', 'applyDate', 'supplierInfo', 'isControlled', 'creditAmt', 'creditNo'];
      keyArr.forEach(item => {
        if(!this[item] || (item == 'applyDate' && this[item] === null)) {
          this.errorKey.push(item);
        }
      })
      if (this.salesman.empName == "") {
        this.errorKey.push('empName');
      }
      if (this.isControlled == "0" && this.startTime == "") {
        this.errorKey.push('startTime');
      }
      if (this.isControlled == "0" && this.endTime == "") {
        this.errorKey.push('endTime');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("请将必填项补充完整！");
        return false;
      }
     
      this.$confirm("是否确定保存？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      }).then(() => {
        let params = {
          companyCode: this.companyInfo.companyCode,
          companyName: this.companyInfo.companyName,
          companyId:this.companyInfo.companyId,
          orgCode: this.branchInfo.branchCode,
          orgName: this.branchInfo.branchName,
          orgId:this.branchInfo.branchId,
          bizName:this.salesman.empName,
          bizCode:this.salesman.empCode,
          applyCode: this.applyCode,
          applyDate: this.applyDate,
          supplierCode: this.supplierInfo.supplierCode,
          supplierName: this.supplierInfo.supplierName,
          supplierId:this.supplierInfo.supplierId,
          isControlled: this.isControlled,
          creditBegintime: this.startTime,
          creditEndtime: new Date(this.endTime.getTime() + 24 * 3600000 - 1000),
          auditStatus: this.auditStatus,
          creditAmt: this.creditAmt,
          creditNo: this.creditNo,
          currencyCode: this.coin.currencyCode,
          sysSystemAccessoryList:this.uploadList.tableList,//附件上传
          remark: this.remark
        };
        if (this.$route.query.id) {
          params.supplierCreditId = this.creditInfo.supplierCreditId;
          params.version = this.creditInfo.version;
          CreditApi.supplierCreditUpdate(params).then(res => {
            if (res.code == "success") {
              this.$openSuccess(res.message);
              this.$router.push({name: "supplierCredit"});
            } else {
              this.$openWarning(res.message);
            }
          }).catch();
        } else {
          CreditApi.supplierCreditInsert(params).then(res => {
            if (res.code == "success") {
              this.$openSuccess(res.message);
              this.$router.push({name: "supplierCredit"});
            } else {
              this.$openWarning(res.message);
            }
          }).catch();
        }
      });
    },
    //取消
    goBack() {
      this.$router.push({name: "supplierCredit"});
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
      this.branchInfo = "";
    },
    //部门弹窗
    branchPopup() {
      // if (this.companyInfo == "") {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
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
    },
    //币种弹窗打开
    coinTip() {
      this.coinShow = true;
    },
    //币种弹窗关闭
    coinCancle() {
      this.coinShow = false;
    },
    //币种弹窗确定获取数据
    coinSure(e) {
      this.coinShow = false;
      this.coin = e;
    },
    //业务员弹窗
    staffPopup() {
      this.staffShow = true;
    },
    //业务员弹窗关闭
    staffCancel() {
      this.staffShow = false;
    },
    //业务员弹窗确定并传值
    staffSure(e) {
      this.staffShow = false;
      this.salesman = e;
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
    }
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  watch: {
    isControlled(val) {
      if (val == 0) { //是否受额度管控若选择是，授信有效期必输
        this.isMust = true;
      } else {
        this.isMust = false;
      }
    },
    startTime(val) {
      if (val != null && val != "") {
        this.endPicker = {
          disabledDate(time) {
            return time.getTime() < val;
          }
        };
      } else {
        this.startTime = "";
        this.endPicker = {
          disabledDate(time) {
            return false;
          }
        };
      }
    },
    endTime(val) {
      if (val != null && val != "") {
        this.startPicker = {
          disabledDate(time) {
            return time.getTime() > val;
          }
        };
      } else {
        this.endTime = "";
        this.startPicker = {
          disabledDate(time) {
            return false;
          }
        };
      }
    },
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    }
  },
  components: {
    companySelect,
    branchSelect,
    supplierSelect,
    staffSelect,
    coinSelect
  }
};
</script>
<style lang="scss">
#supplierCreditEdit {
    .el-textarea {
      width:91.5%;
      font-size: 12px;
    }

    textarea {
      border-color: #909399 !important;
    }
  .el-row {
    margin-left: 10px;
  }
  .el-col {
    position: relative;
    margin: 0;
    padding: 8px 0 10px 10px;
    .moreIcon {
      width: 65%;
      height: 24px;
      position: absolute;
      top: 10px;
      right: 0;
      padding: 4px 5px;
      cursor: pointer;
    }
  }
  .el-col:nth-child(4n-1),
  .el-col:nth-child(4n-2) {
    margin-left: 10px;
  }
  .el-col:nth-child(4n) {
    margin-left: -20px;
  }
  .is-disabled {
    .el-input__inner {
      color: #666;
      cursor: pointer;
    }
  }
  label {
    display: inline-block;
    width: 35%;
    vertical-align: middle;
  }
  .el-inputs,
  .el-selects {
    width: 65% !important;
    .el-input__inner {
      width: 100%;
    }
  }
  .el-col-20 {
    width: 96%;
  }
  .el-full {
    label {
      width: 8.5%;
    }
    .el-inputs {
      width: 91.5% !important;
      .el-input__inner {
        width: 100%;
      }
    }
  }
  .text_too_long {
    position: absolute;
    width: 42%;
    line-height: 24px;
    margin-left: -42%;
  }
}
</style>