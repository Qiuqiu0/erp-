<template>
  <div class="tabSixth">
    <div class="input-div input-div-bor bortop0">
      <!-- <el-divider></el-divider> -->
      <el-col :span="5"
              class="el-col">
        <label>创建人</label>
        <el-input v-model="tableData.createdName"
                  class="el-inputs"
                  placeholder="自动生成"
                  disabled></el-input>
      </el-col>
      <el-col :span="5"
              class="el-col">
        <label>创建时间</label>
        <el-date-picker v-model="tableData.createdTime"
                        type="date"
                        placeholder="自动生成"
                        disabled>
        </el-date-picker>
      </el-col>
      <el-col :span="5"
              class="el-col">
        <label>修改人</label>
        <el-input v-model="tableData.updatedName"
                  class="el-inputs"
                  placeholder="自动生成"
                  disabled></el-input>
      </el-col>
      <el-col :span="5"
              class="el-col">
        <label>修改时间</label>
        <el-date-picker v-model="tableData.updatedTime"
                        type="date"
                        placeholder="自动生成"
                        disabled>
        </el-date-picker>
      </el-col>
    </div>
  </div>
</template>

<script>
import { getOdFwContract } from "@/api/contractMange/frameProtocol";
export default {
  name: "tabSixth",
  data () {
    return {
      companyName: "",
      tableData: {
        createdName: "",
        createdTime: "",
        updatedName: "",
        updatedTime: ""
      }
    };
  },
  methods: {
    initData () {
      let url = window.location.href;
      if (url.indexOf("contractId=") != -1) {
        let contractId = url.split("contractId=")[1];
        const subForm = new FormData();
        subForm.append("contractId", contractId);
        getOdFwContract(subForm)
          .then(res => {
            this.tableData = res.data;
          })
          .catch(() => { });
      }
    }
  },
  created () {
    this.initData();
  }
};
</script>

<style lang="scss">
.tabSixth {
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
