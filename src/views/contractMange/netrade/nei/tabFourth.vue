<template>
  <div class="tabFourth">
    <div class="input-div input-div-bor bortop0">
      <div class="">
        <el-table border center :data="tableData" class="el-table">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="displayVersion"
            label="版本号"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="createdTime"
            label="修改时间"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="createdName"
            label="修改人"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="paritiesDate"
            label="进入"
          >
           <template slot-scope="scope">
             <div style="cursor: pointer;" @click="handleClick(scope.row)">查看</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Cmange from "@/api/contractMange/cmange";
export default {
  name: "tabFourth",
  data() {
    return {
      tableData: []
    };
  },
  inject: [`reload`],
  created() {
    this.getDetail();
  },
  methods: {
    handleClick(e) {
      this.$router.push({
        path: "/index/contractMange/netrade/neDetail",
        query: { id: e.id, isChange: 1, orginId: e.orginId }
      });
      this.reload();
    },
    //获取详情
    getDetail() {
      let params = {
        orginId: this.$route.query.id,
        pageSize: 999
      };
      Cmange.getHis(params)
        .then(res => {
          for (const item of res.data) {
            item.createdTime = this.$timeFun(item.createdTime, 1);
          }
          this.tableData = res.data;
        })
        .catch();
    }
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
