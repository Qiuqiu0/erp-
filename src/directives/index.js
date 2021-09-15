import inputFilter from './inputFilter'
const importDirective = {
  install(Vue){
    Vue.directive('auto',{
      inserted: function(el, binding, vnode) {
        getHeight(el);
        window.onresize = () => {
          getHeight(el);
        };
      },
      componentUpdated: function(el, binding, vnode) {
        getHeight(el);
      }
    });
    Vue.directive('inputFilter', inputFilter)
  }
}
  export default importDirective;
  function getHeight(el) {
    var boxHeight = document.querySelector(".content-view").clientHeight;
    var siblingsNode = document.getElementsByClassName("auto-sibling");
    var siblingsHeight = 0;
    for (var i = 0; i < siblingsNode.length; i++) {
      siblingsHeight =
        Number(siblingsHeight) + Number(siblingsNode[i].offsetHeight);
    }
    var newHeight = boxHeight - siblingsHeight-10;
    newHeight < 130 ? (newHeight = 130) : false;
    el.style.height = newHeight + "px";
  }