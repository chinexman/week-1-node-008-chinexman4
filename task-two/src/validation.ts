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
    const writerStream = fs.createWriteStream(outputFile);

    readerStream.setEncoding('utf-8');

    readerStream.on('data', function (chunk: string) {
      data += chunk;
    });

    readerStream.on('end', function () {
      const emailArray: string[] = data.split('\n');
      for (const elem of emailArray) {
        const emailValidate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (emailValidate.test(String(elem).toLowerCase())) {
          finalEmails.push(elem);
        }
      }

      console.log(finalEmails);
      const csvEmail: string = finalEmails.join('');
      writerStream.write(`${finalEmails}`);
    });
  } catch (err) {
    console.log(err);
  }

  //let emailArray = .split("\n");
}
// validateEmailAddresses(["./index.ts"], "output.js")
export default validateEmailAddresses;
