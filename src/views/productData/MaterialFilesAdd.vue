<template>
  <div>
    <div>
      <el-divider></el-divider>
      <!--按钮样式-->
      <div class="button-div">
        <el-button @click="saveData()" icon="el-icon-suitcase">保存</el-button>
        <el-button v-on:click="back" icon="el-icon-close">取消</el-button>
      </div>
      <el-divider></el-divider>
      <div class="input-div">
         <el-row :gutter="0">
        <el-col :span="5" class="el-col  el-col-required" style="margin-top: 2px;">
          <label>
            <span class="must-full">*</span>物料大类
          </label>
          <el-cascader
            v-model="propertiesValue"
            filterable
            :options="treeData"
            size="small"
             :class="errorKey.includes('spuName') ? 'inputRed' : ''"
            :props="defaultProps"
            :show-all-levels="false"
            @input="handleChange"
            :disabled="categoryStatus"
            class="el-cals"
          ></el-cascader>
        </el-col>
        <el-col :span="6" class="el-col-required">
          <label>
            <span class="must-full">*</span>物料编码
          </label>
          <el-input v-model="skuCode" size="small" :class="errorKey.includes('skuCode') ? 'inputRed' : ''" :disabled="true" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="6" class="el-col-required">
          <label>
            <span class="must-full">*</span>物料名称
          </label>
          <el-input v-model="spuName" :class="errorKey.includes('spuName') ? 'inputRed' : ''" size="small" class="el-inputs" @input="animateWidth"></el-input>
          <!-- @input="animateWach()" -->
          <!-- @blur="animateWidth('company_name','blur')" -->
        </el-col>
        <el-col :span="5" class="el-col-required">
          <label>
            <span class="must-full">*</span>基本单位
          </label>
          <el-select
            clearable
            filterable
            v-model="firstUnit"
             :class="errorKey.includes('firstUnit') ? 'inputRed' : ''"
            @change="handleChangeList"
            size="small"
            placeholder="请选择"
            class="el-select"
          >
            <el-option
              v-for="(item,index) in filesList"
              :key="index"
              :label="item.unitName"
              :value="item.unitId"
            ></el-option>
          </el-select>
        </el-col>
         </el-row>
          <el-row :gutter="10">
        <el-col :span="5" style="margin-left: 5px" class="el-col-required">
          <label>
            <span class="must-full">*</span>第二单位
          </label>
          <el-select
            clearable
            filterable
            v-model="secUnit"
            :class="errorKey.includes('secUnit') ? 'inputRed' : ''"
            @change="handleChangeUnit"
            size="small"
            placeholder="请选择"
            class="el-select"
          >
            <el-option
              v-for="(item,index) in filesList"
              :key="index"
              :label="item.unitName"
              :value="item.unitId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" class="el-col-required">
          <label>
            <span class="must-full">*</span>增值税率%
          </label>
          <el-input
            v-model="vatRate"
             :class="errorKey.includes('vatRate') ? 'inputRed' : ''"
            size="small"
            class="el-inputs"
            oninput="value=value.replace(/^0|[^\d]/g, '')"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col-required">
          <label>
            <span class="must-full">*</span>退税率%
          </label>
          <el-input
            v-model="refundRate"
             :class="errorKey.includes('refundRate') ? 'inputRed' : ''"
            size="small"
            class="el-inputs"
            oninput="value=value.replace(/^0|[^\d]/g, '')"
          ></el-input>
          <span class="spbutton"></span>
        </el-col>
          </el-row>
      </div>
      <!--标签页-->
      <div class="el-table-div">
        <div class="button-div">
          <el-button @click="addRow" icon="el-icon-plus">新增行</el-button>
          <el-button @click="delData()" icon="el-icon-minus">删除行</el-button>
          <!-- <el-button @click="dialogVisible = true;addMaterial()"
                     icon="el-icon-circle-plus-outline">增加属性</el-button>
          <el-button @click="dialogVisiblesync = true;delectMaterial()"
          icon="el-icon-remove-outline">删除属性</el-button>-->
        </div>
        <el-table
          border
          center
          id="tableList"
          :data="tableData"
          ref="multipleTable"
          class="el-table"
          @selection-change="selectRow"
          @select-all="dialogCheck" 
          @select="dialogCheck"
          v-loading="loading"
          height="730"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
          <el-table-column label="物料编码">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="scope.row.skuCode"
                  :disabled="true"
                ></el-input>
              </div>
              <div v-else>{{scope.row.skuCode}}</div>
            </template>
          </el-table-column>
          <el-table-column label="物料名称">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="scope.row.skuName"
                  :disabled="cateName"
                ></el-input>
              </div>
              <div v-else>{{scope.row.skuName}}</div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(col,index) in cols"
            :label="col.label"
            :key="col.id"
            v-show="show"
          >
            <template slot-scope="scope">
               <div v-if="scope.row.edit">
                <el-select
                  clearable
                  filterable
                  size="mini"
                  v-model="tableData[scope.$index].cols[index].specificationValue"
                  @change="handleChangeOption(tableData[scope.$index].cols[index].specificationValue ,scope.$index)"
                  placeholder="请选择"
                  :disabled="cateName"
                  class="el-select input__inner"
                >
                  <el-option
                    v-for="item in col.bigTable"
                    :key="item.specificationValueId"
                    :label="item.specificationValue"
                    :value="item.specificationValue"
                  ></el-option>
                </el-select>
              </div>
              <!-- <div v-else>
                {{tableData[scope.$index].id}}
              </div>-->
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-select
                  clearable
                  size="mini"
                  v-model="scope.row.isInactive"
                  placeholder="请选择"
                  :disabled="cateName"
                  class="el-select input__inner"
                >
                  <el-option
                    v-for="(item,index) in materialStatus"
                    :key="index"
                    :label="item.label"
                    :value="item.status"
                  ></el-option>
                </el-select>
              </div>
              <div v-else>
                <span v-if="scope.row.isInactive==0">启用</span>
                <span v-else>禁用</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--分页background-->
        <!-- <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[100, 200, 300,500]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination> -->
      </div>
      <!-- 添加属性弹窗 -->
      <el-dialog :title="dialogVisibleTitle" :visible.sync="dialogVisible" width="30%">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city.prop">{{city.name}}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit();dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除属性弹窗 -->
      <el-dialog :title="deleteTitle" :visible.sync="dialogVisiblesync" width="30%">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city.prop">{{city.name}}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisiblesync = false">取 消</el-button>
          <el-button type="primary" @click="confrim();dialogVisiblesync = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import api from "@/api/productData/productData";
