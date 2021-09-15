import {getFilterList,setFilterList} from '@/api/editCondition'
import fa from "element-ui/src/locale/lang/fa";
import el from "element-ui/src/locale/lang/el";
export const getFilter={
  methods: {
    getFilter() {
      getFilterList().then(({data})=>{
        if(data){
          let {filterJson,listJson} = data;
          listJson = JSON.parse(listJson);
          filterJson = JSON.parse(filterJson);
          this.searchList = sortArray(this.searchList,listJson)
          this.headerList = sortArray(this.headerList,filterJson)
          // this.searchList = this.searchList
          // this.headerList = this.headerList
        }
      })
    }
  }
}
function sortArray(list,checkList){ //前端自定义数组  后端拿到数组
  const resultList = [];
  const result = checkListSame(list,checkList)
  if(result){
    return checkList
  }else {
    const fontList = JSON.parse(JSON.stringify(list))
    checkList.forEach((checkItem)=>{
      for(let i=0;i<fontList.length;i++){
        let item = fontList[i];
        if(checkItem.key===item.key){
          resultList.push({...item,checked:checkItem.checked});
          fontList.splice(i,1);
          continue

        }
      }
    })
    if(fontList.length >0){
      fontList.forEach(item=>{
        resultList.push(item)
      })
    }
    return resultList
  }

}
function checkListSame(list,checkList){ //前端自定义数组  后端拿到数组 false则用前端自定义数组
    if(list.length !== checkList.length){ //前后端数组长度不同 以前端为准
      return false
    }else{
      let checkObj ={};
      list.forEach((item)=>{
        checkObj[item.key] = true;
      })
      for(let i=0;i<checkList.length;i++){
        const{key} = checkList[i];
        if(!checkObj[key]){
          return false
        }
      }
    }
    return true


}



export const setFilter={
  methods: {
    setFilter(payload) {
      setFilterList(payload).then(()=>{
        let cancelList = []
       this.searchList.forEach((item)=>{
          if(!item.checked){
            cancelList.push(item.key)
          }
        })
        cancelList.forEach((item)=>{
          if(typeof this[item] ==="number" || typeof this[item] ==="string"){
            this[item] = ""
          }else if(Array.isArray(this[item])) {
            this[item] = []
          }else if(typeof this[item] ==="object"){
            this[item] = {}

          }
        })
      })
    }
  }
}
