<template>
  <div id="otherComing" class="content-div2">
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
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- 基本信息 -->
        <el-tab-pane label="基本信息" name="first">
          <div class="index-div3">
            <el-col :span="5" class="el-col">
              <label>入库单号</label>
              <el-input
                v-model="rkdh"
                class="el-inputs"
                placeholder="保存后自动生成"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>公司</label>
              <el-input
                v-model="companyName.companyName"
                class="el-inputs" :class="errorKey.includes('companyName') ? 'inputRed' : ''"
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
                class="el-inputs" :class="errorKey.includes('branchName') ? 'inputRed' : ''"
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
                class="el-inputs" :class="errorKey.includes('staffName') ? 'inputRed' : ''"
                :placeholder="this.types==='look'?'':'请选择'"
                disabled
              >
              </el-input>
              <span class="comicon" @click="staffTip"
                ><i class="el-icon-search"></i
              ></span>
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
              ></el-input>
              <span class="comicon" @click="warehouseTips"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>贸易类型</label>
              <el-select
                style="marginBottom:0px;"
                clearable
                v-model="mytype"
                placeholder="请选择"
                class="el-select"
                :class="errorKey.includes('mytype') ? 'inputRed' : ''"
                @change="changeState"
                :disabled="!operation"
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
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>移动类型</label>
              <el-select
                style="marginBottom:0px;"
                clearable
                v-model="ydtype"
                placeholder="请选择"
                class="el-select"
                :class="errorKey.includes('ydtype') ? 'inputRed' : ''"
                @change="changeydlx"
                :disabled="!operation"
              >
                <el-option
                  v-for="item in ydtypearr"
                  :key="item.dict_code"
                  :label="item.dict_value"
                  :value="item.dict_code"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>入库单状态</label>
              <el-select
                clearable
                v-model="rkdtype"
                placeholder="请选择"
                class="el-select"
                :class="errorKey.includes('rkdtype') ? 'inputRed' : ''"
                @change="changerkd"
                disabled
              >
                <el-option
                  v-for="item in rkdtypearr"
                  :key="item.dict_code"
                  :label="item.dict_value"
                  :value="item.dict_code"
                >
                </el-option>
              </el-select>
            </el-col>

            <el-col :span="5" class="el-col">
              <label>入库数量</label>
              <el-input
                v-model="rksl"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>入库金额</label>
              <el-input
                v-model="rkje"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col  el-col-required">
              <label><span style="color:red">*</span>入库时间</label>
              <el-date-picker
                class="el-input2"
                :class="errorKey.includes('gmDate') ? 'inputRed' : ''"
                :disabled="!operation"
                size="small"
                v-model="gmDate"
                value-format="yyyy-MM-dd"
                @change="rksjchange"
                type="date"
                placeholder="请选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>项目号</label>
              <el-input
                v-model="projectName.projectName"
                class="el-inputs"
                :placeholder="this.types==='look'?'':'请选择'"
                disabled
              ></el-input>
              <span class="comicon" v-if="projectName.projectName&&types!='look'" @click="projectName = {}">
             <i class="el-icon-circle-close"></i>
            </span>
              <span class="comicon" v-else @click="projectTip">
                <i class="el-icon-search"></i>
              </span>
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
                size="small"
                type="textarea"
                class="el-textarea"
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
              max-height="290"
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
                width="130"
                label="物料名称"
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
                label="是否赠品"
                prop="isFreebie"
                show-overflow-tooltip
              >
                <template scope="scope">
                  <el-checkbox
                    v-model="scope.row.isFreebie"
                    :disabled="!scope.row.edit"
                  ></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                width="120"
                label="批次号"
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
                    >
                    <span class="comicon2" v-if="scope.row.batchCode" @click="clearpc(scope.$index)">
                     <i class="el-icon-circle-close"></i>
                    </span><span class="comicon2" v-else @click="alertkb(scope.$index)"
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
                prop="itemUnit"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="入库数量"
                prop="itemQty"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.itemQty"
                    placeholder=""
                    v-input-filter:num4
                    @change="changerksl(scope.$index)"
                    v-if="scope.row.edit"
                    :oninput="
                      (scope.row.itemQty = $filterPriceNum(
                        scope.row.itemQty,
                        4
                      ))
                    "
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
                label="成本单价"
                prop="costPrice"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.costPrice"
                    @change="changecbdj(scope.$index)"
                    placeholder=""
                    v-if="scope.row.edit"
                    :oninput="
                      (scope.row.costPrice = $filterPriceNum(
                        scope.row.costPrice,
                        6
                      ))
                    "
                  >
                  </el-input>
                  <span v-else>{{ scope.row.costPrice }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="成本金额"
                prop="stockinAmt"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.stockinAmt"
                    @change="changecbje(scope.$index)"
                    placeholder=""
                    v-if="scope.row.edit"
                    :oninput="
                      (scope.row.stockinAmt = $filterPriceNum(
                        scope.row.stockinAmt,
                        2
                      ))
                    "
                  >
                  </el-input>
                  <span v-else>{{ scope.row.stockinAmt }}</span>
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
        <el-tab-pane label="流程详情"
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
      :tipShow="componyShow"
      :ztz="ztz"
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
    <batch-numbers
      v-if="batchShow"
      :tipShow="batchShow"
      :data="batchmsg"
      @batchnumberCancle="batchnumberCancle"
      @batchnumberSure="batchnumberSure"
    ></batch-numbers>
    <!-- 选择项目弹窗 -->
    <project-select
      v-if="projectShow"
      :tipShow="projectShow"
      @projectCancle="projectCancle"
      @projectSure="projectSure"
    ></project-select>
  </div>
</template>

<script>
import axios from "axios";
import { service, serviceJson } from "../../axios/index.js";
import { getMylx } from "@/api/stockBranch/otheroutcreat.js";
import ExmineStatus from '@/components/exmineStatus'
import {
  wareSave,
  wareSaves,
  getInformation,
  getInformations,
  reducemsg,
  getTimes
} from "@/api/stockBranch/oterwarecreat.js";
import uploadApi from "@/api/component";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import warehouseSelect from "@/components/warehouseSelect.vue"; //仓库组件
import matterSelect from "@/components/matterSelect.vue"; //物料组件
import batchNumbers from "@/components/batchNumbers.vue"; //批次组件
import projectSelect from "@/components/projectSelect.vue"; //项目号
export default {
  name: "oterWarehousingcreat",
  props: {},
  data() {
    return {
      errorKey: [],
      departztz: 0,
      ztz: 0,
      staffsName: {},
      projectName: ``, //项目
      projectShow: false, //项目弹窗
      types: "", //记录操作
      msgid: "", //记录数据id
      msgcode: "", //记录数据code
      version: "", //记录带过来的版本号
      operation: true, //记录是否是查看状态
      opres: true, //记录是否是新增状态
      rkdh: "", //入库单号
      mytype: "", //贸易类型
      mytypearr: [], //贸易类型下拉数据
      ydtype: "", //移动类型
      ydtypearr: [], //移动类型下拉数据
      rkdtype: "", //入库单状态
      rkdtypearr: [], //入库单状态下拉数据
      rksl: "", //入库数量
      rkje: "", //入库金额
      rkbz: "", //入库备注
      gmDate: "", //入库时间
      pickerOptions: "", //时间选择器的时间范围
      activeName: "first", //tab切换
      comdm: "",
      componyShow: false, //银行弹窗
      companyName: ``, //公司
      branchName: ``, //部门
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      staffName: ``, //员工
      warehouseShow: false, //仓库弹窗
      warehouseName: "", //仓库
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
      pctkindex: "" ,//记录批次弹框索引
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
    this.msgcode = this.$route.query.msgcode;
    this.version = this.$route.query.version;
    this.opres = this.types === "creat" ? false : true;
    this.operation = this.types === "look" ? false : true;
    this.getMylxs();
    this.getydlx();
    this.getrkdzt();
    if (this.opres) {
      //如果是查看和修改状态 加载数据
      this.getmoremsg();
    }
  },
  watch: {},
  methods: {
    rksjchange() {
      if (this.companyName === "") {
        this.gmDate = "";
        this.$openWarning("请先选择公司");
        return;
      }
    },
    getmoremsg() {
      axios
        .all([
          getInformation({
            grnId: this.msgid
          }),
          getInformations({
            grnCode: this.msgcode
          })
        ])
        .then(
          axios.spread((allGetInformation, allGetInformations) => {
            this.rkdh = allGetInformation.data.grnCode;
            this.companyName = {
              companyName: allGetInformation.data.companyName,
              companyCode: allGetInformation.data.companyCode,
              companyId: allGetInformation.data.companyId
            };
            this.projectName = {
              projectName: allGetInformation.data.projectName,
              projectCode: allGetInformation.data.projectCode
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
            this.gmDate = this.$timeFun(allGetInformation.data.gmDate, true);
            this.branchName = {
              branchCode: allGetInformation.data.orgCode,
              branchName: allGetInformation.data.orgName,
              branchId: allGetInformation.data.orgId
            };
            this.staffName = {
              empName: allGetInformation.data.bizPersonName,
              empCode: allGetInformation.data.bizPersonCode
            };
            this.warehouseName = {
              warehouseCode: allGetInformation.data.warehouseCode,
              warehouseName: allGetInformation.data.warehouseName
            };
            this.rksl = allGetInformation.data.grnQty;
            this.rkje = allGetInformation.data.grnAmt;
            this.rkbz = allGetInformation.data.remark;
            this.warrantCode= allGetInformation.data.warrantCode;//凭证号
            this.warrantMonth= allGetInformation.data.warrantMonth; //期间
            this.creattime1 = this.$timeFun(
              allGetInformation.data.createdTime,
              true
            );
            this.creatman1 = allGetInformation.data.createdName;
            this.creattime2 = this.$timeFun(
              allGetInformation.data.updatedTime,
              true
            );
            this.creatman2 = allGetInformation.data.updatedName;
            this.mytype = String(allGetInformation.data.tradeType);
            this.ydtype = String(allGetInformation.data.moveType);
            this.rkdtype = String(allGetInformation.data.grnStatus);
            this.bankmsg = allGetInformations.data;
            this.bankmsg.forEach(i => {
              if (i.isFreebie === 1) {
                i.isFreebie = true;
              } else {
                i.isFreebie = false;
              }
            });
            //this.uploadList.tableList=data.sysSystemAccessoryList;//附件
          })
        );
        this.selectFileList(this.msgid);
    },
    getMylxs() {
      //获取贸易类型数据
      getMylx({
        dictNo: 1038
      }).then(res => {
        this.mytypearr = res.data;
      });
    },
    changeState() {
      //贸易类型选择
    },
    getydlx() {
      //获取移动类型
      getMylx({
        dictNo: 1039,
        bizCategory: 0
      }).then(res => {
        this.ydtypearr = res.data;
      });
    },
    changeydlx() {
      //移动类型选择
    },
    getrkdzt() {
      //获取入库单状态
      getMylx({
        dictNo: 1086
      }).then(res => {
        this.rkdtypearr = res.data;
        if (this.types === "creat") {
          this.rkdtype = res.data[0].dict_code;
        }
      });
    },
    changerkd() {
      //入库单选择
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyName = e;
      this.branchName = "";
      if (this.bankmsg.length > 0) {
        this.bankmsg.forEach(i => {
          i.batchCode = "";
          i.packageCode = "";
          i.batchDetailId = ""; //detailId赋值
          i.costPrice = 0; //单价
          i.itemQty = 0; //数量
          i.stockinAmt = 0; //金额
        });
        this.getrksl();
        this.getrkje();
      }
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
          i.batchDetailId = ""; //detailId赋值
          i.costPrice = 0; //单价
          i.itemQty = 0; //数量
          i.stockinAmt = 0; //金额
        });
        this.getrksl();
        this.getrkje();
      }
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
      if (this.bankmsg.length > 0) {
        this.bankmsg.forEach(i => {
          i.batchCode = "";
          i.packageCode = "";
          i.batchDetailId = ""; //detailId赋值
          i.costPrice = 0; //单价
          i.itemQty = 0; //数量
          i.stockinAmt = 0; //金额
        });
        this.getrksl();
        this.getrkje();
      }
    },
    //项目弹窗打开
    projectTip() {
      if (!this.operation) {
        return;
      }
      this.projectShow = true;
    },
    //项目弹窗关闭
    projectCancle() {
      this.projectShow = false;
    },
    //项目弹窗确定获取数据
    projectSure(e) {
      this.projectShow = false;
      this.projectName = e;
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
      this.mattermsg = e;
      this.batchmsg = e;
      this.bankmsg[this.matterindex].goodsCode = this.mattermsg.skuCode; //物料编码赋值
      this.bankmsg[this.matterindex].goodsName = this.mattermsg.skuName; //物料名称赋值
      this.bankmsg[this.matterindex].goodsCategoryName = this.mattermsg.categoryShowName; //物料大类赋值
      this.bankmsg[this.matterindex].goodsCat= this.mattermsg.categoryCode; //物料大类赋值
      this.bankmsg[this.matterindex].goodsSpec = this.mattermsg.propertyInfo; //物料规格赋值
      this.bankmsg[this.matterindex].secUnitName = this.mattermsg.secUnitName; //第二单位赋值
      this.bankmsg[this.matterindex].itemUnit = this.mattermsg.firstUnitName; //基础单位赋值
      this.bankmsg[this.matterindex].batchCode = "";
      this.bankmsg[this.matterindex].packageCode = "";
      this.bankmsg[this.matterindex].batchDetailId = ""; //detailId赋值
      this.bankmsg[this.matterindex].costPrice = 0; //单价
      this.bankmsg[this.matterindex].itemQty = 0; //数量
      this.bankmsg[this.matterindex].stockinAmt = 0; //金额
      this.matterindex = "";
      this.mattermsg = "";
    },
    clearpc(e){//清除批次
      this.bankmsg[e].batchCode=""
      this.bankmsg[e].costPrice=this.bankmsg[e].stockinAmt=0
      this.getrksl();
      this.getrkje();
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
      this.batchmsg = {
        skuCode: this.bankmsg[e].goodsCode,
        skuName: this.bankmsg[e].goodsName,
        categoryShowName: this.bankmsg[e].goodsCategoryName,
        propertyInfo: this.bankmsg[e].goodsSpec,
        warehouseCode: this.warehouseName.warehouseCode,
        companyCode: this.companyName.companyCode,
        branchCode: this.branchName.branchCode
      };
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
        this.bankmsg[this.pctkindex].batchDetailId = e.detailId; //detailId赋值
        this.bankmsg[this.pctkindex].costPrice = e.invPrice; //成本单价
        if (this.bankmsg[this.pctkindex].itemQty != 0) {
          this.bankmsg[this.pctkindex].stockinAmt =
            this.bankmsg[this.pctkindex].costPrice *
            this.bankmsg[this.pctkindex].itemQty;
        }
      } else {
        this.$openWarning("该批次已存在，请勿重复添加");
        return;
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
        this.warehouseName === "" ||
        this.companyName === "" ||
        this.branchName === ""
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
        goodsCategoryName: "",
        goodsCat:"",
        goodsSpec: "",
        isFreebie: false,
        batchCode: "",
        packageCode: "",
        itemUnit: "",
        secUnitName: "",
        itemQty: 0,
        secQty: 0,
        costPrice: 0,
        stockinAmt: 0,
        detailId: "", //detailId赋值
        edit: true,
        batchDetailId: ""
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
      if (this.bankreduces.grnItemId === undefined) {
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
          if (this.bankreduces.isFreebie) {
            this.bankreduces.isFreebie = 1;
          } else {
            this.bankreduces.isFreebie = 0;
          }
          reducemsg({
            itVersion: this.version,
            id: this.bankreduces.grnItemId,
            version: this.bankreduces.version
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
      //计算入库数量总汇
      let num = 0;
      let skbbankmsg = JSON.parse(JSON.stringify(this.bankmsg));
      skbbankmsg.forEach(i => {
        if (i.itemQty === "") {
          i.itemQty = 0;
        }
        num += parseFloat(i.itemQty);
      });
      this.rksl = this.$toFixed(num, 4);
      // this.rksl = num;
    },
    getrkje() {
      //计算成本金额总汇
      let num = 0;
      let skbbankmsg = JSON.parse(JSON.stringify(this.bankmsg));
      skbbankmsg.forEach(i => {
        if (i.stockinAmt === "") {
          i.stockinAmt = 0;
        }
        num += parseFloat(i.stockinAmt);
      });
      this.rkje = this.$toFixed(num, 2);
      // this.rkje = num;
    },
    changerksl(e) {
      //入库数量发生改变
      if (
        this.bankmsg[e].costPrice === "" &&
        this.bankmsg[e].stockinAmt != ""
      ) {
        this.bankmsg[e].costPrice =
          this.bankmsg[e].stockinAmt / this.bankmsg[e].itemQty;
        this.bankmsg[e].costPrice = this.$toFixed(this.bankmsg[e].costPrice, 6);
      } else {
        this.bankmsg[e].stockinAmt =
          this.bankmsg[e].itemQty * this.bankmsg[e].costPrice;
        this.bankmsg[e].stockinAmt = this.$toFixed(
          this.bankmsg[e].stockinAmt,
          2
        );
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
        this.$message({
          message: "请先填写入库数量",
          type: "warning"
        });
        this.bankmsg[e].costPrice = 0;
        return;
      } else {
        this.bankmsg[e].stockinAmt =
          this.bankmsg[e].itemQty * this.bankmsg[e].costPrice;
        this.bankmsg[e].stockinAmt = this.$toFixed(
          this.bankmsg[e].stockinAmt,
          2
        );
      }
      this.getrkje();
    },
    changecbje(e) {
      //成本金额发生改变
      if (
        parseFloat(this.bankmsg[e].itemQty) === 0 ||
        this.bankmsg[e].itemQty === ""
      ) {
        this.$message({
          message: "请先填写入库数量",
          type: "warning"
        });
        this.bankmsg[e].stockinAmt = 0;
        return;
      } else {
        this.bankmsg[e].costPrice =
          this.bankmsg[e].stockinAmt / this.bankmsg[e].itemQty;
        this.bankmsg[e].costPrice = this.$toFixed(this.bankmsg[e].costPrice, 6);
      }
      this.getrkje();
    },
    handleClick(tab, event) {
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
    savemsg(param) {
      //保存数据
      wareSave(param).then(res => {
        if (res.code === "success") {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.$router.push({
            name: "otherWarehousing"
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
            name: "otherWarehousing"
          });
        }
      });
    },
    savebtn() {
      //保存新增
      this.errorKey = [];
      let keyArr = ['companyName', 'branchName', 'staffName', 'warehouseName', 'mytype', 'ydtype', 'gmDate'];
      keyArr.forEach(item => {
        if(!this[item] || (item == 'gmDate' && this[item] === null)) {
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
      let goodStatus = []; //记录批次号
      let fhNum = []; //记录入库数量
      let fhMoney = []; //记录入库单价
      let secondnum=[];//记录第二数量
      let stockinAmt=[];//记录成本金额
      let kbbankmsg = JSON.parse(JSON.stringify(this.bankmsg));
      kbbankmsg.forEach(i => {
        goodNum.push(i.goodsCode);
        goodStatus.push(i.batchCode);
        fhNum.push(i.itemQty);
        fhMoney.push(i.costPrice);
        secondnum.push(i.secQty);
        stockinAmt.push(i.stockinAmt);
        if (i.isFreebie) {
          i.isFreebie = 1;
        } else {
          i.isFreebie = 0;
        }
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
        this.$openWarning("入库数量不正确");
        return;
      }
      if(secondnum.indexOf("")!=-1){
        this.$openWarning("第二数量不能为空");
        return;
      }
      if(stockinAmt.indexOf("") != -1 ||
        stockinAmt.indexOf(0) != -1 ||
        stockinAmt.indexOf("0") != -1){
          this.$openWarning("成本金额不能为0或者空");
          return;
        }
      let param = {
        gmDate: this.gmDate,
        grnCode: this.rkdh,
        companyCode: this.companyName.companyCode,
        companyName: this.companyName.companyName,
        companyId: this.companyName.companyId,
        orgCode: this.branchName.branchCode,
        orgName: this.branchName.branchName,
        orgId: this.branchName.branchId,
        bizPersonName: this.staffName.empName,
        bizPersonCode: this.staffName.empCode,
        warehouseCode: this.warehouseName.warehouseCode,
        warehouseName: this.warehouseName.warehouseName,
        projectName: this.projectName.projectName,
        projectCode: this.projectName.projectCode,
        tradeType: this.mytype,
        moveType: this.ydtype,
        grnStatus: this.rkdtype,
        grnQty: this.rksl,
        grnAmt: this.rkje,
        remark: this.rkbz,
        odOhGrnItems: kbbankmsg,
        sysSystemAccessoryList:this.uploadList.tableList,//附件上传
      };
      if (this.msgid === undefined) {
        this.savemsg(param);
      } else {
        param.grnId = this.msgid;
        param.version = this.version;
        this.savemsgs(param);
      }
    },
    cancelbtn() {
      //取消新增
      this.$router.push({
        name: "otherWarehousing"
      });
    }
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    warehouseSelect,
    matterSelect,
    batchNumbers,
    projectSelect,
    'v-exmineStatus': ExmineStatus
  }
};
</script>

<style lang="scss">
#otherComing {
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
