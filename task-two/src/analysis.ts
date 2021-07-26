
 const fs = require("fs");
   
 let emails:string[] = [];
 let sampleJson:any = {};
 let validDomian:string[] = [];
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
async function analyseFiles(inputPaths: string[], outputPath: string) {
let result:any = await new Promise((resolve, reject)=>{
fs.readFile(inputPaths[0],"utf-8",(err:string,data:string)=>{
  if(err)
  reject(err)
  resolve(data)
})
})
//console.log(result);
let emailArray:string[]=[];
let emailArray1:string[] = result.split("\n");
  for( let elem = 0; elem < emailArray1.length; elem++){
    console.log("index" + elem + " =" + emailArray1[elem]);
     if(emailArray1[elem].includes("@")){
       emailArray.push(emailArray1[elem]);
     }
  }
  
//console.log(emailArray)
  for (let elem of emailArray){
  //console.log(elem);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
   if(re.test(String(elem).toLowerCase())){
    //emailArr = elem + " "; 
    emails.push(elem)
   }
    


  }
//   type User = {
 
//     [key: string]: string;
// }
  let obj: any = {};

for (let elem = 0; elem < emails.length; elem++){
  if(obj.hasOwnProperty(emails[elem].split("@")[1])){

  obj[emails[elem].split("@")[1]]++
  }else{
    validDomian.push(emails[elem].split("@")[1]);
   obj[emails[elem].split("@")[1]]=1  
  }
}


sampleJson["valid-domains"]=validDomian;
 sampleJson["totalEmailsParsed"]=emailArray.length;
 sampleJson["totalValidEmails"]=emails.length;
 sampleJson["categories"]=obj;

//console.log(sampleJson);


fs.writeFileSync(outputPath,JSON.stringify(sampleJson, null, " "));


  //console.log('Complete the implementation in src/analysis.ts');
}

export default analyseFiles;

//var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;