/**
 * Created by Nymeria on 2018/8/17 0017.
 */

//获取id元素
function my$(id) {
  return document.getElementById(id);
}

//获取任意一个父级元素的第一个子级元素
function getFirstElementChild(element) {
  if(element.firstElementChild){//true--->支持
    return element.firstElementChild;
  }else{
    var node=element.firstChild;//第一个节点
    while (node&&node.nodeType!=1){
      node=node.nextSibling;
    }
    return node;
  }
}
//获取任意一个父级元素的最后一个子级元素
function getLastElementChild(element) {
  if(element.lastElementChild){//true--->支持
    return element.lastElementChild;
  }else{
    var node=element.lastChild;//第一个节点
    while (node&&node.nodeType!=1){
      node=node.previousSibling;
    }
    return node;
  }
}

//为任意元素绑定任意事件
function addEventListener(element,type,fn) {
  if(element.addEventListener){
    element.addEventListener(type,fn,false);
  }else if(element.attachEvent){
    element.attachEvent('on'+type,fn);
  }else{
    element['on'+type]=fn;
  }
}

// 为任意元素解绑任意事件
function removeEventListener(element,type,fn) {
  if(element.removeEventListener){
    element.addEventListener(type,fn,false);
  }else if(element.detachEvent){
    element.detachEvent('on'+type,fn);
  }else{
    element['on'+type]="";
  }
}

//设置任意元素的中间的文本内容
function setInnnerText(element,text) {
  if(typeof element.textContent=="undefined"){
    element.innerText=text;
  }else{
    element.textContent=text;
  }
}
//获取任意元素的中间的文本内容
function getInnerText(element) {
  if(typeof element.textContent=="undefined"){
    return element.innerText;
  }else{
    return element.textContent;
  }
}

//动画函数封装
//获取任意一个元素的任意一个属性的当前的值---当前属性的位置值
function getStyle(element, attr) {
  return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
}

function animate(element, json,fn) {
  clearInterval(element.timeId);
  element.timeId = setInterval(function () {
    var flag=true;//默认,假设,全部到达目标
    for (var attr in json) {
      if (attr == 'opacity') {
        var current = getStyle(element, attr) * 100;
        var target = json[attr] * 100;
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        element.style[attr] = current / 100;
      } else if (attr == 'zIndex') {
        element.style[attr] = json[attr];
      } else {
        var current = parseInt(getStyle(element, attr));
        var target = parseInt(json[attr]);
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        element.style[attr] = current + 'px';
      }
      if (target != current) {
        flag = false;
      }else{
        falg=true;
      }
    }
    if (flag) {
      clearInterval(element.timeId);
      if(fn){
        fn();
      }
    }
  }, 20)
}



