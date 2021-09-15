<template>
  <div class="table-div">
    <el-table border center :data="table" class="el-table" v-loading="loading">
      <el-table-column type="index" width="120" label="行号"></el-table-column>
      <el-table-column prop="689ce92c2d2511eaa35a506b4bbe21e4" label="项目"></el-table-column>
      <el-table-column prop="689df31e2d2511eaa35a506b4bbe21e4" label="业务币币种">
        <template slot-scope="scope">
          <div
            v-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '成本及费用合计'
            "
          >{{ scope.row["689df31e2d2511eaa35a506b4bbe21e4"] }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '成本合计'
            "
          >{{ scope.row["689df31e2d2511eaa35a506b4bbe21e4"] }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '税金合计'
            "
          >{{ scope.row["689df31e2d2511eaa35a506b4bbe21e4"] }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '实现利润'
            "
          >{{ scope.row["689df31e2d2511eaa35a506b4bbe21e4"] }}</div>
          <!-- <div v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '采购货价（含税）'">
            {{ scope.row['689df31e2d2511eaa35a506b4bbe21e4'] }}
          </div>-->
          <!-- <div v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '增值税'">
            {{ scope.row['689df31e2d2511eaa35a506b4bbe21e4'] }}
          </div>-->
          <!-- <div v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '销售收入（不含税）'">
            {{ scope.row['689df31e2d2511eaa35a506b4bbe21e4'] }}
          </div>
          <div v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '销售收入（含税）'">
            {{ scope.row['689df31e2d2511eaa35a506b4bbe21e4'] }}
          </div>-->
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] ==
                '销售收入（不含税）'
            "
          >{{ scope.row["689df31e2d2511eaa35a506b4bbe21e4"] }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '利润率%'
            "
          >{{ scope.row["689df31e2d2511eaa35a506b4bbe21e4"] }}</div>
          <el-input
            :disabled="scope.row.isInactive == 2"
            v-else
            v-model="scope.row['689df31e2d2511eaa35a506b4bbe21e4']"
            placeholder="请选择"
            @focus="coinTip(scope.$index)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="689efd792d2511eaa35a506b4bbe21e4" label="业务币金额">
        <template slot-scope="scope">
          <div
            v-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '成本及费用合计'
            "
          >{{ $toFixed(scope.row["689efd792d2511eaa35a506b4bbe21e4"],2 ) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '成本合计'
            "
          >{{ $toFixed(scope.row["689efd792d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '税金合计'
            "
          >{{ $toFixed(scope.row["689efd792d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '实现利润'
            "
          >{{ $toFixed(scope.row["689efd792d2511eaa35a506b4bbe21e4"],2) }}</div>
          <!-- <div
            v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '采购货价（含税）'"
          >{{ scope.row['689efd792d2511eaa35a506b4bbe21e4'] }}</div>
          <div
            v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '增值税'"
          >{{ scope.row['689efd792d2511eaa35a506b4bbe21e4'] }}</div>
          <div v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '销售收入（含税）'">
            {{ scope.row['689efd792d2511eaa35a506b4bbe21e4'] }}
          </div>-->
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] ==
                '销售收入（不含税）'
            "
          >{{ $toFixed(scope.row["689efd792d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '利润率%'
            "
          >{{ $toFixed(scope.row["689efd792d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <el-input
            :disabled="scope.row.isInactive == 2"
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] ==
                '销售收入（含税）' ||
                scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '销项增值税' ||
                scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '增值税'
            "
            v-model="scope.row['689efd792d2511eaa35a506b4bbe21e4']"
            type="number"
            v-input-filter:num2
            @input="xsBhs(scope.row)"
            placeholder="请输入"
          ></el-input>
          <el-input
            :disabled="scope.row.isInactive == 2"
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == `保费`"
            v-model="scope.row['689efd792d2511eaa35a506b4bbe21e4']"
            type="number"
            v-input-filter:num2
            @input="bfInput(scope.row)"
            placeholder="请输入"
          ></el-input>
          <el-input
            :disabled="scope.row.isInactive == 2"
            v-else
            v-input-filter:num2
            v-model="scope.row['689efd792d2511eaa35a506b4bbe21e4']"
            type="number"
            @input="changeHandler(scope.row)"
            placeholder="请输入"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="68a355e62d2511eaa35a506b4bbe21e4" label="本位币汇率">
        <template slot-scope="scope">
          <div
            v-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '成本及费用合计'
            "
          ></div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '成本合计'
            "
          ></div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '税金合计'
            "
          ></div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '实现利润'
            "
          ></div>
          <!-- <div
            v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '采购货价（含税）'"
          >{{ scope.row['68a355e62d2511eaa35a506b4bbe21e4'] }}</div>
          <div
            v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '增值税'"
          >{{ scope.row['68a355e62d2511eaa35a506b4bbe21e4'] }}</div>
          <div v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '销售收入（含税）'"></div>-->
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] ==
                '销售收入（不含税）'
            "
          ></div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '实现利润'
            "
          ></div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '利润率%'
            "
          ></div>
          <el-input
            :disabled="scope.row.isInactive == 2"
            v-else
            v-input-filter:num8
            v-model="scope.row['68a355e62d2511eaa35a506b4bbe21e4']"
            type="number"
            @input="changeHandler(scope.row)"
            placeholder="请输入"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="68a005d52d2511eaa35a506b4bbe21e4" label="本位币金额">
        <template slot-scope="scope">
          <div
            v-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '成本及费用合计'
            "
          >{{ $toFixed(scope.row["68a005d52d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '成本合计'
            "
          >{{ $toFixed(scope.row["68a005d52d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '税金合计'
            "
          >{{ $toFixed(scope.row["68a005d52d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '实现利润'
            "
          >{{ $toFixed(scope.row["68a005d52d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <!-- <div
            v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '采购货价（含税）'"
          >{{scope.row['689efd792d2511eaa35a506b4bbe21e4']*scope.row['68a355e62d2511eaa35a506b4bbe21e4']}}</div>
          <div
            v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '增值税'"
          >{{scope.row['689efd792d2511eaa35a506b4bbe21e4']*scope.row['68a355e62d2511eaa35a506b4bbe21e4']}}</div>
          <div v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '销售收入（含税）'">
            {{ scope.row['68a005d52d2511eaa35a506b4bbe21e4'] }}
          </div>-->
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] ==
                '销售收入（不含税）'
            "
          >{{ $toFixed(scope.row["68a005d52d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '实现利润'
            "
          >{{ $toFixed(scope.row["68a005d52d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '利润率%'
            "
          >{{ $toFixed(scope.row["68a005d52d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <span v-else>
            {{ $toFixed(scope.row["689efd792d2511eaa35a506b4bbe21e4"] * scope.row["68a355e62d2511eaa35a506b4bbe21e4"], 2)}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="68a612102d2511eaa35a506b4bbe21e4" label="人民币汇率">
        <template slot-scope="scope">
          <div
            v-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '成本及费用合计'
            "
          ></div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '成本合计'
            "
          ></div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '税金合计'
            "
          ></div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '实现利润'
            "
          ></div>
          <!-- <div
            v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '采购货价（含税）'"
          >{{ scope.row['68a355e62d2511eaa35a506b4bbe21e4'] }}</div>
          <div
            v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '增值税'"
          >{{ scope.row['68a355e62d2511eaa35a506b4bbe21e4'] }}</div>
          <div v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '销售收入（含税）'"></div>-->
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] ==
                '销售收入（不含税）'
            "
          ></div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '实现利润'
            "
          ></div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '利润率%'
            "
          ></div>
          <el-input
            :disabled="scope.row.isInactive == 2"
            v-else
            v-input-filter:num8
            v-model="scope.row['68a612102d2511eaa35a506b4bbe21e4']"
            type="number"
            @input="changeHandler(scope.row)"
            placeholder="请输入"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="68a4a6422d2511eaa35a506b4bbe21e4" label="人民币金额">
        <template slot-scope="scope">
          <div
            v-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '成本及费用合计'
            "
          >{{ $toFixed(scope.row["68a4a6422d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '成本合计'
            "
          >{{ $toFixed(scope.row["68a4a6422d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '税金合计'
            "
          >{{ $toFixed(scope.row["68a4a6422d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '实现利润'
            "
          >{{ $toFixed(scope.row["68a4a6422d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <!-- <div
            v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '采购货价（含税）'"
          >{{scope.row['689efd792d2511eaa35a506b4bbe21e4']*scope.row['68a355e62d2511eaa35a506b4bbe21e4']}}</div>
          <div
            v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '增值税'"
          >{{scope.row['689efd792d2511eaa35a506b4bbe21e4']*scope.row['68a355e62d2511eaa35a506b4bbe21e4']}}</div>
          <div v-else-if="scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '销售收入（含税）'">
            {{ scope.row['68a4a6422d2511eaa35a506b4bbe21e4'] }}
          </div>-->
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] ==
                '销售收入（不含税）'
            "
          >{{ $toFixed(scope.row["68a4a6422d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '实现利润'
            "
          >{{ $toFixed(scope.row["68a4a6422d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <div
            v-else-if="
              scope.row['689ce92c2d2511eaa35a506b4bbe21e4'] == '利润率%'
            "
          >{{ $toFixed(scope.row["68a4a6422d2511eaa35a506b4bbe21e4"], 2) }}</div>
          <span v-else>
            {{ $toFixed(scope.row["689efd792d2511eaa35a506b4bbe21e4"] * scope.row["68a612102d2511eaa35a506b4bbe21e4"], 2)}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="68a7628f2d2511eaa35a506b4bbe21e4" label="备注">
        <template slot-scope="scope">
          <el-input
            :disabled="scope.row.isInactive == 2"
            v-model="scope.row['68a7628f2d2511eaa35a506b4bbe21e4']"
            type="text"
            placeholder="请输入"
          ></el-input>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="1967cbb50cfc11eaa35a506b4bbe21e4" label="测试列删除"></el-table-column> -->
    </el-table>
    <!-- 选择币种弹窗 -->
    <coin-select v-if="coinShow" :tipShow="coinShow" @coinCancle="coinCancle" @coinSure="coinSure"></coin-select>
  </div>
</template>
<script>
import coinSelect from "@/components/coinSelect.vue";
import Bmange from "@/api/contractMange/bmange";
import {
  getParities,
  getParitiesCode,
  getStandardCurrencyParities
} from "@/api/creditManage/creditDetail";
import Count from "@/assets/js/calculation";
export default {
  name: "tabConSixth",
  components: { coinSelect },
  props: {
    companyName: {
      type: Object,
      default: Object
    },
    rcTable: {
      type: String,
      default: ``
    }
  },
  data() {
    return {
      table: [
        // {
        //   rowId: "1967cbbd0cfc11eaa35a506b4bbe21e4",
        //   project: "采购货价（含税）",
        //   colId: "1967cbb50cfc11eaa35a506b4bbe21e4",
        //   "689df31e2d2511eaa35a506b4bbe21e4": "", // 业务币币种
        //   "689efd792d2511eaa35a506b4bbe21e4": "", //业务币金额
        //   "68a355e62d2511eaa35a506b4bbe21e4": "", //本位币汇率
        //   "68a005d52d2511eaa35a506b4bbe21e4": "", //本位币金额
        //   "68a612102d2511eaa35a506b4bbe21e4": "", //人民币汇率
        //   "68a4a6422d2511eaa35a506b4bbe21e4": "", //人民币金额
        //   "68a7628f2d2511eaa35a506b4bbe21e4": "", // 备注
        //   "1967cbb50cfc11eaa35a506b4bbe21e4": "" //测试列删除
        // }
      ],
      loading: false,
      coinShow: false,
      changeTime: 0,
      vat: 0, //采购货价（含税）
      taxAmt: 0, //增值税额
      contractAmtVat: 0, //销售收入（含税）
      originTaxAmt: 0, //销项增值税
      bfIywb: 0, //保费输入业务币
      bfIbwb: 0, //保费输入本位币
      bfIrmb: 0, //保费输入人民币
      coin: ``,
      xssrywbb: 0,
      xssrbwbb: 0,
      xssrrmbb: 0
      // $root.Bus: this.$BusFactory(this)
    };
  },
  computed: {
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    id() {
      return this.$route.params.id;
    },
    type() {
      return this.$store.state.route.params.type;
    }
  },
  methods: {
    //币种弹窗打开
    coinTip(e) {
      this.coinShow = true;
      this.coinType = e;
    },
    //币种弹窗关闭
    coinCancle() {
      this.coinShow = false;
    },
    //币种弹窗确定获取数据
    coinSure(e) {
      this.coinShow = false;
      this.table[this.coinType]["689df31e2d2511eaa35a506b4bbe21e4"] =
        e.currencyCode;
      this.getParities(e);
      this.getStandardCurrencyParities(e);
    },
    //获取本位币汇率
    getParities(e) {
      if (!this.companyName.baseCurrencyCode || !e.currencyCode) {
        return;
      }
      getParitiesCode({
        formCurrencyCode: e.currencyCode,
        toCurrencyCode: this.companyName.baseCurrencyCode
      })
        .then(res => {
          if (res.code === "success") {
            this.table[this.coinType]["68a355e62d2511eaa35a506b4bbe21e4"] =
              res.data.parities;
          }
        })
        .catch(err => {
          this.table[this.coinType]["68a355e62d2511eaa35a506b4bbe21e4"] = 1;
        });
    },
    //获取人民币汇率
    getStandardCurrencyParities(e) {
      getParitiesCode({
        formCurrencyCode: e.currencyCode,
        toCurrencyCode: `CNY`
      }).then(res => {
        if (res.code === "success") {
          this.table[this.coinType]["68a612102d2511eaa35a506b4bbe21e4"] =
            res.data.parities;
        }
      });
    },
    //业务币金额 本位币汇率 人民币汇率change
    changeHandler(e) {
      //bbhsje 计算金额方法
      // "689efd792d2511eaa35a506b4bbe21e4": "", //业务币金额
      // "68a355e62d2511eaa35a506b4bbe21e4": "", //本位币汇率
      // "68a005d52d2511eaa35a506b4bbe21e4": "", //本位币金额
      // "68a612102d2511eaa35a506b4bbe21e4": "", //人民币汇率
      // "68a4a6422d2511eaa35a506b4bbe21e4": "", //人民币金额
      if (e["689ce92c2d2511eaa35a506b4bbe21e4"] == "采购货价（含税）") {
        this.vat = e["689efd792d2511eaa35a506b4bbe21e4"];
        let list = JSON.parse(JSON.stringify(this.table));
        for (const item of list) {
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "保费") {
            if (this.changeTime) {
              return false;
            }
            this.bfIywb = this.$toFixed(this.$baofei(this.vat), 2);
            this.bfIbwb = this.$toFixed(this.bwbReturn(item), 2);
            this.bfIrmb = this.$toFixed(this.rmbReturn(item), 2);
          }
        }
      }
      //本位币
      e["68a005d52d2511eaa35a506b4bbe21e4"] = this.$bbhsje(
        e["689efd792d2511eaa35a506b4bbe21e4"],
        e["68a355e62d2511eaa35a506b4bbe21e4"]
      );
      //人民币
      e["68a4a6422d2511eaa35a506b4bbe21e4"] = this.$bbhsje(
        e["689efd792d2511eaa35a506b4bbe21e4"],
        e["68a612102d2511eaa35a506b4bbe21e4"]
      );
    },
    // new return本位币金额
    bwbReturn(e) {
      let et = JSON.parse(JSON.stringify(e));
      //本位币
      et["68a005d52d2511eaa35a506b4bbe21e4"] = this.$bbhsje(
        et["689efd792d2511eaa35a506b4bbe21e4"],
        et["68a355e62d2511eaa35a506b4bbe21e4"]
      );
      return et["68a005d52d2511eaa35a506b4bbe21e4"];
    },
    // new return人民币金额
    rmbReturn(e) {
      let et = JSON.parse(JSON.stringify(e));
      //人民币
      et["68a4a6422d2511eaa35a506b4bbe21e4"] = this.$bbhsje(
        et["689efd792d2511eaa35a506b4bbe21e4"],
        et["68a612102d2511eaa35a506b4bbe21e4"]
      );
      return et["68a4a6422d2511eaa35a506b4bbe21e4"];
    },
    //利润率计算
    lrl(e) {
      // 利润率%
      let sxlr = 0;
      if (e["689ce92c2d2511eaa35a506b4bbe21e4"] == `实现利润`) {
        sxlr = e["689efd792d2511eaa35a506b4bbe21e4"];
      }
      let cbfy = 0;
      if (e["689ce92c2d2511eaa35a506b4bbe21e4"] == `成本及费用合计`) {
        cbfy = e["689efd792d2511eaa35a506b4bbe21e4"];
      }
      let sjhj = 0;
      if (e["689ce92c2d2511eaa35a506b4bbe21e4"] == `税金合计`) {
        sjhj = e["689efd792d2511eaa35a506b4bbe21e4"];
      }
      e["689efd792d2511eaa35a506b4bbe21e4"] = this.$lrl(sxlr, cbfy, sjhj);
      this.changeHandler(e);
    },
    postData() {
      this.table.forEach(
        (item, index) => (item["1967cb520cfc11eaa35a506b4bbe21e4"] = index + 1)
      );
      let id = this.$route.query.id;
      this.$emit("getData", Table2arr(this.table));
      function Table2arr(params) {
        let postData = [];
        params.forEach(obj => {
          for (const key in obj) {
            let template = {};
            template.columnId = key;
            template.rowId = obj["rowId"];
            template.cellValue = obj[key];
            template.poId = id;
            if (key == `689efd792d2511eaa35a506b4bbe21e4`) {
              // 业务币id
              template.id = obj[`bizAmtPrimary`];
            } else if (key == `68a005d52d2511eaa35a506b4bbe21e4`) {
              // 本位币id
              template.id = obj[`baseAmtPrimary`];
            } else if (key == `68a4a6422d2511eaa35a506b4bbe21e4`) {
              // 人民币id
              template.id = obj[`rmbAmtPrimary`];
            } else if (key == `68a7628f2d2511eaa35a506b4bbe21e4`) {
              // 备注id
              template.id = obj[`remarkPrimary`];
            }
            if (
              template.columnId != `689927c82d2511eaa35a506b4bbe21e4` &&
              template.columnId != `689ce92c2d2511eaa35a506b4bbe21e4`
            ) {
              postData.push(template);
            }
          }
        });
        return postData.filter(item => item.columnId !== "rowId");
      }
    },
    //获取明细
    getPaymentDetailArray() {
      // if (!this.id) return;
      let params = { rcTable: this.rcTable };
      Bmange.syList(params).then(res => {
        if (res.code === "success") {
          this.table = this.setTableData(res.data);
        }
      });
    },
    setTableData(params) {
      let rowArray = [];
      let colArray = [];
      params.forEach(item => {
        if (item.rcType === 0) {
          let key = item.rcId;
          let template = {
            colId: `${item.rcId}`,
            rcDescription: `${item.rcDescription}`
          };
          template[key] = "";
          colArray.push(template);
        } else {
          let template = {
            rowId: `${item.rcId}`,
            project: `${item.rcDescription}`,
            isInactive: item.isInactive
          };
          rowArray.push(template);
        }
      });
      colArray.forEach(item => {
        rowArray.forEach(it => {
          it.colId = item.colId;
          it[item.colId] = "";
          if (it.hasOwnProperty("project")) {
            it["689ce92c2d2511eaa35a506b4bbe21e4"] = it.project; //设置项目名
          }
        });
      });
      rowArray.forEach(item => {
        item["689df31e2d2511eaa35a506b4bbe21e4"] == this.coin;
        item["68a355e62d2511eaa35a506b4bbe21e4"] = 1;
        item["68a612102d2511eaa35a506b4bbe21e4"] = 1;
        delete item["project"];
        delete item["colId"];
      });
      return rowArray;
    },
    //返回盈亏表格值
    poList() {
      let list = [];
      Bmange.syList({ rcTable: this.rcTable }).then(res => {
        list = res.data;
      });
      this.getDeList();
    },
    getDeList() {
      this.changeTime = 1;
      let params = {
        poId: this.$route.query.id
      };
      if (this.$route.query.isChange) {
        Bmange.poListHis(params)
          .then(res => {
            let list = [];
            res.data.map((item, index) => {
              let obj = {};
              obj.rowId = item.rowId;
              obj.bizAmtPrimary = item.bizAmtPrimary; //业务币金额id
              obj.baseAmtPrimary = item.baseAmtPrimary; //本位币金额id
              obj.rmbAmtPrimary = item.rmbAmtPrimary; //人民币金额id
              obj.remarkPrimary = item.remarkPrimary; //备注id
              obj["689ce92c2d2511eaa35a506b4bbe21e4"] = item.rcDescription; //设置项目名
              obj[`689df31e2d2511eaa35a506b4bbe21e4`] = item.bizCurrencyCode; // 业务币币种
              obj[`689efd792d2511eaa35a506b4bbe21e4`] = item.bizAmt; //业务币金额
              obj[`68a355e62d2511eaa35a506b4bbe21e4`] = item.baseRate; //本位币汇率
              obj[`68a005d52d2511eaa35a506b4bbe21e4`] = item.baseAmt; //本位币金额
              obj[`68a612102d2511eaa35a506b4bbe21e4`] = item.rmbRate; //人民币汇率
              obj[`68a4a6422d2511eaa35a506b4bbe21e4`] = item.rmbAmt; //人民币金额
              obj[`68a7628f2d2511eaa35a506b4bbe21e4`] = item.remark; //备注
              obj[`1967cbb50cfc11eaa35a506b4bbe21e4`] = item.bizCurrencyCode; //人民币汇率
              obj[`isInactive`] = item.isInactive; //状态 2为废气 不可修改
              if (item.rcDescription == "采购货价（含税）") {
                this.vat = item.bizAmt;
              }
              if (item.rcDescription == "增值税") {
                this.taxAmt = item.bizAmt;
              }
              if (item.rcDescription == "销售收入（含税）") {
                this.contractAmtVat = item.bizAmt;
              }
              if (item.rcDescription == "销项增值税") {
                this.originTaxAmt = item.bizAmt;
              }
              if (item.rcDescription == "保费") {
                this.bfIywb = this.$toFixed(item.bizAmt, 2);
              }
              list.push(obj);
            });
            this.table = list;
            setTimeout(() => {
              this.changeTime = 0;
            }, 1000);
          })
          .catch();
      } else {
        Bmange.poList(params)
          .then(res => {
            let list = [];
            res.data.map((item, index) => {
              let obj = {};
              obj.rowId = item.rowId;
              obj.bizAmtPrimary = item.bizAmtPrimary; //业务币金额id
              obj.baseAmtPrimary = item.baseAmtPrimary; //本位币金额id
              obj.rmbAmtPrimary = item.rmbAmtPrimary; //人民币金额id
              obj.remarkPrimary = item.remarkPrimary; //备注id
              obj["689ce92c2d2511eaa35a506b4bbe21e4"] = item.rcDescription; //设置项目名
              obj[`689df31e2d2511eaa35a506b4bbe21e4`] = item.bizCurrencyCode; // 业务币币种
              obj[`689efd792d2511eaa35a506b4bbe21e4`] = item.bizAmt; //业务币金额
              obj[`68a355e62d2511eaa35a506b4bbe21e4`] = item.baseRate; //本位币汇率
              obj[`68a005d52d2511eaa35a506b4bbe21e4`] = item.baseAmt; //本位币金额
              obj[`68a612102d2511eaa35a506b4bbe21e4`] = item.rmbRate; //人民币汇率
              obj[`68a4a6422d2511eaa35a506b4bbe21e4`] = item.rmbAmt; //人民币金额
              obj[`68a7628f2d2511eaa35a506b4bbe21e4`] = item.remark; //备注
              obj[`1967cbb50cfc11eaa35a506b4bbe21e4`] = item.bizCurrencyCode; //人民币汇率
              obj[`isInactive`] = item.isInactive; //状态 2为废气 不可修改
              if (item.rcDescription == "采购货价（含税）") {
                this.vat = item.bizAmt;
              }
              if (item.rcDescription == "增值税") {
                this.taxAmt = item.bizAmt;
              }
              if (item.rcDescription == "销售收入（含税）") {
                this.contractAmtVat = item.bizAmt;
              }
              if (item.rcDescription == "销项增值税") {
                this.originTaxAmt = item.bizAmt;
              }
              if (item.rcDescription == "保费") {
                this.bfIywb = this.$toFixed(item.bizAmt, 2);
              }
              list.push(obj);
            });
            this.table = list;
            setTimeout(() => {
              this.changeTime = 0;
            }, 1000);
          })
          .catch();
      }
    },
    // 销售收入不含税
    xsBhs(e) {
      let list = JSON.parse(JSON.stringify(this.table));
      //销售收入（含税）
      let xssrywb = 0; //业务币
      let xssrbwb = 0; //本位币
      let xssrrmb = 0; //人民币
      //销项增值税
      let xxzzsywb = 0; //业务币
      let xxzzsbwb = 0; //本位币
      let xxzzsrmb = 0; //人民币
      for (const item of list) {
        if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "增值税") {
          this.taxAmt = item["689efd792d2511eaa35a506b4bbe21e4"];
          item["68a005d52d2511eaa35a506b4bbe21e4"] = this.bwbReturn(item);
          item["68a4a6422d2511eaa35a506b4bbe21e4"] = this.bwbReturn(item);
        }
        if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "销项增值税") {
          xxzzsywb = item["689efd792d2511eaa35a506b4bbe21e4"];
          this.originTaxAmt = item["689efd792d2511eaa35a506b4bbe21e4"];
          xxzzsbwb = this.bwbReturn(item);
          xxzzsrmb = this.rmbReturn(item);
        }
      }
      for (const item of list) {
        if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "销售收入（含税）") {
          xssrywb = item["689efd792d2511eaa35a506b4bbe21e4"];
          this.contractAmtVat = item["689efd792d2511eaa35a506b4bbe21e4"];
          xssrbwb = this.bwbReturn(item);
          xssrrmb = this.rmbReturn(item);
        }
        if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "销项增值税") {
          xxzzsywb = item["689efd792d2511eaa35a506b4bbe21e4"];
          this.originTaxAmt = item["689efd792d2511eaa35a506b4bbe21e4"];
          xxzzsbwb = this.bwbReturn(item);
          xxzzsrmb = this.rmbReturn(item);
        }
      }
      for (const item of list) {
        if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "销售收入（不含税）") {
          item["689efd792d2511eaa35a506b4bbe21e4"] = this.$xssr(
            xssrywb,
            xxzzsywb
          );
          item["68a005d52d2511eaa35a506b4bbe21e4"] = this.$xssr(
            xssrbwb,
            xxzzsbwb
          );
          item["68a4a6422d2511eaa35a506b4bbe21e4"] = this.$xssr(
            xssrrmb,
            xxzzsrmb
          );
          this.xssrywbb = item["689efd792d2511eaa35a506b4bbe21e4"];
          this.xssrbwbb = item["68a005d52d2511eaa35a506b4bbe21e4"];
          this.xssrrmbb = item["68a4a6422d2511eaa35a506b4bbe21e4"];
        }
      }
      this.table = list;
    },
    //保费输入
    bfInput(e) {
      let list = JSON.parse(JSON.stringify(this.table));
      for (const item of list) {
        if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "保费") {
          if (this.changeTime) {
            return false;
          }
          this.bfIywb = e[`689efd792d2511eaa35a506b4bbe21e4`];
          this.bfIbwb = this.$toFixed(this.bwbReturn(item), 2);
          this.bfIrmb = this.$toFixed(this.rmbReturn(item), 2);
          console.log(this.bfIywb);
        }
      }
      this.table = list;
    }
  },
  mounted() {
    !this.$route.query.id && this.getPaymentDetailArray();
    this.$route.query.id && this.poList();

    //业务币
    this.$root.Bus.$on("coin", e => {
      let get = this.$route.name == `createNetrade` && e.b == `内贸`;
      let bet = this.$route.name == `createJktrade` && e.b == `进口`;
      if (bet) {
        this.coin = e.a;
        for (const item of this.table) {
          item["689df31e2d2511eaa35a506b4bbe21e4"] = e.a;
        }
        this.$forceUpdate();
      }
    });
    //税额
    this.$root.Bus.$on(`taxAmt`, e => {
      let get = this.$route.name == `createNetrade` && e.b == `内贸`;
      let bet = this.$route.name == `createJktrade` && e.b == `进口`;
      if (bet) {
        this.taxAmt = e.a;
        setTimeout(() => {
          if (this.table.length) {
            for (const item of this.table) {
              // 增值税
              if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == `增值税`) {
                item["689efd792d2511eaa35a506b4bbe21e4"] = e.a;
              }
            }
          }
        }, 1000);
      }
    });

    //销售收入（含税）
    this.$root.Bus.$on(`contractAmtVat`, e => {
      let get = this.$route.name == `createNetrade` && e.b == `内贸`;
      let bet = this.$route.name == `createJktrade` && e.b == `进口`;
      if (bet) {
        this.contractAmtVat = e.a;
        if (this.table.length) {
          for (const item of this.table) {
            if (
              item["689ce92c2d2511eaa35a506b4bbe21e4"] == `销售收入（含税）`
            ) {
              item["689efd792d2511eaa35a506b4bbe21e4"] = e.a;
            }
            // 增值税
            // if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == `增值税`) {
            //   item["689efd792d2511eaa35a506b4bbe21e4"] = this.taxAmt;
            // }
          }
        }
      }
    });

    //销项增值税
    this.$root.Bus.$on(`originTaxAmt`, e => {
      let get = this.$route.name == `createNetrade` && e.b == `内贸`;
      let bet = this.$route.name == `createJktrade` && e.b == `进口`;
      if (bet) {
        this.originTaxAmt = e.a;
        if (this.table.length) {
          for (const item of this.table) {
            if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == `销项增值税`) {
              item["689efd792d2511eaa35a506b4bbe21e4"] = e.a;
            }
          }
        }
      }
    });

    //采购货价（含税）
    this.$root.Bus.$on(`vat`, e => {
      let get = this.$route.name == `createNetrade` && e.b == `内贸`;
      let bet = this.$route.name == `createJktrade` && e.b == `进口`;
      if (bet) {
        if (this.changeTime) {
          return false;
        }
        this.vat = e.a;
        setTimeout(() => {
          if (this.table.length) {
            for (const item of this.table) {
              // 采购货价（含税）
              if (
                item["689ce92c2d2511eaa35a506b4bbe21e4"] == `采购货价（含税）`
              ) {
                item["689efd792d2511eaa35a506b4bbe21e4"] = e.a;
                this.changeHandler(item);
              }
              // 保费
              if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == `保费`) {
                if (this.changeTime) {
                  return false;
                }
                item["689efd792d2511eaa35a506b4bbe21e4"] = this.$toFixed(
                  this.$baofei(e),
                  2
                );
                this.changeHandler(item);
              }
            }
          }
        }, 1000);
      }
    });
  },
  watch: {
    table: {
      handler() {
        if (this.changeTime) {
          return false;
        }
        //采购货价（含税）
        for (const item of this.table) {
          // 采购货价（含税）
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == `采购货价（含税）`) {
            item["689efd792d2511eaa35a506b4bbe21e4"] = this.vat;
            // this.changeHandler(item);
          }
        }
        for (const item of this.table) {
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == `销售收入（含税）`) {
            item["689efd792d2511eaa35a506b4bbe21e4"] = this.contractAmtVat;
          }
        }
        for (const item of this.table) {
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == `销项增值税`) {
            item["689efd792d2511eaa35a506b4bbe21e4"] = this.originTaxAmt;
          }
        }

        let that = this;
        let tab = JSON.parse(JSON.stringify(that.table));
        let yfywb = 0; //业务币
        let yfbwb = 0; //本位币
        let yfrmb = 0; //人民币
        //增值税
        let zzsywb = 0; //业务币
        let zzsbwb = 0; //本位币
        let zzsrmb = 0; //人民币
        //采购货价（含税）
        let cghjkywb = 0; //业务币
        let cghjkbwb = 0; //本位币
        let cghjkrmb = 0; //人民币
        //销售收入（含税）
        let xssrywb = 0; //业务币
        let xssrbwb = 0; //本位币
        let xssrrmb = 0; //人民币
        //销项增值税
        let xxzzsywb = 0; //业务币
        let xxzzsbwb = 0; //本位币
        let xxzzsrmb = 0; //人民币
        //保费
        let bfywb = 0; //业务币
        let bfbwb = 0; //本位币
        let bfrmb = 0; //人民币
        //其他收入
        let qtsrywb = 0; //业务币
        let qtsrbwb = 0; //本位币
        let qtsrrmb = 0; //人民币
        //其他支出
        let qtzcywb = 0; //业务币
        let qtzcbwb = 0; //本位币
        let qtzcrmb = 0; //人民币
        //税金合计
        let sjhjywb = 0; //业务币
        let sjhjbwb = 0; //本位币
        let sjhjrmb = 0; //人民币
        //成本合计
        let cbywb = 0; //业务币币
        let cbbwb = 0; //本位币
        let cbrmb = 0; //人民币
        for (const item of that.table) {
          // 增值税
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == `增值税`) {
            item["689efd792d2511eaa35a506b4bbe21e4"] = this.taxAmt;
          }
        }
        for (const item of that.table) {
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "运费") {
            yfywb = item["689efd792d2511eaa35a506b4bbe21e4"];
            yfbwb = that.bwbReturn(item);
            yfrmb = that.rmbReturn(item);
          }
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "增值税") {
            zzsywb = item["689efd792d2511eaa35a506b4bbe21e4"];
            zzsbwb = that.bwbReturn(item);
            zzsrmb = that.rmbReturn(item);
          }
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "采购货价（含税）") {
            cghjkywb = item["689efd792d2511eaa35a506b4bbe21e4"];
            cghjkbwb = that.bwbReturn(item);
            cghjkrmb = that.rmbReturn(item);
          }
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "销售收入（含税）") {
            xssrywb = item["689efd792d2511eaa35a506b4bbe21e4"];
            xssrbwb = that.bwbReturn(item);
            xssrrmb = that.rmbReturn(item);
          }
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "销项增值税") {
            xxzzsywb = item["689efd792d2511eaa35a506b4bbe21e4"];
            xxzzsbwb = that.bwbReturn(item);
            xxzzsrmb = that.rmbReturn(item);
          }
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "保费") {
            item["689efd792d2511eaa35a506b4bbe21e4"] = this.bfIywb;
            item["68a005d52d2511eaa35a506b4bbe21e4"] = this.bfIbwb;
            item["68a4a6422d2511eaa35a506b4bbe21e4"] = this.bfIrmb;
            bfywb = this.bfIywb; //item["689efd792d2511eaa35a506b4bbe21e4"];
            bfbwb = this.bfIbwb; //that.bwbReturn(item);
            bfrmb = this.bfIrmb; //that.rmbReturn(item);
          }
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "其他收入") {
            qtsrywb = item["689efd792d2511eaa35a506b4bbe21e4"];
            qtsrbwb = that.bwbReturn(item);
            qtsrrmb = that.rmbReturn(item);
          }
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "其他支出") {
            qtzcywb = item["689efd792d2511eaa35a506b4bbe21e4"];
            qtzcbwb = that.bwbReturn(item);
            qtzcrmb = that.rmbReturn(item);
          }
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "税金合计") {
            item["689efd792d2511eaa35a506b4bbe21e4"] = zzsywb;
            item["68a005d52d2511eaa35a506b4bbe21e4"] = zzsbwb;
            item["68a4a6422d2511eaa35a506b4bbe21e4"] = zzsrmb;
            sjhjywb = item["689efd792d2511eaa35a506b4bbe21e4"];
            sjhjbwb = item["68a005d52d2511eaa35a506b4bbe21e4"];
            sjhjrmb = item["68a4a6422d2511eaa35a506b4bbe21e4"];
          }
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "成本合计") {
            item["689efd792d2511eaa35a506b4bbe21e4"] = that.$cbhj(
              cghjkywb,
              zzsywb,
              yfywb
            );
            item["68a005d52d2511eaa35a506b4bbe21e4"] = that.$cbhj(
              cghjkbwb,
              zzsbwb,
              yfbwb
            );
            item["68a4a6422d2511eaa35a506b4bbe21e4"] = that.$cbhj(
              cghjkrmb,
              zzsrmb,
              yfrmb
            );
            cbywb = item["689efd792d2511eaa35a506b4bbe21e4"];
            cbbwb = item["68a005d52d2511eaa35a506b4bbe21e4"];
            cbrmb = item["68a4a6422d2511eaa35a506b4bbe21e4"];
          }
          // if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "销售收入（不含税）") {
          //   this.xssrywbb = item["689efd792d2511eaa35a506b4bbe21e4"];
          //   this.xssrbwbb = item["68a005d52d2511eaa35a506b4bbe21e4"];
          //   this.xssrrmbb = item["68a4a6422d2511eaa35a506b4bbe21e4"];
          // }
        }
        for (const item of that.table) {
          if (
            item["689ce92c2d2511eaa35a506b4bbe21e4"] == "销售收入（不含税）"
          ) {
            item["689efd792d2511eaa35a506b4bbe21e4"] = this.$xssr(
              xssrywb,
              xxzzsywb
            );
            item["68a005d52d2511eaa35a506b4bbe21e4"] = this.$xssr(
              xssrbwb,
              xxzzsbwb
            );
            item["68a4a6422d2511eaa35a506b4bbe21e4"] = this.$xssr(
              xssrrmb,
              xxzzsrmb
            );
            this.xssrywbb = item["689efd792d2511eaa35a506b4bbe21e4"];
            this.xssrbwbb = item["68a005d52d2511eaa35a506b4bbe21e4"];
            this.xssrrmbb = item["68a4a6422d2511eaa35a506b4bbe21e4"];
          }
        }

        // 实现利润
        let sxlrywb = 0;
        let sxlrbwb = 0;
        let sxlrrmb = 0;
        let cbfyywb = 0; //业务币
        let cbfybwb = 0; //本位币
        let cbfyrmb = 0; //人民币
        for (const item of that.table) {
          //成本及费用合计
          // let cbfyywb = 0; //业务币
          // let cbfybwb = 0; //本位币
          // let cbfyrmb = 0; //人民币
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == "成本及费用合计") {
            item["689efd792d2511eaa35a506b4bbe21e4"] = that.$cbfyhj(
              bfywb,
              cbywb
            );
            item["68a005d52d2511eaa35a506b4bbe21e4"] = that.$cbfyhj(
              bfbwb,
              cbbwb
            );
            item["68a4a6422d2511eaa35a506b4bbe21e4"] = that.$cbfyhj(
              bfrmb,
              cbrmb
            );
            cbfyywb = item["689efd792d2511eaa35a506b4bbe21e4"];
            cbfybwb = item["68a005d52d2511eaa35a506b4bbe21e4"];
            cbfyrmb = item["68a4a6422d2511eaa35a506b4bbe21e4"];
          }
          // // 实现利润
          // let sxlrywb = 0;
          // let sxlrbwb = 0;
          // let sxlrrmb = 0;
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == `实现利润`) {
            //业务币金额
            item["689efd792d2511eaa35a506b4bbe21e4"] = that.$sxlr(
              qtsrywb,
              this.xssrywbb,
              qtzcywb,
              cbfyywb
            );
            sxlrywb = item["689efd792d2511eaa35a506b4bbe21e4"];
            //本位币金额
            item["68a005d52d2511eaa35a506b4bbe21e4"] = that.$sxlr(
              qtsrbwb,
              this.xssrbwbb,
              qtzcbwb,
              cbfybwb
            );
            sxlrbwb = item["68a005d52d2511eaa35a506b4bbe21e4"];
            //人民币
            item["68a4a6422d2511eaa35a506b4bbe21e4"] = that.$sxlr(
              qtsrrmb,
              this.xssrrmbb,
              qtzcrmb,
              cbfyrmb
            );
            sxlrrmb = item["68a4a6422d2511eaa35a506b4bbe21e4"];
          }
        }
        for (const item of this.table) {
          //利润率%
          if (item["689ce92c2d2511eaa35a506b4bbe21e4"] == `利润率%`) {
            //业务币金额
            item["689efd792d2511eaa35a506b4bbe21e4"] = that.$lrl(
              sxlrywb,
              this.xssrywbb
            );
            //本位币金额
            item["68a005d52d2511eaa35a506b4bbe21e4"] = that.$lrl(
              sxlrbwb,
              this.xssrbwbb
            );
            //人民币金额
            item["68a4a6422d2511eaa35a506b4bbe21e4"] = that.$lrl(
              sxlrrmb,
              this.xssrrmbb
            );
          }
        }
        this.$forceUpdate();
      },
      deep: true,
      immediate: false
    }
  }
};
</script>
