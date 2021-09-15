<template>
  <div class="exchange content-div">
    <div class="button-div auto-sibling">
      <el-button class="query-button"
                 @click="queryData"
                 icon="el-icon-search">查询</el-button>
      <el-button @click="clearNone"
                 icon="el-icon-refresh">重置</el-button>
    </div>
    <!-- 搜索 -->
    <div class="index-div3 input-div auto-sibling">
      <div class="">
        <el-col :span="5"
                class="el-col">
          <label>单位名称</label>
          <el-input v-model="searchUnitName"> </el-input>
          <!-- <el-select v-model="formValue" filterable placeholder="请选择" clearable>
            <el-option
              v-for="item in currSel"
              :key="item.currencyId"
              :label="item.currencyName"
              :value="item.currencyId"
            ></el-option>
          </el-select> -->
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>单位代码</label>
          <el-input v-model="searchUnitCode"></el-input>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>状态</label>
          <el-select v-model="searchIsInactive"
                     placeholder="请选择">
            <el-option v-for="item in isInaType"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </div>
    </div>
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-folder-add"
                 class="query-button"
                 @click="addList"
                 v-if="$actionFlag(`F001`)">创建</el-button>
      <el-button icon="el-icon-edit"
                 @click="handleUnitEdit"
                 v-if="$actionFlag(`F002`)">修改</el-button>
      <el-button icon="el-icon-suitcase"
                 @click="handleUnitSave"
                 v-if="$actionFlag(`F003`)">保存</el-button>
      <el-button icon="el-icon-delete"
                 @click="handleUnitDele"
                 v-if="$actionFlag(`F004`)">删除</el-button>
      <el-button icon="el-icon-unlock"
                 @click="handleUnitInactive(0)"
                 v-if="$actionFlag(`F005`)">启用</el-button>
      <el-button icon="el-icon-lock"
                 @click="handleUnitInactive(1)"
                 v-if="$actionFlag(`F006`)">禁用</el-button>
    </div>
    <!-- 表格 -->
    <div class="el-table-div"
         v-auto>
      <el-table border
                center
                :data="tableData"
                class="el-table"
                ref="multipleTable"
                height="calc(100% - 35px)"
                @select="handleDataSelect"
                @select-all="handleDataSelectAll"
                @selection-change="handleChange"
                @row-click="handleRowClick"
                @row-dblclick="dblclick"
                v-loading="loading">
        <el-table-column type="selection"
                         width="55"></el-table-column>
        <el-table-column type="index"
                         width="50"
                         label="序号"></el-table-column>
        <el-table-column prop="unitCode"
                         label="单位代码"
                         width="150px"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-input v-model="scope.row.unitCode"
                        @blur="handleUnitCodeCheck(scope)"
                        @input="handleUnitCodeRule(scope.row.unitCode)"
                        :disabled="scope.row.unitId ? true : false"
                        placeholder="请输入内容"></el-input>
            </div>
            <div v-else>{{ scope.row.unitCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="unitName"
                         label="单位名称"
                         width="150px"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-input v-model="scope.row.unitName"
                        @blur="handleUnitNameCheck(scope)"
                        placeholder="请输入内容"></el-input>
            </div>
            <div v-else>{{ scope.row.unitName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态"
                         show-overflow-tooltip>
          <template slot-scope="scope">

            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.isInactive"
                         @change="handleUnitInactive(scope.row.isInactive)"
                         placeholder="请选择">
                <el-option v-for="item in isInaType"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row.isInactive == 0 ? '启用' : '禁用' }}</div>

          </template>
        </el-table-column>
        <el-table-column prop="createdName"
                         label="创建人"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.createdName }}
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         label="创建时间"
                         width="150px"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.createdTime | time }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="updatedName"
                         label="修改人"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.updatedName }}
          </template>
        </el-table-column>
        <el-table-column prop="updatedTime"
                         label="修改时间"
                         width="150px"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.updatedTime | time }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="remark"
                         label="备注"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input v-model="scope.row.remark"
                        placeholder="请输入内容"></el-input>
            </div>
            <div v-else>{{ scope.row.remark }}</div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页background-->
      <el-pagination background @size-change="handleSizeChange"
                     @current-change="currentChange"
                     :current-page="pageNum"
                     :page-sizes="[100, 200, 300,500]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  queryGdGoodsUnitList,
  enableGdGoodsUnit,
  stopGdGoodsUnit,
  cancelGdGoodsUnit,
  addGdGoodsUnit,
  editGdGoodsUnit,
  checkUnitCode,
  checkUnitName
} from '@/api/unitManage/unitManage';
export default {
  name: 'exchange',
  data () {
    return {
      inputData: '', //输入框
      tableData: [], //单位表格
      tableAssign: '', //表格深拷贝数据
      selectedList: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      value2: '', //日期
      value3: '', //截止日期
      source: '', //源货币
      target: '', //目标币
      currSel: [], //货币选项
      formValue: ``, //元货币值
      toValue: ``, //目标币值
      noneBool: true, //是否全部输入 true是 false否
      loading: true, //表格loading
      isInactive: '',
      isInaType: [
        { value: 0, label: '启用' },
        { value: 1, label: '禁用' }
      ],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {}, //日期禁止项
      navColor: {
        button: {
          backgroundColor: '' //按钮颜色
        }
      },
      show: true,
      searchUnitName: '',
      searchUnitCode: '',
      searchIsInactive: '',
      dataBeforeSub: [], //创建，修改数据暂存
      index: null, //选中索引
      selectedList: [], //选中数据
      editUnitList: [], //修改数据暂存
    };
  },
  created () {
    let that = this;
    if (that.value2 !== '') {
      this.pickerClose = {
        disabledDate (time) {
          return time.getTime() > that.value2;
        }
      };
    }
    //获取表格
    // this.initUnitsList();
    //获取货币
    this.initUnitsList();
  },
  mounted () {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        '#' + localStorage.getItem('themecolor');
    } else {
      this.navColor.button.backgroundColor = '#' + this.themecolor;
    }
  },
  methods: {
    handleUnitCodeRule (value) {
      value = value.replace(/[^\w^\.]+/g, '').replace('.', '')
      this.tableData[this.index].unitCode = value
    },
    //获取单位列表
    initUnitsList () {
      this.loading = true;
      queryGdGoodsUnitList({
        unitName: this.searchUnitName,
        unitCode: this.searchUnitCode,
        isInactive: this.searchIsInactive,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(res => {
          this.tableData = res.data;
          this.total = res.total;
          this.loading = false;
        })
        .catch(err => { });
    },
    inputShow () {
      this.show = this.$showOne(this.show);
    },
    //获取表格
    // initUnitsList () {
    //   this.loading = true;
    //   let params = {
    //     pageNum: this.pageNum,
    //     rows: this.pageSize,
    //     formCurrencyId: this.formValue,
    //     toCurrencyId: this.toValue,
    //     isInactive: this.isInactive,
    //     paritiesDateFrom: this.value2, //起始日期
    //     paritiesDateTo: this.value3 //截止日期
    //   };
    //   ExApi.initUnitsList(params)
    //     .then(res => {
    //       this.loading = false;
    //       this.tableAssign = [...res.data];
    //       res.data.forEach(item => {
    //         item.edit = false;
    //         item.isInactive == '0'
    //           ? (item.isInactive = '启用')
    //           : (item.isInactive = '禁用');
    //         item.paritiesDate = this.$timeFun(item.paritiesDate, 1);
    //       });
    //       this.tableData = res.data;
    //       this.total = res.total;
    //       // if (res.data.length !== 0) {
    //       //   this.pageSize = res.data[0].pageSize;
    //       // }
    //     })
    //     .catch(() => {
    //       this.loading = false;
    //     });
    // },
    //查询
    queryData () {
      this.initUnitsList();
    },
    //清空选项
    clearNone () {
      this.searchUnitName = '';
      this.searchUnitCode = '';
      this.searchIsInactive = '';
    },
    //翻页
    currentChange (e) {
      this.pageNum = e;
      this.initUnitsList();
    },
    //更改每页条数
    handleSizeChange (e) {
      this.pageSize = e;
      this.initUnitsList();
    },
    //表格选择
    handleChange (e) {
      this.selectedList = e;
    },
    handleDataSelect (selection, row) {
      this.index = this.tableData.indexOf(selection[0]);
      this.selectedList = selection;
    },
    handleDataSelectAll (selection) {
      this.selectedList = selection;
    },
    //单击
    handleRowClick (e) {
      this.$refs.multipleTable.toggleRowSelection(e);
      if (this.selectedList.length == 1) {
        this.index = this.tableData.indexOf(e)
      }
    },
    //单行双击
    dblclick (e) {
      this.tableData.forEach(item => {
        item.edit = false;
      });
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e);
      this.index = this.tableData.indexOf(e);
      let index = this.index;
      this.index = this.tableData.indexOf(e);
      this.tableData[index].edit = true;
      this.tableData[index].change = 1;
      this.$set(this.tableData, this.tableData.indexOf(e), e);
    },
    //删除方法
    deleIndex (e) {
      for (const get of e) {
        let del = this.tableData.findIndex(item => {
          return item.one == get.one && item.paritiesId == get.paritiesId;
        });
        this.tableData.splice(del, 1);
      }
    },
    //创建数据
    addList () {
      this.tableData.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        unitName: ``,
        unitCode: ``,
        remark: ``,
        isInactive: 0
      };
      this.index = 0;
      this.newTbale.unshift(data);
      let newTbale = [];
      newTbale.unshift(data);
      this.tableData = newTbale.concat(this.tableData);
    },
    //数据校验
    handleUnitCodeCheck (scope) {
      if (scope.row.unitCode) {
        if (!scope.row.unitId) {
          checkUnitCode({ unitCode: scope.row.unitCode + '' }).then((res) => {
            // this.$openSuccess('"单位代码"可用')
          }).catch((err) => {
            scope.row.unitCode = ''
          })
        }
      } else {
        this.$openWarning('请输入"单位代码"')
      }
    },
    handleUnitNameCheck (scope) {
      // if (scope.row.unitName) {
      //   if (!scope.row.unitId) {
      //     checkUnitName({ unitName: scope.row.unitName + '' }).then((res) => {
      //       this.$openSuccess('"单位名称"可用')
      //     }).catch((err) => {
      //       scope.row.unitName = ''
      //     })
      //   }
      // }else{
      //   this.$openWarning('请输入"单位名称"')
      // }
    },
    handleUnitInactive (state) {
      if (this.selectedList.length == 0) {
        this.$openWarning('请选择单位');
      } else {
        let temp = JSON.parse(JSON.stringify(this.selectedList));
        for (let i = 0; i < temp.length; i++) {
          const el = temp[i];
          if (!el.unitId) {
            temp.splice(i, 1);
            i--;
          } else {
            el.isInactive = state;
          }
        }
        if (temp.length > 0) {
          switch (state) {
            case 0:
              this.enableGdGoodsUnit(temp);
              break;
            case 1:
              this.stopGdGoodsUnit(temp);
              break;
            default:
              break;
          }
        }
      }
    },
    //启用
    enableGdGoodsUnit (temp) {
      enableGdGoodsUnit({
        gdGoodsUnitForms: temp
      })
        .then(res => {
          this.$openSuccess('启用成功');
          this.initUnitsList();
        })
        .catch(() => { });
    },
    //禁用
    stopGdGoodsUnit (temp) {
      stopGdGoodsUnit({
        gdGoodsUnitForms: temp
      })
        .then(res => {
          this.$openSuccess('禁用成功');
          this.initUnitsList();
        })
        .catch(() => { });
    },
    //删除
    handleUnitDele () {
      if (this.selectedList.length == 0) {
        this.$openWarning('请选择单位')
      } else {
        let flag = true;
        this.selectedList.forEach(el => {
          if (el.isInactive == 0) {
            this.$openWarning('存在"启用"单位，请"禁用"后删除');
            flag = false;
          }
        });
        if (flag) {
          this.$confirm('即将删除选中单位，是否继续？', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let deleList = this.selectedList;
            for (let i = 0; i < deleList.length; i++) {
              const el = deleList[i];
              el.isInactive = 2; //删除
              if (!el.unitId) {
                let index = this.tableData.indexOf(el);
                this.tableData.splice(index, 1);
                deleList.splice(i, 1);
                i--;
              }
            }
            if (deleList.length != 0) {
              deleList.forEach(el => {
                if (this.editUnitList.indexOf(el) != -1) {
                  this.editUnitList.splice(this.editUnitList.indexOf(el), 1);
                }
              });
              cancelGdGoodsUnit({
                gdGoodsUnitForms: deleList
              })
                .then(res => {
                  this.$openSuccess('删除成功');
                  this.initUnitsList();
                })
                .catch(() => { });
            }
          });
        }
      }
    },
    //修改标记
    handleUnitEdit () {
      if (this.selectedList.length != 1) {
        this.$openWarning('请选择单条数据修改');
      } else {
        if (this.tableData[this.index].unitId) {
          this.editUnitList.push(this.tableData[this.index]);
        }
        this.dblclick(this.tableData[this.index]);
      }
    },
    //保存提交
    handleUnitSave () {
      let addData = [];
      let flag = true;
      this.tableData.map(item => {
        //有Id修改，无Id新增
        if (item.unitId) {
          if (item.unitName == '' || item.unitCode == '') {
            flag = false;
          } else {
            addData.push(item);
          }
        }else{
          addData.push(item);
        }
      });
      if (flag) {
        for (let i = 0; i < addData.length; i++) {
          const e = addData[i];
          for (let j = i + 1; j < addData.length; j++) {
            const el = addData[j];
            if (addData[i].unitCode == addData[j].unitCode) {
              this.$openWarning('"单位代码"不允许存入重复字段')
              return;
            }
          }
        }
        addData.map(item => {
          item.showName = item.unitName;
        });
        this.edit(this.editUnitList, addData);
      } else {
        this.$openWarning('请填写完整数据');
      }
    },
    //保存
    save (addData) {
      addGdGoodsUnit({
        gdGoodsUnitForms: addData
      })
        .then(res => {
          this.$openSuccess('保存成功');
          this.initUnitsList();
        })
        .catch(() => { });
    },
    //修改数据
    edit (editData, addData) {
      editGdGoodsUnit({
        gdGoodsUnitForms: [...editData, ...addData]
      })
        .then(res => {
          this.$openSuccess('保存成功');
          this.editUnitList = [];
          this.initUnitsList();
        })
        .catch(() => { });
    },
    //保存数据
    addSub () {
      let changeArr = this.tableData.filter(item => {
        return item.change == 1;
      });
      let old = JSON.stringify(changeArr);
      let changeData = JSON.parse(old);

      if (this.tableData.length == 0 || changeData.length == 0) {
        this.$openWarning('无数据提交');
        return false;
      }
      for (const item of changeData) {
        if (
          item.currencyToName == '' ||
          item.currencyShortNameTo == '' ||
          item.currencyShortNameFrom == '' ||
          item.currencyFromName == '' ||
          item.paritiesDate == '' ||
          item.parities == ''
        ) {
          this.$openWarning('填写完整数据');
          return false;
        } else {
          for (let obj of this.currSel) {
            if (item.currencyToName == obj.currencyName)
              item.toCurrencyId = obj.currencyId;
            if (item.currencyFromName == obj.currencyName)
              item.formCurrencyId = obj.currencyId;
          }
          item.isInactive == '启用'
            ? (item.isInactive = '0')
            : (item.isInactive = '1');
        }
      }
      this.$confirm('是否确定提交', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = changeData;
          ExApi.addParitie(params)
            .then(res => {
              this.$openSuccess('保存成功');
              this.initUnitsList();
            })
            .catch();
        })
        .catch();
    }
  },
  computed: {
    ...mapState({
      themecolor: 'themecolor'
    })
  },
  watch: {
    themecolor: {
      handler () {
        this.navColor.button.backgroundColor = '#' + this.themecolor;
      }
    },
    value2 (val) {
      let that = this;
      if (val > that.value3) {
        that.value3 = '';
      }
      this.pickerClose = {
        disabledDate (time) {
          return time.getTime() < that.value2;
        }
      };
    }
  }
};
</script>

<style lang="scss">
.exchange {
  /* margin-left: 19px;
  width: 97%; */
  .el_flex {
    display: flex;
    align-items: center;
  }
  .el-date-editor.el-input {
    width: auto;
  }
}
</style>
