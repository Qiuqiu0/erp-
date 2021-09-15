<template>
  <div class="createFrame content-div2">
    <el-divider></el-divider>
    <div class="button-div">
      <!-- <el-button v-show="receivingShow"
                 class="query-button"
                 @click="outerVisible = true"
                 icon="el-icon-receiving">协议审核</el-button>
      <el-button v-show="finishedShow"
                 class="query-button"
                 @click="handleContractSub"
                 icon="el-icon-finished">协议提交</el-button>

      <el-button v-show="checkShow"
                 class="query-button"
                 @click="handleContractOpen"
                 icon="el-icon-check">合同开启</el-button>
      <el-button v-show="closeShow"
                 @click="handleContractClose"
                 class="query-button"
                 icon="el-icon-close">合同关闭</el-button>
      <el-button v-show="outlineShow"
                 @click="handleChangeSub"
                 class="query-button"
                 icon="el-icon-edit-outline">变更提交</el-button> -->
      <el-button class="query-button"
                 @click="goBack"
                 icon="el-icon-back">返回</el-button>
    </div>
    <el-divider></el-divider>
    <!-- <header>框架协议</header> -->
    <el-tabs v-model="activeTab"
             class="el-tabs"
             v-loading="loading"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="框架协议"
                   name="first">
        <!-- 搜索 -->
        <div class="input-div input-div-bor">
          <!-- <div class="table_title">基本信息</div> -->
          <div id="loadingTarget">
            <el-col :span="5"
                    class="el-col">
              <label>公司</label>
              <el-input v-model="readOnlyDataForm.companyName"
                        class="el-inputs"
                        required
                        :disabled="isReadOnly"></el-input>
              <span class="comicon"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>部门</label>
              <el-input v-model="readOnlyDataForm.orgName"
                        class="el-inputs"
                        :disabled="isReadOnly"></el-input>
              <span class="comicon"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>协议编号</label>
              <el-input v-model="readOnlyDataForm.contractNo"
                        class="el-inputs"
                        :disabled="isReadOnly"></el-input>
              <!-- <span
              class='comicon'
              @click="contractTip"
            ><i class="el-icon-search"></i></span> -->
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>协议状态</label>
              <el-select v-model="readOnlyDataForm.contractStatus"
                         :disabled="isReadOnly">
                <el-option v-for="item in isInaType"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>业务员</label>
              <el-input v-model="readOnlyDataForm.bizPersonName"
                        class="el-inputs"
                        :disabled="isReadOnly"></el-input>
              <span class="comicon"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>协议类型</label>
              <el-select v-model="readOnlyDataForm.contractCat"
                         :disabled="isReadOnly">
                <el-option v-for="item in contractType"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>客户</label>
              <el-input v-model="readOnlyDataForm.custName"
                        class="el-inputs"
                        :disabled="isReadOnly"></el-input>
              <span class="comicon"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>供应商</label>
              <el-input v-model="readOnlyDataForm.supplierName"
                        class="el-inputs"
                        :disabled="isReadOnly"></el-input>
              <span class="comicon"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>项目号</label>
              <el-input v-model="readOnlyDataForm.projectCode"
                        class="el-inputs"
                        :disabled="isReadOnly"></el-input>
              <span class="comicon"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>项目名称</label>
              <el-input v-model="readOnlyDataForm.projectName"
                        class="el-inputs"
                        :disabled="isReadOnly"></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>签订日期</label>
              <el-date-picker v-model="readOnlyDataForm.signTime"
                              style="width:70%"
                              type="date"
                              value-format="timestamp"
                              :disabled="isReadOnly">
              </el-date-picker>
              <!-- <el-input
              v-model="projectCode"
              class="el-inputs"
            ></el-input> -->
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>有效日期</label>
              <!-- <el-input
                class="el-inputs"
                :disabled="isReadOnly"
                prefix-icon="el-icon-date"
                v-model="contractDateArray"
              >
              </el-input> -->
              <el-date-picker v-model="contractDateArray"
                              style="width:70%"
                              type="date"
                              value-format="timestamp"
                              disabled>
              </el-date-picker>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>外部合同号</label>
              <el-input v-model="readOnlyDataForm.extCode"
                        class="el-inputs"
                        :disabled="isReadOnly"></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-colc">
              <label>业务币币别</label>
              <el-select v-model="readOnlyDataForm.currencyCode"
                         :disabled="isReadOnly">
              </el-select>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>本位币汇率</label>
              <el-input v-model="readOnlyDataForm.currencyRate"
                        class="el-inputs"
                        :disabled="isReadOnly"></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-colc">
              <label>签约地点</label>
              <el-input v-model="readOnlyDataForm.signPlace"
                        class="el-inputs"
                        :disabled="isReadOnly"></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>付款类型</label>
              <el-select v-model="readOnlyDataForm.payType"
                         :disabled="isReadOnly">
                <el-option v-for="item in payTypeList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>付款方式</label>
              <el-select v-model="readOnlyDataForm.payWay"
                         :disabled="isReadOnly">
                <el-option v-for="item in paymentList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>票期</label>
              <el-input v-model="readOnlyDataForm.usance"
                        class="el-inputs"
                        type="number"
                        :disabled="isReadOnly"></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>协议金额</label>
              <el-input v-model="contractAmt"
                        class="el-inputs"
                        :disabled="isReadOnly"></el-input>
            </el-col>
            <div class="remark-style">
              <label>备注</label>
              <el-input type="textarea"
                        autosize
                        v-model="remark"
                        size="small"
                        disabled
                        class="el-textarea"
                        resize="none"></el-input>
              <div class="empty-class"></div>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <div class="input-div input-div-bor bortop0">
          <el-divider></el-divider>
          <div>
            <div class="button-div">
              <el-button class="query-button"
                         disabled
                         icon="el-icon-plus">创建</el-button>
              <el-button disabled
                         icon="el-icon-minus">删除</el-button>
              <!-- <el-button @click="setUp(0)"
                     class="olbutton"
                     icon="el-icon-upload2">模板导入</el-button> -->
            </div>
          </div>
          <div class="">
            <el-table border
                      center
                      show-summary
                      :summary-method="getSummaries"
                      max-height="370"
                      :data="matterList"
                      class="el-table"
                      ref="multipleTable">
              <el-table-column type="selection"
                               width="55"> </el-table-column>
              <el-table-column prop="index"
                               label="序号"> </el-table-column>
              <el-table-column prop="goodsCode"
                               label="物料号"
                               width="150px">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input v-model="scope.row.goodsCode"
                              style="width:90%"
                              disabled="">
                      <i style="cursor:pointer"
                         slot="suffix"
                         class="el-input__icon el-icon-search"></i>
                    </el-input>
                  </div>
                  <div v-else
                       class="fixedHeight">
                    <el-popover placement="top-start"
                                width="200"
                                trigger="hover"
                                :content="scope.row.goodsCode">
                      <span slot="reference"> {{ scope.row.goodsCode }}</span>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="paritiesDate"
                               label="物料名称"
                               width="150px">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input v-model="scope.row.goodsName"></el-input>
                  </div>
                  <div v-else
                       class="fixedHeight">
                    <el-popover placement="top-start"
                                width="200"
                                trigger="hover"
                                :content="scope.row.goodsName">
                      <span slot="reference"> {{ scope.row.goodsName }}</span>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name"
                               label="物料大类"
                               width="150px">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input v-model="scope.row.goodsCategoryName"></el-input>
                  </div>
                  <div v-else
                       class="fixedHeight">
                    <el-popover placement="top-start"
                                width="200"
                                trigger="hover"
                                :content="scope.row.goodsCategoryName">
                      <span slot="reference">
                        {{ scope.row.goodsCategoryName }}</span>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name"
                               label="物料规格"
                               width="260px">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input v-model="scope.row.goodsSpec"></el-input>
                  </div>
                  <div v-else
                       class="fixedHeight">
                    <el-popover placement="top-start"
                                width="200"
                                trigger="hover"
                                :content="scope.row.goodsSpec">
                      <span slot="reference"> {{ scope.row.goodsSpec }}</span>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="itemUnit"
                               label="基础单位"
                               width="150px">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input v-model="scope.row.itemUnit"></el-input>
                  </div>
                  <div v-else
                       class="fixedHeight">
                    <el-popover placement="top-start"
                                width="200"
                                trigger="hover"
                                :content="scope.row.itemUnit">
                      <span slot="reference"> {{ scope.row.itemUnit }}</span>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="itemQty"
                               label="数量"
                               width="100px">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input v-model="scope.row.itemQty"
                              type="test"
                              onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                              @blur="
                        handleNumberRule($event);
                        handleoriginAmtCalc(scope.row);
                      "></el-input>
                  </div>
                  <div v-else
                       class="fixedHeight">
                    <span slot="reference"> {{ scope.row.itemQty }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="originPrice"
                               label="业务币含税单价"
                               width="150px">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input v-model="scope.row.originPrice"
                              type="text"></el-input>
                  </div>
                  <div v-else
                       class="fixedHeight">
                    <span slot="reference"> {{ scope.row.originPrice }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="unorginPrice"
                               label="业务币不含税单价"
                               width="150px">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <!-- <el-input
                  v-model="scope.row.eamil"
                  type="number"
                ></el-input> -->
                    {{ scope.row.unorginPrice }}
                  </div>
                  <div v-else
                       class="fixedHeight">
                    <span slot="reference"> {{ scope.row.unorginPrice }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="originAmt"
                               label="业务币含税金额"
                               width="150px">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <!-- {{ scope.row.itemQty*scope.row.originPrice||""}} -->
                    <!-- <el-input
                  v-model="scope.row.eamil"
                  type="number"
                ></el-input> -->
                    {{ scope.row.originAmt }}
                  </div>
                  <div v-else
                       class="fixedHeight">
                    <span slot="reference">{{ scope.row.originAmt }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="unorginAmt"
                               label="业务币不含税金额"
                               width="150px">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    {{ scope.row.unorginAmt }}
                  </div>
                  <div v-else
                       class="fixedHeight">
                    <span slot="reference"> {{ scope.row.unorginAmt }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="taxRate"
                               label="增值税率%"
                               width="100px">
              </el-table-column>
              <el-table-column prop="taxAmt"
                               label="增值税额"
                               width="100px">
              </el-table-column>
              <el-table-column prop="secUnit"
                               label="第二单位">
              </el-table-column>
              <el-table-column prop="secQty"
                               label="第二数量">
              </el-table-column>
              <el-table-column prop="remark"
                               label="备注"> </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="合同条款"
                   name="second">
        <div class="input-div input-div-bor bortop0">
          <el-divider></el-divider>
          <!-- <div class="table_title">合同条款</div> -->
          <div class="">
            <div class="button-div">
              <!-- <el-button
                class="query-button"
                @click="addFun"
              >创建</el-button>
              <el-button @click="deleFun()">删除</el-button> -->
            </div>
          </div>
          <div class="">
            <el-table border
                      center
                      :data="odFwContractTermFormList"
                      class="el-table"
                      max-height="370"
                      ref="multipleTable"
                      @selection-change="handleChange"
                      @select-all="dialogCheck"
                      @select="dialogCheck">
              <el-table-column type="selection"
                               width="55"> </el-table-column>
              <el-table-column prop="termRowno"
                               width="55"
                               label="序号">
              </el-table-column>
              <el-table-column show-overflow-tooltip
                               prop="termContent"
                               label="条款内容">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.termContent }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="版本"
                   name="third" v-if="isVersion">
        <div class="">
          <el-table border
                    center
                    max-height="370"
                    :data="versionData"
                    class="el-table">
            <el-table-column type="index"
                             label="序号"> </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="displayVersion"
                             label="版本号">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="updatedTime"
                             label="修改时间">
              <template scope="scope">
                <span>{{scope.row.updatedTime | time}}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="updatedName"
                             label="修改人">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="paritiesDate"
                             label="进入">
              <template slot-scope="scope">
                <el-button @click="handleVersionDataClick(scope.row)"
                           type="text"
                           size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="打印及附件"
                   name="fourth">
        <div class="input-div input-div-bor bortop0">
          <el-divider></el-divider>
          <div class="">
            <el-table border
                      center
                      max-height="370"
                      :data="odFwContractItemsList"
                      class="el-table">
              <el-table-column label="序号"
                               prop="rowno"
                               show-overflow-tooltip
                               width="55">
              </el-table-column>
              <el-table-column show-overflow-tooltip
                               prop="fileOldName"
                               label="文件名称">
              </el-table-column>
              <el-table-column show-overflow-tooltip  label="类型">
            <template slot-scope="scope">
              {{scope.row.fileType==2?"双签":"普通"}}
            </template>
          </el-table-column>
              <!-- <el-table-column show-overflow-tooltip
                               label="类型">
                <template slot-scope="scope">
                  {{ scope.row.fileType }}
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip
                               label="文档类型名称">
                <template slot-scope="scope">
                  {{ scope.row.fileSuffix }}
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip
                               prop="signature"
                               label="签章情况">
              </el-table-column> -->
              <el-table-column show-overflow-tooltip
                               label="上传时间">
                <template slot-scope="scope">
                  {{ scope.row.createdTime | time }}
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip
                               prop="createdName"
                               label="上传人">
              </el-table-column>
              <el-table-column prop="paritiesDate"
                               label="文件操作">
                <template slot-scope="scope">
                  <el-button type="text"
                         size="small"  @click="download(scope.row)">下载</el-button>
              <!-- <el-button type="text"
                         size="small">预览</el-button>
              <el-button type="text"
                         size="small">打印</el-button> -->
                </template>
                <!-- <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                  >下载</el-button>
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                  >删除</el-button>
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                  >预览</el-button>
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                  >打印</el-button>
                </template> -->
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统信息"
                   name="fifth">
        <div class="input-div input-div-bor bortop0">
          <!-- <el-divider></el-divider> -->
          <el-col :span="5"
                  class="el-col">
            <label>创建人</label>
            <el-input v-model="sysInfoData.createdName"
                      class="el-inputs"
                      :disabled="isReadOnly"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>创建时间</label>
            <el-date-picker v-model="sysInfoData.createdTime"
                            type="date"
                            :disabled="isReadOnly">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>修改人</label>
            <el-input v-model="sysInfoData.updatedName"
                      class="el-inputs"
                      :disabled="isReadOnly"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>修改时间</label>
            <el-date-picker v-model="sysInfoData.updatedTime"
                            type="date"
                            :disabled="isReadOnly">
            </el-date-picker>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="流程详情"
                   name="lcxq">
        <div class="input-div input-div-bor bortop0">
          <v-exmineStatus :id="$route.query.contractId"></v-exmineStatus>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog width="27%"
               :close-on-click-modal="elDialogControl"
               :close-on-press-escape="elDialogControl"
               title="是否通过审核？"
               :visible.sync="outerVisible">
      <div style="text-align: center;padding-top:10px">
        协议编号：{{ readOnlyDataForm.contractNo || "" }}
      </div>
      <el-dialog width="50%"
                 title="请填写驳回原因"
                 :visible.sync="innerVisible"
                 append-to-body>
        <el-input style="margin-top:10px"
                  v-model="unReason"
                  type="textarea"></el-input>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="handleContractReviewDeny">审核驳回</el-button>
        </div>
      </el-dialog>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="innerVisible = true">审核驳回</el-button>
        <el-button type="primary"
                   @click="handleContractReviewPass">审核通过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ExmineStatus from '@/components/exmineStatus'
import {
  getOdFwContract,
  approveOdFwContract,
  getOdFwContractItemsList,
  getOdFwContractTermList,
  auditOdFwContract,
  getDictionary,
  turnOdFwContract,
  getFiles,
  getOdFwContractActive,
  getOdFwContractItemsArchiveList,
  getOdFwContractTermArchiveList,
  listArchive,
  getOdContractHis
} from "@/api/contractMange/frameProtocol";
export default {
  name: "createFrame",
  components: {
    'v-exmineStatus': ExmineStatus
  },
  data() {
    return {
      activeTab: "first",
      isReadOnly: true,
      readOnlyDataForm: {},
      // contractAmt: "",//协议金额
      isInaType: [
        { value: 10130005, label: "草拟" },
        { value: 10130010, label: "审批中" },
        { value: 10130015, label: "已生效" },
        { value: 10130020, label: "审批后修改" },
        { value: 10130025, label: "变更审批中" },
        { value: 10130030, label: "关闭中" },
        { value: 10130035, label: "已截停" },
        { value: 10130040, label: "开启中" },
        { value: 10130045, label: "已驳回" },
        { value: 10130050, label: "已关闭" }
      ],
      //状态控制按钮
      receivingShow: false,
      finishedShow: false,
      checkShow: false,
      closeShow: false,
      outlineShow: false,
      contractType: [
        {
          value: 10890005,
          label: "采购"
        },
        {
          value: 10890010,
          label: "销售"
        }
      ],
      payTypeList: [],
      paymentList: [],
      //elDialogControl
      outerVisible: false,
      innerVisible: false,
      elDialogControl: false,
      unReason: "",
      contractDateArray: "", //有效日期
      odFwContractTermFormList: [], //合同条款表格
      selectioned: null, //表格当前项
      index: null, //当前index
      newTbale: [], //新建数据
      linkList: [],
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      warehouseLinkList: [], //联系人
      warehouseId: "",
      version: "",
      loading: true, //表格loading
      getData: {},
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
      //修改数据
      //版本数据
      versionData: [1],
      //打印及附件数据
      odFwContractItemsList: [],
      uploadHeaders: { "content-Type": "multipart/form-data" }, //文件上传的格式
      action: "#", //'/oss',
      sysid: "ac3284d42dcdbc883c3b65981c4fa5e2", //文件上传的参数
      //系统信息数据
      sysInfoData: {
        createdName: "",
        createdTime: "",
        updatedName: "",
        updatedTime: ""
      },
      //物料数据
      matterList: [],
      newMatterTable: [], //新建数据
      remark: "", //备注
      isVersion:true,
      contractId:'',//合同号
    };
  },
  created() {
    this.contractId=this.$route.query.contractId;
  },
  mounted() {
   if(this.$getUrl("contractHisId")){
     this.isVersion=false;
   }
    this.initModifyData();
  },
   inject: [`reload`],
  // activated() {
  //   this.initModifyData();
  // },
  methods: {
    //版本信息查看
    handleVersionDataClick(e) {
      // eslint-disable-next-line no-console
      //console.log("e", e);
      let contractId = e.id
      this.$router.push({
        path:'/index/contractMange/frame/checkFrame?contractHisId=' + contractId
      });
      this.reload();
    },
    //修改数据加载
    initModifyData() {
      let url = window.location.href;
      this.initDictionary();
      if (this.contractId) {
        //查看合同
        // url = url.split("contractId=");
        // let contractId = url[1];
        let contractId=this.contractId;
        const subForm = new FormData();
        subForm.append("contractId",contractId);
        getOdFwContract(subForm)
          .then(res => {
            this.readOnlyDataForm = res.data;
            this.remark = res.data.remark;
            let contractBeginDate = this.millisToTime(
              res.data.contractBeginDate
            );
            this.contractDateArray = res.data.contractEndDate;
            this.loading = false;
            switch (this.readOnlyDataForm.contractStatus) {
              //草拟 已驳回 → 提交
              case 10130005:
              case 10130045:
                this.finishedShow = true;
                break;
              //审核中 变更审批中 → 审核
              case 10130010:
              case 10130025:
                this.receivingShow = true;
                break;
              //已生效、开启中 → 合同关闭
              case 10130015:
              case 10130040:
                this.closeShow = true;
                break;
              //已截停、关闭中 → 合同开启
              case 10130035:
              case 10130030:
                this.checkShow = true;
                break;
              //审批后修改 → 提交变更
              case 10130020:
                this.outlineShow = true;
                break;
              default:
                break;
            }
            this.sysInfoData.createdName = res.data.createdName;
            this.sysInfoData.createdTime = res.data.createdTime;
            this.sysInfoData.updatedName = res.data.updatedName;
            this.sysInfoData.updatedTime = res.data.updatedTime;
          })
          .catch(err => {});
        this.initMatterList(contractId);
        this.initContractTermList(contractId);
        this.initFiles(contractId);
         this.initOdContractHis(contractId);//查询版本信息
      } else if (url.indexOf("contractHisId=") != -1) {
        //查看合同历史版本
        url = url.split("contractHisId=");
        let contractId = url[1];
        getOdFwContractActive({ contractIdAcvhive: contractId })
          .then(res => {
            console.log("res :", res);
            this.readOnlyDataForm = res.data;
            this.remark = res.data.remark;
            let contractBeginDate = this.millisToTime(
              res.data.contractBeginDate
            );
            this.contractDateArray = res.data.contractEndDate;
            this.sysInfoData.createdName = res.data.createdName;
            this.sysInfoData.createdTime = res.data.createdTime;
            this.sysInfoData.updatedName = res.data.updatedName;
            this.sysInfoData.updatedTime = res.data.updatedTime;
            this.loading = false;
          })
          .catch(err => {});
        this.initHisMatterList(contractId);
        this.initHisContractTermList(contractId);
        this.initHisFiles(contractId);
        this.initOdContractHis(contractId);//查询版本信息
      }
    },
    initMatterList(contractId) {
      getOdFwContractItemsList({ contractId })
        .then(res => {
          this.matterList = res.data;
          this.matterList.map((item, index) => {
            item.index = (index + 1) * 10;
           // this.originPriceCh(item, index);
            // this.originAmtCh(item, index);
            // this.taxRateCh(item, index);
            // this.taxAmtCh(item, index);
             //采购不含税单价
            item.unorginPrice = this.$unorginPrice(item.originPrice,item.taxRate);
             //采购不含税金额
            item.unorginAmt = this.$unorginAmt(item.originAmt,item.taxRate);
          });
        })
        .catch(err => {});
    },
    initHisMatterList(contractId) {
      getOdFwContractItemsArchiveList({ contractId })
        .then(res => {
          this.matterList = res.data;
          this.matterList.map((item, index) => {
            item.index = (index + 1) * 10;
            //this.originPriceCh(item, index);
            //采购不含税单价
            item.unorginPrice = this.$unorginPrice(item.originPrice,item.taxRate);
             //采购不含税金额
            item.unorginAmt = this.$unorginAmt(item.originAmt,item.taxRate);
          });
        })
        .catch(err => {});
    },
    initContractTermList(contractId) {
      getOdFwContractTermList({ contractId })
        .then(res => {
          this.odFwContractTermFormList = res.data;
        })
        .catch(err => {});
    },
    //查询版本信息
    initOdContractHis(contractId){
        this.versionData=[];
        getOdContractHis({ orginId: contractId }).then((res) => {
          this.versionData = res.data;
          this.versionData.forEach(it=>{
            it.updatedTime=this.$timeFun(item.updatedTime,true);
          })
        }).catch((err) => {
        });

    },
    initHisContractTermList(contractId) {
      getOdFwContractTermArchiveList({ contractId })
        .then(res => {
          this.odFwContractTermFormList = res.data;
        })
        .catch(err => {});
    },
    initFiles(contractId) {
      const subForm = new FormData();
      subForm.append("businessId", contractId);
      getFiles(subForm)
        .then(res => {
          this.odFwContractItemsList = res.data;
          this.odFwContractItemsList.map((item, index) => {
            item.rowno = (index + 1) * 10;
          });
        })
        .catch(err => {});
    },
    initHisFiles(contractId) {
      listArchive({ businessId: contractId })
        .then(res => {
          this.odFwContractItemsList = res.data;
          this.odFwContractItemsList.map((item, index) => {
            item.rowno = (index + 1) * 10;
          });
        })
        .catch(err => {});
    },
    initDictionary() {
      const payType = new FormData();
      payType.append("dictNo", 1020);
      getDictionary(payType).then(res => {
        this.payTypeList = res.data;
      });
      const payment = new FormData();
      payment.append("dictNo", 1021);
      getDictionary(payment).then(res => {
        this.paymentList = res.data;
      });
      const isInaType = new FormData();
      isInaType.append("dictNo", 1013);
      getDictionary(isInaType).then(res => {
        this.isInaType = res.data;
      });
      const contractType = new FormData();
      contractType.append("dictNo", 1089);
      getDictionary(contractType).then(res => {
        this.contractType = res.data;
      });
    },
    //按钮操作
    handleContractSub() {
      //协议提交
      this.$confirm("即将协议提交当前数据，是否继续？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      }).then(() => {
        approveOdFwContract({
          odFwContractList: [
            {
              contractId: this.readOnlyDataForm.contractId,
              version: this.readOnlyDataForm.version
            }
          ],
          approveType: 1
        })
          .then(res => {
            this.$openSuccess(res.message);
            this.goBack();
          })
          .catch(err => {});
      });
    },
    handleChangeSub() {
      //变更提交
      this.$confirm("即将变更提交当前数据，是否继续？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      })
        .then(() => {
          approveOdFwContract({
            odFwContractList: [
              {
                contractId: this.readOnlyDataForm.contractId,
                version: this.readOnlyDataForm.version
              }
            ],
            approveType: 1
          })
            .then(res => {
              this.$openSuccess(res.message);
              this.goBack();
            })
            .catch(err => {});
        })
        .catch(err => {});
    },
    //审核通过
    handleContractReviewPass() {
      this.$confirm("即将协议审核通过当前数据，是否继续？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      })
        .then(() => {
          auditOdFwContract({
            odFwContractList: [
              {
                contractId: this.readOnlyDataForm.contractId,
                version: this.readOnlyDataForm.version
              }
            ],
            isPass: 1
          })
            .then(res => {
              this.$openSuccess(res.message);
              this.goBack();
              this.outerVisible = false;
            })
            .catch(err => {});
        })
        .catch(err => {});
    },
    //审核驳回
    handleContractReviewDeny() {
      this.$confirm("即将协议审核驳回当前数据，是否继续？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      })
        .then(() => {
          auditOdFwContract({
            odFwContractList: [
              {
                contractId: this.readOnlyDataForm.contractId,
                version: this.readOnlyDataForm.version
              }
            ],
            isPass: 0,
            unReason: this.unReason
          })
            .then(res => {
              this.$openSuccess(res.message);
              this.goBack();
              this.outerVisible = false;
              this.innerVisible = false;
            })
            .catch(err => {});
        })
        .catch(err => {});
    },
    //合同关闭
    handleContractClose() {
      this.$confirm("即将关闭当前合同，是否继续？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      }).then(() => {
        turnOdFwContract({
          odFwContractList: [
            {
              contractId: this.readOnlyDataForm.contractId,
              version: this.readOnlyDataForm.version
            }
          ],
          isOpen: 0
        })
          .then(res => {
            this.$openSuccess(res.message);
            this.goBack();
          })
          .catch(err => {});
      });
    },
    //合同开启
    handleContractOpen() {
      this.$confirm("即将开启当前合同，是否继续？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      }).then(() => {
        turnOdFwContract({
          odFwContractList: [
            {
              contractId: this.readOnlyDataForm.contractId,
              version: this.readOnlyDataForm.version
            }
          ],
          isOpen: 1
        })
          .then(res => {
            this.$openSuccess(res.message);
            this.goBack();
          })
          .catch(err => {});
      });
    },
    // 获取标签
    handleClick(tab, event) {
      // eslint-disable-next-line no-console
      console.log("tab", tab, event);
    },
    oninput(e) {
      this.area = e.match(/^\d*(\.?\d{0,2})/g)[0] || null;
    },
    //数据操作  1修改 0删除 3启用4禁用
    deleFun() {
      if (this.selectioned.length != 1) {
        this.$openWarning("请逐条删除");
        return false;
      }
      this.$confirm("确定删除吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.odFwContractTermFormList.splice(this.index, 1);
      });
    },
    //删除方法
    deleIndex(e) {
      let del = this.odFwContractTermFormList.findIndex(item => {
        if (e.warehouseLinkId) {
          return item.warehouseLinkId == e.warehouseLinkId;
        } else {
          return item.one == e.one;
        }
      });
      this.odFwContractTermFormList.splice(del, 1);
    },
    //表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    //表格单选
    dialogCheck(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.odFwContractTermFormList.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
     //下载
    download(row) {
      window.open(row.fileServerAddress);
    },
    goBack() {
      this.$router.push("/index/contractMange/frame/framecontract");
    },
    handleAvatarSuccess(res, file) {
      // eslint-disable-next-line no-console
      console.log(res, file);
    },
    //时间转换
    millisToTime(value) {
      if (value == null || value == "") {
        return "";
      } else {
        let date = new Date(value); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + "-";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return Y + M + D;
      }
    },
    //采购含税单价变动
    originPriceCh(e, index) {
      let row = e;
      //采购不含税单价
      row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购含税金额
      row.originAmt = this.$orginAmt(row.originPrice, row.itemQty);
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unorginAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unorginPrice, this.currencyRate);
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmt, this.currencyRate);
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.currencyRate);
      // this.$set(this.matterList, index, row);
    },
    //采购含税金额变动
    originAmtCh(e, index) {
      let row = e;
      //采购含税单价
      row.originPrice = this.$orginPrice(row.originAmt, row.itemQty);
      //采购不含税单价
      row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unorginAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unorginPrice, this.currencyRate);
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.currencyRate);
      this.$set(this.matterList, index, row);
    },
    //税率变动
    taxRateCh(e, index) {
      let row = e;
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //采购不含税单价
      row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unorginAmt);

      //本币计算 对应业务币*汇率
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unorginPrice, this.currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.currencyRate);
      this.$set(this.matterList, index, row);
    },
    //业务币税额变动
    taxAmtCh(e, index) {
      let row = e;
      //采购不含税金额  采购不含税金额=采购含税金额-税额
      row.unorginAmt = this.$unorginAmtCh(row.originAmt, row.taxAmt);
      //采购不含税单价 采购不含税金额=采购不含税金额 / 数量
      row.unorginPrice = this.$unPrice(row.unorginAmt, row.itemQty);

      //本币计算 对应业务币*汇率
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unorginPrice, this.currencyRate);
      this.$set(this.matterList, index, row);
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (
          index === 7 ||
          index === 10 ||
          index === 11 ||
          index === 13
        ) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                let res = (prev * 100000 + curr * 100000) / 100000;
                if (index === 9) {
                  return res.toFixed(6);
                }
                if(index === 13){
                   return res.toFixed(2);
                }
                return res;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += "";
          } else {
            sums[index] = "";
          }
        }
      });

      return sums;
    }
  },
  computed: {
    contractAmt: {
      get() {
        let sum = 0;
        this.matterList.map(item => {
          if (item.originAmt) {
            sum += item.originAmt;
          }
        });
        return sum;
      },
      set() {}
    }
  }
};
</script>

