const fs = require("fs");
const path = require("path");
let args = process.argv.slice(2);
let projectFolder = args[0];
projectFolder = path.join(projectFolder,"app");
let componentFolder = path.join(projectFolder,"components");
let components = [];
let hash = {};

function logAttention(){
  for (var i = 0; i < 5; i++) {
    console.log("******");
  }
  console.log("");
}

function checkForComponent(folder,componentNames){
  fs.readdirSync(folder).forEach(file => {
    let pfad = path.join(folder,file);
    if(fs.lstatSync(pfad).isDirectory()){
        checkForComponent(pfad,componentNames);
    }else if(file=="template.hbs"){
      let data = fs.readFileSync(pfad)
        for (var componentName of componentNames) {
          if(data.includes(componentName)){
            hash[componentName].push(pfad);
          }
      }
    }
  });
}

function checkForFolder(folder){
  fs.readdirSync(folder).forEach(file => {
    let pfad = path.join(folder,file);
    if(fs.lstatSync(pfad).isDirectory()){
        checkForFolder(pfad);
    }else{
        checkForComponentJs(file,pfad);
    }
  });
}



function checkForComponentJs(file,pfad){
  if(file == "component.js"){
    console.log("pfad",pfad);
    let tmp = pfad.replace(componentFolder+"/","");
    tmp = tmp.replace("/component.js","");
    components.push(tmp);
  }
}

checkForFolder(componentFolder);
console.log(components);
for (var componentName of components) {
  hash[componentName] = [];
}
checkForComponent(projectFolder,components);
logAttention();

console.log(hash);


let c = 0;
Object.keys(hash).forEach((key)=>{
  if(hash[key].length==0){
    c++;
    console.log(key);
  }
})
logAttention();
console.log(c + " unused components");
