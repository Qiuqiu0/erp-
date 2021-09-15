<!--供应商信息弹窗-->
<template>
  <div id="supplierSelect">
    <el-dialog title="供应商信息" :visible.sync="tipShow" append-to-body :show-close="false" :before-close="cancel" width="1100px">
      <div class="index">
        <div class="button-div">
          <el-button @click="query" icon="el-icon-search">查询</el-button>
          <el-button @click="reset" icon="el-icon-refresh">重置</el-button>
          <el-button @click="collectData" :icon="isCollected===0?'el-icon-folder-opened':'el-icon-folder'">{{isCollected===0?'已收藏':'查看全部'  }}</el-button>
        </div>
        <div class="input-div">
        <el-form @keyup.enter.native="query"> 
          <el-col :span="5" class="el-col">
            <label>供应商代码</label>
            <el-input v-model="supplierCode" class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>供应商名称</label>
            <el-input v-model="supplierName" class="el-inputs"></el-input>
          </el-col>
        </el-form>
        </div>
        <div>
          <el-table
            class="el-table"
            border
            center
            :data="supplierList"
            v-loading="loading"
            :row-class-name="setRowIndex"
            @row-click="selectRow"
            @selection-change="handleSelectionChange"

          >
            <el-table-column width="55" type="selection">

            </el-table-column>
            <el-table-column prop="supplierCode" label="供应商代码" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="supplierName" label="供应商名称" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="companyName" label="公司名称" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column
                label="操作"
                width="70">
              <template slot-scope="scope">
                <el-button
                    @click.native.prevent="collect(scope)"
                    type="text"
                    size="small">
                  {{scope.row.isCollected?'移除':'收藏'}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
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
        <div class="button-div2">
          <el-button type="primary" size="small" @click="confirm" icon="el-icon-check">确 定</el-button>
          <el-button size="small" @click="cancel" icon="el-icon-close">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import PopupApi from "@/api/component";
export default {
  name: "supplierSelect",
  data() {
    return {
      isCollected:0,
      supplierCode: "",
      supplierName: "",
      supplierList: [],
      radioIndex: null,
      radioRow: "",
      loading: true,
      page: 1,
      pageSize: 100,
      total: 0
    };
  },
  props: {
    tipShow: Boolean,
    filterQuery: {
      type: Object,
      default: Object
    }
  },
  created() {
    this.queryData();
  },
  mounted() {},
  methods: {
    collectData(){
      this.isCollected = this.isCollected === 0?1:0;
      this.queryData()
    },
    functionType(scope){
      const funMap = {'collect':PopupApi.supplierCollection,"delete":PopupApi.supplierCollectionDelete};
      const {row:{isCollected=false}} = scope;
      const funType = isCollected?'delete' :'collect';
      return funMap[funType]
    },
    collect(scope){
      let {$index,row:{isCollected,supplierId}} = scope;
      const funType = this.functionType(scope)
      // isCollected = isCollected === 1
      funType([supplierId]).then((res)=>{
        // let item = this.tableData[$index];
        // this.$refs.multipleTable.toggleRowSelection(item,!isCollected)
        this.queryData()
      })
    },
    handleSelectionChange(val){
      this.radioRow = val
    },
    //初始化数据
    initData() {
      this.supplierCode = "";
      this.supplierName = "";
      this.radioIndex = null;
      this.radioRow = "";
      this.page = 1;
      this.pageSize = 10;
    },
    //获取供应商信息列表
    queryData() {
      this.radioIndex = null;
      this.radioRow = "";
      this.loading = true;
      PopupApi.supplierSelect2({
        page: this.page,
        pageSize: this.pageSize,
        supplierCode: this.supplierCode,
        supplierName: this.supplierName,
       // isInactive: 0,
        isSubsidiary: this.filterQuery.isSubsidiary,
        supplierId: this.filterQuery.notEqual,
        isCollected:this.isCollected
      }).then(res => {
        this.loading = false;
        if (res.code == "success") {
          this.supplierList = res.data.list;
          this.total = res.data.total;
        } else {
          this.$openWarning(res.message);
        }
      }).catch(() => {
        this.loading = false;
      });
    },
    //查询
    query() {
      this.page = 1;
      this.queryData();
    },
    //重置
    reset() {
      this.supplierCode = "";
      this.supplierName = "";
    },
    //列表单选
    setRowIndex({row, rowIndex}) {
      row.index = rowIndex;
    },
    selectRow(row) {
      this.radioIndex = row.index;
      this.radioRow = row;
    },
    //翻页
    currentChange(val) {
      this.page = val;
      this.queryData();
    },
    //单页数量
    currentSize(val) {
      this.page = 1;
      this.pageSize = val;
      this.queryData();
    },
    //确定
    confirm() {
      if (this.radioRow.length == 0) {
        this.$openWarning("请选择要添加的数据");
        return;
      }
      this.$emit("supplierSure", this.radioRow);
      this.initData();
    },
    //取消
    cancel() {
      this.$emit("supplierCancle", false);
      this.initData();
    }
  },
  computed: {}
};
</script>
