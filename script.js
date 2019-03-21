window.onload = function(){


  document.querySelector('.button').onclick = function(){
    var url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=007b56d8a8188ff942e23c1ed54e96be';
    get_wether(url);
  }
}

function get_wether(url){
  xhr = new XMLHttpRequest();
  xhr.onload = function(){
    var text = JSON.parse(xhr.response);
    add_elem(text);
    add_hat(text);
  }
  xhr.open('GET', url);
  xhr.send();
}

function add_elem(text){
  var count = 0;
  var arr = [];
  for(var i = 0; i < text.list.length; i += 8){
    console.log(text);
    arr = document.querySelectorAll('.days');
    temp = Math.floor(text.list[i].main.temp - 273,15);
    var date = text.list[i].dt_txt;
    var image = document.createElement('img');
    image.classList.add('img');
    name_image = text.list[i].weather[0].icon + '.png';
    image.setAttribute('src' , name_image);
    var elem_date = document.createElement('div');
    elem_date.classList.add('child');
    elem_date.classList.add('marg');
    elem_date.textContent = 'date - ' + date;
    var elem_temp = document.createElement('div');
    elem_temp.classList.add('child');
    elem_temp.classList.add('marg');
    elem_temp.textContent = 'Temperature : ' + temp + ' ' + "C";
    var elem_img = document.createElement('div');
    elem_img.classList.add('child');
    arr[count].appendChild(elem_date);
    arr[count].appendChild(elem_img).appendChild(image);
    arr[count].appendChild(elem_temp);
    count++;
  }
}

function add_hat(text){
  var elem = document.querySelector(".weather");
  var p_elem = new Add_elements('p_elem' , text.city.name + ',' + text.city.country , elem);
  p_elem.append_text();
  var image = document.createElement('img');
  image.classList.add('img');
  image.classList.add('p_image');
  name_image = text.list[0].weather[0].icon + '.png';
  image.setAttribute('src' , name_image);
  elem.appendChild(image);
  var p_temp = new Add_elements('p_temp' ,  Math.floor(text.list[0].main.temp - 273,15) + ' ' + 'C' , elem);
  p_temp.append_text();
  var p_rain = new Add_elements('p_rain' , text.list[0].weather[0].description ,  elem );
  p_rain.append_text();
  var p_wind = new Add_elements('p_wind' ,  text.list[0].wind.speed + ' ' + 'm/s' , elem);
  p_wind.append_text();
}

function Add_elements(class_name , text , elem){
  this.class_name = class_name;
  this.text = text;
  this.elem = elem;
  this.append_text = function(){
  console.log(this.class_name +1,this.text +2,this.elem +3);
    var add_elem = document.createElement('p');
    add_elem.textContent = this.text;
    add_elem.classList.add(class_name);
    this.func_append.call(add_elem , this.elem);
  }
  this.func_append = function(own_div){
    console.log(own_div);
    own_div.appendChild(this);
  }
}
