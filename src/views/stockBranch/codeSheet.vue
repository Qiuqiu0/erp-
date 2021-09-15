<template>
  <div id="codesheet" class="content-div">
    <div class="button-div button-div-query auto-sibling">
      <el-button class="query-button" @click="getUserlist" icon="el-icon-search"
        >查询</el-button
      >
      <el-button @click="clearmsg" icon="el-icon-refresh">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right">
        自定义
      </el-button>
    </div>
    <!-- <el-divider></el-divider> -->
    <!-- input -->
    <div class="input-div auto-sibling">
      <div v-if="$checkedNum(searchList) > 4">
        <p class="hide-input" v-if="showOrHide" @click="inputShow()">
          更多条件 <i class="el-icon-caret-bottom"></i>
        </p>
        <p class="hide-input" v-else @click="inputShow()">
          收起<i class="el-icon-caret-top"></i>
        </p>
      </div>
      <el-form @keyup.enter.native="getUserlist">
      <div class="search-div">
        <contract-search
            v-for="item in searchList"
            :label="item.label"
            :key="item.key"
            :checked="item.checked"
            :matchKey="item.key"
            :company="company"
            :componyTip="componyTip"
            :mattermsg="mattermsg"
            :matterTips="matterTips"
            :creditGroupInfo="creditGroupInfo"
            :creditGroupPopup="creditGroupPopup"
            :outtime="outtime"
            :dockStatus="dockStatus"
            :warehouse="warehouse"
            :warehouseTips="warehouseTips"
            :creattime="creattime"
            :createdName="createdName"
            :mytypearr="mytypearr"
            @changeInput="changeData"
        />
      </div>
      </el-form>
    </div>
    <!-- 表格 -->
    <!-- <el-divider></el-divider> -->
    <div class="button-div auto-sibling">
      <el-button
        @click="creatcom('creat')"
        icon="el-icon-folder-add"
        v-if="$actionFlag(`F001`)"
        >创建</el-button
      >
      <el-button
        @click="creatcom('edit')"
        icon="el-icon-edit"
        v-if="$actionFlag(`F002`)"
        >修改</el-button
      >
      <el-button
        @click="delitemsg('effect')"
        icon="el-icon-finished"
        v-if="$actionFlag(`F006`)"
        >生效</el-button
      >
      <el-button
        @click="delitemsg('reduce')"
        icon="el-icon-delete"
        v-if="$actionFlag(`F003`)"
        >删除</el-button
      >
      <el-button
        @click="creatcom('look')"
        icon="el-icon-data-line"
        v-if="$actionFlag(`F004`)"
        >查看</el-button
      >
      <el-button icon="el-icon-download" v-if="$actionFlag(`F005`)" @click="exportTable"
        >导出</el-button
      >
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        ref="multipleTable"
        border
        center
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="calc(100% - 35px)"
        @selection-change="handleSelectionChange"
        @row-dblclick="creatlook"
        @row-click="rowClick"
        v-loading="loading"
        @sort-change="tableSortChange"

      >
         <el-table-column
          :key="item.key"
          :prop="item.key"
          :type="item.type"
          :label="item.label"
          :width="item.width"
          :show-overflow-tooltip="item.tooltip"
          v-for="item in fixHead"
          :sortable="item.sortable"

         >
        </el-table-column>

        <el-table-column
          :key="item.key"
          :prop="item.key"
          :type="item.type"
          :label="item.label"
          v-if="item.checked"
          :width="item.width"
          :show-overflow-tooltip="item.tooltip"
          v-for="item in headerList"
          :sortable="item.sortable"

        >
         <template scope="scope" v-if="item.temp">
           <span v-if="item.key === 'itQty'">{{$numberToFixed(scope.row.itQty, 3)}}</span>
           <!-- <span v-if="item.key === 'balanceQty'">{{ $numberToFixed(scope.row.balanceQty, 3) }}</span> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[100, 200, 300,500]"
        :page-size="rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
      :tipShow="componyShow"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    >
    </compony-select>
    <!--选择仓库-->
    <warehouse-select
      v-if="warehouseShow"
      :tipShow="warehouseShow"
      @warehouseCancle="warehouseCancle"
      @warehouseSure="warehouseSure"
    >
    </warehouse-select>
    <!--信用账户组弹窗-->
    <creditGroup-select
      :isShow="creditGroupShow"
      @callback="creditGroupSelectData"
    ></creditGroup-select>
    <!--选择物料号-->
    <matter-select
      v-if="matterShow"
      :tipShow="matterShow"
      @matterCancle="matterCancle"
      @matterSure="matterSure"
    >
    </matter-select>
    <!--   自定义搜索选项-->
    <edit-search-item
      v-if="editPage"
      :list="editList"
      :title="editKey==='searchList'?'自定义搜索条件':'自定义表格排序'"
        :editPage="editPage"
        @editCancel="editCancel"
        @editSure="editSure"
    ></edit-search-item>
  </div>
