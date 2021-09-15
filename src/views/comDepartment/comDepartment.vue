<template>
  <div class="content-div">
    <div class="button-div button-div-query auto-sibling">
      <el-button class="query-button" @click="getusrlist" icon="el-icon-search"
        >查询</el-button
      >
      <el-button @click="removes" icon="el-icon-refresh">重置</el-button>
    </div>
    <div class="index-div3 auto-sibling">
      <p class="hide-input" v-if="showOrHide" @click="inputShow()">
        更多条件 <i class="el-icon-caret-bottom"></i>
      </p>
      <p class="hide-input" v-else @click="inputShow()">
        收起<i class="el-icon-caret-top"></i>
      </p>
      <div class="search-div">
        <el-col :span="5" class="el-col">
          <label>所属公司</label>
          <el-input
            v-model="companyName.companyName"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="componyTip('up')"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>部门代码</label>
          <el-input
            v-model="departdm"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>部门名称</label>
          <el-input
            v-model="departmc"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>状态</label>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="el-select"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>OA部门代码</label>
          <el-input
            v-model="oadepartdm"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>OA部门名称</label>
          <el-input
            v-model="oadepartmc"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
      </div>
    </div>
    <div class="button-div auto-sibling">
      <el-button
        @click="departadd"
        v-if="$actionFlag(`F001`)"
        icon="el-icon-folder-add"
        >创建</el-button
      >
      <el-button
        @click="savebtn"
        v-if="$actionFlag(`F002`)"
        icon="el-icon-suitcase"
        >保存</el-button
      >
      <el-button
        @click="telreduce"
        v-if="$actionFlag(`F003`)"
        icon="el-icon-delete"
        >删除</el-button
      >
      <el-button
        @click="enable"
        v-if="$actionFlag(`F004`)"
        icon="el-icon-unlock"
        >启用</el-button
      >
      <el-button @click="locking" v-if="$actionFlag(`F005`)" icon="el-icon-lock"
        >禁用</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        :data="tableData"
        style="width: 100%"
        @selection-change="handleChange"
        @row-dblclick="dblclick"
        ref="multipleTable"
        v-loading="loading"
        @row-click="rowClick"
        height="calc(100% - 35px)"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="branchCode"
          label="部门代码"
          show-overflow-tooltip
        >
          <template scope="scope">
            <div v-if="scope.row.edit">
              <span style="color:red">*</span>
              <el-input
                size="small"
                @blur="blurchange(scope.$index)"
                v-model="scope.row.branchCode"
                placeholder="请输入内容"
                :disabled="scope.row.createdName === '' ? false : true"
                @input="handlebranchCodeRule(scope.row.branchCode,scope.$index)"
              >
              </el-input>
            </div>
            <span v-else>{{ scope.row.branchCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="branchName"
          label="部门名称"
          show-overflow-tooltip
          width="120"
        >
          <template scope="scope">
            <div v-if="scope.row.edit">
              <span style="color:red">*</span>
              <el-input
                size="small"
                v-model="scope.row.branchName"
                placeholder="请输入内容"
              >
              </el-input>
            </div>
            <span v-else>{{ scope.row.branchName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="oaBranchCode"
          label="对应OA部门代码"
          show-overflow-tooltip
          width="120"
        >
          <template scope="scope">
            <div v-if="scope.row.edit">
              <span style="color:red">*</span>
              <el-input
                v-model="scope.row.oaBranchCode"
                size="mini"
                class="el-inputs"
                placeholder="请选择"
                disabled
                style="margin-bottom:2px"
              >
              </el-input>
              <span class="comicon2" @click="departTip(scope.$index)"
                ><i class="el-icon-search"></i
              ></span>
            </div>
            <div v-else>
              {{ scope.row.oaBranchCode }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="oaBranchName"
          label="对应OA部门名称"
          show-overflow-tooltip
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="所属公司"
          width="170"
          show-overflow-tooltip
        >
          <template scope="scope">
            <div v-if="scope.row.edit">
              <span style="color:red">*</span>
              <el-input
                v-model="scope.row.companyName"
                size="mini"
                class="el-inputs"
                placeholder="请选择"
                disabled
                style="margin-bottom:2px"
              >
              </el-input>
              <span class="comicon2" @click="componyTip(scope.$index)"
                ><i class="el-icon-search"></i
              ></span>
            </div>
            <div v-else>
              {{ scope.row.companyName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="isInactive" label="状态" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="profitCenter"
          label="利润中心"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="scope.row.profitCenter"
              placeholder="请输入内容"
              v-if="scope.row.edit"
              @input="handleoaprofitCenterRule(scope.row.profitCenter,scope.$index)"
            >
            </el-input>
            <span v-else>{{ scope.row.profitCenter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="costCenter"
          label="成本中心"
          show-overflow-tooltip
        >
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.costCenter"
              placeholder="请输入内容"
              v-if="scope.row.edit"
              @input="handleoacostCenterRule(scope.row.costCenter,scope.$index)"
            >
            </el-input>
            <span v-else>{{ scope.row.costCenter }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="公共部门"
            prop="isPublic"
            show-overflow-tooltip
          >
        <template scope="scope">
            <el-checkbox
              v-model="scope.row.isPublic"
              :disabled="!scope.row.edit"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdName"
          label="创建人"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="updatedName"
          label="修改人"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="updatedTime"
          label="修改时间"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
        background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[100, 200, 300,500]"
          :page-size="rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <!-- 选择公司弹窗 -->
        <compony-select
          v-if="componyShow"
          :ztz="ztz"
          :tipShow="componyShow"
          @tipsCancle="tipsCancle"
          @tipsSure="tipsSure"
        >
        </compony-select>
        <!-- 选择OA部门弹窗 -->
        <tree-frame
          v-if="treeShow"
          :tipShow="treeShow"
          @treeCancle="treeCancle"
          @treeSure="treeSure"
        >
        </tree-frame>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { service, serviceJson } from "../../axios/index.js";
import componySelect from "@/components/componySelect.vue"; //公司组件
import treeFrame from "@/components/treeFrame.vue";//OA部门弹框
import {
  getCompany,
  saveMsg,
  reduceMsg,
  departEnable,
  departProhibit,
  codeMore,
} from "@/api/comdepartment/comdepartment.js";
export default {
  name: "comDepartment",
  props: {},
  data() {
    return {
      showOrHide: true,
      value: "",
      departdm: "",
      departmc: "",
      oadepartdm: "",
      oadepartmc: "",
      componytype: "", //记录弹框类型
      componyShow: false, //公司弹窗
      treeShow: false, //OA部门弹窗
      companyName: ``, //公司
      editarr: [], //记录开启过编辑状态的
      talindex: "", //记录选中索引(oa部门弹框)
      telreduces: [], //选中数据
      ztz: "",
      loading: true,
      total: 0,
      pageNum: 1,
      rows: 100,
      options: [
        {
          value: "0",
          label: "启用"
        },
        {
          value: "1",
          label: "禁用"
        }
      ],
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      tableData: []
    };
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  created() {
    //取查询条件
    this.$getQueryData(this);
  },
  mounted() {
    this.getusrlist();
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    },
    value2(val) {
      let that = this;
      if (val > that.value3) {
        that.value3 = "";
      }
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() < that.value2;
        }
      };
    }
  },
  methods: {
    handlebranchCodeRule(value,e){
      value = value.replace(/[^\w^\.]+/g, '').replace('.', '')
      this.tableData[e].branchCode = value
    },
    handleoaprofitCenterRule(value,e){
      value = value.replace(/[^\w^\.]+/g, '').replace('.', '')
      this.tableData[e].profitCenter = value
    },
    handleoacostCenterRule(value,e){
      value = value.replace(/[^\w^\.]+/g, '').replace('.', '')
      this.tableData[e].costCenter = value
    },
    blurchange(e) {
      //部门编码失去焦点
      codeMore({ branchCode: this.tableData[e].branchCode })
        .then(res => {
          if (res.code === "success") {
          }
        })
        .catch(() => {
          this.tableData[e].branchCode = "";
        });
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      if (this.componytype === "up") {
        this.companyName = e;
      } else {
        this.tableData[this.componytype].companyName = e.companyName;
        this.tableData[this.componytype].companyId = e.companyId;
      }
      this.componyShow = false;
    },
    //公司弹窗打开
    componyTip(e) {
      this.ztz = e === "up" ? "" : 0;
      this.componytype = e;
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //OA部门弹框确定
    treeSure(e) {
      this.treeShow = false;
      this.tableData[this.talindex].oaBranchCode=e.oaOrgCode;
      this.tableData[this.talindex].oaBranchName=e.oaOrgName;
    },
    //OA部门弹框打开
    departTip(e) {
      this.talindex=e;
      this.treeShow = true;
    },
    //OA部门弹框取消
    treeCancle() {
      this.treeShow = false;
    },
    removes() {
      this.oadepartmc = this.oadepartdm = this.departmc = this.departdm = this.companyName = this.value =
        "";
    },
    getusrlist() {
      //获取主数据
      this.loading = true;
      let param={
        companyId: this.companyName.companyId,
        branchCode: this.departdm,
        branchName: this.departmc,
        isInactive: this.value,
        oaBranchCode: this.oadepartdm,
        oaBranchName: this.oadepartmc,
        pageNum: this.pageNum,
        rows: this.rows
      }
      let data=param;
      data.companyName=this.companyName;
      this.$setQueryData(this,data);
      getCompany(param).then(res => {
        if (res.code === "success") {
          this.loading = false;
          this.total = res.total;
          this.tableData = res.data;
          this.tableData.forEach(i => {
            if (i.isInactive === 1) {
              i.isInactive = "禁用";
            } else if (i.isInactive === 0) {
              i.isInactive = "启用";
            }
            if(i.isPublic == 1){
              i.isPublic=true;
            } else if (i.isPublic == 0){
              i.isPublic=false;
            }
            i.createdTime = this.$timeFun(i.createdTime, true);
            i.updatedTime = this.$timeFun(i.updatedTime, true);
          });
        }
      });
    },

    handleSizeChange(val) {
      this.rows = val;
      this.getusrlist();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getusrlist();
    },
    savebtn() {
      //保存
      let kbtableData = JSON.parse(JSON.stringify(this.tableData));
      let bmdm = []; //部门代码
      let bmmc = []; //部门名称
      let ssgs = []; //所属公司
      let xzsz = []; //新增数据
      let jcxzsz = []; //检测新增数组
      kbtableData.forEach(i => {
        bmdm.push(i.branchCode);
        bmmc.push(i.branchName);
        ssgs.push(i.companyName);
        if (i.createdName === "") {
          xzsz.push(i);
        }
      });
      let saveshow = true;
      xzsz.forEach(i => {
        if (jcxzsz.indexOf(i.branchCode) === -1) {
          jcxzsz.push(i.branchCode);
        } else {
          saveshow = false;
        }
      });
      if (saveshow === false) {
        this.$openWarning("公司代码不能为空");
        return;
      }
      if (bmdm.indexOf("") != -1) {
        this.$openWarning("部门代码不能为空");
        return;
      }
      if (bmmc.indexOf("") != -1) {
        this.$openWarning("部门名称不能为空");
        return;
      }
      if (ssgs.indexOf("") != -1) {
        this.$openWarning("所属公司不能为空");
        return;
      }
      this.tableData.forEach(i => {
        if (i.edited === 1) {
          this.editarr.push(i);
        }
      });
      let abc = JSON.parse(JSON.stringify(this.editarr));
      abc.forEach(i => {
        if (i.isInactive === "禁用") {
          i.isInactive = 1;
        } else if (i.isInactive === "启用") {
          i.isInactive = 0;
        }
        if(i.isPublic == true){
          i.isPublic=1;
        }else if(i.isPublic == false){
          i.isPublic=0;
        }
      });
      saveMsg(abc).then(res => {
        if (res.code === "success") {
          this.$message({
            showClose: true,
            message: res.message,
            type: "success"
          });
          this.getusrlist();
          this.editarr = [];
        }
      });
    },
    departadd() {
      //增加按钮
      this.tableData.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let obj = {
        one: noe,
        isInactive: "启用",
        branchCode: "",
        branchName: "",
        oaBranchCode: "",
        oaBranchName: "",
        companyName: "",
        companyId: "",
        address: "",
        profitCenter: "",
        costCenter: "",
        createdName: "",
        createTime: "",
        updatedName: "",
        updateTime: "",
        edit: true,
        edited: 1,
        isPublic:true,
      };
      let newtable = [];
      newtable.unshift(obj);
      this.tableData = newtable.concat(this.tableData);
    },
    //表格选择
    handleChange(e) {
      this.telreduces = e;
    },
    //删除方法
    deleIndex(e) {
      for (const get of e) {
        let del = this.tableData.findIndex(item => {
          return item.one == get.one && item.branchId == get.branchId;
        });
        this.tableData.splice(del, 1);
      }
    },
    //表格删除
    telreduce() {
      if (this.telreduces.length === 0) {
        this.$message({
          message: "请至少一条数据",
          type: "warning"
        });
        return;
      }
      let noreude = [];
      this.telreduces.forEach(i => {
        noreude.push(i.isInactive);
      });
      if (noreude.indexOf("启用") != -1) {
        this.$message({
          message: "启用状态不能删除",
          type: "warning"
        });
        return;
      }

      this.$confirm("确定删除吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let idSav = []; //修改数据
          let idNo = []; //新建数据
          for (const item of this.telreduces) {
            if (item.branchId) {
              idSav.push(item);
            } else {
              idNo.push(item);
            }
          }
          let abc = JSON.parse(JSON.stringify(idSav));
          abc.forEach(i => {
            i.isInactive = i.isInactive === "启用" ? 0 : 1;
            i.isPublic = i.isPublic===true?1:0;
          
          });
          reduceMsg(abc).then(res => {
            if (res.code === "success") {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.deleIndex(this.telreduces);
            }
          });
        })
        .catch();
    },
    dblclick(e) {
      //双击显示修改
      let index = this.tableData.indexOf(e);
      this.tableData.forEach(item => {
        item.edit = false;
      });
      this.tableData[index].edit = true;
      this.$set(this.tableData, index, e);
      if (e.edited === 1) {
        return;
      } else {
        e.edited = 1;
      }
    },
    inputShow() {
      this.showOrHide = this.$showOne(this.showOrHide);
    },
    rowClick(row){
        this.$refs.multipleTable.toggleRowSelection(row);
    },
    enable() {
      //启用
      if (this.telreduces.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      let abc = JSON.parse(JSON.stringify(this.telreduces));
      abc.forEach(i => {
        i.isInactive = i.isInactive === "启用" ? 0 : 1;
        i.isPublic = i.isPublic===true?1:0;
      });
      departEnable(abc).then(res => {
        if (res.code === "success") {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getusrlist();
        }
      });
    },
    locking() {
      //禁用
      if (this.telreduces.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      let abc = JSON.parse(JSON.stringify(this.telreduces));
      abc.forEach(i => {
        i.isInactive = i.isInactive === "启用" ? 0 : 1;
        i.isPublic = i.isPublic===true?1:0;
      });
      departProhibit(abc).then(res => {
        if (res.code === "success") {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getusrlist();
        }
      });
    }
  },

  components: {
    componySelect,
    treeFrame
  }
};
</script>

<style scoped lang="scss"></style>
