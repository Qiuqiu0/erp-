<!--
 * @Author: your name
 * @Date: 2021-04-26 16:25:17
 * @LastEditTime: 2021-06-02 10:03:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zl-admin\src\components\text.vue
-->
<template>
  <div class="card">
    <ul>
      <li v-for="(item,index) in treeItem" :key="index">
        <div class="item" :class="{'line-left':index!==0,'line-right':index!=treeItem.length-1}">
          <div class="item-name" :class="{'line-bottom': item.children && item.children.length > 0 && item.isOpen,'line-top': !treeFirst}">
            <div class="tree-li-content" @click="goDetail(item)">
                <dl class="tree-dl dl-title">
                    <dd class="tree-dd">单据类型</dd>
                    <dt class="tree-dt">单据编号</dt>
                </dl>
                <dl class="tree-dl" :class="item.bizCode == bizCode ? 'active' : ''">
                    <dd class="tree-dd">{{item.bizTypeName}}</dd>
                    <dt class="tree-dt">{{item.bizCode}}</dt>
                </dl>
            </div>
            <div :class="{'tree-is-open': true, 'tree-no-open': item.isOpen}" v-if="item.children && item.children.length > 0">
                <img v-if="item.isOpen" @click="delchildren(item)" class="tree-open-img" src = "../../public/home.png" />
                <img v-else class="tree-open-img" @click="openChildren(item)" src = "../../public/home.png" />
            </div>
          </div>
        </div>
        <tree v-if="item.children && item.children.length > 0 && item.isOpen" :bizCode="bizCode" :treeList="item.children" />
      </li>
    </ul>
  </div>
</template>

