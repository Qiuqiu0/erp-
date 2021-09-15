<template>
  <!-- 业务币种列表 -->
  <div class="postPopup" v-if="tipShow">
    <!--冲销弹窗-->
    <el-dialog :visible.sync="tipShow" :before-close="tipsCancle" width="400px" append-to-body :show-close="false">
      <span slot="title" style="text-al" class="el-dialog__title">过账窗口</span>
      <el-form :model="postCredit" :rules="rules" label-width="100px" ref="postCreditForm">
        <el-form-item label="过账日期" prop="date">
          <accountingDate-select
            :companyId="selectioned.companyId"
            :accountingDate.sync="postCredit.date"
          ></accountingDate-select>
        </el-form-item>
      </el-form>
      <div class="button-div2">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-check"
          @click="tipsSure('postCreditForm')"
        >确定</el-button>
        <el-button size="small" icon="el-icon-close" @click="tipsCancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import accountingDateSelect from "@/views/fundsManage/conponents/accountingDateSelect";
export default {
  name: "postPopup",
  components: { accountingDateSelect },
  data() {
    return {
      postCredit: {
        date: ""
      },
      rules: {
        date: [{ required: true, message: "时间不能为空" }]
      }
    };
  },
  props: {
    tipShow: {
      type: Boolean
    },
    selectioned: {
      required: true,
      type: Object,
      default: Object
    }
  },
  methods: {
    //关闭
    tipsCancle() {
      this.$emit("tipsCancle");
      this.postCredit = {
        date: ""
      };
    },
    //确定
    tipsSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("tipsSure", this.postCredit);
          this.postCredit = {
            date: ""
          };
        } else {
          return false;
        }
      });
    }
  }
};
</script>
