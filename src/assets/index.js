import $ from 'jquery';
import './index.css';
import './index.less';
import deleteLogo from './icon-delete.png';


// 定义装饰器
function info(target) {
  target.info = 'Person info';
}
@info
class Person {}

$(function () {
  $('li:odd').css('background-color', 'green');
  $('li:even').css('background-color', 'pink');

  // set image src
  $('.image-box').attr('src', deleteLogo);
})

console.log(Person.info);