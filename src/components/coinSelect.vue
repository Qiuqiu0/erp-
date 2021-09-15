<template>
<!-- 业务币种列表 -->
  <div class="coinSelect" v-if="tipShow">
    <el-dialog :visible.sync="tipShow" title="选择币别" append-to-body :show-close=false :before-close="coinCancle" width="800px" class="popup_box">
      <div class="index">
        <div class="button-div">
          <el-button class="query-button" @click="queryData" icon="el-icon-search">查询</el-button>
          <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
        </div>
        <!-- 搜索 -->
        <div class="input-div">
          <el-form @keyup.enter.native="queryData">
            <el-col :span="8" class="el-col">
              <label>币种编号</label>
              <el-input v-model="currencyCode" class="el-inputs" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="8" class="el-col" style="margin-left:10px">
              <label>币种名称</label>
              <el-input v-model="currencyName" class="el-inputs" placeholder="请输入"></el-input>
            </el-col>
          </el-form>
        </div>
        <!-- 表格 -->
          <div class="el-table-div">
            <el-table border center :data="tableData" class="el-table" ref="multipleTable"
            v-loading="loading" @row-click='rowClick' :row-class-name="tableRowClassName">
            <el-table-column width="55" label="">
                <template scope="scope">
                    <el-radio :label="scope.$index"  v-model="radio" @change="radiochange(scope.row)">
                        &nbsp;
                    </el-radio>
                </template>
              </el-table-column>
              <el-table-column type="index" label="序号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="currencyCode" label="编号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="currencyName" label="币种" show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <!--分页background-->
            <el-pagination
              @size-change="handleSizeChange" background @current-change="currentChange"
                :current-page="pageNum" :page-sizes="[100, 200, 300,500]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
			</div>
      <slot></slot>
  		<div class="button-div2">
		    <el-button type="primary" @click="coinSure()"  icon="el-icon-check">确 定</el-button>
        <el-button @click="coinCancle()" icon="el-icon-close">取 消</el-button>
  		</div>
    </el-dialog>
  </div>
</template>

<script>
import Compony from "@/api/comdepartment/componySelect";
export default {
  name: "coinSelect",
  data() {
    return {
      currencyName:'',//币种名称
      currencyCode:'',//币种编号
      tableData: [], //表格
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      customerCode: ``, //客户代码
      customerName: ``, //客户名称
      companyName: ``, //公司名称
      isInactive: ``, //状态
      radio: false, //单选状态
      getData: ``, //单选数据
      stateList: [{ value: 0, label: "启用" }, { value: 1, label: "禁用" }], //状态列表
      loading: true, //表格loading
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
      show: true
    };
  },
  props: {
    tipShow: {
      type: Boolean
    }
  },
  created() {
    //获取表格
    this.conList();
  },

  methods: {
    //选择数据
    radiochange(e) {
      this.getData = e;
    },
    //关闭
    coinCancle() {
      this.$emit("coinCancle");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    coinSure() {
      this.$emit("coinSure", this.getData);
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //获取表格
    conList() {
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        currencyCode:this.currencyCode,//币种编号
        currencyName:this.currencyName,//币种名称
      };
      Compony.currenList(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
        }).catch(() => {
          this.loading = false;
        });
    },
    //查询
    queryData() {
      this.conList();
    },
    //清空选项
    clearNone() {
      this.customerCode = ``;
      this.customerName = ``;
      this.companyName = ``;
      this.currencyName='';//币种编号
      this.currencyCode='';//币种名称
    },
    //翻页
    currentChange(e) {
      this.radio = false;
      this.getData = ``;
      this.pageNum = e;
      this.conList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.radio = false;
      this.getData = ``;
      this.pageSize = e;
      this.conList();
    },
    //表格选择
    handleChange(e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    //表格单选
    dialogCheck(selection, row) {
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
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex;
    },
    //单行点击
    rowClick(e) {
      this.radio = e.index;
      this.getData = e;
    }
  }
};
</script>

<style lang="scss">
</style>
