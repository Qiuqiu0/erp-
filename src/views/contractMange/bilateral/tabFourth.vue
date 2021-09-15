<template>
  <div class="tabFourth content-div2 contract_css_link">
    <div class="input-div input-div-bor bortop0">
      <div class="">
        <el-table border center :data="tableData" class="el-table">
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="paritiesDate" label="版本号">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="paritiesDate" label="修改时间">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="paritiesDate" label="修改人">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="paritiesDate" label="进入">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/contract.scss";
export default {
  name: "tabFourth",
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    handleClick(e) {}
  }
};
</script>

<style lang="scss">
</style>
