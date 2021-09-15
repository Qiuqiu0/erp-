<!--
 * @Author: your name
 * @Date: 2021-05-19 14:07:12
 * @LastEditTime: 2021-06-08 10:18:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit=
 * @FilePath: \zjhz_erp-source\src\components\exmineStatus.vue
-->
<!--费用类别信息弹窗-->
<template>
  <div id="examine_status" class="examine-status" v-if="isShow">
    <template v-if="dataItem.length > 0">
      <el-collapse v-model="activeName" @change="handleChange" accordion>
          <el-collapse-item
              v-for="(item, index) in dataItem"
              :key="index"
              :title="item.examineTitle"
              :name="item.flowId"
            >
              <ul class="examine-content" v-if="!errorTitle">
                <li
                  class="examine-content-item"
                  v-for="(item, index) in detailInfo"
                  v-bind:key="index"
                >
                  <div class="examine-item-left">
                    <div class="examine-item-left-info">
                      <p class="examine-item-text" style="color: #2970ff">
                        {{ item.userName }}
                      </p>
                    </div>
                  </div>
                  <div class="examine-item-right">
                    <p  class="examine-item-text">
                      {{
                        item.nodeName
                      }}
                      / <span :class="item.isremark == 0 ||  item.isremark == 1 ? 'exmine-red' : 'exmine-green'">{{ remark[item.isremark] }}</span>
                    </p>
                    <p class="examine-item-text" style="margin-top: 5px" v-if="item.LogData">
                      审批意见：
                      <span class="examine-remark" v-if="item.LogData.remarkHtml" v-html="item.LogData.remarkHtml"></span>
                      <span v-else>暂无</span>
                    </p>
                    <p
                      class="examine-item-text"
                      style="color: #cecece; margin-top: 10px"
                    >
                      接受时间：{{ item.receivedate }} {{ item.receivetime }}
                      <span :class="{'exmine-red': item.viewType == 0, 'exmine-green': item.viewType == -2, 'exmine-tangerine': item.viewType == -1}">[{{ viewInfo[item.viewType] }}]</span>
                    </p>
                    <p
                      class="examine-item-text"
                      style="color: #cecece; margin-top: 10px"
                    >
                      操作时间：{{ item.operatedate }} {{ item.operatetime }}
                    </p>
                  </div>
                </li>
              </ul>
              <p v-else>
                {{ errorTitle }}
              </p>
            </el-collapse-item>
          </el-collapse>
    </template>
    <template v-else>
     <div class="noData">
       暂无数据
     </div>
    </template>
  </div>
</template>
<script>
import {
  getOaFlowInfo,
  getRequestOperatorInfo,
} from "@/api/exmineStatus/exmineStatus";
export default {
  name: "exmineStatus",
  data() {
    return {
      remark: {
        0: "节点操作人未提交", // red
        1: "转发接收人未提交", // red
        2: "已提交",
        4: "已归档",
        8: "抄送人",
        9: "抄送人",
        11: "传阅",
      },
      viewInfo: {
        0: "未查看", // red
        "-1": "已查看有反馈", // cheng
        "-2": "已查看", // green
      },
      activeName: "",
      dataItem: [],
      detailInfo: [],
      errorTitle: ""
    };
  },
  props: {
    id: {
      type: String | Array,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    if(!this.id || this.id.length === 0){
      // this.$message({ message: "流程详情ID不存在", type: "warning" });
    }else {
      this.getDataItem();
    }
  },
  mounted() {},
  methods: {
    getDataItem() {
      // 获取列表信息
      getOaFlowInfo(Array.isArray(this.id) ? this.id : [this.id])
        .then((res) => {
          this.dataItem = res.data;
          this.dataItem.forEach((item) => {
            item.examineTitle = `${item.flowName || '未获取到流程标题'} (${item.flowId})`;
          });
          this.activeName = this.dataItem[0].flowId || null;
          this.getDetail();
        })
        .catch((err) => {});
    },
    getDetail() {
      let htmlStr = ``;
      let { dataItem, activeName } = this;
      let dataInfo = dataItem.filter(item => item.flowId = activeName)[0];
      // 获取详情数据
      getRequestOperatorInfo({
        requestId: dataInfo.flowId,
        userId: dataInfo.createdBy,
      })
        .then((res) => {
          this.errorTitle = "";
          let dataInfo = res.data;
          if (dataInfo.code == "NO_PERMISSION") {
            this.errorTitle = "暂无权限";
          } else if (dataInfo.code == "SUCCESS") {
            this.detailInfo = dataInfo.data;
          } else {
            this.errorTitle = "您的请求存在异常！";
          }
        })
        .catch((err) => {
          // console.log(err, "888888888888");
        });
    },
    handleChange(e) {
      if(this.activeName !== e) {
        this.getDetail();
      }
    },
  },
  computed: {},
  watch:{
    id(newVal){
      this.id = newVal
      this.getDataItem();
    }
  }
};
</script>
<style lang="scss" scoped>
.exmine-red {
  color: red;
}
.exmine-green {
  color: green;
}
.exmine-tangerine {
  color: rgba(255, 136, 0, 0.932);
}
.examine-content {
  height: calc(100vh - 220px);
  overflow: scroll;

  .examine-content-item {
    border-bottom: 1px dashed #cecece;
    padding: 15px;
    display: flex;
  }
  .examine-content-item:last-child {
    border: none;
  }
  .examine-item-left {
    display: flex;
    width: 200px;
    .examine-item-left-img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }
    .examine-item-left-info {
      color: #cecece;
      margin-left: 15px;
    }
  }
  .examine-item-text {
    line-height: 20px;
    color: #999;
  }
  .examine-remark {
    line-height: 20px !important;
    color: #999 !important;
  }
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.noData{
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
