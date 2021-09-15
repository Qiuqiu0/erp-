<template>
  <div class="reverseAdd"
       v-if="tipShow">
    <el-dialog :visible.sync="tipShow"
               title="采购入库信息"
               :show-close="false"
               :close-on-click-modal="false"
               width="1100px"
               class="popup_box">
      <div class="button-div"
           style="text-align:left">
        <el-button class="query-button"
                   @click="conList"
                   icon="el-icon-search">查询</el-button>
        <el-button @click="clearNone"
                   icon="el-icon-refresh">重置</el-button>
      </div>
      <!-- 搜索 -->
      <div class="index-div3 index-div4">
        <p class="hide-input"
           v-if="show"
           @click="inputShow()">更多条件 <i class="el-icon-caret-bottom"></i></p>
        <p class="hide-input"
           v-else
           @click="inputShow()">收起<i class="el-icon-caret-top"></i></p>
        <div class="dialog-search-div">
          <el-col :span="5"
                  class="el-col">
            <label>公司</label>
            <el-input v-model="companyName.companyName"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  @click="componyTip"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>部门</label>
            <el-input v-model="branchName.branchName"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  @click="departmentTip"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>供应商</label>
            <el-input v-model="supplierName.supplierName"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  @click="supplierTip"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">采购合同号</label>
            <el-input v-model="erpPoNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>外部合同号</label>
            <el-input v-model="externalPoNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label style="width:31%">创建时间</label>
            <el-date-picker v-model="createdTime"
                            type="daterange"
                            class="el-input2"
                            size="mini"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            default-value="2010-10-01">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>退货仓库</label>
            <el-input v-model="warehouseName.warehouseName"
                      size="small"
                      class="el-inputs"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  @click="warehouseTips"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">创建人</label>
            <el-input v-model="createdName"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label style="width:31%">入库单号</label>
            <el-input v-model="wvNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"></el-input>
          </el-col>
        </div>
        <!-- 选择公司弹窗 -->
        <compony-select v-if="componyShow"
                        :tipShow="componyShow"
                        @tipsCancle="tipsCancle"
                        @tipsSure="componySure">
        </compony-select>
        <!-- 选择部门弹窗 -->
        <department-select v-if="departmentShow"
                           :tipShow="departmentShow"
                           :data="companyName"
                           @departmentCancle="departmentCancle"
                           @departmentSure="departmentSure">
        </department-select>
        <!-- 选择供应商弹窗 -->
        <supplier-Select v-if="supplierShow"
                         :tipShow="supplierShow"
                         @supplierCancle="supplierCancle"
                         @supplierSure="supplierSure"></supplier-Select>
        <!--选择仓库-->
        <warehouse-select v-if="warehouseShow"
                          :tipShow="warehouseShow"
                          @warehouseCancle="warehouseCancle"
                          @warehouseSure="warehouseSure">
        </warehouse-select>
      </div>
      <!-- 表格 -->
    
      <div class="el-table-div wutabstyle">
        <el-table border
                  center
                  :data="tableData"
                  class="el-table"
                  ref="multipleTable"
                  v-loading="loading"
                  @selection-change="radiochange"
                  @row-dblclick="dblclick"
                  @row-click="rowClick">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="erpPoNo"
                           label="采购合同号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="poRowno"
                           label="采购合同行号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="extPoNo"
                           label="外部合同号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="wvNo"
                           label="入库单号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="wvRowno"
                           label="入库单行号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="goodsCode"
                           label="物料编号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="goodsName"
                           label="物料名称"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="goodsCategoryName"
                           label="物料大类"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="goodsSpec"
                           label="物料规格"
                           show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="warehouseName"
                           label="仓库"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="actReceive"
                           label="入库数量"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="canUnwvQty"
                           label="可退数量"
                           show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="secQty"
                           label="第二数量"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="supplierName"
                           label="供应商"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="postDate"
                           width="100"
                           label="入库日期"
                           show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <!--分页background-->
        <el-pagination @size-change="handleSizeChange"
                       @current-change="currentChange"
                       :current-page="pageNum"
                       :page-sizes="[100, 200, 300,500]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
      <slot></slot>
      <div class="button-div2">
        <el-button type="primary"
                   @click="reverseSure()"
                   :disabled="isAllowConfirm"
                   icon="el-icon-check">确认</el-button>
        <el-button @click="reverseCancle()"
                   icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import reverse from "@/api/reverseInvoice/reverseInvoice";
