<template>
  <div v-loading="synchronousLoading"
       class="credentialsTemplate">
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search"
                 class="query-button"
                 @click="queryList"> 查询</el-button>
      <el-button icon="el-icon-refresh"
                 @click="clearNone">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
      <p class="hide-input" v-if="queryArea" @click="queryAreaShow()">更多条件<i class="el-icon-caret-bottom"></i></p>
      <p class="hide-input" v-else @click="queryAreaShow()">收起<i class="el-icon-caret-top"></i></p>
      <div class="search-div">
        <el-col :span="5"
                class="el-col">
          <label>公司</label>
          <el-input v-model="companyData.companyName"
                    class="el-inputs"
                    placeholder="请选择"
                    disabled></el-input>
          <span class="comicon"
                @click="componyTip"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>业务类型</label>
          <el-select clearable
                     filterable
                     v-model="formData.bizTypeList"
                     placeholder="请选择"
                     class="el-select"
                     multiple
                     collapse-tags
                     >
            <el-option v-for="item in bizTypeList"
                       :key="item.dict_key"
                       :label="item.dict_value"
                       :value="item.dict_key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>模板名称</label>
          <el-input v-model="formData.templateName"
                    class="el-inputs"
                    placeholder="请输入"></el-input>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>模板状态</label>
          <el-select clearable
                     v-model="formData.templateStatus"
                     placeholder="请选择"
                     class="el-select">
            <el-option v-for="item in binaryList"
                       :key="item.dict_key"
                       :label="item.dict_value"
                       :value="item.dict_key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5"
                class="el-colc">
          <label>模板编号</label>
          <el-input v-model="formData.templateCode"
                    class="el-inputs"
                    placeholder="请输入"></el-input>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>业务类别</label>
          <el-select clearable
                     v-model="formData.bizBirthplaceList"
                     placeholder="请选择"
                     class="el-select"
                     multiple
                     collapse-tags
                     >
            <el-option v-for="item in bizBirthplaceList"
                       :key="item.dict_key"
                       :label="item.dict_value"
                       :value="item.dict_key">
            </el-option>
          </el-select>
        </el-col>
      </div>
    </div>
    <!-- <el-divider></el-divider> -->
    <div class="button-div auto-sibling">

      <el-button icon="el-icon-folder-add"
                 @click="addFun" >创建</el-button>

      <el-button icon="el-icon-delete"
                 @click="handleTemplateStatus(2)" v-if="$actionFlag(`F003`)">删除</el-button>
   
      <el-button icon="el-icon-edit"
                 @click="editFun" v-if="$actionFlag(`F002`)">修改</el-button>

      <el-button icon="el-icon-data-line"
                 @click="checkFun" v-if="$actionFlag(`F004`)">查看</el-button>
    
      <el-button icon="el-icon-unlock"
                 @click="handleTemplateStatus(0)" v-if="$actionFlag(`F005`)">启用</el-button>
      
      <el-button icon="el-icon-lock"
                 @click="handleTemplateStatus(1)" v-if="$actionFlag(`F006`)">禁用</el-button>
     
      <el-button icon="el-icon-refresh"
                 @click="handleSubjectSynchronous" v-if="$actionFlag(`F007`)">用友科目同步</el-button>
 
      <el-button icon="el-icon-refresh"
                 @click="handleAssistSynchronous"  v-if="$actionFlag(`F008`)" >用友辅助项同步</el-button>
      <!-- v-if="$actionFlag(`F009`)" -->
      <el-button icon="el-icon-refresh"
                v-if="$actionFlag(`F009`)"
                 @click="handleCodeSynchronous">用友流量码同步</el-button>
      <!-- <el-button icon="el-icon-refresh" v-if="$actionFlag(`F009`)" @click="synchronization('sl')">
        金蝶税率同步
      </el-button> -->
    </div>
    <!-- 表格 -->
    <div class="el-table-div"
         v-auto>
      <el-table ref="table"
                center
                border
                height="calc(100% - 35px)"
                :data="tableData"
                class="el-table"
                tooltip-effect="dark"
                @select="handleTableDataSelect"
                @select-all="handleTableDataSelectAll"
                @row-click="handleTableDataclick"
                @row-dblclick="handleTableDataDblclick"
                v-loading="loading">
        <el-table-column type="selection"
                         width="55"> </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         width="60px"
                         prop="rowNo"
                         label="序号"> </el-table-column>
        <el-table-column width="100px"
                         :show-overflow-tooltip="true"
                         prop="templateCode"
                         label="模板编号"> </el-table-column>
        <el-table-column width="180px"
                         :show-overflow-tooltip="true"
                         prop="templateName"
                         label="模板名称"> </el-table-column>
        <el-table-column width="120px"
                         :show-overflow-tooltip="true"
                         prop="companyName"
                         label="公司名称"> </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="bizBirthplace"
                         width="80px"
                         label="业务类别">
          <template slot-scope="scope">
            <span v-for="item in bizBirthplaceList"
                  :key="item.dict_key"
                  v-show="item.dict_key==scope.row.bizBirthplace">
              {{item.dict_value}}
            </span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="bizType"
                         width="100px"
                         label="业务类型">
          <template slot-scope="scope">
            <span v-for="item in bizTypeList"
                  :key="item.dict_key"
                  v-show="item.dict_key==scope.row.bizType">
              {{item.dict_value}}
            </span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         width="80px"
                         prop="templateStatus"
                         label="模板状态">
          <template slot-scope="scope">
            <span v-for="item in binaryList"
                  :key="item.dict_key"
                  v-show="item.dict_key==scope.row.templateStatus">
              {{item.dict_value}}
            </span>
          </template></el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="createdTime"
                         width="120"
                         label="创建日期">
          <template slot-scope="scope">
            {{scope.row.createdTime|time2Date}}
          </template>
        </el-table-column>
        <el-table-column width="120px"
                         :show-overflow-tooltip="true"
                         prop="updatedTime"
                         label="修改日期">
          <template slot-scope="scope">
            {{scope.row.updatedTime|time2Date}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="remark"
                         label="备注"> </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageNum"
                     :page-sizes="[100, 200, 300,500]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
      <!-- 选择公司弹窗 -->
      <compony-select v-if="componyShow"
                      :tipShow="componyShow"
                      @tipsCancle="tipsCancle"
                      @tipsSure="tipsSure">
      </compony-select>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue"; //公司组件
import {
  getDicList,
  selectWarrantTemplateList,
  updateWarrantTemplateStatus,
  saveCashflow,
  saveSyncAccountView,
  saveSyncAccountAsst
} from "@/api/credentials/credentials";
import ExApi from "@/api/exchangeRate/exchangeRate";

export default {
  props: {},
  name: "credentialsTemplate",
  data() {
    return {
      queryArea: true, //是否显示查询区域
      loading: false,
      total: 0, //条数
      pageSize: 100, //页码数
      pageNum: 1, //每页条数
      cgShow: false, //采购合同显示
      componyShow: false, //公司弹窗
      companyData: {}, //公司
      formData: {}, //查询表
      tableData: [], //主表数据
      bizBirthplaceList: [], //业务类别
      bizTypeList: [], //业务类型
      binaryList: [
        {
          dict_key: 1,
          dict_value: "停用"
        },
        {
          dict_key: 0,
          dict_value: "启用"
        }
      ], //是否列表
      selectedList: [], //选中数据
      selectedIndex: [], //选中索引
      synchronousLoading: false //同步控制
    };
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  created() {
    let data = this.$getQueryData(this);
  },
  mounted() {
    this.initData();
    this.queryList();
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    }
  },
  methods: {
    //是否显示查询区域
    queryAreaShow() {
      this.queryArea = this.$showOne(this.queryArea);
    },
    synchronization(e) {
      this.$confirm("是否确定同步?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (e == "sl") {
          ExApi.slTogether()
            .then(res => {
              if (res.code === "success") {
                this.$openSuccess(res.message);
              }
            })
            .catch();
        } else if (e == "hl") {
          ExApi.hlTogether()
            .then(res => {
              if (res.code === "success") {
                this.$openSuccess(res.message);
              }
            })
            .catch();
        }
      });
    },
    initData() {
      //业务类别
      getDicList({ dictNo: 1118 })
        .then(res => {
          this.bizBirthplaceList = res.data;
        })
        .catch(err => {});
      //业务类型
      getDicList({ dictNo: 1104 })
        .then(res => {
          this.bizTypeList = res.data;
        })
        .catch(err => {});
    },
    queryList() {
      this.loading = true;
      let odWarrantTemplate = {
        companyCode: this.companyData.companyCode,
        ...this.formData
      };
      this.$setQueryData(this, odWarrantTemplate);
      selectWarrantTemplateList({
        pageNum: this.pageNum,
        rows: this.pageSize,
        ...odWarrantTemplate
      })
        .then(res => {
          this.tableData = res.data;
          this.total = res.total;
          this.loading = false;
        })
        .catch(err => {});
    },
    clearNone() {
      this.companyData = {};
      this.formData.bizTypeList = [];
      this.formData.templateName = '';
      this.formData.templateStatus = '';
      this.formData.templateCode = '';
      this.formData.bizBirthplaceList = [];
    },
    addFun() {
      this.$router.push({
        name: "credentialsTemplateAdd"
      });
    },
    handleTemplateUpdate(status) {
      const templateIdList = [];
      this.selectedList.map(item => {
        templateIdList.push(item.templateId);
      });
      updateWarrantTemplateStatus({
        condiction: status,
        templateIdList
      })
        .then(res => {
          this.$openSuccess(res.message);
          this.selectedList = [];
          this.queryList();
        })
        .catch(err => {});
    },
    editFun() {
      if (this.selectedList.length == 0) {
        this.$openWarning("请选择数据");
      } else {
        if (this.selectedList.length == 1) {
          this.$router.push({
            path:
              "/index/fundsManage/credentials/credentialsTemplateAdd?templateId=" +
              this.selectedList[0].templateId
          });
        } else {
          this.$openWarning("请选择单条数据修改");
        }
      }
    },
    checkFun() {
      if (this.selectedList.length == 0) {
        this.$openWarning("请选择数据");
      } else {
        this.handleTableDataDblclick(this.selectedList[0]);
      }
    },
    handleTemplateStatus(status) {
      if (this.selectedList.length == 0) {
        this.$openWarning("请选择数据");
      } else {
        if (status == 2) {
          this.$confirm("是否确定删除选中数据?", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.handleTemplateUpdate(status);
            })
            .catch(() => {});
        } else {
          this.handleTemplateUpdate(status);
        }
      }
    },
    disableFun() {
      if (this.selectedList.length == 0) {
        this.$openWarning("请选择数据");
      } else {
        //禁用
        const templateIdList = [];
        this.selectedList.map(item => {
          templateIdList.push(item.templateId);
        });
        updateWarrantTemplateStatus({
          condiction: 0,
          templateIdList
        })
          .then(res => {
            console.log("res :", res);
          })
          .catch(err => {});
      }
    },
    //金蝶科目同步
    handleSubjectSynchronous() {
      this.$confirm("是否确定同步科目？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.synchronousLoading = true;
          saveSyncAccountView()
            .then(res => {
              this.synchronousLoading = false;
              this.$openSuccess("同步成功");
            })
            .catch(err => {});
        })
        .catch(() => {
          this.synchronousLoading = false;
        });
    },
    //金蝶辅助项同步
    handleAssistSynchronous() {
      this.$confirm("是否确定同步辅助项？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.synchronousLoading = true;
          saveSyncAccountAsst()
            .then(res => {
              this.synchronousLoading = false;
              this.$openSuccess("同步成功");
            })
            .catch(err => {});
        })
        .catch(() => {
          this.synchronousLoading = false;
        });
    },
    //金蝶流量码同步
    handleCodeSynchronous() {
      this.$confirm("是否确定同步流量码？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.synchronousLoading = true;
          saveCashflow()
            .then(res => {
              this.synchronousLoading = false;
              this.$openSuccess("同步成功");
            })
            .catch(err => {});
        })
        .catch(() => {
          this.synchronousLoading = false;
        });
    },
    handleSizeChange(val) {
      //每页条数
      this.pageSize = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      //当前页码数
      this.pageNum = val;
      this.queryList();
    },
    handleTableDataSelect(selection, row) {
      this.selectedList = selection;
      //   console.log('this.selectedList :', this.selectedList);
      if (selection.length == 1) {
        this.selectedIndex = this.tableData.indexOf(row);
      }
    },
    handleTableDataSelectAll(selection) {
      this.selectedList = selection;
    },
    handleTableDataclick(row, column, event) {
      this.$refs.table.toggleRowSelection(row);
      this.selectedList.push(row);
    },
    handleTableDataDblclick(row, column, event) {
      const templateId = row.templateId;
      this.$router.push({
        path:
          "/index/fundsManage/credentials/credentialsTemplateAdd?isDisabled=true&templateId=" +
          templateId
      });
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyData = e;
    },
    //公司弹窗打开
    componyTip() {
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    inputShow() {
      this.show = this.$showOne(this.show);
    }
  },
  components: {
    componySelect
  }
};
</script>

<style lang="scss" scoped>
.credentialsTemplate {
  height: 100%;
}
.button-div {
  margin: 0 !important;
}
.el-table-div {
  height: 87% !important;
}
/deep/ .el-select__tags {
  .el-tag--light {
    height: auto;
    line-height: normal;
  }
}
</style>
