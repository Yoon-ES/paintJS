const canvas=document.querySelector("#jsCanvas");
const ctx=canvas.getContext("2d");//MDN 2D 검색
const colors=document.getElementsByClassName("jsColor");
const range=document.querySelector("#jsRange");
const mode=document.querySelector("#jsMode");
const save=document.querySelector("#jsSave");
const DEFAULT_COLOR="#2c2c2c";
ctx.strokeStyle=DEFAULT_COLOR;
ctx.fillStyle=DEFAULT_COLOR;
ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.lineWidth="2.5";
canvas.width= 600;
canvas.height= 600;//그림을 그리려면 칸바스의 폭과 높이 설정해야함
let filling=false;
let painting=false;
function startPainting(event){
    painting=true;
}
function stopPainting(event){
    painting=false;
}

function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(painting){
        ctx.lineTo(x,y);
        ctx.stroke();
        
    }else{
        ctx.beginPath();
        ctx.moveTo(x,y);
    }

}
function onClickCanvas(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",onClickCanvas);
}
function clickChangeColor(event){
    const changedColor=event.target.style.backgroundColor;
    ctx.strokeStyle=changedColor;
    ctx.fillStyle=changedColor;
}
function handleRangeChange(event){            
    const size=event.target.value;
    ctx.lineWidth=size;
}
Array.from(colors).forEach(color=>color.addEventListener("click",clickChangeColor));
//Array.from(colors)->colors 들을 배열화 시키고, Array.from(colors).forEach(itmes=>items.addEventListener)->각 배열에 있는 아이템(이름은 상관 없음)들에게 이벤트 속성 추가해주는 코드.

if(range){
    range.addEventListener("input",handleRangeChange);
}
function onHandleModeClick(event){
    if(filling!==false){
        filling=false;
        mode.innerText="fill";
    }else{
        filling=true;
        mode.innerText="paint";
    }
}
if(mode){
    mode.addEventListener("click",onHandleModeClick);
}

function onClickSave(event){
    const image=canvas.toDataURL("image/jpeg");//MDN canvas toDataurl 검색해서 만든 것
    const link=document.createElement("a");
    link.href=image;
    link.download="paintJS⌣";
    //링크 태그 만든 후 href 에는 링크가, download에는 이름이 들어가야 한다.
    link.click();
}
if(save){
    save.addEventListener("click",onClickSave);
}