import api from "@/api/ladingBill/ladingBill";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import supplierSelect from "@/components/supplierSelect.vue";
import warehouseSelect from "@/components/warehouseSelect.vue";
export default {
  name: "reverseAdd",
  data () {
    return {
      tableData: [], //表格
      companyName: '', //公司
      branchName: ``, //部门
      supplierName: "", //供应商
      componyShow: false, //公司弹窗
      departmentShow: false,
      supplierShow: false,
      warehouseName: '',
      warehouseShow: false,
      erpPoNo: "", //采购合同号
      externalPoNo: "", //外部合同号
      createdTime: "", //创建时间
      WarehouseList: [], //退货仓库
      createdName: '', //创建人
      wvNo: "", //入库单号
      loading: true, //表格loading
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      radio: false,
      getData: [],
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true,
      isAllowConfirm: false,
    };
  },
  props: {
    tipShow: {
      type: Boolean
    }
  },
  created () {
    this.conList();
    this.WarehouseListData()
  },
  methods: {
    inputShow () {
      this.show = this.$dialogShowOne(this.show);
    },
    //选择数据
    radiochange (e) {
      //   console.log("e", e);
      this.getData = e;
      this.isAllowConfirm = false
      for (let index = 0; index < this.getData.length; index++) {
        const item = this.getData[index];
        for (let i = index + 1; i < this.getData.length; i++) {
          const el = this.getData[i];
          if (item.warehouseCode != el.warehouseCode 
          && item.supplierCode!=el.supplierCode
          && item.erpPoNo!=el.erpPoNo) {
            this.isAllowConfirm = true
          }
        }
      }
    },
    //部门
    branchChange (val) {
      this.branchList.branchCode = val;
    },
    //供应商
    supplierChange (val) {
      this.supplierList.supplierName = val;
    },
    //仓库
    WarehouseListChange (val) {
      this.WarehouseList.warehouseCode = val;
    },
    //供应商下拉
    supplierListData () {
      let params = {};
      reverse
        .supplierList(params)
        .then(res => {
          this.supplierList = res.data.list;
        })
        .catch(() => { });
    },
    //仓库
    WarehouseListData () {
      reverse
        .getBbWarehouseListSimple()
        .then(res => {
          this.WarehouseList = res.data;
        })
        .catch(() => { });
    },
    //获取表格数据
    conList () {
      // if (this.branchList.branchCode) {
      //   var orgCode = this.branchList.branchCode;
      // }
      if (this.companyName.companyName) {
        var companyName = this.companyName.companyName;
      }
      if (this.companyName.companyCode) {
        var companyCode = this.companyName.companyCode
      }
      if (this.warehouseName.warehouseCode) {
        var warehouseCode = this.warehouseName.warehouseCode;
      } else {
        // var warehouseCode = this.warehouseName[0].warehouseCode;
      }
      if (this.branchName.branchName) {
        var branchName = this.branchName.branchName
      }
      if (this.branchName.branchName) {
        var branchCode = this.branchName.branchCode
      }
      if (this.supplierName.supplierName) {
        var supplierName = this.supplierName.supplierName
      }
      if (this.supplierName.supplierCode) {
        var supplierCode = this.supplierName.supplierCode
      }
      if (this.createdName) {
        var createdName = this.createdName
      }
      if (this.wvNo) {
        var wvNo = this.wvNo;
      }
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        wvNo: wvNo, //入库单号
        erpPoNo: this.erpPoNo,
        companyName: companyName,
        companyCode: companyCode,
        // orgCode: bizPersonCode, //部门
        supplierName: supplierName,
        supplierCode: supplierCode,
        createdName: createdName,
        orgName: branchName,
        orgCode: branchCode,
        warehouseCode: warehouseCode, //仓库
        externalPoNo: this.externalPoNo,
        createdStartDate: this.createdTime[0],
        createdEndDate: this.createdTime[1]
      };
      reverse
        .odWvList2CreatedUnWv(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.tableData.forEach(element => {
            element.postDate = this.$timeFun(element.postDate, 1);
          });
          this.total = res.total;
        })
        .catch(() => { });

      this.loading = false;
    },
    reverseSure () {
      if (this.getData.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return;
      }
      if (!this.warehouseName) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "请选择退货仓库",
          type: "warning"
        });
        return;
      } else {
        this.conList()
      }
      console.log('1', this.warehouseName)
      if (this.getData.length == 1) {
        this.$router.push({
          path: "/index/Purchase/reversehousingDetails", //跳转的路径
        });
        localStorage.setItem("getData", JSON.stringify(this.getData))
      } else if (this.getData.length != 1) {
        let wvNoData = "";
        this.getData.forEach((item, index) => {
          if (item.warehouseCode != this.getData[0].warehouseCode 
          && item.supplierCode != this.getData[0].supplierCode
          && item.erpPoNo != this.getData[0].erpPoNo) {
            this.wvNoData = false;
            this.$message({
              duration: 1000,
              showClose: true,
              message: "仓库,供应商和合同号必须相同",
              type: "warning"
            });
            this.wvNoData = true;
            return;
          }
        })
        console.log('12', this.wvNoData)
        if (this.wvNoData == undefined || this.wvNoData == true) {
          this.$router.push({
            path: "/index/Purchase/reversehousingDetails", //跳转的路径
          });
          localStorage.setItem("getData", JSON.stringify(this.getData))
        }
        //      for(let i = 0; i<this.getData.length; i++){
        //    for(let item=i+1; item<this.getData.length;item++){
        //      if(this.getData[i].wvNo != this.getData[item].wvNo){
        //        this.$message({
        //       duration: 1000,
        //       showClose: true,
        //       message: "入库单号必须相同",
        //       type: "warning"
        //     });
        //     return;
        //      }
        //     //  else{
        //     //  this.$router.push({
        //     //   path: "/index/Purchase/reversehousingDetails", //跳转的路径
        //     // });
        //     // localStorage.setItem("getData",JSON.stringify(this.getData))
        //     //  }
        //    }
        //  }

      }
      // else{
      //    this.$router.push({
      //     path: "/index/Purchase/reversehousingDetails", //跳转的路径
      //   });
      //   localStorage.setItem("getData",JSON.stringify(this.getData))
      //    }
    },
    //单行双击
    dblclick (e) {
      this.selectioned = e;
      this.index = this.tableData.indexOf(e);
      this.$set(this.tableData, this.tableData.indexOf(e), e);
    },
    //单行点击
    rowClick (e) {
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.tableData.indexOf(e);
    },
    //公司弹窗打开
    componyTip () {
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle () {
      this.componyShow = false;
    },
    //公司弹窗确定获取数据
    componySure (e) {
      this.componyShow = false;
      this.companyName = e;
    },
    //供应商弹窗打开
    supplierTip () {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancle () {
      this.supplierShow = false;
    },
    //供应商确认获取数据
    supplierSure (e) {
      this.supplierShow = false;
      this.supplierName = e;
    },
    //部门弹窗打开
    departmentTip () {
      // if (this.companyName == ``) {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.departmentShow = true;
    },
    //部门弹窗关闭
    departmentCancle () {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure (e) {
      this.departmentShow = false;
      this.branchName = e;
    },
    //部门弹窗打开
    manTip () {
      this.manShow = true;
    },
    //部门弹窗关闭
    manCancle () {
      this.manShow = false;
    },
    //部门弹窗确定获取数据
    manSure (e) {
      this.manShow = false;
      this.manName = e;
    },
    //仓库弹窗打开
    warehouseTips () {
      this.warehouseShow = true;
    },
    //仓库确认
    warehouseSure (e) {
      this.warehouseShow = false;
      this.warehouseName = e
      this.conList(this.warehouseName.warehouseName)
      console.log('1', e)
    },
    //仓库取消
    warehouseCancle () {
      this.warehouseShow = false;
    },
    reverseCancle () {
      this.$emit("reverseCancle");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //翻页
    currentChange (e) {
      this.pageNum = e;
      this.conList();
    },
    //更改每页条数
    handleSizeChange (e) {
      this.pageSize = e;
      this.conList();
    },
    //重置
    clearNone () {
      this.companyName = "";
      this.warehouseName = "";
      this.branchName = "";
      this.supplierName = "";
      this.createdName = "";
      this.externalPoNo = "";
      this.wvNo = "";
      this.erpPoNo = "";
      this.createdTime = [];
      this.conList()
    }
  },
  components: {
    componySelect,
    departmentSelect,
    supplierSelect,
    warehouseSelect
  },
};
</script>
<style lang="scss">
.reverseAdd {
  .el-select.el-select--mini {
    width: 100px !important;
  }
  .wutabstyle label::after {
    content: none !important;
  }
.el-table::before{
  height: 0;
}
}
</style>
<style scoped lang="scss">
</style>
