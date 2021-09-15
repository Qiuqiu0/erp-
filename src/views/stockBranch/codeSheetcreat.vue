<template>
  <div id="codesheetcreat" class="content-div2">
    <!-- 按钮 -->
    <div class="button-div button-div-query auto-sibling">
      <el-button @click="savebtn" v-show="operation" icon="el-icon-suitcase"
        >保存</el-button
      >
      <el-button @click="cancelbtn" v-show="operation" icon="el-icon-close"
        >取消</el-button
      >
      <el-button @click="cancelbtn" v-show="!operation" icon="el-icon-back"
        >返回</el-button
      >
    </div>
    <div>
      <el-tabs v-model="activeName" type="card">
        <!-- 用户管理 -->
        <el-tab-pane label="基本信息" name="first">
          <div class="index-div3">
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>公司</label>
              <el-input
                v-model="companyName.companyName"
                class="el-inputs"
                :class="errorKey.includes('companyName') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="componyTip"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>部门</label>
              <el-input
                v-model="branchName.branchName"
                class="el-inputs"
                :class="errorKey.includes('branchName') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              >
              </el-input>
              <span class="comicon" @click="departmentTip"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>业务员</label>
              <el-input
                v-model="staffName.empName"
                class="el-inputs"
                :class="errorKey.includes('staffName') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              >
              </el-input>
              <span class="comicon" @click="staffTip"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>客户</label>
              <el-input
                v-model="creditGroupInfo.creditGroupName"
                class="el-inputs"
                :class="errorKey.includes('creditGroupInfo') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="creditGroupPopup">
                <i class="el-icon-search"></i>
              </span>
            </el-col>

            <el-col :span="5" class="el-col">
              <label>码单号</label>
              <el-input
                v-model="dockSoNo"
                class="el-inputs"
                placeholder="保存后自动生成"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>外部码单号</label>
              <el-input
                v-model="dockExtNo"
                class="el-inputs"
                :placeholder="this.types==='look'?'':'请选择'"
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>车号</label>
              <el-input
                v-model="carNo"
                class="el-inputs"
                :placeholder="this.types==='look'?'':'请选择'"
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>船号</label>
              <el-input
                v-model="shipNo"
                class="el-inputs"
                :placeholder="this.types==='look'?'':'请选择'"
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>船名</label>
              <el-input
                v-model="shipName"
                class="el-inputs"
                :class="errorKey.includes('shipName') ? 'inputRed' : ''"
                placeholder="请输入"
                :disabled="!operation"
              ></el-input>
            </el-col>

            <el-col :span="5" class="el-col">
              <label>发货数量</label>
              <el-input
                v-model="sendQty"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>发货金额</label>
              <el-input
                v-model="sendAmt"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col choosedate   el-col-required">
              <label><span style="color:red">*</span>发货日期</label>
              <el-date-picker
                v-model="outtime"
                :class="errorKey.includes('outtime') ? 'inputRed' : ''"
                type="date"
                placeholder="选择日期"
                :disabled="!operation"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>仓库</label>
              <el-input
                v-model="warehouseName.warehouseName"
                size="small"
                class="el-inputs"
                :class="errorKey.includes('warehouseName') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              >
              </el-input>
              <span class="comicon" @click="warehouseTips"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>状态</label>
              <el-select
                v-model="mytype"
                placeholder="请选择"
                class="el-select"
                disabled
              >
                <el-option
                  v-for="item in mytypearr"
                  :key="item.dict_code"
                  :label="item.dict_value"
                  :value="item.dict_code"
                >
                </el-option>
              </el-select>
            </el-col>

            <el-col :span="24" class="el-col-textarea">
              <label style="width:6.4%;vertical-align:8px">备注</label>
              <el-input
                v-model="remark"
                autosize
                class="el-textarea"
                :placeholder="this.types==='look'?'':'请选择'"
                size="small"
                type="textarea"
                :disabled="!operation"
              ></el-input>
            </el-col>
          </div>
          <!-- 表格 -->
          <div class="button-div">
            <el-button @click="bankadd" icon="el-icon-plus" v-show="operation">增加</el-button>
            <el-button @click="bankreduce" icon="el-icon-minus" v-show="operation">删除</el-button>
            <!-- <el-button style="width:auto" icon="el-icon-upload2"
              v-show="operation">导入模板</el-button
            > -->
          </div>
          <div>
            <el-table
              max-height="280"
              :data="bankmsg"
              border
              style="width: 100%"
              @selection-change="bankChange"
              @row-dblclick="bankclick"
              @select-all="dialogChecks"
              @select="dialogChecks"
              ref="multipleTables"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column label="行号" prop="rowno" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="物料编号"
                prop="goodsCode"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input
                      v-model="scope.row.goodsCode"
                      size="mini"
                      class="el-inputs"
                      placeholder="请选择"
                      disabled
                      style="margin-bottom:2px"
                    >
                    </el-input>
                    <span class="comicon2" @click="matterTips(scope.$index)"
                      ><i class="el-icon-search"></i
                    ></span>
                  </div>
                  <div v-else>
                    {{ scope.row.goodsCode }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="物料名称"
                width="130"
                prop="goodsName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="物料大类"
                prop="goodsCategoryName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="物料规格"
                prop="goodsSpec"
                show-overflow-tooltip
              >
              </el-table-column>

              <!-- <el-table-column
                label="库存数量"
                prop="canSendQty"
                show-overflow-tooltip
              >
              </el-table-column> -->

              <el-table-column
                label="基础单位"
                prop="itemUnitName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="发货数量"
                prop="itemQty"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.itemQty"
                    placeholder=""
                    v-if="scope.row.edit"
                    :oninput="
                      (scope.row.itemQty = $filterPriceNum(
                        scope.row.itemQty,
                        4
                      ))
                    "
                    @change="changerksl(scope.$index)"
                  >
                  </el-input>
                  <span v-else>{{ scope.row.itemQty }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="第二单位"
                prop="secUnitName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="第二数量"
                prop="secQty"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.secQty"
                    placeholder=""
                    v-if="scope.row.edit"
                    :oninput="
                      (scope.row.secQty = $filterPriceNum(scope.row.secQty, 4))
                    "
                  >
                  </el-input>
                  <span v-else>{{ scope.row.secQty }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="含税单价"
                prop="originPrice"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.originPrice"
                    placeholder=""
                    v-if="scope.row.edit"
                    :oninput="
                      (scope.row.originPrice = $filterPriceNum(
                        scope.row.originPrice,
                        6
                      ))
                    "
                    @change="changecbdj(scope.$index)"
                  >
                  </el-input>
                  <span v-else>{{ scope.row.originPrice }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="含税金额"
                prop="originAmt"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.originAmt"
                    placeholder=""
                    v-if="scope.row.edit"
                    :oninput="
                      (scope.row.originAmt = $filterPriceNum(
                        scope.row.originAmt,
                        2
                      ))
                    "
                    @change="changecbje(scope.$index)"
                  >
                  </el-input>
                  <span v-else>{{ scope.row.originAmt }}</span>
                </template>
              </el-table-column>
              <el-table-column label="备注" prop="remark" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.remark"
                    placeholder=""
                    v-if="scope.row.edit"
                  >
                  </el-input>
                  <span v-else>{{ scope.row.remark }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <!-- 系统信息 -->
        <el-tab-pane label="系统信息" name="third" style="height:260px">
          <div class="input-div" id="xtridate">
            <el-col :span="5" class="el-col">
              <label>创建日期</label>
              <el-date-picker
                v-model="creattime1"
                type="date"
                placeholder="选择日期"
                :editable="false"
                disabled
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>创建人</label>
              <el-input
                v-model="creatman1"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>修改日期</label>
              <el-date-picker
                v-model="creattime2"
                type="date"
                placeholder="选择日期"
                :editable="false"
                disabled
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>修改人</label>
              <el-input
                v-model="creatman2"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-divider></el-divider>
    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
      :ztz="ztz"
      :tipShow="componyShow"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    >
    </compony-select>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :departztz="departztz"
      :data="companyName"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    >
    </department-select>
    <!-- 选择员工弹窗 -->
    <staff-select
      v-if="staffShow"
      :tipShow="staffShow"
      :data="staffsName"
      @staffCancle="staffCancle"
      @staffSure="staffSure"
    >
    </staff-select>
    <!--信用账户组弹窗-->
    <creditGroup-select
      :isShow="creditGroupShow"
      :isInactive="0"
      @callback="creditGroupSelectData"
    ></creditGroup-select>
    <!--选择仓库-->
    <warehouse-select
      v-if="warehouseShow"
      :tipShow="warehouseShow"
      :isInactive="0"
      @warehouseCancle="warehouseCancle"
      @warehouseSure="warehouseSure"
    >
    </warehouse-select>
    <!--选择物料号-->
    <matter-select
      v-if="matterShow"
      :tipShow="matterShow"
      @matterCancle="matterCancle"
      @matterSure="matterSure"
    >
    </matter-select>
  </div>
</template>

<script>
import {
  wareSave,
  wareSaves,
  getInformation,
  reducemsg,
  kcnumQuery,
  getMylxs
} from "@/api/stockBranch/codesheetcreat.js";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import creditGroupSelect from "@/components/creditGroupSelect"; //客户
import warehouseSelect from "@/components/warehouseSelect.vue"; //仓库组件
import matterSelect from "@/components/matterSelect.vue"; //物料组件
export default {
  name: "codeSheetcreat",
  props: {},
  data() {
    return {
      errorKey: [],
      mytype: "", //状态
      mytypearr: [], //状态下拉选择框
      departztz: 0,
      ztz: 0,
      staffsName: {},
      operation: true, //记录是否是查看状态
      opres: true, //记录是否是新增状态
      version: "", //记录版本号
      types: "", //记录操作
      activeName: "first", //tab切换
      msgid: "", //记录数据id
      comdm: "",
      componyShow: false, //银行弹窗
      companyName: ``, //公司
      branchName: ``, //部门
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      staffName: ``, //员工
      creditGroupShow: false, //是否显示信用账户组弹窗
      creditGroupInfo: "", //客户
      warehouseName: "", //仓库
      warehouseShow: false, //仓库弹窗
      dockSoNo: "", // 码单号
      dockExtNo: "", // 外部码单号
      sendQty: "", //发货数量
      sendAmt: "", //发货金额
      outtime: "", //发货日期
      carNo: "", // 车码
      shipNo: "", // 船码
      shipName: "", // 船名
      remark: "", //备注
      creattime1: "", //创建日期
      creattime2: "", //修改日期
      creatman1: "", //创建人
      creatman2: "", //修改人
      bankmsg: [], //表格信息
      matterShow: false, //物料弹窗
      mattermsg: "", //物料弹窗数据
      matterindex: "", //物料弹框记录索引
      bankreduces: [], //表格选择数据
      bankindex: "" //选择数据的索引
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.types = this.$route.query.data;
    this.msgid = this.$route.query.msgid;
    this.version = this.$route.query.version;
    this.opres = this.types === "creat" ? false : true;
    this.operation = this.types === "look" ? false : true;
    if (this.opres) {
      //如果是查看和修改状态 加载数据
      this.getmoremsg();
    }
    this.getzt();
  },
  watch: {},
  methods: {
    getzt() {
      getMylxs({ dictNo: 1096 }).then(res => {
        this.mytypearr = res.data;
        if (this.types === "creat") {
          this.mytype = res.data[0].dict_code;
        }
      });
    },
    getmoremsg() {
      getInformation({
        dockerSoId: this.msgid
      }).then(res => {
        if (res.code === "success") {
          this.bankmsg = res.data.odDockSoItems;
          this.getRowno();
          this.companyName = {
            companyName: res.data.companyName,
            companyCode: res.data.companyCode
          };
          this.branchName = {
            branchCode: res.data.orgCode,
            branchName: res.data.orgName
          };
          this.staffName = {
            empName: res.data.bizPersonName,
            empCode: res.data.bizPersonCode
          };
          this.warehouseName = {
            warehouseCode: res.data.warehouseCode,
            warehouseName: res.data.warehouseName
          };
          this.creditGroupInfo = {
            creditGroupName: res.data.custName,
            creditGroupCode: res.data.custCode
          };
          this.dockSoNo = res.data.dockSoNo;
          this.dockExtNo = res.data.dockExtNo;
          this.carNo = res.data.carNo;
          this.shipNo = res.data.shipNo;
          this.shipName = res.data.shipName;
          this.sendQty = res.data.sendQty;
          this.sendAmt = res.data.sendAmt;
          this.remark = res.data.remark;
          this.creattime1 = this.$timeFun(res.data.createdTime, true);
          this.creatman1 = res.data.createdName;
          this.creattime2 = this.$timeFun(res.data.updatedTime, true);
          this.creatman2 = res.data.updatedName;
          this.outtime = res.data.sendDate;
          this.mytype = String(res.data.dockStatus);
        }
      });
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyName = e;
      this.branchName = "";
    },
    //公司弹窗打开
    componyTip() {
      if (this.opres) {
        return;
      }
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //部门弹窗打开
    departmentTip() {
      if (this.opres) {
        return;
      }
      // if (this.companyName == ``) {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.departmentShow = true;
    },
    //部门弹窗关闭
    departmentCancle() {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure(e) {
      this.departmentShow = false;
      this.branchName = e;
    },
    //部门弹窗打开
    manTip() {
      this.manShow = true;
    },
    //部门弹窗关闭
    manCancle() {
      this.manShow = false;
    },
    //部门弹窗确定获取数据
    manSure(e) {
      this.manShow = false;
      this.manName = e;
    },
    //员工弹窗打开
    staffTip() {
      if (!this.operation) {
        return;
      }
      this.staffShow = true;
    },
    //员工弹窗关闭
    staffCancle() {
      this.staffShow = false;
    },
    //员工弹窗确定获取数据
    staffSure(e) {
      this.staffShow = false;
      this.staffName = e;
    },
    //信用账户组弹窗
    creditGroupPopup() {
      if (!this.operation) {
        return;
      }
      this.creditGroupShow = true;
    },
    //信用账户组弹窗回调
    creditGroupSelectData(res) {
      if (res) {
        this.creditGroupInfo = res;
      }
      this.creditGroupShow = false;
    },
    //仓库弹窗
    warehouseTips() {
      if (this.opres) {
        return;
      }
      this.warehouseShow = true;
    },
    //仓库弹窗关闭
    warehouseCancle() {
      this.warehouseShow = false;
    },
    //仓库弹窗确定获取数据
    warehouseSure(e) {
      this.warehouseShow = false;
      this.warehouseName = e;
      // if (this.bankmsg.length > 0) {
      //   this.bankmsg.forEach((i, k) => {
      //     kcnumQuery({
      //       skuCode: i.goodsCode,
      //       warehouseCode: this.warehouseName.warehouseCode
      //     }).then(res => {
      //       if (res.code === "success") {
      //         if (!res.data) {
      //           this.bankmsg[k].canSendQty = 0;
      //         } else {
      //           this.bankmsg[k].canSendQty = res.data;
      //         }
      //         i.originPrice = 0;
      //         i.originAmt = 0;
      //         i.secQty = 0;
      //         i.itemQty = 0;
      //       }
      //     });
      //   });
      // }
      // this.sendQty = 0;
      // this.sendAmt = 0;
    },

    //物料号弹窗
    matterTips(e) {
      this.matterShow = true;
      this.matterindex = e;
    },
    //物料号弹窗关闭
    matterCancle() {
      this.matterShow = false;
      this.matterindex = "";
      this.mattermsg = "";
    },
    //物料号确定获取数据
    matterSure(e) {
      this.matterShow = false;
      let arraymsg = [];
      this.bankmsg.forEach(i => {
        arraymsg.push(i.goodsCode);
      });
      if (arraymsg.indexOf(e.skuCode) === -1) {
        this.mattermsg = e;
        this.batchmsg = e;
        (this.bankmsg[this.matterindex].originPrice = 0),
          (this.bankmsg[this.matterindex].originAmt = 0),
          // this.bankmsg[this.matterindex].secQty = 0,
          (this.bankmsg[this.matterindex].itemQty = 0),
          (this.bankmsg[this.matterindex].goodsCode = this.mattermsg.skuCode); //物料编码赋值
        this.bankmsg[this.matterindex].goodsName = this.mattermsg.skuName; //物料名称赋值
        this.bankmsg[
          this.matterindex
        ].goodsCat = this.mattermsg.categoryCode; //物料大类赋值
         this.bankmsg[
          this.matterindex
        ].goodsCategoryName = this.mattermsg.categoryShowName; //物料大类赋值
        this.bankmsg[this.matterindex].goodsSpec = this.mattermsg.propertyInfo; //物料规格赋值
        this.bankmsg[this.matterindex].secUnitName = this.mattermsg.secUnitName; //第二单位赋值
        this.bankmsg[this.matterindex].itemUnitName = this.mattermsg.firstUnitName; //基础单位赋值
        this.bankmsg[this.matterindex].taxRate = this.mattermsg.vatRate;
        this.getrksl();
        this.getrkje();
      } else {
        this.$openWarning("该明细已存在，请勿重复添加");
        return;
      }
      // kcnumQuery({
      //   skuCode: this.mattermsg.skuCode,
      //   warehouseCode: this.warehouseName.warehouseCode
      // }).then(res => {
      //   if (res.code === "success") {
      //     if (!res.data) {
      //       this.bankmsg[this.matterindex].canSendQty = 0;
      //     } else {
      //       this.bankmsg[this.matterindex].canSendQty = res.data;
      //     }
      //     this.matterindex = "";
      //     this.mattermsg = "";
      //   }
      // });
    },
    bankChange(e) {
      //表格选择
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    bankclick(e) {
      //表格双击
      if (!this.operation) {
        return;
      }
      let index = this.bankmsg.indexOf(e);
      this.bankmsg.forEach(item => {
        item.edit = false;
      });
      this.bankmsg[index].edit = true;
      this.$set(this.bankmsg, index, e);
    },
    dialogChecks(selection, row) {
      //表格选择
      if (selection.length === 0) {
        // 判断selection是否有值存在
        this.bankreduces = [];
        return;
      }
      this.bankreduces = row;
      this.$refs.multipleTables.clearSelection();
      if (row) {
        this.selectioned = row;
        this.index = this.bankmsg.indexOf(row);
        this.bankindex = this.index;
        this.$refs.multipleTables.toggleRowSelection(row, true);
      }
    },
    bankadd() {
      //表格增加
      if (!this.operation) {
        return;
      }
      // if (this.warehouseName === "") {
      //   this.$openWarning("请先选择仓库");
      //   return;
      // }
      this.bankmsg.forEach(item => {
        item.edit = false;
      });
      let obj = {
        goodsCode: "",
        goodsName: "",
        goodsCat: "",
        goodsCategoryName:"",
        goodsSpec: "",
        // canSendQty: "",
        itemUnitName: "",
        itemQty: 0,
        secUnitName: "",
        secQty: 0,
        originPrice: 0,
        originAmt: 0,
        remark: "",
        taxRate: "",
        edit: true
      };
      let newtable = [];
      newtable.unshift(obj);
      this.bankmsg = newtable.concat(this.bankmsg);
      this.getRowno();
      this.bankreduces = [];
    },
    bankreduce() {
      //表格删除
      if (!this.operation) {
        return;
      }
      if (this.bankreduces.length === 0) {
        this.$openWarning("请先选择一条数据");
        return;
      }
      if (this.bankreduces.dockItemsId === undefined) {
        this.$openSuccess("删除成功");
        this.bankmsg.splice(this.bankindex, 1);
        this.getRowno();
        this.bankreduces = [];
        this.getrksl();
        this.getrkje();
      } else {
        this.$confirm("是否确定删除继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          reducemsg({
            version: this.bankreduces.version,
            dockItemsId: this.bankreduces.dockItemsId,
            itVersion: this.version
          }).then(res => {
            if (res.code === "success") {
              this.$openSuccess(`${res.message}`);
              this.bankmsg.splice(this.bankindex, 1);
              this.getRowno();
              this.bankreduces = [];
              this.getrksl();
              this.getrkje();
            }
          });
        });
      }
    },

    getrksl() {
      //计算发货数量总汇
      let num = 0;
      let skbbankmsg = JSON.parse(JSON.stringify(this.bankmsg));
      skbbankmsg.forEach(i => {
        if (i.itemQty === "") {
          i.itemQty = 0;
        }
        num += parseFloat(i.itemQty);
      });
      this.sendQty = this.$toFixed(num, 4);
    },
    getrkje() {
      //计算发货金额总汇
      let num = 0;
      let skbbankmsg = JSON.parse(JSON.stringify(this.bankmsg));
      skbbankmsg.forEach(i => {
        if (i.originAmt === "") {
          i.originAmt = 0;
        }
        num += parseFloat(i.originAmt);
      });
      this.sendAmt = this.$toFixed(num, 2);
    },
    changerksl(e) {
      //入库数量发生改变
      if (this.bankmsg[e].goodsCode === "") {
        this.bankmsg[e].itemQty = 0;
        this.$openWarning("请先选择物料信息");
        return;
      }
      // if (
      //   Number(this.bankmsg[e].itemQty) > Number(this.bankmsg[e].canSendQty)
      // ) {
      //   this.bankmsg[e].itemQty = this.bankmsg[e].canSendQty;
      //   this.$openWarning("发货数量不能大于存库数量");
      // }
      if (
        this.bankmsg[e].originPrice === "" &&
        this.bankmsg[e].originAmt != ""
      ) {
        this.bankmsg[e].originPrice =
          this.bankmsg[e].originAmt / this.bankmsg[e].itemQty;
        this.bankmsg[e].originPrice = this.$toFixed(
          this.bankmsg[e].originPrice,
          6
        );
      } else {
        this.bankmsg[e].originAmt =
          this.bankmsg[e].itemQty * this.bankmsg[e].originPrice;
        this.bankmsg[e].originAmt = this.$toFixed(this.bankmsg[e].originAmt, 2);
      }
      this.getrksl();
      this.getrkje();
    },
    changecbdj(e) {
      //成本单价发生改变
      if (
        parseFloat(this.bankmsg[e].itemQty) === 0 ||
        this.bankmsg[e].itemQty === ""
      ) {
        this.$openWarning("请先填写发货数量");
        this.bankmsg[e].originPrice = 0;
        return;
      } else {
        this.bankmsg[e].originAmt =
          this.bankmsg[e].itemQty * this.bankmsg[e].originPrice;
        this.bankmsg[e].originAmt = this.$toFixed(this.bankmsg[e].originAmt, 2);
      }
      this.getrkje();
    },
    changecbje(e) {
      //成本金额发生改变
      if (
        parseFloat(this.bankmsg[e].itemQty) === 0 ||
        this.bankmsg[e].itemQty === ""
      ) {
        this.$openWarning("请先填写发货数量");
        this.bankmsg[e].originAmt = 0;
        return;
      } else {
        this.bankmsg[e].originPrice =
          this.bankmsg[e].originAmt / this.bankmsg[e].itemQty;
        this.bankmsg[e].originPrice = this.$toFixed(
          this.bankmsg[e].originPrice,
          6
        );
      }
      this.getrkje();
    },
    savemsg(param) {
      //保存数据
      wareSave(param).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({
            name: "codeSheet"
          });
        }
      });
    },
    savemsgs(param) {
      //修改提交数据
      wareSaves(param).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({
            name: "codeSheet"
          });
        }
      });
    },
    savebtn() {
      //保存新增
      this.errorKey = [];
      let keyArr = ['companyName', 'branchName', 'staffName', 'creditGroupInfo', 'shipName', 'outtime', 'warehouseName'];
      keyArr.forEach(item => {
        if(!this[item] || (item == 'outtime' && this[item] === null)) {
          this.errorKey.push(item);
        }
      })
      if(this.errorKey.length > 0) {
        this.$openWarning("请将必填项补充完整！");
        return false;
      }
      if (this.bankmsg.length === 0) {
        this.$openWarning("请填写物料信息");
        return;
      }
      let goodNum = []; //记录物料号码
      let fhNum = []; //记录发货数量
      let fhMoney = []; //记录发货单价
      let kbbankmsg = JSON.parse(JSON.stringify(this.bankmsg));
      kbbankmsg.forEach(i => {
        goodNum.push(i.goodsCode);
        fhNum.push(i.itemQty);
        fhMoney.push(i.originPrice);
      });
      if (goodNum.indexOf("") != -1) {
        this.$openWarning("物料编码不能为空");
        return;
      }
      if (
        fhNum.indexOf("") != -1 ||
        fhNum.indexOf(0) != -1 ||
        fhNum.indexOf("0") != -1
      ) {
        this.$openWarning("发货数量不正确");
        return;
      }
      if (
        fhMoney.indexOf("") != -1 ||
        fhMoney.indexOf(0) != -1 ||
        fhMoney.indexOf("0") != -1
      ) {
        this.$openWarning("发货单价或发货金额不正确");
        return;
      }
      let param = {
        companyCode: this.companyName.companyCode,
        companyName: this.companyName.companyName,
        companyId: this.companyName.companyId,
        orgCode: this.branchName.branchCode,
        orgName: this.branchName.branchName,
        orgId: this.branchName.branchId,
        bizPersonName: this.staffName.empName,
        bizPersonCode: this.staffName.empCode,
        custName: this.creditGroupInfo.creditGroupName,
        custCode: this.creditGroupInfo.creditGroupCode,
        warehouseCode: this.warehouseName.warehouseCode,
        warehouseName: this.warehouseName.warehouseName,
        dockExtNo: this.dockExtNo,
        carNo: this.carNo,
        shipNo: this.shipNo,
        shipName: this.shipName,
        sendQty: this.sendQty,
        sendAmt: this.sendAmt,
        sendDate: this.outtime,
        remark: this.remark,
        odDockSoItems: this.bankmsg,
        dockSoNo: this.dockSoNo
      };

      if (this.msgid === undefined) {
        this.savemsg(param);
      } else {
        param.version = this.version;
        param.dockerSoId = this.msgid;
        this.savemsgs(param);
      }
    },
    cancelbtn() {
      //取消新增
      this.$router.push({
        name: "codeSheet"
      });
    },
    getRowno() {
      //行号排序
      this.bankmsg.forEach((i, k) => {
        i.rowno = (k + 1) * 10;
      });
    }
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    creditGroupSelect,
    warehouseSelect,
    matterSelect
  }
};
</script>

<style lang="scss">
#codesheetcreat {
  .el-select .el-input__inner,
  .el-input .el-input__inner {
    font-size: 12px !important;
  }
  .el-select:hover .el-input__inner {
    border-color: #97999e !important;
  }
  .el-input--small .el-input__inner {
    border-color: #97999e !important;
  }
  textarea {
    border-color: #909399 !important;
  }

  .el-input__icon {
    height: 24px;
    line-height: 24px;
  }
  .el-textarea__inner {
    width: 100% !important;
    height: 30px!important;
  }
}
</style>
