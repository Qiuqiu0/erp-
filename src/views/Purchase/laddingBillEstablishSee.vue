<template>
  <div class="laddingBillEstablishSee">
    <el-divider></el-divider>
    <div class="button-div">
      <el-button class="query-button"
                 v-if="type!=5"
                 icon="el-icon-suitcase"
                 @click="addSub">保存</el-button>
      <el-button v-else-if="type==5&&ladingStatus==10110010"
                 class="query-button"
                 icon="el-icon-ship"
                 @click="ArrivalPortSave(2)">生成到港</el-button>
      <el-button v-else-if="type==5&&ladingStatus==10110013"
                 class="query-button"
                 icon="el-icon-finished"
                 @click="addSubs()">提交</el-button>
      <el-button v-else-if="type==5&&ladingStatus==10110015"
                 class="query-button"
                 icon="el-icon-thumb"
                 @click="approval()">用印审批</el-button>
      <!-- <el-button v-if="type==5&&ladingStatus==10110010" class="query-button" @click="addSub(2)">提交</el-button> -->
      <el-button v-else-if="type==5&&ladingStatus==10110020"
                 class="query-button"
                 icon="el-icon-ship"
                 @click="ArrivalPortSave(3)">生成清关</el-button>
      <el-button v-if="type==5&&ladingStatus!=10110030"
                 class="query-button"
                 icon="el-icon-edit"
                 @click="changeData()">修改</el-button>
      <el-button v-if="type==5"
                 icon="el-icon-back"
                 @click="goBack">返回</el-button>
    </div>
    <!-- tab标签 -->
    <el-tabs class="el-tabs"
             v-model="activeName2"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="基本信息"
                   name="first"
                   :disabled="tabpane">
        <div class="index-div3">
          <el-col :span="5"
                  class="el-col">
            <label>系统提单号</label>
            <el-input v-model="formList.sysBlNo"
                      :disabled="true"
                      class="el-inputs"
                      placeholder="请选择"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>合同采购号</label>
            <el-input v-model="formList.contractNo"
                      :disabled="true"
                      class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>外部合同号</label>
            <el-input v-model="formList.extCode"
                      :disabled="true"
                      class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>供应商</label>
            <el-input v-model="formList.supplierName"
                      :disabled="true"
                      class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>公司</label>
            <el-input v-model="formList.companyName"
                      :disabled="true"
                      class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>部门</label>
            <el-input v-model="formList.orgName"
                      class="el-inputs"
                      :disabled="true"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>业务员</label>
            <el-input v-model="formList.bizPersion"
                      :disabled="true"
                      class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>合同类型</label>
            <el-input v-model="formList.poType"
                      :disabled="true"
                      class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label>单据状态</label>
            <el-select v-model="formList.blStatus"
                       :disabled="true"
                       @change="handleChange">
              <el-option v-for="item in blStatus"
                         :key="item.value"
                         :label="item.dict_value"
                         :value="item.dict_code">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <label>预计到港日</label>
            <el-date-picker v-model="predictArrivedDate"
                            :disabled="true"
                            type="date"
                            size="small"
                            class="el-input2"
                            placeholder="选择日期">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>免箱期限</label>
            <el-input v-model="formList.unboxLimit"
                      class="el-inputs"
                      :disabled="true"></el-input>
          </el-col>
          <el-col :span="5">
            <label>交货期限</label>
            <el-date-picker class="el-input2"
                            v-model="delivery"
                            type="daterange"
                            size="mini"
                            :disabled="true"
                            :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>贸易国别</label>
            <el-input v-model="formList.tradeCountryName"
                      :disabled="true"
                      class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>业务币币别</label>
            <el-input v-model="formList.currencyCode"
                      :disabled="true"
                      class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>本位币汇率</label>
            <el-input v-model="formList.currencyRate"
                      :disabled="true"
                      class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>提单金额</label>
            <el-input v-model="sumOriginAmt"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>人民币汇率</label>
            <el-input v-model="formList.rmbCurrencyRate"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
          </el-col>
           <el-col :span="5"
                  class="el-col">
            <label>人民币金额</label>
            <el-input v-model="formList.payAmtTotalRmb"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col v-if="examineValue=='2'"
                  :span="24"
                  class="el-col">
            <label style="vertical-align:top">驳回原因</label>
            <el-input type="textarea"
                      autosize
                      v-model="auditInfo"
                      size="small"
                      class="el-textarea"
                      placeholder="请输入内容">
            </el-input>
          </el-col>
          <el-col :span="24"
                  class="el-col el-full"
                  style="margin-top：10px">
            <label style="width:6.6%;vertical-align: 8px;">备注</label>
            <el-input type="textarea"
                      autosize
                      v-model="formList.remark"
                      size="small"
                      class="el-textarea"
                      disabled>
            </el-input>
          </el-col>
        </div>
        <div class="button-div">
          <el-button @click="addRow"
                     :disabled="true">新增行</el-button>
          <el-button @click="delData"
                     :disabled="true">删除行</el-button>
        </div>
        <div class="el-table-div">
          <el-table border
                    center
                    :data="tableData"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    ref="table"
                    @selection-change='selectRow'
                    @select-all="dialogCheck"
                    @select="dialogCheck"
                    v-loading="loading">
            <el-table-column type="selection"
                             width="45"
                             align="center"></el-table-column>
            <el-table-column label="行号"
                             prop="blRowno"
                             width="60"
                             align="center"></el-table-column>
            <el-table-column prop="contractNo"
                             label="采购合同号"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="extCode"
                             label="外部合同号"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="goodsCode"
                             label="物料编号"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="goodsName"
                             label="物料名称"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="goodsCategoryName"
                             label="物料大类"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="goodsSpec"
                             label="物料规格"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <!-- <el-table-column prop="gwBoxNo"
                             label="海关编码"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column> -->
            <el-table-column prop="itemUnitName"
                             label="基础单位"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="arrivedQty"
                             label="到货数量"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="originPrice"
                             label="业务币含税单价"
                             width="120"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="originAmt"
                             label="业务币含税金额"
                             width="120"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="unorginAmt"
                             label="业务币不含税金额"
                             width="120"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="taxRate"
                             label="增值税率%"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="taxAmt"
                             label="业务币增值税额"
                             width="120"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="basePrice"
                             label="本币含税单价"
                             width="120"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="baseAmt"
                             label="本币含税金额"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="baseNoAmt"
                             label="本币不含税金额"
                             width="120"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="baseTax"
                             label="本币增值税额"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="secUnitName"
                             label="第二单位"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="secQty"
                             label="第二数量"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="remark"
                             label="备注"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
          </el-table>
          <!--审核弹窗 开始-->
          <el-dialog :visible.sync="examineShow"
                     :show-close="false"
                     title="审核"
                     width="400px"
                     class="popup_box">
            <div class="examine-dialog">
              <p v-if="!examineOne && examineValue=='1'"
                 class="tips">
                <i class="el-icon-info"></i>
                批量审核时提单日期以提单中提单日期为准，请事先确认，谨慎操作！
              </p>
              <el-col :span="24"
                      class="el-col">
                <label>审核</label>
                <el-select clearable
                           size="small"
                           class="el-select"
                           @change="examineSelect"
                           v-model="examineValue"
                           placeholder="请选择">
                  <el-option v-for="item in examineList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col v-if="examineValue=='2'"
                      :span="24"
                      class="el-col">
                <label style="vertical-align:top">驳回原因</label>
                <el-input type="textarea"
                          autosize
                          v-model="auditInfo"
                          size="small"
                          class="el-textarea"
                          placeholder="请输入内容">
                </el-input>
              </el-col>
            </div>
            <div class="button-div2">
              <el-button @click="examineSure"
                         icon="el-icon-check">确定</el-button>
              <el-button @click="examineCancle"
                         icon="el-icon-close">取消</el-button>
            </div>
          </el-dialog>
          <!--审核弹窗 结束-->
        </div>

      </el-tab-pane>
      <el-tab-pane label="运输信息"
                   name="second"
                   :disabled="tabpane">
        <div class="index-div3">
          <el-col :span="5"
                  class="el-colc">
            <label>最迟交期</label>
            <el-date-picker v-model="formList.deliveryCutoffDate"
                            type="date"
                            size="small"
                            :disabled="true"
                            placeholder="选择日期">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label><span class="must-full">*</span>价格条款</label>
            <el-select v-model="formList.priceTem"
                       placeholder="请选择"
                       size="small"
                       @change="priceTemChange"
                       disabled>
              <el-option v-for="item in priceTemList"
                         :key="item.value"
                         :label="item.dict_value"
                         :value="item.dict_code">
              </el-option>
            </el-select>
          </el-col>
          <!-- <el-col :span="5"
                  class="el-col">
            <label class="labelstyle">到达港口</label>
            <el-input v-model="formList.arrivedPort"
                      :disabled="true"
                      class="el-inputs"
                      placeholder="请选择"></el-input>
          </el-col> -->
          <el-col :span="5"
                  class="el-col">
            <label class="labelstyle">运输方式</label>
            <el-select v-model="formList.transMode"
                       :disabled="true"
                       placeholder="请选择"
                       @change="handleChange">
              <el-option v-for="item in transMode"
                         :key="item.value"
                         :label="item.dict_value"
                         :value="item.dict_code">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label><span class="must-full">*</span>船运方式</label>
            <el-select v-model="formList.shipMode"
                       placeholder="请选择"
                       size="small"
                       @change="handleshipChange"
                       disabled>
              <el-option v-for="item in shipModeList"
                         :key="item.value"
                         :label="item.dict_value"
                         :value="item.dict_code">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-col texcen">
            <el-checkbox v-model="isTransfered"
                      label="isTransfered" disabled>转船</el-checkbox>
            <el-checkbox v-model="isBatched"
                      label="isBatched" disabled>分批</el-checkbox>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>装货港</label>
            <el-input v-model="formList.loadingPort"
                      :disabled="true"
                      class="el-inputs"
                      placeholder="请选择"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>卸货港</label>
            <el-input v-model="formList.unloadingPort"
                      :disabled="true"
                      class="el-inputs"
                      placeholder="请选择"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>目的地</label>
            <el-input v-model="formList.destination"
                      :disabled="true"
                      class="el-inputs"
                      placeholder="请选择"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>船名</label>
            <el-input v-model="formList.shipName"
                      :disabled="true"
                      class="el-inputs"
                      ></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>船舶识别号</label>
            <el-input v-model="formList.shipNo"
                      :disabled="true"
                      class="el-inputs"
                      ></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>装卸时间</label>
            <el-select v-model="loadTimeType"
                       placeholder="请选择"
                       disabled>
              <el-option v-for="item in zxsjList"
                         :key="item.dict_code"
                         :label="item.dict_value"
                         :value="item.dict_code">
              </el-option>
            </el-select>
          </el-col>
        </div>
        <el-divider></el-divider>
        <div class="el-table-div">
          <el-table border
                    center
                    :data="tableDatas"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    ref="table"
                    @selection-change='selectRow'
                    @select-all="dialogCheck"
                    @select="dialogCheck"
                    v-loading="loading">
            <el-table-column type="selection"
                             width="45"
                             align="center"></el-table-column>
            <el-table-column label="序号"
                             type="index"
                             width="60"
                             align="center"></el-table-column>
            <el-table-column label="出厂运输方式"
                             prop="leaveTransferMode"
                             :show-overflow-tooltip="true">
              <!-- <template slot-scope="scope">
                  <div>
                      <span v-for="(item,index) in transModeList"
                        v-show="item.dict_code==scope.row.leaveTransferMode"
                        :key="index">{{item.dict_value}}</span>
                  </div>
                </template> -->
            </el-table-column>
            <el-table-column label="目的地"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.transferTarget"
                            disabled></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferTarget }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="transferPlanMan"
                             label="承运方"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="transferExcutor"
                             label="承运人"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="transferExcutorTel"
                             label="承运联系方式"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="transferNote"
                             label="备注"
                             :show-overflow-tooltip="true">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="业务进程"
                   name="third">
        <div class="table_title">到单</div>
        <div class="el-table-div">
          <el-table border
                    center
                    :data="ToSingle"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    ref="table"
                    @selection-change='selectRow'
                    @select-all="dialogCheck"
                    @select="dialogCheck"
                    v-loading="loading">
            <el-table-column type="selection"
                             width="45"
                             align="center"></el-table-column>
            <el-table-column label="序号"
                             type="index"
                             width="60"
                             align="center"></el-table-column>
            <el-table-column prop="bizBlNo"
                             label="提单号"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="blType"
                             label="提单类型"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="blDate"
                             label="提单日期"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="blSender"
                             label="提单发货人"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="counterNo"
                             label="柜号"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="blQty"
                             label="提单数量"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="infoArrivedRemark"
                             label="备注"
                             :show-overflow-tooltip="true">
            </el-table-column>
          </el-table>
        </div>
        <div class="table_title">到港</div>
        <div class="el-table-div">
          <el-table border
                    center
                    :data="ArrivalPortList"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    ref="table"
                    @selection-change='selectRow'
                    @select-all="dialogCheck"
                    @select="dialogCheck"
                    v-loading="loading">
            <el-table-column type="selection"
                             width="45"
                             align="center"></el-table-column>
            <el-table-column label="序号"
                             type="index"
                             width="60"
                             align="center"></el-table-column>
            <el-table-column prop="goodsProxyCompany"
                             label="货代公司"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="unloadPort"
                             label="卸货港"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="arrivedInfoDate"
                             label="到单寄出日"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="actArrivedDate"
                             label="实际到港日期"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="goodsArrivedRemark"
                             label="备注"
                             :show-overflow-tooltip="true">
            </el-table-column>
          </el-table>
        </div>
        <div class="table_title">清关</div>
        <div class="el-table-div">
          <el-table border
                    center
                    :data="CustomsClearance"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    ref="table"
                    @selection-change='selectRow'
                    @select-all="dialogCheck"
                    @select="dialogCheck"
                    v-loading="loading">
            <el-table-column type="selection"
                             width="45"
                             align="center"></el-table-column>
            <el-table-column label="序号"
                             type="index"
                             width="60"
                             align="center"></el-table-column>
            <el-table-column prop="gwDate"
                             label="报关日期"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="gwCode"
                             label="报关单号"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="freeCounterDays"
                             label="免柜天数"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="freeCounterDate"
                             label="免柜日期"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="clearanceArrivedRemark"
                             label="备注"
                             :show-overflow-tooltip="true">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="打印及附件"
                   name="fifth">
        <!-- <div class="flex_center">
          <div class="button-div">
            <el-button class="query-button olbutton">附件存档</el-button>
            <span>文件上传上限20M</span>
          </div>
        </div> -->
        <div class="">
          <el-table border
                    center
                    :data="tableDataw"
                    class="el-table">
            <el-table-column type="index"
                             label="序号">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="fileOldName"
                             label="文件名称">
            </el-table-column>
            <!-- <el-table-column show-overflow-tooltip
                             prop="paritiesDate"
                             label="类型">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="paritiesDate"
                             label="文档类型名称">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="paritiesDate"
                             label="签章情况">
            </el-table-column> -->
            <el-table-column show-overflow-tooltip
                             prop="createdTime"
                             label="上传时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="createdName"
                             label="上传人">
            </el-table-column>
            <el-table-column prop="paritiesDate"
                             label="文件操作">
              <template slot-scope="scope">
                <el-button @click="handleClickE(scope.row)"
                           type="text"
                           size="small">下载</el-button>
                <!-- <el-button @click="handleClick(scope.row)"
                           type="text"
                           size="small">删除</el-button> -->
                <!-- <el-button @click="handleClick(scope.row)"
                           type="text"
                           size="small">预览</el-button>
                <el-button @click="handleClick(scope.row)"
                           type="text"
                           size="small">打印</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统信息"
                   name="sixth">
        <div class="input-div input-div-bor bortop0">
          <el-divider></el-divider>
          <el-col :span="5"
                  class="el-col">
            <label>创建人</label>
            <el-input v-model="formList.createdName"
                      :disabled="true"
                      class="el-inputs"
                      placeholder="请选择"></el-input>
          </el-col>
          <el-col :span="6"
                  class="el-col">
            <label>创建时间</label>
            <el-date-picker v-model="formList.createdTime"
                            :disabled="true"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>修改人</label>
            <el-input v-model="formList.updatedName"
                      :disabled="true"
                      class="el-inputs"
                      placeholder="请选择"></el-input>
          </el-col>
          <el-col :span="6"
                  class="el-col">
            <label>修改时间</label>
            <el-date-picker v-model="formList.updatedTime"
                            :disabled="true"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="流程详情"
                   name="lcxq">
        <div class="input-div input-div-bor bortop0">
          <v-exmineStatus :id="billId"></v-exmineStatus>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import api from "@/api/ladingBill/ladingBill";
