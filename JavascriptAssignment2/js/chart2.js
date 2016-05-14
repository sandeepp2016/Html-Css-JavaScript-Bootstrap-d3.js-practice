var x;
var y;
var xAxis;
var svg;
var yAxis;
var margin = {top: 20, right: 20, bottom: 150, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// setting layout for chart -- hieght -width margin etc..
function setLayout() {

   x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

   y = d3.scale.linear()
      .range([height, 0]);

   xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
    // .ticks(10, "%");

    svg = d3.select("#charts").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" +80 + "," + margin.top + ")");
}

//-------------------------------------------------------stateWiseChart--------------------------------------------------
function stateWiseChart() {
   document.getElementById("charts").innerHTML = "";
   setLayout();
  console.log("hello");


  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
  return "<strong>Literate:</strong> <span style='color:red'>" + d.totalGraduate + "</span>";
  })

  svg.call(tip);

 d3.json("json/statewise.json", function(error, data) {

  if (error) throw error;
    data.forEach(function(d){
    d.totalGraduate= +d.totalGraduate;
  //  console.log(d.totalLiterate);
  });

  x.domain(data.map(function(d) { return d.State; }));
  y.domain([0, d3.max(data, function(d) { return d.totalGraduate; })+2000000]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis).selectAll("text").attr("transform","rotate(80)").attr("x","20").style("text-anchor", "start");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
     .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("totalGraduate");

      svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (width/2) +","+(height+60)+")")  // text is drawn off the screen top left, move down and out and rotate
            .text("State");

   svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.State); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.totalGraduate); })
      .attr("height", function(d) { return height - y(d.totalGraduate)})
       .on('mouseover', tip.show)
       .on('mouseout', tip.hide);
});
}
//-------------------------------------------------------stateWiseChart- end--------------------------------------------------

//------------------------------------education level-------------------------------------------------

 function educationLevel() {

  document.getElementById("charts").innerHTML = "";
  setLayout();

  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
  return "<strong>Literate:</strong> <span style='color:red'>" + d.total + "</span>";
  })

  svg.call(tip);

  d3.json("json/EducationLevel.json", function(error, data) {
   var i = 0;
   var educationLevel = [];
   if (error) throw error;
     data.forEach(function(d){
     d.total= +d.total;
     educationLevel.push(d.EducationLevel);
     d.EducationLevel = String.fromCharCode(65+i)
     i++;
     //console.log(educationLevel);
   });

   x.domain(data.map(function(d) { return d.EducationLevel; }));
   y.domain([0, d3.max(data, function(d) { return d.total; })+20000000]);

   svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis).selectAll("text")   //.attr("transform","rotate(80)").attr("x","20").style("text-anchor", "start");

   svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
      .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 6)
       .attr("dy", ".71em")
       .style("text-anchor", "end")
       .text("total");

       svg.append("text")
             .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
             .attr("transform", "translate("+ (width/2) +","+(height+60)+")")  // text is drawn off the screen top left, move down and out and rotate
             .text("EducationLevel");

    svg.selectAll(".bar")
       .data(data)
     .enter().append("rect")
       .attr("class", "bar")
       .attr("x", function(d) { return x(d.EducationLevel); })
       .attr("width", x.rangeBand())
       .attr("y", function(d) { return y(d.total); })
       .attr("height", function(d) { return height - y(d.total)})
       .on('mouseover', tip.show)
       .on('mouseout', tip.hide);



       var legend = svg.selectAll(".legend")
      .data(educationLevel)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {  return "translate(0," + i * 20 + ")";});

     legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d ,i) {
              return String.fromCharCode(65+i)+"---"+d;
       });


 });
} // fucntion end educationLevel
//-------------------------------------------------------AgeWiseChart--------------------------------------------------
  function ageWiseChart(){
    document.getElementById("charts").innerHTML = "";
    setLayout();

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
    return "<strong>Literate:</strong> <span style='color:red'>" + d.totalLiterate + "</span>";
  })
   svg.call(tip);
      d3.json("json/age_wise.json", function(error, data) {

    if (error) throw error;

     data.forEach(function(d){
     d.totalLiterate= +d.totalLiterate
      console.log(d.totalLiterate);
    });

    x.domain(data.map(function(d) { return d.age_group; }));
    y.domain([0, d3.max(data, function(d) { return d.totalLiterate; })+50000000]);

    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis);

    svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
      .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 6)
       .attr("dy", ".71em")
       .style("text-anchor", "end")
       .text("totalLiterate");

       svg.append("text")
             .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
             .attr("transform", "translate("+ (width/2) +","+(height+60)+")")  // text is drawn off the screen top left, move down and out and rotate
             .text("Age-Group");

    svg.selectAll(".bar")
       .data(data)
     .enter().append("rect")
       .attr("class", "bar")
       .attr("x", function(d) { return x(d.age_group); })
       .attr("width", x.rangeBand())
       .attr("y", function(d) { return y(d.totalLiterate); })
       .attr("height", function(d) { return height - y(d.totalLiterate);})
       .on('mouseover', tip.show)
       .on('mouseout', tip.hide);
    });

}
function GenderWise(){
      document.getElementById("charts").innerHTML = "";
    var radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.totalGraduate; });

    var svg = d3.select("#charts").append("svg")
        .attr("width", width)
        .attr("height", height)
       .append("g")
       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
     var total=0;
    d3.json("json/genderWise.json", function(error, data) {
      if (error) throw error;
      data.forEach(function(d){
      d.totalGraduate= +d.totalGraduate;
      total = total+  d.totalGraduate;
     console.log(d.totalGraduate);
    });
      var g = svg.selectAll(".arc")
          .data(pie(data))
         .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.Gender); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) {
                                var per = (d.data.totalGraduate/total)*100;
                                per = Math.round(per);
                                return d.data.Gender+": "+ per+"%";

                 });
    });

}
