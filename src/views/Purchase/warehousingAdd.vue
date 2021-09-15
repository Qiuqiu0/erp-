<template>
  <!-- 采购创建 -->
  <div class="warehousingAdd"
       v-if="tipShow">
    <el-dialog :visible.sync="tipShow"
               title="采购合同信息"
               :show-close="false"
               :close-on-click-modal="false"
               width="1100px"
               class="popup_box">
      <div class="button-div"
           style="text-align:left">
        <el-button class="query-button"
                   @click="conList"
                   icon="el-icon-search">查询</el-button>
        <el-button @click="clearNone"
                   icon="el-icon-refresh">重置</el-button>
      </div>
      <!-- 搜索 -->
      <div class="index-div3 index-div4">
        <p class="hide-input"
           v-if="show"
           @click="inputShow()">
          更多条件 <i class="el-icon-caret-bottom"></i>
        </p>
        <p class="hide-input"
           v-else
           @click="inputShow()">
          收起<i class="el-icon-caret-top"></i>
        </p>
        <div class="dialog-search-div">
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">公司</label>
            <el-input v-model="companyList.companyName"
                      class="el-inputs"
                      placeholder="请选择"
                      required
                      disabled></el-input>
            <span class="comicon"
                  @click="componyTip"><i class="el-icon-search"></i></span>
            <!-- <el-select v-model="companyList.companyName"
                       @change="companyChange"
                       clearable
                       size="small"
                       class="el-select"
                       placeholder="请选择">
              <el-option v-for="item in companyList"
                         :key="item.companyId"
                         :label="item.companyName"
                         :value="item.companyCode">
              </el-option>
            </el-select> -->
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">部门</label>
            <el-input v-model="branchList.branchName"
                      class="el-inputs"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  @click="departmentTip"><i class="el-icon-search"></i></span>

            <!-- <el-select v-model="branchList.branchName"
                       @change="branchChange"
                       placeholder="请选择"
                       clearable
                       size="small"
                       class="el-select">
              <el-option v-for="item in branchList"
                         :key="item.branchCode"
                         :label="item.branchName"
                         :value="item.branchCode">
              </el-option>
            </el-select> -->
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">采购合同</label>
            <el-input v-model="poNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">外部合同号</label>
            <el-input v-model="extCode"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">供应商</label>
            <el-input v-model="supplierName.supplierName"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  @click="supplierTip"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">项目号</label>
            <el-input v-model="projectList.projectName"
                      class="el-inputs"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  @click="projectTip"><i class="el-icon-search"></i></span>
            <!-- <el-select v-model="projectList.projectName"
                       @change="branchChange"
                       clearable
                       size="small"
                       class="el-select"
                       placeholder="请选择">
              <el-option v-for="item in projectList"
                         :key="item.projectId"
                         :label="item.projectName"
                         :value="item.projectCode">
              </el-option>
            </el-select> -->
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label style="width:31%">生效时间</label>
            <el-date-picker v-model="value9"
                            type="daterange"
                            class="el-input2"
                            size="small"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            default-value="2010-10-01">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">业务员</label>
            <el-input v-model="bizPersonlist.empName"
                      class="el-inputs"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  @click="staffTip"><i class="el-icon-search"></i></span>
            <!-- <el-select v-model="bizPersonlist.bizPersonName"
                       @change="companyChange"
                       clearable
                       size="small"
                       class="el-select"
                       placeholder="请选择">
              <el-option v-for="item in bizPersonlist"
                         :key="item.bizPersonCode"
                         :label="item.bizPersonName"
                         :value="item.bizPersonCode">
              </el-option>
            </el-select> -->
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">创建人</label>
            <el-input v-model="createdName"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"></el-input>
            <!-- <el-select v-model="createdlist.createdName"
                       @change="companyChange"
                       clearable
                       size="small"
                       class="el-select"
                       placeholder="请选择">
              <el-option v-for="item in createdlist"
                         :key="item.createdCode"
                         :label="item.createdName"
                         :value="item.createdCode">
              </el-option>
            </el-select> -->
          </el-col>
        </div>
      </div>
      <!-- 表格 -->
      <el-divider></el-divider>
      <div class="el-table-div wutabstyle">
        <el-table border
                  center
                  :data="tableData"
                  class="el-table"
                  ref="multipleTable"
                  @row-click="rowClick"
                  v-loading="loading">
          <el-table-column width="64px">
            <template scope="scope">
              <el-radio :label="scope.$index"
                        v-model="radio"
                        @change="radiochange(scope.row)">
                &nbsp;
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="poNo"
                           label="采购合同号"
                           show-overflow-tooltip
                           width="120">
          </el-table-column>
          <!-- <el-table-column
              prop="ext_code"
              label="物料号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="物料名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="beginDate"
              label="物料种类"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="createdName"
              label="物料规格"
              show-overflow-tooltip
            >
            </el-table-column> -->
          <el-table-column prop="signTime"
                           label="签约日期"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.signTime | time }}
            </template>
          </el-table-column>
          <el-table-column prop="supplierName"
                           label="供应商"
                           show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column
              prop="updatedTime"
              label="基础单位"
              show-overflow-tooltip
            >
            </el-table-column> -->
          <el-table-column prop="sumQty"
                           label="数量"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="currencyRate"
                           label="本位币汇率"
                           show-overflow-tooltip
                           width="100">
          </el-table-column>
          <el-table-column prop="currencyName"
                           label="业务币币别"
                           show-overflow-tooltip
                           width="100">
          </el-table-column>
          <!-- <el-table-column
              prop="updatedTime"
              label="过账状态"
              show-overflow-tooltip
            >
            </el-table-column> -->
          <el-table-column prop="createdName"
                           label="创建人"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="createdTime"
                           label="创建时间"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.createdTime | time }}
            </template>
          </el-table-column>
          <el-table-column prop="updatedName"
                           label="修改人"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="updatedTime"
                           label="修改时间"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.updatedTime | time }}
            </template>
          </el-table-column>
        </el-table>
        <!--分页background-->
        <el-pagination @size-change="handleSizeChange"
                       @current-change="currentChange"
                       :current-page="pageNum"
                       :page-sizes="[100, 200, 300,500]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
      <slot></slot>
      <div class="button-div2">
        <el-button type="primary"
                   @click="tipsConfirm()"
                   icon="el-icon-check">确认</el-button>
        <el-button @click="warehousingCancle()"
                   icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 选择公司弹窗 -->
    <compony-select v-if="companyShow"
                    :tipShow="companyShow"
                    @tipsCancle="tipsCancle"
                    @tipsSure="tipsSure">
    </compony-select>
    <!-- 选择部门弹窗 -->
    <department-select v-if="departmentShow"
                       :tipShow="departmentShow"
                       :data="companyList"
                       @departmentCancle="departmentCancle"
                       @departmentSure="departmentSure">
    </department-select>
    <!-- 选择供应商弹窗 -->
    <supplier-Select v-if="supplierShow"
                     :tipShow="supplierShow"
                     @supplierCancle="supplierCancle"
                     @supplierSure="supplierSure"></supplier-Select>
    <!-- 选择员工弹窗 -->
    <staff-select v-if="staffShow"
                  :tipShow="staffShow"
                  :data="branchList"
                  @staffCancle="staffCancle"
                  @staffSure="staffSure">
    </staff-select>
    <!-- 选择项目弹窗 -->
    <project-select v-if="projectShow"
                    :tipShow="projectShow"
                    @projectCancle="projectCancle"
                    @projectSure="projectSure">
    </project-select>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api/ladingBill/ladingBill';
