<template>
  <!-- 公司列表 -->
  <div class="componySelect" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      append-to-body
      title="选择列表"
      :show-close="false"
      :before-close="treeCancle"
      width="1100px"
      class="popup_box "
    >
    <div>
        <div class="besides">
        <h3 style="font-size:14px">OA部门</h3>
        <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
        </el-input>
        <el-button type="text"
                     style="text-align:left"
                     @click="resetChecked">根节点</el-button>
        <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        @node-click="handleNodeClick"
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        :accordion="true"
        :highlight-current="true"
        ref="tree">
        </el-tree>
        </div>
        <div class="besides2">
            <div class="el-table-div"
           v-auto>
        <el-table 
            height="calc(100% - 35px)"
            :data="tableData"
            class="el-table"
            ref="table"
            v-loading="loading"
            :row-class-name="tableRowClassName"
            @row-click="rowClick">
          <el-table-column width="55">
             <template scope="scope">
                <el-radio
                  :label="scope.$index"
                  v-model="radio"
                  @change="radiochange(scope.row)"
                >
                  &nbsp;
                </el-radio>
              </template>              
          </el-table-column>
          <el-table-column
          prop="oaOrgCode"
          label="对应OA部门代码"
          align='center'
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align='center'
          prop="oaOrgName"
          label="对应OA部门名称"
          show-overflow-tooltip
        >
        </el-table-column>
        </el-table>
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="currentChange"
            :current-page="pageNum"
            :page-sizes="[100, 200, 300,500]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
      </div>
      <div class="button-div2">
        <el-button type="primary" @click="treeSure()" icon="el-icon-check"
          >确 定</el-button
        >
        <el-button @click="treeCancle()" icon="el-icon-close">取 消</el-button>
      </div>
        </div>
        
    </div>
        
      
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { service, serviceJson } from "../axios/index.js";
import { treesFrame,treeAload} from "@/api/comdepartment/comdepartment.js";
export default {
  name: "treeFrame",
  data() {
    return {
          data: [],
        defaultProps: {
          children: 'list',
          label: 'oaOrgName'
        },
      filterText: '',//过滤字
      tableData: [], //表格
      tableAssign: "", //表格深拷贝数据
      selectioned: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      orgCode: null, //公司代码
      orgName: null, //公司名称
      companyShort: ``, //公司简称
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
    },
  },
  created() {
    //获取表格
    this.conList();
    this.gettree();
    
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
    handleNodeClick(data,node){
      this.radio=false;
      console.log(data);
      this.orgCode=data.oaOrgCode;
      this.orgName=data.oaOrgName;
      this.conList();
    },
    //选择数据
     filterNode(value, data) {
        if (!value) return true;
        return data.oaOrgName.indexOf(value) !== -1;
      },
    gettree(e) {
      treeAload(null)
        .then(res => {
        console.log(res);
        this.data=res.data
      })
    },
    resetChecked () {//点击根节点
      this.orgName=this.orgCode=null;
      this.conList();
    },
    radiochange(e){
      console.log(e);
      this.getData = e;
    },
    //关闭
    treeCancle() {
      this.$emit("treeCancle");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    treeSure() {
      if (this.getData == ``) {
        this.$openWarning("请选择数据");
        return false;
      }
      this.$emit("treeSure", this.getData);
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //获取表格
    conList() {
      treesFrame({pageNum: this.pageNum,
        rows: this.pageSize,
        orgCode: this.orgCode,
        orgName: this.orgName,})
        .then(res => {
        console.log(res);
          this.loading = false;
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //查询
    queryData() {
      this.pageNum = "";
      this.conList();
    },
    //清空选项
    clearNone() {
      this.companyName = ``;
      this.companyCode = ``;
      this.companyShort = ``;
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.radio = false;
      this.getData = ``;
      this.conList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.radio = false;
      this.getData = ``;
      this.conList();
    },
    //表格选择
    handleChange(e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    //单行点击
    rowClick(e) {
      console.log(e);
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
    },
     filterText(val) {
        this.$refs.tree.filter(val);
      }
  }
};
</script>

<style lang="scss">
.besides {
    float: left;
    width: 180px;
    text-align: center;
.el-input__inner{
    margin-top:5px;
    width: 100%;
    height: 30px;
}
}
.besides2 {
    margin-left: 180px;
}
</style>
