let time = new Date().getHours();

if (time < 16) {
  document.write('<body style="background: #29B2DD; background: -webkit-linear-gradient(167deg, #29B2DD, #33AADD,#2DC8EA); background: linear-gradient(167deg, #29B2DD, #33AADD,#2DC8EA); ">');
} else {
  document.write('<body style="background: #08244F; background: -webkit-linear-gradient(167deg, #08244F, #134CB5,#0B42AB); background: linear-gradient(167deg, #08244F, #134CB5,#0B42AB);">')
}

let today = new Date();

const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let date = monthName[today.getMonth()] + ',' + today.getDate();
document.getElementById('date').innerHTML = date;

let hour = new Date().getHours();
let text = document.getElementsByClassName('time');

Array.prototype.forEach.call(text, function (el) {
  el.innerText = hour + '.00';
  hour += 1;
  hour % 24;
});

