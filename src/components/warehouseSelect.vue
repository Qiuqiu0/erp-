<template>
  <!-- 仓库列表 -->
  <div class="warehouseSelect" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      title="选择列表"
      :show-close="false"
      append-to-body
      :before-close="warehouseCancle"
      width="1100px"
      class="popup_box"
      :modal-append-to-body="false"
    >
      <div class="index">
        <div class="button-div">
          <el-button class="query-button" @click="queryData" icon="el-icon-search">查询</el-button>
          <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
        </div>
        <!-- 搜索 -->
        <div class="index-div3 index-div4">
        <el-form @keyup.enter.native="queryData">
          <div>
            <el-col :span="6" class="el-col">
              <label>仓库代码</label>
              <el-input v-model="warehouseCode" class="el-inputs" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="6" class="el-col">
              <label>仓库名称</label>
              <el-input v-model="warehouseName" class="el-inputs" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="6" class="el-col">
              <label>仓库性质</label>
              <el-select v-model="warehouseAttr" placeholder="请选择" clearable>
                <el-option
                  v-for="item in typeList"
                  :key="item.dict_value"
                  :label="item.dict_value"
                  :value="item.dict_code"
                ></el-option>
              </el-select>
            </el-col>
          </div>
        </el-form>
        </div>
        <!-- 表格 -->
        <div class="el-table-div wutabstyle">
          <el-table
            border
            center
            :data="tableData"
            class="el-table"
            ref="multipleTable"
            v-loading="loading"
            :row-class-name="setRowIndex"
            @row-click="selectRow"
          >
            <el-table-column width="64">
              <template scope="scope">
                <el-radio :label="scope.$index" v-model="radioIndex">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="warehouseCode" label="仓库代码" width="150px"></el-table-column>
            <el-table-column prop="warehouseName" label="仓库名称"></el-table-column>
            <el-table-column prop="warehouseType" label="仓库类型">
              <template slot-scope="scope">
                <div>
                  <span
                    v-show="scope.row.warehouseType == item.dict_code"
                    v-for="item in warehouseTypeList"
                    :key="item.dict_code"
                  >{{ item.dict_value }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="warehouseAttr" label="仓库性质"></el-table-column>
          </el-table>
          <!--分页background-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="currentChange"
            :current-page="pageNum"
            :page-sizes="[100, 200, 300,500]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <slot></slot>
        <div class="button-div2">
          <el-button type="primary" @click="warehouseSure()" icon="el-icon-check">确 定</el-button>
          <el-button @click="warehouseCancle()" icon="el-icon-close">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import WareApi from "@/api/wareRate/wareRate";
export default {
  name: "warehouseSelect",
  data() {
    return {
      inputData: "", //输入框
      tableData: [], //表格
      radioIndex: null, //表格选中项
      radioRow: "",
      index: null, //选中index
      tableAssign: "", //表格深拷贝数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      warehouseCode: "", //仓库代码
      warehouseName: "", //仓库名称
      warehouseAttr: "", //仓库性质
      loading: true, //表格loading
      typeList: [], // 仓库性质
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      show: true,
      warehouseTypeList: []
    };
  },
  props: {
    tipShow: {
      type: Boolean
    },
    isInactive:{
      type:Number
    }
  },
  created() {
    //仓库类型
    this.selectWare();
  },
  mounted() {
    //获取表格
    this.wareList();
  },
  methods: {
    //仓库类型
    selectWare() {
      let params = {
        dictNo: 1012
      };
      WareApi.selectWare(params)
        .then(res => {
          this.typeList = res.data;
        })
        .catch();
      WareApi.selectWare({ dictNo: 1001 }).then(res => {
        this.warehouseTypeList = res.data;
      }); 
    },
    //获取表格
    wareList() {
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        isInactive: this.isInactive,
        warehouseCode: this.warehouseCode,
        warehouseName: this.warehouseName,
        warehouseAttr: this.warehouseAttr
      };
      WareApi.wareList(params)
        .then(res => {
          this.loading = false;
          this.tableAssign = [...res.data];
          res.data.forEach(item => {
            for (const iterator of this.typeList) {
              if (item.warehouseAttr == iterator.dict_code) {
                item.warehouseAttr = iterator.dict_value;
              }
            }
          });
          this.tableData = res.data;
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //查询
    queryData() {
      this.wareList();
    },
    //清空选项
    clearNone() {
      this.warehouseCode = "";
      this.warehouseName = "";
      this.warehouseType = "";
      //this.isInactive = "";
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.wareList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.pariList();
    },
    //列表单选
    setRowIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    selectRow(row) {
      this.radioIndex = row.index;
      console.log("2e", this.radioIndex);
      this.radioRow = row;
    },
    //初始化数据
    initData() {
      this.warehouseCode = "";
      this.warehouseName = "";
      this.warehouseType = "";
      //this.isInactive = "";
      this.radioIndex = null;
      this.radioRow = "";
      this.pageNum = 1;
      this.pageSize = 5;
    },
    //确定
    warehouseSure() {
      // if (this.radioRow.length == 0) {
      //   this.$openWarning("请选择要添加的数据");
      //   return;
      // }
      // console.log('qe',this.radioRow)
      //  console.log('2e',this.radioIndex)
      //  console.log('12',this.tableData[0])
      if (this.radioRow.length == 0) {
        this.$emit("warehouseSure", this.tableData[0]);
      } else {
        this.$emit("warehouseSure", this.radioRow);
      }
      this.initData();
    },
    //取消
    warehouseCancle() {
      this.$emit("warehouseCancle", false);
      this.initData();
    }
  }
};
</script>
<style lang="scss" scoped>
.wutabstyle label::after {
  content: none !important;
}
// .warehouseSelect {
//   margin-left: 19px;
//   width: 97%;
//   .el_flex {
//     display: flex;
//     align-items: center;
//   }

//   .el-date-editor.el-input {
//     width: auto;
//   }
// }
</style>
