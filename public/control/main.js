
const firebaseConfig = {
  apiKey: "AIzaSyBdD278v7pqmi37IcsTWZnMW1hm1Gpy9xA",
  authDomain: "homeautoty.firebaseapp.com",
  databaseURL: "https://homeautoty-default-rtdb.firebaseio.com",
  projectId: "homeautoty",
  storageBucket: "homeautoty.appspot.com",
  messagingSenderId: "970781795709",
  appId: "1:970781795709:web:6f8e4653caad2d6e535814"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//*****************************************************************//
const temp = document.getElementById('textTemp');
const hum = document.getElementById('textHum');
const gas = document.getElementById('textGas');
var root = firebase.database().ref('light-cluster');
var root1 = firebase.database().ref('fan-cluster');
var root2 = firebase.database().ref('context-cluster');
var root3 = firebase.database().ref('door-cluster');
var root4 = firebase.database().ref('time');


/*light*/
var checkbox = document.getElementById('toggle-living-room-light');
var checkbox1 = document.getElementById('toggle-kitchen-light');
var checkbox2 = document.getElementById('toggle-sleep-light1');
var checkbox3 = document.getElementById('toggle-sleep-light2');
var checkbox4 = document.getElementById('toggle-bath-light');
/*fan*/
var checkbox5 = document.getElementById('toggle-living-room-fan');
var checkbox6 = document.getElementById('toggle-kitchen-fan');
var checkbox7 = document.getElementById('toggle-sleep-fan1');
var checkbox8 = document.getElementById('toggle-sleep-fan2');
/*auto context*/
var checkbox9 = document.getElementById('toggle-context-basic');
var checkbox10 = document.getElementById('toggle-context-greeting');
var checkbox11 = document.getElementById('toggle-context-goout');
var checkbox12 = document.getElementById('toggle-context-sleep');
/*door*/
var checkbox13 = document.getElementById('toggle-living-room-door');
var checkbox14 = document.getElementById('toggle-kitchen-window');

/*Weather*/

const apiKey = '937cf77563e93771556d1c0c17f8ab7b';
var api;
var city = 'Ho Chi Minh';
const weatherIcon = document.querySelector(".weather__wrapper img");


/*Tabbar*/
var tabs = document.querySelectorAll('.tab-item');
var panes = document.querySelectorAll('.tab-pane');
var tabActive = document.querySelector('.tab-item.active');
var line = document.querySelector('.tabs .line');

/*SLides*/
var slides = document.querySelectorAll('.slide');
var dots = document.getElementsByClassName('dot');

//********************** Show Sliders *****************************//
var slideIndex = 0;
// showSlides();
// function showSlides(){
//   for(i=0; i< slides.length;i++){
//     slides[i].style.display = 'none';
//     // console.log('i = '+i);
//   }
//   // console.log('index'+slideIndex);
//   slideIndex ++;
  
//   if(slideIndex > slides.length){slideIndex = 1};
//   slides[slideIndex-1].style.display = "block";                                                                                        
  
//   // setTimeout(showSlides, 5000)
// }

//********************** Weather *****************************//
//***Call API****/

setInterval(resquestApi(city),10000) 
function resquestApi(city){
  console.log(city)
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}

/**** Response values from API ****/
function fetchData(){
  fetch(api)
    // .then(response => console.log(response.json()))
    .then(response => response.json())
    .then(result =>   weatherInfo(result))
}

/****** Get values and pass on html*****/
function weatherInfo(info){
    const city = info.name;
    const country = info.sys.country;
    const {description, id} = info.weather[0];
    const {feels_like, humidity, temp} = info.main;
    if(id == 800){
      weatherIcon.src = "icons/clear.svg";
    }else if(id >= 200 && id <= 232){
      weatherIcon.src = "icons/storm.svg";
    }else if(id >= 600 && id <= 622){
      weatherIcon.src = "icons/snow.svg";
    }else if(id >= 701 && id <= 782){
      weatherIcon.src = "icons/haze.svg";
    }else if(id >= 801 && id <= 804){
      weatherIcon.src = "icons/cloud.svg";
    }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
      weatherIcon.src = "icons/rain.svg";
    }
    
    document.querySelector(".temp .number").innerText = Math.floor(temp);
    document.querySelector(".weather").innerText = description;
    document.querySelector(".location span").innerText = `${city}, ${country}`;
    document.querySelector(".temp .number-1").innerText = Math.floor(feels_like);
    document.querySelector(".humidity span").innerText = `${humidity}%`;
    
  }


