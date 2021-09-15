<template>
  <el-date-picker
    class="el-inputs"
    size="mini"
    v-model="date"
  
    @change="changeHandler"
    type="date"
    :picker-options="options"
    :disabled="disable"
    placeholder="年/月/日"
  ></el-date-picker>
</template>
<script>
import { getCompanyAccountingDate } from "@/api/creditManage/selectOptions";
export default {
  name: "accountingDateSelect",
  props: {
    accountingDate: {
      required: true,
      type: String | Number
    },
    companyId: {
      required: true,
      type: String,
      default: ""
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      date: "",
      options: {}
    };
  },
  methods: {
    getOptions() {
      if (this.companyId === "") {
        return;
      }
      getCompanyAccountingDate({ companyId: this.companyId }).then(res => {
        if (res.code === "success") {
          let beginDate = new Date(Number(res.data.begindate));
          let endDate = new Date(Number(res.data.enddate));
          this.options = {
            disabledDate(time) {
              return time < beginDate || time > endDate;
            }
          };
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:accountingDate", e);
      this.$emit("change", e);
    }
  },
  watch: {
    companyId(val) {
      if (val !== "") {
        this.getOptions();
      }
    },
    accountingDate: {
      handler(val) {
        if (val != "") {
          this.date = val;
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>