let xp=0;
let health=100;
let gold=50;
let currentweapen=0;
let fighting;
let monsterhealth;
let inventory=["stick"];
const bt1=document.querySelector("#bt1");
const bt2=document.querySelector("#bt2");
const bt3=document.querySelector("#bt3");
const xptext=document.querySelector("#xptext");
const goldtext=document.querySelector("#goldtext");
const healthtext=document.querySelector("#healthtext");
const monstername=document.querySelector("#monstername");
const monsterhealthtext=document.querySelector("#monsterhealth");
const monsterstart=document.querySelector("#masterstart");
const text1=document.querySelector("#text");
monsterstart.style.display="none";
const Weapon=[
    {
        name:"stick",
        power:5
    },{
        name:"dogger",
        power:30
    }
    ,{
        name:"claw hammer",
        power:50
    },
    {
        name:"sword",
        power:100
    }
];
const monster=[
    {
        name:"slime",
        level:2,
        health:15
    },
    {
        name:"Fanged beast",
        level:8,
        health:60
    },
    {
        name:"dragon",
        level:20,
        health:300
    }
];
const locations=[{
    name:"Town aquare",
    "button text":["Go to Store","Go to Cave","Fight Dragon"],
    "button function":[gotostore,gotocave,fightdragon],
    text1:"Your in Town Quare. You see the sign that says \"Store.\""
},
{
    name:"store",
    "button text":["Buy 10 Health (10 GOLD)","Buy Weapon (30 GOLD)","Go to Town Quare"],
    "button function":[buyhealth,buyweapon,gototown],
    text1:" Your in Store."
},
{
    name:"cave",
    "button text":["Fight slime","Fight fanged beast ","Go to Town Quare"],
    "button function":[fightslime,fightbeast,gototown],
    text1:" Your Enter  the cave you see some monster."
},
{
    name:"fight",
    "button text":["Attack","Dodge ","Run"],
    "button function":[attack,dodge,gototown],
    text1:" Your Enter  the cave you see some monster."
},
{
    name:"kill monster",
    "button text":["go to town quare","go to town quare ","go to town quare"],
    "button function":[gototown,gototown,gototown],
    text1:' The monster screams "Arg!" as it dies. You gain experience points and find gold.'

},
{
    name:"lose",
    "button text":["Restart?","Restart? ","Restart?"],
    "button function":[restart,restart,restart],
    text1:' You Die.'

},
{
    name:"wingame",
    "button text":["Restart?","Restart? ","Restart?"],
    "button function":[restart,restart,restart],
    text1:' You defeat the dragon! YOu win the game.'

}
]

bt1.onclick=gotostore;
bt2.onclick=gotocave;
bt3.onclick=fightdragon;
function update(location){
    monsterstart.style.display="none";
    bt1.innerText=location["button text"][0];
    bt2.innerText=location["button text"][1];
    bt3.innerText=location["button text"][2];
    bt1.onclick=location["button function"][0];
    bt2.onclick=location["button function"][1];
    bt3.onclick=location["button function"][2];
    text1.innerText=location.text1;
}

function gototown(){
    update(locations[0]);
}
function gotostore()
{
 update(locations[1]);  
}
function gotocave(){
update(locations[2]);
}

function buyhealth(){
    if(gold>=10){
        gold-=10;
        health+=10;
        goldtext.innerText=gold;
        healthtext.innerText=health;
        text1.innerText="You got the health.";
    }
    else{
        text1.innerText="YOu don't have enough gold to buy health."
    }
}
function buyweapon(){
    if(currentweapen<Weapon.length-1)
    {
        if(gold>=30)
        {
            gold-=30;
            currentweapen++;
            goldtext.innerText=gold;
            let newweapon=Weapon[currentweapen].name;
            text1.innerText="You now have a "+newweapon+".";
            inventory.push(newweapon);
            text1.innerText+="In your inventory you have "+inventory;
        }
    
        else
        {
            text1.innerText="YOu don't have enough gold to buy weapon."
        }
    }
    else
    {
        text1.innerText="You already have the most powerfull weapon.";
        bt2.innerText="Sell weapon for 15 GOLD";
        bt2.onclick=sellweapon;
    }
}
function sellweapon()
{
    if(inventory.length>1)
    {
        gold+=15;
        gold.innerText=gold;
        let currentweapen=inventory.shift();
        text1.innerText="You sold a"+currentweapen+".";
        text1.innerText+="In inventory you have "+inventory;
    }
    else
    {
        text1.innerText="Don't sell your only weapon."
    }
}
function fightslime()
{
    fighting=0;
    gofight();
}
function fightbeast(){
    fighting=1;
    gofight();

}
function fightdragon(){
    fighting=2;
    gofight();
}
function gofight()
{
    update(locations[3]);
    monsterhealth=monster[fighting].health;
    monsterstart.style.display="block";
    monstername.innerText=monster[fighting].name;
    monsterhealthtext.innerText=monsterhealth;
}
function attack()
{
    text1.innerText="The "+monster[fighting].name+"attack";
    text1.innerText+="You attack it with your "+Weapon[currentweapen].name+".";
    health-=monster[fighting].level;
    monsterhealth-=Weapon[currentweapen].power+Math.floor(Math.random()*xp)+1;;
    healthtext.innerText=health;
    monsterhealthtext.innerText=monsterhealth;
    if(health<=0)
    {
        lose();
    }
    else if(monsterhealth<=1)
    {
        console.log("sss");
        if(fighting==2)
        {
            wingame();
        }
        else
        {
            defeatmonster();
        }
    }
}
function dodge()
{
    text1.innerText="You dodge the attack from the "+monster[fighting].name+".";
}
function defeatmonster()
{
    gold+=Math.floor(monster[fighting].level*6.7);
    xp+=monster[fighting].level;
    goldtext.innerText=gold;
    xptext.innerText=xp;
    update(locations[4]);
}
function lose()
{
    update(locations[5]);
}
function wingame()
{
    update(locations[6]);
}
function restart()
{
    xp=0;
    health=100;
    gold=50;
    currentweapen=0;
    inventory=["stick"];
    xptext.innerText=xp;
    healthtext.innerText=health;
    goldtext.innerText=gold;
    gototown();
}
