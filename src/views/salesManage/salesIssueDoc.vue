<template>
  <div id="salesIssueDoc" class="salesIssueDoc content-div">
    <!-----------查询，重置按钮  开始------------>
    <div class="button-div button-div-query auto-sibling">
      <el-button class="query-button" @click="queryData()" icon="el-icon-search"
        >查询</el-button
      >
      <el-button @click="resetData()" icon="el-icon-refresh">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
    <!-----------查询，重置按钮 结束------------>

    <!-----------查询条件 开始------------>
    <div class="index-div3 auto-sibling">
      <!--更多条件 开始-->
      <div v-if="$checkedNum(searchList) > 4">
        <p class="hide-input" v-if="show" @click="inputShow()">
          更多条件 <i class="el-icon-caret-bottom"></i>
        </p>
        <p class="hide-input" v-else @click="inputShow()">
          收起<i class="el-icon-caret-top"></i>
        </p>
      </div>
      <!--更多条件 结束-->
      <el-form @keyup.enter.native="queryData">
      <!--查询条件主体 开始-->
      <div class="search-div">
        <contract-search
          v-for="item in searchList"
          :label="item.label"
          :key="item.key"
          :checked="item.checked"
          :matchKey="item.key"
          :company="company"
          :componyTip="componyTip"
          :branch="branch"
          :customer="customer"
          :staffName="staffName"
          :departmentTip="departmentTip"
          :staffTip="staffTip"
          :extContractCode="extContractCode"
          :doNo="doNo"
          :warehouse="warehouse"
          :warehouseTips="warehouseTips"
          :doDate="doDate"
          :contractCode="contractCode"
          :dockSoNo="dockSoNo"
          :customerTips="customerTips"
          :signReceivedDate="signReceivedDate"
          :doType="doType"
          :doTypeList="doTypeList"
          :reciver="reciver"
          :doStatus="doStatus"
          :doStatusList="doStatusList"
          :contractType="contractType"
          :contractTypeList="contractTypeList"
          :createdTime="createdTime"
          :createdName="createdName"
          :isSentConfirm="isSentConfirm"
          :warrantCode="warrantCode"
          :warrantMonth="warrantMonth"
          :departmentList="departmentList"
          :customerList="customerList"
          :staffNameList="staffNameList"
          @changeInput="changeData"
        />
      </div>
      <!--查询条件主体 结束-->
      </el-form>
    </div>
    <!-----------查询条件 开始------------>

    <!----操作按钮  开始---->
    <div class="button-div auto-sibling">
      <el-dropdown szie="mini" @command="handleCommand">
        <el-button icon="el-icon-folder-add"
          >创建<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="1"
            v-if="$actionFlag(`F001`)"
            icon="el-icon-notebook-2"
            >合同发货</el-dropdown-item
          >
          <el-dropdown-item
            command="2"
            v-if="$actionFlag(`F002`)"
            icon="el-icon-shopping-cart-2"
            >零售发货</el-dropdown-item
          >
          <el-dropdown-item
            command="3"
            v-if="$actionFlag(`F003`)"
            icon="el-icon-ship"
            >码单发货</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        @click="handleDetails(1)"
        v-if="$actionFlag(`F004`)"
        icon="el-icon-edit"
        >修改</el-button
      >
      <el-button
        @click="deleteSaleOutboundOrder()"
        v-if="$actionFlag(`F005`)"
        icon="el-icon-delete"
        >删除</el-button
      >
      <el-button
        @click="handleDetails(2)"
        v-if="$actionFlag(`F006`)"
        icon="el-icon-data-line"
        >查看</el-button
      >
      <el-button
        @click="changeStatus('submit')"
        v-if="$actionFlag(`F007`)"
        icon="el-icon-finished"
        style="margin-right:10px;"
        >提交</el-button
      >
      <el-button
        @click="handleToExamine()"
        v-if="$actionFlag(`F008`)"
        icon="el-icon-receiving"
        >审核</el-button
      >
      <el-button
        @click="changeStatus('overRelease')"
        v-if="$actionFlag(`F009`)"
        icon="el-icon-odometer"
        >超限放行</el-button
      >
      <el-button icon="el-icon-download" v-if="$actionFlag(`F010`)"    @click="exportTable"
      >导出</el-button
      >
      <el-button
        @click="customerSignIn()"
        v-if="$actionFlag(`F011`)"
        icon="el-icon-box"
        >客户签收</el-button
      >
      <el-button
        @click="handleEdit(3)"
        v-if="$actionFlag(`F012`)"
        icon="el-icon-document-copy"
        >复制</el-button
      >
      <el-button
        @click="handlePrint()"
        v-if="$actionFlag(`F013`)"
        icon="el-icon-printer"
        >打印</el-button
      >
      <el-button
        @click="handleDetails(3)"
        v-if="$actionFlag(`F014`)"
        icon="el-icon-printer"
        >打印修改</el-button
      >
      <el-button
        @click="handleDetails(4)"
        v-if="$actionFlag(`F015`)"
        icon="el-icon-printer"
        >实发确认</el-button
      >
      <el-button
      icon="el-icon-thumb"
      @click="goTree"
      v-if="$actionFlag(`F016`)"
      >生命树</el-button>
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
    <!----操作按钮  结束---->

    <!-- 表格  开始 -->
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        ref="multipleTable"
        :data="tableData"
        height="calc(100% - 35px)"
        tooltip-effect="dark"
        @select-all="dialogCheck"
        @selection-change="handleChange"
        @row-click="rowClick"
        :cell-class-name="cell"
        class="el-table"
        v-loading="loading"
        show-summary
        :summary-method="getSummaries"
        @sort-change="tableSortChange"

      >
         <el-table-column
          :key="item.key"
          :prop="item.key"
          :type="item.type"
          :label="item.label"
          v-if="item.checked"
          :width="item.width"
          :show-overflow-tooltip="item.tooltip"
          v-for="item in fixHead"
          :sortable="item.sortable"

         >
        </el-table-column>

        <el-table-column
          :key="item.key"
          :prop="item.key"
          :type="item.type"
          :label="item.label"
          v-if="item.checked"
          :width="item.width"
          :show-overflow-tooltip="item.tooltip"
          v-for="item in headerList"
          :sortable="item.sortable"
        >
         <template scope="scope" v-if="item.temp">
            <span v-if="item.key === 'isSentConfirm'">{{ scope.row.isSentConfirm == 1 ? "是" : "否" }}</span>
             <span v-if="item.key === 'secQty'">{{ $numberToFixed(scope.row.secQty, 3) }}</span>
            <span v-if="item.key === 'sumQty'">{{ $numberToFixed(scope.row.sumQty, 3) }}</span>
            <span v-if="item.key === 'currencyRate'">{{ $numberToFixed(scope.row.currencyRate, 4) }}</span>
            <span v-if="item.key === 'sumAmtVat'">{{ scope.row.sumAmtVat | $moneyFormat }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[100, 200, 300, 500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!----表格  结束------>

    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
      :tipShow="componyShow"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    >
    </compony-select>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :data="company"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    >
    </department-select>
    <!-- 选择员工弹窗 -->
    <staff-select
      v-if="staffShow"
      :tipShow="staffShow"
      :data="{companyName:company.companyName,branchName:branchNameStr.join(';') || ''}"
      @staffCancle="staffCancle"
      @staffSure="staffSure"
    >
    </staff-select>
    <!--选择销售客户 -->
    <customer-select
      v-if="customerShow"
      :tipShow="customerShow"
      @customerCancle="customerCancle(0)"
      @customerSure="customerSure"
    >
    </customer-select>
    <!--选择仓库-->
    <warehouse-select
      v-if="warehouseShow"
      :tipShow="warehouseShow"
      @warehouseCancle="warehouseCancle"
      @warehouseSure="warehouseSure"
    >
    </warehouse-select>

    <!--客户签收弹窗 开始-->
    <el-dialog
      :visible.sync="siginShow"
      :show-close="false"
      :close-on-click-modal="false"
      title="客户签收"
      width="400px"
      class="popup_box"
    >
      <div style="width:90%;text-align: center;overflow: hidden;margin:10px">
        <label style="font-size:12px">签收日期：</label>
        <el-date-picker
          class="el-input2"
          style="width:178px;"
          v-model="signingDate"
          type="date"
          size="small"
          value-format="yyyy-MM-dd"
          @change="changeDate"
          placeholder="请选择日期"
        >
        </el-date-picker>
      </div>
      <div class="button-div2">
        <el-button
          @click="custSure"
          class="examine_button"
          icon="el-icon-check"
          :disabled="siginStatus"
          >确定</el-button
        >
        <el-button @click="custCancle" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--客户签收弹窗 结束-->

    <!--审核弹窗 开始-->
    <el-dialog
      :visible.sync="examineShow"
      :show-close="false"
      :close-on-click-modal="false"
      title="审核"
      width="400px"
      class="popup_box"
    >
      <div class="examine-dialog">
        <p v-if="!examineOne && examineValue == 'outbound'" class="tips">
          <i class="el-icon-info"></i>
          批量出库确认时过账时间以出库单中出库时间为准，请事先确认，谨慎操作！
        </p>
        <el-col :span="24" class="el-col">
          <label><span class="must-full">*</span>审核</label>
          <el-select
            clearable
            size="small"
            class="el-select"
            @change="examineSelect"
            v-model="examineValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in examineList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col
          v-if="examineOne && examineValue == 'outbound'"
          :span="24"
          class="el-col"
        >
          <label><span class="must-full">*</span>出库日期</label>
          <el-date-picker
            class="el-input2"
            style="width:178px;"
            v-model="examineDate"
            type="date"
            size="small"
            placeholder="请选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-col>
        <el-col v-if="examineValue == 'reject'" :span="24" class="el-col">
          <label style="vertical-align:top">驳回原因</label>
          <el-input
            type="textarea"
            autosize
            v-model="rejectReason"
            size="small"
            class="el-textarea"
            placeholder="请输入内容"
          >
          </el-input>
        </el-col>
      </div>
      <div class="button-div2">
        <el-button
          class="examine_button"
          @click="examineSure"
          icon="el-icon-check"
          :disabled="examineStatus"
          >确定</el-button
        >
        <el-button type="primary" @click="examineCancle" icon="el-icon-close"
          >取消</el-button
        >
      </div>
    </el-dialog>
    <!--审核弹窗 结束-->

    <!--合同发货弹窗 开始-->
    <el-dialog
      :visible.sync="contractTipShow"
      :close-on-click-modal="false"
      title="选择销售合同"
      :show-close="false"
      width="1100px"
      class="popup_box"
    >
      <div class="index" id="contractDelivery">
        <div class="button-div">
          <el-button @click="selectContractInfo()" icon="el-icon-search"
            >查询</el-button
          >
          <el-button @click="resetcodeSheetData(1)" icon="el-icon-refresh"
            >重置</el-button
          >
        </div>
        <!--按钮样式-->
        <div class="index-div3 index-div4">
          <p
            class="hide-input"
            v-if="contractData.show"
            @click="inputShowCont()"
          >
            更多条件 <i class="el-icon-caret-bottom"></i>
          </p>
          <p class="hide-input" v-else @click="inputShowCont()">
            收起<i class="el-icon-caret-top"></i>
          </p>
          <div class="dialog-search-div">
            <el-col :span="5" class="el-col">
              <label>公司</label>
              <el-select
                clearable
                filterable
                size="small"
                class="el-select"
                v-model="contractData.companyId"
                @change="getBranchByCompanyId(1)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in contractData.companyList"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>部门</label>
              <el-select
                clearable
                filterable
                size="small"
                class="el-select"
                v-model="contractData.branchId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in contractData.branchList"
                  :key="item.branchId"
                  :label="item.branchName"
                  :value="item.branchId"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>客户</label>
              <el-input
                v-model="contractData.customerName.customerName"
                size="small"
                class="el-inputs"
                placeholder="请选择"
                disabled
              ></el-input>
              <span
                class="comicon"
                style="right: 8px; top: 2px;"
                @click="customerTips(1)"
                ><i class="el-icon-search"></i
              ></span>
              <!-- <el-select clearable  size="small" class="el-select"  v-model="contractData.customerId" placeholder="请选择" >
                            <el-option v-for="item in contractData.custList"
                                        :key="item.customerId"
                                        :label="item.customerName"
                                        :value="item.customerId"
                                ></el-option>
                            </el-select> -->
            </el-col>
            <el-col :span="5" class="el-col">
              <label>销售合同号</label>
              <el-input
                class="el-inputs"
                v-model="contractData.soContractNo"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>外部合同号</label>
              <el-input
                class="el-inputs"
                v-model="contractData.extCode"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>签订日期</label>
              <el-date-picker
                class="el-input2"
                v-model="contractData.signTime"
                type="daterange"
                size="mini"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>有效日期</label>
              <el-date-picker
                v-model="contractData.contractEndDate"
                class="el-input2"
                type="daterange"
                size="mini"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>创建日期</label>
              <el-date-picker
                class="el-input2"
                v-model="contractData.createdTime"
                type="daterange"
                size="mini"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </el-col>
          </div>
        </div>
        <div class="el-table-div">
          <el-table
            border
            center
            ref="multipleTableCont"
            :data="contractData.tableData"
            tooltip-effect="dark"
            @select-all="contDialogCheck"
            @select="contDialogCheck"
            @row-click="contDialogRowClick"
            @selection-change="handleContChange"
            class="el-table"
            v-loading="contractData.loading"
          >
            <el-table-column
              type="selection"
              width="45"
              align="center"
            ></el-table-column>
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column
              prop="soContractNo"
              label="销售合同号"
              width="120px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="extCode"
              label="外部合同号"
              width="120px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="custName"
              label="客户"
              width="120px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="contractEndDate"
              label="有效日期"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="createdName"
              label="创建人"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="createdTime"
              label="创建时间"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="updatedName"
              label="修改人"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="updatedTime"
              label="修改日期"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @size-change="handleContSizeChange"
            @current-change="handleContCurrentChange"
            :current-page="contractData.pageNum"
            :page-sizes="[100, 200, 300, 500]"
            :page-size="contractData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="contractData.total"
          >
          </el-pagination>
        </div>
        <div class="button-div2">
          <el-button
            @click="contEidtPage()"
            class="query-button"
            icon="el-icon-check"
            >确定</el-button
          >
          <el-button @click="cancel(1)" icon="el-icon-close">取消</el-button>
        </div>
      </div>
      <!--选择销售客户 -->
      <customer-select
        v-if="customerShow1"
        :tipShow="customerShow1"
        @customerCancle="customerCancle(1)"
        @customerSure="customerSure1"
      >
      </customer-select>
    </el-dialog>
    <!--合同发货弹窗 结束-->

    <!--码单弹窗  开始-->
    <el-dialog
      :visible.sync="codeTipShow"
      :close-on-click-modal="false"
      title="码单发货"
      :show-close="false"
      width="1100px"
      class="popup_box"
    >
      <div class="index" id="codeSheetDelivery">
        <!--按钮样式-->
        <div class="button-div">
          <el-button
            @click="initcodeSheetData()"
            class="query-button"
            icon="el-icon-search"
            >查询</el-button
          >
          <el-button @click="resetcodeSheetData(2)" icon="el-icon-refresh"
            >重置</el-button
          >
        </div>
        <div class="index-div3 index-div4 index-div5">
          <p
            class="hide-input"
            v-if="codeSheetData.show"
            @click="inputShowCode()"
          >
            更多条件 <i class="el-icon-caret-bottom"></i>
          </p>
          <p class="hide-input" v-else @click="inputShowCode()">
            收起<i class="el-icon-caret-top"></i>
          </p>
          <div class="dialog-search-div">
            <!-- <h3 style="padding:10px">码单发货</h3> -->
            <el-col :span="5" class="el-col">
              <label>仓库</label>
              <el-select
                clearable
                size="small"
                class="el-select"
                v-model="codeSheetData.warehouseCode"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in codeSheetData.warehouseList"
                  :key="item.warehouseCode"
                  :label="item.warehouseName"
                  :value="item.warehouseCode"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>公司</label>
              <el-select
                clearable
                filterable
                size="small"
                class="el-select"
                v-model="codeSheetData.companyId"
                @change="getBranchByCompanyId(2)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in codeSheetData.companyList"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>部门</label>
              <el-select
                clearable
                filterable
                size="small"
                class="el-select"
                v-model="codeSheetData.branchId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in codeSheetData.orgList"
                  :key="item.branchId"
                  :label="item.branchName"
                  :value="item.branchId"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>客户组</label>
              <el-input
                v-model="codeSheetData.customerName.creditGroupName"
                size="small"
                class="el-inputs"
                placeholder="请选择"
                disabled
              ></el-input>
              <span
                class="comicon"
                style="right: 8px; top: 2px;"
                @click="creditGroupPopup"
                ><i class="el-icon-search"></i
              ></span>
              <!-- <el-select clearable  size="small" class="el-select"  v-model="codeSheetData.customerCode" placeholder="请选择" >
                                <el-option v-for="item in codeSheetData.custList"
                                            :key="item.customerCode"
                                            :label="item.customerName"
                                            :value="item.customerCode"
                                    ></el-option>
                            </el-select> -->
            </el-col>
            <el-col :span="5" class="el-col">
              <label>码单号</label>
              <el-input
                class="el-inputs"
                v-model="codeSheetData.dockSoNo"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>发货日期</label>
              <el-date-picker
                class="el-input2"
                v-model="codeSheetData.sendDateTime"
                type="daterange"
                size="mini"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>外部码单号</label>
              <el-input
                class="el-inputs"
                v-model="codeSheetData.dockExtNo"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>车号</label>
              <el-input
                class="el-inputs"
                v-model="codeSheetData.carNo"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>船号</label>
              <el-input
                class="el-inputs"
                v-model="codeSheetData.shipNo"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
          </div>
        </div>
        <div class="el-table-div">
          <el-table
            border
            center
            ref="multipleTableCode"
            :data="codeSheetData.tableData"
            tooltip-effect="dark"
            @select-all="codeDialogCheck"
            @selection-change="handleCodeChange"
            @row-click="handleCodeRowClick"
            class="el-table"
            v-loading="codeSheetData.loading"
          >
            <el-table-column
              type="selection"
              width="45"
              align="center"
            ></el-table-column>
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column
              prop="warehouseName"
              label="仓库"
              width="120px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="custName"
              label="客户"
              width="120px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="dockSoNo"
              label="码单号"
              width="150px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="rowno"
              label="码单行号"
              width="150px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sendDate"
              label="发货日期"
              width="120px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="goodsCode"
              label="物料编号"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="物料名称"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="goodsCategoryName"
              label="物料大类"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="goodsSpec"
              label="物料规格"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="itemUnitName"
              label="基础单位"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="itemQty"
              label="数量"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="secUnitName"
              label="第二单位"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="secQty"
              label="第二数量"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="currencyName"
              label="币种"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="originPrice"
              label="单价"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="originAmt"
              label="含税金额"
              width="100px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              width="120px"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @size-change="handleCodeSizeChange"
            @current-change="handleCodeCurrentChange"
            :current-page="codeSheetData.pageNum"
            :page-sizes="[100, 200, 300, 500]"
            :page-size="codeSheetData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="codeSheetData.total"
          >
          </el-pagination>
        </div>
        <div class="button-div2">
          <el-button
            @click="toEidtPage()"
            class="query-button"
            icon="el-icon-check"
            >确定</el-button
          >
          <el-button @click="cancel(2)" icon="el-icon-close">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <!--信用账户组弹窗-->
    <creditGroup-select
      :isShow="creditGroupShow"
      @callback="creditGroupSelectData"
    ></creditGroup-select>
    <!--码单弹窗  结束-->
    <!--   自定义搜索选项-->
    <edit-search-item
      v-if="editPage"
      :list="editList"
      :title="editKey==='searchList'?'自定义搜索条件':'自定义表格排序'"
      :editPage="editPage"
      @editCancel="editCancel"
      @editSure="editSure"
    ></edit-search-item>
  </div>
</template>
<script>
import { mapState } from "vuex";
import sApi from "@/api/salesManage/salesManage";
import componySelect from "@/components/componySelect.vue";
import customerSelect from "@/components/customerSelect2.vue"; //客户组件
import departmentSelect from "@/components/departmentSelect2.vue";
import staffSelect from "@/components/staffSelect2.vue";
import warehouseSelect from "@/components/warehouseSelect.vue";
import creditGroupSelect from "@/components/creditGroupSelect";
import contractSearch from "@/views/salesManage/component/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import { getFilter, setFilter } from "@/mixins/editCondition";
import { exportData } from "@/mixins/export.js";

const AllSearch = [
  { key: "companyName", label: "公司", checked: true },
  { key: "branch", label: "部门", checked: true },
  { key: "staffName", label: "业务员", checked: true },
  { key: "customer", label: "销售客户", checked: true },
  { key: "extContractCode", label: "外部合同号", checked: true },
  { key: "doNo", label: "出库单号", checked: true },
  { key: "warehouseName", label: "仓库", checked: true },
  { key: "doDate", label: "出库日期", checked: true },
  { key: "signReceivedDate", label: "签收日期", checked: true },
  { key: "doType", label: "放货类型", checked: true },
  { key: "reciver", label: "收件人", checked: true },
  { key: "doStatus", label: "单据状态", checked: true },
  { key: "contractType", label: "销售类型", checked: true },
  { key: "createdTime", label: "创建时间", checked: true },
  { key: "createdName", label: "创建人", checked: true },
  { key: "contractCode", label: "销售合同号", checked: true },
  { key: "dockSoNo", label: "码单号", checked: true },
  { key: "isSentConfirm", label: "是否确认实发", checked: true },
  { key: "warrantCode", label: "凭证号", checked: true },
  { key: "warrantMonth", label: "期间", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    label: "出库日期",
    tooltip: true,
    key: "doDate",
    checked: true,
    width: "110",
    sortable: true,
  },
  {
    label: "出库单号",
    tooltip: true,
    key: "doNo",
    checked: true,
    width: "120",
    sortable: true,
  },
  {
    label: "销售客户",
    tooltip: true,
    key: "custName",
    checked: true,
    width: "170",
  },
  {
    label: "公司",
    tooltip: true,
    key: "companyName",
    checked: true,
    width: "170",
  },
  {
    label: "部门",
    tooltip: true,
    key: "orgName",
    checked: true,
    width: "170",
  },
  {
    label: "业务员",
    tooltip: true,
    key: "bizPersonName",
    checked: true,
    width: "170",
  },
  {
    label: "仓库",
    tooltip: true,
    key: "warehouseName",
    checked: true,
    width: "170",
  },
  {
    label: "送货地址",
    tooltip: true,
    key: "reciverAddress",
    checked: true,
    width: "170",
  },
  {
    label: "单据状态",
    tooltip: true,
    key: "doStatusName",
    checked: true,
    width: "100",
    otherKey: "doStatus",
  },
  {
    label: "是否确认实发",
    tooltip: true,
    key: "isSentConfirm",
    checked: true,
    width: "120",
    temp: true,
  },
  {
    label: "销售类型",
    tooltip: true,
    key: "contractName",
    checked: true,
    width: "100",
    otherKey: "contractType",
  },
  {
    label: "出库总金额",
    tooltip: true,
    key: "sumAmtVat",
    checked: true,
    width: "120",
    temp: true,
    sortable: true,
  },
  {
    label: "第二数量",
    tooltip: true,
    key: "secQty",
    checked: true,
    temp: true,
    width: "100",
    sortable: true,
  },
  {
    label: "统计数量",
    tooltip: true,
    key: "sumQty",
    checked: true,
    temp: true,
    width: "100",
    sortable: true,
  },
  {
    label: "业务币别",
    tooltip: true,
    key: "currencyName",
    checked: true,
    width: "100",
    otherKey: "currencyCode",
  },
  {
    label: "汇率",
    tooltip: true,
    key: "currencyRate",
    checked: true,
    width: "100",
    temp: true,
  },
  {
    label: "签收日期",
    tooltip: true,
    key: "signReceivedDate",
    checked: true,
  },
  {
    label: "凭证号",
    tooltip: true,
    key: "warrantCode",
    checked: true,
  },
  {
    label: "期间",
    tooltip: true,
    key: "warrantMonth",
    checked: true,
  },
  {
    label: "创建人",
    tooltip: true,
    key: "createdName",
    checked: true,
    width: "110",
  },
  {
    label: "创建时间",
    tooltip: true,
    key: "createdTime",
    checked: true,
    width: "110",
  },
]; //所有表头
export default {
  name: "salesIssueDoc",
  data() {
    return {
      branchNameStr: [],
      departmentList: [],
      staffNameList: [],
      customerList: [],
      sort: "",
      fixHead: [
        {
          type: "selection",
          key: "selection",
          checked: true,
          width: "80",
          align: "center",
        },
        {
          type: "index",
          label: "序号",
          tooltip: true,
          key: "index",
          checked: true,
          width: "50",
        },

      ],
      editPage: false,
      searchList: AllSearch,
      headerList: ALLHeader,
      editKey: "",
      editList: [],
      componyShow: false, //公司弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      warehouseShow: false, //仓库
      customerShow: false, //客户弹窗
      customerShow1: false, //客户弹窗
      creditGroupShow: false, //客户弹窗
      company: {}, //公司名
      branch: [], //部门
      staffName: [], //业务员
      companyCode: "", //公司代码
      branchCode: "", //部门代码
      staffCode: "", //业务员代码
      warehouse: {}, //c仓库名称
      warehouseCode: "", //仓库代码
      customer: [], //客户名称
      custId: "", //客户id
      doStatusList: [], //单据状态列表
      doStatus: [], //单据状态
      doNo: "", //出库单号
      extContractCode: "", //外部合同号
      createdTime: [], //创建时间
      doDate: [], //出库日期
      signReceivedDate: [], //签收日期
      contractTypeList: [], //销售类型下拉数据
      contractType: [], //销售类型
      doTypeList: [], //放货类型下拉数据
      doType: "", //放货类型
      reciver: "", //收件人
      createdName: "", //创建人
      show: true, //查询条件显示隐藏
      pageSize: 100,
      pageNum: 1,
      total: 0,
      selectioned: [], //选中
      loading: false,
      tableData: [], //列表
      siginShow: false, //客户签收
      signingDate: "", //弹窗里的签收日期
      doId: "", //客户签收需要id
      dockSoNo: "",
      contractCode: "",
      version: "", //版本号
      contractTipShow: false, //合同弹窗
      codeTipShow: false, //码单弹窗
      showOrHide: true, //页面查询
      examineShow: false, //审核弹窗
      examineOne: true, //审核单条还是多条
      examineValue: "outbound", //审核选中的值
      examineList: [
        // {value:"pass",label:"通过"},
        // {value:"reject",label:"驳回"},
        { value: "outbound", label: "出库确认" },
      ],
      examineDate: "", //审核弹窗里的出库日期
      rejectReason: "", //驳回原因
      pickerOptions: {}, //时间范围
      currencyList: [], //业务币别信息
      examineStatus: true, //审核状态
      siginStatus: true, //客户签收状态
      contractData: {
        companyList: [], //公司名
        companyId: "", //公司代码
        branchList: [], //部门
        branchId: "", //部门代码
        customerName: {},
        custCode: "",
        custId: "", //客户id
        soContractNo: "", //销售合同号
        extCode: "", //外部合同号
        createdTime: [], //创建日期
        contractEndDate: [], //有效日期
        signTime: [], //签订日期
        show: true, //查询条件显示隐藏
        selectioned: "", //选中
        loading: false,
        tableData: [],
        pageSize: 100,
        pageNum: 1,
        total: 0,
      },
      //码单弹窗
      codeSheetData: {
        companyId: "", //公司名
        companyList: [],
        branchId: "", //部门
        orgList: [],
        warehouseCode: "", //仓库名称
        warehouseList: [],
        customerName: {}, //信用客户组
        creditGroupCode: "",
        dockSoNo: "", //码单号
        dockExtNo: "", //外部码单号
        sendDate: "", //发货日期
        shipNo: "", //船号
        carNo: "", //车号
        sendDateTime: [], //发货日期
        show: true, //查询条件显示隐藏
        selectioned: [], //选中
        loading: false,
        tableData: [],
        pageSize: 100,
        pageNum: 1,
        total: 0,
      },
      sumTol: {}, //总计
      isSentConfirm: "",
      warrantCode: "", //凭证号
      warrantMonth: "", //期间
    };
  },
  mixins: [getFilter, setFilter, exportData],
  watch:{
    // '$route'(){
    //   this.queryData();
    // },
  },
  created() {
    if (this.$route.params.status) {
      this.doStatus = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
      this.queryData();
    }
    let data = this.$getQueryData(this);
    this.departmentList = data.branch;
    this.staffNameList = data.staffName;
    this.customerList = data.customer;
    this.doStatus=data.doStatusList;
    this.contractType=data.contractTypeList;
    if (data.signReceivedDateBegain) {
      this.signReceivedDate[0] = data.signReceivedDateBegain;
    }
    if (data.signReceivedDateEnd) {
      this.signReceivedDate[1] = data.signReceivedDateEnd;
    }
    if (data.doDateBegain) {
      this.doDate[0] = data.doDateBegain;
    }
    if (data.doDateEnd) {
      this.doDate[1] = data.doDateEnd;
    }
    if (data.createdTimeBegain) {
      this.createdTime[0] = data.createdTimeBegain;
    }
    if (data.createdTimeEnd) {
      this.createdTime[1] = data.createdTimeEnd;
    }
    this.getDoStatusList(); //单据状态
    this.getDoTypeList(); //放货类型
    this.selectCurrency(); //业务币别
    this.getContractTypeList(); //销售类型
    this.getFilter();
  },
  methods: {
    //查看生命树
    goTree(){
        if (this.selectioned.length === 1) {
        sessionStorage.setItem("bizCode", this.selectioned[0].doNo);
        sessionStorage.setItem("bizType", "OD_DO");
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.selectioned[0].doNo,
            bizType:"OD_DO"
          }
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectioned[0].doNo,
          bizType:"OD_DO"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    exportTable() {
      if (this.signReceivedDate && this.signReceivedDate.length) {
        var signReceivedDateBegain = this.signReceivedDate[0]; //签收日期
        var signReceivedDateEnd = this.signReceivedDate[1];
      }
      if (this.doDate && this.doDate.length) {
        var doDateBegain = this.doDate[0]; //出库日期
        var doDateEnd = this.doDate[1];
      }
      if (this.createdTime && this.createdTime.length) {
        var createdTimeBegain = this.createdTime[0]; //创建时间
        var createdTimeEnd = this.createdTime[1];
      }
      if (this.company) {
        var companyCode = this.company.companyCode; //公司
      }
      if (this.branch) {
        var branchCode = this.branch.branchCode; //部门
      }
      if (this.staffName) {
        var staffCode = this.staffName.empCode; //业务员
      }
      if (this.doNo) {
        var doNo = this.doNo; //出库单号
      }
      if (this.extContractCode) {
        var extContractCode = this.extContractCode; //外部合同号
      }
      if (this.warehouse) {
        var warehouseCode = this.warehouse.warehouseCode; //仓库
      }
      if (this.customer) {
        var custId = this.customer.customerId; //销售客户
      }
      if (this.reciver) {
        var reciver = this.reciver; //收件人
      }
      if (this.doStatus) {
        var doStatus = this.doStatus; //单据状态
      }
      if (this.doType) {
        var doType = this.doType; //放货类型
      }
      if (this.contractType) {
        var contractType = this.contractType; //销售类型
      }
      if (this.createdName) {
        var createdName = this.createdName; //创建人
      }
      let data = {
        pageNum: this.pageNum,
        sort: this.sort,
        pageSize: this.pageSize,
        companyCode: companyCode, //公司
        orgCode: branchCode, //部门
        warehouseCode: warehouseCode, //仓库
        doNo: doNo, //出库单号
        extContractCode: extContractCode, //外部合同号
        custId: custId, //销售客户
        bizPersonCode: staffCode, //业务员
        doStatusList: doStatus, //单据状态
        doType: doType, //放货类型
        contractTypeList: contractType, //销售类型
        reciver: reciver, //收件人
        createdTimeBegain: createdTimeBegain,
        createdTimeEnd: createdTimeEnd, //创建时间
        doDateBegain: doDateBegain,
        doDateEnd: doDateEnd, //出库日期
        signReceivedDateBegain: signReceivedDateBegain, //签收日期
        signReceivedDateEnd: signReceivedDateEnd,
        createdName: createdName, //创建人
        order: "desc",
        isSentConfirm: this.isSentConfirm,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
      };
      let params = data;
      params.company = this.company;
      params.warehouse = this.warehouse;
      params.staffName = this.staffName;
      // data.staffNameList = this.staffNameList;
      params.customer = this.customer;
     // params.customerList = this.customerList;
      params.branch = this.branch;
     // params.departmentList = this.departmentList;
      const fixHead = JSON.parse(JSON.stringify(this.fixHead));
      fixHead.splice(0, 2);
      const exportFieldList = [];
      fixHead.concat(this.headerList).forEach((item) => {
        if (item.checked) {
          const { key, label, otherKey } = item;
          exportFieldList.push({ key: otherKey ? otherKey : key, label })

        }
      });
      this.exportData({ ...data, exportFieldList });
    },
    tableSortChange(column) {
      const { prop, order } = column;
      if (order === "descending") {
        this.sort = `${prop} desc`;
      } else {
        this.sort = `${prop} asc`;
      }
      this.initData();
    },
    editCancel(list) {
      this.editPage = false;
      this[this.editKey] = list;
    },
    editSure(list) {
      this.editPage = false;
      this[this.editKey] = []; //必须先清空 再更新 否则不触发
      this.$nextTick(() => {
        this[this.editKey] = list;
        this.setFilter({
          filterJson: JSON.stringify(this.headerList),
          listJson: JSON.stringify(this.searchList),
        });
      });
    },
    showEditPage(key) {
      this.editKey = key;
      this.editPage = true;
      this.editList = this[key];
    },
    changeData({ val, key }) {
      this[key] = val;
    },
    cell({ row, column, rowIndex, columnIndex }) {
      //第八列添加 red 类
      if (
        column.property == "sumAmtVat" ||
        column.property == "sumQty" || 
         column.property == "secQty" || 
        column.property == "currencyRate"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    queryData() {
      this.initData();
      this.getSum();
    },
    initData() {
      this.tableData = [];
      this.loading = true;
      if (this.signReceivedDate && this.signReceivedDate.length) {
        var signReceivedDateBegain = this.signReceivedDate[0]; //签收日期
        var signReceivedDateEnd = this.signReceivedDate[1];
      }
      if (this.doDate && this.doDate.length) {
        var doDateBegain = this.doDate[0]; //出库日期
        var doDateEnd = this.doDate[1];
      }
      if (this.createdTime && this.createdTime.length) {
        var createdTimeBegain = this.createdTime[0]; //创建时间
        var createdTimeEnd = this.createdTime[1];
      }
      if (this.company) {
        var companyCode = this.company.companyCode; //公司
      }
      if (this.branch) {
        var branchCode = this.branch; //部门
      }
      if (this.staffName) {
        var staffCode = this.staffName; //业务员
      }
      if (this.doNo) {
        var doNo = this.doNo; //出库单号
      }
      if (this.extContractCode) {
        var extContractCode = this.extContractCode; //外部合同号
      }
      if (this.warehouse) {
        var warehouseCode = this.warehouse.warehouseCode; //仓库
      }
      if (this.customer) {
        var custId = this.customer; //销售客户
      }
      if (this.reciver) {
        var reciver = this.reciver; //收件人
      }
      if (this.doStatus) {
        var doStatus = this.doStatus; //单据状态
      }
      if (this.doType) {
        var doType = this.doType; //放货类型
      }
      if (this.contractType) {
        var contractType = this.contractType; //销售类型
      }
      if (this.createdName) {
        var createdName = this.createdName; //创建人
      }
      let data = {
        pageNum: this.pageNum,
        sort: this.sort,
        pageSize: this.pageSize,
        companyCode: companyCode, //公司
        bbBranchBaseList: branchCode, //部门
        warehouseCode: warehouseCode, //仓库
        doNo: doNo, //出库单号
        extContractCode: extContractCode, //外部合同号
        bbCustomerBaseList: custId, //销售客户
        bbEmployeeList: staffCode, //业务员
        doStatusList: doStatus, //单据状态
        doType: doType, //放货类型
        contractTypeList: contractType, //销售类型
        reciver: reciver, //收件人
        createdTimeBegain: createdTimeBegain,
        createdTimeEnd: createdTimeEnd, //创建时间
        doDateBegain: doDateBegain,
        doDateEnd: doDateEnd, //出库日期
        signReceivedDateBegain: signReceivedDateBegain, //签收日期
        signReceivedDateEnd: signReceivedDateEnd,
        createdName: createdName, //创建人
        order: "desc",
        isSentConfirm: this.isSentConfirm,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        contractCode: this.contractCode,
        dockSoNo: this.dockSoNo,
      };
      let params = data;
      params.company = this.company;
      params.warehouse = this.warehouse;
      params.staffName = this.staffName;
      data.staffNameList = this.staffNameList;
      params.customer = this.customer;
      params.customerList = this.customerList;
      params.branch = this.branch;
      params.departmentList = this.departmentList;
      //存查询条件
      this.$setQueryData(this, params);
      //存查询条件
      console.log(data);
      sApi
        .selectListExtOdDo(data)
        .then((res) => {
          if ((res.code = "success")) {
            let list = res.data.list;
            this.total = res.data.total;
            let _this = this;
            _this.$nextTick(() => {
              list.forEach((item) => {
                //转换列表中的销售类型，单据状态
                item.createdTime = _this.$timeFun(item.createdTime, true);
                item.signReceivedDate = _this.$timeFun(
                  item.signReceivedDate,
                  true
                );
                item.doDateTimes = item.doDate;
                item.doDate = _this.$timeFun(item.doDate, true);
                item.contractType = "" + item.contractType;
                _this.contractTypeList.forEach((item1) => {
                  if (item.contractType == item1.dict_code) {
                    item.contractName = item1.dict_value;
                  }
                });
                item.doStatus = "" + item.doStatus;
                _this.doStatusList.forEach((item2) => {
                  if (item.doStatus == item2.dict_code) {
                    item.doStatusName = item2.dict_value;
                  }
                });
                //业务币别
                _this.currencyList.forEach((item3) => {
                  if (item.currencyCode == item3.currencyCode) {
                    item.currencyName = item3.currencyName;
                  }
                });
              });
            });
            this.tableData = list;
            this.loading = false;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.message,
              type: "error",
            });
            this.loading = false;
          }
        })
        .catch();
    },
    //获取总计
    getSum() {
      if (this.signReceivedDate && this.signReceivedDate.length) {
        var signReceivedDateBegain = this.signReceivedDate[0]; //签收日期
        var signReceivedDateEnd = this.signReceivedDate[1];
      }
      if (this.doDate && this.doDate.length) {
        var doDateBegain = this.doDate[0]; //出库日期
        var doDateEnd = this.doDate[1];
      }
      if (this.createdTime && this.createdTime.length) {
        var createdTimeBegain = this.createdTime[0]; //创建时间
        var createdTimeEnd = this.createdTime[1];
      }
      if (this.companyCode) {
        var companyCode = this.companyCode; //公司
      }
      if (this.branch || this.branch.legnth > 0) {
        var branchCode = this.branch; //部门
      }
      if (this.staffName || this.staffName.length > 0) {
        var staffCode = this.staffName; //业务员
      }
      if (this.doNo) {
        var doNo = this.doNo; //出库单号
      }
      if (this.extContractCode) {
        var extContractCode = this.extContractCode; //外部合同号
      }
      if (this.warehouse) {
        var warehouseCode = this.warehouse.warehouseCode; //仓库
      }
      if (this.customer || this.customer.length > 0) {
        var custId = this.customer; //销售客户
      }
      if (this.reciver) {
        var reciver = this.reciver; //收件人
      }
      if (this.doStatus) {
        var doStatus = this.doStatus; //单据状态
      }
      if (this.doType) {
        var doType = this.doType; //放货类型
      }
      if (this.contractType) {
        var contractType = this.contractType; //销售类型
      }
      if (this.createdName) {
        var createdName = this.createdName; //创建人
      }
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        companyCode: companyCode, //公司
        bbBranchBaseList: branchCode, //部门
        warehouseCode: warehouseCode, //仓库
        doNo: doNo, //出库单号
        extContractCode: extContractCode, //外部合同号
        bbCustomerBaseList: custId, //销售客户
        bbEmployeeList: staffCode, //业务员
        doStatusList: doStatus, //单据状态
        doType: doType, //放货类型
        contractTypeList: contractType, //销售类型
        reciver: reciver, //收件人
        createdTimeBegain: createdTimeBegain,
        createdTimeEnd: createdTimeEnd, //创建时间
        doDateBegain: doDateBegain,
        doDateEnd: doDateEnd, //出库日期
        signReceivedDateBegain: signReceivedDateBegain, //签收日期
        signReceivedDateEnd: signReceivedDateEnd,
        createdName: createdName, //创建人
       // sort: "do_no",
        order: "desc",
        isSentConfirm: this.isSentConfirm,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        contractCode: this.contractCode,
        dockSoNo: this.dockSoNo,
      };
      sApi
        .selectListExtOdDoSum(data)
        .then((res) => {
          this.sumTol = res.data;
        })
        .catch();
    },
    //总计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        } else if (index === 1) {
          sums[index] = "";
          return;
        }
        let key = column.property;
        if (["sumAmtVat", "sumQty","secQty"].findIndex((it) => it == key) !== -1) {
          sums[index] = this.sumTol ? this.$sumTolFormat(this.sumTol[key]) : "";
        } else {
          sums[index] = "";
        }
      });
      this.$nextTick(() => {
        this.$refs.multipleTable.doLayout();
      });
      return sums;
    },
    //获取业务币列表
    selectCurrency() {
      sApi
        .listSimple()
        .then((res) => {
          if (res.code == "success") {
            this.currencyList = res.data;
            this.queryData();
          }
        })
        .catch();
    },
    //码单信息查询
    initcodeSheetData() {
      this.codeSheetData.tableData = [];
      var that = this.codeSheetData;
      that.loading = true;
      if (that.companyId) {
        var companyId = that.companyId;
      }
      if (that.branchId) {
        var branchId = that.branchId;
      }
      if (that.warehouseCode) {
        var warehouseCode = that.warehouseCode;
      }
      if (that.creditGroupCode) {
        var creditGroupCode = that.creditGroupCode;
      }
      if (that.dockSoNo) {
        var dockSoNo = that.dockSoNo;
      }
      if (that.sendDateTime && that.sendDateTime.length) {
        var sendDate = that.sendDateTime[0];
        var sendDateEnd = that.sendDateTime[1];
      }
      if (that.dockExtNo) {
        var dockExtNo = that.dockExtNo;
      }
      if (that.carNo) {
        var carNo = that.carNo;
      }
      if (that.shipNo) {
        var shipNo = that.shipNo;
      }
      let data = {
        pageSize: that.pageSize,
        pageNum: that.pageNum,
        companyId: companyId, //公司
        orgId: branchId, //部门
        creditGroupCode: creditGroupCode, //客户
        warehouseCode: warehouseCode, //仓库
        sendDate: sendDate, //发货开始日期
        sendDateEnd: sendDateEnd, //发货结束日期
        carNo: carNo, //车号
        shipNo: shipNo, //船号
        dockExtNo: dockExtNo, //外部码单号
        dockSoNo: dockSoNo, //码单号
      };
      sApi
        .socketDockSoList(data)
        .then((res) => {
          if ((res.code = "success")) {
            this.codeSheetData.total = res.data.total;
            let list = res.data.list;
            for (let i = 0; i < list.length; i++) {
              list[i].sendDate = this.$timeFun(list[i].sendDate, true);
            }
            this.codeSheetData.tableData = list;
            that.loading = false;
          } else {
            this.$openWarning(res.message);
            that.loading = false;
          }
        })
        .catch();
    },
    //查询合同信息
    selectContractInfo() {
      this.contractData.loading = true;
      var that = this.contractData;
      if (that.companyId) {
        var companyId = that.companyId; //公司
      }
      if (that.branchId) {
        var branchId = that.branchId; //部门
      }
      if (that.custId) {
        var custId = that.custId; //销售客户
      }
      if (that.soContractNo) {
        //销售合同号
        var soContractNo = that.soContractNo;
      }
      if (that.extCode) {
        //采购合同
        var extCode = that.extCode;
      }
      if (that.contractEndDate && that.contractEndDate.length) {
        var contractEndDateBegin = that.contractEndDate[0]; //有效日期
        var contractEndDateEnd = that.contractEndDate[1];
      }
      if (that.signTime && that.signTime.length) {
        var signTimeBegin = that.signTime[0]; //有效日期
        var signTimeDateEnd = that.signTime[1];
      }
      if (that.createdTime && that.createdTime.length) {
        var createdTimeBegin = that.createdTime[0]; //创建时间
        var createdTimeEnd = that.createdTime[1];
      }
      let data = {
        pageSize: that.pageSize,
        pageNum: that.pageNum,
        companyId: companyId,
        orgId: branchId,
        custId: custId,
        soContractNo: soContractNo,
        extCode: extCode,
        contractEndDateBegin: contractEndDateBegin,
        contractEndDateEnd: contractEndDateEnd,
        signTimeBegin: signTimeBegin,
        signTimeDateEnd: signTimeDateEnd,
        createdTimeBegin: createdTimeBegin,
        createdTimeEnd: createdTimeEnd,
      };
      sApi
        .selectOdSoContractInfo(data)
        .then((res) => {
          if ((res.code = "success")) {
            let list = res.data.list;
            let _this = this;
            _this.contractData.total = res.data.total;
            list.forEach((item) => {
              //转换列表中的销售类型，单据状态
              item.contractEndDate = _this.$timeFun(item.contractEndDate, true);
              item.createdTime = _this.$timeFun(item.createdTime, true);
              item.updatedTime = _this.$timeFun(item.updatedTime, true);
            });
            _this.contractData.tableData = list;
            _this.contractData.loading = false;
          } else {
            this.$openWarning(res.message);
            _this.contractData.loading = false;
          }
        })
        .catch();
    },
    //点击确定跳转至编辑页===码单发货
    toEidtPage() {
      localStorage.removeItem("ids");
      if (this.codeSheetData.selectioned.length == 0) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      }
      var warehouse = this.codeSheetData.selectioned[0].warehouseCode;
      var ids = []; //获取码单明细id
      ids.push(this.codeSheetData.selectioned[0].dockItemsId);
      for (let i = 1; i < this.codeSheetData.selectioned.length; i++) {
        if (this.codeSheetData.selectioned[i].warehouseCode != warehouse) {
          this.$message({
            duration: 1000,
            showClose: true,
            message: "请选择同一个仓库的数据",
            type: "warning",
          });
          return;
        }
        ids.push(this.codeSheetData.selectioned[i].dockItemsId);
      }
      localStorage.setItem("ids", JSON.stringify(ids));
      this.$router.push({
        //核心语句
        path: "/index/salesManage/retailShipment", //跳转的路径
        query: { type: 3 },
      });
    },
    //点击确定跳转至编辑页 ===合同发货
    contEidtPage() {
      localStorage.removeItem("soId");
      if (!this.contractData.selectioned) {
        //判断是否选中
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
        return;
      }
      localStorage.setItem("soId", this.contractData.selectioned.soContractId);
      this.$router.push({
        //核心语句
        path: "/index/salesManage/retailShipment", //跳转的路径
        query: { type: 1 },
      });
    },
    //获取仓库
    getWarehouseList() {
      let data = {};
      sApi
        .getBbWarehouseListSimple(data)
        .then((res) => {
          this.codeSheetData.warehouseList = res.data;
        })
        .catch();
    },
    //获取公司列表
    getCompanyList(type) {
      let data = {};
      sApi
        .selectBbCompanyBase(data)
        .then((res) => {
          if (type == 1) {
            this.contractData.companyList = res.data;
          } else {
            this.codeSheetData.companyList = res.data;
          }
        })
        .catch();
    },
    //根据公司的id获取部门
    getBranchByCompanyId(type) {
      let companyId = "";
      if (type == 1) {
        companyId = this.contractData.companyId;
      } else {
        companyId = this.codeSheetData.companyId;
      }
      let data = {
        companyId: companyId,
      };
      sApi
        .selectBbBranch(data)
        .then((res) => {
          if (type == 1) {
            this.contractData.branchList = res.data;
          } else {
            this.codeSheetData.orgList = res.data;
          }
        })
        .catch();
    },
    //获取客户
    getCustomerList(type) {
      let data = {};
      sApi
        .selectCustomerList(data)
        .then((res) => {
          if (type == 1) {
            this.contractData.custList = res.data;
          } else {
            this.codeSheetData.custList = res.data;
          }
        })
        .catch();
    },
    //获取单据状态
    getDoStatusList() {
      let data = {
        dictNo: 1045,
      };
      sApi
        .selectDoStatusList(data)
        .then((res) => {
          this.doStatusList = res.data;
        })
        .catch();
    },
    //获取放货类型
    getDoTypeList() {
      let data = {
        dictNo: 1028,
      };
      sApi
        .selectDoStatusList(data)
        .then((res) => {
          this.doTypeList = res.data;
        })
        .catch();
    },
    //获取销售类型
    getContractTypeList() {
      let data = {
        dictNo: 1015,
      };
      sApi
        .selectDoStatusList(data)
        .then((res) => {
          this.contractTypeList = res.data;
        })
        .catch();
    },
    //重置
    resetData() {
      (this.customerList = []),
        (this.staffNameList = []),
        (this.departmentList = []),
        (this.branchNameStr = []),
        (this.company = {}); //公司
      this.companyCode = "";
      this.branch = []; //部门
      this.branchCode = "";
      this.customer = []; //销售客户
      this.custId = "";
      this.staffName = []; //业务员
      this.staffCode = "";
      this.warehouse = {}; //仓库
      this.warehouseCode = "";
      this.doStatus = []; //单据状态
      this.doType = ""; //放货类型
      this.contractType = []; //销售类型
      this.reciver = ""; //收件人
      this.doNo = ""; //出库单号
      this.extContractCode = ""; //外部合同号
      this.createdTime = []; //创建时间
      this.doDate = []; //出库日期
      this.signReceivedDate = []; //签收日期
      this.createdName = ""; //创建人
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
      this.contractCode = "";
      this.dockSoNo = "";
      this.isSentConfirm = "";
    },
    //码单重置
    resetcodeSheetData(type) {
      //type 1合同发货 2码单发货
      if (type == 1) {
        this.contractData.pageNum = 1;
        this.contractData.pageSize = 100;
        this.contractData.companyId = "";
        this.contractData.branchId = "";
        this.contractData.customerName = {}; //销售客户
        this.contractData.custCode = ""; //销售客户
        this.contractData.custId = "";
        this.contractData.soContractNo = ""; //销售合同
        this.contractData.extCode = ""; //外部合同
        this.contractData.createdTime = []; //创建时间
        this.contractData.signTime = []; //签订日期
        this.contractData.contractEndDate = []; //有效日期
      } else {
        this.codeSheetData.pageSize = 100;
        this.codeSheetData.pageNum = 1;
        this.codeSheetData.companyId = ""; //公司
        this.codeSheetData.branchId = ""; //部门
        this.codeSheetData.customerName = {}; //销售客户
        this.codeSheetData.creditGroupCode = "";
        this.codeSheetData.warehouseCode = ""; //仓库
        this.codeSheetData.sendDateTime = []; //发货日期
        this.codeSheetData.dockSoNo = ""; //码单号
        this.codeSheetData.dockExtNo = ""; //外部单号
        this.codeSheetData.carNo = ""; //车号
        this.codeSheetData.shipNo = ""; //船号s
      }
    },

    //公司弹窗打开
    componyTip() {
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.company = e;
      this.companyCode = e.companyCode;
      this.branch = [];
    },
    //部门弹窗打开
    departmentTip() {
      // if (JSON.stringify(this.company) === "{}") {
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
      this.branch = e;
      this.branchCode = e.branchCode;
      let branchNameStr = [];
      e.forEach((item) => {
        branchNameStr.push(item.branchName);
      });
      this.departmentList = e;
      this.branchNameStr = branchNameStr;
    },
    //弹窗打开
    manTip() {
      this.manShow = true;
    },

    //员工弹窗打开
    staffTip() {
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
      this.staffCode = e.empCode;
      this.staffNameList = e;
    },
    //销售客户弹窗
    customerTips(type) {
      if (type == 1) {
        this.customerShow1 = true;
      } else {
        this.customerShow = true;
      }
    },
    //销售客户弹窗关闭
    customerCancle(type) {
      if (type == 1) {
        this.customerShow1 = false;
      } else {
        this.customerShow = false;
      }
    },
    //销售客户弹窗确定获取数据
    customerSure(e) {
      this.customerShow = false;
      this.customer = e;
      this.custId = e.customerId;
      this.customerList = e;
    },
    //合同客户选择
    customerSure1(e) {
      this.customerShow1 = false;
      this.contractData.customerName = e;
      this.contractData.custId = e.customerId;
      this.contractData.custCode = e.customerCode;
    },
    //信用账户组弹窗
    creditGroupPopup() {
      this.creditGroupShow = true;
    },
    //信用账户组弹窗回调
    creditGroupSelectData(res) {
      if (res) {
        this.codeSheetData.customerName = res;
        this.codeSheetData.creditGroupCode = res.creditGroupCode;
        // this.codeSheetData.customerName = res;
      }
      this.creditGroupShow = false;
    },
    //仓库弹窗
    warehouseTips() {
      this.warehouseShow = true;
    },
    //仓库弹窗关闭
    warehouseCancle() {
      this.warehouseShow = false;
    },
    //仓库弹窗确定获取数据
    warehouseSure(e) {
      this.warehouseShow = false;
      this.warehouse = e;
      this.warehouseCode = e.warehouseCode;
    },
    //创建下拉
    handleCommand(type) {
      //1合同发货，2零售发货 3码单发货
      let url = "";
      if (type == 1) {
        this.resetcodeSheetData(1);
        this.getCompanyList(type); //获取公司
        this.getCustomerList(type); //获取客户
        this.selectContractInfo(); //合同信息查询
        this.contractTipShow = true;
      } else if (type == 2) {
        url = "/index/salesManage/retailShipment";
        this.$router.push({
          //核心语句
          path: url, //跳转的路径
          query: { type: type },
        });
      } else {
        this.resetcodeSheetData(2);
        this.getWarehouseList(); //获取仓库
        this.getCompanyList(type); //获取公司
        this.getCustomerList(type); //获取客户
        this.initcodeSheetData(); //码单信息查询
        this.codeTipShow = true;
      }
    },
    //查看
    handleDetails(type) {
      //type 1修改 2查看 3，打印修改 4，实发确认
      localStorage.removeItem("id");
      if (this.selectioned.length == 0) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      } else if (this.selectioned.length > 1) {
        this.$openWarning("此选项不能批量操作");
        return;
      }
      let url = "";
      let doStatus = "";
      if (type == 1) {
        if (
          this.selectioned[0].doStatus != "10450005" &&
          this.selectioned[0].doStatus != "10450030"
        ) {
          this.$message({
            duration: 1000,
            showClose: true,
            message: "当前状态不可以修改",
            type: "warning",
          });
          return;
        }

        url = "/index/salesManage/salesIssueDocEdit";
      } else if (type == 4) {
        if (this.selectioned[0].doStatus != "10450020") {
          this.$message({
            duration: 1000,
            showClose: true,
            message: "当前状态不可以操作",
            type: "warning",
          });
          return;
        }

        url = "/index/salesManage/salesIssueDocEdit";
      } else {
        url = "/index/salesManage/salesIssueDocDetail";
        sessionStorage.setItem("doId",this.selectioned[0].doId);
      }
      doStatus = this.selectioned[0].doStatus;
      localStorage.setItem("doNo", this.selectioned[0].doNo);
      const doNo  = this.selectioned[0].doNo

      this.$router.push({
        //核心语句
        path: url, //跳转的路径
        query: {
          doStatus: doStatus,
          type: type,
          doNo
        },
      });
    },
    //复制
    handleEdit() {
      localStorage.removeItem("doNo");
      if (this.selectioned.length == 0) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      } else if (this.selectioned.length > 1) {
        this.$openWarning("此操作不能批量操作");
        return;
      }
      localStorage.setItem("doNo", this.selectioned[0].doNo);
      this.$router.push({
        //核心语句
        path: "/index/salesManage/retailShipment", //跳转至创建页
        query: { type: 4 }, //复制
      });
    },
    //删除
    deleteSaleOutboundOrder() {
      if (this.selectioned.length == 0) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      }
      let flag = true;
      this.selectioned.forEach((el) => {
        if (el.doStatus !== "10450005" && el.doStatus !== "10450030") {
          flag = false;
        }
      });
      if (flag) {
        var data = this.selectioned;
        this.$confirm("是否确定删除?", "删除提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            sApi
              .deleteSaleOutboundOrder(data)
              .then((res) => {
                if (res.code == "success") {
                  this.$openSuccess("删除成功");
                  this.queryData();
                } else {
                  this.$openWarning(res.message);
                }
              })
              .catch();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      } else {
        this.$openWarning("只能删除保存和已驳回的数据");
        return;
      }
    },
    //审核
    handleToExamine() {
      //1通过 2驳回 3出库确认
      this.examineValue = "outbound"; //通过，驳回
      this.rejectReason = ""; //驳回原因
      this.examineDate = ""; //日期
      if (this.selectioned.length == 0) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      }
      let flag = 0;
      this.selectioned.forEach((el) => {
        if (
          el.doStatus != "10450015" &&
          el.doStatus != "10450040" &&
          el.doStatus != "10450020"
        ) {
          flag = 1;
          return;
        }
        if (el.doStatus == 10450020 && el.isSentConfirm != 1) {
          flag = 2;
          return;
        }
      });
      if (flag == 1) {
        this.$openWarning("只有审核中、超限审核中、待发货可以审核");
        return;
      } else if (flag == 2) {
        this.$openWarning("单据未实发确认，请联系业务员进行确认操作！");
        return;
      }
      if (this.selectioned.length > 1) {
        this.examineOne = false; //是否是多条
      } else {
        this.accountPeriod(this.selectioned[0].companyId);
        this.examineDate = this.selectioned[0].doDateTimes; //默认当前数据的出库日期
        this.examineOne = true; //是否是多条
      }
      this.examineStatus = false;
      this.examineShow = true; //审核弹窗
    },
    //月结
    accountPeriod(companyId) {
      let data = {
        companyId: companyId,
      };
      sApi
        .getAccountPeriodByCompany(data)
        .then((res) => {
          if (res.code == "success") {
            this.$nextTick(() => {
              this.pickerOptions = {
                disabledDate(time) {
                  return (
                    res.data.enddate < time.getTime() ||
                    time.getTime() < res.data.begindate
                  );
                },
              };
            });
          } else {
            this.$openWarning(res.message);

          }
        }).catch();

    },
    //审核下拉选中的值
    examineSelect(e) {
      this.examineValue = e; //审核选中的值
      if (this.examineValue) {
        this.examineStatus = false;
      } else {
        this.examineStatus = true;
      }
    },
    //取消
    examineCancle() {
      this.examineShow = false; //审核弹窗
      this.examineValue = "outbound"; ////审核选中的值
      this.examineDate = ""; //审核中的出库日期
      this.examineStatus = false;
    },
    //确定
    examineSure() {
      if (
        this.examineValue == "outbound" &&
        this.examineOne &&
        !this.examineDate
      ) {
        that.$openWarning("请选择出库日期");
        return;
      }
      if (this.examineValue == "reject") {
        this.selectioned.forEach((el) => {
          el.auditInfo = this.rejectReason;
        });
      }
      console.log(this.examineDate);
      this.selectioned.forEach((el) => {
        el.operationType = this.examineValue;
        if (el.operationType == "outbound") {
          // let ds="";
          if (this.examineOne) {
            el.doDate = this.examineDate;
          } else {
            el.doDate = el.doDateTimes;
          }
        }
      });
      let data = this.selectioned;
      sApi
        .operateSaleOutboundOrderStatus(data)
        .then((res) => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
            this.examineShow = false;
            this.queryData();
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch((e) => {
          //失败时，时间格式转换
          this.tableData.forEach((item) => {
            item.doDateTimes = item.doDate;
            item.doDate = this.$timeFun(item.doDate, true);
          });
        });
    },
    //提交submit，通过pass，驳回reject，出库确认outbound，超限放行overRelease
    changeStatus(type) {
      if (this.selectioned.length == 0) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      }
      if (type == "submit") {
        let flag = false;
        this.selectioned.forEach((el) => {
          if (el.doStatus != "10450005" && el.doStatus != "10450030") {
            flag = true;
            return;
          }
        });
        if (flag) {
          this.$openWarning("只有保存、已驳回状态可以提交");
          return;
        }
      }
      let tips = type == "submit" ? "是否确定提交？" : "是否确定超限放行？";
      this.$confirm(tips, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.selectioned.forEach((el) => {
          el.operationType = type;
        });
        let data = this.selectioned;
        sApi
          .operateSaleOutboundOrderStatus(data)
          .then((res) => {
            if (res.code == "success") {
              this.$openSuccess(res.message);
              this.queryData();
            } else {
              this.$openWarning(res.message);
            }
          })
          .catch();
      });
    },
    //客户签收
    customerSignIn() {
      if (this.selectioned.length == 0) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      } else if (this.selectioned.length > 1) {
        this.$openWarning("此选项不能批量操作");
        return;
      }
      this.signingDate = this.$nowDate();
      this.version = this.selectioned[0].version;
      this.doId = this.selectioned[0].doId;
      this.siginStatus = false;
      this.siginShow = true;
    },
    //改变时间
    changeDate(e) {
      if (e == null) {
        this.siginStatus = true;
      } else {
        this.siginStatus = false;
      }
    },
    custCancle() {
      this.siginStatus = false;
      this.siginShow = false;
    },
    custSure() {
      if (!this.signingDate) {
        this.siginStatus = true;
        this.$openWarning("请选择签收日期");
        return;
      }
      let data = {
        doId: this.doId, //id
        version: this.version, //版本
        signReceivedDate: this.signingDate, //签收日期
      };
      sApi
        .updateReceivedDate(data)
        .then((res) => {
          if (res.code == "success") {
            this.siginShow = false;
            this.$openSuccess(res.message);
            this.queryData();
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.initData();
    },
    //表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    //查询条件显示一行
    inputShow() {
      this.showOrHide = this.$showOne(this.showOrHide);
    },

    //表格单选
    dialogCheck(selection, row) {
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned.push(row);
        this.index = this.tableData.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    /*********码单发货************* */
    //分页
    handleCodeSizeChange(val) {
      this.codeSheetData.pageSize = val;
      this.initcodeSheetData();
    },
    handleCodeCurrentChange(val) {
      this.codeSheetData.pageNum = val;
      this.initcodeSheetData();
    },
    //表格选择
    handleCodeChange(e) {
      this.codeSheetData.selectioned = e;
    },
    inputShowCode() {
      this.codeSheetData.show = this.$dialogShowOne(this.codeSheetData.show);
    },
    //表格单选
    codeDialogCheck(selection, row) {
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.codeSheetData.selectioned = row;
        this.codeSheetData.index = this.codeSheetData.tableData.indexOf(row);
        this.$refs.multipleTableCode.toggleRowSelection(row, true);
      }
    },
    handleCodeRowClick(row) {
      this.codeSheetData.selectioned = row;
      this.codeSheetData.index = this.codeSheetData.tableData.indexOf(row);
      this.$refs.multipleTableCode.toggleRowSelection(row, true);
      this.$set(this.codeSheetData.tableData, this.codeSheetData.index, row);
    },
    /**********合同发货*********** */
    //分页
    handleContSizeChange(val) {
      this.contractData.pageSize = val;
      this.selectContractInfo();
    },
    handleContCurrentChange(val) {
      this.contractData.pageNum = val;
      this.selectContractInfo();
    },
    //表格选择
    handleContChange(e) {
      if (e.length === 0) {
        this.contractData.selectioned = null;
      }
    },
    inputShowCont() {
      this.contractData.show = this.$dialogShowOne(this.contractData.show);
    },
    //表格单选
    contDialogCheck(selection, row) {
      this.$refs.multipleTableCont.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.contractData.selectioned = row;
        this.contractData.index = this.contractData.tableData.indexOf(row);
        this.$refs.multipleTableCont.toggleRowSelection(row, true);
      }
    },
    contDialogRowClick(row) {
      this.$refs.multipleTableCont.clearSelection();
      this.contractData.selectioned = row;
      this.contractData.index = this.contractData.tableData.indexOf(row);
      this.$refs.multipleTableCont.toggleRowSelection(row, true);
    },
    //取消
    cancel(type) {
      if (type == 1) {
        this.contractTipShow = false;
      } else {
        this.codeTipShow = false;
      }
    },
    //打印
    handlePrint() {
      if (this.selectioned.length == 0) {
        this.$openWarning("未选择数据");
      } else if (this.selectioned.length == 1) {
        if (
          this.selectioned[0].doStatus == "10450020" ||
          this.selectioned[0].doStatus == "10450025"
        ) {
          this.billShow = true;
          let Logistics = this.$router.resolve({
            name: "billOfLading",
          });
          sessionStorage.setItem("doId", this.selectioned[0].doId);
          window.open(Logistics.href, "_blank");
        } else {
          this.$openWarning("只有`待发货`和`已发货`状态可以打印");
        }
      } else {
        this.$openWarning("此选项不能批量操作");
      }
    },
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    warehouseSelect,
    customerSelect,
    creditGroupSelect,
    contractSearch,
    editSearchItem,
  },
};
</script>
<style>
.index .index-div5 {
  padding-left: 0;
}
.index .index-div5 .el-input,
.index .index-div5 .el-select {
  width: 67%;
}
.index .index-div5 .el-input2 {
  width: 67%;
}
</style>
<style scoped>
.index .el-dialog__header .el-dialog__title {
  font-size: 15px;
}
.index .el-button.is-disabled,
.index .el-button.is-disabled:focus,
.index .el-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #fff;
  border: 1px solid #ebeef5;
}
</style>
