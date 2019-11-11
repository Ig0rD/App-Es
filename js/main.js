const submitbtn = document.querySelector("button.submitbtn");
const wheelWidth = document.querySelector(".color-picker-container").parentElement.clientHeight*0.8;
let graphdiv = document.querySelector("div.grafico");
let avgdiv = document.querySelector("div.medias"); 
let table = document.querySelector("tbody");
let N,G,C;
function graphbuilder(names, values, color) {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if(width > 999){
        width = 999;
    }
    const height = Math.round(width*0.5)
    let url = "https://image-charts.com/chart?chxt=x,y&chxl=0:|1bim|2bim|3bim|4bim&cht=lc&chxr=1,0,10&chg=10,50";
    url += "&chs="+width+"x"+height; // tamanho da imagem
    url += "&chd=t:"
    if(values == undefined || values == 0){
        url += 0;
    } else {
        for(let i=0;i<values.length;i++){ //adiciona os valores das linhas
            for(let j=0;j<values[i].length;j++){
                if(values[i][j] == null){
                    break;
                } else {
                    url += values[i][j];
                }
                if(j !== values[i].length-1 && values[i][j+1] !== null){
                    url += ",";
                }
            }
            if(i !== values.length-1){
                url+="|";
            }
        }
        
        url+="&chco="
        for(let i=0;i<color.length;i++){ //adiciona as cores das linhas
            url+= color[i]
            if(i !== color.length-1){
                url+=",";
            }
        }

        url+= "&chdl="
        for(let i=0;i<names.length;i++){ //adiciona os nomes das linhas   
            url+= names[i].replace(" ","_")
            if(i !== names.length-1){
                url+="|";
            }
        }

        url+="&chls="
        for(let i=0;i<names.length;i++){ //aumenta o tamanho das linhas para melhor visibilidade
            url+= 2
            if(i !== names.length-1){
                url+="|";
            }
        }
        url+="&chm="
        for(let i=0;i<names.length;i++){ //aumenta o tamanho das linhas para melhor visibilidade
            url+= "o,"+color[i]+","+[i]+",-1,8.0";
            if(i !== names.length-1){
                url+="|";
            }
        }       
    }
    return url;

}
function graphplacer(n,v,c){
    let graph = document.querySelector("img.grafico");
        graph.classList.remove("hide");
        graph.src = graphbuilder(n,v,c);

}
function addavg (names, grades, color){
    let col;
    let media = [];
    let rowhead = document.createElement("div");
    rowhead.classList.add("row");
    let colhead = document.createElement("div");
    colhead.classList.add("col");
    colhead.classList.add("s12");
    colhead.classList.add("center");
    let bhead = document.createElement("b");
    bhead.textContent="Medias";
    colhead.appendChild(bhead);
    rowhead.appendChild(colhead);
    avgdiv.appendChild(rowhead);

    for(let i=0;i<names.length;i++){
        let aux = 0;
        let aux2 = 0;
        for(let j=0;j<grades[i].length;j++){
            aux += grades[i][j];
            if(grades[i][j] == null){
                aux2++
            }
        }
        media.push(aux/grades[i].length-aux2);
    }
    for(let i=0;i<names.length;i++){
        if(i%4 == 0) {
            col = document.createElement("div");
            col.classList.add("row");
        }
        let row = document.createElement("div");
        row.classList.add("col");
        let h6nome = document.createElement("h6");
        let pmedia = document.createElement("p");
        let bmedia = document.createElement("b");
        h6nome.textContent = names[i];
        h6nome.style.color = "#" + color[i];
        bmedia.textContent = media[i].toFixed(1);
        if(media[i] < 7) {
            bmedia.classList.add("red-text");
        } else {
            bmedia.classList.add("green-text");
        }
        pmedia.classList.add("center-align");
        h6nome.classList.add("center-align");
        pmedia.appendChild(bmedia);
        row.appendChild(h6nome);
        row.appendChild(pmedia);
        row.classList.add("s3");
        col.appendChild(row)
        if((i%4 == 0 && i!==0) || i!==names.length-1) {
            avgdiv.appendChild(col);
        }
        if(names.length == 1){
            avgdiv.appendChild(col);
        } 
    }
}
function addgradegrid (names, grades, color){
    for(let i=0;i<names.length;i++){
        tr = document.createElement("tr");
        materia = document.createElement("th");
        bim1 = document.createElement("th");
        bim2 = document.createElement("th");
        bim3 = document.createElement("th");
        bim4 = document.createElement("th");
        btn = document.createElement("button");
        icon = document.createElement("i");
        materia.classList.add("center-align");
        bim1.classList.add("center-align");
        bim2.classList.add("center-align");
        bim3.classList.add("center-align");
        bim4.classList.add("center-align");
        btn.classList.add("center-align");
        btn.classList.add("tablebtn");
        btn.classList.add("btn");
        btn.classList.add("red");
        icon.classList.add("material-icons");
        materia.textContent=names[i];
        bim1.textContent= grades[i][0]; 
        bim2.textContent= grades[i][1]; 
        bim3.textContent= grades[i][2]; 
        bim4.textContent= grades[i][3];
        icon.textContent= "clear";
        materia.style.color =  "#"+color[i];

        btn.appendChild(icon);
        tr.appendChild(materia);
        tr.appendChild(bim1);
        tr.appendChild(bim2);
        tr.appendChild(bim3);
        tr.appendChild(bim4);
        tr.appendChild(btn);
        table.appendChild(tr);
    }
}
function saveLS(){
    localStorage.setItem("names",JSON.stringify(N));
    localStorage.setItem("grades",JSON.stringify(G));
    localStorage.setItem("colors",JSON.stringify(C));        
}
table.addEventListener("click", function(e){
    //e.preventDefault();
    let tgt;
    if(e.target.nodeName == "I"){
        tgt = e.target.parentElement;
    } else {
        tgt = e.target;
    }
    let rem = N.indexOf(tgt.parentNode.firstChild.textContent);
    N.splice(rem, 1);
    G.splice(rem, 1);
    C.splice(rem, 1);
    saveLS();
    location.reload();
});
submitbtn.addEventListener("click", function (e){
    //e.preventDefault();
    let materia = document.getElementById("materia").value;
    let bim1 = parseFloat(document.getElementById("1_bim").value);
    let bim2 = parseFloat(document.getElementById("2_bim").value);
    let bim3 = parseFloat(document.getElementById("3_bim").value);
    let bim4 = parseFloat(document.getElementById("4_bim").value);
    let hex = colorPicker.color.hexString;
    hex = hex.substr(1);
    N.push(materia);
    G.push([bim1,bim2,bim3,bim4]);
    C.push([hex]);
    saveLS();
})

if(localStorage.getItem("names") === null){
    localStorage.setItem("names","[]");
    localStorage.setItem("grades","[]");
    localStorage.setItem("colors","[]");
    N = [];
    G = [];
    C = [];
} else {
    N = JSON.parse(localStorage.getItem("names"));
    G = JSON.parse(localStorage.getItem("grades"));
    C = JSON.parse(localStorage.getItem("colors"));
}
addavg(N,G,C);
graphplacer(N,G,C);
addgradegrid(N,G,C);

colorPicker = new iro.ColorPicker(".color-picker-container", {
    width: wheelWidth,
    sliderHeight: 0.000000000000000001,
    wheelLightness: false
});
