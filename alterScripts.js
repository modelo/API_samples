const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const root = path.resolve(__dirname, 'samples');
const lists = fs.readdirSync(root);

const from = 'https://s3';
const to = 'http://10.209.144.209:5000/modeloapi.js';
const excepts = ['minimap-roam']
lists.forEach((foldername,index)=>{
    const folder = path.resolve(root, foldername);
    if(excepts.includes(foldername)){
        return;
    }
    console.log(foldername+': ')
    let indexHTMLString = fs.readFileSync(path.resolve(folder, 'index.html'),'utf-8');
    const dom = new JSDOM(indexHTMLString);
    const elements = dom.window.document.querySelectorAll("script"); 
    elements.forEach(element=>{
        const src = element.src;
        if(src && src.indexOf(from)>-1){ // 替换
            const basename = path.basename(src);
            if(basename.indexOf('modeloapiui')===-1){ // 跳过ui库
                // console.log(basename);
                element.src = to;
                indexHTMLString = indexHTMLString.replace(src, to);
            }
        }
    });
    // if(index===0){
    //     console.log(dom.serialize())
    // }
    // fs.writeFileSync(path.resolve(folder, 'index.html'), dom.serialize());
    fs.writeFileSync(path.resolve(folder, 'index.html'), indexHTMLString);
})