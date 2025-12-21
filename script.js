const AllElem = document.querySelectorAll(".elem");
const fullElem = document.querySelectorAll(".fullElem")
const back = document.querySelectorAll(".back");
AllElem.forEach((elem,idx)=>{
    elem.addEventListener("click",()=>{
        fullElem[idx].style.display = "block"; 
    })
});

back.forEach((elem,idx)=>{
    elem.addEventListener("click",()=>{
        fullElem[idx].style.display = "none";
    })
})
