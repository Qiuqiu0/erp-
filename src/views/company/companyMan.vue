<template>
  <div class="content-div">
    <div class="button-div button-div-query auto-sibling">
      <el-button class="query-button" @click="inituser" icon="el-icon-search"
        >查询</el-button
      >
      <el-button @click="reset" icon="el-icon-refresh">重置</el-button>
    </div>
    <!-- input框 -->
    <div class="index-div3 auto-sibling">
      <div>
        <el-col :span="5" class="el-col">
          <label>公司代码</label>
          <el-input
            v-model="companyCode"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>公司名称</label>
          <el-input
            v-model="companyName"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>公司简称</label>
          <el-input
            v-model="companyShort"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>状态</label>
          <el-select
            clearable
            v-model="isInactive"
            placeholder="请选择"
            class="el-select"
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
      </div>
    </div>
    <!-- 按钮 -->
    <div class="button-div auto-sibling">
      <el-button
        @click="creatcom('creat')"
        icon="el-icon-folder-add"
        v-if="$actionFlag(`F001`)"
        >创建</el-button
      >
      <el-button
        @click="creatcom('edit')"
        icon="el-icon-edit"
        v-if="$actionFlag(`F002`)"
        >修改</el-button
      >
      <el-button
        @click="deletecom"
        icon="el-icon-delete"
        v-if="$actionFlag(`F003`)"
        >删除</el-button
      >
      <el-button
        @click="creatcom('look')"
        icon="el-icon-data-line"
        v-if="$actionFlag(`F004`)"
        >查看</el-button
      >
      <el-button
        @click="enable"
        icon="el-icon-unlock"
        v-if="$actionFlag(`F005`)"
        >启用</el-button
      >
      <el-button @click="locking" icon="el-icon-lock" v-if="$actionFlag(`F006`)"
        >禁用</el-button
      >
      <el-button
        icon="el-icon-refresh"
        v-if="$actionFlag(`F007`)"
        @click="synchronization"
        >用友账户同步</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        :data="tableData"
        class="el-table"
        v-loading="loading"
        @selection-change="handleChange"
        @row-click="rowClick"
        @row-dblclick="creatlook"
        ref="multipleTable"
        height="calc(100% - 35px)"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="companyCode"
          label="公司代码"
          width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="公司名称"
          width="170"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="companyShort"
          label="公司简称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="countryName" label="国家" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="provinceName" label="省份" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="cityName" label="城市" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="isInactive" label="状态" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
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
          show-overflow-tooltip
          width="100"
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
      <!-- 分页 -->
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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { service, serviceJson } from "../../axios/index.js";
import {
  getUserlists,
  removeMsg,
  stopget,
  enableget,
  zhTogether
} from "@/api/company/companyman.js";
export default {
  name: "companyMan",
  props: {},
  data() {
    return {
      flowshow:false,//测试
      show: true,
      companyCode: "", //文本值
      companyName: "",
      companyShort: "",
      total: 0,
      pageNum: 1,
      rows: 100,
      loading: true,
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      activeName2: "first", //标签页
      //选择器
      isInactive: "",
      options: [
        {
          value: 0,
          label: "启用"
        },
        {
          value: 1,
          label: "禁用"
        }
      ],
      tableData: [],
      radio: "",
      templateSelection: [], //选中数据
      flag: true
    };
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  created() {
    this.$getQueryData(this);
  },
  mounted() {
    this.inituser();
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
    synchronization(){
      this.$confirm("是否确定同步?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        zhTogether({companyCode:"0001"})
        .then(res => {
          if(res.code==='success'){
            this.$openSuccess(res.message);
          }
          
        })
        .catch();
      }); 
    },
    //单行点击
    rowClick(e) {
      // this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e);
      // this.index = this.tableData.indexOf(e);
      // this.selectioned = e;
    },
    //表格选择
    handleChange(e) {
      this.templateSelection = e;
    },
    reset() {
      //重置
      this.companyCode = this.companyName = this.companyShort = this.isInactive = "";
    },
    deletecom() {
      //删除数据
      if (this.templateSelection.length === 0) {
        this.$message({
          message: "请至少选择一条数据",
          type: "warning"
        });
        return;
      }
      let noreude = [];
      this.templateSelection.forEach(i => {
        noreude.push(i.isInactive);
      });
      if (noreude.indexOf("启用") != -1) {
        this.$message({
          message: "启用状态不能删除",
          type: "warning"
        });
        return;
      }
      this.$confirm("是否确定删除继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let abc = JSON.parse(JSON.stringify(this.templateSelection));
        abc.forEach(i => {
          i.isInactive = i.isInactive === "启用" ? 0 : 1;
        });
        removeMsg(abc).then(res => {
          if (res.code === "success") {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.inituser();
          }
        });
      });
    },
    creatlook(row){
      let data = 'look'
      this.$router.push({
          path: "/index/company/companyCreat",
          query: {
            data: data,
            msgid: row.companyId
          }
        });
    },
    creatcom(data) {
      if (data === "look" || data === "edit") {
        if (this.templateSelection.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        }
        if (this.templateSelection.length > 1) {
          this.$message({
            message: "只能选择一条数据",
            type: "warning"
          });
          return;
        }
        this.$router.push({
          path: "/index/company/companyCreat",
          query: {
            data: data,
            msgid: this.templateSelection[0].companyId
          }
        });
      } else {
        this.$router.push({
          path: "/index/company/companyCreat",
          query: {
            data: data
          }
        });
      }
    },
    inituser() {
      this.loading = true;
      let data={
        companyCode: this.companyCode,
        companyName: this.companyName,
        companyShort: this.companyShort,
        isInactive: this.isInactive,
        pageNum: this.pageNum,
        rows: this.rows
      };
      this.$setQueryData(this,data);
      getUserlists(data).then(res => {
        if (res.code === "success") {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
          this.tableData.forEach(i => {
            if (i.isInactive === 0) {
              i.isInactive = "启用";
            } else if (i.isInactive === 1) {
              i.isInactive = "禁用";
            }
            i.createdTime = this.$timeFun(i.createdTime, true);
            i.updatedTime = this.$timeFun(i.updatedTime, true);
          });
        }
      });
    },
    handleSizeChange(val) {
      this.rows = val;
      this.inituser();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.inituser();
    },
    locking() {
      //禁用
      if (this.templateSelection.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      this.$confirm("是否确定禁用?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let abc = JSON.parse(JSON.stringify(this.templateSelection));
        abc.forEach(i => {
          i.isInactive = i.isInactive === "启用" ? 0 : 1;
        });
        stopget(abc).then(res => {
          if (res.code === "success") {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.inituser();
          }
        });
      });
    },
    enable() {
      //启用
      if (this.templateSelection.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      let abc = JSON.parse(JSON.stringify(this.templateSelection));
      abc.forEach(i => {
        i.isInactive = i.isInactive === "启用" ? 0 : 1;
      });
      enableget(abc).then(res => {
        if (res.code === "success") {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.inituser();
        }
      });
    }
  },
  components: {
  }
};
</script>

<style scoped lang="scss"></style>
