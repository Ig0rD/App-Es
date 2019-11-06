// var colorPicker = new iro.ColorPicker("#color-picker-container", {
//     width: 80
// });
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
console.log(width);
function graphbuilder(names, values, color) {
    const width = Math.round(0.8*(window.innerWidth > 0) ? window.innerWidth : screen.width);
    const height = Math.round(width*0.5)
    let url = "https://image-charts.com/chart?chxt=x,y&chxl=0:|1bim|2bim|3bim|4bim&cht=lc&chxr=1,0,10&chg=10,50";
    url += "&chs="+width+"x"+height; // tamanho da imagem
    url += "&chd=t:"
    if(values.length == 0){
        url += 0;
    } else {
        for(let i=0;i<values.length;i++){ //adiciona os valores das linhas
            for(let j=0;j<values[i].length;j++){
                url+= values[i][j];
                if(j !== values[i].length-1){
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
            url+= names[i]
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
    }
    return url;

}