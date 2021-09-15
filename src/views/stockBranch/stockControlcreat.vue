<template>
  <div class="content-div2" id="stockcontrolcreat">
    <!-- 按钮 -->
    <div class="button-div">
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
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- 基本信息 -->
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
              <label><span style="color:red">*</span>业务员</label>
              <el-input
                v-model="staffName.empName"
                class="el-inputs"
                :class="errorKey.includes('staffName') ? 'inputRed' : ''"
                :placeholder="this.types==='look'?'':'请选择'"
                disabled
              >
              </el-input>
              <span class="comicon" @click="staffTip"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>调拨单号</label>
              <el-input
                v-model="dbdh"
                class="el-inputs"
                placeholder="保存后自动生成"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>调拨单类型</label>
              <el-select
                clearable
                v-model="dbtype"
                placeholder="请选择"
                class="el-select"
                disabled
              >
                <el-option
                  v-for="item in dbtypearr"
                  :key="item.dict_code"
                  :label="item.dict_value"
                  :value="item.dict_code"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>调出部门</label>
              <el-input
                v-model="branchName.branchName"
                class="el-inputs"
                :class="errorKey.includes('branchName') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="departmentTip('out')"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>调入部门</label>
              <el-input
                v-model="branchName.branchName"
                class="el-inputs"
                :class="errorKey.includes('branchName') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              ></el-input>
              <!-- <span class="comicon"><i class="el-icon-search"></i></span> -->
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>调出仓库</label>
              <el-input
                v-model="warehouseNames.warehouseName"
                size="small"
                class="el-inputs"
                :class="errorKey.includes('warehouseName') || errorKey.includes('warehouseNames') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              >
              </el-input>
              <span class="comicon" @click="warehouseTips('out')"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>调入仓库</label>
              <el-input
                v-model="warehouseName.warehouseName"
                size="small"
                class="el-inputs"
                :class="errorKey.includes('warehouseName') || errorKey.includes('warehouseNames') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              >
              </el-input>
              <span class="comicon" @click="warehouseTips('come')"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-colc  el-col-required">
              <label><span style="color:red">*</span>业务币种</label>
              <el-input
                v-model="currency.currencyName"
                class="el-inputs"
                :class="errorKey.includes('currencyName') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              ></el-input>
              <!-- <span class="comicon" @click="coinTip"
                ><i class="el-icon-search"></i
              ></span> -->
            </el-col>
            <el-col :span="5" class="el-colc  el-col-required">
              <label><span style="color:red">*</span>本位币汇率</label>
              <el-input
                v-model="currencyRate"
                class="el-inputs"
                :class="errorKey.includes('currencyRate') ? 'inputRed' : ''"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>调拨数量</label>
              <el-input
                v-model="rksl"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>调拨金额</label>
              <el-input
                v-model="rkje"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>调拨单状态</label>
              <el-select
                clearable
                v-model="dbdtype"
                :class="errorKey.includes('dbdtype') ? 'inputRed' : ''"
                placeholder="请选择"
                class="el-select"
                disabled
              >
                <el-option
                  v-for="item in dbdtypearr"
                  :key="item.dict_code"
                  :label="item.dict_value"
                  :value="item.dict_code"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>移库时间</label>
              <el-date-picker
                class="el-input2"
                size="small"
                v-model="itDate"
                :class="errorKey.includes('itDate') ? 'inputRed' : ''"
                value-format="yyyy-MM-dd"
                @change="rksjchange"
                type="date"
                placeholder="请选择日期"
                :picker-options="pickerOptions"
                :disabled="!operation"
              >
              </el-date-picker>
            </el-col>
            <el-col v-show="!operation" :span="5" class="el-col">
              <label>凭证号</label>
              <el-input v-model="warrantCode"
                        class="el-inputs"
                        size="small"
                        disabled></el-input>
            </el-col>
            <el-col v-show="!operation" :span="5" class="el-col">
              <label>期间</label>
              <el-date-picker
                      type="month"
                      size="small"
                      v-model="warrantMonth"
                      disabled
                      value-format="yyyyMM"
                      >
              </el-date-picker>
            </el-col>
            <el-col :span="24" class="el-col-textarea">
              <label style="width:6.4%;vertical-align:8px">备注</label>
              <el-input
                v-model="rkbz"
                autosize
                class="el-textarea"
                size="small"
                type="textarea"
                :placeholder="this.types==='look'?'':'请输入'"
                :disabled="!operation"
              ></el-input>
            </el-col>
          </div>
          <!-- 表格 -->
          <div class="button-div">
            <el-button @click="bankadd" icon="el-icon-plus" v-show="operation">增加</el-button>
            <el-button @click="bankreduce" icon="el-icon-minus" v-show="operation">删除</el-button>
          </div>
          <div>
            <el-table
              :data="bankmsg"
              border
              center
              max-height="290"
              style="width: 100%"
              @selection-change="bankChange"
              @row-dblclick="bankclick"
              @select-all="dialogChecks"
              @select="dialogChecks"
              ref="multipleTables"
               :summary-method="getSummaries"
              show-summary
            >
              <el-table-column type="selection" width="55"> </el-table-column>
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
                label="规格"
                prop="goodsSpec"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="批次号"
                width="120"
                prop="batchCode"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input
                      size="small"
                      v-model="scope.row.batchCode"
                      disabled
                      placeholder="请选择"
                    >
                    </el-input
                    ><span class="comicon2" @click="alertkb(scope.$index)"
                      ><i class="el-icon-search"></i
                    ></span>
                  </div>
                  <span v-else>{{ scope.row.batchCode }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="捆包号"
                prop="packageCode"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="基础单位"
                prop="basicUnit"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="可用数量"
                prop="invQtyS"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="调拨数量"
                prop="transferQty"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.transferQty"
                    placeholder=""
                    :oninput="
                      (scope.row.transferQty = $filterPriceNum(
                        scope.row.transferQty,
                        4
                      ))
                    "
                    @change="changedbsl(scope.$index)"
                    v-if="scope.row.edit"
                  >
                  </el-input>
                  <span v-else>{{ scope.row.transferQty }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="第二单位"
                prop="secUnit"
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
                label="第二数量库存"
                width="100px"
                prop="secUnitQty"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="成本单价"
                prop="costPrice"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="成本金额"
                prop="costAmt"
                show-overflow-tooltip
              >
               <template slot-scope="scope">
                  <span>{{$numberToFixed(scope.row.costAmt, 2)}}</span>
              </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <!-- 打印与附件 -->
        <el-tab-pane label="打印及附件" name="second">
          <div class="el-table-div">
          <div class="button-div">
            <el-upload
              v-show="operation"
              class="upload-demo"
              ref="newupload"
              action="#"
              :before-upload="beforeUpload"
              :headers="uploadList.uploadHeaders"
              :multiple="false"
              :auto-upload="false"
              :on-remove="handleRemove"
              :limit="1"
              :file-list="uploadList.fileList"
            >
              <el-button
                slot="trigger"
                style="color:#3E3F42;"
                size="small"
                icon="el-icon-paperclip"
                type="button"
                >选取文件</el-button
              >
              <el-button
                style="margin-left: 10px;"
                size="small"
                class="addBut"
                icon="el-icon-upload"
                @click="submitUpload"
                >上传</el-button
              >
            </el-upload>
          </div>
          <el-table
            :data="uploadList.tableList"
            ref="table2"
            tooltip-effect="dark"
            border
            stripe
            style="width: 100%"
            @select-all="dialogCheckTable"
            @select="dialogCheckTable"
            @selection-change="handleChangeTableTable"
          >
            <el-table-column
              type="selection"
              width="45"
              align="center"
            ></el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column prop="fileOldName" label="文件名称">
            </el-table-column>
            <!-- <el-table-column prop="fileType" label="类型"> </el-table-column>
            <el-table-column prop="fileType" label="文档类型名称">
            </el-table-column>
            <el-table-column prop="fileType" label="签章情况">
            </el-table-column> -->
            <el-table-column prop="createdTime" label="上传时间">
            </el-table-column>
            <el-table-column prop="createdName" label="上传人"> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="download(scope.row)">下载</el-button>
                    <el-button
                    v-show="operation"
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="delFile(scope.$index,scope.row)">删除</el-button>
                    <!-- <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="download(scope.row)">预览</el-button>
                    <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="download(scope.row)">打印</el-button> -->
                </template>
            </el-table-column>
          </el-table>
        </div>
        </el-tab-pane>
        <!-- 系统信息 -->
        <el-tab-pane label="系统信息" name="third">
          <div class="input-div" id="xtridate">
            <el-col :span="5" class="el-col">
              <label>创建日期</label>
              <el-date-picker
                v-model="creattime1"
                type="date"
                placeholder="选择日期"
                disabled
                :editable="false"
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
                disabled
                :editable="false"
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
        <el-tab-pane v-show="!operation" label="流程详情"
                   name="lcxq">
            <div class="input-div input-div-bor bortop0">
                <v-exmineStatus :id="$route.query.msgid"></v-exmineStatus>
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
      :data="companyName"
      :departztz="departztz"
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
    <batch-number
      v-if="batchShow"
      :tipShow="batchShow"
      :data="batchmsg"
      @batchnumberCancle="batchnumberCancle"
      @batchnumberSure="batchnumberSure"
    ></batch-number>
    <!-- 选择币种弹窗 -->
    <!-- <coin-select
      v-if="coinShow"
      :tipShow="coinShow"
      @coinCancle="coinCancle"
      @coinSure="coinSure"
    ></coin-select> -->
  </div>
</template>

<script>
import { service, serviceJson } from "../../axios/index.js";
import {
  getMylx,
  comCurrency,
  wareSave,
  wareSaves,
  getInformation,
  reducemsg,
  getTimes
} from "@/api/stockBranch/stockcreat.js";
import calculation from "@/assets/js/calculation";
import componySelect from "@/components/componySelect.vue";
import uploadApi from "@/api/component";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import warehouseSelect from "@/components/warehouseSelect.vue"; //仓库组件
import matterSelect from "@/components/matterSelect.vue"; //物料组件
import batchNumber from "@/components/batchNumber.vue"; //批次组件
// import coinSelect from "@/components/coinSelect.vue"; //业务币种
import ExmineStatus from '@/components/exmineStatus'
export default {
  name: "stockControlcreat",
  props: {},
  data() {
    return {
      errorKey: [],
      departztz: 0,
      ztz: 0,
      itDate: "", //入库时间
      pickerOptions: "", //时间选择器的时间范围
      staffsName: {},
      types: "", //记录操作
      msgid: "", //记录数据id
      version: "", //记录带过来的版本号
      operation: true, //记录是否是查看状态
      opres: true, //记录是否是新增状态
      dbdh: "", //调拨单号
      dbdid: "", //调拨单id
      dbtype: "", //调拨单类型
      dbtypearr: [], //调拨单类型下拉数组
      branchName: ``, //调入部门
      dbdtype: "", //调拨单状态
      dbdtypearr: [], //调拨单状态下拉数组
      coinShow: false, //币种弹窗
      currency: ``, //币种
      currencyRate: 1, //业务币汇率
      departmentShow: false, //部门弹窗
      rksl: "", //入库数量
      rkje: "", //入库金额
      rkbz: "", //入库备注
      activeName: "first", //tab切换
      comdm: "",
      componyShow: false, //银行弹窗
      companyName: ``, //公司
      branchName: ``, //部门
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      staffName: ``, //员工
      warehouseShow: false, //仓库弹窗
      warehouseNames: "", //调出仓库
      warehouseName: "", //调入仓库
      warehousetype: "", //记录是调入仓库还是调出仓库
      matterShow: false, //物料弹窗
      mattermsg: "", //物料弹窗数据
      batchShow: false, //批次号弹窗
      batchmsg: ``, //选中物料信息
      matterindex: "", //记录物料弹框索引
      creattime1: "", //创建日期
      creattime2: "", //修改日期
      creatman1: "", //创建人
      creatman2: "", //修改人
      bankmsg: [], //表格信息
      bankreduces: [], //表格选择数据
      bankindex: "", //选择数据的索引
      pctkindex: "", //记录批次弹框索引
      uploadList: {
        tableList:[],
        fileList:[], //文件
        sysid: "ac3284d42dcdbc883c3b6598c4fa5e2", //文件上传的参数
        uploadHeaders: { "content-Type": "multipart/form-data" } //文件上传的格式
      },
       warrantCode:'',//凭证号
      warrantMonth:'', //期间
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
    this.getdblx();
    this.getdbzt();
    if (this.opres) {
      //如果是查看和修改状态 加载数据
      this.getmoremsg();
    }
  },
  watch: {},
  methods: {
    rksjchange() {
      if (this.companyName === "") {
        this.itDate = "";
        this.$openWarning("请先选择公司");
        return;
      }
    },
    getmoremsg() {
      getInformation({
        itId: this.msgid
      }).then(res => {
        if (res.code === "success") {
          this.bankmsg = res.data.odInvTransferItemsVOS;
          this.itDate = this.$timeFun(res.data.itDate, true);
          this.creattime1 = this.$timeFun(res.data.createdTime, true);
          this.creatman1 = res.data.createdName;
          this.creattime2 = this.$timeFun(res.data.updatedTime, true);
          this.creatman2 = res.data.updatedName;
          this.companyName = {
            companyName: res.data.companyName,
            companyCode: res.data.companyCode,
            functionalCurrencyId: res.data.functionalCurrencyId,
            companyId: res.data.companyId
          };
          getTimes({ companyId: this.companyName.companyId }).then(res => {
            if (res.code == "success") {
              this.$nextTick(() => {
                this.pickerOptions = {
                  disabledDate(time) {
                    return (
                      res.data.enddate < time.getTime() ||
                      time.getTime() < res.data.begindate
                    );
                  }
                };
              });
            } else {
              this.$openWarning(res.message);
            }
          });
          // this.branchNames = {
          //   branchCode: res.data.outOrgCode,
          //   branchName: res.data.outOrgName,
          //   branchId: res.data.outOrgId
          // };
          this.branchName = {
            branchCode: res.data.inOrgCode,
            branchName: res.data.inOrgName,
            branchId: res.data.inOrgId
          };
          this.staffName = {
            empName: res.data.bizPersonName,
            empCode: res.data.bizPersonCode
          };
          this.currency = {
            currencyCode: res.data.currencyCode,
            currencyName: res.data.currencyName,
            currencyId: res.data.currencyId
          };
          this.warehouseNames = {
            warehouseCode: res.data.outWarehouseCode,
            warehouseName: res.data.outWarehouseName
          };
          this.warehouseName = {
            warehouseCode: res.data.inWarehouseCode,
            warehouseName: res.data.inWarehouseName
          };
          this.dbdh = res.data.itCode;
          this.dbdhid = res.data.itId;
          this.currencyRate = res.data.baseCurrencyRate;
          this.rksl = res.data.itQty;
          this.rkje = res.data.itAmt;
          this.dbdtype = String(res.data.itStatus);
          this.rkbz = res.data.remark;
          this.warrantCode= res.data.warrantCode;//凭证号
          this.warrantMonth= res.data.warrantMonth; //期间
          this.version = res.data.version;
          this.dbdid = res.data.itId;
          this.selectFileList(this.msgid);
        }
      });
    },
    getdblx() {
      getMylx({
        //获取调拨单类型
        dictNo: 1039,
        bizCategory: 2
      }).then(res => {
        this.dbtypearr = res.data;
        this.dbtype = res.data[1].dict_code;
      });
    },
    getdbzt() {
      getMylx({
        //获取调拨单状态
        dictNo: 1068
      }).then(res => {
        this.dbdtypearr = res.data;
        if (this.types === "creat") {
          this.dbdtype = res.data[0].dict_code;
        }
      });
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyName = e;
      this.branchName = "";
      // this.pariList();
      if (this.bankmsg.length > 0) {
        this.bankmsg.forEach(i => {
          i.batchCode = "";
          i.packageCode = "";
          i.costPrice = 0;
          i.invQtyS = ""; //库存数量
          i.batchId = ""; //批次id
          i.docId = ""; //入库单id
          i.docNo = ""; //入库单据号
          i.detailId = ""; //批次明细id
          i.transferQty = 0; //调拨数量
          i.costAmt = 0; //成本金额
        });
        this.getrksl();
        this.getrkje();
      }
      comCurrency({ currencyId: e.functionalCurrencyId }).then(res => {
        if(res.data.length){
          this.currency = res.data[0];
        }
      });
      getTimes({ companyId: this.companyName.companyId }).then(res => {
        if (res.code == "success") {
          this.$nextTick(() => {
            this.pickerOptions = {
              disabledDate(time) {
                return (
                  res.data.enddate < time.getTime() ||
                  time.getTime() < res.data.begindate
                );
              }
            };
          });
        } else {
          this.$openWarning(res.message);
        }
      });
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
      if (this.bankmsg.length > 0) {
        this.bankmsg.forEach(i => {
          i.batchCode = "";
          i.packageCode = "";
          i.costPrice = 0;
          i.invQtyS = ""; //库存数量
          i.batchId = ""; //批次id
          i.docId = ""; //入库单id
          i.docNo = ""; //入库单据号
          i.detailId = ""; //批次明细id
          i.transferQty = 0; //调拨数量
          i.costAmt = 0; //成本金额
        });
        this.getrksl();
        this.getrkje();
      }
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
    //仓库弹窗
    warehouseTips(e) {
      if (!this.operation) {
        return;
      }
      this.warehousetype = e;
      if (this.warehousetype === "come") {
        if (this.warehouseNames === "") {
          this.$message({
            message: "请先选择调出仓库",
            type: "warning"
          });
          return;
        }
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
      if (this.warehousetype === "out") {
        if (e.warehouseCode === this.warehouseName.warehouseCode) {
          this.$openWarning("仓库不能一致");
          return;
        }
        this.warehouseNames = e;
        if (this.bankmsg.length > 0) {
          this.bankmsg.forEach(i => {
            i.batchCode = "";
            i.packageCode = "";
            i.costPrice = 0;
            i.invQtyS = ""; //库存数量
            i.batchId = ""; //批次id
            i.docId = ""; //入库单id
            i.docNo = ""; //入库单据号
            i.detailId = ""; //批次明细id
            i.transferQty = 0; //调拨数量
            i.costAmt = 0; //成本金额
          });
          this.getrksl();
          this.getrkje();
        }
      } else {
        if (e.warehouseCode === this.warehouseNames.warehouseCode) {
          this.$openWarning("仓库不能一致");
          return;
        }
        this.warehouseName = e;
      }
    },
    // //币种弹窗打开
    // coinTip() {
    //   if (!this.operation) {
    //     return;
    //   }
    //   this.coinShow = true;
    // },
    // //币种弹窗关闭
    // coinCancle() {
    //   this.coinShow = false;
    // },
    // //币种弹窗确定获取数据
    // coinSure(e) {
    //   this.coinShow = false;
    //   console.log(e);
    //   this.currency = e;
    //   this.pariList();
    // },
    //获取本位币汇率
    // pariList() {
    //   if (
    //     this.currency.currencyId != undefined &&
    //     this.companyName.functionalCurrencyId != undefined
    //   ) {
    //     pariList({
    //       formCurrencyId: this.currency.currencyId,
    //       toCurrencyId: this.companyName.functionalCurrencyId
    //     }).then(res => {
    //       console.log(res.data);
    //       if (res.code === "success") {
    //         if (res.data.parities != "") {
    //           this.currencyRate = res.data.parities;
    //         }
    //         if (res.data === "") {
    //           if (this.companyName != "" && this.currency != "") {
    //             this.currencyRate = 1;
    //           }
    //         }
    //       }
    //     });
    //   }
    // },
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
      this.mattermsg = e;
      this.batchmsg = e;
      this.bankmsg[this.matterindex].goodsCode = this.mattermsg.skuCode; //物料编码赋值
      this.bankmsg[this.matterindex].goodsName = this.mattermsg.skuName; //物料名称赋值
      this.bankmsg[this.matterindex].goodsCat = this.mattermsg.categoryCode; //物料大类赋值
      this.bankmsg[this.matterindex].goodsCategoryName = this.mattermsg.categoryShowName; //物料大类赋值
      this.bankmsg[this.matterindex].goodsSpec = this.mattermsg.propertyInfo; //物料规格赋值
      this.bankmsg[this.matterindex].secUnit = this.mattermsg.secUnitName; //第二单位赋值
      this.bankmsg[this.matterindex].basicUnit = this.mattermsg.firstUnitName; //基础单位赋值
      this.bankmsg[this.matterindex].batchCode = "";
      this.bankmsg[this.matterindex].packageCode = "";
      this.bankmsg[this.matterindex].costPrice = 0;
      this.bankmsg[this.matterindex].invQtyS = ""; //库存数量
      this.bankmsg[this.matterindex].batchId = ""; //批次id
      this.bankmsg[this.matterindex].docId = ""; //入库单id
      this.bankmsg[this.matterindex].docNo = ""; //入库单据号
      this.bankmsg[this.matterindex].detailId = ""; //批次明细id
      this.bankmsg[this.matterindex].transferQty = 0; //调拨数量
      this.bankmsg[this.matterindex].costAmt = 0; //成本金额
      this.matterindex = "";
      this.mattermsg = "";
      this.getrksl();
      this.getrkje();
      // this.basicData.matterName = e;
      // this.basicData.matterCode=e.matterCode;
    },
    //批次号弹框
    alertkb(e) {
      if (this.bankmsg[e].goodsName === "") {
        this.$message({
          message: "请先选择物料数据",
          type: "warning"
        });
        return;
      }
      this.batchShow = true;
      //if (this.batchmsg === "") {
      this.batchmsg = {
        skuCode: this.bankmsg[e].goodsCode,
        skuName: this.bankmsg[e].goodsName,
        categoryShowName: this.bankmsg[e].categoryShowName,
        propertyInfo: this.bankmsg[e].goodsSpec,
        warehouseCode: this.warehouseNames.warehouseCode,
        companyCode: this.companyName.companyCode,
        branchCode: this.branchName.branchCode
      };
      //}
      this.pctkindex = e;
    },
    //批次号弹窗确定
    batchnumberSure(e) {
      if (e.length === 0) {
        this.$message({
          message: "请选择一条数据",
          type: "warning"
        });
        return;
      }
      this.batchShow = false;
      let arraymsg = [];
      this.bankmsg.forEach(i => {
        arraymsg.push(i.batchCode);
      });
      if (arraymsg.indexOf(e.batchCode) === -1) {
        this.bankmsg[this.pctkindex].batchCode = e.batchCode;
        this.bankmsg[this.pctkindex].packageCode = e.packageCode;
        this.bankmsg[this.pctkindex].costPrice = e.invPrice;
        this.bankmsg[this.pctkindex].invQtyS = e.invQtyS; //库存数量
        this.bankmsg[this.pctkindex].batchId = e.batchId; //批次id
        this.bankmsg[this.pctkindex].docId = e.docId; //入库单id
        this.bankmsg[this.pctkindex].docNo = e.docNo; //入库单据号
        this.bankmsg[this.pctkindex].detailId = e.detailId; //批次明细id
        this.bankmsg[this.pctkindex].costAmt = 0; //成本金额
        this.bankmsg[this.pctkindex].transferQty = 0; //调拨数量
        this.bankmsg[this.pctkindex].secUnitQty = e.secUnitQty;
      } else {
        this.$message({
          message: "该批次已存在,请勿重复添加",
          type: "warning"
        });
      }
    },
    //批次号弹窗关闭
    batchnumberCancle() {
      this.batchShow = false;
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
      if (
        this.warehouseNames === "" ||
        this.companyName === "" ||
        this.companyCode === ""
      ) {
        this.$openWarning("请先选择公司部门和仓库");
        return;
      }
      this.bankmsg.forEach(item => {
        item.edit = false;
      });
      let obj = {
        goodsCode: "",
        goodsName: "",
        goodsCat: "",
        categoryShowName:"",
        goodsSpec: "",
        batchCode: "",
        packageCode: "",
        basicUnit: "",
        secUnit: "",
        transferQty: 0,
        secQty: 0,
        costPrice: 0,
        costAmt: 0,
        edit: true,
        secUnitQty:"",//第二数量库存
        invQtyS: "", //入库数量
        docId: "", // 入库单ID
        batchId: "", // 批次ID
        docNo: "" // 入库单据号
      };
      let newtable = [];
      newtable.unshift(obj);
      this.bankmsg = newtable.concat(this.bankmsg);
      this.bankreduces = [];
    },
    bankreduce() {
      //表格删除
      if (!this.operation) {
        return;
      }
      if (this.bankreduces.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      if (this.bankreduces.itdId === undefined) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.bankmsg.splice(this.bankindex, 1);
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
            itdId: this.bankreduces.itdId,
            version: this.bankreduces.version,
            itVersion: this.version
          }).then(res => {
            if (res.code === "success") {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.bankmsg.splice(this.bankindex, 1);
              this.bankreduces = [];
              this.getrksl();
              this.getrkje();
            }
          });
        });
      }
    },

    //itemQty入库数量
    //costPrice成本单价
    //stockinAmt成本金额
    getrksl() {
      //计算调拨数量总汇
      let num = 0;
      let skbbankmsg = JSON.parse(JSON.stringify(this.bankmsg));
      skbbankmsg.forEach(i => {
        if (i.transferQty === "") {
          i.transferQty = 0;
        }
        num += parseFloat(i.transferQty);
      });
      this.rksl = this.$toFixed(num, 4);
    },
    getrkje() {
      //计算成本金额总汇
      let num = 0;
      let skbbankmsg = JSON.parse(JSON.stringify(this.bankmsg));
      skbbankmsg.forEach(i => {
        if (i.costAmt === "") {
          i.costAmt = 0;
        }
        num += parseFloat(i.costAmt);
      });
      this.rkje = num;
    },
    changedbsl(e) {
      //调拨数量发生改变
      if (this.bankmsg[e].batchCode === "") {
        this.bankmsg[e].transferQty = 0;
        this.$message({
          message: "请先选择批次数据",
          type: "warning"
        });
        return;
      }
      if (
          parseFloat(this.bankmsg[e].transferQty) >
          parseFloat(this.bankmsg[e].invQtyS)
        ) {
          this.bankmsg[e].transferQty = this.bankmsg[e].invQtyS;
          this.$openWarning("调拨数量不能大于可用数量");
        }
      // if (this.bankmsg[e].numinvQtyS == undefined) {
      //   if (
      //     parseFloat(this.bankmsg[e].transferQty) >
      //     parseFloat(this.bankmsg[e].invQtyS)
      //   ) {
      //     this.bankmsg[e].transferQty = this.bankmsg[e].invQtyS;
      //     this.$openWarning("调拨数量不能大于可用数量");
      //   }
      // } else {
      //   if (
      //     parseFloat(this.bankmsg[e].transferQty) >
      //     parseFloat(this.bankmsg[e].numinvQtyS)
      //   ) {
      //     this.bankmsg[e].transferQty = this.bankmsg[e].numinvQtyS;
      //     this.$openWarning("调拨数量不能大于可用数量");
      //   }
      // }
      this.bankmsg[e].costAmt =
        this.bankmsg[e].costPrice * this.bankmsg[e].transferQty;
      this.bankmsg[e].costAmt = this.$toFixed(this.bankmsg[e].costAmt, 2);
      this.getrksl();
      this.getrkje();
    },
            //文件上传
    beforeUpload(file) {
      var that = this;
      let _this = this.uploadList;
      let formdata = new FormData();
      formdata.append("file", file); //传文件
      //formdata.append('_sysid_',_this.sysid);//传其他参数
      uploadApi.uploadFile(formdata).then(function(res) {
        if (res.code == "success") {
          _this.fileList = [];
          let fileData=res.data;
          let obj = {
            fileOldName: fileData.oldFilename,
            fileNewName: fileData.newFilename,
            fileType:"", //文件类型
            fileSuffix:fileData.fileExt,//文件扩展名
            // fileAbsolutePath:"",//文件绝对路径
            // fileRelativePaths:"",//文件相对路径
            fileServerAddress: fileData.filePath,//文件服务器地址
            createdTime: that.$nowDate(),
            isInactive:0,//启用，禁用
            createdName:sessionStorage.getItem("userName") || "admin",
          };
          _this.tableList.unshift(obj);
        }
      });
      return false;
    },
    //确定上传
    submitUpload() {
      //确定上传
      this.$refs.newupload.submit();
    },
    //移除
    handleRemove(file, fileList) {
      //  console.log(file, fileList);
    },
     //打印及附件表格
    dialogCheckTable() {},
    //打印及附件表格
    handleChangeTableTable() {},
    //查询附件
    selectFileList(id){
       let data = {
        businessId:this.msgid
      };
      uploadApi.selectFileList(data)
        .then(res => {
          if (res.code == "success") {
            this.uploadList.tableList=res.data;
            this.uploadList.tableList.forEach(element => {
               element.createdTime=this.$timeFun(element.createdTime, true);
            });
          } else {
            this.$openWarning(res.message);
          }
        }).catch();
    },
    //附件删除
    delFile(index,row){
       this.$confirm("是否确定删除？",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
        //没有保存
        if(row.accessoryId){
          let data = {
            accessoryId:row.accessoryId,
            version:row.version
          };
          uploadApi.delFif(data)
            .then(res => {
              if (res.code == "success") {
              this.$openSuccess(res.message);
              this.uploadList.tableList.splice(index,1);
              //this.selectFileList(row.businessId);
              } else {
                this.$openWarning(res.message);
              }
            }).catch();
          }else{
            this.uploadList.tableList.splice(index,1);
            this.$openSuccess("删除成功");
          }
      }).catch();
    },
    //预览
    download(row){
      window.open(row.fileServerAddress);
    },
    handleClick(tab, event) {
    },
    savemsg(param) {
      //保存数据
      wareSave(param).then(res => {
        if (res.code === "success") {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.$router.push({
            name: "stockControl"
          });
        }
      });
    },
    savemsgs(param) {
      //修改提交数据
      wareSaves(param).then(res => {
        if (res.code === "success") {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.$router.push({
            name: "stockControl"
          });
        }
      });
    },
    savebtn() {
      //保存新增
      this.errorKey = [];
      let keyArr = ['companyName', 'branchName', 'staffName', 'warehouseName', 'warehouseNames', 'currency', 'itDate'];
      keyArr.forEach(item => {
        if(!this[item] || (item == 'itDate' && this[item] === null)) {
          this.errorKey.push(item);
        }
      })
      if(this.errorKey.length > 0) {
        this.$openWarning("请将必填项补充完整！");
        return false;
      }
      let kbbankmsg = JSON.parse(JSON.stringify(this.bankmsg));
      if (kbbankmsg.length === 0) {
        this.$openWarning("请填写物料信息");
        return;
      }
      let goodNum = []; //记录物料号码
      let goodStatus = []; //记录批次号
      let fhNum = []; //记录调拨数量
      let secondnum=[];//记录第二数量
      let secondtrue=true;
      kbbankmsg.forEach(i => {
        if(Number(i.secQty)>Number(i.secUnitQty)){
          secondtrue=false
          return false;
        }
        goodNum.push(i.goodsCode);
        goodStatus.push(i.batchCode);
        fhNum.push(i.transferQty);
        secondnum.push(i.secQty);
      });
      if (goodNum.indexOf("") != -1) {
        this.$openWarning("物料编码不能为空");
        return;
      }
      if (goodStatus.indexOf("") != -1) {
        this.$openWarning("批次号不能为空");
        return;
      }
      if (
        fhNum.indexOf("") != -1 ||
        fhNum.indexOf(0) != -1 ||
        fhNum.indexOf("0") != -1
      ) {
        this.$openWarning("调拨数量不正确");
        return;
      }
      if(secondnum.indexOf("")!=-1){
        this.$openWarning("第二数量不能为空");
        return;
      }
      if(!secondtrue){
        this.$openWarning("第二数量不能大于第二数量库存");
        return;
      }
      let param = {
        itDate: this.itDate,
        companyCode: this.companyName.companyCode,
        companyName: this.companyName.companyName,
        companyId: this.companyName.companyId,
        outOrgCode: this.branchName.branchCode,
        outOrgName: this.branchName.branchName,
        outOrgId: this.branchName.branchId,
        inOrgCode: this.branchName.branchCode,
        inOrgName: this.branchName.branchName,
        inOrgId: this.branchName.branchId,
        bizPersonName: this.staffName.empName,
        bizPersonCode: this.staffName.empCode,
        outWarehouseCode: this.warehouseNames.warehouseCode,
        outWarehouseName: this.warehouseNames.warehouseName,
        inWarehouseCode: this.warehouseName.warehouseCode,
        inWarehouseName: this.warehouseName.warehouseName,
        itMoveType: this.dbtype,
        currencyCode: this.currency.currencyCode,
        currencyName: this.currency.currencyName,
        baseCurrencyRate: this.currencyRate,
        itQty: this.rksl,
        itAmt: this.rkje,
        itStatus: this.dbdtype,
        remark: this.rkbz,
        editOdInvTransferItemsForms: this.bankmsg,
        sysSystemAccessoryList:this.uploadList.tableList,//附件上传
      };
      if (this.msgid === undefined) {
        this.savemsg(param);
      } else {
        (param.version = this.version),
          (param.itId = this.dbdid),
          (param.itCode = this.itCode),
          this.savemsgs(param);
      }
    },
    cancelbtn() {
      //取消新增
      this.$router.push({
        name: "stockControl"
      });
    },
     //合计,表格合计
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = "合计";
            return;
          } else if (
            column.property == "transferQty" ||
            column.property == "secQty" ||
            column.property == "costAmt"
            ) {
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return calculation.accAdd(prev, curr);
                } else {
                    return prev;
                }
                }, 0);
            } else {
                sums[index] = "";
            }
          } else {
            sums[index] = "-";
          }
      });
      return sums;
    },
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    warehouseSelect,
    matterSelect,
    batchNumber,
    'v-exmineStatus': ExmineStatus
    // coinSelect
  }
};
</script>

<style lang="scss">
#stockcontrolcreat {
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
  .el-textarea__inner {
    width: 100% !important;
    height: 30px!important;
  }
}
</style>