<script>
import { goTreeDetail } from "@/api/tree.js";
export default {
  name: 'tree',
  props: {
     treeList: { // 数据
        type: Array | Object
      },
      treeFirst: { //判断是否第一个
          type: Boolean,
          default: false
      },
      bizCode:{
          type:String
      }
  },
  data() {
    return {
      treeItem: [],
      treeDetail:{}
    }
  },
  mounted(){
  },
  created() {
    this.treeItem = this.childrenChange(this.treeList);
  },
  methods: {
  async goDetail(item){
      const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
        let { ...res } =  await goTreeDetail({
            bizCode: item.bizCode,
            bizType: item.bizType,
          });
        if (res.code == "success") {
            this.treeDetail = res.data;
            loading.close();
          }else{
            loading.close();
          }
            loading.close();
        switch(item.bizTypeName){
          case '采购提单':
          localStorage.setItem("id", this.treeDetail.id);
          this.$router.push({
            path: `/index${this.treeDetail.path}`,
            query: { type: 5, id:this.treeDetail.id },
          });
        break;
          case '采购入库':
          localStorage.setItem("wvId", this.treeDetail.id);
          this.$router.push({
            path:
              `/index${this.treeDetail.path}`,
            query:{
              type:7
            }
          });
        break;
          case '采购退货':
          this.$router.push({
            path:
              `/index${this.treeDetail.path}`,
            query:{
              type: 1,
              unwvId: this.treeDetail.id
            }
          });
        break;
          case '采购发票':
          this.$router.push({
            name: this.treeDetail.router,
            params: {
              checkItem: this.treeDetail.data,
            },
          });
        break;
          case '销售出库单':
          localStorage.setItem("doNo", this.treeDetail.data.doNo);
          this.$router.push({ 
            path:  `/index${this.treeDetail.path}`,
            params: {
              doStatus: this.treeDetail.data.doStatus,
              type: 2,
              doNo:this.treeDetail.data.doNo
            },
          });
        break;
        case '销售退货单':
          localStorage.setItem("undoId", this.treeDetail.id);
          this.$router.push({ 
            path:  `/index${this.treeDetail.path}`,
            params: {
              type: 3,
            },
          });
        break;
        case '销售发票':
          localStorage.setItem("invoiceId", this.treeDetail.id);
          this.$router.push({ 
            path:  `/index${this.treeDetail.path}`,
            params: {
              type: 3,
              invoiceType:this.treeDetail.data.invoiceType
            },
          });
        break;
        case '结算单':
          this.$router.push({ 
            path:  `/index${this.treeDetail.path}`,
            params: {
              data: "look",
              msgid: this.treeDetail.data.settleId,
              version: this.treeDetail.data.version,
            },
          });
        break;
        case '其他入库':
          this.$router.push({ 
            path:  `/index${this.treeDetail.path}`,
            params: {
              data: "look",
              msgid: this.treeDetail.data.grnId,
              msgcode: this.treeDetail.data.grnCode,
              version: this.treeDetail.data.version,
            },
          });
        break;
        case '其他出库':
          this.$router.push({ 
            path:  `/index${this.treeDetail.path}`,
            params: {
              data: "look",
              msgid: this.treeDetail.data.odoId,
              msgcode: this.treeDetail.data.odoCode,
              version: this.treeDetail.data.version,
            },
          });
        break;
        case '库存调拨':
          this.$router.push({ 
            path:  `/index${this.treeDetail.path}`,
            params: {
              data: "look",
              msgid: this.treeDetail.data.itId,
              version: this.treeDetail.data.version,
            },
          });
        break;
        case '码单管理':
          this.$router.push({ 
            path:  `/index${this.treeDetail.path}`,
            params: {
              data: "look",
              msgid: this.treeDetail.data.dockerSoId,
              version: this.treeDetail.data.version,
            },
          });
        break;
        case '费用结算':
          this.$router.push({ 
            name:  this.treeDetail.router,
            query: {
              type: this.treeDetail.data.bizOccurrence,
              id: this.treeDetail.id,
            },
          });
        break;
        case '费用预提':
          this.$router.push({ 
            name:  this.treeDetail.router,
            query: {
              type: this.treeDetail.data.bizOccurrence,
              id: this.treeDetail.data.prefetchId,
            },
          });
        break;
        case '收款单':
          this.$router.push({ 
            name:  this.treeDetail.router,
            params: {
              id: this.treeDetail.id,
              editFlag: 0,
              type: 2
            },
          });
        break;
        case '收款单认领':
          this.$router.push({ 
            name:  this.treeDetail.router,
            params: {
              id: this.treeDetail.id,
            },
          });
        break;
        case '付款单':
          this.$router.push({ 
            name:  this.treeDetail.router,
            params: {
              id: this.treeDetail.data.paymentCode,
              editFlag: 0,
              paymentId: this.treeDetail.data.id,
              status: 1,
            },
          });
        break;
        case '付款申请单':
          this.$router.push({ 
            name:  this.treeDetail.router,
            params: {
              editFlag: 0,
              id: this.treeDetail.data.payApplyCode,
              paymentId: this.treeDetail.id,
            },
          });
        break;
        case '应付票据':
          this.$router.push({ 
            name:  this.treeDetail.router,
            params: {
              id: this.treeDetail.id, 
              editFlag: 0, 
              type: 2
            },
          });
        break;
        case '应收票据':
          this.$router.push({ 
            name:  this.treeDetail.router,
            params: {
              id: this.treeDetail.data.receivableId,
              instrumentBillNo: this.treeDetail.data.instrumentBillNo,
              editFlag: 0,
              type: 2
            },
          });
        break;
        case '收到信用证':
          this.$router.push({ 
            name:  this.treeDetail.router,
            params: {
              data: "look",
              look: true,
              lcStatus: this.treeDetail.data.lcStatus,
              lcReceiveId: this.treeDetail.data.lcReceiveId,
              version: this.treeDetail.data.version
            },
          });
        break;
        case '开出信用证':
          this.$router.push({ 
            name:  this.treeDetail.router,
            params: {
              type: "look",
              look: true,
              data: {},
              id: this.treeDetail.data.id,
              version: this.treeDetail.data.version
            },
          });
        break;
          default:
          this.$router.push({
            path:
              `/index${this.treeDetail.path}`,
            query:{
              id:this.treeDetail.id
            }
          });
        break;
        }
    },
    childrenChange(data) { // 递归为子节点添加isOpen属性
        let dataItem = [];
        if(!Array.isArray(data)) {
            dataItem.push(data);
        } else {
            dataItem = data;
        }
        dataItem.forEach(item => {
            item.isOpen = true;
            if(item.children && item.children.length > 0) {
                this.childrenChange(item.children)
            }
        })
        return dataItem;
    },
    changeOpen(treeItem, id, flag) {
        for(let i = 0; i < treeItem.length; i++) {
            if(treeItem[i].id === id) {
                treeItem[i].isOpen = flag;
                return treeItem;
            }
            if(treeItem[i].children && treeItem[i].children.length > 0) {
                this.childrenChange(treeItem[i].children, id)
            }
        }
    },
    // 展开子元素
    openChildren(item) { 
        let { id } = item;
        this.treeItem = this.changeOpen(this.treeItem, id, true)
        this.$forceUpdate()
    },
    // 收起子元素
    delchildren(item) {
        let { id } = item;
        this.treeItem = this.changeOpen(this.treeItem, id, false);
        this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
$line-length:20px; //线长
$spacing:20px; //间距
$extend:calc(#{$spacing} + 2px); //延长线
// 线样式
@mixin line{
    content: "";
    display: block;
    width: 2px;
    height: $line-length;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    background: rgb(165, 182, 189);
}
// 加减号icon
@mixin icon{
  position: absolute;
  border: solid 1px #666;
  border-radius: 100%;
  bottom:-5px;
  width: 12px;
  height: 12px;
  line-height: 10px;
  text-align: center;
  color:#666;
  z-index: 100;
  cursor: pointer;
  margin: 0;
  padding: 0;
  // opacity: 0;
}
.card{
    width: 100%;
    height: 100%;
    ul{
        display: -webkit-box;
        justify-content: center;
        li{
            .item{
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                &-name{
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 5px;
                    margin: $spacing;
                    .tree-li-content:hover{
                      cursor:pointer;
                      border: 1px solid #888888;
                      box-shadow:4px 4px 2px #888888;
                    }
                    .tree-li-content {
                        margin-left: 2px;
                        width: auto;
                        display: flex;
                        flex-wrap: wrap;
                        border: 1px solid;
                        .active{
                            color: red;
                        }
                        .tree-dl {
                            width: 100%;
                            display: flex;
                            justify-content: space-around;
                            text-align: center;
                            .tree-dd {
                                width: 50%;
                                line-height: 40px;
                                border-right: 2px solid rgb(165, 182, 189);
                             }
                            .tree-dt {
                                width: 50%;
                                line-height: 40px;
                            }
                        }
                        .dl-title{
                            background: rgb(92, 158, 255);
                        }
                        }
                        .tree-is-open {
                            position: absolute;
                            right: calc(50% - 10px);
                            right: -moz-calc(50% - 10px); 
                            right: -webkit-calc(50% - 10px); 
                            bottom: -13px;
                            z-index: 1;
                            .tree-open-img {
                                background: #fff;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                cursor:pointer;
                            }
                        }
                    .plus{
                      @include icon();
                      &:hover{
                        opacity: 100%;
                      }
                    }
                    .reduce{
                      @include icon();
                      top:-5px;
                      &:hover{
                        opacity: 100%;
                      }
                    }
                }
            }
        }
    }
    // 向下的线
    .line-bottom{
        &::after{
            @include line();
            bottom: -$line-length;
        }
    }
    // 向上的线
    .line-top{
        &::before{
            @include line();
            top: -$line-length;
        }
    }
    // 向左的线
    .line-left{
        &::after{
            @include line();
            width: calc(50% + #{$spacing});
            height: 3px;
            left: calc(-50% - #{$extend});
            top: 0;
        }
    }
    // 向右的线
    .line-right{
        &::before{
            @include line();
            width: calc(50% + #{$spacing});
            height: 3px;
            right: calc(-50% - #{$extend});
            top: 0;
        }
    }
}

</style>