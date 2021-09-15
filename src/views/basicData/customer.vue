<template>
  <div id="customer">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
      <el-col :span="5" class="el-col">
        <label>客户代码</label>
        <el-input v-model="customerCode" class="el-inputs"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>客户名称</label>
        <el-input v-model="customerName" class="el-inputs"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>状态</label>
        <el-select v-model="isInactive" class="el-selects" placeholder="请选择" clearable>
          <el-option v-for="(item, index) in stateArr" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>业务员</label>
        <el-input v-model="salesman" class="el-inputs" placeholder="请选择" disabled></el-input>
        <span class="moreIcon" @click="staffPopup"><i class="el-icon-search"></i></span>
      </el-col>
    </div>
    <!--列表信息-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-folder-add" v-if="$actionFlag(`F001`)" @click="addData">创建</el-button>
      <el-button icon="el-icon-edit" v-if="$actionFlag(`F002`)" @click="updateData">修改</el-button>
      <el-button icon="el-icon-delete" v-if="$actionFlag(`F003`)" @click="deleteData">删除</el-button>
      <el-button icon="el-icon-data-line" v-if="$actionFlag(`F004`)" @click="goDetail">查看</el-button>
      <el-button icon="el-icon-lock" v-if="$actionFlag(`F005`)" @click="changeState(1)">禁用</el-button>
      <el-button icon="el-icon-unlock" v-if="$actionFlag(`F006`)" @click="changeState(0)">启用</el-button>
      <el-button icon="el-icon-document-copy" v-if="$actionFlag(`F007`)" @click="copySupplier">扩展供应商</el-button>
      <!-- <el-button icon="el-icon-refresh" v-if="$actionFlag(`F008`)" @click="operationCustomer(3)">推送客户</el-button>
      <el-button icon="el-icon-refresh" v-if="$actionFlag(`F009`)" @click="operationCustomer(1)">核准客户</el-button>
      <el-button icon="el-icon-refresh" v-if="$actionFlag(`F010`)"  @click="operationCustomer(2)">分配客户</el-button>
      <el-button icon="el-icon-finished" v-if="$actionFlag(`F011`)"  @click="operationCustomer(4)">提交财务</el-button> -->
      <el-button icon="el-icon-download" v-if="$actionFlag(`F012`)"    @click="exportFile()">导出</el-button>
     
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        class="el-table"
        border
        center
        height="calc(100% - 35px)"
        :data="customerData"
        v-loading="loading"
        ref="multipleTable"
        @selection-change="handleChange"
        @row-click="selectedRow"
        @row-dblclick="singleDblclick">
        <el-table-column type="selection"	width="55" fixed></el-table-column>
        <el-table-column prop="customerCode" label="客户代码" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customerName" label="客户名称" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.isInactive == 0 ? "启用" : "禁用"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="salesman" label="业务员" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createdName" label="创建人" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" min-width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.createdTime | time}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedName" label="修改人" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="修改时间" min-width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.updatedTime | time}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageArea"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentChange"
        @size-change="currentSize"
        :current-page="page"
        :page-sizes="[100, 200, 300,500]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <!--扩展供应商弹窗-->
    <el-dialog title="扩展供应商" :visible.sync="copyDialog" :show-close="false" :before-close="copyCancel" width="350px">
      <div class="input-div" style="margin:15px 0;border:none">
        <el-col class="el-col" style="width:85%">
          <label>供应商类型</label>
          <el-select v-model="supplierType" class="el-selects" placeholder="请选择">
            <el-option v-for="(item, index) in supplierTypeDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
          </el-select>
        </el-col>
      </div>
      <div style="text-align:center">
        <el-button icon="el-icon-check" size="mini" type="primary" @click="copySure">确定</el-button>
        <el-button icon="el-icon-close" size="mini" @click="copyCancel">取消</el-button>
      </div>
    </el-dialog>
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
                  value-format="yyyy-MM-dd"
                  >
                </el-date-picker>
              </el-col>
          </div>
          <div class="button-div2" style="margin-bottom:10px">
              <el-button  @click="exportSure" icon="el-icon-check" :disabled="exportStatus">确定</el-button>
              <el-button  @click="exportShow=false;" icon="el-icon-close">取消</el-button>
          </div> 
      </el-dialog>
      <!--导出弹窗 结束-->
    <!--业务员弹窗-->
    <staff-select v-if="staffShow" :tipShow="staffShow" @staffCancle="staffCancel" @staffSure="staffSure"></staff-select>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CustomerApi from "@/api/basicData/customer";
