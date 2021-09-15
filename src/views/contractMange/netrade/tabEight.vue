<template>
  <div class="tabEight content-div2 contract_css_link">
    <!-- 收款方式 -->
    <div class="input-div input-div-bor bortop0">
      <!-- <div class="table_title">本项目关联合同</div> -->
      <div class="flex_center">
        <div class="button-div">
          <el-button icon="el-icon-plus" class="query-button"  @click="addList">创建</el-button>
          <el-button icon="el-icon-minus" @click="setUp">删除</el-button>
        </div>
      </div>
      <div class="">
        <el-table border center :data="tableData" class="el-table" @selection-change="handleChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <!-- +<el-table-column type="index" label="序号" width="55">
          </el-table-column> -->
          <el-table-column label="序号" type="index" width="55" show-overflow-tooltip></el-table-column>
          <el-table-column prop="soContractNo" label="销售合同号" show-overflow-tooltip width="170">
          </el-table-column>
          <el-table-column prop="extCode" label="外部合同号" show-overflow-tooltip width="170">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="custName" label="客户" width="170">
          </el-table-column>
          <el-table-column prop="signTime" label="签约日期" show-overflow-tooltip width="170">
            <template scope="scope">
              {{$timeFun(scope.row.signTime, 1)}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="remark" label="备注">
          </el-table-column>
          <el-table-column prop="bizPersonName" label="人员" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orgName" label="部门" show-overflow-tooltip width="170"></el-table-column>
          <el-table-column prop="companyName" label="公司" show-overflow-tooltip width="170"></el-table-column>
          <el-table-column show-overflow-tooltip prop="contractCat" label="类型">
            <template scope="scope">
              <span v-for="(item, index) in status" :key="index">
                <span v-if="item.dict_code == scope.row.contractCat">{{item.dict_value}}</span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 收款方式 -->
    <!-- 选择合同弹窗 -->
    <contract-select
      v-if="contractShow"
      :tipShow="contractShow"
      @contractClose="contractClose"
      @contractTrue="contractTrue"
      :contractStatus='10130015'
    ></contract-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import contractSelect from "@/components/contractSale.vue";
import Cmange from "@/api/contractMange/cmange";
import "@/assets/css/contract.scss";
export default {
  name: "tabEight",
  data() {
    return {
      contractShow: false, //采购合同显示
      tableData: [], //通讯表格
      selectioned: [], //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      linkList: [],
      status: [],
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      warehouseLinkList: [], //联系人
      soContractNo: ``,
      poNo: ``, //采购合同号
      warehouseId: "",
      version: "",
      loading: true, //表格loading
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      show: true,
      quChange: false, //是否为变更合同,
      tempTableData:[]
      // $root.Bus: this.$BusFactory(this)
    };
  },
  created() {
    if (this.$route.query.change) {
      this.quChange = true;
    }
    this.htzt();
    //获取信息
    if (this.$route.query.id) {
      this.getDetail();
    }
  },
  mounted() {
    
    this.$root.Bus.$on("no", e => {
      this.poNo = e;
    });
    this.tableData = this.$store.state.route.params.eight || [];
  },
  methods: {
    getDetail() {
      let params = {
        poId: this.$route.query.id,
        pageSize: 999
      };
      Cmange.getGl(params)
        .then(res => {
          if(res.data.length){
              this.tableData = res.data.map(item => {
              item.odSoContract.id = item.id;
              return item.odSoContract;
            });
        } 
          
        })
        .catch();
    },
    to() {
      for (const item of this.tableData) {
        item.relativeType = 0;
        item.poNo = this.poNo;
        item.poId = this.$route.query.id;
      }
      this.tableData.concat(this.tempTableData);
      let data = this.tableData;
      this.$emit("get", data, 5);
    },
    //获取合同类型
    htzt() {
      Cmange.xshtlx()
        .then(res => {
          this.status = res.data;
        })
        .catch();
    },
    //删除
    setUp() {
      if (!this.selectioned.length) {
        this.$openWarning("未选择数据");
        return false;
      }
      this.$confirm("确定删除吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if(this.$route.query.change){
            this.selectioned.map((item, index) => {
              this.tableData.splice(this.tableData.indexOf(item), 1);
              item.isInactive = 2;
            });
             this.tempTableData.concat(this.selectioned);
            this.$openSuccess("删除成功，变更后生效");
          }else{
            let idSav = []; //修改数据
            let idNo = []; //新建数据
            for (const item of this.selectioned) {
              if (item.id) {
                idSav.push(item.id);
              } else {
                idNo.push(item);
              }
            }
            let params = {
              idList: idSav.join(","),
              poId: this.$store.state.contraDelData.cgCon.poId,
              version: this.$store.state.contraDelData.cgCon.version
            };
            idSav.length &&
              Cmange.delGl(params)
                .then(res => {
                  this.$openSuccess(res.message);
                })
                .catch();
            this.deleIndex(this.selectioned, this.tableData);
          }
        })
        .catch();
    },
    //删除方法
    deleIndex(e, list) {
      for (const get of e) {
        let del = list.findIndex(item => {
          return item.soContractNo == get.soContractNo;
        });
        list.splice(del, 1);
      }
    },
    //表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    //弹窗打开
    addList() {
      this.contractShow = true;
    },
    //弹窗关闭
    contractClose() {
      this.contractShow = false;
    },
    //弹窗确定获取数据
    contractTrue(e) {
      if (this.tableData.length) {
        let a = this.tableData.every(item => {
          return item.soContractNo != e.soContractNo;
        });
        if (a) this.tableData.push(e);
      } else {
        this.tableData.push(e);
      }
      this.contractShow = false;
    }
  },
 
  components: {
    contractSelect
  }
};
</script>

<style lang="scss">
</style>