import componySelect from '@/components/componySelect.vue';
import departmentSelect from '@/components/departmentSelect.vue';
import staffSelect from '@/components/staffSelect.vue';
import supplierSelect from "@/components/supplierSelect.vue";
import projectSelect from '@/components/projectSelect.vue';
export default {
  name: 'warehousingAdd',
  data () {
    return {
      tableData: [], //表格
      companyList:{},
      companyId: '',
      poNo: '',
      branchList: [],
      bizPersion: '',
      formList: {},
      empList: [],
      empName: '',
      bizPersonlist: {},
      bizPersonName: '',
      tableAssign: '', //表格深拷贝数据
      selectioned: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      companyCode: ``, //公司代码
      branchCode: ``, //部门名称
      extCode: '', //外部合同号
      companyShort: ``, //公司简称
      supplierName: "", //供应商
      supplierShow: "", //供应商弹窗
      isInactive: '', //状态
      radio: false, //单选状态
      getData: ``, //单选数据
      value9: '', //生效时间
      projectName: '', //项目号
      projectList:{},
      createdName: '', //创建人
      createdlist: [],
      stateList: [
        { value: 0, label: '启用' },
        { value: 1, label: '禁用' }
      ], //状态列表
      loading: false, //表格loading
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
      navColor: {
        button: {
          backgroundColor: '' //按钮颜色
        }
      },
      show: true,
      companyShow: false, //公司弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      projectShow: false
    };
  },
  props: {
    tipShow: {
      type: Boolean
    }
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    projectSelect,
    supplierSelect
  },
  created () {
    // this.companyListData();
    //获取表格
    if (localStorage.getItem('type')) {
      this.type = localStorage.getItem('type');
      this.conList();
    }
    // this.empListData();
    // this.projectData();
    this.createdData();
  },
  mounted () {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        '#' + localStorage.getItem('themecolor');
    } else {
      this.navColor.button.backgroundColor = '#' + this.themecolor;
    }
  },
  methods: {
    inputShow () {
      this.show = this.$dialogShowOne(this.show);
    },
    //选择数据
    radiochange (e) {
      this.getData = e;
    },
    //关闭
    warehousingCancle () {
      this.$emit('warehousingCancle');
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    tipsConfirm () {
      if (!this.getData) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: '未选择数据',
          type: 'warning'
        });
        return;
      }
      this.$router.push({
        // 核心语句
        path: '/index/Purchase/warehousingDetails', //跳转的路径
        query: { poId: this.getData.poId }
      });
      this.$emit('warehousingCancle');
    },
    // companyChange (val) {
    //   this.companyCode = val;
    //   for (var i = 0; i < this.companyList.length; i++) {
    //     if (val == this.companyList[i].companyCode) {
    //       this.companyId = this.companyList[i].companyId;
    //     }
    //   }
    //   let params = {
    //     companyId: this.companyId
    //   };
    //   api
    //     .selectBbBranch(params)
    //     .then(res => {
    //       this.branchList = res.data;
    //     })
    //     .catch(() => { });
    // },
    branchChange (val) {
      this.branchCode = val;
      // console.log('val',val)
    },
    //公司弹窗打开
    componyTip () {
      this.companyShow = true;
    },
    //公司弹窗关闭
    tipsCancle () {
      this.companyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure (e) {
      this.companyShow = false;
      this.companyList = e;
      this.companyCode = e.companyCode;
      this.branchList = '';
      this.bizPersonlist = '';
    },
    //部门弹窗打开
    departmentTip () {
      // if (this.companyList == ``) {
      //   this.$openWarning('请先选择公司');
      //   return false;
      // }
      this.departmentShow = true;
    },
    //部门弹窗关闭
    departmentCancle () {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure (e) {
      this.departmentShow = false;
      this.branchList = e;
      this.branchCode = e.branchCode;
      this.bizPersonlist = '';
    },
    //员工弹窗打开
    staffTip () {
      // if (this.companyList == `` || this.branchList == ``) {
      //   this.$openWarning('请先选择公司和部门');
      //   return false;
      // }
      this.staffShow = true;
    },
    //员工弹窗关闭
    staffCancle () {
      this.staffShow = false;
    },
    //员工弹窗确定获取数据
    staffSure (e) {
      this.staffShow = false;
      this.bizPersonlist = e;
    },
    //供应商弹窗打开
    supplierTip () {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancle () {
      this.supplierShow = false;
    },
    //供应商确认获取数据
    supplierSure (e) {
      this.supplierShow = false;
      this.supplierName = e;
    },
    //项目弹窗打开
    projectTip () {
      this.projectShow = true;
    },
    //项目弹窗关闭
    projectCancle () {
      this.projectShow = false;
    },
    //项目弹窗确定获取数据
    projectSure (e) {
      this.projectShow = false;
      this.projectList = e;
    },
    //公司下拉
    companyListData () {
      api
        .selectBbCompanyBase()
        .then(res => {
          this.companyList = res.data;
        })
        .catch(() => { });
    },
    //业务员下拉
    empListData () {
      api
        .employeeSelect()
        .then(res => {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i] = JSON.parse(
              JSON.stringify(res.data[i])
                .replace(/empName/g, 'bizPersonName')
                .replace(/flow/g, 'cnt')
            );
            res.data[i] = JSON.parse(
              JSON.stringify(res.data[i])
                .replace(/empCode/g, 'bizPersonCode')
                .replace(/flow/g, 'cnt')
            );
          }
          this.bizPersonlist = res.data;
        })
        .catch(() => { });
    },
    //业务员下拉
    createdData () {
      api
        .employeeSelect()
        .then(res => {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i] = JSON.parse(
              JSON.stringify(res.data[i])
                .replace(/empName/g, 'createdName')
                .replace(/flow/g, 'cnt')
            );
            res.data[i] = JSON.parse(
              JSON.stringify(res.data[i])
                .replace(/empCode/g, 'createdCode')
                .replace(/flow/g, 'cnt')
            );
          }
          this.createdlist = res.data;
        })
        .catch(() => { });
    },
    //项目下拉
    projectData () {
      api
        .selectProjectList()
        .then(res => {
          this.projectList = res.data;
        })
        .catch(() => { });
    },
    //获取表格
    conList () {
      if (this.companyCode) {
        var companyCode = this.companyCode;
      }
      if (this.branchCode) {
        var branchCode = this.branchCode;
      }
      if (this.createdName) {
        var createdName = this.createdName;
      }
      if (this.poNo) {
        var poNo = this.poNo;
      }
      if (this.extCode) {
        var extCode = this.extCode;
      }
      if (this.bizPersion) {
        var bizPersion = this.bizPersion;
      }
       if(this.value9 && this.value9.length){
        var startDate = this.value9[0];
         var endDate = this.value9[1];
      }
      if (this.type == 1) {
        var poType = 10140005;
      } else if (this.type == 4) {
        var poType = 10140010;
      }
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        poType: poType,
        poNo: poNo,
        companyCode: companyCode,
        orgCode: branchCode,
        bizPersonCode: this.bizPersonlist.empCode,
        createdName: createdName,
        extCode: this.extCode,
        supplierCode: this.supplierName.supplierCode, //供应商
        supplierName: this.supplierName.supplierName,
        startDate: startDate,
        endDate: endDate,
        projectCode:this.projectList.projectCode,
        projectName:this.projectList.projectName
      };
      api
        .selectOdPoContractInfo(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //清空选项
    clearNone () {
      this.companyCode='';
      this.orgCode='';
      this.companyList = ``;
      this.branchList = ``;
      this.projectList ={};
      this.value9 = [];
      this.bizPersonlist =``;
      this.createdName = '';
      this.extCode = '';
      this.poNo = '';
      this.poType = '';
      this.supplierName = ''
    },
    //翻页
    currentChange (e) {
      this.pageNum = e;
      this.radio = false;
      this.clearNone();
      this.conList();
    },
    //更改每页条数
    handleSizeChange (e) {
      this.pageSize = e;
      this.radio = false;
      this.clearNone();
      this.conList();
    },
    //表格选择
    handleChange (e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    //表格单选
    dialogCheck (selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.tableData.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行点击
    rowClick (e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.index = this.tableData.indexOf(e);
      this.selectioned = e;
      this.radio = this.index
      this.getData = e;
    }
  },
  computed: {
    ...mapState({
      themecolor: 'themecolor'
    })
  },
  watch: {
    themecolor: {
      handler () {
        this.navColor.button.backgroundColor = '#' + this.themecolor;
      }
    }
  }
};
</script>
<style lang="scss">
.warehousingAdd {
  .el-select.el-select--mini {
    width: 100px !important;
  }
  .wutabstyle label::after {
    content: none !important;
  }
}
</style>
<style scoped lang="scss">
// .warehousingAdd {
//   .index-div4{
//         width: 100%;
//         overflow: hidden;
//         background: #ffffff;
//         text-align: left;
//         margin-bottom: 10px;
//         position: relative;
//         min-height: 14px;
//         border: 1px solid #DCDFE6;
//         padding-bottom: 10px;
//         .el-col-5{
//             width: 24%; position: relative; margin-top: 10px;
//         }
//        .el-col .el-inputs, .input-div .el-col .el-input__inner{
//             font-size: 12px !important;
//         }
//         .el-col .el-select .el-input .el-input__inner{
//             font-size: 12px !important;
//         }
//         .el-input,.el-select{
//             width: 68%;
//             font-size: 12px;
//             .el-input__inner{
//                 font-size: 12px !important;
//                 width: 100%;
//             }
//         }
//           //时间选择器
//         .el-input2{
//             height: 32px;
//             width: 68%;
//             border-color:#909399 !important;
//         }
//         .custom-31478F .el-range-editor--mini .el-range__icon {
//            line-height: 27px;
//         }
//         label{
//             display: inline-block;
//             width:31%;
//             text-align: right;
//             font-size: 12px;

//         }
//         .el-col{
//             .comicon {
//                 width:68%;
//                 height: 20px;
//                 position: absolute;
//                 right: 6px;
//                 top: 7px;
//                 cursor: pointer;
//                 text-align: right;
//                 padding-right: 10px;
//             }
//             .el-col:last-child{
//                 margin-right: 0;
//             }
//         }
//         .el-col-btn{
//             margin: 10px;
//             width:100%;
//             position: relative;
//             margin-left:0px !important;
//             .button-div{
//                 margin: 0px auto;
//                 text-align: center;
//             }
//         }

//     }
// }
</style>
