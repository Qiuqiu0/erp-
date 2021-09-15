<template>
  <div v-if="tipShow">
    <!--审核弹窗 开始-->
    <el-dialog :close-on-click-modal="false"
               :visible.sync="tipShow"
               :show-close="false"
               title="审核"
               width="400px"
               class="popup_box">
      <div class="examine-dialog">
        <el-col v-if="Object.keys(closeData).length" :span="24"
                class="el-col">
          <label>合同关闭类型</label>
          <el-select clearable
                     size="small"
                     class="el-select"
                     v-model="closeData.closeType"
                     disabled>
            <el-option value="0" label="截停合同"></el-option>
            <el-option value="1" label="关闭合同"></el-option>
          </el-select>
        </el-col>
        <el-col v-if="Object.keys(closeData).length"
                :span="24"
                class="el-col">
          <label style="vertical-align:top">合同关闭原因</label>
          <el-input type="textarea"
                    v-model="closeData.closeReason"
                    size="small"
                    class="el-textarea"
                    disabled
                    >
          </el-input>
        </el-col>
        <el-col :span="24"
                class="el-col">
          <label>审核</label>
          <el-select clearable
                     size="small"
                     class="el-select"
                     v-model="examineValue"
                     placeholder="请选择"
                     @change="getEexamineValue">
            <el-option v-for="item in examineList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col v-if="examineValue == '0'"
                :span="24"
                class="el-col">
          <label style="vertical-align:top">驳回原因</label>
          <el-input type="textarea"
                    autosize
                    v-model="rejectReason"
                    size="small"
                    class="el-textarea"
                    placeholder="请输入内容">
          </el-input>
        </el-col>
      </div>
      <div class="button-div2">
        <el-button @click="examineSure"
                   icon="el-icon-check">确定</el-button>
        <el-button @click="examineCancle"
                   icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--审核弹窗 结束-->
  </div>
</template>

<script>
export default {
  name: `exaimCont`,
  props: {
    tipShow: {
      type: Boolean
    },
    closeData:{
      type:Object
    }
  },
  data () {
    return {
      rejectReason: ``,
      examineList: [
        { value: "1", label: "通过" },
        { value: "0", label: "驳回" }
      ],
      examineValue: "", //审核选中的值
    }
  },
  methods: {
    //关闭
    examineCancle () {
      this.$emit("exaCancle");
    },
    //确定
    examineSure () {
      if (this.examineValue === ``) {
        this.$openWarning(`请选择内容`);
        return false;
      }
      this.$emit("exaSure", this.rejectReason, this.examineValue);
    },
    //清空
    getEexamineValue () {
      this.rejectReason = "";
    },
  }
};
</script>

<style lang="scss">
</style>