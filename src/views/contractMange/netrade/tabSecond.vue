<template>
  <div class="tabSecond content-div2 contract_css_link">
    <div class="input-div input-div-bor">
      <!-- <div class="table_title">运输信息</div> -->
      <div>
        <el-col :span="5" class="el-col ">
          <label><span class="must-full">*</span>最迟交期</label>
          <el-date-picker
            v-model="deliveryCutoffDate"
            type="date"
            placeholder="选择日期"
            :class="errorKey.includes('deliveryCutoffDate') ? 'inputRed' : ''"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="20" class="el-col">
          <label style="width:8.6%">收货地址</label>
          <el-input
              v-model="receiverAddress"
              size="small"
              class="el-inputs"
              placeholder="请输入内容"
              style="width:88%"
              >
          </el-input>
        </el-col>
      </div>
    </div>
    <!-- 搜索 -->
    <!-- 运输信息 -->
    <div class="input-div input-div-bor bortop0">
      <div class="flex_center">
        <div class="button-div">
          <el-button icon="el-icon-plus"
            class="query-button"
            @click="ysxxaddList"
            >创建</el-button
          >
          <el-button icon="el-icon-minus" @click="setUp(selecYsxx, tableDataYsxx, 0)">删除</el-button>
        </div>
      </div>
      <div class="">
        <el-table
          border
          center
          :data="tableDataYsxx"
          class="el-table"
          ref="multipleTable"
          @selection-change="ysxxhandleChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <!-- <el-table-column
            label="序号"
            prop="rowno"
            width="55"
            show-overflow-tooltip
          >
          </el-table-column> -->
          <el-table-column label="序号" type="index" width="55" show-overflow-tooltip></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="paritiesDate"
            label="出厂运输方式"
          >
            <template slot-scope="scope">
              <div>
                <el-select
                  v-model="scope.row.leaveTransferMode"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in ysfsList"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_code"
                  >
                  </el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferTarget"
            label="目的地"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.transferTarget"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferPlanMan"
            label="运输安排人（供应商安排/仓储物流中心安排）"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.transferPlanMan"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferExcutor"
            label="承运人（车队/船队）"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.transferExcutor"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferExcutorTel"
            label="承运人联系方式"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.transferExcutorTel"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferNote"
            label="备注"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.transferNote"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Bmange from "@/api/contractMange/bmange";