import staffSelect from "@/components/staffSelect";
export default {
  name: "customer",
  data() {
    return {
      supplierType: "",
      supplierTypeDic: [],
      copyDialog: false, //是否显示扩展供应商弹窗
      //查询条件
      customerCode: "",
      customerName: "",
      isInactive: "",
      stateArr: [
        {value: 0, label: "启用"},
        {value: 1, label: "禁用"}
      ],
      salesman: "",
      staffShow: false, //是否显示业务员弹窗
      //列表字段
      customerData: [],
      loading: true,
      selected: [], //列表选中行
      page: 1,
      pageSize: 100,
      total: 0,
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      createdTime:[],//创建日期
      exportShow:false,
      exportStatus:false,
    };
  },
  created() {
    //取查询条件
    this.$getQueryData(this);
    //供应商类型字典数据
    this.supplierTypeData();
    //获取列表
    this.customerList();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
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
        CustomerApi.exportCustomer(data).then(res=>{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="客户.xls";
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          this.exportShow=false;
        }).catch();
      }
   },
    //获取列表
    customerList() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        customerCode: this.customerCode,
        customerName: this.customerName,
        isInactive: this.isInactive,
        salesman: this.salesman
      };
       //存查询条件
      this.$setQueryData(this,params);
      params = this.$queryFilter(params);
      this.loading = true;
      CustomerApi.customerList(params).then(res => {
        this.loading = false;
        this.customerData = res.data.list;
        this.total = res.data.total;
      }).catch(() => {
        this.loading = false;
      });
    },
    //供应商类型字典数据
    supplierTypeData() {
      CustomerApi.dicQuery({
        dictNo: 1010
      }).then(res => {
        this.supplierTypeDic = res.data;
      }).catch();
    },
    //创建
    addData() {
      this.$router.push({name: "customerEdit"});
    },
    //修改
    updateData() {
      if (this.selected.length != 1) {
        this.$openWarning("请选择一条要修改的数据");
        return false;
      }
      this.$router.push({name: "customerEdit", query: {id: this.selected[0].customerId}});
    },
    //删除
    deleteData() {
      if (this.selected.length == 0) {
        this.$openWarning("请选择要删除的数据");
        return false;
      }
      let canDelete = true;
      this.selected.forEach(item => {
        if (item.isInactive == 0) {
          canDelete = false;
          return false;
        }
      });
      if (!canDelete) {
        this.$openWarning("只能删除禁用状态的单据");
        return false;
      }
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = [];
        this.selected.forEach(item => {
          params.push({
            customerId: item.customerId,
            version: item.version
          });
        });
        CustomerApi.customerDelete(params).then(res => {
          this.$openSuccess(res.message);
          this.page = 1;
          this.customerList();
        }).catch();
      });
    },
    //查看
    goDetail() {
      if (this.selected.length != 1) {
        this.$openWarning("请选择一条要查看的数据");
        return false;
      }
      this.$router.push({name: "customerDetail", query: {id: this.selected[0].customerId}});
    },
    //禁用、启用
    changeState(state) {
      if (this.selected.length == 0) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let title = state == 0 ? "是否确定启用？" : "是否确定禁用？";
      this.$confirm(title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = [];
        this.selected.forEach(item => {
          params.push({
            customerId: item.customerId,
            version: item.version
          });
        });
        if (state == 0) {
          CustomerApi.customerEnable(params).then(res => {
            this.$openSuccess(res.message);
            this.page = 1;
            this.customerList();
          }).catch();
        } else if (state == 1) {
          CustomerApi.customerDisable(params).then(res => {
            this.$openSuccess(res.message);
            this.page = 1;
            this.customerList();
          }).catch();
        }
      });
    },
    //扩展供应商
    copySupplier() {
      if (this.selected.length != 1) {
        this.$openWarning("请选择一条要扩展的数据");
        return false;
      }
      this.copyDialog = true;
    },
    //取消扩展
    copyCancel() {
      this.copyDialog = false;
      this.supplierType = "";
    },
    //确定扩展
    copySure() {
      if (this.supplierType === "") {
        this.$openWarning("请选择供应商类型");
        return false;
      }
      CustomerApi.customerCopy({
        id: this.selected[0].customerId,
        type: this.supplierType
      }).then(res => {
        this.$openSuccess(res.message);
        this.copyDialog = false;
        this.supplierType = "";
      }).catch();
    },
    //查询
    query() {
      this.page = 1;
      this.customerList();
    },
    //重置
    reset() {
      this.customerCode = "";
      this.customerName = "";
      this.isInactive = "";
      this.salesman = "";
    },
    //业务员弹窗
    staffPopup() {
      this.staffShow = true;
    },
    //业务员弹窗关闭
    staffCancel() {
      this.staffShow = false;
    },
    //业务员弹窗确定并传值
    staffSure(e) {
      this.staffShow = false;
      this.salesman = e.empName;
    },
    //列表多选
    handleChange(e) {
      this.selected = e;
    },
    selectedRow(e) {
      this.$refs.multipleTable.toggleRowSelection(e);
    },
    //列表双击查看详情
    singleDblclick(e) {
      this.$router.push({name: "customerDetail", query: {id: e.customerId}});
    },
    //翻页
    currentChange(e) {
      this.page = e;
      this.customerList();
    },
    //单页数量
    currentSize(e) {
      this.page = 1;
      this.pageSize = e;
      this.customerList();
    },
    //1核准客户  2分配客户 3推送客户 4，已经财务
    operationCustomer(type){
      if (this.selected.length==0) {
        this.$openWarning("未选择数据");
        return false;
      }else if(this.selected.length>1 && type!=4){
        this.$openWarning("此选项不能批量操作");
        return false;
      }
      
      if(type!=4){
        let data={
            customerId:this.selected[0].customerId
        }
        let api='';
        if(type==1){
            api=CustomerApi.approvalCustomerToKD;
        }else if(type==2){
            api=CustomerApi.assignCustomerToKD;
        }else if(type==3){
            api=CustomerApi.pushCustomerToKD;
        }
        api(data).then(res=>{
          if(res.code=="success"){
            this.$openSuccess(res.data);
          }else{
            this.$openWarning(res.message);
          }
        }).catch();
      }else{
          let list=[];
          this.selected.forEach(item=>{
            list.push(item.customerId);
          });
          let data={
            list:list
          }
          CustomerApi.importCustomerCompanyToKD(list).then(res=>{
            if(res.code=="success"){
              this.$openSuccess(res.data);
            }else{
              this.$openWarning(res.message);
            }
          }).catch();
      }
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
    }
  },
  components: {
    staffSelect
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
<style lang="scss" scoped>
.index .examine-dialog .el-col .el-input2, .index .examine-dialog .el-col .el-select, .index .examine-dialog .el-col .el-textarea{
  width: 220px !important;
}
#customer {
  .el-col {
    position: relative;
    .moreIcon {
      width: 70%;
      height: 24px;
      position: absolute;
      top: 0;
      right: 0;
      padding: 4px 5px;
      cursor: pointer;
    }
  }
  .is-disabled {
    .el-input__inner {
      color: #666;
      cursor: pointer;
    }
  }
  .el-col-5 {
    height: 32px;
  }
  label {
    display: inline-block;
    width: 30%;
    vertical-align: middle;
  }
  .el-inputs,
  .el-selects {
    width: 70%;
    .el-input__inner {
      width: 100%;
    }
  }
  .input-div .el-col:last-child {
    margin-bottom: 0;
  }
  .pageArea {
    margin: 10px 0 0 20px;
  }
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
.index .el-range-editor--mini .el-col{
      margin-left: 10px;
}
.index  .el-range-editor--mini .el-range-separator{
      width: 30%;
    padding-top: 3px;
}
.index  .el-range-editor--mini .el-range-separator{
      width: 30%;
    padding-top: 3px;
}
.index .el-range-editor--mini .el-range__icon{
  margin-left: 5px;
  line-height: 24px;
}
</style>