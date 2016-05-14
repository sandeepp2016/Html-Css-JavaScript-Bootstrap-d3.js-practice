var x;
var y;
var xAxis;
var svg;
var yAxis;
var color;
var margin = {top: 20, right: 140, bottom: 150, left: 40},
    width =  1024 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// setting layout for chart -- hieght -width margin etc..
function setLayout() {

   x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

   y = d3.scale.linear()
      .range([height, 0]);
   color = d3.scale.ordinal()
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
   xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
    // .ticks(10, "%");

     svg = d3.select("#charts").append("svg")
      .attr("width", width + margin.left + margin.right+20)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" +80 + "," + margin.top + ")");
}
function setLayout2() {

   x = d3.time.scale()
      .range([0, width]);

   y = d3.scale.linear()
      .range([height, 0]);

   color = d3.scale.category10();

    xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

     svg = d3.select("#charts").append("svg")
       .attr("width", width + margin.left + margin.right+20)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform", "translate(" +80 + "," + margin.top + ")");
}

function lifeExpectencyStakedBar() {

    document.getElementById("charts").innerHTML = "";
     setLayout();

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
    //  console.log(Object.keys(d));
      var a = parseFloat(d.y1)-parseFloat(d.y0);
      return "<strong>"+d.gname+":</strong> <span style='color:red'>" +a+ "</span>";
    })

      svg.call(tip);

    d3.json("json/lifeExpectency.json", function(error, data) {
    if (error) throw error;

    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "country"; }));

    data.forEach(function(d) {
      var y0 = 0;
      d.gender = color.domain().map(function(gname) { return {gname: gname, y0: y0, y1: y0 += +d[gname]}; });
      d.total = d.gender[d.gender.length - 1].y1;
    });

    data.sort(function(a, b) { return b.total - a.total; });

    x.domain(data.map(function(d) { return d.country; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })+40]);

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
        .text("lifeExpectency");

        svg.append("text")
              .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
              .attr("transform", "translate("+ (width/2) +","+(height+60)+")")  // text is drawn off the screen top left, move down and out and rotate
              .text("COUNTRY");

    var country = svg.selectAll(".country")
        .data(data)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.country) + ",0)"; });

    country.selectAll("rect")
        .data(function(d) { return d.gender; })
      .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return color(d.gname); })
        .on('mouseover', tip.show)
         .on('mouseout', tip.hide);

    var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width-20)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width-30)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

  })
}

    function indiaBirthandDeathRateYears(){

      document.getElementById("charts").innerHTML = "";
      setLayout2();
      var line = d3.svg.line()
          .interpolate("basis")
          .x(function(d) { ;return x(d.year); })
          .y(function(d) { ;return y(d.rate); });

   var  parseDate = d3.time.format("%Y").parse;
  d3.json("json/indiaBirthAndDeathRate.json", function(error, data) {

  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Year"; }));

  data.forEach(function(d) {
    d.Year = parseDate(d.Year);
    d.Birth_Rate = parseFloat(d.Birth_Rate);
    d.Death_Rate = parseFloat(d.Death_Rate);
  });
 var key =[];
  var rates = color.domain().map(function(name) {
        key = name;
    return {
       name: name,
      values: data.map(function(d) {
        return {year: d.Year, rate: +d[name]};
      })
    };
  });
  console.log(key);
  x.domain(d3.extent(data, function(d) { return d.Year; }));

  y.domain([
    d3.min(rates, function(c) { return d3.min(c.values, function(v) { return v.rate; }); }),
    d3.max(rates, function(c) { return d3.max(c.values, function(v) { return v.rate; }); })+15
  ]);

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
      .text("Rate");

  var bdRate = svg.selectAll(".bdRate")
      .data(rates)
    .enter().append("g")
      .attr("class", "bdRate");

  bdRate .append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) {
        return color(d.name); });

      var legend = svg.selectAll(".legend")
          .data(color.domain().slice().reverse())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width+80)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", width+40)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(key) {return key+"";});

});
}



function topFiveCountryWithHighestLifeExpectency(){

  document.getElementById("charts").innerHTML = "";
   setLayout();

   var tip = d3.tip()
   .attr('class', 'd3-tip')
   .offset([-10, 0])
   .html(function(d) {
   return "<strong> Life expectancy:</strong> <span style='color:red'>" +d.lifeExpAtBirth + "</span>";
 })
  svg.call(tip);
     d3.json("json/topFiveWithHLEAtBirth.json", function(error, data) {

   if (error) throw error;

    data.forEach(function(d){
    d.lifeExpAtBirth= +d.lifeExpAtBirth;
     console.log(d.lifeExpAtBirth);
   });

   x.domain(data.map(function(d) { return d.country; }));
   y.domain([0, d3.max(data, function(d) { return d.lifeExpAtBirth; })+20]);

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
            .attr("transform", "translate("+ (width/2) +","+(height+80)+")")  // text is drawn off the screen top left, move down and out and rotate
            .text("Country");

   svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.country); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.lifeExpAtBirth); })
      .attr("height", function(d) { return height - y(d.lifeExpAtBirth);})
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
   });
}
