<template>
    <el-container class="index-page">
      <div class="page-top">
        <div class="page-top-left">
          <img class="page-img" src="@/assets/home-page2.jpg">
        </div>
        <div class="page-top-right">
          <p>快速开始</p>
          <ul>
            <li v-for="item in commonList" :key="item.moduleId" @click="goPage(item.json)">
            {{item.moduleLabel}}
            </li>
          </ul>
        </div>
      </div>
      <div v-if="warningObjShow && $actionFlag(`F001`)" class="page-bottom" style="padding:0;">
           <div class="page-bottom-top" style="padding:0;border-bottom: 1px solid #faecd8;background: #fdf6ec;" @click="warningCollapse">
             <img style="margin-right:14px;margin-left: 20px;" src="../imgs/thing.png"/>
            <el-badge :value="warningDetailLength"  class="item" style="line-height: 34px;padding-left: 10px;"><span style="color: #e6a23c;">风险预警（{{date}}）</span></el-badge>
            <i class="collapse" :class="warningFlag?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" ></i>
          </div>
          <div :class="warningFlag?'bottom-cont':'bottom-active'"  v-loading="loading" >
             <div class="cont-div2" v-for='(value,key,index) in warningObj' :key="index">
              <el-divider content-position="left" v-for="(item, index2) in businessTypeList" v-if="item.dict_code == key" :key="index2">
               {{item.dict_value }}(数量：{{warningObj[key].length}})
              </el-divider>
             <span v-for="(ite,index3) in warningObj[key]" :key="index3" >
                   <el-tag v-if="key==11670020 || key==11670025"  type="warning" >
                    {{ite.businessTypeName}}:{{ite.docNo}},{{ite.message}}
                  </el-tag>
                  <el-tag v-else  type="warning" >
                    {{ite.businessTypeName}}:{{ite.docNo}}({{ite.extCode}}),{{ite.message}}
                  </el-tag>
              </span>
            </div>
          </div>
      </div>
      <div v-if="dangerObjShow && $actionFlag(`F001`)" class="page-bottom" style="padding:0;margin-top: 10px;">
          <div class="page-bottom-top danger-div" style="padding:0;background: #fef0f0;border-bottom: 1px solid #fde2e2;" @click="dangerCollapse">
            <img style="margin-right:14px;margin-left:20px;" src="../imgs/thing.png"/>
            <el-badge :value="dangerDetailLength"  class="item" style="line-height: 34px;padding-left: 10px;"><span style="color: #f56c6c;">风险警告（{{date}}）</span></el-badge>
            <i class="collapse" :class="dangerFlag?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" ></i>
          </div>
          <div :class="dangerFlag?'bottom-cont':'bottom-active'"  v-loading="loading" >
            <div class="cont-div2" v-for='(value,key,index) in dangerObj' :key="index">
              <el-divider content-position="left" v-for="(item, index2) in businessTypeList" v-if="item.dict_code == key" :key="index2">
               {{item.dict_value}}(数量：{{dangerObj[key].length}})
              </el-divider>
              <span v-for="(ite,index3) in dangerObj[key]" :key="index3" >
                   <el-tag v-if="key==11670020 || key==11670025"  type="danger" >
                    {{ite.businessTypeName}}:{{ite.docNo}},{{ite.message}}
                  </el-tag>
                  <el-tag v-else  type="danger" >
                    {{ite.businessTypeName}}:{{ite.docNo}}({{ite.extCode}}),{{ite.message}}
                  </el-tag>
              </span>
             
            </div>
          </div>
      </div>
      
      <div class="page-bottom">
          <div class="page-bottom-top" @click="collapse">
            <img style="margin-right:14px" src="../imgs/thing.png"/>
            <span>业务待处理事项</span>
            <i class="collapse" :class="approvalFlag?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" ></i>
          </div>
          <div v-if="detailBusinessList.length == 0&&approvalFlag"  style="width:100%;height:50%">
              <img src="../imgs/background.jpg">
          </div>
          <div :class="approvalFlag && detailBusinessList.length != 0?'bottom-cont':'bottom-active'"  v-loading="loading" >
            <div class="cont-div" v-for='(item,index) in detailBusinessList' :key="index">
              <div class="cont-title" @mouseleave="closeDialog(item)">
                <p class="title-p">{{index*1+1}}</p>
                <h2 style="font-size:13px">{{item.descName+item.moduleName}}</h2>
               <!--<i class="el-icon-remove close-icon" @click="deleteBusinessList(item)" style="float:right;font-size:26px;margin:0 0 17px 57px;color:red;"></i>-->
               <i class="el-icon-d-arrow-right close-icon" @mouseover="openDialog(item)" style="transform:rotate(90deg);float:right;font-size:20px;margin:0 0 17px 50px;"></i>
               <div class="deleteBox" v-show="item.deletFlag">
                <span @click="deleteBusinessList(item)">移除</span>
               </div>
              </div>
              <div class="cont-info" @click="goRouter(item)">
                <p class="cont-info-p">{{item.total}}<span>份</span></p>
                <ul class="cont-info-ul">
                  <li v-for="(j,i) in item.list" :key="i">
                    <label class="cont-label">{{i*1+1+'.'+j.businessCode}}</label>
                    <label>{{j.statusName}}</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </div>

      <div class="page-finance">
          <div class="page-bottom-top" @click="financeCollapse">
            <!--<img style="margin-right:14px" src="../imgs/thing.png"/> -->
            <i class="el-icon-coin"
              style="margin-right:14px;
              font-size:20px;
              display:inline-block;
              width: 38px;
              height: 38px;
              background: rgb(244, 248, 249);
              border-radius: 20px;
              text-align: center;
              line-height: 38px;"
            >
            </i>
            <span>财务待处理事项</span>
            <i class="collapse" :class="financeFLag?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" ></i>
          </div>
          <div v-if="detailFinanceList.length == 0&&financeFLag"  style="width:100%;height:50%">
            <img src="../imgs/background.jpg">
          </div>
          <div :class="financeFLag&&detailFinanceList.length!=0?'bottom-cont':'bottom-active'" v-loading="loading">
            <div class="cont-div cont-red" v-for='(item,index) in detailFinanceList' :key="index">
              <div class="cont-title" @mouseleave="closeDialog(item)">
                <p class="title-p">{{index*1+1}}</p>
                <h2 style="font-size:13px">{{item.descName+item.moduleName}}</h2>
               <!-- <i class="el-icon-remove close-icon" @click="deleteBusinessList(item)" style="float:right;font-size:26px;margin:0 0 17px 57px;color:red;"></i>-->
                <i class="el-icon-d-arrow-right close-icon" @mouseover="openDialog(item)" style="transform:rotate(90deg);float:right;font-size:20px;margin:0 0 17px 50px;"></i>
                <div class="deleteBox" v-show="item.deletFlag">
                <span @click="deleteBusinessList(item)">移除</span>
               </div>
              </div>
              <div class="cont-info" @click="goRouter(item)">
                <p class="cont-info-p">{{item.total}}<span>份</span></p>
                <ul class="cont-info-ul">
                  <li v-for="(j,i) in item.list" :key="i">
                    <label class="cont-label">{{i*1+1+'.'+j.businessCode}}</label>
                    <label>{{j.statusName}}</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </div>

      <div class="page-total">
        <div class="page-bottom-top" @click="totalCollapse">
            <i class="el-icon-setting"
              style="margin-right:14px;
              font-size:20px;
              display:inline-block;
              width: 38px;
              height: 38px;
              background: rgb(244, 248, 249);
              border-radius: 20px;
              text-align: center;
              line-height: 38px;"
            >
            </i>
            <span>自定义事项</span>
            <i class="collapse" :class="totalFLag?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" ></i>
        </div>
        <div :class="totalFLag?'bottom-cont':'bottom-active'">
          <div class="left" style="width:50%">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span style="font-size:14px">业务待处理事项</span>
                </div>
                <div v-if="allBusinessList.length == 0" style="width:100%;height:70%">
                  <img src="../imgs/background.jpg">
                </div>
                <div class="total-card">
                    <div class="total-card-item" v-for="(item,index) in allBusinessList" :key="index" style="margin:5px;">
                        <p class="title-p">{{index*1+1}}</p>
                        <h2 style="font-size:13px">{{item.moduleName}}</h2>
                        <i class="el-icon-plus" @click="addMoudel(item)" style="cursor:pointer;font-size:24px;color:#ccc;margin:0 5px 0 45px;"></i>
                    </div>
                </div>
              </el-card>
          </div>
          <div class="right" style="width:50%">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>财务待处理事项</span>
                </div>
                <div v-if="allFinanceList.length == 0" style="width:100%;height:70%">
                  <img src="../imgs/background.jpg">
                </div>
                <div class="total-card">
                    <div class="total-card-item"  v-for="(item,index) in allFinanceList" :key="index" style="margin:5px;">
                        <p class="title-p">{{index*1+1}}</p>
                        <h2 style="font-size:13px">{{item.moduleName}}</h2>
                        <i
                        class="el-icon-plus"
                        @click="addMoudel(item)"
                        style="font-size:24px;color:#ccc;margin:0 5px 0 45px;cursor: pointer;"
                        >
                        </i>
                    </div>
                </div>
              </el-card>
          </div>
        </div>
      </div>

    </el-container>