/*****************Alarm Clock*************************/
var displayTime = document.querySelector('.time');
var selecthour = document.getElementById('hours');
var selectmin = document.getElementById('minutes');
var selectampm = document.getElementById('ampm');
var btnAlarm = document.getElementById('setclear');
var notiAlarm = document.querySelector('.noti-alarm');
var time, alarmTime, currentHour, currentMin;
var activeAlarm = false;
function realTime(){
  let now = new Date();
  time = now.toLocaleTimeString(); // time format AM PM
  //time = now.getTime();
  displayTime.textContent = time;
  root4.child('real_time').set(time);
  setTimeout(realTime, 1000);
}
realTime();

function hours(id){
  var select = id;
  var hours = 23;
  for(i = 0; i <= hours; i++){
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}

function minutes(id){
  var select = id;
  var min = 59;
  for (i = 0; i<= min; i++){
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}

hours(selecthour);
minutes(selectmin);

btnAlarm.onclick = function(){
  
  if(activeAlarm === false){
    selecthour.disabled = true;
    selectmin.disabled = true;
    alarmTime = selecthour.value + ":" + selectmin.value;
    this.textContent = "Clear Alarm";
    notiAlarm.textContent = "You'll wake up at the above time 😂"
    activeAlarm = true;
  }else{
    selecthour.disabled = false;
    selectmin.disabled = false;
    alarmTime = "0";
    this.textContent = "Set Alarm";
    notiAlarm.textContent = "You have not set an alarm 😅";
    activeAlarm = false;
  }
  console.log(alarmTime);
  root4.child('alarm_time').set(alarmTime);
}

/*****************Tabbar*****************************/
line.style.left = tabActive.offsetLeft + 'px';
line.style.width = tabActive.offsetWidth + 'px';
tabs.forEach(function(tab, index) {
  const pane = panes[index];
  tab.onclick = function(){
    // console.log(this);
    // console.log(pane);
    // check class : 'tab-item' and 'active', remove class: active
    document.querySelector('.tab-item.active').classList.remove('active');
    this.classList.add('active');
    document.querySelector('.tab-pane.active').classList.remove('active');
    pane.classList.add('active');

    line.style.left = this.offsetLeft + 'px';
    line.style.width = this.offsetWidth + 'px';
  }
})

/****************** Read temp, hum, gas ************/
var rootTemp = firebase.database().ref('monitor-cluster');
rootTemp.child('temp').on ('value', function(snapshot) {
  temp.innerText = snapshot.val();
})

var rootHum = firebase.database().ref('monitor-cluster');
rootHum.child('hum').on ('value', function(snapshot) {
  hum.innerText = snapshot.val();
})

var rootGas = firebase.database().ref('monitor-cluster');
rootGas.child('gas').on ('value', function(snapshot) {
  gas.innerText = snapshot.val();
})

/***************Read status light****************/
root.child('living-room-light').on ('value', function(snapshot) {
  let statusLight = snapshot.val();
  console.log(statusLight)
  if(statusLight === "1" ){
    checkbox.classList.add('toggle-ball');
    checkbox.classList.add('toggle-background');
    document.querySelector('.device__icon-1 .fa-lightbulb').style.color = "#FED100";
  }else if(statusLight === "0" ){
    checkbox.classList.remove('toggle-ball');
    checkbox.classList.remove('toggle-background');
    document.querySelector('.device__icon-1 .fa-lightbulb').style.color = "initial";
  }
})

root.child('kitchen-light').on ('value', function(snapshot) {
  let statusLight1 = snapshot.val();
  console.log(statusLight1)
  if(statusLight1 === "1" ){
    checkbox1.classList.add('toggle-ball');
    checkbox1.classList.add('toggle-background');
    document.querySelector('.device__icon-3 .fa-lightbulb').style.color = "#FED100";
  }else if(statusLight1 === "0" ){
    checkbox1.classList.remove('toggle-ball');
    checkbox1.classList.remove('toggle-background');
    document.querySelector('.device__icon-3 .fa-lightbulb').style.color = "initial";
  }
})

root.child('sleep-light1').on ('value', function(snapshot) {
  let statusLight2 = snapshot.val();
  console.log(statusLight2)
  if(statusLight2 === "1" ){
    checkbox2.classList.add('toggle-ball');
    checkbox2.classList.add('toggle-background');
    document.querySelector('.device__icon-5 .fa-lightbulb').style.color = "#FED100";
  }else if(statusLight2 === "0" ){
    checkbox2.classList.remove('toggle-ball');
    checkbox2.classList.remove('toggle-background');
    document.querySelector('.device__icon-5 .fa-lightbulb').style.color = "initial";
  }
})

root.child('sleep-light2').on ('value', function(snapshot) {
  let statusLight3 = snapshot.val();
  console.log(statusLight3)
  if(statusLight3 === "1" ){
    checkbox3.classList.add('toggle-ball');
    checkbox3.classList.add('toggle-background');
    document.querySelector('.device__icon-7 .fa-lightbulb').style.color = "#FED100";

  }else if(statusLight3 === "0" ){
    checkbox3.classList.remove('toggle-ball');
    checkbox3.classList.remove('toggle-background');
    document.querySelector('.device__icon-7 .fa-lightbulb').style.color = "initial";

  }
})

root.child('bath-light').on ('value', function(snapshot) {
  let statusLight4 = snapshot.val();
  console.log(statusLight4)
  if(statusLight4 === "1" ){
    checkbox4.classList.add('toggle-ball');
    checkbox4.classList.add('toggle-background');
    document.querySelector('.device__icon-9 .fa-lightbulb').style.color = "#FED100";

  }else if(statusLight4 === "0" ){
    checkbox4.classList.remove('toggle-ball');
    checkbox4.classList.remove('toggle-background');
    document.querySelector('.device__icon-9 .fa-lightbulb').style.color = "initial";

  }
})

/***************Read status fan****************/
root1.child('living-room-fan').on ('value', function(snapshot) {
  let statusLight5 = snapshot.val();
  console.log(statusLight5)
  if(statusLight5 === "1" ){
    checkbox5.classList.add('toggle-ball');
    checkbox5.classList.add('toggle-background');
    document.querySelector('.device__icon-2 .fa-fan').style.color = "#FDD020";
  }else if(statusLight5 === "0" ){
    checkbox5.classList.remove('toggle-ball');
    checkbox5.classList.remove('toggle-background');
    document.querySelector('.device__icon-2 .fa-fan').style.color = "initial";
  }
})

root1.child('kitchen-fan').on ('value', function(snapshot) {
  let statusLight6 = snapshot.val();
  console.log(statusLight6)
  if(statusLight6 === "1" ){
    checkbox6.classList.add('toggle-ball');
    checkbox6.classList.add('toggle-background');
    document.querySelector('.device__icon-4 .fa-fan').style.color = "#FDD020";
  }else if(statusLight6 === "0" ){
    checkbox6.classList.remove('toggle-ball');
    checkbox6.classList.remove('toggle-background');
    document.querySelector('.device__icon-4 .fa-fan').style.color = "initial";
  }
})

root1.child('sleep-fan1').on ('value', function(snapshot) {
  let statusLight7 = snapshot.val();
  console.log(statusLight7)
  if(statusLight7 === "1" ){
    checkbox7.classList.add('toggle-ball');
    checkbox7.classList.add('toggle-background');
    document.querySelector('.device__icon-6 .fa-fan').style.color = "#FDD020";
  }else if(statusLight7 === "0" ){
    checkbox7.classList.remove('toggle-ball');
    checkbox7.classList.remove('toggle-background');
    document.querySelector('.device__icon-6 .fa-fan').style.color = "initial";
  }
})

root1.child('sleep-fan2').on ('value', function(snapshot) {
  let statusLight8 = snapshot.val();
  console.log(statusLight8)
  if(statusLight8 === "1" ){
    checkbox8.classList.add('toggle-ball');
    checkbox8.classList.add('toggle-background');
    document.querySelector('.device__icon-8 .fa-fan').style.color = "#FDD020";
  }else if(statusLight8 === "0" ){
    checkbox8.classList.remove('toggle-ball');
    checkbox8.classList.remove('toggle-background');
    document.querySelector('.device__icon-8 .fa-fan').style.color = "initial";
  }
})

/***************Read status Auto context****************/
root2.child('basic').on('value', function(snapshot){
  let status9 = snapshot.val();
  if(status9 === "1"){
    checkbox9.classList.add('toggle-ball');
    checkbox9.classList.add('toggle-background');
  }else if(status9 === "0"){
    checkbox9.classList.remove('toggle-ball');
    checkbox9.classList.remove('toggle-ball');('toggle-background');
  }
})

root2.child('greeting').on('value', function(snapshot){
  let status10 = snapshot.val();
  if(status10 === "1"){
    checkbox10.classList.add('toggle-ball');
    checkbox10.classList.add('toggle-background');
  }else if(status10 === "0"){
    checkbox10.classList.remove('toggle-ball');
    checkbox10.classList.remove('toggle-background');
  }
})

root2.child('goout').on('value', function(snapshot){
  let status11 = snapshot.val();
  if(status11 === "1"){
    checkbox11.classList.add('toggle-ball');
    checkbox11.classList.add('toggle-background');
  }else if(status11 === "0"){
    checkbox11.classList.remove('toggle-ball');
    checkbox11.classList.remove('toggle-background');
  }
})

root2.child('sleep').on('value', function(snapshot){
  let status12 = snapshot.val();
  if(status12 === "1"){
    checkbox12.classList.add('toggle-ball');
    checkbox12.classList.add('toggle-background');
  }else if(status12 === "0"){
    checkbox12.classList.remove('toggle-ball');
    checkbox12.classList.remove('toggle-background');
  }
})
/***************Read status door****************/
root3.child('living-room-door').on('value', function(snapshot){
  let status13 = snapshot.val();
  console.log(status13);
  if(status13 === "1"){
    checkbox13.classList.add('toggle-ball');
    checkbox13.classList.add('toggle-background');
    document.querySelector('.icon-door').innerHTML = '<i class="fas fa-door-open"></i>';
  }else if(status13 === "0"){
    checkbox13.classList.remove('toggle-ball');
    checkbox13.classList.remove('toggle-background');
    document.querySelector('.icon-door').innerHTML = '<i class="fas fa-door-closed"></i>';
  }
})
root3.child('kitchen-window').on('value', function(snapshot){
  let status14 = snapshot.val();
  if(status14 === "1"){
    checkbox14.classList.add('toggle-ball');
    checkbox14.classList.add('toggle-background');
    document.querySelector('.icon-window').innerHTML = '<i class="fas fa-door-open"></i>';

  }else if(status14 === "0"){
    checkbox14.classList.remove('toggle-ball');
    checkbox14.classList.remove('toggle-background');
    document.querySelector('.icon-window').innerHTML = '<i class="fas fa-door-closed"></i>';

  }
})

/************Control by toggle button************/
/*light*/
checkbox.addEventListener('change', e =>{
  if(e.target.checked) {
    checkbox.classList.toggle('toggle-ball');
    checkbox.classList.toggle('toggle-background');
    root.child('living-room-light').set('1');
    
    
  }else{
    checkbox.classList.toggle('toggle-ball');
    checkbox.classList.toggle('toggle-background');
    root.child('living-room-light').set('0');
    
  }
})

checkbox1.addEventListener('change', e =>{
  if(e.target.checked) {
    checkbox1.classList.toggle('toggle-ball');
    checkbox1.classList.toggle('toggle-background');
    root.child('kitchen-light').set('1');
    
    
  }else{
    checkbox1.classList.toggle('toggle-ball');
    checkbox1.classList.toggle('toggle-background');
    root.child('kitchen-light').set('0');
    
  }
})
checkbox2.addEventListener('change', e =>{
  if(e.target.checked) {
    checkbox2.classList.toggle('toggle-ball');
    checkbox2.classList.toggle('toggle-background');
    root.child('sleep-light1').set('1');
    
    
  }else{
    checkbox2.classList.toggle('toggle-ball');
    checkbox2.classList.toggle('toggle-background');
    root.child('sleep-light1').set('0');
    
  }
})
checkbox3.addEventListener('change', e =>{
  if(e.target.checked) {
    checkbox3.classList.toggle('toggle-ball');
    checkbox3.classList.toggle('toggle-background');
    root.child('sleep-light2').set('1');
    
    
  }else{
    checkbox3.classList.toggle('toggle-ball');
    checkbox3.classList.toggle('toggle-background');
    root.child('sleep-light2').set('0');
    
  }
})
checkbox4.addEventListener('change', e =>{
  if(e.target.checked) {
    checkbox4.classList.toggle('toggle-ball');
    checkbox4.classList.toggle('toggle-background');
    root.child('bath-light').set('1');
    
    
  }else{
    checkbox4.classList.toggle('toggle-ball');
    checkbox4.classList.toggle('toggle-background');
    root.child('bath-light').set('0');
    
  }
});

/*fan*/
checkbox5.addEventListener('change', e =>{
  if(e.target.checked) {
    checkbox5.classList.toggle('toggle-ball');
    checkbox5.classList.toggle('toggle-background');
    root1.child('living-room-fan').set('1');
    
    
  }else{
    checkbox5.classList.toggle('toggle-ball');
    checkbox5.classList.toggle('toggle-background');
    root1.child('living-room-fan').set('0');
    
  }
})

checkbox6.addEventListener('change', e =>{
  if(e.target.checked) {
    checkbox6.classList.toggle('toggle-ball');
    checkbox6.classList.toggle('toggle-background');
    root1.child('kitchen-fan').set('1');
    
    
  }else{
    checkbox6.classList.toggle('toggle-ball');
    checkbox6.classList.toggle('toggle-background');
    root1.child('kitchen-fan').set('0');
    
  }
})

checkbox7.addEventListener('change', e =>{
  if(e.target.checked) {
    checkbox7.classList.toggle('toggle-ball');
    checkbox7.classList.toggle('toggle-background');
    root1.child('sleep-fan1').set('1');
    
    
  }else{
    checkbox7.classList.toggle('toggle-ball');
    checkbox7.classList.toggle('toggle-background');
    root1.child('sleep-fan1').set('0');
    
  }
})

checkbox8.addEventListener('change', e =>{
  if(e.target.checked) {
    checkbox8.classList.toggle('toggle-ball');
    checkbox8.classList.toggle('toggle-background');
    root1.child('sleep-fan2').set('1');
    isFlag = true;
    
  }else{
    checkbox8.classList.toggle('toggle-ball');
    checkbox8.classList.toggle('toggle-background');
    root1.child('sleep-fan2').set('0');
    
  }
})

/*context*/
checkbox9.addEventListener('change', e =>{
  if(e.target.checked){
    checkbox9.classList.toggle('toggle-ball');
    checkbox9.classList.toggle('toggle-background');
    root2.child('basic').set('1');
  }else{
    checkbox9.classList.toggle('toggle-ball');
    checkbox9.classList.toggle('toggle-background');
    root2.child('basic').set('0');
    
  }
})

checkbox10.addEventListener('change', e =>{
  if(e.target.checked){
    checkbox10.classList.toggle('toggle-ball');
    checkbox10.classList.toggle('toggle-background');
    root2.child('greeting').set('1');
  }else{
    checkbox10.classList.toggle('toggle-ball');
    checkbox10.classList.toggle('toggle-background');
    root2.child('greeting').set('0');
    
  }
})

checkbox11.addEventListener('change', e =>{
  if(e.target.checked){
    checkbox11.classList.toggle('toggle-ball');
    checkbox11.classList.toggle('toggle-background');
    root2.child('goout').set('1');
  }else{
    checkbox11.classList.toggle('toggle-ball');
    checkbox11.classList.toggle('toggle-background');
    root2.child('goout').set('0');
    
  }
})

checkbox12.addEventListener('change', e =>{
  if(e.target.checked){
    checkbox12.classList.toggle('toggle-ball');
    checkbox12.classList.toggle('toggle-background');
    root2.child('sleep').set('1');
  }else{
    checkbox12.classList.toggle('toggle-ball');
    checkbox12.classList.toggle('toggle-background');
    root2.child('sleep').set('0');
    
  }
})
checkbox13.addEventListener('change', e =>{
  if(e.target.checked){
    checkbox13.classList.toggle('toggle-ball');
    checkbox13.classList.toggle('toggle-background');
    root3.child('living-room-door').set('1');
  }else{
    checkbox13.classList.toggle('toggle-ball');
    checkbox13.classList.toggle('toggle-background');
    root3.child('living-room-door').set('0');
    
  }
})
checkbox14.addEventListener('change', e =>{
  if(e.target.checked){
    checkbox14.classList.toggle('toggle-ball');
    checkbox14.classList.toggle('toggle-background');
    root3.child('kitchen-window').set('1');
  }else{
    checkbox14.classList.toggle('toggle-ball');
    checkbox14.classList.toggle('toggle-background');
    root3.child('kitchen-window').set('0');
    
  }
})
/*************************************************************************/


