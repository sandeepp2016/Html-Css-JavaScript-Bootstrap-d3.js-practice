var csvDataStateWise = new Array();
var csvDataGenderWise = new Array();
var totalGraduateMales=0;
var totalGraduateFemales=0;
var csvData = new Array();
var csvEducationLevel = [];
var fs = require("fs");

for(var i=0;i<17;i++){

          csvData[i] = {"age_group":"","totalLiterate":0};

      }
      for(var i=0;i<35;i++){
         csvDataStateWise[i]  = {"State":"","totalGraduate":0};
     }


        csvDataGenderWise[0]  = {"Gender":"Male","totalGraduate":0};
        csvDataGenderWise[1]  = {"Gender":"Female","totalGraduate":0};

        for(var i=0;i<10;i++){
          csvEducationLevel[i]  = {"EducationLevel":"","total":0};
        }


var data = fs.readFileSync('India2011.csv').toString();
ageWise(data);
stateWise(data);
educationLevel(data);



function ageWise(data){
//converting string into lines
    var lines = data.toString().split("\r\n");
  //  var headers = lines[0].split(",");   //"age-group6th column:ag-group,13th column :literate person
    var line;
    var value6th;
    var valuye12thh;
      //  console.log("age-group"+headers[5]+" total-persons"+headers[12]);

        //console.log(dataObj);
     var len = lines.length;
     var ageGrp="";
        for(var i=1;i<len;i++){
                 var line = lines[i].split(",");
                 value6th =line[5];
                 valuye12th=line[12];
                 ageGrp = value6th;
                 if(value6th == "7" || value6th == "8" || value6th == "9"){
                      ageGrp ="7-9";
                  }
                else if(value6th == "10" || value6th == "11" || value6th == "12" || value6th == "13" || value6th == "14"){
                   // console.log("true");
                     ageGrp ="10-14";
                 }

                else if(value6th == "15" || value6th == "16" || value6th == "17" || value6th =="18" || value6th == "19"){
                  ageGrp ="15-19";
                  //console.log("true");
                }
                //console.log(ageGrp);
                switch (ageGrp) {
                 case "0-6":   setData(0,ageGrp,valuye12th);
                                break;
                 case "7-9":   setData(1,ageGrp,valuye12th);
                                break;
                 case "10-14":   setData(2,ageGrp,valuye12th);
                               break;
                 case "15-19":   setData(3,ageGrp,valuye12th);
                                 break;
                 case "20-24":   setData(4,ageGrp,valuye12th);
                                 break;
                 case "25-29":   setData(5,ageGrp,valuye12th);
                                 break;
                 case "30-34":    setData(6,ageGrp,valuye12th);
                                 break;
                 case "35-39":    setData(7,ageGrp,valuye12th);
                                 break;
                 case "40-44":   setData(8,ageGrp,valuye12th);
                                 break;
                 case "45-49":    setData(9,ageGrp,valuye12th);
                                 break;
                case "50-54":   setData(10,ageGrp,valuye12th);
                                break;
                case "55-59":    setData(11,ageGrp,valuye12th);
                                break;
                case "60-64":  setData(12,ageGrp,valuye12th);
                                break;
                case "65-69":   setData(13,ageGrp,valuye12th);
                                break;
                case "70-74":   setData(14,ageGrp,valuye12th);
                                break;
                case "75-79":  setData(15,ageGrp,valuye12th);
                               break;
                case "80+":    setData(16,ageGrp,valuye12th);
                                console.log(ageGrp);
                                break;
                default:      console.log("default");



              }   // end switch

          } // end for loop
      //  console.log("i..."+i);
          //console.log(JSON.stringify(csvData));
         fs.writeFile("agw_wise.json",JSON.stringify(csvData),"utf-8");
 }
   function  setData (index,ageGrp,total) {
              csvData[index].age_group=ageGrp;
              var temp1 = parseInt(csvData[index].totalLiterate);
              var temp2 = parseInt(total);
              csvData[index].totalLiterate =temp1+temp2;
  }  var count=0;


  function stateWise(data){
           count++;
           //converting string into line
                    var lines = data.toString().split("\r\n");
                    var len =lines.length;
                    var headers = lines[0].split(",");   //4th column:ag-group,40thth column :literate person
                    var line;
                    var areaName;
                    var  graduatePersons=0;
                  // console.log(headers[39]);
                   //console.log("age-group"+headers[3]+" total-persons"+headers[39]);

                              for(var i=1;i<len-1;i=i+87){         // each states has 87 rows
                                         var line = lines[i].split(",");
                                         areaName =line[3].slice(8);
                                      //   console.log(areaName);
                                         graduatePersons=line[39];
                                        // console.log(graduatePersons);
                                         totalGraduateMales=totalGraduateMales+parseInt(line[40]);
                                         totalGraduateFemales=totalGraduateFemales+parseInt(line[41]);
                                      //  // console.log(areaName);
                                           var j = parseInt(line[1]);

                                        setDataStateWise (j-1,graduatePersons,areaName)
                                          // console.log(totalGraduateFemales);

                                  }

                                  //  console.log(line[41]);

                        //  console.log(JSON.stringify(csvDataStateWise));
                          csvDataGenderWise[0].totalGraduate=totalGraduateMales;
                          csvDataGenderWise[1].totalGraduate=totalGraduateFemales;
                        //  console.log(JSON.stringify(csvDataGenderWise));
                         fs.writeFile("statewise.json",JSON.stringify(csvDataStateWise),"utf-8");
                         fs.writeFile("genderWise.json",JSON.stringify(csvDataGenderWise),"utf-8");
  } // csvToJson end


 function  setDataStateWise (index,graduatePersons,areaName) {

             csvDataStateWise[index].State=areaName;
             var temp1 = parseInt(csvDataStateWise[index].totalGraduate);
             var temp2 = parseInt( graduatePersons);
             csvDataStateWise[index].totalGraduate =temp1+temp2;
}


   function educationLevel(data){

             //converting string into line
                      var lines = data.toString().split("\r\n");
                      var len =lines.length;
                      // var headers = lines[0].split(",");   //4th column:ag-group,40thth column :literate person
                      // var line;
                      // var areaName;
                      // var literatePersons=0;
                             setHeaders(data);
                              //  var j=0;
                                for(var i=1,j=0;i<len-1;i=i+87){         // each states has 87 rows
                                           var line = lines[i].split(",");
                                            csvEducationLevel[0].total = csvEducationLevel[0].total +parseInt(line[15]);
                                            csvEducationLevel[1].total = csvEducationLevel[1].total +parseInt(line[18]);
                                            csvEducationLevel[2].total = csvEducationLevel[2].total +parseInt(line[21]);
                                            csvEducationLevel[3].total = csvEducationLevel[3].total +parseInt(line[24]);
                                            csvEducationLevel[4].total = csvEducationLevel[4].total +parseInt(line[27]);
                                            csvEducationLevel[5].total = csvEducationLevel[5].total +parseInt(line[30]);
                                            csvEducationLevel[6].total = csvEducationLevel[6].total +parseInt(line[33]);
                                            csvEducationLevel[7].total = csvEducationLevel[7].total +parseInt(line[36]);
                                            csvEducationLevel[8].total = csvEducationLevel[8].total +parseInt(line[39]);
                                            csvEducationLevel[9].total = csvEducationLevel[9].total +parseInt(line[42]);

                       }
                                   //console.log(JSON.stringify(csvEducationLevel));
                                   fs.writeFile("EducationLevel.json",JSON.stringify(csvEducationLevel),"utf-8");
    } // csvToJson end


   function  setHeaders(data){
        var lines = data.toString().split("\r\n");
        var headers = lines[0].split(",");
       for(var i=0,j=15;i<10;i++,j=j+3){
           csvEducationLevel[i].EducationLevel = headers[j].split("-")[1];
           console.log( headers[j]);
        }
   }
