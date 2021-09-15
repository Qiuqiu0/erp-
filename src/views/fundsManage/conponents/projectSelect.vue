<template>
  <div>
    <label v-bind="$attrs">{{labelName}}</label>
    <el-input
      class="el-inputs"
      v-model="project.projectName"
      size="small"
      placeholder="请选择"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="projectTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!project.projectName"></i>
    </el-input>
    <!-- 选择公司弹窗 -->
    <project-modal
      v-if="projectShow"
      :tipShow="projectShow"
      @projectCancle="projectCancle"
      @projectSure="projectSure"
    ></project-modal>
  </div>
</template>
<script>
import projectModal from "@/components/projectSelect.vue";
export default {
  name: "projectSelect",
  components: { projectModal },
  props: {
    project: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "项目"
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      projectShow: false //项目弹窗
    };
  },
  methods: {
    //项目弹窗打开
    projectTip() {
      this.projectShow = true;
    },
    //项目弹窗关闭
    projectCancle() {
      this.projectShow = false;
    },
    //项目弹窗确定获取数据
    projectSure(e) {
      this.projectShow = false;
      this.projectName = e;
      this.$emit("update:project", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:project", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>