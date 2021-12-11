import fs from 'fs';
//const fs = require('fs');

const validEmails: string[] = [];

const validDomian: string[] = [];
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */

function analyseFiles(inputPaths: string[], outputPath: string) {
  let data = '';
  //const inputPaths1: string = inputPaths.join('');
  try {
    const readerStream = fs.createReadStream(inputPaths[0]);

    readerStream.setEncoding('utf-8');

    readerStream.on('data', function (chunk: string) {
      data += chunk;
    });

    readerStream.on('end', function () {
      const writerStream = fs.createWriteStream(outputPath);

      const emailArray: string[] = [];
      const emailArray1: string[] = data.split('\n');
      for (let item = 0; item < emailArray1.length; item++) {
        if (emailArray1[item].includes('@')) {
          emailArray.push(emailArray1[item]);
        }
      }

      for (const elem of emailArray) {
        const emailValidate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (emailValidate.test(String(elem).toLowerCase())) {
          validEmails.push(elem);
        }
      }

      const obj: { [property: string]: number } = {};

      for (let elem = 0; elem < validEmails.length; elem++) {
        if (obj.hasOwnProperty(validEmails[elem].split('@')[1])) {
          obj[validEmails[elem].split('@')[1]]++;
        } else {
          validDomian.push(validEmails[elem].split('@')[1]);
          obj[validEmails[elem].split('@')[1]] = 1;
        }
      }

      interface Domain {
        'valid-domains': string[];
        totalEmailsParsed: number;
        totalValidEmails: number;
        categories: {
          [valid: string]: number;
        };
      }

      const sampleJson: Domain = {
        'valid-domains': validDomian,
        totalEmailsParsed: emailArray.length,
        totalValidEmails: validEmails.length,
        categories: obj,
      };
      //console.log(sampleJson);

      const stringJson = JSON.stringify(sampleJson, null, 2);

      //    console.log(sampleJson);

      //writerStream.write(`${validDomian}`);
      writerStream.write(stringJson);

      //fs.writeFileSync(outputPath, JSON.stringify(sampleJson, null, ' '));
    });
  } catch (err) {
    console.log(err);
  }

  // let result:any = await new Promise((resolve, reject)=>{
  // fs.readFile(inputPaths[0],"utf-8",(err:string,data:string)=>{
  //   if(err)
  //   reject(err)
  //   resolve(data)
  // })
  // })

  console.log('Complete the implementation in src/analysis.ts');
}

export default analyseFiles;
