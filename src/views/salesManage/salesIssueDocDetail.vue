<template>
  <div id="salesIssueDocDetail">
    <!--按钮样式-->
    <div class="button-div">
      <el-button v-if="type==2" @click="cancel()" icon="el-icon-back">返回</el-button>
      <el-button v-if="type==3"  class="query-button"  @click="saveBlRemark()" icon="el-icon-suitcase">保存</el-button>
      <el-button v-if="type==3" @click="cancel()" icon="el-icon-close">取消</el-button>
    </div>
    <el-tabs
      class="el-tabs"
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="基本信息" name="one">
        <div class="index-div3 index-div">
          <el-col :span="5" class="el-col">
            <label>公司</label>
            <el-input
              v-model="basicData.companyName"
              class="el-inputs"
              size="small"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>部门</label>
            <el-input
              v-model="basicData.branchName"
              size="small"
              class="el-inputs"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>业务员</label>
            <el-input
              size="small"
              v-model="basicData.bizPersonName"
              class="el-inputs"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>出库单号</label>
            <el-input
              size="small"
              v-model="basicData.doNo"
              class="el-inputs"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>外部提单号</label>
            <el-input
              size="small"
              v-model="basicData.externalBlNo"
              disabled
              class="el-inputs"
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>仓库</label>
            <el-input
              size="small"
              v-model="basicData.warehouseName"
              class="el-inputs"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>出库日期</label>
            <el-input
              class="el-inputs"
              v-model="basicData.doDate"
              size="small"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>销售客户</label>
            <el-input
              class="el-inputs"
              v-model="basicData.custName"
              size="small"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>签收日期</label>
            <el-input
              class="el-inputs"
              v-model="basicData.signReceivedDate"
              size="small"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>业务币别</label>
            <el-input
              class="el-inputs"
              v-model="basicData.currencyName"
              size="small"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>业务币汇率</label>
            <el-input
              class="el-inputs"
              v-model="basicData.currencyRate"
              size="small"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
              <label>人民币汇率</label>
              <el-input  class="el-inputs" v-model="basicData.rmbCurrencyRate"   size="small" disabled></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
              <label>统计数量</label>
              <el-input  class="el-inputs" v-model="basicData.sumQty"  size="small" disabled></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
              <label>业务币金额</label>
              <el-input  class="el-inputs" v-model="basicData.sumAmtVat"   size="small" disabled></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
              <label>人民币金额</label>
              <el-input  class="el-inputs" v-model="basicData.payAmtTotalRmb"   size="small" disabled></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>单据状态</label>
            <el-select
              clearable
              size="small"
              class="el-select"
              v-model="basicData.doStatus"
              disabled
            >
              <el-option
                v-for="item in basicData.doStatusList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>销售类型</label>
            <el-select
              clearable
              size="small"
              class="el-select"
              v-model="basicData.contractType"
              disabled
            >
              <el-option
                v-for="item in basicData.contractTypeList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>放货类型</label>
            <el-select
              clearable
              size="small"
              class="el-select"
              v-model="basicData.doType"
              disabled
            >
              <el-option
                v-for="item in basicData.doTypeList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>收件人</label>
            <el-input
              class="el-inputs"
              v-model="basicData.reciver"
              size="small"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>联系方式</label>
            <el-input
              class="el-inputs"
              v-model="basicData.telephone"
              size="small"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>送货地址</label>
            <el-input
              class="el-inputs"
              v-model="basicData.reciverAddress"
              size="small"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>提单有效期</label>
            <el-input
              class="el-inputs"
              v-model="basicData.blTimeline"
              size="small"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
              <label>凭证号</label>
              <el-input v-model="warrantCode"
                        class="el-inputs"
                        size="small"
                        disabled></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
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
            <label>备注</label>
            <el-input
              type="textarea"
              autosize
              rows="2"
              v-model="basicData.remark"
              size="small"
              class="el-textarea"
              disabled
            >
            </el-input>
          </el-col>
          <el-col :span="24" class="el-col-textarea" style="margin-top:0">
            <label>提货人信息</label>
            <el-input
              type="textarea"
              autosize
              rows="2"
              v-model="basicData.blRemark"
              size="small"
              class="el-textarea"
              :disabled="editDisabled"
            >
            </el-input>
          </el-col>
        </div>
        <!-- 表格 -->
        <el-divider></el-divider>
        <div class="el-table-div">
          <!-- 表格 -->
          <el-table
            border
            center
            ref="table"
            :data="basicData.tableData"
            tooltip-effect="dark"
            :row-key="getRowKeys"
            :expand-row-keys="expands"
            @expand-change="expandChange"
            :summary-method="getSummaries"
            show-summary
            class="el-table"
            max-height="320"
            v-loading="loading"
          >
            <el-table-column type="expand">
              <template slot-scope="scope" style=" background-color:#e4e7ed">
                <el-table
                  border
                  center
                  :data="scope.row.batchList"
                  style="width: calc(40% - 47px)"
                  class="two-list"
                  v-loading="batchSplitData.loading"
                >
                  <el-table-column
                    prop="stockinTime"
                    label="入库日期"
                  :show-overflow-tooltip="true" ></el-table-column>
                  <el-table-column
                    prop="batchCode"
                    label="批次号"
                    width="100px"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="packageCode"
                    label="捆包号"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="wvNo"
                    label="入库单号"
                  :show-overflow-tooltip="true" ></el-table-column>
                  <el-table-column
                    prop="itemQty"
                    label="本次出库数量"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="itemUnitName"
                    label="基础单位"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="secQty"
                    label="第二数量"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="secUnitName"
                    label="第二单位"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="stockoutAmt"
                    label="出库成本金额"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column width="50" prop="rowno" label="行号">

            </el-table-column>
            <el-table-column
              prop="contractCode"
              label="销售合同号"
              width="100px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column
              prop="contractRowno"
              label="销售合同行号"
              width="100px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column prop="extContractCode" label="外部合同号" width="120px" :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column prop="dockSoNo" label="码单号" width="120px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="dockRowno" label="码单行号" width="120px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="物料号" prop="goodsCode" :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column prop="goodsName" label="物料名称" :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column prop="categoryShowName" label="物料大类" :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column
              prop="goodsSpec"
              label="物料规格"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column label="是否赠品">
              <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.isFreebie" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="itemUnitName" label="基础单位" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="contractQty" label="订单数量" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="sentQty" label="已发货数量" width="100px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
              prop="haventSentQty"
              label="订单可发数量"
              width="100px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column label="实发数量" prop="itemQty" :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column prop="sheetQty"  label="开单数量" :show-overflow-tooltip="true" ></el-table-column>
            <el-table-column prop="secUnitName" label="第二单位" :show-overflow-tooltip="true" > </el-table-column>
            <el-table-column prop="haventSentSecQty" label="第二数量可发数量" width="120px" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="secQty" label="第二数量" :show-overflow-tooltip="true" > </el-table-column>
            <el-table-column prop="stockoutAmt" label="出库成本金额" width="120px" :show-overflow-tooltip="true" > </el-table-column>

            <el-table-column
              label="业务币含税单价"
              prop="originPrice"
              width="120px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column
              prop="originNoPrice"
              label="业务币不含税单价"
              width="120px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column
              label="业务币含税金额"
              prop="originAmt"

            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column
              prop="originNoAmt"
              label="业务币不含税金额"
              width="120px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column label="增值税率%" prop="taxRate" :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column label="业务币增值税额" prop="taxAmt" :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column
              prop="basePrice"
              label="本币含税单价"
              width="100px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column
              prop="baseNoPrice"
              label="本币不含税单价"
              width="110px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column prop="baseAmt" label="本币含税金额" width="100px" :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column
              prop="baseNoAmt"
              label="本币不含税金额"
              width="110px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column
              prop="baseTax"
              label="本币增值税额"
              width="100px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column
              label="备注"
              width="178px"
              prop="remark"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!--费用预提-->
      <el-tab-pane label="费用预提" name="second">
        <div class="el-table-div">
          <el-table
            :data="costAccruedData.tableData"
            ref="costTable"
            tooltip-effect="dark"
            border
            stripe
            style="width: 100%"
            max-height="320"
          >
            <el-table-column
              label="行号"
              prop="rowno"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column prop="supplierName" label="供应商" align="center" width="110px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column label="费用名称" prop="costName" width="110px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column label="摊销维度" prop="shareDimName" width="110px"
            :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column
              label="业务币费用金额"
              prop="prefetchAmt"
              align="center"
            width="110px"
            :show-overflow-tooltip="true" >
            </el-table-column>
             <el-table-column label="业务币币别" align="center" prop="currencyName" width="110px"
            :show-overflow-tooltip="true" >
            </el-table-column>
             <el-table-column label="本位币汇率" align="center" prop="baseCurrencyRate" >
            </el-table-column>
            <el-table-column label="税率" align="center" prop="taxRate">
            </el-table-column>
            <el-table-column label="无税金额" align="center" prop="costAmt">
            </el-table-column>
            <el-table-column label="税额" align="center" prop="taxAmt">
            </el-table-column>
            <el-table-column  label="本位币费用金额" prop="costAmtVatBase" align="center" width="120px">
            </el-table-column>
            <el-table-column  label="无税金额(本位币)" prop="costAmtBase" align="center" width="120px">
            </el-table-column>
            <el-table-column  label="税额(本位币)" prop="taxAmtBase" align="center" width="120px">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!--打印及附件-->
      <el-tab-pane label="打印及附件" name="third">
        <div class="el-table-div">
           <el-table
            :data="uploadList.tableList"
            ref="table2"
            tooltip-effect="dark"
            border
            stripe
            style="width: 100%"
          >
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
      <!--系统信息-->
      <el-tab-pane
        label="系统信息"
        name="fourth"
        style=" background:#fff;"
      >
        <div class="index-div3" style="padding-bottom:10px">
          <el-col :span="5" class="el-col" style="margin-left:-0.5%">
            <label>创建人</label>
            <el-input
              v-model="systemData.createdName"
              class="el-inputs"
              size="small"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>创建时间</label>
            <el-input
              v-model="systemData.createdTime"
              size="small"
              class="el-inputs"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>修改人</label>
            <el-input
              v-model="systemData.updatedName"
              size="small"
              class="el-inputs"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>修改时间</label>
            <el-input
              v-model="systemData.updatedTime"
              size="small"
              class="el-inputs"
              disabled
            ></el-input>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="流程详情"
                   name="lcxq">
        <div class="input-div input-div-bor bortop0">
          <v-exmineStatus :id="$route.query.id"></v-exmineStatus>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from "vuex";
