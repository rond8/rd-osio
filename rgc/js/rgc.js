let money = 0;energy= 10; energylimit=10;
health=100; healthlimit=100;
mineadd= 1;
function start(){
money = 0;energy= 10; energylimit=10;
health=100; healthlimit=100;
mineadd= 1;}
function red() {
    document.getElementById("healtht").style.backgroundColor = "gray"
  }
function msg(mh,message, m) {
    document.getElementById('message').innerHTML= mh + message + m;
}
function mine(add) {
    if(energy>=1){
        energy -= 1;
    money= money + add;
msg('mines :', add, ' money')}
    else{
        health -= 2;
        money= money + add;
        document.getElementById("healtht").style.backgroundColor = "red"
        setTimeout(red,2000)
        msg('not ','enough energy',' its bad for your health')
    }
}
function buy(cost,itemno){
    if (money>=cost) { 
        switch(itemno) {
            case 1: money =  money - cost; 
              energy += 10; msg('regained:', 10, ' energy');text();limit()
              break;
            case 2:money = money - cost;
            health += 10; msg('regained:', 10, ' health');text();limit()
            break;
            default:
              // code block
          }
        } 
        else{ msg('not ','enough',' money')}
}
function stime() {
   energy+= 1; 
}
const d = (n) => {  
    for (let i = 1; i <= n; i++) {
        setTimeout(() => {
            l=n-i;
           document.getElementById('timer').innerText=l;
           if(l == 0) {  document.getElementById('timer').innerText='';
             if(energylimit>energy){energy= energy+1;
            msg('received:', 1, ' energy')}
           if(healthlimit>health) {health += 1; msg('received:', 1, ' energy')
                   }        } }, i * 1000); }};

function limit() {
    if (health > healthlimit ) { health = healthlimit;  TES  } 
    if (energy > energylimit ) { energy = energylimit;    } 
    if (health == 0 ) {alert('you died');start();
       text() } 
}
function addMoney(amount) {
    money += amount;
}

function subtractMoney(amount) {
    money -= amount;
}
function saveGame() {
    localStorage.setItem("money", money);
    localStorage.setItem("energy", energy);
    localStorage.setItem("health", health);   
  }

  function loadGame() {
    money = parseInt(localStorage.getItem("money")) || 0;
    energy = parseInt(localStorage.getItem("energy"));
    health = parseInt(localStorage.getItem("health")) || 100;

    displayInventory();
    document.getElementById('moneyt').innerHTML = "MONEY: " + money;
    document.getElementById('energyt').innerHTML = "ENERGY: " + energy + "/" + energylimit;
    document.getElementById('healtht').innerHTML = "HEALTH: " + health + "/" + healthlimit;
  }

  window.onload = loadGame();
window.onbeforeunload = saveGame();