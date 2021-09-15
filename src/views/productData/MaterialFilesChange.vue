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
          <el-col :span="5" class="el-col  el-col-required" style="margin-top: 3px;">
            <label>
              <span class="must-full">*</span>物料大类
            </label>
            <el-cascader
              v-model="propertiesValue"
              filterable
              :options="treeData"
              :props="defaultProps"
              @focus="handleChange"
              :show-all-levels="false"
              disabled
              class="el-cals"
            ></el-cascader>
          </el-col>
          <el-col :span="5" class="el-col  el-col-required">
            <label>
              <span class="must-full">*</span>物料编码
            </label>
            <el-input v-model="spuCode" :disabled="true" class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5" class="el-col  el-col-required">
            <label>
              <span class="must-full">*</span>物料名称
            </label>
            <el-input
              v-model="spuName"
              class="el-inputs"
              @blur="animateWidth('company_name', 'blur')"
              @input="animateWach()"
            ></el-input>
          </el-col>
          <el-col :span="5" style="margin-top: 8px;" class="el-col  el-col-required">
            <label>
              <span class="must-full">*</span>基本单位
            </label>
            <el-select
              clearable
              filterable
              v-model="firstUnitName"
              @change="handleChangeList"
              placeholder="请选择"
              class="el-select"
            >
              <el-option
                v-for="(item, index) in filesList"
                :key="index"
                :label="item.showName"
                :value="item.unitId"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="5" style="margin-left: 5px" class="el-col  el-col-required">
            <label>
              <span class="must-full">*</span>第二单位
            </label>
            <el-select
              clearable
              filterable
              v-model="secUnitName"
              @change="handleChangeUnit"
              placeholder="请选择"
              class="el-select"
            >
              <el-option
                v-for="(item, index) in filesList"
                :key="index"
                :label="item.showName"
                :value="item.unitId"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" style="margin-left: -2px;" class="el-col  el-col-required">
            <label>
              <span class="must-full">*</span>增值税率%
            </label>
            <el-input
              v-model="vatRate"
              class="el-inputs"
              oninput="value=value.replace(/^0|[^\d]/g, '')"
            ></el-input>
          </el-col>
          <el-col :span="5" style="margin-top: 8px;" class="el-col  el-col-required">
            <label>
              <span class="must-full">*</span>退税率%
            </label>
            <el-input
              v-model="refundRate"
              class="el-inputs"
              oninput="value=value.replace(/^0|[^\d]/g, '')"
            ></el-input>
          </el-col>
        </el-row>
      </div>
      <!--标签页-->
      <div class="el-table-div">
        <div class="button-div">
          <el-button icon="el-icon-plus" @click="addRow">新增行</el-button>
          <el-button icon="el-icon-minus" @click="delData()">删除行</el-button>
          <!-- <el-button icon="el-icon-circle-plus-outline"
                     @click="dialogVisible = true;addMaterial()">增加属性</el-button>
          <el-button icon="el-icon-remove-outline"
          @click="dialogVisibleDel = true;delectMaterial()">删除属性</el-button>-->
        </div>
        <el-table
          border
          center
          id="tableList"
          :data="tableData"
          class="el-table"
          ref="multipleTable"
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
              <!-- <div >
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="scope.row.skuCode"
                  :disabled="true"
                ></el-input>
              </div>-->
              <div>{{ scope.row.skuCode }}</div>
            </template>
          </el-table-column>
          <el-table-column label="物料名称">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input size="mini" placeholder="请输入内容" v-model="scope.row.skuName"></el-input>
              </div>
              <div v-else>{{ scope.row.skuName }}</div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(col, index) in cols"
            :label="col.label"
            :key="col.id"
            v-show="show"
          >
            <template slot-scope="scope">
              <div>
                <el-select
                  clearable
                  filterable
                  size="mini"
                  v-model="
                    tableData[scope.$index].cols[index].specificationValue
                  "
                  @change="
                    handleChangeOption(
                      tableData[scope.$index].cols[index].specificationValue,
                      scope.$index,scope.row
                    )
                  "
                  placeholder="请选择"
                  class="el-select input__inner"
                  :disabled="!scope.row.edit"
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
                  class="el-select input__inner"
                >
                  <el-option
                    v-for="(item, index) in materialStatus"
                    :key="index"
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
        >
        </el-pagination>-->
      </div>
      <!-- 添加属性弹窗 -->
      <el-dialog :title="dialogVisibleTitle" :visible.sync="dialogVisible" width="30%">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city.prop">
            {{
            city.name
            }}
          </el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              onSubmit();
              dialogVisible = false;
            "
          >确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="dialogVisibleTitle" :visible.sync="dialogVisibleDel" width="30%">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city.prop">
            {{
            city.name
            }}
          </el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleDel = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              onSubmitDel();
              dialogVisibleDel = false;
            "
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import api from "@/api/productData/productData";
import { Message, Loading } from "element-ui";
export default {
  name: "MaterialFilesChange",
  data() {
    return {
      show: false,
      loading: false,
      disabledStr: true,
      skuCode: "", //物料编码
      spuCode: "", //物料编码
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
      firstUnitName: "", //基本单位
      secUnit: "", //第二单位
      propertiesValue: [], //大类value
      dialogVisible: false, //添加属性弹窗
      dialogVisibleDel: false,
      // materialStatus: [], //状态
      materialProp: [],
      myTip: 0,
      dialogVisibleTitle: "", //属性弹窗title
      gdGoodsBaseSpu: {},
      gdSpuSpecificationList: {},
      gdGoodsBaseSku: {},
      gdGoodsBaseSkuFormList: [],
      cities: [{}],
      checkedCities: [],
      arrOption: [],
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
      filesList: [{}], //名称组
      treeData: [],
      listId: "",
      listdilesId: [],
      cols: [
        {
          //   label: '产地',
          //   prop: '无'
          // },
          //  { label: '品种',
          //   prop: '无'
          // },
          // { label: '材质',
          //   prop: '无'
        }
      ],
      defaultProps: {
        children: "childGoodsCategorys",
        label: "categoryShowName",
        value: "categoryId",
        checkStrictly: true
      },
      propertiesValueS: "",
      category: [], //物料大类
      materialObject: [], //物料档案表格新增
      categoryStatus: false, //物料大类状态
      cateName: false, //物料名称
      spuId: "", //物料Id
      version: "", //物料版本号
      colsArray: [],
      secUnitName: ""
    };
  },
  created() {
    this.initList();
    this.getFilesList();
    this.getMaterial(); //查询spu主数据
    this.getGdSpuSpecificationList();
    //this.getTableData(); //查询sku主数据
    this.initTreeData();
    // this.getSpuId();
  },
  mounted() {},
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
    //加载列表属性
    // getSpuId () {
    //   if (localStorage.getItem("id")) {
    //     this.spuId = localStorage.getItem("id");
    //   }
    //   let params = {
    //     spuId: this.spuId
    //   };
    //   api
    //     .getGdSpecificationInfoListBySpuId(params)
    //     .then(res => {
    //       if (res.code == "success") {
    //         this.cols = [];
    //         res.data.forEach(item => {
    //           let obj = new Object();
    //           obj.label = item.specificationName;
    //           obj.id = item.specificationId;
    //           this.cols.push(obj);
    //         });
    //         this.getmaterialPropList();
    //       } else {
    //         this.$message({
    //           duration: 1000,
    //           showClose: true,
    //           message: "保存失败",
    //           type: "error"
    //         });
    //       }
    //     })
    //     .catch();
    // },
    //查询SpU属性
    getGdSpuSpecificationList() {
      if (localStorage.getItem("id")) {
        this.spuId = localStorage.getItem("id");
      }
      let params = {
        spuId: this.spuId
      };
      api
        .getGdSpuSpecificationList(params)
        .then(res => {
          if (res.code == "success") {
            this.cols = [];
            this.colsArray = [];
            for (var i = 0; i < res.data.length; i++) {
              let obj = new Object();
              obj.label = res.data[i].specificationName;
              obj.id = res.data[i].specificationId;
              this.cols.push(obj);
            }
            for (var i = 0; i < res.data.length; i++) {
              let obj = new Object();
              obj.label = res.data[i].specificationName;
              obj.id = res.data[i].specificationId;
              obj.serialId = res.data[i].serialId;
              obj.version = res.data[i].version;
              this.colsArray.push(obj);
            }
            this.getmaterialProp();
            if (this.cols != []) {
              this.show = true;
            }
            this.getTableData(); //查询sku主数据
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
    //修改的属性值
    // getmaterialPropList () {
    //   for (var i = 0; i < this.cols.length; i++) {
    //     let data = {
    //       specificationId: this.cols[i].id,
    //       isInactiveList: "0,1"
    //     };
    //     api
    //       .getGdSpecificationValueBySpecificationId(data)
    //       .then(res => {
    //         if (res.code == "success") {
    //           this.materialProp.push(res.data);
    //         } else {
    //           this.$message({
    //             duration: 1000,
    //             showClose: true,
    //             message: "保存失败",
    //             type: "error"
    //           });
    //         }
    //       })
    //       .catch();
    //   }
    // },
    //第二单位/基本单位
    getFilesList() {
      var listId = new Object();
      let data = {
        isInactiveList: 0
      };
      api
        .getGdGoodsUnitListByIsInactive(data)
        .then(res => {
          if (res.code == "success") {
            this.filesList = res.data;
            this.filesList.forEach(item => {
              this.listId = item.unitId;
              this.listdilesId.push(this.listId);
            });
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
    //修改 查询spu主数据
    getMaterial() {
      //console.log('ww',this)
      if (localStorage.getItem("id")) {
        this.spuId = localStorage.getItem("id");
      }
      let params = {
        spuId: this.spuId
      };
      api
        .getGdGoodsBaseSpu(params)
        .then(res => {
          if (res.code == "success") {
            // this.tableData.push(res.data);
            this.spuName = res.data.spuName;
            // this.secUnit = res.data.secUnitName;
            this.spuId = res.data.spuId;
            this.vatRate = res.data.vatRate;
            this.refundRate = res.data.refundRate;
            if (res.data.category.indexOf(",") != -1) {
              this.propertiesValue = res.data.category.split(","); //物料大类
            } else {
              this.propertiesValue = res.data.category.toString(); //物料大类
            }
            this.firstUnitName = res.data.firstUnitName;
            this.firstUnit = res.data.firstUnit;
            this.secUnitName = res.data.secUnitName;
            this.secUnit = res.data.secUnit;
            if (this.firstUnitName == null) {
              this.firstUnitName = res.data.firstUnit;
            }
            if (this.secUnitName == null) {
              this.secUnitName = res.data.secUnit;
            }
            this.spuCode = res.data.spuCode;
            this.version = res.data.version;
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
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
      this.getGdSpuSpecificationList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTableData();
      this.getGdSpuSpecificationList();
    },
    getTableData() {
      this.loading=true;
      let params = {
        spuId: localStorage.getItem("id")
        // pageNum: this.pageNum,去掉分页
        // pageSize: this.pageSize
      };
      api
        .getGdGoodsBaseSkuList(params)
        .then(res => {
          if (res.code == "success") {
            this.tableData = res.data;
            if (this.tableData == null) {
              this.tableData = [];
            } else {
              // if(this.myTip<=this.cols.length){
              for (let index = 0; index < this.tableData.length; index++) {
                let label = [];
                this.tableData[index].cols = this.tableData[
                  index
                ].gdSkuSpecificationValueVOList;
                if (this.tableData[0].gdSkuSpecificationValueVOList) {
                  this.tableData[0].skuCode = this.spuCode;
                }
                for (let i = 0; i < this.cols.length; i++) {
                  this.tableData[index].gdSkuSpecificationValueVOList.forEach(
                    item1 => {
                      if (this.cols[i].id == item1.specificationId) {
                        let objsct = new Object();
                        //console.log('2121',item1.specificationValue)
                        objsct.specificationValue = item1.specificationValue;
                        objsct.specificationId = item1.specificationId;
                        objsct.specificationValueId =
                          item1.specificationValueId;
                        objsct.serialId = item1.serialId;
                        objsct.skuId = item1.skuId;
                        objsct.spuId = item1.spuId;
                        objsct.updatedBy = item1.updatedBy;
                        objsct.updatedName = item1.updatedName;
                        objsct.updatedTime = item1.updatedTime;
                        objsct.version = item1.version;
                        objsct.createdBy = item1.createdBy;
                        objsct.createdName = item1.createdName;
                        objsct.page = item1.page;
                        objsct.isInactive = item1.isInactive;
                        objsct.pageSize = item1.pageSize;
                        objsct.rowNo = item1.rowNo;
                        label.push(objsct);
                      }
                    }
                  );
                }

                if (index == 0) {
                  this.tableData[index].edit = false;
                } else {
                  this.tableData[index].edit = true;
                }
                this.tableData[index].cols = [];
                this.tableData[index].cols = label;
              }
            }
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
    //基本单位改变得值
    handleChangeList(val) {
      this.firstUnit = val;
    },
    //第二单位
    handleChangeUnit(val) {
      this.secUnit = val;
    },
    //属性改变的值
    handleChangeOption(val,index,row) {
      this.changeOption = val;
      // this.$forceUpdate();
      //  alert(val)
      
      this.arrOption.push(val);
      this.$set(this.tableData,index,row);
      //console.log('2v',val,this.arrOption)
    },
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
    initList() {
      // let dataList = [{
      //     // code: "123",
      //     // name: "家具",
      //     // skuCode: "缉私局",
      //     // skuName:"wef",
      //     // status: "1",
      //     // taxRate:"20%",
      //     // edit:false},{
      //     // code: "234",
      //     // name: "及埃及",
      //     // skuCode:"设计大奖",
      //     // skuName:"时间",
      //     // status:"1",
      //     // specificationValue:'',
      //     // taxRate:"10%",
      //     edit:false}];
      // dataList.forEach(item => {
      //   item.edit= false;
      // });
      // this.tableData = dataList;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val;
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
      this.category = this.propertiesValue;
      if (val) {
        this.propertiesValue = val[val.length - 1];
      }
      let params = {
        categoryId: this.propertiesValue.split(",")
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
            this.getmaterialProp((this.myTip = 0));
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
      this.dialogVisibleTitle = "删除属性";
      this.cities = [];
      for (var i = 0; i < this.cols.length; i++) {
        let obj = new Object();
        obj.name = this.cols[i].label;
        obj.id = this.cols[i].id;
        this.cities.push(obj);
      }
    },
    //提交删除属性
    onSubmitDel() {
      let arrId = [];
      this.cities.forEach(item => {
        arrId.push(item.id);
      });
      let specificationId = arrId.join(",");
      let data = {
        spuId: localStorage.getItem("id"),
        specificationIdList: specificationId
      };
      api
        .deleteGdSpuSpecificationAndGdSkuSpecificationValue(data)
        .then(res => {
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.message,
              type: "success"
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
        .catch();
      // this.checkedCities.forEach(item =>{
      //   let obj= new Object();
      //   obj.label =item.name
      //   this.cols.splice(obj.label)
      // })
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
    //物料属性值
    getmaterialProp() {
      if (this.myTip < this.cols.length) {
        let data = {
          specificationId: this.cols[this.myTip].id,
          isInactiveList: "0"
        };
        api
          .getGdSpecificationValueBySpecificationId(data)
          .then(res => {
            if (res.code == "success") {
              this.materialProp = [];
              for (var i = 0; i < res.data.length; i++) {
                var obj = {};
                obj.specificationValue = res.data[i].specificationValue;
                obj.specificationValueId = res.data[i].specificationValueId;
                this.materialProp.push(obj);
              }
              this.materialObject.push(this.materialProp);
              for (let i = 0; i < this.cols.length; i++) {
                this.cols[i].bigTable = this.materialObject[i];
                // console.log('css',res.data[i].specificationValue)
                // }
              }
              this.myTip = this.myTip + 1;
               this.$set(this.tableData,this.tableData.length-1,this.tableData[this.tableData.length-1]);
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
      } else {
        return false;
      }
    },
    animateWach() {
      this.$forceUpdate();
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
      //  alert(this.spuName)
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
      var list = {
        edit: true,
        isInactive: 0,
        skuName: this.skuName, //物料名称
        cols: JSON.parse(JSON.stringify(this.cols))
      };
      let newTbale = [];
      newTbale.unshift(list);
      this.tableData = this.tableData.concat(newTbale);
      this.tableData[0].edit = false;
      if (this.tableData.length > 0) {
        this.categoryStatus = true;
        this.tableData[0].skuName = this.spuName;
      }
      // if (this.tableData.length == 1) {
      //   this.cateName = true;
      // } else {
      //   this.cateName = false;
      // }
    },
    //删除行
    delData() {
      if (!this.selectlistRow) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return;
      }
      if(this.spuCode==this.selectlistRow[0].skuCode){
        this.$message({
          duration: 1000,
          showClose: true,
          message: "当前数据不可删除",
          type: "warning"
        });
        return;
      }
      if(this.selectlistRow[0].skuId){
        let data = {
          skuId: this.selectlistRow[0].skuId,
          version: this.selectlistRow[0].version,
          isInactive: 2
        };
        api
          .updateGdGoodsBaseSku(data)
          .then(res => {
            if (res.code == "success") {
              this.$message({
                duration: 1000,
                showClose: true,
                message: res.message,
                type: "success"
              });
              this.tableData.splice(this.index, 1);
              this.$refs.multipleTable.clearSelection();
            } else {
              this.$message({
                duration: 1000,
                showClose: true,
                message: "删除失败",
                type: "error"
              });
            }
          })
          .catch();
      }else{
          this.tableData.splice(this.index, 1);
          this.$refs.multipleTable.clearSelection();
      }
     
      // 删除完数据之后清除勾选框
    },
    //保存
    saveData() {
      if (!this.spuName) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "物料名称不能为空!",
          type: "warning"
        });
        return;
      }
      if (!this.firstUnit) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "基本单位不能为空!",
          type: "warning"
        });
        return;
      }
      if (!this.secUnit) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "第二单位不能为空!",
          type: "warning"
        });
        return;
      }
      if (!this.vatRate) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "增值税率不能为空!",
          type: "warning"
        });
        return;
      }
      if (!this.refundRate) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "退税率不能为空!",
          type: "warning"
        });
        return;
      }
    
      // let categoryIdValue ="";
      // categoryIdValue = this.propertiesValue.split(",");
      //表单信息
      let gdGoodsBaseSpu = {
        spuName: this.spuName,
        firstUnit: this.firstUnit,
        secUnit: this.secUnit,
        vatRate: this.vatRate,
        refundRate: this.refundRate,
        spuCode: this.spuCode,
        spuId: this.spuId,
        version: this.version
        //categoryId:categoryIdValue[categoryIdValue.length - 1],
        //category: this.propertiesValue.toString()
      };
      let obj = new Object();
      let objtst = new Object();
      let arr = new Array();
      let str = new Array();
      this.materialProp.forEach(item => {
        for (var i = 0; i < item.length; i++) {
          // str.push(item[i].specificationValue)
        }
      });
      this.cols.forEach(item => {
        str.label = item.label;
      });
      for (var i = 0; i < this.arrOption.length; i++) {
        str.value = this.arrOption[i];
        arr.push(str.label + ":" + str.value);
        objtst = arr.join(",");
      }
      obj.skuName = this.tableData[0].skuName;
      obj.isInactive = this.tableData[0].isInactive;
      obj.spuId = "";
      this.tableSpecificationId = [];

      let specificationId = [];
      for (var i = 0; i < this.colsArray.length; i++) {
        let object = new Object();
        object.specificationId = this.colsArray[i].id;
        object.serialId = this.colsArray[i].serialId;
        object.version = this.colsArray[i].version;
        specificationId.push(object);
      }
      //属性值id
      let gdGoodsBaseSkuFormList = [];
      let absq = {};
      absq.gdGoodsBaseSpu = obj;
      for (var i = 0; i < this.tableData.length; i++) {
        //  let objtst = new Object();
        // let arr = new Array();
        // let str = new Array();
        for (var j = 0; j < this.tableData[i].cols.length; j++) {
          if (this.cols[j].bigTable) {
            for (var a = 0; a < this.cols[j].bigTable.length; a++) {
              if (this.tableData[i].cols[j].specificationValue == undefined) {
                this.tableData[i].cols[j].specificationValue = "无";
              }
              var serct = true;

              for (let s = i + 1; s < this.tableData.length; s++) {
                //循环遍历去重
                var boo = true;
                if (this.tableData[i].skuName == this.tableData[s].skuName) {
                  for (var k = 0; k < this.tableData[i].cols.length; k++) {
                    if (
                      this.tableData[i].cols[k].specificationValue !=
                      this.tableData[s].cols[k].specificationValue
                    ) {
                      serct = false;
                      boo = false;
                    } else {
                      serct = true;
                    }
                  }
                  if (serct == true && boo == true) {
                    this.$message({
                      duration: 1000,
                      showClose: true,
                      message: "物料名称和属性不能完全一致",
                      type: "warning"
                    });
                    return false;
                  }
                  //this.getTableData()
                }
              }
              if (
                this.tableData[i].cols[j].specificationValue ==
                this.cols[j].bigTable[a].specificationValue
              ) {
                this.tableData[i].cols[j].specificationValueId = this.cols[
                  j
                ].bigTable[a].specificationValueId;
                if (this.tableData[i].cols[j].specificationId == undefined) {
                  this.tableData[i].cols[j].specificationId = this.tableData[
                    i
                  ].cols[j].id;
                } else {
                  this.tableData[i].cols[j].specificationId = this.tableData[
                    i
                  ].cols[j].specificationId;
                }
                this.tableData[i].cols[j].isInactive = this.tableData[
                  i
                ].isInactive;
              }
            }
          }
          delete this.tableData[i].cols[j].bigTable;
        }
        // if (this.tableData[i].gdSkuSpecificationValueVOList == undefined) {
        //   //新增行传值
        //   this.tableData[i].cols.forEach(item => {
        //     item.isInactive = this.tableData[i].isInactive;
        //   });
        // } else {
        //   arr = []; //清空数组
        //   this.tableData[i].gdSkuSpecificationValueVOList.forEach(item => {
        //     item.isInactive = this.tableData[i].isInactive;
        //     this.cols.forEach(item2 => {
        //       if (item.specificationId == item2.id) {
        //         //表头数据和gdSkuSpecificationValueVOList对应
        //         str.label = item2.label;
        //       }
        //     });
        //     str.value = item.specificationValue;
        //     arr.push(str.label + ":" + str.value);
        //     objtst = arr.join(",");
        //   });
        // }
        arr = []; //清空数组
        this.cols.forEach(item2 => {
          this.tableData[i].cols.forEach(item => {
            if (item.specificationId == item2.id) {
              //表头数据和gdSkuSpecificationValueVOList对应
              arr.push(item2.label + ":" + item.specificationValue);
              objtst = arr.join(",");
            }
          });
        });
        let gdGoodsBaseSku = {};
        gdGoodsBaseSku.isInactive = this.tableData[i].isInactive;
        gdGoodsBaseSku.skuName = this.tableData[i].skuName;
        gdGoodsBaseSku.skuId = this.tableData[i].skuId;
        gdGoodsBaseSku.propertyInfo = objtst; //物料规格
        gdGoodsBaseSku.skuCode = this.tableData[i].skuCode;
        gdGoodsBaseSku.spuId = this.tableData[0].spuId;
        gdGoodsBaseSku.version = this.tableData[i].version;
        this.tableData[i].gdGoodsBaseSku = gdGoodsBaseSku;
        this.tableData[i].gdSkuSpecificationValueList = this.tableData[i].cols;
        // delete this.tableData[i].cols;
        delete this.tableData[i].edit;
        // delete this.tableData[i].isInactive;
        delete this.tableData[i].skuName;
        delete this.tableData[i].id;
        // console.log(this.tableData[i].isInactive, "-----");
      }
      //console.log(this.tableData, "=============");
      //使用Element loading-start 方法
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
    }
  }
};
</script>
<style lang="scss" scoped>
.el-cals {
  width: 69%;
}
// .custom-31478F .el-col-6 {
//     width: 24%;
// }
.input-div .el-col-5 {
  width: 25%;
}
</style>
