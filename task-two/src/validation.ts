import fs from 'fs';
import dns from 'dns';

const finalEmails: string[] = [];
/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */

async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  //   let result:any = await new Promise( (resolve,reject)=>{

  //     fs.readFile(inputPath[0],"utf-8", (err :string, data:string)=>{
  //     if(err) reject(err)
  //       resolve(data)

  //   })
  // });
  //console.log(result);
  let data = ' ';
  const inputPaths1: string = inputPath.join('');
  try {
    const readerStream = fs.createReadStream(inputPaths1);
    const writerStream = fs.createWriteStream(outputFile);

    readerStream.setEncoding('utf-8');

    readerStream.on('data', function (chunk: string) {
      data += chunk;
    });

    readerStream.on('end', async function () {
      const emailArray: string[] = data.split('\n');

      for(let elem = 0; elem < emailArray.length; elem++){
        // const domain = emailArray[elem].split('@')[1];  
        let result1:any = await new Promise((resolve,reject)=>{
         dns.resolve(emailArray[elem].split('@')[1], 'MX', function(err, addresses) {    
             if (err) {
                 reject(err)   
             } else if (addresses && addresses.length > 0) {      
               resolve(emailArray[elem]);
             }
           } );//end of dns
        }).catch(err => false); // end of promise
      if( result1 !== false){
        finalEmails.push(result1);

      }
     }

      // for (const elem of emailArray) {
      //   const emailValidate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      //   if (emailValidate.test(String(elem).toLowerCase())) {
      //     finalEmails.push(elem);
      //   }
      // }


      //console.log(finalEmails.unshift("Emails"));
       finalEmails.unshift('Email');
      const csvEmail: string = finalEmails.join('\n');
    //  const stringJson = JSON.stringify(finalEmails, null, 2);
      writerStream.write(csvEmail);
     
      //writerStream.write(`${finalEmails}`);
    });
  } catch (err) {
    console.log(err);
  }

  //let emailArray = .split("\n");
}
// validateEmailAddresses(["./index.ts"], "output.js")
export default validateEmailAddresses;
