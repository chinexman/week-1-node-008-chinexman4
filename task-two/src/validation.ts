

// import 
// cons createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
//   path : 'sample-real.csv',
//   header:[
//     {id:"emails"}
//   ]
// })

// const records = 
   const fs = require("fs");
   
   let emailArr:string = "";
   let finalEmails:string[] = [];
/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */

 async function validateEmailAddresses(inputPath: string[], outputFile: string) {

  let result:any = await new Promise( (resolve,reject)=>{
    
    fs.readFile(inputPath[0],"utf-8", (err :string, data:string)=>{
    if(err) reject(err)
      resolve(data)

  })
});
//console.log(result);


  //let emailArray = .split("\n");
  let emailArray:string[] = result.split("\n");
 
  
console.log(emailArray.length)
console.log("good")
  for (let elem of emailArray){
  //console.log(elem);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
   if(re.test(String(elem).toLowerCase())){
    //emailArr = elem + " "; 
    finalEmails.push(elem)
   }
    


  }
console.log(finalEmails.length)
  console.log(finalEmails);
  let csvEmail:string = finalEmails.join("");


  fs.writeFileSync(outputFile,`${finalEmails}`);

}
// validateEmailAddresses(["./index.ts"], "output.js")
export default 
validateEmailAddresses;