import sApi from "@/api/salesManage/salesManage";
import uploadApi from "@/api/component";
import ExmineStatus from '@/components/exmineStatus'
import calculation from "@/assets/js/calculation";
export default {
  name: "salesIssueDocDetail",
  components: {
    'v-exmineStatus': ExmineStatus
  },
  data() {
    return {
      //基本信息
      basicData: {
        companyName: "", //公司代码
        branchName: "", //部门代码
        bizPersonName: "", //业务员代码
        currencyCode: "", //业务币别代码
        currencyName:"",
        custName: "", //客户id
        warehouseName: "", //仓库代码
        skuCode: "", //物料号
        contractType: "", //销售类型
        contractTypeList: [], //销售类型下拉数据
        doType: "", //放货类型
        doTypeList: [], //放货下拉数据
        doStatus: "", //单据状态 //创建的时候默认为已保存
        doStatusList: [],
        signReceivedDate: "", //签收日期
        reciverAddress: "", //送货地址
        telephone: "", //联系方式
        reciver: "", //收件人
        blTimeline: "", //提单有效期
        remark: "", //备注
        doDate: "", //出库日期
        currencyRate: "", //汇率
        doNo: "", //出库单号
        tableData: [], //商品明细列表数据
        index: "",
        rmbCurrencyRate:0,//人民币汇率
        payAmtTotalRmb:0,//人民币总金额
        sumAmtVat:'',//业务币总金额
        sumQty:'',//统计数量
        externalBlNo:'',
        blRemark:"",//提货人信息
        version:"",
        doId:"",
      },
      //批次拆分数据
      batchSplitData: {
        categoryCode: "", //物料编号
        categoryName: "", //物料名称
        category: "", //物料大类
        goodsSpec: "", //物料规格
        warehouseName: "", //仓库
        itemQty: 0, //应发数量
        allNum: 0, //累计数量
        multipleSelection: [], //批次拆分选中数据
        batchSplitTableData: [] ,//批次拆分列表数据
        loading:false,
      },
      //费用预提数据
      costAccruedData: {
        tableData: [], //费用预提表格数据
        selectioned: "", //费用预提选中
        supplierShow: false, //供应商
        supplierName: "", //供应商名称
        supplierId: "" ,//供应商id
        shareDimList:[],
      },
       uploadList:{//附件上传
        tableList:[],
      },
      //系统信息
      systemData: {
        createdTime: "", //创建时间
        createdName: "", //创建人
        updatedName: "", //修改人
        updatedTime: "" //修改时间
      },
      loading: false,
      tableList: [],
      activeName: "one", //切换tabs
      expands: [], //只展开一行放入当前行id
      currencyList:[],//业务币别数组
      getRowKeys: row => {
        //获取当前行id
        // console.log(row)
        return row.doItemsId; //这里看这一行中需要根据哪个属性值是id
      },
      type:"",//1详情，3打印修改
      editDisabled:true,
      warrantCode:'',//凭证号
      warrantMonth:'', //期间
      doId:"",
    };
  },
  created() {
    this.doId=sessionStorage.getItem("doId");
    this.getDoStatusList(); //获取单据状态
    this.getDoTypeList(); //获取放货类型
    this.getShareDim();
    this.getContractTypeList(); //获取销售类型
    this.selectCurrency();//获取币种信息
    this.initData();
    this.type=this.$route.query.type;
    if(this.type==3){
      this.editDisabled=false;
    }else{
      this.editDisabled=true;
    }
  },
  methods: {
    //保存提货信息
    saveBlRemark(){
      let data={
        version:this.basicData.version,
        doId:this.basicData.doId,
        blRemark:this.basicData.blRemark
      }
      sApi.sealUpdate(data).then(res=>{
        if(res.code=="success"){
          this.$openSuccess("修改成功");
          this.cancel();
        }
      }).catch();
    },
      //获取摊销维度
    getShareDim() {
      let data = {
        dictNo: 1064
      };
      sApi
        .selectDoStatusList(data)
        .then(res => {
          this.costAccruedData.shareDimList = res.data;
        })
        .catch();
    },
    initData() {
      //获取数据
      this.loading = false;
      let data = {
        doNo: localStorage.getItem("doNo")
      };
      sApi
        .checkSaleOutboundOrder(data)
        .then(res => {
          if ((res.code = "success")) {
            let data = res.data;
            this.basicData.companyName = data.companyName; //公司代码
            this.basicData.bizPersonName = data.bizPersonName; //业务员
            this.basicData.branchName = data.orgName; //部门代码
            this.basicData.doNo = data.doNo; //出库单号
            this.basicData.externalBlNo=data.externalBlNo;
            this.basicData.warehouseName = data.warehouseName; //仓库代码
            this.basicData.doDate = this.$timeFun(data.doDate, true); //出库日期
            this.basicData.custName = data.custName; //客户id
            this.basicData.signReceivedDate = this.$timeFun(
              data.signReceivedDate,
              true
            ); //签收日期
            this.basicData.currencyCode = data.currencyCode; //业务币别
            this.selectCurrencyName();
            this.basicData.contractType = data.contractType + ""; //销售类型
            this.basicData.doType = data.doType + ""; //放货类型
            this.basicData.doStatus = data.doStatus + ""; //单据状态
            this.basicData.reciverAddress = data.reciverAddress; //送货地址
            this.basicData.telephone = data.telephone; //联系方式
            this.basicData.reciver = data.reciver; //收件人
            this.basicData.blTimeline = this.$timeFun(data.blTimeline, true); //提单有效期
            this.basicData.remark = data.remark; //备注
            this.basicData.blRemark=data.blRemark;
            this.basicData.rmbCurrencyRate=data.rmbCurrencyRate;//人民币汇率
            this.basicData.sumAmtVat=data.sumAmtVat;//总金额
            this.basicData.sumQty=data.sumQty;//总数量
            this.basicData.payAmtTotalRmb=data.payAmtTotalRmb;//人民币总金额
            this.basicData.version=data.version;
            this.basicData.doId=data.doId;
            this.warrantCode= data.warrantCode;//凭证号
            this.warrantMonth= data.warrantMonth; //期间

            let list = data.itemsList;
            let currencyRate = data.currencyRate; //汇率
            this.basicData.currencyRate = currencyRate;
            //汇率
            /******
                        1,本币含税单价=业务币含税单价*汇率
                        2,本币不含税单价=业务币不含税单价*汇率
                        3,本币含税金额=业务币含税金额*汇率
                        4,本币不含税金额=业务币不含税金额*汇率
                        5,本币增值税额=业务币增值税额*汇率
                    ******/
            let that = this;
            for (let i = 0; i < list.length; i++) {
              let value = list[i];
              if(value.isFreebie){
                value.isFreebie=true;
              }else{
                value.isFreebie=false;
              }
                let currencyRate=that.basicData.currencyRate;
                // 业务币不含税单价=业务币含税单价÷(1+增值税率）
                value.originNoPrice = this.$unorginPrice(value.originPrice, value.taxRate);
               //销售不含税金额  销售不含税金额=销售含税金额-税额
                value.originNoAmt = this.$unorginAmtCh(value.originAmt, value.taxAmt);
                //本币计算 对应业务币*汇率
                //本币不含税单价 baseNoPrice
                value.baseNoPrice = this.$bbnhsdj(value.originNoPrice,currencyRate);
                //本币不含税金额 baseNoAmt
                value.baseNoAmt = this.$tybbnhsje(value.baseAmt,value.baseTax);
            }
            this.basicData.tableData = list; //商品明细
            this.costAccruedData.tableData = data.prefetchList; //费用预提
            this.costAccruedData.tableData.forEach(e=>{
              this.currencyList.forEach(c=>{
                if(e.currencyCode==c.currencyCode){
                  e.currencyName=c.currencyName;
                }
              });
              this.costAccruedData.shareDimList.forEach(ele => {
                if (ele.dict_code == e.shareDim) {
                  e.shareDimName =
                    ele.dict_value;
                }
              });
            })
            this.selectFileList(data.doId);
            this.systemData.createdTime = that.$timeFun(data.createdTime, true);
            this.systemData.createdName = data.createdName;
            this.systemData.updatedName = data.updatedName;
            this.systemData.updatedTime = that.$timeFun(data.updatedTime, true);
            this.loading = false;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.message,
              type: "error"
            });
            this.loading = false;
          }
        })
        .catch();
    },
     //获取业务币列表
    selectCurrency(){
      sApi.listSimple().then(res => {
          if(res.code=="success"){
             this.currencyList=res.data;
          }
        }).catch();
    },
     //根据业务币别code查询名称
    selectCurrencyName(){
        let data={
          currencyCode:this.basicData.currencyCode
        }
        sApi.selectCurrencyName(data).then(res => {
          if(res.code=="success"){
            if(res.data!=null){
              this.basicData.currencyName =res.data.currencyName;
            }
          }
        }).catch(

        );
    },
     //查询附件
    selectFileList(id){
       let data = {
        businessId:id
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

    //预览
    download(row){
     window.open(row.fileServerAddress);
    },
    //展开
    expandChange(row, rowList) {
      var that = this;
      if (rowList.length) {
        // 只展开一行//说明展开了
        that.expands = [];
        if (row) {
          that.expands.push(row.doItemsId); // 只展开当前行id
        }
        this.getBatchSplitData(row); //这里可以调用接口数据渲染
      } else {
        // 说明收起了
        that.expands = [];
      }
      this.basicData.index = this.basicData.tableData.indexOf(row);
    },
    //根据id查询批次列表
    getBatchSplitData(row) {
      this.batchSplitData.loading=true;
      let id = row.doItemsId;
      let data = {
        odItemsId: id
      };
      sApi.selectListBatchByItemId(data).then(res => {
          if ((res.code = "success")) {
            var list=res.data;
            var th=this;
            list.forEach(ele=>{
              ele.stockinTime=th.$timeFun(ele.stockinTime,true);
            });
            //重新打开该行(加载数据不刷新)
            this.expands=[];
            this.expands.push(row.doItemsId);
            this.basicData.tableData[this.basicData.index].batchList = list;
            this.batchSplitData.loading=false;
          } else {
            this.batchSplitData.loading=false;
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
     //合计,表格合计
    getSummaries(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
            if (index ===0) {
                sums[index] = '合计';
                return;
            }else if (column.property=="contractQty" || column.property=="sentQty" || column.property=="haventSentQty"
            || column.property=="itemQty" || column.property == "sheetQty" || column.property=="secQty" ||
             column.property=="originAmt" || column.property=="originNoAmt"
            || column.property=="taxAmt"  || column.property=="baseAmt"
            || column.property =="haventSentSecQty" || column.property=="baseNoAmt" || column.property=="baseTax"
            || column.property =="stockoutAmt") {
                const values = data.map(item => Number(item[column.property]))
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr)
                    if (!isNaN(value)) {
                        return calculation.accAdd(prev,curr);
                    } else {
                        return prev
                    }
                    }, 0);
                } else {
                    sums[index] ='';
                }
            }else{
                sums[index] = '-'
            }
        });
        return sums;
    },
    //获取单据状态
    getDoStatusList() {
      let data = {
        dictNo: 1045
      };
      sApi
        .selectDoStatusList(data)
        .then(res => {
          this.basicData.doStatusList = res.data;
        })
        .catch();
    },
    //获取放货类型
    getDoTypeList() {
      let data = {
        dictNo: 1028
      };
      sApi
        .selectDoStatusList(data)
        .then(res => {
          this.basicData.doTypeList = res.data;
        })
        .catch();
    },
    //获取销售类型
    getContractTypeList() {
      let data = {
        dictNo:1015
      };
      sApi
        .selectDoStatusList(data)
        .then(res => {
          this.basicData.contractTypeList = res.data;
        })
        .catch();
    },
    //取消
    cancel() {
      this.$router.push({
        //核心语句
        path: "/index/salesManage/salesIssueDoc" //跳转的路径
      });
    },
    //tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style>
   .el-select .el-input__inner,.el-input .el-input__inner{
        font-size: 12px !important;
    }
     .el-select:hover .el-input__inner{
        border-color: #97999e !important;
    }
    .el-input--small .el-input__inner{
            border-color: #97999e !important;
        }

</style>
<style lang="scss" scoped>
.index .index-div{
    label{
        width: 34%;
    }
}
.index .index-div .el-input,.index .index-div .el-select{
    width: 66%;
}
 .index .el-col-textarea{
      label{
        width:7.31%;
      }
    }
</style>
