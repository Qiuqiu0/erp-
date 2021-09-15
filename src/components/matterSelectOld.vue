<template>
<!-- 物料大类列表 -->
  <div class="matterSelect" v-if="tipShow">
    <el-dialog :visible.sync="tipShow" title="选择列表" :show-close=false :before-close="matterCancle" width="1100px" class="popup_box">
      <div class="index">
         <div class="button-div">
            <el-button class="query-button" icon="el-icon-search" @click="queryData">查询</el-button>
            <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
          </div>
				<!-- 搜索 -->
        <div class="input-div">
         
          <div>
            <el-col :span="7" class="el-col">
              <label>物料编码</label><el-input v-model="categoryCode" class="el-inputs" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="7" class="el-col">
              <label>物料名称</label><el-input v-model="categoryName" class="el-inputs" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="7" class="el-col">
              <label>物料大类</label>
              <el-select clearable  size="small" class="el-select"  v-model="categoryId"  placeholder="请选择" >
                <el-option v-for="item in categoryList"
                            :key="item.categoryId"  
                            :label="item.categoryName"
                            :value="item.categoryId"
                    ></el-option>
                </el-select>
            </el-col>
            <!-- <el-col :span="5" class="el-col">
              <label>物料规格</label><el-input v-model="categoryCode" class="el-inputs" placeholder="请输入"></el-input>
            </el-col> -->
        
          </div>
        </div>
        <!-- 表格 -->
          <div class="el-table-div">
            <el-table border center :data="tableData" class="el-table" ref="multipleTable"
            @row-click="rowClick"
            :row-class-name="tableRowClassName"
            v-loading="loading">
            <el-table-column width="55" label="">
                <template scope="scope">
                    <el-radio :label="scope.$index" v-model="radio" @change="radiochange(scope.row)">
                        &nbsp;
                    </el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="skuCode" label="物料编码" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="skuName" label="物料名称" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="categoryShowName" label="物料大类" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="propertyInfo" label="物料规格" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="firstUnitName" label="基本单位" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="secUnitName" label="第二单位" show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <!--分页background-->
            <el-pagination
              @size-change="handleSizeChange" @current-change="currentChange"
                :current-page="pageNum" :page-sizes="[100, 200, 300,500]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
			</div>
      <slot></slot>
  		<div class="button-div2">
		    
		    <el-button type="primary" @click="matterSure()" icon="el-icon-check">确 定</el-button>
        <el-button @click="matterCancle()" icon="el-icon-close">取 消</el-button>
  		</div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Compony from "@/api/comdepartment/componySelect";
export default {
  name: "matterSelect",
  data() {
    return {
      tableData: [], //表格
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      categoryName: ``, //物料名称
      categoryCode: "", //物料编码
      categoryId: ``,
      categoryList: [], //物料大类下拉列表
      type: ``, //项目类型
      typeList: [], //类型列表
      radio: false, //单选状态
      getData: ``, //单选数据
      loading: true, //表格loading
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
    //类型
    this.selectcategory();
  },

  methods: {
    //选择数据
    radiochange(e) {
      this.getData = e;
    },
    //关闭
    matterCancle() {
      this.$emit("matterCancle");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    matterSure() {
      this.$emit("matterSure", this.getData);
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //查询物料大类
    selectcategory() {
      Compony.categorySelectBox()
        .then(res => {
          if (res.code == "success") {
            this.categoryList = res.data;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //获取表格
    conList() {
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        skuName: this.categoryName,
        skuCode: this.categoryCode,
        categoryId: this.categoryId
      };
      Compony.skuModulList(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //查询
    queryData() {
      this.conList();
    },
    //清空选项
    clearNone() {
      this.categoryCode = ``;
      this.categoryName = ``;
      this.categoryId = "";
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.conList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.conList();
    },
    //表格选择
    handleChange(e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex;
    },
    //单行点击
    rowClick(e) {
       this.radio = e.index;
       this.getData = e;
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
  }
};
</script>

<style lang="scss">
</style>
