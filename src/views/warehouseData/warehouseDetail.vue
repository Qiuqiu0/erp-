<template>
  <div class="warehouseDetail">
    <el-divider></el-divider>
    <div class="button-div">
      <el-button icon="el-icon-back" class="query-button"  @click="goBack">返回</el-button>
    </div>
    <el-divider></el-divider>
    <!-- 搜索 -->
    <div class="input-div">
      <el-col :span="5" class="el-col">
        <label><span class="must-full">*</span>仓库代码</label>
        <el-input v-model="warehouseCode" class="el-inputs" :disabled="true"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
          <label><span class="must-full">*</span>仓库名称</label><el-input v-model="warehouseName" class="el-inputs" :disabled="true"></el-input>
      </el-col>
      <el-col :span="5" class="el-colc">
        <label><span class="must-full">*</span>仓库类型</label>
        <el-select v-model="warehouseType" :disabled="true">
          <el-option
            v-for="item in typeList"
            :key="item.dict_code"
            :label="item.dict_value"
            :value="item.dict_code">
          </el-option>
        </el-select>
        <!-- <el-input v-model="warehouseType" class="el-inputs" :disabled="true"></el-input> -->
      </el-col>
      <el-col :span="5" class="el-colc">
        <label><span class="must-full">*</span>仓库性质</label>
        <el-select v-model="warehouseAttr" :disabled="true">
          <el-option
            v-for="item in attrList"
            :key="item.dict_code"
            :label="item.dict_value"
            :value="item.dict_code">
          </el-option>
        </el-select>
        <!-- <el-input v-model="warehouseType" class="el-inputs" :disabled="true"></el-input> -->
      </el-col>
    </div>
    <!-- 表格 -->
    <!-- <div class="table_title"><span class="must-full">*</span>基础信息</div> -->
    <div class="input-div">
      <el-col :span="5" class="el-col">
        <label>面积:</label>
        <el-input v-model="area" :disabled="true" class="el-inputs"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>所属海关</label>
        <el-input v-model="customs" :disabled="true" class="el-inputs"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>海关备案号</label>
        <el-input v-model="customsRecordNumber" :disabled="true" class="el-inputs"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>国家</label>
        <el-input v-model="countryName" class="el-inputs" :disabled="true"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>省份</label>
        <el-input v-model="provinceName" class="el-inputs" :disabled="true"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>城市</label>
        <el-input v-model="cityName" class="el-inputs" :disabled="true"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>区县</label>
        <el-input v-model="countyName" class="el-inputs" :disabled="true"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>地址</label>
        <el-input v-model="address" class="el-inputs" :disabled="true"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>详细地址</label>
        <el-input v-model="detailedAddress" class="el-inputs" :disabled="true"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>英文地址</label>
        <el-input v-model="englishAddress" class="el-inputs" :disabled="true"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>存储上限</label>
        <el-input v-model="limitVol" placeholder="" class="el-inputs" disabled></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>存储单位</label>
        <el-select v-model="storageUnit" placeholder="" disabled>
          <el-option
            v-for="item in unitList"
            :key="item.unitCode"
            :label="item.unitName"
            :value="item.unitCode"
          ></el-option>
        </el-select>
      </el-col>
    </div>
    <!-- 通讯表格 -->
    <el-divider></el-divider>
    <div class="flex_center">
      <!-- <div class="table_title">通讯</div> -->
    </div>
    <div class="lastno">
      <el-table border center :data="tableData" class="el-table">
        <el-table-column prop="paritiesDate" label="联系人类型" width="150px">
          <template slot-scope="scope">
            <div>
              <el-select v-model="scope.row.linkType" :disabled="true">
                <el-option
                  v-for="item in linkList"
                  :key="item.dict_value"
                  :label="item.dict_value"
                  :value="item.dict_value">
                </el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="paritiesDate" label="联系人" width="150px">
          <template slot-scope="scope">
            <div>
              {{ scope.row.linkMan }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="国定电话">
          <template slot-scope="scope">
            <div>
              {{ scope.row.fixedTelephone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="手机">
          <template slot-scope="scope">
            <div>
              {{ scope.row.mobilePhone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="parities" label="传真">
          <template slot-scope="scope">
            <div>
              {{ scope.row.fax }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="E-mail">
          <template slot-scope="scope">
            <div>
              {{ scope.row.email }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import WareApi from "@/api/wareRate/wareRate";
export default {
  name: "warehouseDetail",
  data() {
    return {
      inputData: "", //输入框
      tableData: [], //通讯表格
      selectioned: null, //表格选中项
      basics: [{}], //基础信息
      index: null, //选中index
      tableAssign: "", //表格深拷贝数据
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      warehouseCode: "", //仓库代码
      warehouseName: "", //仓库名称
      warehouseType: "", //仓库类型
      warehouseAttr: "", //仓航性质
      typeList: [], //仓库类型
      attrList: [], //仓库性质
      linkList: [], //联系人类型
      countryList: [], //国家
      provinceList: [], //省
      cityList: [], //城市
      areaList: [], //区
      countryName: "",
      countryId: "",
      provinceName: "",
      provinceId: "",
      cityName: "",
      cityId: "",
      countyName: "", //
      countyId: "",
      area: "", //面积
      customs: "", //所属海关
      customsRecordNumber: "", //海关备案号
      address: "", // 地址
      detailedAddress: "", //详细地址
      englishAddress: "", // 英文地址
      limitVol: ``, //存储上限
      storageUnit: ``, //存储单位
      unitList: [], //单位列表
      warehouseLinkList: [], //联系人
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      }
    };
  },
  created() {
    this.getUnit();
    this.linkWare();
    this.selectWare();
    this.detailWare();
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
    goBack() {
      this.$router.push("/index/warehouseData/index");
    },
    //联系人类型
    linkWare() {
      let params = {
        dictNo: 1003
      };
      WareApi.selectWare(params)
        .then(res => {
          this.linkList = res.data;
        })
        .catch();
      this.$forceUpdate();
    },
    //仓库类型
    selectWare() {
      let params = {
        dictNo: 1001
      };
      WareApi.selectWare(params)
        .then(res => {
          this.typeList = res.data;
        })
        .catch();
      WareApi.selectWare({ dictNo: 1012 })
        .then(res => {
          this.attrList = res.data;
        })
        .catch();
    },
    //单位
    getUnit() {
      let data = {
        isInactiveList: 0
      };
      WareApi.getUnit(data)
        .then(res => {
          this.unitList = res.data;
        })
        .catch();
    },
    //获取详情
    detailWare() {
      let params = {
        warehouseId: this.$route.query.id
      };
      WareApi.detailWare(params)
        .then(res => {
          let resData = res.data;
          this.tableData = resData.warehouseLinkList;
          for (let obj of this.tableData) {
            for (const item of this.linkList) {
              if (obj.linkType == item.dict_code) {
                obj.linkType = item.dict_value;
              }
            }
          }
          this.warehouseCode = resData.warehouseCode;
          this.warehouseName = resData.warehouseName;
          this.warehouseType = resData.warehouseType.toString();
          this.warehouseAttr = resData.warehouseAttr.toString();
          this.limitVol = resData.limitVol;
          this.storageUnit = `${resData.storageUnit}`;
          this.area = resData.area;
          this.customs = resData.customs;
          this.customsRecordNumber = resData.customsRecordNumber;
          this.address = resData.address;
          this.detailedAddress = resData.detailedAddress;
          this.englishAddress = resData.englishAddress;
          this.countryName = resData.countryName;
          this.provinceName = resData.provinceName;
          this.cityName = resData.cityName;
          this.countyName = resData.countyName;
          this.countryId = resData.countryId;
          this.provinceId = resData.provinceId;
          this.cityId = resData.cityId;
          this.countyId = resData.countyId;
          this.warehouseId = resData.warehouseId;
          this.version = resData.version;
          this.$forceUpdate();
        })
        .catch();
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
.warehouseDetail {
  margin-left: 19px;
  width: 97%;
  .el_flex {
    display: flex;
    align-items: center;
  }
  .el-date-editor.el-input {
    width: auto;
  }
  .table_title {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 17px;
  }
  .flex_center {
    display: flex;
    margin-bottom: 17px;
    .table_title {
      margin-bottom: 0;
      margin-right: 10px;
    }
    .button-div {
      margin: 0;
    }
  }
  .lastno {
    .el-input__inner {
      text-align: center;
      padding-left: 20px;
    }
  }
}
</style>
