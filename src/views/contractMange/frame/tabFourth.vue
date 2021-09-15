<template>
  <div class="tabFourth">
    <div class="input-div input-div-bor bortop0">
      <el-divider></el-divider>
      <!-- <div class="table_title">版本</div> -->
      <div class="">
        <el-table border
                  center
                  :data="tableData"
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
              {{ $timeFun(scope.row.updatedTime, 1) }}
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
              <el-button @click="handleClick(scope.row)"
                         type="text"
                         size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getOdContractHis
} from "@/api/contractMange/frameProtocol";
export default {
  name: "tabFourth",
  data () {
    return {
      tableData: []
    };
  },
  inject: [`reload`],
  methods: {
    handleClick (e) {
      let contractId = e.id
      this.$router.push({
        path:
          '/index/contractMange/frame/checkFrame?contractHisId=' + contractId
      });
      this.reload();
    },
    init () {
      let url = window.location.href;
      if (url.indexOf("contractId=") != -1) {
        let contractId = url.split("contractId=")[1];
        getOdContractHis({ orginId: contractId }).then((res) => {
          this.tableData = res.data
        }).catch((err) => {
        });
      }
    }
  },
  mounted () {
    this.init()
  }
};
</script>

<style lang="scss">
.tabFourth {
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
}
</style>
