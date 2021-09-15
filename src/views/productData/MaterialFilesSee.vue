<template>
  <div> 
    <div>
      <el-divider></el-divider>
      <!--按钮样式-->
      <div class="button-div">
        <!-- <el-button @click="saveData()"  :disabled="true">保存</el-button> -->
        <el-button v-on:click="back" icon="el-icon-back">返回</el-button>
      </div>
      <div class="index-div3 auto-sibling">
        <el-col :span="5"
                class="el-col"
                style="margin-top: 1px;">
          <label><span class="must-full">*</span> 物料大类</label>
          <el-cascader v-model="propertiesValue"
                       filterable
                       :options="treeData"
                       change-on-select
                       :props="defaultProps"
                       size="small"
                       :show-all-levels="false"
                       @input="handleChange"
                       :disabled="true"
                       class="el-cals"></el-cascader>
        </el-col>
        <el-col :span="5">
          <label><span class="must-full">*</span> 物料编码</label>
          <el-input v-model="spuCode"
                    size="small"
                    :disabled="true"
                    class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5">
          <label><span class="must-full">*</span> 物料名称</label>
          <el-input v-model="spuName"
                    size="small"
                    :disabled="true"
                    class="el-inputs"
                    @blur="animateWidth('company_name','blur')"
                    @input="animateWach()"></el-input>
        </el-col>
        <el-col :span="5">
          <label><span class="must-full">*</span> 基本单位</label>
          <el-select clearable
                     v-model="firstUnitName"
                     @change="handleChangeList"
                     size="small"
                     :disabled="true"
                     placeholder="请选择"
                     class="el-select">
            <el-option v-for="(item,index) in filesList"
                       :key="index"
                       :label="item.showName"
                       :value="item.showName"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <label><span class="must-full">*</span> 第二单位</label>
          <el-select clearable
                     v-model="secUnitName"
                     @change="handleChangeUnit"
                     size="small"
                     :disabled="true"
                     placeholder="请选择"
                     class="el-select">
            <el-option v-for="(item,index) in filesList"
                       :key="index"
                       :label="item.showName"
                       :value="item.showName"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <label><span class="must-full">*</span> 增值税率%</label>
          <el-input v-model="vatRate"
                    size="small"
                    :disabled="true"
                    class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5">
          <label><span class="must-full">*</span> 退税率%</label>
          <el-input v-model="refundRate"
                    size="small"
                    :disabled="true"
                    class="el-inputs"></el-input>
        </el-col>
      </div>
      <!--标签页-->
      <div class="el-table-div">
        <!-- <div class="button-div">
          <el-button @click="addRow">新增行</el-button>
          <el-button @click="delData()">删除行</el-button> -->
          <!-- <el-button @click="dialogVisible = true;addMaterial()">增加属性</el-button>
          <el-button @click="dialogVisible = true;delectMaterial()">删除属性</el-button> -->
        <!-- </div> -->
        <el-table border
                  center
                  id="tableList"
                  :data="tableData"
                  class="el-table"
                  @selection-change='selectRow'
                  height="760"
                  v-loading="loading">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column label="序号"
                           type="index"
                           width="60"
                           align="center"></el-table-column>
          <el-table-column label="物料编码">
            <template slot-scope="scope">
              <div v-if='scope.row.edit'>
                <el-input size="mini"
                          placeholder="请输入内容"
                          v-model="scope.row.skuCode"
                          :disabled="true"></el-input>
              </div>
              <div v-else>
                {{scope.row.skuCode}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="物料名称">
            <template slot-scope="scope">
              <div v-if='scope.row.edit'>
                <el-input size="mini"
                          placeholder="请输入内容"
                          v-model="scope.row.skuName"></el-input>
              </div>
              <div v-else>
                {{scope.row.skuName}}
              </div>
            </template>
          </el-table-column>
          <el-table-column v-for="(col,index) in cols"
                           :label="col.label"
                           :key="col.id"
                           v-show="show">
            <template slot-scope="scope">
              <div>
                <el-select clearable
                           size="mini"
                           v-model="tableData[scope.$index].cols[index].specificationValue"
                           @change="handleChangeOption(tableData[scope.$index].cols[index].specificationValue ,scope.$index)"
                           placeholder="请选择"
                           disabled
                           class="el-select input__inner">
                  <el-option v-for="item in col.bigTable"
                             :key="item.specificationValueId"
                             :label="item.specificationValue"
                             :value="item.specificationValue"></el-option>
                </el-select>
              </div>
              <!-- <div v-else>
                {{tableData[scope.$index].id}}
              </div> -->
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <div v-if='scope.row.edit'>
                <el-select clearable
                           size="mini"
                           v-model="scope.row.isInactive"
                           placeholder="请选择"
                           class="el-select input__inner">
                  <el-option v-for="(item,index) in materialStatus"
                             :key="index"
                             :label="item.label"
                             :value="item.status"></el-option>
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
        <!-- <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageNum"
                       :page-sizes="[100, 200, 300,500]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination> -->
      </div>
      <!-- 添加属性弹窗 -->
      <el-dialog :title="dialogVisibleTitle"
                 :visible.sync="dialogVisible"
                 width="30%">
        <el-checkbox-group v-model="checkedCities"
                           @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities"
                       :label="city"
                       :key="city.prop">{{city.name}}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="onSubmit();dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import api from "@/api/productData/productData";
export default {
  name: "MaterialFilesSee",
  data () {
    return {
      show: false,
      loading: false,
      disabledStr: true,
      skuCode: "", //物料编码
      skuName: "",
      spuName: "", //物料名称
      spuCode: "", //物料名称
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
      materialStatus: [], //状态
      materialProp: [],
      dialogVisibleTitle: "", //属性弹窗title
      gdGoodsBaseSpu: {},
      gdSpuSpecificationList: {},
      gdGoodsBaseSku: {},
      cities: [{}],
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
        label: "categoryName",
        value: "categoryId"
      },
      spuCode:"",
      firstUnitName:"",
      secUnitName:"",
      colsArray:[],
      materialObject:[],//物料档案表格新增
    };
  },
  created () {
    this.initList();
    this.getFilesList();
    this.getMaterial(); //查询spu主数据
    this.initTreeData();

    this.getGdSpuSpecificationList();
  },
  methods: {
    //获取树形结构
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
    //第二单位/基本单位
    getFilesList () {
      var listId = new Object();
      let data = {
        isInactiveList: 0
      };
      api
        .getGdGoodsUnitListByIsInactive(data)
        .then(res => {
          if (res.code == "success") {
            this.filesList = res.data;
            console.log(this.filesList);
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
    //查询SpU属性
    getGdSpuSpecificationList () {
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
    //修改 查询spu主数据
    getMaterial () {
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
            console.log("63262", res.data);
            this.spuName = res.data.spuName;
            this.spuCode = res.data.spuCode;
            this.secUnitName = res.data.secUnitName;
            this.vatRate = res.data.vatRate;
            this.refundRate = res.data.refundRate;
            if (res.data.category.indexOf(",") != -1) {
              this.propertiesValue = res.data.category.split(","); //物料大类
            } else {
              this.propertiesValue = res.data.category.toString(); //物料大类
            }
            this.firstUnitName = res.data.firstUnitName;
            if(this.firstUnitName==null){
              this.firstUnitName = res.data.firstUnit
            }
            if(this.secUnitName==null){
              this.secUnitName = res.data.secUnit
            }
            this.secUnit = res.data.secUnit;
            this.firstUnit = res.data.firstUnit;
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
    handleSizeChange (val) {
      this.pageSize = val;
       this.getTableData();
       this.getGdSpuSpecificationList();
    },
    handleCurrentChange (val) {
      this.pageNum = val;
      this.getTableData();
      this.getGdSpuSpecificationList();
    },
    //基本单位改变得值
    handleChangeList (val) {
      this.firstUnit = val;
    },
    //第二单位
    handleChangeUnit (val) {
      this.secUnit = val;
    },
    //属性改变的值
    handleChangeOption (val) {
      this.changeOption = val;
      //  alert(val)
    },
    initList () {
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
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    getTableData () {
      this.loading=true;
      let params = {
        spuId: localStorage.getItem("id"),
        // pageNum: this.pageNum,
        // pageSize: this.pageSize
      };
      api
        .getGdGoodsBaseSkuList(params)
        .then(res => {
          if (res.code == "success") {
            this.tableData = res.data;
            for (let index = 0; index < this.tableData.length; index++) {
              let label= []
                 this.tableData[index].cols = this.tableData[index].gdSkuSpecificationValueVOList
                  if(this.tableData[0].gdSkuSpecificationValueVOList){
                   this.tableData[0].skuCode = this.spuCode
                 }
                 for(let i=0;i<this.cols.length;i++){
                   this.tableData[index].gdSkuSpecificationValueVOList.forEach(item1 =>{
                     if(this.cols[i].id ==item1.specificationId){
                      let objsct = new Object();
                      objsct.specificationValue = item1.specificationValue
                      objsct.specificationId = item1.specificationId  
                      objsct.specificationValueId = item1.specificationValueId
                      label.push(objsct)
                      }
                   })
                 }
               this.tableData[index].cols = [];
               this.tableData[index].cols=label;
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
            this.loading = false;
          }
        })
        .catch();
    },
    // 获取表格选中时的数据
    selectRow (val) {
      this.selectlistRow = val;
    },
    handleNodeClick (data) {
      console.log(data);
    },
    currentChange (e) {
      this.pageNum = e;
      //this.pariList();
    },
    back () {
      this.$router.push({
        //核心语句
        path: "/index/productData/MaterialFiles" //跳转的路径
      });
    },
    //物料大类
    handleChange (val) {
      this.propertiesValue = val[val.length - 1];
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
            this.getmaterialProp();
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
    addMaterial () {
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
    delectMaterial () {
      this.dialogVisibleTitle = "删除属性";
      this.cities = [];
      for (var i = 0; i < this.cols.length; i++) {
        console.log("5454", this.cols[i].label);
        let obj = new Object();
        obj.name = this.cols[i].label;
        this.cities.push(obj);
      }
    },
    //提交添加属性
    onSubmit () {
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
        console.log("262", this.cols);
      });
    },
    //物料属性值
    getmaterialProp () {
      for (var i = 0; i < this.cols.length; i++) {
        let data = {
          specificationId: this.cols[i].id,
          isInactiveList: "0"
        };
        api
          .getGdSpecificationValueBySpecificationId(data)
          .then(res => {
            if (res.code == "success") {
              this.materialProp=[]
              for(var i=0;i<res.data.length;i++){
                var obj ={}
                obj.specificationValue =res.data[i].specificationValue;
                obj.specificationValueId =res.data[i].specificationValueId;
                this.materialProp.push(obj)
              }
                this.materialObject.push(this.materialProp)
              for(let i=0;i<this.cols.length;i++){
                this.cols[i].bigTable = this.materialObject[i]
                // }
              }
              console.log("wuliao", this.tableData);
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
      }
    },
    animateWach () {
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
    animateWidth () {
      //  alert(this.spuName)
      for (var i = 0; i < this.cols.length; i++) {
        this.cols[i].prop = "无";
      }
      this.tableData.forEach(item => {
        item.edit = false;
      });
      var list = {
        skuName: this.spuName, //物料名称
        edit: true
      };
      // this.newTbale.unshift(list);
      let newTbale = [];
      newTbale.unshift(list);
      this.tableData = newTbale.concat(this.tableData);
    },
    //新增行
    addRow () {
      this.tableData.forEach(item => {
        item.edit = false;
      });
      var list = {
        edit: true
      };
      // this.newTbale.unshift(list);
      let newTbale = [];
      newTbale.unshift(list);
      this.tableData = newTbale.concat(this.tableData);
      console.log("412", this.tableData);
    },
    //删除
    delData () {
      if (this.selectlistRow.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
      }

      this.tableData.splice(this.index, 1);
      // 删除完数据之后清除勾选框
    },
    //保存
    saveData () {
      //表单信息
      let gdGoodsBaseSpu = {
        spuName: this.spuName,
        firstUnit: this.firstUnit,
        secUnit: this.secUnit,
        vatRate: this.vatRate,
        refundRate: this.refundRate
      };
      this.tableSpecificationId = [];
      for (var i = 0; i < this.cols.length; i++) {
        let obj = new Object();
        obj.specificationId = this.cols[i].id;
        this.tableSpecificationId.push(obj);
      }
      let gdSpuSpecificationList = this.tableSpecificationId;
      let gdGoodsBaseSkuFormList = [];
      this.tableData.forEach(item => {
        let obj = new Object();
        obj.skuName = item.skuName;
        obj.isInactive = item.isInactive;
        let gdGoodsBaseSku = obj;
        //  alert(gdGoodsBaseSku)
        console.log("0p", gdGoodsBaseSku);
      });
      //属性值id
      this.materialProp.forEach(item => {
        for (var i = 0; i < item.length; i++) {
          let obj = new Object();
          obj.specificationValueId = item[i].specificationValueId;
          let gdGoodsBaseSku = obj;
          console.log("0f0f", gdGoodsBaseSku);
        }
      });
      let gdGoodsBaseSku = {};

      //  api.saveGdGoodsBase(data).then(res => {
      //     if(res.code=='success'){

      //     }else{
      //         this.$message({
      //             duration: 1000,
      //             showClose: true,
      //             message: '保存失败',
      //             type: 'error'
      //         });
      //     }

      // }).catch();
    }
  }
};
</script>
<style lang="scss" scoped>
.el-cals {
  width: 69%;
}
// .index-div3{
//         width: 100%;
//         overflow: hidden;
//         background: #ffffff;
//         text-align: left;
//         margin-bottom: 10px;
//         position: relative;
//         min-height: 14px;
//         .el-col-5{
//             width: 24%; position: relative; margin-top: 10px;//margin-left: 25px;
//         }
//        .el-col .el-inputs, .input-div .el-col .el-input__inner{
//             font-size: 12px !important;
//             height: 32px;
//         }
//         .el-col .el-select .el-input .el-input__inner{
//             font-size: 12px !important;
//             border-color: #97999e !important;
//         }
//         .el-input,.el-select{
//             width: 65%;
//             font-size: 12px;
//             .el-input__inner{
//                 font-size: 12px !important;
//                 width: 100%;
//                 border-color: #97999e !important;
//             }
//         }
//           //时间选择器
//         .el-input2{
//             height: 32px;
//             width: 65%;
//              border-color: #97999e !important;
//         }
//         label{
//             display: inline-block;
//             width:34%;
//             text-align: right;

//         }
//         .el-col{
//             .comicon {
//                 width:65%;
//                 height: 20px;
//                 position: absolute;
//                 right: 6px;
//                 top: 7px;
//                 cursor: pointer;
//                 text-align: right;
//                 padding-right: 15px;
//             }
//             .el-col:last-child{
//                 margin-right: 0;
//             }
//         }

//         .hide-input{
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             height: 20px;
//             width: 100%;
//             cursor: pointer;
//             .el-icon-d-caret{
//                 position: absolute;
//                 bottom: 0;
//                 left: 49.5%;
//                 font-size: 14px;
//                 color: #666;
//             }
//             .el-icon-d-caret:before{color: #999;}
//         }
//         .el-col-btn{
//             margin: 10px;
//             width:100%;
//             position: relative;
//             margin-left:0px !important;
//             .button-div{
//                 margin: 0px auto;
//                 text-align: center;
//             }
//         }

//     }
</style>
