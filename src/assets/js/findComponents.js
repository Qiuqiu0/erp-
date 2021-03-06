
//1.向上找到指定的组件实例
function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) {
      name = parent.$options.name;
    }
  }
  return parent;
}
//2.向上找到所有的指定组件
function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}
//3.向下找到最近的指定组件
function findComponentDownward(context, componentName) {
  const childrens = context.$children;  //数组
  let children = null;
  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) {
          break;
        }
      }
    }
  }
  return children;
}
//4.向下找到所有指定的组件
function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}
//5.找到指定组件的兄弟组件
function findBrothersComponents(context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;  //返回所有item.$options.name === componentName的item
  });
  let index = res.findIndex(item => item._uid === context._uid);  //findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
  if (exceptMe) res.splice(index, 1);
  return res;
}
export {
  findComponentUpward,
  findComponentsUpward,
  findComponentDownward,
  findComponentsDownward,
  findBrothersComponents,
}