<style lang="scss">
.remark-style {
  .el-textarea__inner {
    border-color: #97999e !important;
  }
}
.createFrame {
  /* margin-left: 19px;
  width: 97%; */
  .el_flex {
    display: flex;
    align-items: center;
  }

  .el-date-editor.el-input {
    width: auto;
  }

  .table_title {
    font-weight: bold;
    font-size: 16px;
  }
  .bcakfff {
    background: #ffffff;
    padding: 10px 0px;
  }
  .formBox {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    .lablel {
      width: 103px;
      text-align: right;
      font-size: 12px;
      padding-right: 20px;
    }
    .labelInput {
      width: 200px;
    }
    .el-input__inner {
      height: 30px;
      width: 200px;
    }
    .el-input__icon {
      line-height: 30px;
    }
    .el-select .el-input__inner {
      width: 200px;
    }
  }
  .flex_center {
    display: flex;
    margin-bottom: 0;
    .table_title {
      margin-bottom: 0;
      margin-right: 10px;
    }
    .button-div {
      margin: 0;
    }
  }
  .el-tabs__item {
    width: auto !important;
  }
  header {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 5px;
  }
  .el-col {
    position: relative;
    .comicon {
      width: 170px;
      height: 20px;
      position: absolute;
      right: 6px;
      top: 7px;
      cursor: pointer;
    }
    .absoLab {
      position: absolute;
      left: -4px;
    }
    .absdfzx {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .input-div-bor {
    border-bottom: 0;
    margin-bottom: 0;
  }
  .bortop0 {
    border-top: 0;
  }

  .el-tabs__header {
    margin-bottom: 0;
  }
  .olbutton {
    width: auto !important;
  }
}
</style>
<style lang="scss" scoped>
.remark-style {
  display: flex;
  padding-top: 10px;
  justify-content: space-around;
  width: 100%;
  label {
    width: 7.9%;
    text-align: right;
    line-height: 31px;
    padding-right: 9px;
  }

  .empty-class {
    width: 4.4%;
  }
}
.input-div {
  padding-bottom: 25px;
}
</style>
