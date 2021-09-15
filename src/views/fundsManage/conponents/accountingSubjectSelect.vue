<template>
  <div class="accountingSubjectSelect" style="text-align: left;">
    <label v-bind="$attrs" style="width: 25%!important;"  class="lableFont" >{{labelName}}</label>
    <el-input 
      v-model="subject.name"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="subjectTip"
      style="width:75%!important"
    >
      <i slot="suffix" class="el-icon-search" v-show="!subject.name"></i>
    </el-input>
    <!-- 选择币别 -->
    <accountingSubject-modal :longNumber="longNumber" v-if="subjectshow" :tipShow="subjectshow" @subjectCancle="subjectCancle" @subjectSure="subjectSure"></accountingSubject-modal>
  </div>
</template>
<script>
import accountingSubjectModal from "@/components/subjectFrame.vue";//测试
export default {
  name: "accountingSubjectSelect",
  components: { accountingSubjectModal },
  props: {
    subject: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "科目"
    },
    disable: {
      type: Boolean,
      default: false
    },
    longNumber:{
      type:String|Number,
      default:""
    }
  },
  data() {
    return {
      subjectshow: false //科目弹窗
    };
  },
  methods: {
    //币别弹窗打开
    subjectTip() {
      this.subjectshow = true;
    },
    //币别弹窗关闭
    subjectCancle() {
      this.subjectshow = false;
    },
    //币别弹窗确定获取数据
    subjectSure(e) {
      this.subjectshow = false;
      e.name= e.number+e.name
      e.code = e.number;
      this.$emit("update:subject", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:subject", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>