import { Message, Loading } from "element-ui";
export default {
  name: "MaterialFilesAdd",
  data() {
    return {
      errorKey: [],
      myTip: 0,
      show: false,
      loading: false,
      disabledStr: true,
      skuCode: "", //物料编码
      skuName: "",
      spuName: "", //物料名称
      vatRate: "", //增值税率
      refundRate: "", //退税率
      filescode: "",
      tableData: [], //列表
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      filesName: "", //属性名称
      firstUnit: "", //基本单位
      secUnit: "", //第二单位
      propertiesValue: [], //大类value
      dialogVisible: false, //添加属性弹窗
      dialogVisiblesync: false, //删除属性
      materialStatus: [], //状态
      materialProp: [],
      dialogVisibleTitle: "", //属性弹窗title
      deleteTitle: "", //删除弹窗
      gdGoodsBaseSku: {},
      gdGoodsBaseSkuFormList: [],
      gdSpuSpecificationList: [],
      gdSkuSpecificationValueList: [],
      cities: [],
      checkedCities: [],
      filescodes: "",
      materialStatus: [
        {
          status: 0,
          label: "启用"
        },
        {
          status: 1,
          label: "禁用"
        }
      ], //物料档案值状态
      filesList: [], //物料单位
      treeData: [],
      cols: [],
      defaultProps: {
        children: "childGoodsCategorys",
        label: "categoryName",
        value: "categoryId",
        checkStrictly: true
      },
      selectedList: [],
      category: [], //物料大类
      materialObject: [], //物料档案表格新增
      categoryStatus: false, //物料大类状态
      cateName: false //物料名称
    };
  },
  created() {
    this.initTreeData();
    this.getFilesList();
  },
  mounted() {
  },
  methods: {
    //获取树形结构
    initTreeData() {
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
    //分页
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.initData();
    // },
    // handleCurrentChange(val) {
    //   this.pageNum = val;
    //   this.initData();
    // },
    //基本单位改变得值
    handleChangeList(val) {
      this.firstUnit = val;
    },
    //第二单位
    handleChangeUnit(val) {
      this.secUnit = val;
    },
    //属性改变的值
    handleChangeOption(e, index) {
      this.tableData[index].id = e;
      // this.changeOption = val;
      //  alert(val)
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectedList = val;
    },
    handleNodeClick(data) {},
    currentChange(e) {
      this.pageNum = e;
      //this.pariList();
    },
    back() {
      this.$router.push({
        //核心语句
        path: "/index/productData/MaterialFiles" //跳转的路径
      });
    },
    //物料大类
    handleChange(val) {
      console.log('val',val)
      this.propertiesValue = val[val.length - 1];
      this.category = this.propertiesValue;
      console.log('xaa',this.propertiesValue)
      let params = {
        categoryId: this.propertiesValue
      };
      this.loading = true;
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
            this.getmaterialProp(this.myTip=0);
            if (this.cols != []) {
              this.show = true;
            }
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
    //第二单位/基本单位
    getFilesList() {
      let data = {
        isInactiveList: 0
      };
      api
        .getGdGoodsUnitListByIsInactive(data)
        .then(res => {
          if (res.code == "success") {
            this.filesList = res.data;
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
    //增加属性
    addMaterial() {
      this.dialogVisibleTitle = "增加属性";
      let params = [
        {
          isInactive: 0
        }
      ];
      api
        .getGdSpecificationInfoListByGdSpecificationInfoList(params)
        .then(res => {
          if (res.code == "success") {
            this.cities = [];
            for (var i = 0; i < res.data.length; i++) {
              var obj = new Object();
              obj.name = res.data[i].specificationName;
              obj.prop = res.data[i].specificationId;
              this.cities.push(obj);
            }
            // this.show=true;
            //    for(var i=0; i<this.cols.length; i++){
            //      if(res.data[i].specificationName!=this.cols[i].label){
            //        obj.name=res.data[i].specificationName;
            //       console.log(res.data[i].specificationName)
            //      }else{
            //         // obj.name=res.data[i].specificationName;
            //         // alert(obj.name)
            //         //   this.cities.push(obj);
            //      }
            //       this.cities.push(obj);
            //  }
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
    //删除属性
    delectMaterial() {
      this.deleteTitle = "删除属性";
      this.cities = [];
      for (var i = 0; i < this.cols.length; i++) {
        let obj = new Object();
        obj.name = this.cols[i].label;
        this.cities.push(obj);
      }
    },
    //提交添加属性
    onSubmit() {
      if ((this.cols = [])) {
        this.cols = [];
      }
      this.checkedCities.forEach(item => {
        let obj = new Object();
        obj.label = item.name;
        this.cols.push(obj);
        if (this.cols != []) {
          this.show = true;
        }
      });
    },
    //提交删除属性
    confrim() {
      //  if(this.cols=[]){
      //       this.cols=[]
      //    }
      this.checkedCities.forEach(item => {
        let obj = new Object();
        obj.label = item.name;
        this.cols.splice(obj);
        if (this.cols != []) {
          this.show = true;
        }
      });
    },
    //物料属性值
    getmaterialProp() {
      console.log('123',this.myTip,this.cols.length);
      
      if (this.myTip < this.cols.length) {
        let data = {
          specificationId: this.cols[this.myTip].id,
          isInactiveList: "0"
        };
        console.log("qo", data);
        api
          .getGdSpecificationValueBySpecificationId(data)
          .then(res => {
            if (res.code == "success") {
              console.log("9999", res.data);
              this.materialProp = [];
              for (var i = 0; i < res.data.length; i++) {
                var obj = {};
                obj.specificationValue = res.data[i].specificationValue;
                obj.specificationValueId = res.data[i].specificationValueId;
                this.materialProp.push(obj);
              }
              this.materialObject.push(this.materialProp);
              console.log("cf", this.materialObject);
              for (let i = 0; i < this.cols.length; i++) {
                this.cols[i].bigTable = this.materialObject[i];
                // }
              }
              this.myTip = this.myTip + 1;
              this.getmaterialProp();
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
      }else {
        return false;
      }
    },
    animateWach() {
      if (this.propertiesValue == "") {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择物料大类数据",
          type: "warning"
        });
      }
    },
    //失去焦点事件
    animateWidth() {
      // if(this.tableData){
      //   this.tableData[0].spuName = this.spuName
      // }
      //  alert(this.spuName)
      // this.tableData[0].spuName = this.spuName
      // for (var i = 0; i < this.cols.length; i++) {
      //   this.cols[i].prop = "无";
      // }
      // this.tableData.forEach(item => {
      //   item.edit = false;
      // });
      // var list = {
      //   skuName: this.spuName, //物料名称
      //   edit: true
      // };
      // // this.newTbale.unshift(list);
      // let newTbale = [];
      // newTbale.unshift(list);
      // this.tableData = newTbale.concat(this.tableData);
    },
    //新增行
    addRow() {
      if (this.category <= []) {
        this.$openWarning("请填写物料大类");
        return;
      }
      if (!this.spuName) {
        this.$openWarning("请填写物料名称");
        return;
      }
      // this.tableData.forEach(item => {
      //   item.edit = false;
      // });
      var list = {
        edit: true,
        isInactive: 0,
        skuName: this.skuName, //物料名称
        cols: JSON.parse(JSON.stringify(this.cols))
      };
      let newTbale = [];
      newTbale.unshift(list);
      this.tableData = this.tableData.concat(newTbale);
      this.tableData[0].edit=false;
      if (this.tableData.length > 0) {
        this.categoryStatus = true;
        this.tableData[0].skuName = this.spuName;
      }
      if (this.tableData.length== 1) {
        this.cateName = true;
      } else {
        this.cateName = false;
      }
      // this.tableData.push(list);
    },
    //删除
    delData() {
      if (this.selectedList.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
      } else if (this.tableData.indexOf(this.selectedList[0]) == 0) {
        this.$openWarning("默认数据无法删除");
      } else {
        this.tableData.splice(this.index, 1);
        this.$refs.multipleTable.clearSelection();
      }
      // 删除完数据之后清除勾选框
    },
    //保存
    saveData() {
      if(this.tableData.length==0){ //当没有点击新增行时默认新增一条无的sku
        var list = {
        edit: true,
        isInactive: 0,
        skuCode:this.skuCode,
        skuName: this.spuName, //物料名称
        cols: JSON.parse(JSON.stringify(this.cols))
      };
      let newTbale = [];
      newTbale.unshift(list);
      this.tableData = this.tableData.concat(newTbale);
      }
      this.errorKey = [];
      if (!this.spuName) {
        this.errorKey.push("spuName")
      }
      if (!this.firstUnit) {
        this.errorKey.push("firstUnit")
      }
      if (!this.secUnit) {
        this.errorKey.push("secUnit")
      }
       if (!this.vatRate) {
        this.errorKey.push("vatRate")
      }
       if (!this.refundRate) {
        this.errorKey.push("refundRate")
      }
       
      if(this.errorKey.length > 0) {
        this.$openWarning("请将必填项补充完整！");
        return false;
      }
      //表单信息
      let gdGoodsBaseSpu = {
        spuName: this.spuName,
        firstUnit: this.firstUnit,
        secUnit: this.secUnit,
        vatRate: this.vatRate,
        refundRate: this.refundRate,
        categoryId: this.propertiesValue,
        category: this.category.toString()
      };
      // let obj = new Object();
      // let objset = new Object();
      // let arr = new Array();
      // let str = new Array();
      this.materialProp.forEach(item => {
        for (var i = 0; i < item.length; i++) {
          // str.push(item[i].specificationValue)
        }
      });
      // this.cols.forEach(item => {
      //   item.bigTable.forEach(item1 => {
      //     str.value = item1.specificationValue;
      //     str.label = item.label;
      //   });
      //   arr.push(str.label + ":" + str.value);
      //   objset = arr.join(",");
      // });
      // this.tableData[0].forEach(item => {
      //   obj.skuName = item.spuName;
      //   obj.isInactive = item.isInactive;
      //   obj.spuId = "";
      // });
      // obj.skuName =this.tableData[0].skuName//不增加报错问题
      // obj.isInactive =this.tableData[0].isInactive
      // obj.spuId = "";
      this.tableSpecificationId = [];

      let specificationId = [];
      for (var i = 0; i < this.cols.length; i++) {
        let object = new Object();
        object.specificationId = this.cols[i].id;
        specificationId.push(object);
      }
      //属性值id
      let gdGoodsBaseSkuFormList = [];
      let absq = {};
      for (var i = 0; i < this.tableData.length; i++) {
      let objset = new Object();
      let arr = new Array();
      let str = new Array();
        for (var j = 0; j < this.tableData[i].cols.length; j++) {
          for (var a = 0; a < this.tableData[i].cols[j].bigTable.length; a++) {
             if(this.tableData[i].cols[j].specificationValue==undefined){
            this.tableData[i].cols[j].specificationValue = "无"
          }
          for( let s=i+1; s<this.tableData.length; s++){
             if(this.tableData[i].skuName==this.tableData[s].skuName){
            if(this.tableData[i].cols[j].specificationValue==this.tableData[s].cols[j].specificationValue){
          this.$message({
          duration: 1000,
          showClose: true,
          message: "物料名称和属性不能完全一致",
          type: "warning"
        });
            return false
            }
           }
          }
            if (
              this.tableData[i].cols[j].specificationValue ==
              this.tableData[i].cols[j].bigTable[a].specificationValue
            ) {
              this.tableData[i].cols[j].specificationValueId = this.tableData[
                i
              ].cols[j].bigTable[a].specificationValueId;
              this.tableData[i].cols[j].specificationId = this.tableData[
                i
              ].cols[j].id;
            }
            if (!this.tableData[i].cols[j].specificationValueId) {
              if (
                this.tableData[i].cols[j].bigTable[a].specificationValue == "无"
              ) {
                this.tableData[i].cols[j].specificationValueId = this.tableData[
                  i
                ].cols[j].bigTable[a].specificationValueId;
                this.tableData[i].cols[j].specificationId = this.tableData[
                  i
                ].cols[j].id;
                this.tableData[0].isNoSpecificationValueSku = 0;
              }
            }
          }
          delete this.tableData[i].cols[j].bigTable;
          if(this.tableData[i].cols[j].specificationValue==undefined){
            this.tableData[i].cols[j].specificationValue = "无"
          }
          str.value = this.tableData[i].cols[j].specificationValue;
          str.label = this.tableData[i].cols[j].label;
          arr.push(str.label + ":" + str.value);
          objset = arr.join(",");
        }
        let gdGoodsBaseSku = {};
        gdGoodsBaseSku.isInactive = this.tableData[i].isInactive;
        gdGoodsBaseSku.skuName = this.tableData[i].skuName;
        gdGoodsBaseSku.propertyInfo = objset; //物料规格
        this.tableData[i].gdGoodsBaseSku = gdGoodsBaseSku;
        this.tableData[i].gdSkuSpecificationValueList = this.tableData[i].cols;
        delete this.tableData[i].cols;
        delete this.tableData[i].edit;
        delete this.tableData[i].isInactive;
        delete this.tableData[i].skuName;
        delete this.tableData[i].id;
      }
      var loading2 = Loading.service({
        lock: true,
        text: "处理中...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let data = {
        gdGoodsBaseSpu: gdGoodsBaseSpu,
        gdGoodsBaseSkuFormList: this.tableData,
        gdSpuSpecificationList: specificationId
      };
      api
        .saveGdGoodsBase(data)
        .then(res => {
          loading2.close();
          if (res.code == "success") {
             
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.message,
              type: "success"
            });
            this.$router.push({
               //核心语句
               path: "/index/productData/MaterialFiles" //跳转的路径
            });
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "保存失败",
              type: "error"
            });
          }
        })
        .catch(()=>{
          loading2.close();
        });
        
    },
    // handleRowDbclick(e) {
    //   this.tableData.forEach(item => {
    //     item.edit = false;
    //   });
    //   this.$refs.multipleTable.clearSelection();
    //   this.$refs.multipleTable.toggleRowSelection(e);
    //   let index = this.tableData.indexOf(e);
    //   if (index != 0) {
    //     this.tableData[index].edit = true;
    //   }
    // }
      //基本信息 表格单选
    dialogCheck(selection, row) {
      this.$refs.multipleTable.clearSelection();
        if (selection.length === 0) {  // 判断selection是否有值存在
                return;
          }
        if (row) {
            this.selectlistRow=row;
            this.index = this.tableData.indexOf(row);
            this.$refs.multipleTable.toggleRowSelection(row, true);
        }
    },
  }
};
</script>
<style lang="scss" scoped>
.el-cals {
  width: 69%;
}
</style>
