<template>
  <div class="warehousingDetailsSee">
    <div class="button-div">
      <el-button @click="goBack"
                 icon="el-icon-back">返回</el-button>
      <!-- <el-button class="query-button"
                 v-else-if="type == 7 && wvStatus == 10480005"
                 @click="changeSub()">修改</el-button>
      <el-button class="query-button"
                 style="width:70px"
                 v-if="type == 7 && wvStatus == 10480005 && wvType == 10620005"
                 @click="approval()">供应商发货</el-button>
      <el-button class="query-button"
                 style="width:70px"
                 v-if="type == 7 && wvStatus == 10480010 && wvType == 10620005"
                 @click="Confirmation()">入库确认</el-button>
      <el-button class="query-button"
                 style="width:70px"
                 v-if="type == 7 && wvStatus == 10480010 && wvType == 10620005"
                 @click="changeSub()">修改</el-button>
      <el-button class="query-button"
                 v-if="type == 7 && wvStatus == 10480005 && wvType == 10620010"
                 @click="addSub()">提交</el-button>
      <el-button class="query-button"
                 v-if="type == 7 && wvStatus == 10480015 && wvType == 10620010"
                 @click="toExamine()">审核</el-button> -->
      <!-- <el-button v-if="type == 7"
                 @click="goBack">返回</el-button> -->
    </div>
    <!-- tab标签 -->
    <el-tabs class="el-tabs"
             v-model="activeName2"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="基本信息"
                   name="first"
                   :disabled="tabpane">
        <div class="input-div input-div-bor">
          <div>
            <el-col :span="5"
                    class="el-col">
              <label>入库单号</label>
              <el-input v-model="formList.wvNo"
                        class="el-inputs"
                        disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>公司</label>
              <el-input v-model="formList.companyName"
                        class="el-inputs"
                        disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>部门</label>
              <el-input v-model="formList.orgName"
                        class="el-inputs"
                        disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>业务员</label>
              <el-input v-model="formList.bizPersonName"
                        class="el-inputs"
                        disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>合同类型</label>
              <el-select v-model="formList.poType"
                         disabled>
                <el-option v-for="item in conTypeList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>供应商</label>
              <el-input v-model="formList.supplierName"
                        class="el-inputs"
                        disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-colc">
              <label>单据状态</label>
              <el-select v-model="formList.bldoStatus"
                         disabled>
                <el-option v-for="item in blStatusList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5"
                    class="el-colc">
              <label>入库单类型</label>
              <el-select v-model="formList.wvdoStatus"
                         @change="wvhandleChange"
                         disabled>
                <el-option v-for="item in wvStatusList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>仓库</label>
              <el-input v-model="warehouseName.warehouseName"
                        size="small"
                        class="el-inputs"
                        disabled></el-input>
              <span class="comicon"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>入库日期</label>
              <el-date-picker v-model="formList.postDate"
                              type="date"
                              disabled>
              </el-date-picker>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>业务币币别</label>
              <el-input v-model="formList.currencyName"
                        class="el-inputs"
                        disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>本位币汇率</label>
              <el-input v-model="formList.currencyRate"
                        class="el-inputs"
                        disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>入库数量</label>
              <el-input v-model="formList.actReceive"
                        class="el-inputs"
                        disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>含税金额</label>
              <el-input v-model="formList.totalOrginAmtTax"
                        class="el-inputs"
                        disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label><span class="must-full">*</span>RMB汇率</label>
              <el-input v-model="formList.rmbCurrencyRate"
                        class="el-inputs"
                        size="small"
                        disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label><span class="must-full">*</span>RMB金额</label>
              <el-input v-model="formList.payAmtTotalRmb"
                        class="el-inputs"
                        size="small"
                        v-input-filter:num2
                        disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-colc">
              <label>完全开票</label>
              <el-select v-model="formList.isBilled"
                         @change="handleIsbilled"
                         disabled>
                <el-option v-for="item in isBilledList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key"
                           disabled>
                </el-option>
              </el-select>
            </el-col>

            <el-col :span="5"
                    class="el-colc">
              <label>提货方式</label>
              <el-select v-model="formList.pickupType"
                         @change="handlePickup"
                         placeholder=""
                         disabled>
                <el-option v-for="item in pickupstatus"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key"
                           disabled>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5"
                  class="el-colc">
            <label>是否退货冲销</label>
             <el-input v-model="formList.unwvReverse"
                      class="el-inputs"
                      size="small"
                          disabled></el-input> 
            </el-col>
            <el-col :span="5"
                  class="el-colc">
            <label>船名</label>
             <el-input v-model="formList.shipName"
                      class="el-inputs"
                      size="small"
                      disabled></el-input> 
           </el-col>
            <el-col :span="5"
                    class="el-col">
                <label>凭证号</label>
                <el-input v-model="warrantCode"
                          class="el-inputs"
                          size="small"
                          disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
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
            <div class="remark-style">
              <label>备注 </label>
              <el-input type="textarea"
                        style="border-color:#97999e"
                        autosize
                        v-model="formList.remark"
                        size="small"
                        class="el-textarea"
                        disabled
                        resize="none"></el-input>
              <div class="empty-class"></div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="el-table-div">
          <!-- <div class="button-div">
            <el-button disabled>新增行</el-button>
            <el-button disabled>删除行</el-button>
            <el-button disabled>复制</el-button>
          </div> -->
          <el-table border
                    center
                    show-summary
                    :summary-method="getSummaries"
                    max-height="370"
                    :data="base.tableData"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    ref="table"
                    v-loading="loading">
            <el-table-column type="selection"
                             width="50"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="行号"
                             prop="wvRowno"
                             width="60"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="erpPoNo"
                             label="采购合同号"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="poRowno"
                             label="采购合同行号"
                             width="80"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="extPoNo"
                             label="外部合同号"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="blNo"
                             :disabled="inTradeStatus"
                             label="提单号"
                             width="80"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="blRowno"
                             label="提单行号"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="物料编号"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.goodsCode"
                            :disabled="inwarehouse"></el-input>
                  <span class="comicon2"><i class="el-icon-search"></i></span>
                </div>
                <div v-else>
                  {{ scope.row.goodsCode }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="goodsName"
                             label="物料名称"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="goodsCategoryName"
                             label="物料大类"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="goodsSpec"
                             label="物料规格"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <!-- <el-table-column prop="gwBoxNo"
                             label="海关编码"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.gwBoxNo"
                            :disabled="inwarehouse"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.gwBoxNo }}
                </div>
              </template>
            </el-table-column> -->
            <el-table-column prop="itemUnitName"
                             label="基础单位"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="应收数量"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.shouldReceive"
                            :disabled="disableSelect"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.shouldReceive }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="实收数量"
                             prop="actReceive"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.actReceive"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.actReceive }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="secUnitName"
                             label="第二单位"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="shouldReceiveSec"
                             label="第二单位应收数量"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="secQty"
                             label="第二单位实收数量"
                             width="150"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.secQty"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.secQty }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="批次号"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.batchCode"></el-input>
                  <span class="comicon2"><i class="el-icon-search"></i></span>
                </div>
                <div v-else>
                  {{ scope.row.batchCode }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="packageCode"
                             label="捆包号"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.packageCode"
                            :disabled="isTypeFour"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.packageCode }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="originPrice"
                             label="业务币含税单价"
                             width="120"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.originPrice }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="业务币含税金额"
                             prop="originAmtVat"
                             width="120"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            :disabled="isTypeFour"
                            v-model="scope.row.originAmtVat"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.originAmtVat}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="unorginAmt"
                             label="业务币不含税金额"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="增值税率%"
                             width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.taxRate"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.taxRate }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="业务币增值税额"
                             prop="taxAmt"
                             width="120"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.taxAmt"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.taxAmt }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="basePrice"
                             label="本币含税单价"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="baseAmt"
                             label="本币含税金额"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="baseNoAmt"
                             label="本币不含税金额"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="baseTax"
                             label="本币增值税额"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="projectCode"
                             label="项目号"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="备注"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.remark"
                            :disabled="inwarehouse"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.remark }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 创建弹窗 -->
        <warehousing-AddRow v-if="warehousingAddRowShow"
                            :tipShow="warehousingAddRowShow"
                            @warehousingAddRowCancle="warehousingAddRowCancle"
                            @warehousingAddRowSure="warehousingAddRowSure"></warehousing-AddRow>
        <!--选择仓库-->
        <warehouse-select v-if="warehouseShow"
                          :tipShow="warehouseShow"
                          @warehouseCancle="warehouseCancle"
                          @warehouseSure="warehouseSure">
        </warehouse-select>
        <!--物料编号-->
        <matter-select v-if="base.matterShow"
                       :tipShow="base.matterShow"
                       @matterCancle="matterCancle"
                       @matterSure="matterSure">
        </matter-select>
      </el-tab-pane>
      <el-tab-pane label="物流信息"
                   name="second"
                   :disabled="inwarehouse">
        <!-- <div class="button-div">
          <el-button disabled>新增行</el-button>
          <el-button disabled>删除行</el-button>
        </div> -->
        <div class="el-table-div">
          <el-table border
                    center
                    :data="tableDatas"
                    class="el-table"
                    tooltip-effect="dark"
                    max-height="370"
                    style="width: 100%"
                    ref="table"
                    v-loading="loading">
            <el-table-column type="selection"
                             width="45"
                             align="center"></el-table-column>
            <el-table-column label="序号"
                             type="index"
                             width="60"
                             align="center"></el-table-column>
            <el-table-column label="运输方式">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-select clearable
                             size="mini"
                             v-model="scope.row.leaveTransferMode">
                    <el-option v-for="item in transMode"
                               :key="item.dict_key"
                               :label="item.dict_value"
                               :value="item.dict_key"></el-option>
                  </el-select>
                </div>
                <div v-else>
                  <span v-for="(item, index) in transMode"
                        v-show="item.dict_code == scope.row.leaveTransferMode"
                        :key="index">{{ item.dict_value }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="目的地">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.transferTarget"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferTarget }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="运输安排人">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.transferPlanMan"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferPlanMan }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="承运人">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.transferExcutor"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferExcutor }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="承运联系方式">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.transferExcutorTel"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferExcutorTel }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="备注">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.transferNote"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferNote }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="打印及附件"
                   name="third"
                   :disabled="tabpane">
        <div class="flex_center">
          <!-- <div class="button-div">
            <el-button class="query-button olbutton">附件存档</el-button>
            <span>文件上传上限20M</span>
          </div> -->
        </div>
        <div class="">
          <el-table border
                    center
                    :data="tableDataw"
                    max-height="370"
                    class="el-table">
            <el-table-column prop="lineNo"
                             label="序号"
                             show-overflow-tooltip
                             width="55">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="fileOldName"
                             label="文件名称">
            </el-table-column>
            <!-- <el-table-column show-overflow-tooltip
                             label="类型">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fileType"
                          placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             label="文档类型名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fileSuffix"
                          placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="signature"
                             label="签章情况">
            </el-table-column> -->
            <el-table-column show-overflow-tooltip
                             prop="createdTime"
                             label="上传时间">
              <template slot-scope="scope">
                {{ scope.row.createdTime | time }}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="createdBy"
                             label="上传人">
            </el-table-column>
            <el-table-column prop="paritiesDate"
                             label="文件操作">
              <template slot-scope="scope">
                <el-button @click="handleClickE(scope.row)"
                           type="text"
                           size="small">下载</el-button>
                <!-- <el-button @click="handleClickDele(scope.row)"
                           type="text"
                           size="small">删除</el-button> -->
                <!-- <el-button @click="handleClickE(scope.row)"
                           type="text"
                           size="small">预览</el-button>
                <el-button @click="handleClickE(scope.row)"
                           type="text"
                           size="small">打印</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="费用预提"
                   name="fifth"
                   :disabled="tabpane">
        <!-- <div class="button-div">
          <el-button disabled>添加行</el-button>
          <el-button disabled>删除行</el-button>
        </div> -->
        <div class="el-table-div">
          <el-table :data="costAccruedData.tableData"
                    ref="costTable"
                    tooltip-effect="dark"
                    border
                    stripe
                    max-height="370"
                    style="width: 100%">
            <el-table-column type="selection"
                             width="45"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="序号"
                             type="index"
                             width="60"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="供应商"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.supplierName"></el-input>
                  <span class="comicon"
                        @click="supplierTips"><i class="el-icon-search"></i></span>
                </div>
                <div v-else>
                  {{ scope.row.supplierName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="费用名称"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.costName"></el-input>
                  <span class="comicon"
                        @click="costSelectTips"><i class="el-icon-search"></i></span>
                </div>
                <div v-else>
                  {{ scope.row.costName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="shareDim"
                             label="摊销维度"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-for="item in shareDimList"
                      :key="item.dict_key"
                      v-show="item.dict_key == scope.row.shareDim">
                  {{ item.dict_value }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="业务币费用金额"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            @change="handleCalculation(scope.row)"
                            v-model="scope.row.costAmtVat"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.costAmtVat }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="业务币币别"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.currencyCode"></el-input>
                  <span class=""
                        @click="coinSelectTips"><i class="el-icon-search"></i></span>
                </div>
                <div v-else>
                  {{ scope.row.currencyCode }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="本位币汇率"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            @change="handleCalculation(scope.row)"
                            v-model="scope.row.baseCurrencyRate"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.baseCurrencyRate }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="税率%"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            @change="handleCalculation(scope.row)"
                            v-model="scope.row.taxRate"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.taxRate }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="无税金额"
                             prop="costAmt"
                             align="center"
                             show-overflow-tooltip>
              <!-- <template slot-scope="scope">
                {{ Math.round((scope.row.costAmtVat - scope.row.costAmt)*100)/100 }}
              </template> -->
            </el-table-column>
            <el-table-column label="税额"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            @change="handleCalculation(scope.row)"
                            v-model="scope.row.taxAmt"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.taxAmt }}
                </div>
              </template>
            </el-table-column>
             <el-table-column  label="本位币费用金额" prop="costAmtVatBase" align="center" width="120px">
            </el-table-column> 
            <el-table-column  label="无税金额(本位币)" prop="costAmtBase" align="center" width="120px">
            </el-table-column> 
            <el-table-column  label="税额(本位币)" prop="taxAmtBase" align="center" width="120px">
            </el-table-column> 
            <el-table-column label="备注"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.remark"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.remark }}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!--供应商弹窗-->
          <supplier-select v-if="costAccruedData.supplierShow"
                           :tipShow="costAccruedData.supplierShow"
                           @supplierCancle="supplierCancle"
                           @supplierSure="supplierSure">
          </supplier-select>
          <!--费用名称弹窗-->
          <cost-select v-if="costAccruedData.costSelectShow"
                       :tipShow="costAccruedData.costSelectShow"
                       @costSelectCancle="costSelectCancle"
                       @costSelectSure="costSelectSure">
          </cost-select>
          <!--业务币币别弹窗-->
          <coin-select v-if="costAccruedData.coinShow"
                       :tipShow="costAccruedData.coinShow"
                       @coinCancle="coinCancle"
                       @coinSure="coinSure">
          </coin-select>
          <!-- 审核弹窗 -->
          <el-dialog title="审核确认"
                     :visible.sync="dialogVisible"
                     :close-on-click-modal="false"
                     width="30%">
            <div>
              <el-radio-group v-model="Examine">
                <el-radio :label="1">审核通过</el-radio>
                <el-radio :label="2">审核驳回</el-radio>
              </el-radio-group>
            </div>
            <span slot="footer"
                  class="dialog-footer">
              <el-button @click="toExaminemain(Examine)">确定</el-button>
              <el-button type="primary"
                         @click="dialogVisible = false">取消</el-button>
            </span>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统信息"
                   name="sixth"
                   :disabled="tabpane">
        <div class="input-div input-div-bor bortop0">
          <el-divider></el-divider>
          <el-col :span="5"
                  class="el-col">
            <label>创建人</label>
            <el-input v-model="formList.createdName"
                      class="el-inputs"
                      disabled></el-input>
          </el-col>
          <el-col :span="6"
                  class="el-col">
            <label>创建时间</label>
            <el-date-picker v-model="formList.createdTime"
                            type="date"
                            disabled>
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>修改人</label>
            <el-input v-model="formList.updatedName"
                      class="el-inputs"
                      disabled></el-input>
          </el-col>
          <el-col :span="6"
                  class="el-col">
            <label>修改时间</label>
            <el-date-picker v-model="formList.updatedTime"
                            type="date"
                            disabled>
            </el-date-picker>
          </el-col>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import api from "@/api/ladingBill/ladingBill";
import warehousingAddRow from "./warehousingAddRow.vue";
import coinSelectVue from "../../components/coinSelect.vue";
import warehouseSelect from "@/components/warehouseSelect.vue";
import supplierSelect from "@/components/supplierSelect.vue";
import costSelect from "@/components/costSelect.vue";
import matterSelect from "@/components/matterSelect.vue";
import coinSelect from "@/components/coinSelect.vue";
import Compony from "@/api/comdepartment/componySelect";
import { getFiles } from "@/api/contractMange/frameProtocol";
import calculation from "@/assets/js/calculation";
export default {
  name: "warehousingDetailsSee",
  data () {
    return {
      activeName2: "first", //标签页
      companyName: "",
      wvStatus: "", //单据状态
      warehouseName: [], //仓库
      warehouseShow: false, //仓库
      base: {
        //商品详情
        tableData: [],
        matterShow: false //物料编号
      },
      tableDatas: [],
      tableDataw: [],
      loading: false, //表格loading
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      isBatched: "",
      isTransfered: "",
      totalOriginAmt: null,
      formList: {
        bldoStatus: 10110005, //单据状态 //创建的时候默认为已保存
        wvNo: "", //入库单号
        companyCode: "", //公司
        projectCode: "", //部门
        bizPersonName: "",
        poType: null, //合同类型
        supplierId: "", //供应商
        wvdoStatus: null, //入库单类型
        postDate: [],
        currencyCode: "", //业务币币别
        currencyRate: "", //本位币汇率
        totalOrginAmtTax: "", //含税金额
        isBilled: null, //是否完全开发票
        actReceive: "", //入库数量
        pickupType: "", //提货方式
        shipName:"",//船名
        remark: "" //备注
      },
      //费用预提数据
      costAccruedData: {
        tableData: [], //费用预提表格数据
        selectioned: "", //费用预提选中
        supplierShow: false, //供应商
        coinShow: false, //业务币币别
        costSelectShow: false, //费用名称
        supplierName: {}, //供应商名称
        supplierId: "", //供应商id
        index: "",
        currencyCode: "",
        prefetchIdListDelete: [] //费用预提删除的数据
      },
      blStatusList: [], //单据状态
      isBilledList: [
        { dict_value: "否", dict_key: 0 },
        { dict_value: "是", dict_key: 1 }
      ],
      value2: "",
      predictArrivedDate: "",
      deliveryBegindate: "",
      delivery: {},
      shareDimList: [],
      ToSingle: [],
      pickupstatus: [],
      CustomsClearance: [],
      ArrivalPortList: [],
      type: "",
      tabpane: false,
      transMode: [],
      creactNo: false,
      ladingBillShow: false,
      warehousingAddRowShow: false,
      maxAmt: [],
      wvStatusList: [],
      disabletab: false,
      inTradeStatus: false,
      inwarehouse: false, //入库确认
      dialogVisible: false, //审核弹框
      Examine: "", //审核
      conTypeList: [],
      warrantCode:'',//凭证号 
      warrantMonth:'', //期间 
     
    };
  },
  created () {
    this.type = this.$route.query.type;
    this.initList();
    if (localStorage.getItem("wvId")) {
      this.wvId = localStorage.getItem("wvId");
      this.changeMessage(); //修改初始化
    }
  },
  methods: {
    initList () {
      //单据状态
      api
        .select({ dictNo: 1048 })
        .then(res => {
          this.blStatusList = res.data;
        })
        .catch(err => { });
      //合同状态
      api
        .select({ dictNo: 1014 })
        .then(res => {
          this.conTypeList = res.data;
        })
        .catch(err => { });
      //入库单类型
      api
        .select({ dictNo: 1062 })
        .then(res => {
          this.wvStatusList = res.data;
        })
        .catch(err => { });
      //运输方式
      api
        .select({ dictNo: 1017 })
        .then(res => {
          this.transMode = res.data;
        })
        .catch(err => { });
      //提货方式
      api
        .select({ dictNo: 1061 })
        .then(res => {
          this.pickupstatus = res.data;
        })
        .catch(err => { });
      //摊销维度
      api
        .select({ dictNo: 1064 })
        .then(res => {
          this.shareDimList = res.data;
        })
        .catch(err => { });
    },
    //查看的详情
    changeMessage () {
      if (localStorage.getItem("wvId")) {
        this.wvId = localStorage.getItem("wvId");
      }
      let params = {
        wvId: this.wvId
      };
      api
        .odWvDetail(params)
        .then(res => {
          if (res.code == "success") {
            this.wvStatus = res.data.wvStatus;
            this.wvType = res.data.wvType;
            this.formList = res.data;
            this.formList.bldoStatus = res.data.wvStatus;
            this.formList.wvdoStatus = res.data.wvType;
            this.warehouseName.warehouseName = res.data.warehouseName;
            this.formList.currencyCode = res.data.currencyCodeOrigin;
            this.formList.currencyRate = res.data.baseCurrencyRate;
            this.formList.currencyName = res.data.currencyName;
            this.formList.actReceive = res.data.wvQtyS;
            this.formList.totalOrginAmtTax = res.data.wvAmtS;
            this.formList.payAmtTotalRmb = res.data.payAmtTotalRmb;
            this.formList.rmbCurrencyRate = res.data.rmbCurrencyRate;
            this.formList.orgName = res.data.orgName;
            this.tableDatas = res.data.odWvCtiPathsList;
            this.base.tableData = res.data.odWvItemsList;
            this.formList.unwvReverse=res.data.unwvReverse==1?"是":"否";//是否冲销驳回
            this.warrantCode= res.data.warrantCode;//凭证号 
            this.warrantMonth= res.data.warrantMonth; //期间 
            this.formList.shipName=res.data.shipName;
            this.costAccruedData.tableData =
              res.data.odPrefetchCostItemsDetailList;

            this.getPrefetchData();
            let sum = 0;
            this.base.tableData.map((item, index) => {
              item.wvRowno = (index + 1) * 10;
              sum += item.actReceive;
              item.taxAmt = item.originTaxAmt;
              // item.erpPoNo = item.poNo
              //   item.baseTax = this.$bbzzse(row.taxAmt, this.formList.currencyRate);
              // item.unOriginPrice = this.$unorginPrice(
              //   item.originPrice,
              //   item.taxRate
              // );
              //采购含税金额
              // item.originAmtVat = this.$orginAmt(
              //   item.originPrice,
              //   item.actReceive
              // );
              //采购不含税金额
              item.unorginAmt =
                Math.round((item.originAmtVat - item.taxAmt) * 100) / 100;

              //本币计算 对应业务币*汇率
              //本币含税单价  basePrice
              // item.basePrice = this.$bbhsdj(
              //   item.originPrice,
              //   this.formList.currencyRate
              // );
              //本币不含税单价 unBasePrice
              item.unBasePrice = this.$bbnhsdj(
                item.unOriginPrice,
                this.formList.currencyRate
              );
              // //本币含税金额 baseAmt
              // item.baseAmt = this.$bbhsje(
              //   item.originAmtVat,
              //   this.formList.currencyRate
              // );
              //本币不含税金额 baseNoAmt
              // item.baseTax = this.$bbzzse(
              //   item.taxAmt,
              //   this.formList.currencyRate
              // );
              item.baseNoAmt =
                Math.round((item.baseAmt - item.baseTax) * 100) / 100;
              //   item.baseNoAmt = this.$bbnhsje(item.unorginAmt, this.formList.currencyRate);
            });
            //this.formList.actReceive = sum;
            //this.handleTotalCalc();
            let businessId = this.formList.wvId;
            const subForm = new FormData();
            subForm.append("businessId", businessId);
            getFiles(subForm)
              .then(res => {
                //   console.log('res :', res);
                this.tableDataw = res.data;
                this.tableDataw.map((item, index) => {
                  item.wvRowno = index + 1;
                });
              })
              .catch(err => { });
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
    //入库、金额总数
    handleTotalCalc () {
      this.formList.payAmtTotalRmb =
        Math.round(
          this.formList.totalOrginAmtTax * this.formList.rmbCurrencyRate * 100
        ) / 100;
    },
    //采购含税单价变动
    originPriceCh (e, index) {
      let row = e;
      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购含税金额
      row.originAmtVat = this.$orginAmt(row.originPrice, row.actReceive);
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmtVat, row.unorginAmt);
      this.$set(this.base.tableData, index, row);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.formList.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(
        row.unOriginPrice,
        this.formList.currencyRate
      );
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmtVat, this.formList.currencyRate);
      //本币不含税金额 baseNoAmt
      row.baseTax = this.$bbzzse(row.taxAmt, this.formList.currencyRate);
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTax) * 100) / 100;
      //   row.baseNoAmt = this.$bbnhsje(row.unorginAmt, this.formList.currencyRate);
      //本币增值税额 baseTax
      //   this.$set(this.base.tableData, index, row);
    },
    //采购含税金额变动
    originAmtCh (e, index) {
      let row = e;
      //采购含税单价
      row.originPrice = this.$orginPrice(row.originAmtVat, row.actReceive);
      //采购不含税单价
      row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmtVat, row.unorginAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.formList.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(
        row.unorginPrice,
        this.formList.currencyRate
      );
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.formList.currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.formList.currencyRate);
      //   this.$set(this.base.tableData, index, row);
    },
    //税率变动
    taxRateCh (e, index) {
      let row = e;
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //采购不含税单价
      row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmtVat, row.unorginAmt);

      //本币计算 对应业务币*汇率
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.formList.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(
        row.unorginPrice,
        this.formList.currencyRate
      );
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.formList.urrencyRate);
      //   this.$set(this.base.tableData, index, row);
    },
    //税额变动 //采购不含税金额=含税总价-税额
    taxAmtCh (e, index) {
      let row = e;
      //采购不含税金额  采购不含税金额=采购含税金额-税额
      row.unorginAmt = this.$unorginAmtCh(row.originAmtVat, row.taxAmt);
      //采购不含税单价 采购不含税金额=采购不含税金额 / 数量
      row.unorginPrice = this.$unPrice(row.unorginAmt, row.actReceive);

      //本币计算 对应业务币*汇率
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.formList.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(
        row.unorginPrice,
        this.formList.currencyRate
      );
      //   this.$set(this.base.tableData, index, row);
    },
    //修改跳转
    changeSub () {
      if (localStorage.getItem("wvId")) {
        this.wvId = localStorage.getItem("wvId");
      }
      localStorage.setItem("wvId", this.wvId);
      this.$router.push({
        //核心语句
        path: "/index/Purchase/warehousingDetails", //跳转的路径
        query: { type: 0 }
      });
    },
    //供应商发货
    approval () {
      if (localStorage.getItem("wvId")) {
        this.wvId = localStorage.getItem("wvId");
      }
      localStorage.setItem("wvId", this.wvId);
      this.$router.push({
        //核心语句
        path: "/index/Purchase/warehousingDetails", //跳转的路径
        query: { type: 2 }
      });
    },
    //是否关闭验证//提交
    addSub () {
      if (localStorage.getItem("wvId")) {
        this.wvId = localStorage.getItem("wvId");
      }
      let data = {
        wvId: this.wvId
      };
      api
        .checkIsCloseableByWv(data)
        .then(res => {
          if (res.data.isCloseable == true) {
            let tips = "关闭";
            this.$confirm("是否确定" + tips + "?", tips + "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              localStorage.setItem("isClosed", 1);
              this.mainContract();
            });
          } else {
            localStorage.setItem("isClosed", 0);
            this.mainContract();
          }
        })
        .catch();
    },
    //合计计算
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (
          index === 13 ||
          index === 16 ||
          index === 19 ||
          index === 20 ||
          index === 21 ||
          index === 22 ||
          index === 24 ||
          index === 25 ||
          index === 26
        ) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                ///let res = (prev * 100000 + curr * 100000) / 100000;
                let res=calculation.accAdd(prev,curr);
                if (
                  index === 19 ||
                  index === 20 ||
                  index === 21 ||
                  index === 22 ||
                  index === 24 ||
                  index === 25 ||
                  index === 26
                ) {
                  if (index === 20) {
                    this.totalOriginAmt = res;
                  }
                  return res.toFixed(2);
                }
                return res;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = "";
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    //提交(只能对保存或驳回的发起审批)
    mainContract () {
      if (localStorage.getItem("isClosed")) {
        this.isClosed = localStorage.getItem("isClosed");
      }
      if (localStorage.getItem("wvId")) {
        this.wvId = localStorage.getItem("wvId");
      }
      let params = {
        wvId: this.wvId,
        isClosed: this.isClosed
      };
      api
        .wvCommitApprove(params)
        .then(res => {
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.data,
              type: "success"
            });
            this.tableDataList();
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
    //审核(入库单)
    toExamine () {
      if (!this.selectioned) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return false;
      }
      this.dialogVisible = true;
    },
    //审核
    toExaminemain (Examine) {
      let params = {
        wvId: this.selectioned.wvId,
        version: this.selectioned.version,
        approveStatus: Examine
      };
      api
        .wvApprove(params)
        .then(res => {
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.data,
              type: "success"
            });
            this.tableDataList();
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
    //入库确认
    Confirmation () {
      if (!this.selectioned) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return false;
      }
      localStorage.setItem("wvId", this.wvId);
      localStorage.setItem("version", this.version);
      this.$router.push({
        //核心语句
        path: "/index/Purchase/warehousingDetails", //跳转的路径
        query: { type: 6 }
      });
    },
    //取消
    goBack () {
      this.$router.push({
        //核心语句
        path: "/index/Purchase/warehousing" //跳转的路径
      });
    },
    //获取费用预提信息
    getPrefetchData () {
      /////
      //获取业务币币别
      this.costAccruedData.tableData.map((item, idnex) => {
        Compony.currenList({
          currencyCode: item.currencyCode
        }).then(res => {
          item.currencyName = res.data[0].currencyName;
        });
      });
    },
    handleClick (e) { },
    //提货方式
    handlePickup (val) {
      this.formList.pickupType = val;
    },
    //是否完全开发票
    handleIsbilled (val) {
      this.formList.isBilled = val;
    },
    //入库单类型
    wvhandleChange (val) {
      this.formList.wvdoStatus = val;
    },
    //仓库弹窗打开
    warehouseTips () {
      this.warehouseShow = true;
    },
    //仓库确认
    warehouseSure (e) {
      this.warehouseShow = false;
      this.warehouseName.warehouseName = e.warehouseName;
    },
    //下载
    handleClickE(row){
       window.open(row.fileServerAddress);
    },
  },
  components: {
    warehousingAddRow,
    warehouseSelect,
    supplierSelect,
    costSelect,
    matterSelect,
    coinSelect
  }
};
</script>
<style lang="scss" scoped>
.remark-style {
  display: flex;
  padding-top: 10px;
  justify-content: space-around;
  width: 100%;
  padding-bottom: 10px;
  label {
    width: 7.85%;
    text-align: right;
    line-height: 31px;
    padding-right: 9px;
  }
  .empty-class {
    width: 4.49%;
  }
}
// header {
//   font-size: 36px;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 5px;
// }
// .el-input2 {
//   height: 32px;
//   width: 73%;
// }
// .comicon2 {
//   width: 170px;
//   height: 20px;
//   position: absolute;
//   cursor: pointer;
//   text-align: right;
//   right: 14px;
//   top: 1px;
// }
// .comiconBtn {
//   width: 170px;
//   height: 20px;
//   position: absolute;
//   cursor: pointer;
//   text-align: right;
//   right: 10px;
// }
// .input-div .el-col:last-child {
//   margin: 8px 0 10px 10px;
// }
// .input-div .el-col .el-input__inner {
//   width: 163px !important;
// }
// .el-textarea {
//   width: 90.3%;
//   font-family: "MicrosoftYaHei";
//   font-size: 12px;
// }
// .el-table-div {
//   background: #fff;
//   padding-bottom: 10px;
//   min-height: auto;
// }
// .table_titlestr {
//   font-size: 12px;
// }
// .table_title {
//   font-weight: bold;
//   font-size: 16px;
// }
// .index .ladingblock button {
//   height: 28px;
//   font-size: 12px;
//   line-height: 1px;
//   font-weight: 400;
//   text-align: center;
//   background: #fff;
//   border: 1px solid #31478f;
//   color: #31478f;
//   width: 70px;
// }
// .el-col-7 {
//   width: 29.16667%;
// }
// /* .el-input1{
//   width:77%;
//   height:30px;
// } */
// .custom-31478F .el-date-editor.el-input {
//   width: 180px;
// }
// .input-div label {
//   font-size: 12px;
//   color: #333;
//   display: inline-block;
//   margin-right: 10px;
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
</style>
