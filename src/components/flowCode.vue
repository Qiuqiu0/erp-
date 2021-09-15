<template id="FlowCode">
  <!-- 流量 -->
  <div v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      append-to-body
      title="选择列表"
      :show-close="false"
      :before-close="flowCancle"
      width="800px"
      class="popup_box "
    >
    <div>
        <div class="subject-frame">
        <h3 style="font-size:14px">流量码</h3>
        <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
        </el-input>
        <el-tree
        v-loading="loading"
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
      <div class="button-div2">
        <el-button type="primary" @click="flowSure()" icon="el-icon-check"
          >确 定</el-button
        >
        <el-button @click="flowCancle()" icon="el-icon-close">取 消</el-button>
      </div>
        
    </div>
        
      
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { service, serviceJson } from "../axios/index.js";
import { getflowCode} from "@/api/subjectFrame.js";
export default {
  name: "treeFrame",
  data() {
    return {
          data: [],
        defaultProps: {
          children: 'children',
          label: 'fnameL2'
        },
      filterText: '',//过滤字
      loading:true,
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
      getData: ``, //选中的数据
      loading: true, //表格loading
      flongNumber:'',//流量码的code
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
        this.getData="";
        if(data.children===null){
            this.getData= data;
        }
    },
    //选择数据
    //  filterNode(value, data) {
    //     if (!value) return true;
    //     return data.fnameL2.indexOf(value) !== -1;
    //   },
       filterNode(value,data,node) {
  if(!value){
    return true;
  }
  let level = node.level;
  let _array = [];//这里使用数组存储 只是为了存储值。
  this.getReturnNode(node,_array,value);
  let result = false;
  _array.forEach((item)=>{
    result = result || item;
  });
  return result;
},
getReturnNode(node,_array,value){
 let isPass = node.data &&  node.data.fnameL2 && node.data.fnameL2.indexOf(value) !== -1;
 isPass?_array.push(isPass):'';
 this.index++;
 if(!isPass && node.level!=1 && node.parent){
  this.getReturnNode(node.parent,_array,value);
 }
},
    gettree(e) {
      getflowCode({flongNumber:this.flongNumber})
        .then(res => {
            if(res.code=='success'){
                this.loading=false;
                this.data=res.data
            }
      })
    },
    //关闭
    flowCancle() {
      this.$emit("flowCancle");
      this.getData = ``;
    },
    //确定
    flowSure() {
      if (this.getData == ``) {
        this.$openWarning("请选择数据");
        return false;
      }
      this.$emit("flowSure", this.getData);
      this.getData = ``;
    },
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
.subject-frame{
    .el-input__inner{
        height: 32px !important;
        // line-height: ;
    }
    .el-tree {
        overflow-y: scroll;
        height: 300px;
    }
}

</style>

