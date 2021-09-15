<template>
  <div id="creditGroup">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
      <el-col :span="5" class="el-col" style="margin-right:20px">
        <label class="text_too_long">信用账户组代码</label>
        <el-input v-model="creditGroupCode" class="el-inputs"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label class="text_too_long">信用账户组名称</label>
        <el-input v-model="creditGroupName" class="el-inputs"></el-input>
      </el-col>
    </div>
    <!--列表信息-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-folder-add" v-if="$actionFlag(`F001`)" @click="addData">创建</el-button>
      <el-button icon="el-icon-edit" v-if="$actionFlag(`F002`)" @click="updateData">修改</el-button>
      <el-button icon="el-icon-delete" v-if="$actionFlag(`F003`)" @click="deleteData">删除</el-button>
      <el-button icon="el-icon-suitcase" v-if="$actionFlag(`F004`)" @click="save">保存</el-button>
      <el-button icon="el-icon-unlock" v-if="$actionFlag(`F005`)" @click="changeState(0)">启用</el-button>
      <el-button icon="el-icon-lock" v-if="$actionFlag(`F006`)" @click="changeState(1)">禁用</el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        class="el-table edit-info"
        border
        center
        height="calc(100% - 35px)"
        :data="groupData"
        v-loading="loading"
        ref="multipleTable"
        @selection-change="handleChange"
        @row-dblclick="singleDblclick"
        @select-all="singleSelect"
        @select="singleSelect"
        @row-click="singleSelectRow">
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column prop="creditGroupCode" label="信用账户组代码" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="信用账户组名称" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.canEdit">
              <el-input v-model="scope.row.creditGroupName"></el-input>
            </div>
            <div v-else>{{scope.row.creditGroupName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.isInactive == 0">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdName" label="创建人" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" min-width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.createdTime | time}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedName" label="修改人" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="修改时间" min-width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.updatedTime | time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" min-width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.canEdit">
              <el-input v-model="scope.row.remark"></el-input>
            </div>
            <div v-else>{{scope.row.remark}}</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageArea"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentChange"
        @size-change="currentSize"
        :current-page="page"
        :page-sizes="[100,200,300,500]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import GroupApi from "@/api/creditData/creditGroup";
export default {
  name: "creditGroup",
  data() {
    return {
      //查询条件
      creditGroupCode: "",
      creditGroupName: "",
      //列表字段
      groupData: [],
      loading: true,
      selectedIndex: null, //列表选中下标
      page: 1,
      pageSize: 100,
      total: 0,
      navColor: {
        button: {
          backgroundColor: ""
        }
      }
    };
  },
  created() {
    //获取列表
    this.creditGroupList();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //获取表格
    creditGroupList() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        creditGroupCode: this.creditGroupCode,
        creditGroupName: this.creditGroupName
      };
      params = this.$queryFilter(params);
      this.loading = true;
      GroupApi.creditGroupList(params).then(res => {
        this.loading = false;
        this.groupData = res.data.list;
        this.total = res.data.total;
      }).catch(() => {
        this.loading = false;
      });
    },
    //创建
    addData() {
      this.groupData.forEach(item => {
        item.canEdit = false;
      });
      let newData = {
        creditGroupName: "",
        isInactive: 0,
        remark: "",
        canEdit: true,
        isChange: 1
      };
      this.groupData.unshift(newData);
      if (this.selectedIndex != null) {
        this.selectedIndex++;
      }
    },
    //修改
    updateData() {
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let row = this.groupData[this.selectedIndex];
      this.singleDblclick(row); //双击修改方法
    },
    //删除
    deleteData() {
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let row = this.groupData[this.selectedIndex];
        if (row.version || row.version == 0) {
          GroupApi.creditGroupDelete(row).then(res => {
            if (res.code == "success") {
              this.$openSuccess(res.message);
              this.groupData.splice(this.selectedIndex, 1);
            } else {
              this.$openWarning(res.message);
            }
          }).catch();
        } else {
          this.groupData.splice(this.selectedIndex, 1);
        }
      });
    },
    //启用、禁用
    changeState(state) {
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let title = state == 0 ? "是否确定启用？" : "是否确定禁用？";
      this.$confirm(title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let row = this.groupData[this.selectedIndex];
        if (row.isInactive == state) {
          this.$openWarning("该状态不需要修改");
        } else {
          let params = [];
          row.isInactive = state;
          params[0] = row;
          GroupApi.creditGroupSave(params).then(res => {
            this.$openSuccess(res.message);
            this.page = 1;
            this.creditGroupList();
          }).catch();
        }
      }).catch();
    },
    //保存
    save() {
      let groupChangeData = this.groupData.filter(item => {
        return item.isChange == 1;
      });
      if (groupChangeData.length == 0) {
        this.$openWarning("暂无数据需要提交");
        return false;
      }
      let isOK = true;
      let message = "";
      groupChangeData.forEach(item => {
        if (item.creditGroupName == "") {
          message = "信用账户组名称不能为空";
          isOK = false;
          return false;
        }
      });
      if (!isOK) {
        this.$openWarning(message);
        return false;
      }
      this.$confirm("是否确定保存？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      }).then(() => {
        GroupApi.creditGroupSave(groupChangeData).then(res => {
          this.$openSuccess(res.message);
          this.page = 1;
          this.creditGroupList();
        }).catch();
      });
    },
    //查询
    query() {
      this.page = 1;
      this.creditGroupList();
    },
    //重置
    reset() {
      this.creditGroupCode = "";
      this.creditGroupName = "";
    },
    //列表单选
    handleChange(e) {
      if (e.length === 0) {
        this.selectedIndex = null;
      }
    },
    singleSelect(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length === 0) {
        return;
      }
      if (row) {
        this.$refs.multipleTable.toggleRowSelection(row, true);
        this.selectedIndex = this.groupData.indexOf(row);
      }
    },
    singleSelectRow(e) {
      this.$refs.multipleTable.toggleRowSelection(e);
      this.selectedIndex = this.groupData.indexOf(e);
    },
    //列表双击编辑行
    singleDblclick(e){
      this.groupData.forEach(item => {
        item.canEdit = e == item ? true : false;
      });
      this.groupData[this.selectedIndex].isChange = 1;
      this.$set(this.groupData, this.groupData.indexOf(e), e);
    },
    //翻页
    currentChange(e) {
      this.page = e;
      this.creditGroupList();
    },
    //单页数量
    currentSize(e) {
      this.page = 1;
      this.pageSize = e;
      this.creditGroupList();
    }
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    }
  }
};
</script>
<style lang="scss">
#creditGroup {
  .el-col-5 {
    height: 32px;
  }
  label {
    display: inline-block;
    width: 30%;
    vertical-align: middle;
  }
  .el-inputs,
  .el-selects {
    width: 70%;
    .el-input__inner {
      width: 100%;
    }
  }
  .text_too_long {
    position: absolute;
    width: 38%;
    line-height: 24px;
    margin-left: -38%;
  }
  .input-div .el-col:last-child {
    margin-bottom: 0;
  }
  .edit-info .el-input__inner {
    height: 24px;
    margin: 8px 0;
  }
  .pageArea {
    margin: 10px 0 0 20px;
  }
}
</style>