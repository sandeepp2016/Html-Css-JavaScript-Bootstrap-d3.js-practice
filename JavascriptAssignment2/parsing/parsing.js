
  const readline = require('readline');
  const fs = require('fs');
  const year ="1960";
  const idicatorcodeMa ="SP.DYN.LE00.FE.IN";
  const idicatorcodeFe ="SP.DYN.LE00.MA.IN";
  const indicatorCodeD = "SP.DYN.CDRT.IN";
  const indicatorCodeB= "SP.DYN.CBRT.IN";
  const lifeExpectencyAtbirth ="SP.DYN.LE00.IN";
  const forYear ="2000";
  const country ="INDIA";
  const range1   ="1960";
  const range2   ="2015";
  var countryWiseLifeExpectency  = [];
  var topFiveWithHLEAtBirth  = [];
  var countrieslifeExpectencyAtBirth =[] ;
  var countries = ["INDIA","JAPAN","CHINA","PAKISTAN","SINGAPORE", "OMAN","INDONESIA","MALAYSIA","NEPAL","MONGOLIA"];
  var  indiaBirthAndDeathRate =[];
  var years = [];
  var len = countries.length;
  var  key1 = "Birth_Rate";
  var key2 = "Death_Rate";

  var topFiveCoutriesWithHLE = [];

   for(var i=0;i<len;i++){
       countryWiseLifeExpectency[i] = {"country":countries[i],"Male":"","Female":""};
   }

   for(var i=0,j=1960;j<=2015;j++,i++){

      indiaBirthAndDeathRate[i] = {"Year":""+j,"Birth_Rate":"","Death_Rate":""};
      years[i] = j+"";
   }
// console.log(indiaBirthAndDeathRate);

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('../csv/Indicators.csv')
});

lineReader.on('line', function (line) {

         lifeExpectency(line);
         indiaBDRate(line)
        topFiveWithHLE(line);
});

function  lifeExpectency(line){
      //console.log(line);
         var columns  = line.match(/("[^']+"|[^,]+)/g);
         columns = columns||[];
         if(columns[4]==year){
          // console.log(columns[4]);
            var index = countries.indexOf(columns[0].toUpperCase());
               if(index>=0){
                // console.log(index);
                if(columns[3].toUpperCase()===idicatorcodeMa){

                   countryWiseLifeExpectency[index].Male=columns[5];
                  }
                 else if(columns[3]===idicatorcodeFe) {
                    countryWiseLifeExpectency[index].Female=columns[5];
                  //  console.log(columns[5]);
                 }
           }
   }

}

function  indiaBDRate(line){
      //console.log(line);
         var columns  = line.match(/("[^']+"|[^,]+)/g);
         columns = columns||[];

         if(columns[0].toUpperCase()===country) {
          // console.log("hello");
            if(columns[4]>=range1 && columns[4]<=range2){
                  //console.log(columns[3]);
                if(columns[3].toUpperCase()===indicatorCodeB){
                    //   console.log("hello");
                   var index = years.indexOf(columns[4]);
                  // console.log(columns[5]);
                     indiaBirthAndDeathRate[index][key1]=columns[5];
                  }
                 else if(columns[3]===indicatorCodeD) {
                   var index = years.indexOf(columns[4]);
                  //  console.log(columns[5]);
                    indiaBirthAndDeathRate[index][key2]=columns[5];
                 }
           }
   }
 }

 function  topFiveWithHLE(line){


             var columns  = line.match(/("[^']+"|[^,]+)/g);
             columns = columns||[];
            if(columns[4]===forYear){

                    if(columns[3]===lifeExpectencyAtbirth){

                    countrieslifeExpectencyAtBirth .push({"country":columns[0],"lifeExpAtBirth":columns[5]});
                 }
          }
}
lineReader.on('close', function () {
      //console.log(JSON.stringify(countrieslifeExpectency));
       countrieslifeExpectencyAtBirth .sort(function(a,b){
             if(a.lifeExpAtBirth>b.lifeExpAtBirth){
               return -1;
              }
          else if(a.lifeExpAtBirth<b.lifeExpAtBirth){
               return 1;
          }
             else return 0;
        });
        for(var i=0;i<5;i++){
         topFiveWithHLEAtBirth[i] = countrieslifeExpectencyAtBirth[i];
        }

        fs.writeFile("../json/lifeExpectency.json",JSON.stringify(countryWiseLifeExpectency),"utf-8");
        fs.writeFile("../json/indiaBirthAndDeathRate.json",JSON.stringify(indiaBirthAndDeathRate),"utf-8");
        fs.writeFile("../json/topFiveWithHLEAtBirth.json",JSON.stringify(topFiveWithHLEAtBirth),"utf-8");
      //  console.log(JSON.stringify(topFiveWithHLEAtBirth));
      //  console.log(JSON.stringify(countryWiseLifeExpectency));
      //  console.log(JSON.stringify(indiaBirthAndDeathRate));
});
