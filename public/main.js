
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
/*context*/
var checkbox9 = document.getElementById('toggle-context-basic');
var checkbox10 = document.getElementById('toggle-context-greeting');
var checkbox11 = document.getElementById('toggle-context-goout');
var checkbox12 = document.getElementById('toggle-context-sleep');



/*******************Read temp, hum, gas*************/
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
  }else if(statusLight === "0" ){
    checkbox.classList.remove('toggle-ball');
    checkbox.classList.remove('toggle-background');
  }
})

root.child('kitchen-light').on ('value', function(snapshot) {
  let statusLight1 = snapshot.val();
  console.log(statusLight1)
  if(statusLight1 === "1" ){
    checkbox1.classList.add('toggle-ball');
    checkbox1.classList.add('toggle-background');
  }else if(statusLight1 === "0" ){
    checkbox1.classList.remove('toggle-ball');
    checkbox1.classList.remove('toggle-background');
  }
})

root.child('sleep-light1').on ('value', function(snapshot) {
  let statusLight2 = snapshot.val();
  console.log(statusLight2)
  if(statusLight2 === "1" ){
    checkbox2.classList.add('toggle-ball');
    checkbox2.classList.add('toggle-background');
  }else if(statusLight2 === "0" ){
    checkbox2.classList.remove('toggle-ball');
    checkbox2.classList.remove('toggle-background');
  }
})

root.child('sleep-light2').on ('value', function(snapshot) {
  let statusLight3 = snapshot.val();
  console.log(statusLight3)
  if(statusLight3 === "1" ){
    checkbox3.classList.add('toggle-ball');
    checkbox3.classList.add('toggle-background');
  }else if(statusLight3 === "0" ){
    checkbox3.classList.remove('toggle-ball');
    checkbox3.classList.remove('toggle-background');
  }
})

root.child('bath-light').on ('value', function(snapshot) {
  let statusLight4 = snapshot.val();
  console.log(statusLight4)
  if(statusLight4 === "1" ){
    checkbox4.classList.add('toggle-ball');
    checkbox4.classList.add('toggle-background');
  }else if(statusLight4 === "0" ){
    checkbox4.classList.remove('toggle-ball');
    checkbox4.classList.remove('toggle-background');
  }
})

/***************Read status fan****************/
root1.child('living-room-fan').on ('value', function(snapshot) {
  let statusLight5 = snapshot.val();
  console.log(statusLight5)
  if(statusLight5 === "1" ){
    checkbox5.classList.add('toggle-ball');
    checkbox5.classList.add('toggle-background');
  }else if(statusLight5 === "0" ){
    checkbox5.classList.remove('toggle-ball');
    checkbox5.classList.remove('toggle-background');
  }
})

root1.child('kitchen-fan').on ('value', function(snapshot) {
  let statusLight6 = snapshot.val();
  console.log(statusLight6)
  if(statusLight6 === "1" ){
    checkbox6.classList.add('toggle-ball');
    checkbox6.classList.add('toggle-background');
  }else if(statusLight6 === "0" ){
    checkbox6.classList.remove('toggle-ball');
    checkbox6.classList.remove('toggle-background');
  }
})

root1.child('sleep-fan1').on ('value', function(snapshot) {
  let statusLight7 = snapshot.val();
  console.log(statusLight7)
  if(statusLight7 === "1" ){
    checkbox7.classList.add('toggle-ball');
    checkbox7.classList.add('toggle-background');
  }else if(statusLight7 === "0" ){
    checkbox7.classList.remove('toggle-ball');
    checkbox7.classList.remove('toggle-background');
  }
})

root1.child('sleep-fan2').on ('value', function(snapshot) {
  let statusLight8 = snapshot.val();
  console.log(statusLight8)
  if(statusLight8 === "1" ){
    checkbox8.classList.add('toggle-ball');
    checkbox8.classList.add('toggle-background');
  }else if(statusLight8 === "0" ){
    checkbox8.classList.remove('toggle-ball');
    checkbox8.classList.remove('toggle-background');
  }
})

/***************Read status context****************/
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
/*************************************************************************/


