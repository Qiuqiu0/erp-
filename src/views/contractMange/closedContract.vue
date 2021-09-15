<template>
  <div v-if="tipShow">
    <!--关闭弹窗 开始-->
    <el-dialog :close-on-click-modal="false"
               :visible.sync="tipShow"
               :show-close="false"
               title="关闭"
               width="400px"
               class="popup_box">
      <div class="examine-dialog">
        <el-col :span="24"
                class="el-col">
          <label><span class="must-full">*</span>合同关闭类型</label>
          <el-select clearable
                     size="small"
                     class="el-select"
                     v-model="closeType"
                     placeholder="请选择">
            <el-option value="0" label="截停合同"></el-option>
            <el-option value="1" label="关闭合同"></el-option>
          </el-select>
        </el-col>
        <el-col
                :span="24"
                class="el-col">
          <label style="vertical-align:top"><span class="must-full">*</span>合同关闭原因</label>
          <el-input type="textarea"
                    autosize
                    v-model="closeReason"
                    size="small"
                    class="el-textarea"
                    placeholder="请输入内容">
          </el-input>
        </el-col>
      </div>
      <div class="button-div2">
        <el-button @click="closedSure"
                   icon="el-icon-check">确定</el-button>
        <el-button @click="closedCancel"
                   icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--审核弹窗 结束-->
  </div>
</template>

<script>
export default {
  name: `closedCont`,
  props: {
    tipShow: {
      type: Boolean
    }
  },
  data () {
    return {
      closeReason: ``,
      closeType: "", //审核选中的值
    }
  },
  methods: {
    //关闭
    closedCancel () {
      this.$emit("closedCancel");
    },
    //确定
    closedSure () {
      if (this.closeType && this.closeReason) {
        this.$emit("closedSure", this.closeType, this.closeReason);
      }else{
        this.$openWarning("请选择合同关闭类型,填写关闭原因");
        return false;
      }
      
    },
    //清空
    // getEexamineValue () {
    //   this.closeReason = "";
    // },
  }
};
</script>

<style lang="scss">
</style>