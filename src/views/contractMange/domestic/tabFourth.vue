<template>
  <div class="tabFourth content-div2 contract_css_link">
    <div class="input-div input-div-bor bortop0">
      <!-- <div class="table_title">版本</div> -->
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
import "@/assets/css/contract.scss";
import Bmange from "@/api/contractMange/bmange";
export default {
  name: "tabFourth",
  data() {
    return {
      tableData: []
    };
  },
  inject: [`reload`],
  created() {
    this.$route.query.id && this.getDetail();
  },
  methods: {
    handleClick(e) {
      this.$router.push({
        path: "/index/contractMange/domestic/domesticDetail",
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
      Bmange.getHis(params)
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
</style>
