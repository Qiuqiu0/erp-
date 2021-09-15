<template>
  <div id="MaterialPropertiesAdd" class="content-div2">
    <!--按钮样式-->
    <div class="button-div">
      <el-button
        v-if="!specificationId && type != 3"
        class="query-button"
        @click="saveData(1)"
        icon="el-icon-suitcase">保存</el-button
      >
      <el-button v-else-if="type != 3" class="query-button" @click="saveData(2)"
       icon="el-icon-suitcase" >保存</el-button
      >
      <el-button v-if="type != 3" icon="el-icon-close" @click="cancel()">取消</el-button>
      <el-button v-if="type == 3" icon="el-icon-back" @click="cancel()">返回</el-button>
    </div>
    <div class="input-div2">
      <el-col :span="24" class="el-col  el-col-required">
        <label><span class="must-full">*</span> 物料属性名称</label>
        <el-input
          size="small"
          v-if="type != 3"
          :class="errorKey.includes('specificationName') ? 'inputRed' : ''"
          v-model="specificationName"
          placeholder="请输入"
        ></el-input>
        <el-input
          size="small"
          v-else
          :disabled="true"
          :class="errorKey.includes('specificationGroupName') ? 'inputRed' : ''"
          v-model="specificationName"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="24" class="el-col">
        <label>物料属性说明</label>
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
      <el-col :span="24" class="el-col" v-if="type != 3">
        <label>物料属性状态</label>
        <el-select
          clearable
          size="small"
          @change="handleChangeStatus"
          v-model="isInactiveStatus"
          placeholder="请选择"
          class="el-select input__inner"
        >
          <el-option
            v-for="item in propertiesStatusList"
            :key="item.status"
            :label="item.label"
            :value="item.status"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="24" class="el-col" v-else>
        <label>物料属性状态</label>
        <el-select
          clearable
          size="small"
          @change="handleChangeStatus"
          v-model="isInactiveStatus"
          placeholder="请选择"
          class="el-select input__inner"
          disabled
        >
          <el-option
            v-for="item in propertiesStatusList"
            :key="item.status"
            :label="item.label"
            :value="item.status"
          ></el-option>
        </el-select>
      </el-col>
    </div>
    <!-- 表格 -->
    <div class="button-div">
      <el-button class="addBut" v-if="type != 3" @click="addRow()"
         icon="el-icon-plus">添加行</el-button
      >
      <el-button class="addBut" v-if="type != 3" @click="delData()"
        icon="el-icon-minus">删除行</el-button
      >
    </div>
    <div class="el-table-div">
      <el-table
        :data="tableList"
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
        <el-table-column label="物料属性值代码" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.specificationValueCode }}</span>
          </template>
        </el-table-column>

        <el-table-column label="物料属性值名称">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                placeholder="请输入内容"
                @input="checkName()"
                v-model="scope.row.specificationValue"
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.specificationValue }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="物料属性值说明">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                placeholder="请输入内容"
                v-model="scope.row.specificationDesc"
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.specificationDesc }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="物料属性值状态">
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
                  v-for="item in propertiesList"
                  :key="item.status"
                  :label="item.label"
                  :value="item.status"
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
  name: "MaterialPropertiesAdd",
  data() {
    return {
      errorKey: [],
      isInactiveStatus: 0, //属性状态，
      isInactive: 0, //属性值状态
      specificationName: "", //属性名称
      description: "", //说明,
      specificationId: "", //修改时页面传过来的id
      version: 0,
      deleteData: [], //删除的数据
      tableList: [], //列表
      selectioned: null, //表格选中项
      type: "", //页面类型，1新增，2修改，3查看
      flag:false,//属性值名称重复
      propertiesStatusList: [
        {
          status: 0,
          label: "启用"
        },
        {
          status: 1,
          label: "禁用"
        }
      ], //名称组
      propertiesList: [
        {
          status: 0,
          label: "启用"
        },
        {
          status: 1,
          label: "禁用"
        }
      ] //物料属性值状态
    };
  },
  created(){
    this.type = this.$route.query.type;
    if (localStorage.getItem("specificationId") && this.type != 1) {
      this.specificationId = localStorage.getItem("specificationId");
      this.initData(); //修改初始化
    }
  },
  methods: {
    //表格选择
    handleChangeTable(e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
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
        this.index = this.tableList.indexOf(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
    },
    //双击选中
    dbClick(row) {
      if (this.type != 3) {
        this.$refs.table.clearSelection();
        this.tableList.forEach(item => {
          item.edit = false;
        });
        if (row) {
          this.selectioned = row;
          this.index = this.tableList.indexOf(row);
          this.tableList[this.index].edit = true;
        }
        this.$set(this.tableList, this.index, row);
      }
    },
    handleChange(val) {
      this.isInactive = val;
    },
    handleChangeStatus(val) {
      this.isInactiveStatus = val;
    },
    initData() {
      let data = {
        gdSpecificationInfoId: this.specificationId
      };
      api
        .querySpecificationInfoAndValue(data)
        .then(res => {
          if (res.code == "success") {
            this.tableList = res.data.gdSpecificationValues;
            // this.specificationNumber = res.data.specificationNumber; //物料属性代码
            this.isInactiveStatus = res.data.isInactive; //属性状态，
            this.specificationName = res.data.specificationName; //属性名称
            this.description = res.data.description; //说明,
            this.version = res.data.version; //版本号
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
    // 增加行
    addRow() {
      this.tableList.forEach(item => {
        item.edit = false;
      });
      var list = {
        edit: true,
        specificationValue: this.specificationValue,
        specificationDesc: this.specificationDesc,
        isInactive: this.isInactive
      };
      this.tableList.unshift(list);
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
      if (this.selectioned.specificationValueId) {
        var data = {
          specificationValueId: this.selectioned.specificationValueId,
          version: this.selectioned.version
        };
        this.$confirm("是否确定删除?", "删除提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            api
              .delSpecificationValue(data)
              .then(res => {
                if (res.code == "success") {
                  this.$message({
                    duration: 1000,
                    showClose: true,
                    message: res.message,
                    type: "success"
                  });
                  this.deleteData.push(this.tableList[this.index]);
                  this.tableList.splice(this.index, 1);
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
          .catch();
      } else {
        this.deleteData.push(this.tableList[this.index]);
        this.tableList.splice(this.index, 1);
        // 删除完数据之后清除勾选框
        this.$refs.table.clearSelection();
      }
    },
    checkName(){
       this.flag=false;
       for(let i = 0; i < this.tableList.length - 1; i++) {
          if(this.tableList[i].specificationValue===this.tableList[i + 1].specificationValue) {//判断是否重复
            this.flag=true;
            break;
          }
       }
       if(this.flag){
         this.$openWarning("属性值名称不能重复");
         return;
       }
    },
    //取消
    cancel() {
      this.$router.push({
        //核心语句
        path: "/index/productData/MaterialProperties" //跳转的路径
      });
    },

    //保存数据
    saveData(type) {
      //type 1新增 2修改
      this.errorKey = [];
      if (!this.specificationName) {
        this.errorKey.push("specificationName")
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("请将必填项补充完整！");
        return false;
      }
      if(this.tableList.length==0){
        this.$openWarning("物料属性值不能为空");
        return;
      }
      if(this.flag){
         this.$openWarning("属性值名称不能重复");
         return;
       }
      let list = [];
      let url = "";
      this.tableList.forEach(item => {
        list.push(item);
      });
      let gdSpecificationInfoForm = {
        specificationName: this.specificationName,
        // specificationNumber: this.specificationNumber,
        isInactive: this.isInactiveStatus,
        description: this.description,
        gdSpecificationValues: []
      };
      if (type == 1) {
        gdSpecificationInfoForm.gdSpecificationValues = list;
        url = api.materialPropertiesAdd;
      } else {
          gdSpecificationInfoForm.specificationId = this.specificationId;
          gdSpecificationInfoForm.version = this.version;
          if (this.deleteData.length) {
            this.deleteData.forEach(item => {
              if (item.specificationId) {
                item.isInactive = 2; //删除行的状态给为2
                list.push(item);
              }
            });
          }

          gdSpecificationInfoForm.gdSpecificationValues = list;
      
          url = api.editSpecificationInfo;
      }
      url(gdSpecificationInfoForm)
        .then(res => {
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.message,
              type: "success"
            });
            // localStorage.removeItem("id");
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
  width: 10%;
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
  // padding-left: 3%;
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
