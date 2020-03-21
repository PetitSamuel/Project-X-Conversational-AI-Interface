import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import '../../../App.css';
export class IntentLists extends Component {



// list中存储的是User对象，显示所有User信息
function displayList(list) {
   for (list.front(); list.currPos() < list.length(); list.next()) {
      if (list.getElement() instanceof User) {  // 使用 instanceof 判断对象类型
         print(list.getElement()["name"] + ", " +
               list.getElement()["intent"]);
      }
      else {
         print(list.getElement());
      }
   }
}

//
function checkOut(name, intent, filmList, UserList) {
   if (intentList.contains(intent)) {
      var c = new User(name, intent);
      UserList.append(c);
      filmList.remove(intent);
   }
   else {
      print(intent + " is not available.");
   }
}







  function List() {  // 定义class List
   this.listSize = 0;
   this.pos = 0;
   this.dataStore = [];  // 存储列表元素
   this.clear = clear;  // 此函数在后面定义
   this.find = find;
   this.toString = toString;
   this.insert = insert;
   this.append = append;
   this.remove = remove;
   this.front = front;
   this.end = end;
   this.prev = prev;
   this.next = next;
   this.length = length;
   this.currPos = currPos;
   this.moveTo = moveTo;
   this.getElement = getElement;
   this.length = length;
   this.contains = contains;
}   

function append(element) {
   this.dataStore[this.listSize++] = element;
}

function find(element) {
   for (var i = 0; i < this.dataStore.length; ++i) {
      if (this.dataStore[i] == element) {
         return i;
      }
   }
   return -1;  // 未找到时返回-1
}

function remove(element) {
   var foundAt = this.find(element);
   if (foundAt > -1) {
      this.dataStore.splice(foundAt,1);
      --this.listSize;
      return true;
   }
   return false;
}

function length() {
   return this.listSize;
}

function toString() {
    return this.dataStore;
}

function insert(element, after) {
   var insertPos = this.find(after);
   if (insertPos > -1) {
      this.dataStore.splice(insertPos+1, 0, element);
      ++this.listSize;
      return true;
   }
   return false;
}

function clear() {
   delete this.dataStore;
   this.dataStore = [];
   this.listSize = this.pos = 0;
}

function contains(element) {
   for (var i = 0; i < this.dataStore.length; ++i) {
      if (this.dataStore[i] == element) {
         return true;
      }
   }
   return false;
}

function front() {
   this.pos = 0;
}

function end() {
   this.pos = this.listSize-1;
}

function prev() {
   if (this.pos > 0) {
      --this.pos;
   }
}

function next() {
   if (this.pos < this.listSize-1) {
      ++this.pos;
   }
}

function currPos() {
   return this.pos;
}

function moveTo(position) {
   this.pos = position;
}

function getElement() {
   return this.dataStore[this.pos];
}


//////////////////////////////////////////////////
// 读取清单，保存在数组中
function createArr(file) {
   var arr = read(file).split("\n");
   for (var i = 0; i < arr.length; ++i) {
      arr[i] = arr[i].trim();
   }
   return arr;
}

// 创建List，保存intent
var intentList = new List();
for (var i = 0; i < intents.length; ++i) {
   intentList.append(intents[i]);
}

// 显示所有intent
function displayList(list) {
   for (list.front(); list.currPos() < list.length(); list.next()) {
      print(list.getElement());
}

// 定义user假设可以加intent
function User(name, intent) {
   this.name = name;
   this.intent = intent;
}



  render() {
    return (
      
    );
  }
}

export default StatsCard;