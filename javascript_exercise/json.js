
/*var tetx ='{"employees":['+

            '{"firstName":"sandeep","lastName":"patel"},'+
            '{"firstName":"rahul","lastName":"raj"}]}'

*/
(
function readJsonText(){

  var text ='{"employees":['+

              '{"firstName":"sandeep","lastName":"patel"},'+
              '{"firstName":"rahul","lastName":"raj"}'+']}';
  var obj = JSON.parse(text);
//  var employees = obj["employees"];
  var employees = obj.employees;
  // console.log(employees.length);
  // console.log(employees[0].firstName);
  for(var key in employees)
    console.log(employees[key].firstName);
}());