import ExmineStatus from '@/components/exmineStatus'
import uploadApi from "@/api/component";
export default {
  name: 'laddingBillEstablishSee',
  data () {
    return {
      activeName2: "first", //标签页
      companyName: '',
      tableData: [],
      tableDataw: [],
      tableDatas: [],
      transModeList: [],
      branchName: '', //部门
      orgName: '',
      staffName: '',
      projectCode: '',
      propertiesStatusList: [],
      loading: false, //表格loading
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      isBatched:false,//是否分批
      isTransfered:false,//是否转船
      radio: '',
      formList: {
        rmbCurrencyRate: 0,
        payAmtTotalRmb: 0,
      },
      sumOriginAmt: 0,
      blStatus: [],
      value2: '',
      predictArrivedDate: '',
      deliveryBegindate: '',
      delivery: {},
      ToSingle: [],
      CustomsClearance: [],
      ArrivalPortList: [],
      loadTimeType: '',
      zxsjList: [], //装卸时间列表
      priceTemList: [], //价格条款
      shipModeList: [], //船运方式
      type: '',
      currSel: [{
        value: '0',
        label: '空运提单'
      }, {
        value: '1',
        label: '海运提单'
      }],
      tabpane: false,
      ladingStatus: '',
      transMode: [],
      Examine: "",//审核
      postDate: "",//审核日期
      examineShow: false,//审核弹窗
      examineOne: true,//审核单条还是多条
      examineValue: '',//审核选中的值
      examineList: [
        { value: "1", label: "通过" },
        { value: "2", label: "驳回" },
      ],
      examineDate: '',//审核弹窗里的出库日期
      auditInfo: '',//驳回原因
      pickerOptions: {},//时间范围
      billId:'',//id
    }
  },
  components: {
    'v-exmineStatus': ExmineStatus
  },
  created () {
    this.billId=localStorage.getItem("id");
    this.type = this.$route.query.type;
    if (this.type == 2) {
      this.activeName2 = "third"
      this.tabpane = true
    } else {
      this.activeName2 = "first"
    }
    //   if(this.ladingStatus=10110013){
    //      this.tabpane1 =true
    // }
    if (localStorage.getItem("id")) {
      this.specificationId = localStorage.getItem("id");
      this.changeMessage();//修改初始化
    }
    this.selectList()
    this.transList()
    this.zxsjListData()
    this.priceTemData()
    this.shipModeListData()
    this.handleChange()
  },
  methods: {
    //修改的详情
    changeMessage () {
      if (localStorage.getItem("id")) {
        this.blId = localStorage.getItem("id");
      }
      let params = {
        blId: this.blId
      }
      api.odBlDetail(params).then(res => {
        if (res.code == 'success') {
          this.loadTimeType = res.data.loadTimeType && res.data.loadTimeType.toString(); //装卸时间
          res.data.odBlItemsList.forEach((item, index) => {
            item.blRowno = (index + 1) * 10;
          });
          this.formList = res.data
          this.formList.rmbCurrencyRate = res.data.rmbCurrencyRate;
          this.tableData = res.data.odBlItemsList
          let list = res.data.odBlItemsList;
          list.forEach(element => {
            //业务币不含税金额
            element.unorginAmt = this.$unorginAmt(
              element.originAmt,
              element.taxRate,
              "div",
              1
            );
            this.sumOriginAmt += element.originAmt //提单金额
            list.forEach(element => {
              element.baseNoAmt = this.$bbnhsje(element.unorginAmt, this.formList.currencyRate);
            })
          });
          this.tableDatas = res.data.odBlCtiPathsList
          this.formList.bizPersion = res.data.bizPersonName
          this.projectCode = res.data.projectCode
          if (res.data.poType == 10140010) {
            this.formList.poType = "进口采购"
          } else if(res.data.poType==10140020){
            this.formList.poType = "出口采购"
          }else if(res.data.poType==10140025){
            this.formList.poType = "转口采购"
          }
          this.formList.blStatus += "" //单据状态
          if (this.formList.poType) {
            this.formList.poType += "" //合同类型
          }
          this.ToSingle.push(res.data)
          console.log('12q', res.data)
          this.ToSingle.forEach(item => {
            item.blDate = this.$timeFun(item.blDate, 1);
            if (item.blType == 0) {
              item.blType = "空运提单"
            } else if (item.blType == 1) {
              item.blType = "海运提单"
            }
          })
          this.CustomsClearance.push(res.data)
          this.CustomsClearance.forEach(item => {
            item.gwDate = this.$timeFun(item.gwDate, 1);
            item.freeCounterDate = this.$timeFun(item.freeCounterDate, 1);
          })
          this.ArrivalPortList.push(res.data)
          this.ArrivalPortList.forEach(item => {
            item.arrivedInfoDate = this.$timeFun(item.arrivedInfoDate, 1);
            item.actArrivedDate = this.$timeFun(item.actArrivedDate, 1);
          })
          this.predictArrivedDate = res.data.predictArrivedDate
          if (res.data.deliveryBegindate != null && res.data.deliveryEnddate != null) {//交货期限
            this.delivery = [res.data.deliveryBegindate, res.data.deliveryEnddate];
          } else {
            this.delivery = [];
          }
          this.formList.priceTem = res.data.priceTem && res.data.priceTem.toString(); //价格条款
          this.formList.shipMode = res.data.shipMode && res.data.shipMode.toString(); //船运方式
          this.formList.transMode = res.data.transMode && res.data.transMode.toString(); //运输方式
          this.ladingStatus = res.data.blStatus
          if (res.data.isInactive == 0) {
            this.isInactive = false;
          } else {
            this.isInactive = true;
          }
          // this.formList.radio =
          //   res.data.isTransfered == 1 ? "isTransfered" : "isBatched"; //是否转船
          this.isTransfered=res.data.isTransfered== 1 ?true : false;//是否转船
          this.isBatched=res.data.isBatched== 1 ?true : false;//是否分批
          this.selectFileList(res.data.blId);//查询附件

        } else {
          this.$message({
            duration: 1000,
            showClose: true,
            message: '保存失败',
            type: 'error'
          });
        }

      }).catch();
    },
      //查询附件
    selectFileList(id){
       let data = {
        businessId:id
      };
      uploadApi.selectFileList(data)
        .then(res => {
          if (res.code == "success") {
            this.tableDataw=res.data;
             this.tableDataw.forEach(element => {
               element.createdTime=this.$timeFun(element.createdTime, true);
            });
          } else {
            this.$openWarning(res.message);
          }
        }).catch();
    },
    handleChange (val) {
      this.formList.blStatus = val
    },
    //单据状态下拉
    selectList () {
      let params = {
        dictNo: "1011"
      }
      api.select(params).then(res => {
        if (res.code == 'success') {
          this.blStatus = res.data
          this.blStatus.forEach(item => {
            if (this.formList.blStatus == item.dict_code) {
              // this.formList.blStatus = item.dict_value
              console.log('12', this.formList.blStatus)
            }
          })
        } else {
          this.$message({
            duration: 1000,
            showClose: true,
            message: '保存失败',
            type: 'error'
          });
        }

      }).catch();
    },
    //价格条款
    priceTemData () {
      let params = {
        dictNo: "1016"
      };
      api
        .select(params)
        .then(res => {
          if (res.code == "success") {
            this.priceTemList = res.data;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "保存失败",
              type: "error"
            });
          }
        })
        .catch();
    },
    //船运方式下拉
    shipModeListData () {
      let params = {
        dictNo: "1019"
      };
      api
        .select(params)
        .then(res => {
          if (res.code == "success") {
            this.shipModeList = res.data;
            this.blStatus.forEach(item => {
              if (this.formList.blStatus == item.dict_code) {
                // this.formList.blStatus = item.dict_value
              }
            });
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "保存失败",
              type: "error"
            });
          }
        })
        .catch();
    },
    transList () {
      let params = {
        dictNo: "1017"
      }
      api.select(params).then(res => {
        if (res.code == 'success') {
          this.transMode = res.data
        } else {
          this.$message({
            duration: 1000,
            showClose: true,
            message: '保存失败',
            type: 'error'
          });
        }

      }).catch();
    },
    //审核下拉选中的值
    examineSelect (e) {
      this.examineValue = e;//审核选中的值
    },
    //船运方式
    handleshipChange (val) {
      this.formList.shipMode = val;
    },
    //价格条款
    priceTemChange (val) {
      this.formList.priceTem = val;
    },
    //修改
    changeData () {
      if (localStorage.getItem("id")) {
        this.blId = localStorage.getItem("id");
      }
      localStorage.setItem("id", this.blId);
      this.$router.push({
        //核心语句
        path: "/index/Purchase/ladingBillEstablish" //跳转的路径
      });
    },
    //提交(只能对已到港的发起审批)
    addSubs () {
      if (localStorage.getItem("id")) {
        this.blId = localStorage.getItem("id");
      }
      let params = {
        blId: this.blId
      };
      api
        .sealApprove(params)
        .then(res => {
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.data,
              type: "success"
            })
            this.$router.push({  //核心语句
              path: '/index/Purchase/ladingBill',   //跳转的路径
            })
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "调用失败",
              type: "error"
            });
          }
        })
        .catch();
    },
    zxsjListData () {
      let params = {
        dictNo: "1018"
      };
      api
        .select(params)
        .then(res => {
          if (res.code == "success") {
            this.zxsjList = res.data;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "保存失败",
              type: "error"
            });
          }
        })
        .catch();
    },
    //月结
    approval () {
      this.examineShow = true;
      let data = {
        companyId: this.formList.companyId
      };
      api.getAccountPeriodByCompany(data).then(res => {
        if (res.code == "success") {

          this.$nextTick(() => {
            this.pickerOptions = {
              disabledDate (time) {
                return res.data.enddate < time.getTime() || time.getTime() < res.data.begindate;
              }
            }

          })
        } else {
          this.$openWarning(res.message);
        }
      }).catch();
    },
    //确定
    examineSure () {
      if (this.examineValue == "2") {
        if (this.auditInfo) {
          var auditInfo = this.auditInfo
        }
      } else {
        this.examineDate = '';
      }
      var list = [];
      let params = {};
      params.blId = this.formList.blId,
        params.version = this.formList.version,
        params.approveStatus = this.examineValue,
        params.auditInfo = auditInfo,
        list.push(params);
      api
        .executeApprove(list)
        .then(res => {
          this.examineShow = false;
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.data,
              type: "success"
            });
            this.$router.push({  //核心语句
              path: '/index/Purchase/ladingBill',   //跳转的路径
            })
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "调用失败",
              type: "error"
            });
          }
        })
        .catch();
    },
    //取消
    examineCancle () {
      this.examineShow = false;//审核弹窗
      this.examineValue = '';////审核选中的值
      this.examineDate = '';//审核中的出库日期
    },
    //生成到港保存
    saveData () {
      let odBlForm = this.formList
      api.updateBlArrivalPort(odBlForm).then(res => {
        if (res.code == 'success') {
          this.$message({
            duration: 1000,
            showClose: true,
            message: res.data,
            type: 'success'
          });
          this.$router.push({  //核心语句
            path: '/index/Purchase/ladingBill',   //跳转的路径
          })
        } else {
          this.$message({
            duration: 1000,
            showClose: true,
            message: '保存失败',
            type: 'error'
          });
        }

      }).catch();
    },

    //保存
    addSub () {
      let odBlForm = this.formList
      api.insertOrUpdateOdBl(odBlForm).then(res => {
        if (res.code == 'success') {
          this.$message({
            duration: 1000,
            showClose: true,
            message: res.data,
            type: 'success'
          });
          this.$router.push({  //核心语句
            path: '/index/Purchase/ladingBill',   //跳转的路径
          })
        } else {
          this.$message({
            duration: 1000,
            showClose: true,
            message: '保存失败',
            type: 'error'
          });
        }

      }).catch();

    },
    //生成清关保存
    addData () {
      let odBlForm = this.formList
      api.updateBlCustomsClearance(odBlForm).then(res => {
        if (res.code == 'success') {
          this.$message({
            duration: 1000,
            showClose: true,
            message: res.data,
            type: 'success'
          });
          this.$router.push({  //核心语句
            path: '/index/Purchase/ladingBill',   //跳转的路径
          })
        } else {
          this.$message({
            duration: 1000,
            showClose: true,
            message: '保存失败',
            type: 'error'
          });
        }

      }).catch();
    },
    //生成到港
    ArrivalPortSave (type) {
      let url = "";
      if (type == 3) {
        url = "/index/Purchase/ladingBillEstablish";
      } else if (type == 2) {
        url = "/index/Purchase/ladingBillEstablish";
      }
      this.$router.push({
        //核心语句
        path: url, //跳转的路径
        query: { type: 2 }
      });

    },
    //取消
    goBack () {
      this.$router.push({  //核心语句
        path: '/index/Purchase/ladingBill',   //跳转的路径
      })
    },
    handleClick (e) { },
    handleClickE(row){
       window.open(row.fileServerAddress);
    },
    // 获取表格选中时的数据
    selectRow (e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    addRow () {
      this.tableData.forEach(item => {
        item.edit = false;
      });
      var list = {
        edit: true,
      }
      this.tableData.unshift(list);

    },
    delData () {

    },
    dialogCheck (selection, row) {
      this.$refs.table.clearSelection();
      if (selection.length === 0) {  // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.tableData.indexOf(row)
        this.$refs.table.toggleRowSelection(row, true);
      }
    },
    //分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.queryData();
    },
    handleCurrentChange (val) {
      this.pageNum = val;
      this.queryData();
    },
  },
}
</script>
<style scoped lang="scss">
// .laddingBillEstablishSee{
//     .el-input2{
//         height: 32px;
//         width: 73%;
//     }

//   .el-table-div{
//     background: #fff;
//     padding-bottom: 10px;
//     min-height:auto;
//   }
//    .table_titlestr {
//     font-size: 12px;
//   }
//   .table_title {
//     font-weight: bold;
//     font-size: 16px;
//   }
//   .index .ladingblock button {
//     height: 32px;
//     font-size: 12px;
//     line-height: 9px;
//     font-weight: 400;
//     text-align: center;
//     background: #fff;
//     border: 1px solid #31478F;
//     color: #31478F;
//     width:85px;
// }
// .el-col-7 {
//     width: 29.16667%;
// }
// .el-input1{
//   width:77%;
//   height:30px;
// }
// .custom-31478F .el-date-editor.el-input{
//   width:180px;
// }
// .input-div label {
//     font-size: 12px;
//     color: #333;
//     display: inline-block;
//     margin-right: 10px;
// }
// }
</style>
