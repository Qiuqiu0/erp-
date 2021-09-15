<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="editPage"
      :before-close="cancel"
      :show-close="false"
      width="400px"
    >
      <div class="index">
        <div>
          <el-tree
            :data="[{ key: '', label: '全部', children: list_ }]"
            show-checkbox
            node-key="key"
            default-expand-all
            @check="changeItem"
            :default-checked-keys="checkedList"
            :expand-on-click-node="false"
            :render-content="renderContent"
            draggable
            :allow-drag="allowDrag"
            :allow-drop="allowDrop"
            @node-drop= "nodeDrop"
          >
          </el-tree>
        </div>
        <div class="button-div2">
          <el-button
            type="primary"
            size="small"
            @click="confirm"
            icon="el-icon-check"
            >确 定</el-button
          >
          <el-button size="small" @click="cancel" icon="el-icon-close"
            >取 消</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "editSearchItem",
  props: {
    editPage: {
      type: Boolean
    },
    list: {
      type: Array
    },
    title:{
      type:String
    }
  },
  data() {
    return {
      list_: this.list,
      checkedList: [],
      sourceList: JSON.parse(JSON.stringify(this.list))
    };
  },
  created() {
    this.setCheckedList(this.list_);
  },

  methods: {
    nodeDrop(dragNode,endNode,pos,event){
      this.setCheckedList(this.list_);

    },
    allowDrop(draggingNode, {level}, type){
      return type !== 'inner' && level === 2
    },
    allowDrag({level}){
      return level === 2
    },
    setCheckedList(list) {
      this.checkedList = [];
      list.forEach((item, index) => {
        if (item.checked) {
          this.$set(this.checkedList, index, item.key);
        }
        item.index = index;
      });
    },
    renderContent(h, { node, data }) {
      const children =
        node.childNodes.length === 0 ? node.parent.childNodes : node.childNodes;
      const index = children.findIndex(d => d.id === node.id);
      let btns = "";
      const upBtn =
        index === 0 ? (
          ""
        ) : (
          <el-button
            class="editArrow"
            type="text"
            style="font-size:14px"
            on-click={() => this.itemIndex(node, data, "up")}
            icon="el-icon-top"
          ></el-button>
        );
      const downBtn =
        index === this.list_.length - 1 ? (
          ""
        ) : (
          <el-button
              class="editArrow"
              type="text"
            style="font-size:14px"
            on-click={() => this.itemIndex(node, data, "down")}
            icon="el-icon-bottom"
          ></el-button>
        );
      if (node.level === 2) {
        btns = (
          <span>
            {upBtn}
            {downBtn}
          </span>
        );
      }
      let indexDom ="";
      if(node.level === 2){
        indexDom =<span style="width:30px;display: inline-block;text-align:left">{data.index+1}</span>;
      }
      return (
        <span class="custom-tree-node">
          {indexDom}
          <span style="width: 150px;display: inline-block">{node.label}</span>
          {btns}
        </span>
      );
    },
    itemIndex(node, data, type) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.key === data.key);

      let { list_ } = this;
      const selectData = list_[index];
      list_.splice(index, 1);
      if (type === "up") {
        list_.splice(index - 1, 0, selectData);
      } else {
        list_.splice(index + 1, 0, selectData);
      }
      this.setCheckedList(list_);
    },

    changeItem(node, data) {
      const { checkedKeys } = data;
      this.list_.forEach(item => {
        let hasChecked = checkedKeys.includes(item.key);
        item.checked = hasChecked;
      });
    },

    confirm() {
      this.$emit("editSure", this.list_);
    },
    cancel() {
      this.$emit("editCancel", this.sourceList);
    }
  }
};
</script>

<style scoped>

/deep/ .el-tree-node__expand-icon{
  display: none !important;
}
</style>
