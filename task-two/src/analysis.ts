import fs from 'fs';

interface Domain {
  'valid-domains': string[];
  totalEmailsParsed: number;
  totalValidEmails: number;
  categories: {
    [valid: string]: number;
  };
}

const emails: string[] = [];
const sampleJson: Domain = {};
const validDomian: string[] = [];
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */

function analyseFiles(inputPaths: string[], outputPath: string) {
  let data = '';
  const inputPaths1: string = inputPaths.join('');
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

      const emailArray: string[] = [];
      const emailArray1: string[] = data.split('\n');
      for (const elem = 0; elem < emailArray1.length; elem++) {
        if (emailArray1[elem].includes('@')) {
          emailArray.push(emailArray1[elem]);
        }
      }

      for (const elem of emailArray) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(String(elem).toLowerCase())) {
          //emailArr = elem + " ";
          emails.push(elem);
        }
      }
      //   type User = {

      //     [key: string]: string;
      // }
      const obj: { [property: string]: number } = {};

      for (let elem = 0; elem < emails.length; elem++) {
        if (obj.prototype.hasOwnProperty.call(emails[elem].split('@')[1])) {
          obj[emails[elem].split('@')[1]]++;
        } else {
          validDomian.push(emails[elem].split('@')[1]);
          obj[emails[elem].split('@')[1]] = 1;
        }
      }

      sampleJson['valid-domains'] = validDomian;
      sampleJson['totalEmailsParsed'] = emailArray.length;
      sampleJson['totalValidEmails'] = emails.length;
      sampleJson['categories'] = obj;

      console.log(sampleJson);

      fs.writeFileSync(outputPath, JSON.stringify(sampleJson, null, ' '));
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
