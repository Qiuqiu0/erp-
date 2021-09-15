<template>
  <div class="tabSecond content-div2 contract_css_link">
    <div class="input-div input-div-bor">
      <!-- <div class="table_title">运输信息</div> -->
      <div>
        <el-col :span="5" class="el-col">
          <label class="">最迟交期</label>
          <el-date-picker
            v-model="deliveryCutoffDate"
            type="date"
            placeholder=""
          >
          </el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>价格条款</label>
          <el-select v-model="priceTem" placeholder="">
            <el-option
              v-for="item in jgtkList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>运输方式</label>
          <el-select v-model="transMode" placeholder="">
            <el-option
              v-for="item in ysfsList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>装卸时间</label>
          <el-select v-model="loadTimeType" placeholder="">
            <el-option
              v-for="item in zxsjList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>船运方式</label>
          <el-select v-model="shipMode" placeholder="">
            <el-option
              v-for="item in cyfsList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col texcen">
          <!-- <el-radio v-model="radio" label="isTransfered">转船</el-radio>
          <el-radio v-model="radio" label="isBatched">分批</el-radio> -->
          <el-checkbox v-model="isTransfered">转船</el-checkbox>
          <el-checkbox v-model="isBatched">分批</el-checkbox>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>装货港</label>
          <el-input
            v-model="loadingPort"
            class="el-inputs"
            placeholder=""
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>卸货港</label>
          <el-input
            v-model="unloadingPort"
            class="el-inputs"
            placeholder=""
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>目的地</label>
          <el-input
            v-model="destination"
            class="el-inputs"
            placeholder=""
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>船名</label>
          <el-input
            v-model="shipName"
            class="el-inputs"
            placeholder=""
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>船舶识别号</label>
          <el-input
            v-model="shipCode"
            class="el-inputs"
            placeholder=""
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>送货地址</label>
          <el-input
            v-model="receiverAddress"
            class="el-inputs"
            placeholder=""
          ></el-input>
        </el-col>
      </div>
    </div>
    <!-- 搜索 -->
    <!-- 运输信息 -->
    <div class="input-div input-div-bor bortop0">
      <div class="flex_center">
        <div class="button-div">
          <el-button
            icon="el-icon-plus"
            class="query-button"
            @click="ysxxaddList"
            >创建</el-button
          >
          <el-button
            icon="el-icon-delete"
            @click="setUp(selecYsxx, tableDataYsxx, 0)"
            >删除</el-button
          >
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
          <el-table-column
            label="序号"
            type="index"
            width="55"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="paritiesDate"
            label="出厂运输方式"
          >
            <template slot-scope="scope">
              <div v-for="item in ysfsList" :key="item.dict_code">
                <span v-if="item.dict_code == scope.row.leaveTransferMode">{{
                  item.dict_value
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferTarget"
            label="目的地"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferPlanMan"
            label="运输安排人（供应商安排/仓储物流中心安排）"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferExcutor"
            label="承运人（车队/船队）"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferExcutorTel"
            label="承运人联系方式"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferNote"
            label="备注"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 交货地点 -->
    <div class="input-div input-div-bor bortop0">
      <div class="flex_center">
        <div class="button-div">
          <el-button icon="el-icon-plus" class="query-button" @click="jhaddList"
            >创建</el-button
          >
          <el-button
            icon="el-icon-minus"
            @click="setUp(selectjh, tableDatajh, 1)"
            >删除</el-button
          >
        </div>
      </div>
      <div class="">
        <el-table
          border
          center
          :data="tableDatajh"
          class="el-table"
          ref="multipleTable"
          @selection-change="jhhandleChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <!-- <el-table-column
            label="序号"
            prop="rowno"
            width="55"
            show-overflow-tooltip
          >
          </el-table-column> -->
          <el-table-column
            label="序号"
            type="index"
            width="55"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="仓库" prop="warehoseCode" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="deliveryTarget"
            label="交货地点"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="deliveryTargetDetail"
            label="详细地址"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 交货地点 -->
    <!-- 港口 -->
    <Arr-select
      v-if="arrShow"
      :tipShow="arrShow"
      @ArrialPortCancle="ArrialPortCancle"
      @ArrialPortSure="ArrialPortSure"
    ></Arr-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArrSelect from "@/components/ArrivalPort.vue";

import Bmange from "@/api/contractMange/bmange";
import BAmange from "@/api/contractMange/bAmange";
import "@/assets/css/contract.scss";
export default {
  name: "tabSecond",
  data() {
    return {
      soContractId: ``,
      soContractNo: ``,
      version: ``,
      arrShow: false, //港口
      //运输信息
      deliveryCutoffDate: ``, //最迟交货日期
      priceTem: ``, //价格条款
      jgtkList: [], //条款列表
      transMode: ``, //运输方式
      ysfsList: [], //运输方式列表
      loadTimeType: ``, //装卸时间
      zxsjList: [], //装卸时间列表
      shipMode: ``, //船运方式
      cyfsList: [], //方式列表
      radio: ``, //转船分批
      isTransfered: false, //是否转船
      isBatched: false, //是否分批
      portTypr: ``, //1装货 0卸货
      loadingPort: ``, //装货港
      unloadingPort: ``, //卸货港
      destination: ``, //目的地
      shipName: ``, //船名
      shipCode: ``, //船舶识别号
      receiverAddress: ``, //送货地址
      tableDataYsxx: [], //运输信息
      tableDatajh: [], //交货表格
      scopeArr: {}, // 交货表格数据
      selectjh: [], //交货表格选中项
      orgList: [], //业务币含税金额列表
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
      show: true
    };
  },
  components: {
    ArrSelect
  },
  created() {
    this.jgtk();
    this.zxsj();
    this.cyfs();
    this.ysfs();
    //获取信息
    if (this.$route.query.isChange) {
      this.getDetailHis();
    } else {
      this.getDetail();
    }
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    getDetail() {
      //拆分式不调用
      if (this.$route.query.children) return false;
      let params = {
        soContractId: this.$route.query.id,
        pageSize: 999
      };
      Bmange.getYsxx(params)
        .then(res => {
          let red = res.data;
          this.version = red.version;
          this.soContractNo = red.soContractNo; //合同号
          this.soContractId = red.soContractId; //合同id
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
      //路径表
      Bmange.getLj(params)
        .then(res => {
          this.tableDataYsxx = res.data;
        })
        .catch();
      //交货地点
      Bmange.getJh(params)
        .then(res => {
          this.tableDatajh = res.data;
        })
        .catch();
    },
    getDetailHis() {
      //拆分式不调用
      if (this.$route.query.children) return false;
      let params = {
        soContractIdArchive: this.$route.query.id,
        pageSize: 999
      };
      BAmange.getYsxx(params)
        .then(res => {
          let red = res.data;
          // this.version = red.version;
          this.soContractNo = red.soContractNo; //合同号
          this.soContractId = red.soContractId; //合同id
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
      //路径表
      BAmange.getLj(params)
        .then(res => {
          this.tableDataYsxx = res.data;
        })
        .catch();
      //交货地点
      BAmange.getJh(params)
        .then(res => {
          this.tableDatajh = res.data;
        })
        .catch();
    },
    to() {
      let data = {
        //供应商合同运输信息
        odSoContractTransferInfo: {
          deliveryCutoffDate: this.deliveryCutoffDate, //最迟交货日期
          priceTem: this.priceTem, //价格条款
          transMode: this.transMode, //运输方式
          loadTimeType: this.loadTimeType, //装卸时间
          shipMode: this.shipMode, //船运方式
          // isTransfered: this.radio == "isTransfered" ? 1 : 0, //是否转船
          // isBatched: this.radio == "isBatched" ? 1 : 0, //是否分批
          isTransfered: this.isTransfered ? 1 : 0, // this.radio == "isTransfered" ? 1 : 0, //是否转船
          isBatched: this.isBatched ? 1 : 0, //this.radio == "isBatched" ? 1 : 0, //是否分批
          loadingPort: this.loadingPort, //装货港
          unloadingPort: this.unloadingPort, //卸货港
          destination: this.destination, //目的地
          shipName: this.shipName, //船名
          shipCode: this.shipCode, //船舶识别号
          receiverAddress: this.receiverAddress //送货地址
        },
        odSoCtiPathsList: this.tableDataYsxx, //供应商合同运输路径
        odSoTransferTargetList: this.tableDatajh //交货地点
      };
      if (this.$route.query.id) {
        data.odSoContractTransferInfo.soContractNo = this.soContractNo;
        data.odSoContractTransferInfo.soContractId = this.soContractId;
        data.odSoContractTransferInfo.version = this.version;

        for (let item of this.tableDataYsxx) {
          item.soContractId = this.soContractId;
        }
        for (let item of this.tableDatajh) {
          item.soContractId = this.soContractId;
        }
      }
      this.$emit("get", data, 4);
    },
    //港口弹窗打开
    arrTip(e, scope) {
      this.portTypr = e;
      this.scopeArr = scope;
      this.arrShow = true;
    },
    //港口弹窗关闭
    ArrialPortCancle() {
      this.arrShow = false;
    },
    //港口弹窗确定获取数据
    ArrialPortSure(e) {
      this.arrShow = false;
      if (this.portTypr == 1) {
        this.loadingPort = e.portName;
      } else if (this.portTypr == 0) {
        this.unloadingPort = e.portName;
      } else {
        let index = this.scopeArr.$index;
        let tabOne = this.tableDatajh[index];
        tabOne.unloadingPort = e.portName;
        tabOne.deliveryTarget = e.portName;
        this.$set(this.tableDatajh, index, tabOne);
      }
    },
    //获取价格条款
    jgtk() {
      Bmange.jgtk()
        .then(res => {
          this.jgtkList = res.data;
        })
        .catch();
    },
    //获取装卸时间
    zxsj() {
      Bmange.zxsj()
        .then(res => {
          this.zxsjList = res.data;
        })
        .catch();
    },
    //获取运输方式
    ysfs() {
      Bmange.ysfs()
        .then(res => {
          this.ysfsList = res.data;
        })
        .catch();
    },
    //获取船运方式
    cyfs() {
      Bmange.cyfs()
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
          let idSav = []; //修改数据
          let idNo = []; //新建数据
          let params = {};
          for (const item of e) {
            switch (key) {
              case 0:
                item.scpId && idSav.push(item.scpId);
                params.scpIdList = idSav.join(`,`);
                break;
              case 1:
                item.targetId && idSav.push(item.targetId);
                params.targetIdList = idSav.join(`,`);
                break;
              default:
                break;
            }
          }
          if (idSav.length) {
            switch (key) {
              case 0:
                Bmange.delLj(params)
                  .then(res => {
                    this.deleIndex(e, list);
                    this.$openSuccess(res.message);
                  })
                  .catch();
                break;
              case 1:
                Bmange.delJh(params)
                  .then(res => {
                    this.deleIndex(e, list);
                    this.$openSuccess(res.message);
                  })
                  .catch();
                break;
              default:
                break;
            }
          } else {
            this.deleIndex(e, list);
          }
        })
        .catch();
    },
    //删除方法
    deleIndex(e, list) {
      for (const get of e) {
        let del = list.findIndex(item => {
          return (
            item.one == get.one ||
            item.scpId == get.scpId ||
            item.targetId == item.targetId
          );
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
    },
    //交货表格选择
    jhhandleChange(e) {
      this.selectjh = e;
    },
    ///交货创建数据
    jhaddList() {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        rowno: (this.tableDatajh.length + 1) * 10,
        deliveryTarget: ``,
        deliveryTargetDetail: ``,
        unloadingPort: ``
      };
      let newTbale = [];
      newTbale.unshift(data);
      this.tableDatajh = newTbale.concat(this.tableDatajh);
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
  }
};
</script>

<style lang="scss">
</style>
