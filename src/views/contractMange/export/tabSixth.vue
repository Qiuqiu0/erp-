<template>
  <div class="tabSixth content-div2 contract_css_link">
    <div class="input-div input-div-bor bortop0">
      <el-col :span="5" class="el-col">
        <label>创建人</label>
        <el-input v-model="detail.createdName" class="el-inputs" placeholder="请选择" disabled></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>创建时间</label>
        <el-date-picker
          v-model="detail.createdTime"
          type="date"
          placeholder="选择日期" disabled>
        </el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>修改人</label>
        <el-input v-model="detail.updatedName" class="el-inputs" placeholder="请选择" disabled></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>修改时间</label>
        <el-date-picker
          v-model="detail.updatedTime"
          type="date"
          placeholder="选择日期" disabled>
        </el-date-picker>
      </el-col>
    </div>
  </div>
</template>

<script>
import Bmange from "@/api/contractMange/bmange";
import "@/assets/css/contract.scss";
export default {
  name: "tabSixth",
  data() {
    return {
      detail: ""
    };
  },
  created() {
    //获取信息
    this.$route.query.id && this.getDetail();
  },
  methods: {
    handleClick(e) {},
    //获取信息
    getDetail() {
      let params = {
        soContractId: this.$route.query.id,
        pageSize: 999
      };
      //基本信息
      Bmange.getXx(params)
        .then(res => {
          this.detail = res.data;
        })
        .catch();
    }
  }
};
</script>

<style lang="scss">
</style>
