// import
// cons createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
//   path : 'sample-real.csv',
//   header:[
//     {id:"emails"}
//   ]
// })

// const records =
import fs from 'fs';

const emailArr = '';
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
    readerStream.setEncoding('utf-8');

    readerStream.on('data', function (chunk: string) {
      data += chunk;
    });

    readerStream.on('end', function () {
      //result = data;
      console.log('it got here');
      console.log(data);
      console.log('it is working');

      const emailArray: string[] = data.split('\n');

      console.log(emailArray.length);
      console.log('good');
      for (const elem of emailArray) {
        //console.log(elem);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(String(elem).toLowerCase())) {
          //emailArr = elem + " ";
          finalEmails.push(elem);
        }
      }
      console.log(finalEmails.length);
      console.log(finalEmails);
      console.log('it came here');
      const csvEmail: string = finalEmails.join('');

      fs.writeFileSync(outputFile, `${finalEmails}`);
    });
  } catch (err) {
    console.log(err);
  }

  //let emailArray = .split("\n");
}
// validateEmailAddresses(["./index.ts"], "output.js")
export default validateEmailAddresses;
