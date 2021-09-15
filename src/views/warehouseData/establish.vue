<template>
  <div class="establish content-div2">
    <el-divider></el-divider>
    <div class="button-div">
      <el-button icon="el-icon-suitcase" class="query-button" @click="addSub"
        >保存</el-button
      >
      <el-button icon="el-icon-close" @click="goBack">取消</el-button>
    </div>
    <el-divider></el-divider>
    <!-- 搜索 -->
    <div class="input-div">
      <el-col :span="5" class="el-col  el-col-required">
        <label> <span class="must-full">*</span>仓库代码 </label>
        <el-input
          :disabled="warehouseId != ``"
          v-input-filter:code
          :class="errorKey.includes('warehouseCode') ? 'inputRed' : ''"
          v-model="warehouseCode"
          class="el-inputs"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col  el-col-required">
        <label> <span class="must-full">*</span>仓库名称 </label>
        <el-input
          v-model="warehouseName"
          class="el-inputs"
          :class="errorKey.includes('warehouseName') ? 'inputRed' : ''"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-colc  el-col-required">
        <label> <span class="must-full">*</span>仓库类型 </label>
        <el-select v-model="warehouseType" :class="errorKey.includes('warehouseType') ? 'inputRed' : ''" placeholder="请选择">
          <el-option
            v-for="item in typeList"
            :key="item.dict_code"
            :label="item.dict_value"
            :value="item.dict_code"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="el-col  el-col-required">
        <label> <span class="must-full">*</span>仓库性质 </label>
        <el-select  v-model="warehouseAttr" :class="errorKey.includes('warehouseAttr') ? 'inputRed' : ''" placeholder="请选择">
          <el-option
            filterable
            v-for="item in attrList"
            :key="item.dict_code"
            :label="item.dict_value"
            :value="item.dict_code"
          ></el-option>
        </el-select>
      </el-col>
    </div>
    <!-- 表格 -->
    <!-- <div class="table_title">基础信息</div> -->
    <div class="input-div">
      <el-col :span="5" class="el-col">
        <label>面积</label>
        <el-input
          v-model="area"
          placeholder="请输入内容"
          class="el-inputs"
          @input="oninput"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>所属海关</label>
        <el-input
          v-model="customs"
          placeholder="请输入内容"
          class="el-inputs"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>海关备案号</label>
        <el-input
          v-model="customsRecordNumber"
          placeholder="请输入内容"
          class="el-inputs"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>国家</label>
        <el-select
          filterable
          v-model="countryId"
          placeholder="请选择"
          @change="addressList(countryId, 1)"
        >
          <el-option
            v-for="item in countryList"
            :key="item.regionId"
            :label="item.regionName"
            :value="item.regionId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>省份</label>
        <el-select
          filterable
          v-model="provinceId"
          placeholder="请选择"
          @change="addressList(provinceId, 2)"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.regionId"
            :label="item.regionName"
            :value="item.regionId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>城市</label>
        <el-select
          filterable
          v-model="cityId"
          placeholder="请选择"
          @change="addressList(cityId, 3)"
        >
          <el-option
            v-for="item in cityList"
            :key="item.regionId"
            :label="item.regionName"
            :value="item.regionId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>区县</label>
        <el-select filterable v-model="countyId" placeholder="请选择" @change="county">
          <el-option
            v-for="item in areaList"
            :key="item.dict_code"
            :label="item.regionName"
            :value="item.regionId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>地址</label>
        <el-input
          v-model="address"
          placeholder="请输入内容"
          class="el-inputs"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>详细地址</label>
        <el-input
          v-model="detailedAddress"
          placeholder="请输入内容"
          class="el-inputs"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>英文地址</label>
        <el-input
          v-model="englishAddress"
          placeholder="请输入内容"
          class="el-inputs"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>存储上限</label>
        <el-input
          v-model="limitVol"
          placeholder="请输入内容"
          class="el-inputs"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>存储单位</label>
        <el-select v-model="storageUnit" placeholder="请选择">
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
    <div class>
      <!-- <div class="table_title">通讯</div> -->
      <div class="button-div">
        <el-button
          icon="el-icon-folder-add"
          class="query-button"
          @click="addList"
          >创建</el-button
        >
        <el-button icon="el-icon-delete" @click="setUp(0)">删除</el-button>
      </div>
    </div>
    <div class>
      <el-table
        border
        center
        :data="tableData"
        class="el-table"
        ref="multipleTable"
        @selection-change="handleChange"
        @row-dblclick="dblclick"
        @row-click="rowClick"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="paritiesDate" label="联系人类型" width="150px">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.linkType" placeholder="请选择">
                <el-option
                  v-for="item in linkList"
                  :key="item.dict_value"
                  :label="item.dict_value"
                  :value="item.dict_value"
                ></el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row.linkType }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="paritiesDate" label="联系人" width="150px">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.linkMan"
                placeholder="请输入内容"
                maxlength="8"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.linkMan }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="国定电话">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.fixedTelephone"
                placeholder="请输入内容"
                maxlength="12"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.fixedTelephone }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="手机">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.mobilePhone"
                placeholder="请输入内容"
                maxlength="15"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.mobilePhone }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="parities" label="传真">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.fax"
                placeholder="请输入内容"
                maxlength="20"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.fax }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="E-mail">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.email"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.email }}</div>
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
  name: "establish",
  data() {
    return {
      errorKey: [],
      inputData: "", //输入框
      tableData: [], //通讯表格
      selectioned: [], //表格选中项
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
      attrList: [], //仓库性质
      typeList: [], //仓库类型
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
      warehouseLinkList: [], //联系人
      limitVol: ``, //存储上限
      storageUnit: ``, //存储单位
      unitList: [], //单位列表
      warehouseId: "",
      version: "",
      loading: true, //表格loading
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
    //仓库类型
    this.selectWare();
    //国家列表
    this.addressList(0);
    //联系人类型
    this.linkWare();
    if (this.$route.query.id) {
      this.detailWare();
    }
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
    oninput(e) {
      this.area = e.match(/^\d*(\.?\d{0,2})/g)[0] || null;
    },
    //获取详情
    detailWare() {
      let params = {
        warehouseId: this.$route.query.id
      };
      WareApi.detailWare(params)
        .then(res => {
          this.loading = false;
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
          this.warehouseType = resData.warehouseType
            ? resData.warehouseType.toString()
            : "";
          this.warehouseAttr = resData.warehouseAttr
            ? resData.warehouseAttr.toString()
            : "";
          this.limitVol = resData.limitVol;
          this.storageUnit = resData.storageUnit && `${resData.storageUnit}`;
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
          this.getOldAdd(1, resData.countryId);
          this.getOldAdd(2, resData.provinceId);
          this.getOldAdd(3, resData.cityId);
          this.$forceUpdate();
        })
        .catch();
    },
    //获取地址列表 1省 2市 3区
    getOldAdd(e, id) {
      let params = {
        regionId: id
      };
      WareApi.areaList(params)
        .then(res => {
          switch (e) {
            case 1:
              this.provinceList = res.data;
              break;
            case 2:
              this.cityList = res.data;
              break;
            case 3:
              this.areaList = res.data;
              break;
            default:
              break;
          }
        })
        .catch();
    },
    //地址查询 type 1选择国家 2选择省 3选择城市
    addressList(e, type) {
      let params = {
        regionId: e
      };
      WareApi.areaList(params)
        .then(res => {
          switch (type) {
            case 1:
              this.provinceList = res.data;
              this.cityList = [];
              this.areaList = [];
              this.provinceName = "";
              this.cityName = "";
              this.countyName = "";
              this.provinceId = "";
              this.cityId = "";
              this.countyId = "";
              let obj = {};
              obj = this.countryList.find(item => {
                return item.regionId == e;
              });
              this.countryName = obj.regionName;
              break;
            case 2:
              this.cityList = res.data;
              this.areaList = [];
              this.cityName = "";
              this.countyName = "";
              this.cityId = "";
              this.countyId = "";
              let obj2 = {};
              obj2 = this.provinceList.find(item => {
                return item.regionId == e;
              });
              this.provinceName = obj2.regionName;
              break;
            case 3:
              this.areaList = res.data;
              this.countyName = "";
              this.countyId = "";
              let obj3 = {};
              obj3 = this.cityList.find(item => {
                return item.regionId == e;
              });
              this.cityName = obj3.regionName;
              break;
            default:
              this.countryList = res.data;
              this.provinceName = "";
              this.cityName = "";
              this.countyName = "";
              this.provinceId = "";
              this.cityId = "";
              this.countyId = "";
              break;
          }
        })
        .catch();
    },
    //选择区
    county(e) {
      let obj = {};
      obj = this.areaList.find(item => {
        return item.regionId == e;
      });
      this.countyName = obj.regionName;
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
      this.$forceUpdate();
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
    //获取表格
    pariList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        createdTime: this.createdTime, //起始日期
        updatedTime: this.updatedTime //截止日期
      };
      WareApi.pariList(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
          if (res.data.length !== 0) {
            this.pageSize = res.data[0].pageSize;
          }
        })
        .catch();
    },
    //数据操作  1修改 0删除 3启用4禁用
    setUp() {
      if (!this.selectioned.length) {
        this.$openWarning("未选择数据");
        return false;
      }
      this.$confirm("确定删除吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = this.selectioned;
          let par = JSON.parse(JSON.stringify(params));
          let old = []; //旧数据
          let ned = []; //新增数据
          for (const item of par) {
            // if (item.isInactive != 1) {
            //   this.$openWarning(`启用状态禁止删除`)
            //   return false;
            // }
            let obj = {};
            if (item.one) {
              ned.push(item);
            } else {
              obj.isInactive = item.isInactive;
              obj.version = item.version;
              obj.warehouseLinkId = item.warehouseLinkId;
              old.push(obj);
            }
          }
          if (old.length) {
            WareApi.detLink(old)
              .then(res => {
                this.$openSuccess(res.message);
                this.deleIndex(this.selectioned);
                this.$refs.multipleTable.clearSelection();
              })
              .catch();
          } else {
            this.deleIndex(this.selectioned);
            this.$refs.multipleTable.clearSelection();
          }
        })
        .catch();
    },
    //删除方法
    deleIndex(e) {
      let del = this.tableData.findIndex(item => {
        if (e.warehouseLinkId) {
          return item.warehouseLinkId == e.warehouseLinkId;
        } else {
          return item.one == e.one;
        }
      });
      this.tableData.splice(del, 1);
    },
    //表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    //表格单选
    dialogCheck(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.tableData.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      let index = this.tableData.indexOf(e);
      this.tableData.forEach(item => {
        item.edit = false;
      });
      this.tableData[index].edit = true;
      this.tableData[index].change = 1;
      // this.selectioned = e;
      this.index = this.tableData.indexOf(e);
      this.$set(this.tableData, this.tableData.indexOf(e), e);
    },
    //单行点击
    rowClick(e) {
      // this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e);
      // this.selectioned = e;
      // this.index = this.tableData.indexOf(e);
    },
    //创建数据
    addList() {
      this.tableData.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        linkMan: "",
        fixedTelephone: "",
        mobilePhone: "",
        email: "",
        fax: "",
        linkType: ""
      };
      this.newTbale.unshift(data);
      let newTbale = [];
      newTbale.unshift(data);
      this.tableData = newTbale.concat(this.tableData);
    },
    //
    goBack() {
      this.$router.push("/index/warehouseData/index");
    },
    //保存数据
    addSub() {
      let old = JSON.stringify(this.tableData);
      let changeData = JSON.parse(old);
      if (this.tableData.length == 0) {
        this.$openWarning("仓库联系人未建立");
        return false;
      }
      this.errorKey = [];
      let keyArr = ['warehouseName', 'warehouseCode', 'warehouseType', 'warehouseAttr'];
      keyArr.forEach(item => {
        if(!this[item]) {
          this.errorKey.push(item);
        }
      })
      if(this.errorKey.length > 0) {
        this.$openWarning('请将必填项补充完整！');
        return false;
      }
      changeData = changeData.filter(item => {
        if (
          item.linkMan != "" ||
          item.fixedTelephone != "" ||
          item.mobilePhone != "" ||
          item.email != "" ||
          item.fax != "" ||
          item.linkType != ""
        ) {
          return item;
        }
      });
      for (const item of changeData) {
        for (const obj of this.linkList) {
          if (item.linkType == obj.dict_value) {
            item.linkType = obj.dict_code;
          }
        }
      }
      this.$confirm("确定提交吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            warehouseCode: this.warehouseCode, //仓库代码
            warehouseName: this.warehouseName, //仓库名称
            warehouseType: this.warehouseType, //仓库类型
            warehouseAttr: this.warehouseAttr,
            area: this.area, //面积
            customs: this.customs, //所属海关
            customsRecordNumber: this.customsRecordNumber, //海关备案号
            address: this.address, //地址
            detailedAddress: this.detailedAddress, //详细地址
            englishAddress: this.englishAddress, //英文地址
            warehouseLinkList: changeData, //联系人
            countryName: this.countryName,
            countryId: this.countryId,
            provinceName: this.provinceName,
            provinceId: this.provinceId,
            cityName: this.cityName,
            cityId: this.cityId,
            countyName: this.countyName,
            countyId: this.countyId,
            limitVol: this.limitVol,
            storageUnit: this.storageUnit
          };
          if (this.$route.query.id) {
            params.warehouseId = this.warehouseId;
            params.version = this.version;
            WareApi.updateWare(params)
              .then(res => {
                this.$openSuccess(res.message);
                this.$router.push("/index/warehouseData/index");
              })
              .catch();
          } else {
            WareApi.addBbWare(params)
              .then(res => {
                this.$openSuccess(res.message);
                this.$router.push("/index/warehouseData/index");
              })
              .catch();
          }
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
.establish {
  .el_flex {
    display: flex;
    align-items: center;
  }
}
</style>