</template>
<script>
import {
  getCommonList,
  getAuditedList,
  getAllMatter,
  addMoudel,
  deleteMoudel,
  getOdWarningList,
  getDicList
} from "@/api/home/systemIndex";
import { mapState } from "vuex";
import { serviceJson } from "@/axios/index";
let suffix = window.ROOT_PATH.suffix2;

export default {
  name: "system",
  data() {
    return {
      detailBusinessList: [], //业务待处理事务
      detailFinanceList: [], //财务待处理事务
      commonList: [], //快速开始列表
      approvalFlag: true,
      dangerFlag:false,
      warningFlag:false,
      financeFLag: true,
      totalFLag: true,
      allBusinessList: [], //所有业务审批事项列表
      allFinanceList: [], //所有财务审批事项列表
      loading: false,
      businessTypeList:[],
      warningObj:{},//黄色预警信息
      warningObjShow:false,
      warningDetailLength:0,
      dangerObj:{},//红色预警信息
      dangerDetailLength:0,
      dangerObjShow:false,
      date:'',

    };
  },
  created() {
    if(this.$actionFlag(`F001`)){
        this.getBusinessType();  
    }
    this.getCommonList();
    this.getAuditedList();
    this.getAllMatter();
  },
  watch: {
    dangerObjShow(val, oldVal){

    },
    warningObjShow:{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
          console.log(oldVal);
      },
      deep:true //true 深度监听
    }
    
  },
  mounted() {
    // let contentView = document.getElementsByClassName("content-view")[0];
    // contentView.style.height = "calc(100vh - 70px)"
  },
  methods: {
    //查询预警类型字典
    getBusinessType(){
      getDicList({dictNo: 1167}).then(res=>{
        this.businessTypeList=res.data;
        this.earlyWarningInfo();
      })
    },
    //获取预警信息
    earlyWarningInfo(){
      this.date=this.$nowDate();//'2021-08-11';//
      getOdWarningList({date:this.date}).then(res=>{
          if(res.code=="success"){
            let list=res.data;
            let newList=[];//类型数组
            list.forEach(e=>{
              let obj=new Object();
              obj.businessType=e.businessType;
              obj.warningType=e.warningType;
              obj.detail=JSON.parse(e.detail);
              let valueList=this.businessTypeList.filter((it)=>{
                return e.businessType==it.dict_key;
              });
              obj.businessTypeName=valueList[0].dict_value;
              obj.detail.forEach(item=>{
                item.businessType=e.businessType;
                item.businessTypeName=obj.businessTypeName;
              })
              newList.push(obj);
            });
            newList.map(ele=>{
              const {detail,warningType,businessType} = ele;
              let keyObj={1:"warningObj",2:"dangerObj"};
              if(!this[keyObj[warningType]][businessType]){
                this[keyObj[warningType]][businessType]=detail;
              }else{
                this[keyObj[warningType]][businessType]=[...this[keyObj[warningType]][businessType],...detail];
              }
            });
            this.warningObjShow=Object.keys(this.dangerObj).length?true:false;
            this.dangerObjShow=Object.keys(this.dangerObj).length?true:false;
            for (const key in this.dangerObj) {
              this.dangerDetailLength=this.dangerDetailLength+this.dangerObj[key].length;    
            }
            for (const key2 in this.warningObj) {
              this.warningDetailLength=this.warningDetailLength+this.warningObj[key2].length;      
            }
          }
      })
    },
    openDialog(item){
      item.deletFlag = true;
    },
    closeDialog(item){
      item.deletFlag = false;
    },
    //点击每个模块跳转页面
    goRouter(item) {
      let obj = {
        url: item.pageUrl,
        baseUrl: item.pageUrl,
        label: item.moduleName,
        moduleCode: "",
        params: {},
        query: {},
      };
      this.$store.commit("tabsListAdd", obj);
      this.$router.push({
        name: item.pageUrl,
        params: { status: item.displayStatus },
      });
    },
    //移除业务或者财务可看单据
    deleteBusinessList(item) {
      let moduleBaseId = item.id;
      deleteMoudel({ moduleBaseId }).then((res) => {
        if (res.code == "success") {
          this.getAuditedList();
          if (item.displayType == "1") {
            this.allBusinessList.push(item);
          } else if (item.displayType == "2") {
            this.allFinanceList.push(item);
          }
        }
      });
    },
    //从总量添加业务或者财务
    addMoudel(item) {
      addMoudel({ moduleBaseId: item.id })
        .then((res) => {
          if (res.code == "success") {
            this.getAuditedList();
            this.$forceUpdate();
            if (item.displayType == "1") {
              this.allBusinessList.splice(
                this.allBusinessList.indexOf(item),
                1
              );
            } else if (item.displayType == "2") {
              this.allFinanceList.splice(this.allFinanceList.indexOf(item), 1);
            }
          }
        })
        .catch((e) => {
          if (e) {
            console.log(e);
          }
        });
    },
    //获取所有自定义待审核列表
    getAllMatter() {
      getAllMatter()
        .then((res) => {
          if (res.code == "success") {
            res.data.forEach((item) => {
              if (item.displayType == "1") {
                this.allBusinessList.push(item);
                this.$forceUpdate();
              } else if (item.displayType == "2") {
                this.allFinanceList.push(item);
                this.$forceUpdate();
              }
            });
          }
        })
        .catch((e) => {
          if (e) {
            console.log(e);
          }
        });
    },
    //获取业务每个模块的数据
    getModelList(list) {
      this.loading = true;
      Promise.all(
        list.map((item) => {
          return new Promise((resolve, reject) => {
            const { dataUrl = "", pageUrl = "", moduleName = "",displayType = ""} = item;
            serviceJson({
              url: `${suffix}${dataUrl}${pageUrl}&displayType=${displayType}`,
              methods: "get",
            })
              .then((res) => {
                resolve(res);
              })
              .catch((err) => {
                reject({ ...err, moduleName });
              });
          });
        })
      )
        .then((data) => {
          if (data.length > 0) {
            list.forEach((item, index) => {
              const { total, data: list } = data[index];
              Object.assign(item, { list, total });
            });
            this.$forceUpdate();
          }
          this.loading = false;
        })
        .catch(({ moduleName, index }) => {
          console.log(`${moduleName}${index}接口出错`);
        });
    },
    //获取用户待审核列表
    getAuditedList() {
      getAuditedList("1")
        .then((res) => {
          if (res.code == "success") {
            this.detailBusinessList = res.data.map((item)=>{
                return {deletFlag:false,...item}
            });
            this.getModelList(this.detailBusinessList);
          }
        })
        .catch((e) => {
          if (e) {
            console.log(e);
          }
        });
      getAuditedList("2")
        .then((res) => {
          if (res.code == "success") {
            this.detailFinanceList = res.data.map((item)=>{
              return {deletFlag:false,...item}
            })
            this.getModelList(this.detailFinanceList);
          }
        })
        .catch((e) => {
          if (e) {
            console.log(e);
          }
        });
    },
    //获取用户前10用户常用菜单
    getCommonList() {
      getCommonList()
        .then((res) => {
          if (res.code == "success") {
            this.commonList = res.data;
          }
        })
        .catch((e) => {
          if (e) {
            console.log("获取数据失败");
          }
        });
    },
    collapse() {
      this.approvalFlag = !this.approvalFlag;
    },
    dangerCollapse() {
      this.dangerFlag = !this.dangerFlag;
    },
    warningCollapse() {
      this.warningFlag= !this.warningFlag;
    },
    financeCollapse() {
      this.financeFLag = !this.financeFLag;
    },
    totalCollapse() {
      this.totalFLag = !this.totalFLag;
    },
    //goPage
    goPage(item) {
      let items = JSON.parse(item);
      sessionStorage.setItem("moduleCode", items.moduleCode);
      sessionStorage.setItem("mapAuthSql", items.mapAuthSql.mysql);
      let obj = {
        url: items.fileUrl,
        baseUrl: items.fileUrl,
        label: items.moduleLabel,
        moduleCode: items.moduleCode,
        params: {},
        query: {},
      };
      this.$store.commit("tabsListAdd", obj);
      this.$router.push({ name: items.fileUrl });
    },
  },
};
</script>
<style lang="scss" scoped>
.index-page {
  width: 100%;
  border: none;
  text-align: center;
  padding: 20px;
  flex-wrap: wrap;
  .page-top {
    display: flex;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    height: 333px;
    margin-top: 10px;
    .page-top-left {
      background-color: #82a3fc;
      width: 68%;
      overflow: hidden;
      border-radius: 30px;
      .page-img {
        height: 100%;
        width: 100%;
        display: block;
        margin: 0 auto;
      }
    }
    .page-top-right {
      width: 30%;
      padding: 20px;
      text-align: left;
      margin-left: 20px;
      p {
        font-size: 22px;
        color: #343434;
      }
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        height: 250px;
        overflow-y: scroll;
        align-content: flex-start;
        li {
          font-size: 11px;
          border: 1px #ccc solid;
          padding: 12px 18px;
          margin: 9px 6px;
          border-radius: 5px;
          margin-top: 0;
          cursor: pointer;
        }
        li:hover {
          border: 1px #ccc solid;
          background: #84b7fa;
          color: #fff;
        }
        li::after {
          content: ">";
          padding-left: 30px;
        }
      }
    }
  }
  .page-bottom {
    width: 96%;
    padding: 10px;
    border: 1px solid #dee2e5;
    border-radius: 4px;
    background-color: #fff;
    margin-top: 39px;
    .page-bottom-top {
      margin: 0 auto;
      text-align: left;
      padding: 0 0 14px 10px;
      border-bottom: 1px solid #ebedef;
      font-size: 14px;
      cursor: pointer;
      .collapse {
        float: right;
        margin-top: 10px;
        margin-right: 20px;
        transform: rotate(90deg);
        cursor: pointer;
        font-size: 20px;
      }
    }
    .bottom-cont {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      margin-bottom: 16px;
      .cont-div:hover {
        box-shadow: 0 2px 12px 0;
      }
      .cont-div {
        cursor: pointer;
        width: 253px;
        height: 284px;
        background: #f0f5f7;
        border-bottom-left-radius: 20px;
        border-top-right-radius: 20px;
        margin: 16px 20px;
        .cont-title {
          height: 54px;
          background: #84b7fa;
          display: flex;
          padding-left: 17px;
          align-items: center;
          color: #fff;
          border-top-right-radius: 20px;
          position: relative;
          .close-icon {
            position: absolute;
            top: 16px;
            right: 18px;
          }
          .deleteBox{
            border: 1px solid #ccc;
            background: #fff;
            padding: 3px;
            color: #84b7fa;
            position: absolute;
            top: 35px;
            right: 2px;
            span{
               padding: 10px;
            }
          }
          .title-p {
            width: 30px;
            height: 30px;
            background: #fff;
            line-height: 30px;
            border-radius: 10px;
            border-top-left-radius: 0;
            margin-right: 18px;
            font-size: 13px;
            color: #84b7fa;
          }
        }
        .cont-info {
          .cont-info-p {
            padding: 20px;
            font-size: 38px;
            padding-bottom: 30px;
            color: #84b7fa;
            span {
              font-size: 13px;
              color: #333;
              padding-left: 10px;
            }
          }
          .cont-info-ul {
            text-align: left;
            padding-left: 28px;
            padding-right: 9px;
            font-size: 13px;
            li {
              margin-bottom: 10px;
              .cont-label {
                padding-right: 40px;
              }
            }
          }
        }
      }
      .cont-red {
        .cont-title {
          background: #ef5728;
        }
        .cont-info {
          .cont-info-p {
            color: #ef5728;
          }
        }
      }
    }
    /* 如果需要可以加动画 */
    .bottom-active {
      display: none;
    }
  }
  .page-finance {
    width: 96%;
    padding: 10px;
    border: 1px solid #dee2e5;
    border-radius: 4px;
    background-color: #fff;
    margin-top: 39px;
    .page-bottom-top {
      margin: 0 auto;
      text-align: left;
      padding: 0 0 14px 10px;
      border-bottom: 1px solid #ebedef;
      font-size: 14px;
      cursor: pointer;
      .collapse {
        float: right;
        margin-top: 10px;
        margin-right: 20px;
        transform: rotate(90deg);
        cursor: pointer;
        font-size: 20px;
      }
    }
    .bottom-cont {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      margin-bottom: 16px;
      .cont-div:hover {
        box-shadow: 0 2px 12px 0;
      }
      .cont-div {
        cursor: pointer;
        width: 253px;
        height: 284px;
        background: #f0f5f7;
        border-bottom-left-radius: 20px;
        border-top-right-radius: 20px;
        margin: 16px 20px;
        .cont-title {
          height: 54px;
          background: #84b7fa;
          display: flex;
          padding-left: 17px;
          align-items: center;
          color: #fff;
          border-top-right-radius: 20px;
          position: relative;
          .close-icon {
            position: absolute;
            top: 16px;
            right: 18px;
          }
          .deleteBox{
            border: 1px solid #ccc;
            background: #fff;
            padding: 3px;
            color: #84b7fa;
            position: absolute;
            top: 35px;
            right: 2px;
            span{
               padding: 10px;
            }
          }
          .title-p {
            width: 30px;
            height: 30px;
            background: #fff;
            line-height: 30px;
            border-radius: 10px;
            border-top-left-radius: 0;
            margin-right: 18px;
            font-size: 13px;
            color: #84b7fa;
          }
        }
        .cont-info {
          .cont-info-p {
            padding: 20px;
            font-size: 38px;
            padding-bottom: 30px;
            color: #84b7fa;
            span {
              font-size: 13px;
              color: #333;
              padding-left: 10px;
            }
          }
          .cont-info-ul {
            text-align: left;
            padding-left: 28px;
            padding-right: 9px;
            font-size: 13px;
            li {
              margin-bottom: 10px;
              .cont-label {
                padding-right: 40px;
              }
            }
          }
        }
      }
      .cont-red {
        .cont-title {
          background: #ef5728;
        }
        .cont-info {
          .cont-info-p {
            color: #ef5728;
          }
        }
      }
    }
    /* 如果需要可以加动画 */
    .bottom-active {
      display: none;
    }
  }
  .page-total {
    width: 96%;
    padding: 10px;
    border: 1px solid #dee2e5;
    border-radius: 4px;
    background-color: #fff;
    margin-top: 39px;
    .page-bottom-top {
      margin: 0 auto;
      text-align: left;
      padding: 0 0 14px 10px;
      border-bottom: 1px solid #ebedef;
      font-size: 14px;
      cursor: pointer;
      .collapse {
        float: right;
        margin-top: 10px;
        margin-right: 20px;
        transform: rotate(90deg);
        cursor: pointer;
        font-size: 20px;
      }
    }
    .bottom-cont {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      margin-bottom: 16px;
      .cont-div:hover {
        box-shadow: 0 2px 12px 0;
      }
      .cont-div {
        cursor: pointer;
        width: 253px;
        height: 284px;
        background: #f0f5f7;
        border-bottom-left-radius: 20px;
        border-top-right-radius: 20px;
        margin: 16px 20px;
        overflow: hidden;
        .cont-title {
          height: 54px;
          background: #84b7fa;
          display: flex;
          padding-left: 17px;
          align-items: center;
          color: #fff;
          .title-p {
            width: 30px;
            height: 30px;
            background: #fff;
            line-height: 30px;
            border-radius: 10px;
            border-top-left-radius: 0;
            margin-right: 18px;
            font-size: 13px;
            color: #84b7fa;
          }
        }
        .cont-info {
          .cont-info-p {
            padding: 20px;
            font-size: 38px;
            padding-bottom: 30px;
            color: #84b7fa;
            span {
              font-size: 13px;
              color: #333;
              padding-left: 10px;
            }
          }
          .cont-info-ul {
            text-align: left;
            padding-left: 28px;
            padding-right: 9px;
            font-size: 13px;
            li {
              margin-bottom: 10px;
              .cont-label {
                padding-right: 66px;
              }
            }
          }
        }
      }
      .cont-red {
        .cont-title {
          background: #ef5728;
        }
        .cont-info {
          .cont-info-p {
            color: #ef5728;
          }
        }
      }
    }
    /* 如果需要可以加动画 */
    .bottom-active {
      display: none;
    }
    .total-card {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
      align-content: flex-start;
      .total-card-item {
        height: 48px;
        background: #f0f5f7;
        display: flex;
        padding-left: 17px;
        align-items: center;
        color: #aaa;
        .title-p {
          width: 30px;
          height: 30px;
          background: #fff;
          line-height: 30px;
          border-radius: 10px;
          border-top-left-radius: 0;
          margin-right: 18px;
          font-size: 13px;
          color: #aa9;
        }
      }
    }
  }
  .cont-div2{
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    text-align: left;
    padding: 0 20px;
    span{
      margin: 0 10px 10px 10px;
    }
  }
}
.index .el-divider--horizontal{
  margin: 24px 0;
}
.page-top-right ul {
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px #f4f6f9;
    background: #f4f6f9;
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px #f4f6f9;
    border-radius: 10px;
    background: #f4f6f9;
  }
}
</style>
<style lang="scss">
.index-page .danger-div .el-badge .el-badge__content.is-fixed{
    background-color: #f44336;

}
.index-page  .el-badge .el-badge__content.is-fixed{
    top: 10px;
    right: 0px;
    border-radius:10px;
    padding-left: 5px;
    padding-right: 5px;
    width: auto;
}
</style>
