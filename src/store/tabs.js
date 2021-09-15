const tabs = {
  state: {
    keepAlivePages:[],
    tabsList: JSON.parse(sessionStorage.getItem("tabsList")) || [
      {
        url: "systemIndex",
        baseUrl: "systemIndex",
        label: "首页"
      }
    ]
  },
  mutations: {
    //添加tabs     obj=>label、url、baseurl、query、params
    tabsListAdd(state, obj) {
      let ind = state.tabsList.findIndex(item => {
        return item.baseUrl == obj.url||item.baseUrl==obj.baseUrl;
      });
      //主路由不存在tabs中，push
      if (ind == -1) {
        state.tabsList.push(obj);
        sessionStorage.setItem("tabsList", JSON.stringify(state.tabsList));
        this.commit("keepAlivePagesChange")
      }
    },
    //修改tabs对应的页面路由及参数（例：查询新增修改为同一tabs）  obj=>url、baseurl、query、params
    tabsChange(state, obj) {
      let ind = state.tabsList.findIndex(item => {
        return item.baseUrl == obj.baseUrl;
      });
      if(ind != -1){
        //两者主路由相等，tabs对应的页面路由的参数
        state.tabsList[ind].url = obj.url;
        state.tabsList[ind].query = obj.query;
        state.tabsList[ind].params = obj.params;
        sessionStorage.setItem("tabsList", JSON.stringify(state.tabsList));
        this.commit("keepAlivePagesChange")
      }

    },
    //删除tabs
    tabsDelete(state, obj) {
      let tabsList = [];
      let ind = new Number();
      //type 0:单个关闭，1：右侧关闭，2：左侧关闭，3：关闭其他，4：全部关闭
      if (obj.type == 0) {
        tabsList = state.tabsList.filter(item => {
          return item.url != obj.url;
        });
      } else if (obj.type == 1) {
        ind = state.tabsList.findIndex(item => {
          return item.url == obj.url;
        });
        tabsList = state.tabsList.filter((item, index) => {
          return (index <= ind)||(item.url == "systemIndex");
        });
      } else if (obj.type == 2) {
        ind = state.tabsList.findIndex(item => {
          return item.url == obj.url;
        });
        tabsList = state.tabsList.filter((item, index) => {
          return (index >= ind)||(item.url == "systemIndex");
        });
      } else if (obj.type == 3) {
        tabsList = state.tabsList.filter(item => {
          return (item.url == obj.url)||(item.url == "systemIndex");
        });
      } else {
        tabsList = [
          {
            url: "systemIndex",
            baseUrl: "systemIndex",
            label: "首页"
          }
        ];
      }
      state.tabsList = tabsList;
      sessionStorage.setItem("tabsList", JSON.stringify(state.tabsList));
      this.commit("keepAlivePagesChange")
    },
    keepAlivePagesChange(state) {
      let list = [];
      state.tabsList.forEach(item => {
        list.push(item.url);
      });
      state.keepAlivePages = list;
    }
  },
  actions: {},
  getters: {
    tabsList: state => state.tabsList,
    keepAlivePages:state=>state.keepAlivePages
  }
};
export default tabs;