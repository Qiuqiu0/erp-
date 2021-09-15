<template>
  <div class="materialFiles">
    <div class="button-div auto-sibling">
      <el-button class="query-button"
                 @click="queryData"
                 icon="el-icon-search">查询</el-button>
      <el-button @click="clearNone"
                 icon="el-icon-refresh">重置</el-button>
    </div>
    <div class="index-div3 auto-sibling">
      <p class="hide-input" v-if="show" @click="inputShow()">更多条件 <i class="el-icon-caret-bottom"></i></p>
      <p class="hide-input" v-else @click="inputShow()">收起<i class="el-icon-caret-top"></i></p>
      <div class="search-div">
        <el-row :gutter="10">
        <el-col :span="5"
                class="el-col">
          <label><span>SPU物料编码</span></label>
          <el-input v-model="spuCode"
                    size="small"
                    class="el-inputs"
                  ></el-input>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>SPU物料名称</label>
          <el-input v-model="spuName"
                    class="el-inputs"
                    size="small"
                    ></el-input>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>SKU物料编码</label>
          <el-input v-model="skuCode"
                    size="small"
                    class="el-inputs"
                    ></el-input>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>SKU物料名称</label>
          <el-input v-model="skuName"
                    class="el-inputs"
                    size="small"
                     ></el-input>
        </el-col>
        </el-row>
        <el-row :gutter="10">
        <el-col :span="6" class="el-col" style="padding-left: 37px;">
           <span>物料大类：</span>
          <el-cascader v-model="propertiesValue"
                       :options="treeData"
                       change-on-select
                       :props="defaultProps"
                       :show-all-levels="false"
                       @input="handleChange"></el-cascader>
        </el-col>
        <el-col :span="5" class="el-col">
          <label style="display:inline-block;width:14%;text-align:right;font-size:12px;
 vertical-align:middle;margin-left: -19%">状态</label>
          <el-select v-model="isInactive"
                     placeholder="请选择"
                     clearable
                     size="small"
                     class="el-inputs">
            <el-option v-for="item in propertiesList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        </el-row>
      </div>
    </div>
    <!--标签页-->
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-button class=""
                 icon="el-icon-folder-add"
                 v-if="$actionFlag(`F001`)"
                 @click="addbutton">新增</el-button>
      <el-button @click="materialFilesChange()"
                 v-if="$actionFlag(`F002`)"
                 icon="el-icon-edit"> 修改</el-button>
      <el-button icon="el-icon-data-line"
                 v-if="$actionFlag(`F003`)"
                 @click="seeButton">查看</el-button>
      <!-- <el-button @click="saveData()">保存</el-button> -->
      <!-- <el-button @click="setUp(1)">修改</el-button> -->
      <el-button @click="setUp(2)"
                 icon="el-icon-delete"
                 v-if="$actionFlag(`F004`)">删除</el-button>
      <el-button @click="setUp(0)"
                 icon="el-icon-unlock"
                 v-if="$actionFlag(`F005`)">启用</el-button>
      <el-button @click="setUp(1)"
                 icon="el-icon-lock"
                 v-if="$actionFlag(`F006`)">禁用</el-button>
      <el-button icon="el-icon-download" v-if="$actionFlag(`F007`)"    @click="exportFile()">导出</el-button>
    </div>
    <div class="el-table-div"
         v-auto>
      <el-table border
                center
                :data="tableData"
                class="el-table"
                tooltip-effect="dark"
                style="width: 100%"
                ref="table"
                height="calc(100% - 35px)"
                @selection-change="selectRow"
                @row-click="rowClick"
                @row-dblclick="handleRowDblclick"
                v-loading="loading">
        <el-table-column type="selection"
                         width="45"
                         align="center"></el-table-column>
        <el-table-column label="序号"
                         type="index"
                         width="60"
                         align="center"></el-table-column>
        <el-table-column label="SPU物料编号">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input size="mini"
                        placeholder="请输入内容"
                        v-model="scope.row.spuCode"></el-input>
            </div>
            <div v-else>
              {{ scope.row.spuCode }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="SPU物料名称">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input size="mini"
                        placeholder="请输入内容"
                        v-model="scope.row.spuName"></el-input>
            </div>
            <div v-else>
              {{ scope.row.spuName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="物料大类">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input size="mini"
                        placeholder="请输入内容"
                        v-model="scope.row.categoryShowName"></el-input>
            </div>
            <div v-else>
              {{ scope.row.categoryShowName }}
            </div>
          </template>
        </el-table-column>
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
      <!--分页background-->
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageNum"
                     :page-sizes="[100, 200, 300,500]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <!--导出弹窗 开始-->
      <el-dialog :visible.sync="exportShow" :close-on-click-modal="false"   :show-close="false"  title="导出" width="400px" class="popup_box">
          <div class="examine-dialog examine-dialog2">
              <el-col :span="24" class="el-col">
                  <label style="width:30%"><span class="must-full">*</span>导出日期范围</label>
                  <el-date-picker
                   class="el-input2"
                  v-model="createdTime"
                  type="daterange"
                  size="mini"
                  @change="changeTime"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-col>
          </div>
          <div class="button-div2" style="margin-bottom:10px">
              <el-button  @click="exportSure" icon="el-icon-check" :disabled="exportStatus">确定</el-button>
              <el-button  @click="exportShow=false;" icon="el-icon-close">取消</el-button>
          </div> 
      </el-dialog>
      <!--导出弹窗 结束-->
  </div>
</template>
<script>
import api from "@/api/productData/productData";
import costPrefetchEditVue from "../costData/costPrefetchEdit.vue";
export default {
  name: "MaterialFiles",
  data () {
    return {
      filescode: "",
      skuCode: "", //物料编码
      skuName: "", //物料名称
      spuCode: "", //物料编码
      spuName: "", //物料名称
      treeData: [],
      tableData: [], //列表
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      propertiesValue: [], //大类value
      selectlistRow: [],
      loading: false,
      show: true,
      isInactive: '',//状态
      propertiesList: [{
        value: "0",
        label: "启用"
      },
      {
        value: "1",
        label: "禁用"
      }],
      propertiesStatusList: [
        {
          value: "0",
          label: "启用"
        },
        {
          value: "1",
          label: "禁用"
        }
      ],
      defaultProps: {
        children: "childGoodsCategorys",
        label: "categoryName",
        value: "categoryId"
      },
      createdTime:[],//创建日期
      exportShow:false,
      exportStatus:false,
    };
  },
  created () {
            //取查询条件
    this.$getQueryData(this);
    this.queryData();
    localStorage.removeItem("propertiesValue", this.propertiesValue)
    this.initTreeData();
  },
  methods: {
    changeTime(e){
      this.createdTime=e;
      this.exportStatus=true;
      if(this.createdTime){
        this.exportStatus=false;
      }
    },
    exportFile(){
      this.createdTime=[];
      this.exportShow=true;
      this.exportStatus=true;
    },
    //导出
   exportSure(){
      if(this.createdTime.length){
        let data={
          createdTimeStart:this.createdTime[0]+" 00:00:00",
          createdTimeEnd:this.createdTime[1]+" 23:59:59"
        }
        api.exportGdGoodsBaseSku(data).then(res=>{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="存货档案.xls";
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          this.exportShow=false;
        }).catch();
      }
   },
    //获取表格
    queryData () {
      this.loading = true;
      if (this.skuName) {
        var skuName = this.skuName;
      }
      if (this.skuCode) {
        var skuCode = this.skuCode;
      }
      if (this.spuName) {
        var spuName = this.spuName;
      }
      if (this.spuCode) {
        var spuCode = this.spuCode;
      }
      if (
        this.propertiesValue != null &&
        this.propertiesValue &&
        undefined &&
        this.propertiesValue != []
      ) {
        var spuId = this.propertiesValue;
      }
      if (localStorage.getItem("propertiesValue")) {
        var propertiesValue = localStorage.getItem("propertiesValue")
      }
      if (this.isInactive) {
        var isInactive = this.isInactive
      }
      let params = {
        spuId: spuId,
        skuCode: skuCode,
        skuName: skuName,
        spuCode: spuCode,
        spuName: spuName,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        categoryId: propertiesValue,
        isInactive: isInactive
      };
           //存查询条件
      this.$setQueryData(this,params);
      api
        .getGdGoodsBaseSpuList(params)
        .then(res => {
          if (res.code == "success") {
            this.tableData = res.data;
            this.total = res.total;
            this.loading = false;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "调用失败",
              type: "error"
            });
          }
        })
        .catch();
    },
    initTreeData () {
      api
        .getGoodsCategoryTree()
        .then(res => {
          if (res.code == "success") {
            this.treeData = res.data;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "保存失败",
              type: "error"
            });
          }
        })
        .catch();
    },
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    //物料大类
    handleChange (val) {
      this.propertiesValue = val[val.length - 1];
      localStorage.setItem("propertiesValue", this.propertiesValue)
      let params = {
        categoryId: this.propertiesValue
      };
      api
        .getGdSpecificationInfoListByCategoryId(params)
        .then(res => {
          if (res.code == "success") {
            this.cols = [];
            for (var i = 0; i < res.data.length; i++) {
              let obj = new Object();
              obj.label = res.data[i].specificationName;
              obj.id = res.data[i].specificationId;
              this.cols.push(obj);
            }
            if (this.cols != []) {
              this.show = true;
            }
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "调用失败",
              type: "error"
            });
          }
        })
        .catch();
    },
    saveData () { },
    //新增
    addbutton () {
      localStorage.removeItem("spuId"); //移除所有的缓存数据;
      this.$router.push({
        //核心语句
        path: "/index/productData/MaterialFilesAdd" //跳转的路径
      });
    },
    //查看
    seeButton () {
      if (this.selectlistRow == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return;
      } else if (this.selectlistRow.length > 1) {
        this.$openWarning("不能批量操作");
        return;
      }
      localStorage.setItem("id", this.selectlistRow[0].spuId);
      this.$router.push({
        //核心语句
        path: "/index/productData/MaterialFilesSee" //跳转的路径
      });
    },
    // 获取表格选中时的数据
    selectRow (e) {
      // if (e.length === 0) {
      this.selectlistRow = e;
      // }
    },
    // //表格单选
    // dialogCheck(selection, row) {
    //   this.$refs.table.clearSelection();
    //   if (selection.length === 0) {
    //     // 判断selection是否有值存在
    //     return;
    //   }
    //   if (row) {
    //     this.selectioned = row;
    //     this.index = this.tableData.indexOf(row);
    //     this.$refs.table.toggleRowSelection(row, true);
    //   }
    // },
    //单行点击
    rowClick (e) {
      this.$refs.table.toggleRowSelection(e);
      this.selectioned = e;
      this.index = this.tableData.indexOf(e);
    },
    handleRowDblclick (row) {
      this.seeButton();
    },
    //修改
    materialFilesChange () {
      if (this.selectlistRow == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return;
      } else if (this.selectlistRow.length > 1) {
        this.$openWarning("不能批量操作");
        return;
      }
      localStorage.setItem("id", this.selectlistRow[0].spuId);
      this.$router.push({
        //核心语句
        path: "/index/productData/materialFilesChange" //跳转的路径
      });
    },
    //数据操作 2删除 0启用1禁用
    setUp (type) {
      if (this.selectlistRow.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return false;
      }
      let tips = "";
      if (type == 2) {
        tips = "删除";
      } else if (type == 1) {
        tips = "禁用";
      } else {
        tips = "启用";
      }
      this.$confirm("是否确定" + tips + "?", tips + "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var list = [];
          for (let i = 0; i < this.selectlistRow.length; i++) {
            if (type == 2 && this.selectlistRow[i].isInactive != 1) {
              this.$message({
                duration: 1000,
                showClose: true,
                message: "只有在禁用状态才能删除",
                type: "warning"
              });
              return false;
            }
            let params = {};
            params.isInactive = type;
            params.spuId = this.selectlistRow[i].spuId;
            params.version = this.selectlistRow[i].version;
            list.push(params);
          }
          api
            .isInactiveGdGoodsBaseSpuList(list)
            .then(res => {
              if (res.code == "success") {
                this.$message({
                  duration: 1000,
                  showClose: true,
                  message: res.message,
                  type: "success"
                });
                this.queryData();
                // this.treeData = res.data
              } else {
                this.$message({
                  duration: 1000,
                  showClose: true,
                  message: "调用失败",
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
    },
    //    //单行双击
    // dblclick(e){
    //   let index = this.tableData.indexOf(e);
    //   this.tableData.forEach(item => {
    //     item.edit = false;
    //   });
    //   this.tableData[index].edit = true;
    // },
    //分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.queryData();
    },
    handleCurrentChange (val) {
      this.pageNum = val;
      this.queryData();
    },
    //清空选项
    clearNone () {
      (this.spuCode = ""), (this.spuName = ""),(this.skuCode = ""), (this.skuName = ""), (this.propertiesValue = ""), (this.isInactive = "");
      localStorage.removeItem("propertiesValue", this.propertiesValue)
      this.queryData()
    }
  }
};
</script>
<style >
.examine-dialog2  .el-range-editor--mini .el-col{
      margin-left: 10px;
}
 .examine-dialog2  .el-range-editor--mini .el-range-separator{
      width: 20%;
      padding:0;
    padding-top: 3px;
    
}
.examine-dialog2 .el-range-editor--mini .el-range__icon{
  margin-left: 5px;
  line-height: 24px;
}
.examine-dialog2 .el-date-editor .el-range-input{
  width: 55%;
}
</style>
<style  scoped lang="scss">
.index .index-div3 label{
    display: inline-block;
    width: 34%;
    text-align: right;
    font-size: 12px;
    vertical-align: middle;
}
.index .index-div3 .el-input {
    width: 60%;
    height: 24px;
    font-size: 12px;
}
.index .index-div3 .el-select {
    width: 62%;
}
.index .index-div3 .el-select .el-input {
    width: 82%;
}
.index .index-div3 .el-col:last-child {
    margin-top: 10px;
    margin-bottom: 10px;
}
.el-cascader{
  width: 70%;
}
.el-input .el-input--suffix{
  width: 100% !important;
}
.custom-31478F .el-col-6 {
    width: 33%;
}
.propertiestatus{
display: inline-block;
 width:14%;
 text-align: right;
 font-size: 12px;
 vertical-align: middle;

}
.index .el-button.is-disabled, .index .el-button.is-disabled:focus, .index .el-button.is-disabled:hover{
    color: #c0c4cc;
    cursor: not-allowed;
    background-color: #fff;
    border:1px solid  #ebeef5;
}
.index .examine-dialog .el-col{
    width: 100%;
    position: relative;
}
.examine-dialog .el-col .comicon {
    width: 70%;
    height: 20px;
    position: absolute;
    right: 13px;
    top: 2px;
    cursor: pointer;
    text-align: right;
    padding-right: 6px;
}

.index .examine-dialog .el-col .el-input2, .index .examine-dialog .el-col .el-select, .index .examine-dialog .el-col .el-textarea{
  width: 220px;
}
</style>
