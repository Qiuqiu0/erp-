<template>
  <div id="MaterialPropertiesListAdd" class="content-div2">
    <!--按钮样式-->
    <div class="button-div">
      <el-button
        v-if="!specifiId && type != 3"
        class="query-button"
        @click="saveGroup(1)"
         icon="el-icon-suitcase">保存</el-button
      >
      <el-button
        v-else-if="type != 3"
        class="query-button"
        @click="saveGroup(2)"
        icon="el-icon-suitcase">保存</el-button
      >
      <el-button v-if="type != 3" icon="el-icon-close" @click="cancel()">取消</el-button>
       <el-button v-if="type == 3" icon="el-icon-back" @click="cancel()">返回</el-button>
    </div>
    <div class="input-div2">
      <el-col :span="24" class="el-col  el-col-required">
        <label><span class="must-full">*</span> 物料属性组名称</label>
        <el-input
          size="small"
          v-if="type != 3"
          :class="errorKey.includes('specificationGroupName') ? 'inputRed' : ''"
          v-model="specificationGroupName"
          placeholder="请输入"
        ></el-input>
        <el-input
          size="small"
          v-else
          :disabled="true"
          :class="errorKey.includes('specificationGroupName') ? 'inputRed' : ''"
          v-model="specificationGroupName"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="24" class="el-col">
        <label>物料属性组说明</label>
        <el-input
          size="small"
          v-if="type != 3"
          v-model="description"
          placeholder="请输入"
        ></el-input>
        <el-input
          size="small"
          v-else
          :disabled="true"
          v-model="description"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="24" class="el-col">
         <label>物料属性组状态</label>
         <el-select v-model="isInactiveGroup" placeholder="请选择" v-if="type != 3">
            <el-option
                  v-for="item in stateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
          </el-select>
          <el-select v-model="isInactiveGroup" placeholder="请选择"  :disabled="true" v-else>
            <el-option
                  v-for="item in stateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
          </el-select>
        </el-col>
    </div>
    <!-- 操作按钮 -->
    <div class="button-div">
        <el-button class="addBut" v-if="type != 3" @click="addRow()"
       icon="el-icon-plus">添加行</el-button
      >
      <el-button class="addBut" v-if="type != 3" @click="delData()"
        icon="el-icon-minus">删除行</el-button
      >
      <el-button class="addBut" v-if="type != 3" icon="el-icon-upload2">导入</el-button>
    </div>
    <!-- 表格 -->
    <div class="el-table-div">
      <el-table
        :data="tableData"
        ref="table"
        tooltip-effect="dark"
        border
        stripe
        style="width: 100%"
        @select-all="dialogCheck"
        @select="dialogCheck"
        @selection-change="handleChangeTable"
        @row-dblclick="dbClick"
      >
        <el-table-column
          v-if="type != 3"
          type="selection"
          width="45"
          align="center"
        ></el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="物料属性名称">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select
                clearable
                size="mini"
                @change="
                  handleChangeName(scope.$index, scope.row.specificationName)
                "
                v-model="scope.row.specificationName"
                placeholder="请选择"
                class="el-select input__inner"
              >
                <el-option
                  v-for="(item, index) in propertiesList"
                  :key="index"
                  :label="item.specificationName"
                  :value="item.specificationName"
                ></el-option>
              </el-select>
            </div>
            <div v-else>
              {{ scope.row.specificationName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="物料属性状态">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select
                clearable
                size="mini"
                @change="handleChange"
                v-model="scope.row.isInactive"
                placeholder="请选择"
                class="el-select input__inner"
              >
                <el-option
                  v-for="(item, index) in propertiesStatusList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
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
  </div>
</template>
<script>
import { mapState } from "vuex";
import api from "@/api/productData/productData";
export default {
  name: "MaterialPropertiesListAdd",
  data() {
    return {
      errorKey: [],
      specificationGroupName: "", //属性组名称
      description: "", //说明,
      specifiId: "", //修改时页面传过来的id
      isInactive: 0,
      version: "", //版本号
      specificationIdList: [],
      propertiesStatusList: [
        {
          value: 0,
          label: "启用"
        },
        {
          value: 1,
          label: "禁用"
        }
      ], //名称组
      stateList: [
        { value: 0, label: "启用" },
        { value: 1, label: "禁用" }
      ], //状态列表
      isInactiveGroup:0,//属性组状态
      tableData: [], //列表
      selectioned: null, //表格选中项
      propertiesList: [], //属性数组
      type: "" //页面类型 1新增 2修改 3查看
    };
  },
  created() {
    this.type = this.$route.query.type;
    if (localStorage.getItem("specificationGroupId") && this.type != 1) {
      this.specifiId = localStorage.getItem("specificationGroupId");
      this.initGroup(); //修改初始化
    } else {
      this.getProperties();
    }
  },
  methods: {
    //初始化列表
    initGroup() {
      let params = {
        specificationGroupId: this.specifiId
      };
      api.selectList(params).then(res => {
          if (res.code == "success") {
            this.description = res.data.list[0].description;
            this.specificationGroupName =
              res.data.list[0].specificationGroupName;
            this.isInactiveGroup = res.data.list[0].isInactive; //属性状态
            this.tableData = res.data.list[0].specificationList;
            this.version = res.data.list[0].version;
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
    },
    //表格单选
    dialogCheck(selection, row) {
      this.$refs.table.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.tableData.indexOf(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
    },
    //选中的值
    handleChange(val) {},
    handleChangeName(index, val) {
      for (const iterator of this.propertiesList) {
        if (iterator.specificationName == val) {
          this.tableData[index].isInactive = iterator.isInactive;
          // this.tableData[index].specificationNumber =
          //   iterator.specificationNumber;
          this.tableData[index].specificationId = iterator.specificationId;
        }
      }
    },
    //表格选择
    handleChangeTable(e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    //双击选中
    dbClick(row) {
      if (this.type != 3) {
        this.$refs.table.clearSelection();
        this.tableData.forEach(item => {
          item.edit = false;
        });
        if (this.specifiId) {
          this.getProperties();
        }
        if (row) {
          this.selectioned = row;
          this.index = this.tableData.indexOf(row);
          this.tableData[this.index].edit = true;
        }
        this.$set(this.tableData, this.index, row);
      }
    },
    // 增加行
    addRow() {
      this.getProperties();
      this.tableData.forEach(item => {
        item.edit = false;
      });
      var obj = {
        edit: true,
        specificationName: "",
        isInactive: "",
        delFlag:true,
      };

      this.tableData.unshift(obj);
    },
    // 删除选中行
    delData() {
      if (!this.selectioned) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return;
      }
      if (!this.selectioned.delFlag){
        var data = this.selectioned;
        data.specificationGroupId=localStorage.getItem("specificationGroupId");
        this.$confirm("是否确定删除?", "删除提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false
        })
          .then(() => {
            api
              .deleteGroupItem(data)
              .then(res => {
                if (res.code == "success") {
                  this.$message({
                    duration: 1000,
                    showClose: true,
                    message: res.message,
                    type: "success"
                  });
                  this.tableData.splice(this.index, 1);
                  // 删除完数据之后清除勾选框
                  this.$refs.table.clearSelection();
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
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        this.tableData.splice(this.index, 1);
        // 删除完数据之后清除勾选框
        this.$refs.table.clearSelection();
      }
    },
    //获取属性
    getProperties() {
      let data = {
        pageNum: 1,
        pageSize: 1000,
        isInactive: 0
      };
      api
        .querySpecificationInfoList(data)
        .then(res => {
          if (res.code == "success") {
            let list=res.data;
            //删除已经选择的
            list =list.filter(dataXs => {
              let get =this.tableData.some(dataWl => {
                return dataWl.specificationId== dataXs.specificationId;
              });
              return !get;
          });
            this.propertiesList =list;
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
    },
    //新增保存
    saveGroup(type) {
      //type 1新增   2修改
      this.errorKey = [];
      if (!this.specificationGroupName) {
        this.errorKey.push("specificationGroupName")
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("请将必填项补充完整！");
        return false;
      }
      if (this.tableData.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "属性信息不能为空!",
          type: "warning"
        });
        return;
      }
      let url = "";
      let GdSpecificationGroupForm = {
        specificationGroupName: this.specificationGroupName,
        description: this.description,
        specificationList: this.tableData,
        isInactive:this.isInactiveGroup
      };
      if (type == 1) {
        url = api.insertGroup;
      } else {
        GdSpecificationGroupForm.specificationGroupId = this.specifiId;
        GdSpecificationGroupForm.version = this.version;
        url = api.updateGroup;
      }
      url(GdSpecificationGroupForm)
        .then(res => {
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.message,
              type: "success"
            });

            this.cancel();
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
    },
    //取消
    cancel() {
      this.$router.push({
        //核心语句
        path: "/index/productData/MaterialPropertiesList" //跳转的路径
      });
    }
  }
};
</script>
<style>
.el-select:hover .el-input__inner {
  border-color: #97999e !important;
}
.el-input--small .el-input__inner {
  border-color: #97999e !important;
}

.el-select .el-input__inner,
.el-input .el-input__inner {
  font-size: 12px !important;

  border-color: #97999e !important;
}
input::-webkit-input-placeholder {
  /* placeholder字体大小  */
  font-size: 12px;
}
</style>
<style lang="scss" scoped>
.input-div2 {
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  text-align: left;
  .el-col .el-input,
  .el-select {
    width: 16%;
    height: 24px;
  }
}
label {
  text-align: right;
  display: inline-block;
  width: 11%;
}
label:after {
  content: "：";
}
.el-table-add-row {
  margin-top: 10px;
  width: 100%;
  height: 34px;
  border: 1px dashed #c1c1cd;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  line-height: 34px;
}
.el-col-24 {
  width: 97%;
  margin-bottom: 10px;
  // padding-left: 12px;
}
.el-col-24:first-child {
  margin-top: 10px;
}
.addBut {
  height: 26px;
  padding: 0;
  width: auto;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  background: #fff;
  border: 1px solid #31478f;
  color: #31478f;
  padding: 0 6px 0 5px;
}
</style>