import Cmange from "@/api/contractMange/cmange";
import "@/assets/css/contract.scss";
export default {
  name: "tabSecond",
  data() {
    return {
      poId: ``,
      poNo: ``,
      version: ``,
      //运输信息
      deliveryCutoffDate: ``, //最迟交货日期
      transMode: ``, //运输方式
      ysfsList: [], //运输方式列表
      loadTimeType: ``, //装卸时间
      zxsjList: [], //装卸时间列表
      receiverAddress: ``, //收货地址
      tableDataYsxx: [], //运输路径
      tableData: [], //通讯表格
      selectioned: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      linkList: [],
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      loading: true, //表格loading
      selecYsxx:[],
      tempTableData:[],
      errorKey: [],
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
      quChange: false //是否为变更合同
    };
  },
  created() {
    if (this.$route.query.change) {
      this.quChange = true;
    }
    this.cyfs();
    this.ysfs();
    //获取信息
    this.$route.query.id && this.getDetail();
    if (this.$store.state.route.params.eight) {
      //路径表
      let params = {
        soContractId: this.$store.state.route.params.eight[0].soContractId
      };
      Bmange.getYsxx(params)
        .then(res => {
          let red = res.data;
          this.version = red.version;
          // this.soContractNo = red.soContractNo; //合同号
          // this.soContractId = red.soContractId; //合同id
          this.deliveryCutoffDate = red.deliveryCutoffDate; //最迟交货日期
          this.priceTem = red.priceTem && red.priceTem.toString(); //价格条款
          this.transMode = red.transMode && red.transMode.toString(); //运输方式
          this.loadTimeType = red.loadTimeType && red.loadTimeType.toString(); //装卸时间
          this.shipMode = red.shipMode && red.shipMode.toString(); //船运方式
          // this.radio = red.isTransfered == 1 ? `isTransfered` : `isBatched`; //是否转船是否分批
          this.isTransfered = red.isTransfered ? true : false;
          this.isBatched = red.isBatched ? true : false;
          this.loadingPort = red.loadingPort; //装货港
          this.unloadingPort = red.unloadingPort; //卸货港
          this.destination = red.destination; //目的地
          this.shipName = red.shipName; //船名
          this.shipCode = red.shipCode; //船舶识别号
          this.receiverAddress = red.receiverAddress; //送货地址
        })
        .catch();
      Bmange.getLj(params)
        .then(res => {
          this.tableDataYsxx = res.data;
        })
        .catch();
    }
  },
  mounted() {

  },
  methods: {
    getDetail() {
      //拆分式不调用
      if (this.$route.query.children) return false;
      let params = {
        poId: this.$route.query.id,
        pageSize: 999
      };
      Cmange.getYsxx(params)
        .then(res => {
          let red = res.data;
          this.version = red.version;
          this.poNo = red.poNo; //合同号
          this.poId = red.poId; //合同id
          this.deliveryCutoffDate = red.deliveryCutoffDate; //最迟交货日期
          this.priceTem = red.priceTem && red.priceTem.toString(); //价格条款
          this.transMode = red.transMode && red.transMode.toString(); //运输方式
          this.loadTimeType = red.loadTimeType && red.loadTimeType.toString(); //装卸时间
          this.shipMode = red.shipMode && red.shipMode.toString(); //船运方式
          this.radio = red.isTransfered == 1 ? `isTransfered` : `isBatched`; //是否转船是否分批
          this.loadingPort = red.loadingPort; //装货港
          this.unloadingPort = red.unloadingPort; //卸货港
          this.destination = red.destination; //目的地
          this.shipName = red.shipName; //船名
          this.shipCode = red.shipCode; //船舶识别号
          this.receiverAddress = red.receiverAddress; //送货地址
        })
        .catch();
      //路径表
      Cmange.getLj(params)
        .then(res => {
          this.tableDataYsxx = res.data;
        })
        .catch();
    },
    to() {
      this.errorKey= [];
      if (!this.deliveryCutoffDate) {
        this.errorKey.push('deliveryCutoffDate');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning(`请将必填项补充完整！`);
        return false;
      }
      this.tableDataYsxx.concat(this.tempTableData);
      let data = {
        //合同运输信息
        odPoTransferInfo: {
          deliveryCutoffDate: this.deliveryCutoffDate, //最迟交货日期
          receiverAddress: this.receiverAddress //送货地址
        },
        odPoCtiPathsList: this.tableDataYsxx //供应商合同运输路径
      };
      if (this.$route.query.id) {
        data.odPoTransferInfo.poNo = this.poNo;
        data.odPoTransferInfo.poId = this.poId;
        data.odPoTransferInfo.version = this.version;
        for (let item of this.tableDataYsxx) {
          item.poId = this.poId;
        }
      }
      this.$emit("get", data, 4);
    },
    //获取运输方式
    ysfs() {
      Cmange.ysfs()
        .then(res => {
          this.ysfsList = res.data;
        })
        .catch();
    },
    //获取船运方式
    cyfs() {
      Cmange.cyfs()
        .then(res => {
          this.cyfsList = res.data;
        })
        .catch();
    },
    //数据操作  1修改 0删除 3启用4禁用
    setUp(e, list, key) {
      if (!e.length) {
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
            this.selecYsxx.map((item, index) => {
              this.tableDataYsxx.splice(this.tableDataYsxx.indexOf(item), 1);
              item.isInactive = 2;
            });
            this.tempTableData.concat(this.selecYsxx);
            this.$openSuccess("删除成功，变更后生效");
          }else{
            let idSav = []; //修改数据
            let idNo = []; //新建数据
            let params = {};
            for (const item of e) {
              item.pcpId && idSav.push(item.pcpId);
              params.pcpIdList = idSav.join(`,`);
              params.poId = this.$store.state.contraDelData.cgCon.poId;
              params.version = this.$store.state.contraDelData.cgCon.version;
            }
            if (idSav.length) {
              Cmange.delLj(params)
                .then(res => {
                  this.deleIndex(e, list);
                  this.$openSuccess(res.message);
                })
                .catch();
            } else {
              this.deleIndex(e, list);
            }
          }
        })
        .catch();
    },
    //删除方法
    deleIndex(e, list) {
      for (const get of e) {
        let del = list.findIndex(item => {
          return item.one == get.one && item.pcpId == get.pcpId;
        });
        list.splice(del, 1);
      }
    },
    //运输信息表格选择
    ysxxhandleChange(e) {
      this.selecYsxx = e;
    },
    ///运输信息创建数据
    ysxxaddList() {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        rowno: (this.tableDataYsxx.length + 1) * 10,
        leaveTransferMode: ``, //出厂运输方式
        transferTarget: ``, //目的地
        transferPlanMan: ``, //运输安排人（供应商安排
        transferExcutor: ``, //承运人（车队
        transferExcutorTel: ``, //承运人联系方式
        transferNote: `` //备注
      };
      let newTbale = [];
      newTbale.unshift(data);
      this.tableDataYsxx = newTbale.concat(this.tableDataYsxx);
    }
  },

};
</script>

<style lang="scss">
</style>
