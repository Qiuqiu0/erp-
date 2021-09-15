<template>
<!-- 项目列表 -->
  <div class="countrySelect" v-if="tipShow">
    <el-dialog :visible.sync="tipShow" title="选择列表" append-to-body :show-close=false :before-close="tipsCancle" width="1100px" class="popup_box">
      <div class="index">
        <!-- 表格 -->
        <el-divider></el-divider>
          <div class="el-table-div">
            <el-table border center :data="tableData" class="el-table" ref="multipleTable"
            v-loading="loading" @row-click="rowClick" :row-class-name="tableRowClassName">
            <el-table-column width="55" label="">
                <template scope="scope">
                    <el-radio :label="scope.$index" v-model="radio" @change="radiochange(scope.row)">
                        &nbsp;
                    </el-radio>
                </template>
              </el-table-column>
              <el-table-column type="index" label="序号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="regionName" label="国家名称" show-overflow-tooltip>
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
         <el-button type="primary" @click="tipsSure()" icon="el-icon-check">确 定</el-button>
		    <el-button @click="tipsCancle()"  icon="el-icon-close">取 消</el-button>
		   
  		</div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Compony from "@/api/comdepartment/componySelect";
export default {
  name: "countrySelect",
  data() {
    return {
      tableData: [], //表格
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      typeList: [], //类型列表
      radio: false, //单选状态
      getData: ``, //单选数据
      loading: true, //表格loading
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
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
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //选择数据
    radiochange(e) {
      this.getData = e;
    },
    //关闭
    tipsCancle() {
      this.$emit("countryCancle");
      this.radio = false;
      this.getData = ``;
    },
    //确定
    tipsSure() {
      this.$emit("countrySure", this.getData);
      this.radio = false;
      this.getData = ``;
    },
    //获取表格
    conList() {
      let params = {};
      Compony.areaList(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.data.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //查询
    queryData() {
      this.conList();
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
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    }
  }
};
</script>

<style lang="scss">
</style>
