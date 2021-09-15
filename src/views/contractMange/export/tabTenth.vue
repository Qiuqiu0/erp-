<template>
  <div class="tabTenth content-div2 contract_css_link">
    <!-- 收款方式 -->
    <div class="input-div input-div-bor bortop0">
      <!-- <div class="table_title">合同条款</div> -->
      <div class="flex_center">
        <div class="button-div">
          <el-button icon="el-icon-plus" class="query-button"  @click="addList">创建</el-button>
          <el-button icon="el-icon-minus" @click="setUp(selectioned, tableData)">删除</el-button>
        </div>
      </div>
      <div class="">
        <el-table border center :data="tableData" class="el-table" ref="multipleTable"
          @selection-change="handleChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <!-- <el-table-column prop="termRowno" width="55" label="序号">
          </el-table-column> -->
          <el-table-column label="序号" type="index" width="55" show-overflow-tooltip></el-table-column>
          <el-table-column show-overflow-tooltip prop="termContent" label="条款内容">
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.termContent"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
      <!-- 收款方式 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Bmange from "@/api/contractMange/bmange";
import "@/assets/css/contract.scss";

export default {
  name: "tabTenth",
  data() {
    return {
      activeName2: "first", //标签页
      tableData: [], //通讯表格
      selectioned: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      delHis: [], //删除数据
      linkList: [],
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      loading: true, //表格loading
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      show: true
    };
  },
  created() {
    //获取信息
    this.$route.query.id && this.getDetail();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    getDetail() {
      let params = {
        contractId: this.$route.query.id,
        pageSize: 999
      };
      Bmange.getTk(params)
        .then(res => {
          this.tableData = res.data;
        })
        .catch();
    },
    to() {
      let data = this.tableData;
      if (this.$route.query.id) {
        for (let item of this.tableData) {
          item.contractId = this.$route.query.id;
        }
      }
      if (this.$route.query.change) {
        data = [...this.tableData, ...this.delHis];
      }
      this.$emit("get", data, 7);
    },
    //数据操作  1修改 0删除 3启用4禁用
    setUp(e, list) {
      if (!e.length) {
        this.$openWarning("未选择数据");
        return false;
      }
      this.$confirm("确定删除吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let idSav = []; //修改数据
          let idNo = []; //新建数据
          let idItem = []; //修改数据
          for (const item of this.selectioned) {
            if (item.ptRowid) {
              idSav.push(item.ptRowid);
              idItem.push(item);
            } else {
              idNo.push(item);
            }
          }
          let params = {
            ptRowidList: idSav.join(","),
            soContractId: this.$store.state.contraDelData.xsCon.soContractId,
            version: this.$store.state.contraDelData.xsCon.version
          };
          if (!this.$route.query.change) {
            idSav.length &&
              Bmange.delTk(params)
                .then(res => {
                  this.$openSuccess(res.message);
                })
                .catch();
          } else {
            for (const item of idItem) {
              item.isInactive = 2;
            }
            this.delHis = [...this.delHis, ...idItem];
          }
          this.deleIndex(this.selectioned, this.tableData);
        })
        .catch();
    },
    //删除方法
    deleIndex(e, list) {
      for (const get of e) {
        let del = list.findIndex(item => {
          return item.one == get.one && item.ptRowid == get.ptRowid;
        });
        list.splice(del, 1);
      }
    },
    //运输信息表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    ///运输信息创建数据
    addList() {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        termRowno: (this.tableData.length + 1) * 10,
        termContent: ``
      };
      let newTbale = [];
      newTbale.unshift(data);
      this.tableData = newTbale.concat(this.tableData);
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
</style>
