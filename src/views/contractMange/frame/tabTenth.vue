<template>
  <div class="tabTenth">
    <!-- 收款方式 -->
    <div class="input-div input-div-bor bortop0">
      <el-divider></el-divider>
      <!-- <div class="table_title">合同条款</div> -->
      <div class="">
        <div class="button-div">
          <el-button icon="el-icon-plus" class="query-button"
                     @click="addList">创建</el-button>
          <el-button icon="el-icon-minus" @click="deleFun">删除</el-button>
        </div>
      </div>
      <div class="">
        <el-table border
                  center
                  :data="tableData"
                  class="el-table"
                  ref="multipleTable"
                  @select="handleSelectChange"
                  @selection-change="handleChange">
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
                <el-input v-model="scope.row.termContent"
                          placeholder="请输入内容"></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 收款方式 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Bmange from "@/api/contractMange/bmange";
import {
  getOdFwContractTermList,
  deleteOdFwContractTerm,
  getOdFwContract
} from "@/api/contractMange/frameProtocol";
import { Form } from 'element-ui';
export default {
  name: "tabTenth",
  data () {
    return {
      activeName2: "first", //标签页
      tableData: [], //通讯表格
      selectioned: null, //表格选中项
      goodsListIndex: null, //选中index
      newTbale: [], //新建数据
      linkList: [],
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      loading: true, //表格loading
      pickerOptions: {
        disabledDate (time) {
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
      contractId: "",
      isChangeContract: false,//是否为变更订单
      isChange: null,
      tempTableData: [],//变更暂存
    };
  },
  created () {
    //获取信息
    //this.$route.query.id && this.getDetail();
    if (window.location.href.indexOf("contractId=") != -1) {
      this.contractId = window.location.href.split("contractId=")[1];
      this.initData();
      if (window.location.href.indexOf("isChange=") != -1) {
        this.isChangeContract = true
        this.isChange = 1
      }
    }
  },
  mounted () {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    initData () {
      getOdFwContractTermList({
        contractId: this.contractId
      })
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => { });
      //只是为了获取版本
      const params = new FormData();
      params.append('contractId', this.contractId)
      getOdFwContract(params)
        .then(res => {
          this.version = res.data.version;
        })
        .catch(err => { });
    },
    getDetail () {
      let params = {
        soContractId:this.contractId
      };
      Bmange.getTk(params)
        .then(res => {
          this.tableData = res.data;
        })
        .catch();
    },
    to () {
      let data
      if (!this.isChangeContract) {
        data = this.tableData;
      } else {
        data = this.tableData.concat(this.tempTableData)
      }
      return data;
    },
    handleSelectChange (selection, row) {
      if (row) {
        this.selectioned = selection;
        this.goodsListIndex = this.tableData.indexOf(row);
      }
    },
    //删除方法
    deleFun () {
      let index = this.goodsListIndex;
      if (this.selectioned.length == 0) {
        this.$openWarning(`请选中数据`);
      } else {
        this.$confirm("是否删除选中数据？", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false
        }).then(res => {
          if (!this.isChangeContract) {
            //非框架变更
            let ptRowidList = []
            this.selectioned.map((item, index) => {
              if (item.ptRowid) {
                ptRowidList.push(item.ptRowid)
              }
              this.tableData.splice(this.tableData[this.tableData.indexOf(item)], 1)
            })

            deleteOdFwContractTerm({
              contractId: this.contractId,
              version: this.version,
              ptRowidList,
            }).then((res) => {
              this.$openSuccess('删除成功')
            })
          } else {
            //框架变更    非调接口删除
            this.selectioned.map((item, index) => {
              this.tableData.splice(this.tableData.indexOf(item), 1)
              item.isInactive = 2
            })
            this.tempTableData = this.selectioned
            this.$openSuccess('删除成功，变更后生效')
          }
        });
      }
    },
    //运输信息表格选择
    handleChange (e) {
      this.selectioned = e;
    },
    ///运输信息创建数据
    addList () {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        termRowno: (this.tableData.length + 1) * 10,
        termContent: ``
      };
      let newTbale = [];
      newTbale.unshift(data);
      this.tableData = newTbale.concat(this.tableData);
    }
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  watch: {
    themecolor: {
      handler () {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    }
  }
};
</script>

<style lang="scss">
.tabTenth {
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
    align-items: center;
    .el-col {
      margin-right: 10px;
    }
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
    padding: 10px;
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
  .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  .el-select__caret {
    line-height: normal;
  }
  label {
    position: relative;
  }
}
</style>