</template>

<script>
import { service, serviceJson } from "../../axios/index.js";
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue";
import {
  warelist,
  reduceMsg,
  getMylxs,
  getEffect
} from "@/api/stockBranch/codesheet.js";
import warehouseSelect from "@/components/warehouseSelect.vue"; //仓库组件
import creditGroupSelect from "@/components/creditGroupSelect"; //客户
import matterSelect from "@/components/matterSelect.vue"; //物料组件
import contractSearch from "@/views/stockBranch/component/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import {getFilter, setFilter} from "@/mixins/editCondition";
import { exportData } from "@/mixins/export.js";


const AllSearch = [
  {key: 'companyName', label: '公司', checked: true},
  {key: 'creditGroupName', label: '客户', checked: true},
  {key: 'warehouseName', label: '仓库', checked: true},
  {key: 'skuCode', label: '物料编号', checked: true},
  {key: 'skuName', label: '物料名称', checked: true},
  {key: 'outtime', label: '发货日期', checked: true},
  {key: 'creattime', label: '创建时间', checked: true},
  {key: 'createdName', label: '创建人', checked: true},
  {key: 'dockStatus', label: '状态', checked: true},
]; //全部选项标签
const ALLHeader = [
  {
    label: "公司",
    tooltip: true,
    key: "companyName",
    checked: true,
    width: "170"
  },
  {
    label: "部门",
    tooltip: true,
    key: "orgName",
    checked: true,
    width: "150"
  },
  {
    label: "码单单号",
    tooltip: true,
    key: "dockSoNo",
    checked: true,
    sortable:true
  },
  {
    label: "发货日期",
    tooltip: true,
    key: "sendDate",
    checked: true,
    sortable:true
  },
  {
    label: "仓库",
    tooltip: true,
    key: "warehouseName",
    checked: true,
    width: "170"
  },
  {
    label: "状态",
    tooltip: true,
    key: "dockStatus",
    checked: true,
  },
  {
    label: "备注",
    tooltip: true,
    key: "remark",
    checked: true
  }
]; //所有表头
export default {
  name: "codeSheet",
  props: {},
  data() {
    return {
      sort:"",
      fixHead: [
        {
          type: "selection",
          key: "selection",
          checked: true,
          width: "55"
        },
        {
          type: "index",
          label: "序号",
          tooltip: true,
          key: "index",
          checked: true,
          width: "50",
        },

      ],
      editPage: false,
      searchList: AllSearch,
      headerList: ALLHeader,
      editKey: "",
      editList: [],
      dockStatus: "", //状态
      mytypearr: [], //状态下拉选择框
      skuName: "", //物料名称
      showOrHide: true,
      loading: true,
      total: 0, //条数
      pageNum: 1, //页码数
      rows: 100, //每页条数
      createdName: "",
      company: "", //公司
      componyShow: false, //公司弹框
      warehouse: "", //仓库
      warehouseShow: false, //仓库弹窗
      creditGroupShow: false, //是否显示信用账户组弹窗
      creditGroupInfo:{}, //客户
      matterShow: false, //物料弹窗
      mattermsg: "", //物料弹窗数据
      outtime: [], //发货日期
      creattime: [], //创建日期
      tableData: [],
      reducemsg: "", //选中数据
      navColor: {
        button: {
          backgroundColor: ""
        }
      }
    };
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  mixins:[getFilter,setFilter,exportData],

  created() {
    let data=this.$getQueryData(this);
    if(data.sendDate){
      this.outtime[0]=data.sendDate;
    }
    if(data.sendDateEnd){
      this.outtime[1]=data.sendDateEnd;
    }
    if(data.createdTime){
      this.creattime[0]=data.createdTime;
    }
    if(data.createdTimeEnd){
      this.creattime[1]=data.createdTimeEnd;
    }
    this.getFilter();

  },
  mounted() {
    this.getzt();
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    },
    value2(val) {
      let that = this;
      if (val > that.value3) {
        that.value3 = "";
      }
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() < that.value2;
        }
      };
    }
  },
  methods: {
    exportTable(){
      if (this.outtime) {
        var sendDate = this.outtime[0];
        var sendDateEnd = this.outtime[1];
      }
      if (this.creattime) {
        if(this.creattime[0] && this.creattime[1]){
          var createdTime = this.creattime[0]+"T00:00:00.000Z";
          var createdTimeEnd = this.creattime[1]+"T23:59:59.000Z";
        }
      }
      let data={
        sort: this.sort,
        rows: this.rows,
        pageNum: this.pageNum,
        companyCode: this.company.companyCode, //公司
        warehouseCode: this.warehouse.warehouseCode, //仓库
        goodsCode: this.mattermsg.skuCode, //物料编码
        goodsName: this.mattermsg.skuName, //物料名称
        custCode: this.creditGroupInfo.creditGroupCode, //客户
        dockStatus: this.dockStatus,
        sendDate: sendDate,
        sendDateEnd: sendDateEnd,
        createdTime: createdTime?createdTime:'',
        createdTimeEnd: createdTimeEnd?createdTimeEnd:'',
        createdName: this.createdName
      }
      let params=data;
      params.company=this.company;
      params.warehouse=this.warehouse;
      params.mattermsg=this.mattermsg;
      params.creditGroupInfo=this.creditGroupInfo;
      const fixHead = JSON.parse(JSON.stringify(this.fixHead));
      fixHead.splice(0,2);
      const exportFieldList = [];
      fixHead.concat(this.headerList).forEach((item) => {
        if (item.checked) {
          const { key, label, otherKey } = item;
          exportFieldList.push({ key: otherKey ? otherKey : key, label })

        }
      });
      this.exportData({ ...data, exportFieldList })
    },
    tableSortChange(column){
      const {prop,order} = column;
      if (order === "descending") {
        this.sort = `${prop} desc`;
      } else {
        this.sort = `${prop} asc`;
      }
      this.getUserlist()
    },
    editCancel(list) {
      this.editPage = false;
      this[this.editKey] = list;
    },
    editSure(list) {
      this.editPage = false;
      this[this.editKey] = []; //必须先清空 再更新 否则不触发
      this.$nextTick(() => {
        this[this.editKey] = list;
        this.setFilter({filterJson:JSON.stringify(this.headerList),listJson:JSON.stringify(this.searchList)})

      });
    },
    showEditPage(key) {
      this.editKey = key;
      this.editPage = true;
      this.editList = this[key];
    },
    changeData({ val, key }) {
      this[key] = val;
    },
    getzt() {
      getMylxs({ dictNo: 1096 }).then(res => {
        if (res.code === "success") {
          this.mytypearr = res.data;
          this.getUserlist();
        }
      });
    },
    getUserlist() {
      if (this.outtime) {
        var sendDate = this.outtime[0];
        var sendDateEnd = this.outtime[1];
      }
      if (this.creattime) {
         if(this.creattime[0] && this.creattime[1]){
          var createdTime = this.creattime[0]+"T00:00:00.000Z";
          var createdTimeEnd = this.creattime[1]+"T23:59:59.000Z";
        }
      }
      let data={
        sort: this.sort,
        rows: this.rows,
        pageNum: this.pageNum,
        companyCode: this.company.companyCode, //公司
        warehouseCode: this.warehouse.warehouseCode, //仓库
        goodsCode: this.mattermsg.skuCode, //物料编码
        goodsName: this.mattermsg.skuName, //物料名称
        custCode: this.creditGroupInfo.creditGroupCode, //客户
        dockStatus: this.dockStatus,
        sendDate: sendDate,
        sendDateEnd: sendDateEnd,
        createdTime: createdTime?createdTime:'',
        createdTimeEnd: createdTimeEnd?createdTimeEnd:'',
        createdName: this.createdName
      }
      let params=data;
      params.company=this.company;
      params.warehouse=this.warehouse;
      params.mattermsg=this.mattermsg;
      params.creditGroupInfo=this.creditGroupInfo;
      this.$setQueryData(this,params);
      warelist(data).then(res => {
        if (res.code === "success") {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
          this.tableData.forEach(i => {
            i.sendDate = this.$timeFun(i.sendDate, true);
            this.mytypearr.forEach(j => {
              if (String(i.dockStatus) === j.dict_code) {
                i.dockStatus = j.dict_value;
              }
            });
          });
        }
      });
    },
    creatlook(row){
      let data = 'look'
      this.$router.push({
          path: "/index/stockBranch/codeSheetcreat",
          query: {
            data: data,
            msgid: row.dockerSoId,
            version: row.version
          }
        });
    },
    creatcom(type) {
      if (type === "look" || type === "edit") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (type === "edit") {
          if (this.reducemsg[0].dockStatus === "生效") {
            this.$openWarning("生效状态不能修改");
            return;
          }
        }
        this.$router.push({
          path: "/index/stockBranch/codeSheetcreat",
          query: {
            data: type,
            msgid: this.reducemsg[0].dockerSoId,
            version: this.reducemsg[0].version
          }
        });
      } else {
        this.$router.push({
          path: "/index/stockBranch/codeSheetcreat",
          query: {
            data: type
          }
        });
      }
    },
    inputShow() {
      this.showOrHide = this.$showOne(this.showOrHide);
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.company = e;
      // this.branchName = this.staffName = ''
    },
    //公司弹窗打开
    componyTip() {
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //仓库弹窗
    warehouseTips() {
      this.warehouseShow = true;
    },
    //仓库弹窗关闭
    warehouseCancle() {
      this.warehouseShow = false;
    },
    //仓库弹窗确定获取数据
    warehouseSure(e) {
      this.warehouseShow = false;
      this.warehouse = e;
      // this.warehouseCode=e.warehouseCode;
    },
    //信用账户组弹窗
    creditGroupPopup() {
      this.creditGroupShow = true;
    },
    //信用账户组弹窗回调
    creditGroupSelectData(res) {
      if (res) {
        this.creditGroupInfo = res;
      }
      this.creditGroupShow = false;
    },
    //物料号弹窗
    matterTips() {
      this.matterShow = true;
    },
    //物料号弹窗关闭
    matterCancle() {
      this.matterShow = false;
    },
    //物料号确定获取数据
    matterSure(e) {
      this.matterShow = false;
      this.mattermsg = e;
      this.skuName = e.skuName;
    },
    handleSelectionChange(val) {
      //表格选中数据
      this.reducemsg = val;
    },
    handleSizeChange(val) {
      this.rows = val;
      this.getUserlist();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUserlist();
    },
    delitemsg(data) {
      //删除数据
      if (this.reducemsg.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      let kbreducemsg = JSON.parse(JSON.stringify(this.reducemsg));
      let yzsj = [];
      kbreducemsg.forEach(i => {
        this.mytypearr.forEach(j => {
          if (i.dockStatus === j.dict_value) {
            i.dockStatus = j.dict_code;
          }
        });
      });
      kbreducemsg.forEach(i => {
        yzsj.push(i.dockStatus);
      });
      if (yzsj.indexOf("10960010") != -1) {
        this.$openWarning("生效状态不能操作");
        return;
      }
      if (data === "reduce") {
        this.$confirm("是否确定删除继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          reduceMsg({
            editOdDockSoForms: kbreducemsg
          }).then(res => {
            if (res.code === "success") {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.getUserlist();
            }
          });
        });
      } else {
        getEffect({ editOdDockSoForms: kbreducemsg }).then(res => {
          if (res.code === "success") {
            this.$openSuccess(res.message);
            this.getUserlist();
          }
        });
      }
    },
    clearmsg() {
      //重置
      this.company = this.warehouse = this.mattermsg = this.creditGroupInfo ={}; this.outtime =this.creattime =[]; this.createdName =  this.dockStatus = this.skuName =
        "";
    },
     rowClick(row){
            this.$refs.multipleTable.toggleRowSelection(row);
        },
  },
  components: {
    componySelect,
    warehouseSelect,
    creditGroupSelect,
    contractSearch,
    editSearchItem,
    matterSelect
  }
};
</script>

<style lang="scss">
#codesheet {
  // .el-input {
  //   width: auto;
  // }
  // .el-range-editor .el-range-input {
  //   width: 70%;
  // }

  // .el-col {
  //   position: relative;
  //   .comicon {
  //     width: 170px;
  //     height: 20px;
  //     position: absolute;
  //     right: 6px;
  //     top: 7px;
  //     cursor: pointer;
  //   }
  // }
}
</style>
