<template>
  <div id="MaterialClassification"
       style="overflow:hidden">
    <div class="auto-sibling"></div>
    <el-col :span="5"
            v-auto>
      <div class="besides">
        <h3 style="font-size:14px">物料大类</h3>
        <div style="height:100vh">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText" style="margin-top:10px">
          </el-input>
          <el-button type="text"
                     style="text-align:left"
                     @click="resetChecked">根节点</el-button>
          <el-tree 
                  class="filter-tree"
                  :data="treeData"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                  :highlight-current="true"
                  :accordion="true"
                  :filter-node-method="filterNode"
                  :expand-on-click-node="false"
                  ref="tree"
                   >
          </el-tree>
        </div>
      </div>
    </el-col>
    <el-col :span="18"
            style="width:85%">
      <!--按钮样式-->
      <div class="button-div auto-sibling">
        <el-button class="addBut"
                   icon="el-icon-folder-add"
                   v-if="$actionFlag(`F001`)"
                   @click="addRow()">新增</el-button>
        <!-- <el-button class="addBut" icon="el-icon-folder-add" v-else @click="addRow()">新增</el-button> -->
        <el-button @click="updataTd()"
                   v-if="$actionFlag(`F002`)"
                   icon="el-icon-edit">修改</el-button>
        <el-button class="addBut"
                   v-if="$actionFlag(`F003`)"
                   icon="el-icon-delete"
                   @click="delData()">删除</el-button>
        <el-button @click="saveData()"
                   v-if="$actionFlag(`F004`)"
                   icon="el-icon-suitcase">保存</el-button>
      </div>
      <div class="input-div auto-sibling">
        <el-col :span="7"
                class="el-col"
                style="margin-left:9%">
          <label style="width:34%">物料大类代码</label>
          <el-input v-model="categoryId"
                    :disabled="true"
                    class="el-inputs"
                    ></el-input>
        </el-col>
        <el-col :span="7"
                class="el-col"
                style="margin-left:20%">
          <label style="width:34%">物料大类名称</label>
          <el-input v-model="categoryName"
                    :disabled="true"
                    class="el-inputs"
                   ></el-input>
        </el-col>
      </div>
      <!-- 表格 -->

      <div class="el-table-div"
           v-auto>
        <el-table border
                  center
                  height="calc(100% - 35px)"
                  :data="tableData"
                  class="el-table"
                  style="width: 100%"
                  ref="table"
                  v-loading="loading"
                  @selection-change="selectRow"
                  @row-dblclick="dbClick"
                  @row-click="rowClick">
          <el-table-column type="selection"
                           width="55"></el-table-column>
          <el-table-column label="序号"
                           type="index"
                           width="60"
                           align="center"></el-table-column>
          <el-table-column label="物料大类代码"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="scope.row.edit && !scope.row.categoryId">
                <span class="must-full">*</span>
                <el-input type='text' size="mini"
                          placeholder="请输入内容"
                          v-model="scope.row.categoryCode"  @input="handleCategoryCode(scope.row.categoryCode)"></el-input>
              </div>
              <div v-else>
                {{ scope.row.categoryCode }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="物料大类名称"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <span class="must-full">*</span>
                <el-input placeholder="请输入内容"
                          v-model="scope.row.categoryName"></el-input>
              </div>
              <div v-else>
                {{ scope.row.categoryName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="物料大类说明"
                           width="160px"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input size="mini"
                          placeholder="请输入内容"
                          v-model="scope.row.categoryInstr"></el-input>
              </div>
              <div v-else>
                {{ scope.row.categoryInstr }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="物料属性组"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <span class="must-full">*</span>
                <el-select clearable
                           size="mini"
                           filterable
                           v-model="scope.row.specificationGroupName"
                           placeholder="请选择"
                           class="el-select input__inner">
                  <el-option v-for="(item, index) in propertiesGroupList"
                             :key="index"
                             :label="item.specificationGroupName"
                             :value="item.specificationGroupName"></el-option>
                </el-select>
              </div>
              <div v-else>
                {{ scope.row.specificationGroupName }}
              </div>
            </template>
          </el-table-column>
           <el-table-column label="行业分类"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <span class="must-full">*</span>
                <el-select clearable
                           size="mini"
                           filterable
                           v-model="scope.row.industryCate"
                           placeholder="请选择"
                           class="el-select input__inner">
                   <el-option v-for="(item, index) in industryCateList"
                             :key="index"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </div>
              <div v-else>
                {{ scope.row.industryCate }}
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column  label="增值税率">
                        <template slot-scope="scope">
                            <div v-if='scope.row.edit'>
                            <el-input size="mini" placeholder="请输入内容" v-model="scope.row.taxRate"></el-input>
                            </div>
                            <div v-else>
                                {{scope.row.taxRate}}
                            </div>
                        </template>
                    </el-table-column> -->
          <el-table-column label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-select clearable
                           size="mini"
                           v-model="scope.row.isInactive"
                           placeholder="请选择"
                           class="el-select input__inner">
                  <el-option v-for="(item, index) in propertiesStatusList"
                             :key="index"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </div>
              <div v-else>
                <span v-if="scope.row.isInactive == 0">启用</span>
                <span v-else>禁用</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </div>
</template>
<script>
import { mapState } from "vuex";
import api from "@/api/productData/productData";
export default {
  name: "MaterialClassification",
  data () {
    return {
      filescode: "",
      categoryId: "", //物料属性代码
      categoryName: "", //属性名称，
      tableData: [], //列表
      newTable: [], //新建数据
      selectioned: [], //表格选中项
      page: 1, //总页数
      pageSize: 1000, //页显示条数
      total: 0, //总数目
      treeData: [], //树节点数据
      propertiesGroupList: [], //物料属性组
      parentCategoryId: "", //大类id
      loading: false,
      index: "",//选中下标
      defaultProps: {
        //树节点
        children: "childGoodsCategorys",
        label: "categoryName"
      },
      filterText: '',
      level: "", //树节点等级
      propertiesStatusList: [
        {
          value: 0,
          label: "启用"
        },
        {
          value: 1,
          label: "禁用"
        }
      ], //状态
      industryCateList:[
        {
          value: "原木",
          label: "原木"
        },
        {
          value: "板材",
          label: "板材"
        },
        {
          value: "钢材",
          label: "钢材"
        },
        {
          value: "其他",
          label: "其他"
        }
      ]
    };
  },
  created () {
    this.initTreeData();
    this.getGroupList();
  },
  activated () {
    this.getGroupList();
  },
  watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.categoryName.indexOf(value) !== -1;
    },
    //获取树形结构
    initTreeData () {
      this.loading = true;
      api.getGoodsCategoryTree().then(res => {
          if (res.code == "success") {
            this.treeData = res.data;
            this.tableData = res.data;
            this.loading = false;
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },

    //点击节点
    handleNodeClick (data, node) {
      //this.level = node.level; //当等级为3级时隐藏新增
      this.tableData = [];
      this.categoryId = data.categoryCode;
      this.categoryName = data.categoryName;
      if (data.childGoodsCategorys) {
        this.tableData = data.childGoodsCategorys;
        this.tableData.forEach(item => {
          item.edit = false;
        });
      }
      this.parentCategoryId = data.categoryId;
      this.initData();
    },
    //验证代码格式
    handleCategoryCode(value){
      value = value.replace(/[^\w^\.]+/g, '').replace('.', '')
      this.tableData[this.index].categoryCode= value;
    },
    //根据节点查询数据
    initData () {
      this.loading=true;
      let data= {
        parentCategoryId: this.parentCategoryId
      };
      api.goodsCategorySelect(data).then(res => {
          if (res.code == "success") {
              this.tableData = res.data.list;
              this.loading=false;
              if(res.data.list.length){
                  this.specificationGroupName=res.data.list[0].specificationGroupName;
              }
          } else {
            this.loading=false;
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //获取物料属性组
    getGroupList() {
      let data = {
        page: this.page,
        pageSize: this.pageSize
      };
      api.selectList(data).then(res => {
          if (res.code == "success") {
            this.propertiesGroupList = res.data.list;
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },

    // 获取表格选中时的数据
    selectRow (e) {
      //表格选择
      this.selectioned = e;
    },
    //单行点击
    rowClick (e) {
      this.index = this.tableData.indexOf(e);
      this.$refs.table.toggleRowSelection(e);

    },
    //双击选中
    dbClick (row) {
      this.getGroupList();
      //this.$refs.table.clearSelection();
      this.tableData.forEach(item => {
        item.edit = false;
        
      });
      if (row) {
        this.selectioned.push(row);
        this.selectioned.forEach((it,index)=>{
          if(row.categoryId==it.categoryId){
            this.selectioned.splice(1,index);
          }
        })
        this.index = this.tableData.indexOf(row);
        this.tableData[this.index].edit = true;
        this.$refs.table.toggleRowSelection(row, true);
      }
      this.$set(this.tableData, this.index, row);
    },

    resetChecked () {
      this.categoryId = "";
      this.categoryName = "";
      this.initTreeData();
      //this.$refs.tree.treeData([]);
    },

    // 增加行
    addRow () {
      this.getGroupList();
      this.tableData.forEach(item => {
        item.edit = false;
      });
      let type = "";
      if (this.parentCategoryId) {
        type = 2;
      } else {
        type = 1;
      }
      var list = {
        categoryCode: "",
        categoryName: "",
        categoryInstr: "",
        specificationGroupName:this.specificationGroupName,
        isInactive: 0,
        edit: true,
        parentCategoryId: this.parentCategoryId,
        type: type
      };
      this.newTable.unshift(list);
      let newTable = [];
      newTable.unshift(list);
      this.tableData = newTable.concat(this.tableData);
    },
    //修改、
    updataTd () {
      if (this.selectioned.length == 0) {
        this.$openWarning("未选择数据");
        return;
      } else if (this.selectioned.length > 1) {
        this.$openWarning("不能批量操作");
        return;
      }
      this.tableData.forEach(item => {
        item.edit = false;
      });
      for (const get of this.selectioned) {
        this.tableData.forEach((item, index) => {
          if (item.categoryId == get.categoryId) {
            item.edit = true;
            this.newTable.unshift(this.selectioned[0])
          }
          this.$set(this.tableData, index, this.tableData[index]);
        });
      }
    },
    //删除
    delData () {
      let flag = false;
      for (let i = 0; i < this.selectioned.length; i++) {
        if (this.selectioned[i].categoryId && this.selectioned[i].isInactive == 0) {
          flag = true;
        }
      }
      if (flag) {
        this.$openWarning("只能删除禁用状态的数据");
        return;
      }
      var that = this;
      this.$confirm("是否确定删除?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        for (let j = 0; j < that.selectioned.length; j++) {
          if (!that.selectioned[j].categoryId) {
            that.selectioned.splice(j, 1);
          }
        }
        api.deleteClass(that.selectioned).then(res => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
            this.initTreeData();
          } else {
            this.$openWarning(res.message);
          }
        })
          .catch();


      });
    },
    //保存
    saveData () {
      if (this.selectioned.length == 0) {
        return;
      }
      for (const item1 of this.selectioned) {
        if (item1.categoryCode == "" || item1.categoryCode ==null) {
          this.$openWarning('请输入"物料大类代码"' )
          return
        } else if (item1.categoryName == "" || item1.categoryName ==null) {
          this.$openWarning('请输入"物料大类名称"')
          return
        } else if (item1.specificationGroupName == "" || item1.specificationGroupName ==null) {
          this.$openWarning('请选择"物料属性组"')
          return
        }
        for (const item2 of this.propertiesGroupList) {
          if (item1.specificationGroupName == item2.specificationGroupName){
            item1.specificationGroupId = item2.specificationGroupId;
          }
        }
      }
      api
        .saveGoodsCategorys(this.selectioned)
        .then(res => {
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.message,
              type: "success"
            });
            this.tableData.forEach(item => {
              item.edit = false;
            });

            this.initTreeData();
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.message,
              type: "error"
            });
          }
        })
        .catch();
    }
  }
};
</script>
<style lang="scss" scoped>
.index .el-col-5 {
  width: 15%;
}
.index .el-col-12 {
  width: 45%;
  text-align: center;
}
.besides {
  width: 246px;
  background: #ffffff;
  text-align: center;
  padding: 10px;
  // height: 100%;
  margin-right: 10px;
  button {
    text-align: left;
    font-size: 13px;
    margin-left: 0px;
  }
}
.el-tree-node .el-tree-node__label {
  font-size: 13px;
}
.addBut {
  width: auto;
  height: 32px;
  font-size: 12px;
  line-height: 9px;
  font-weight: 400;
  text-align: center;
  background: #fff;
  border: 1px solid #31478f;
  color: #31478f;
  padding: 0 6px 0 5px;
  padding-left: 17px;
}
.input-div .el-col .el-inputs,
.input-div .el-col .el-date-editor,
.input-div .el-col .el-select {
  width: 66% !important;
}
</style>
