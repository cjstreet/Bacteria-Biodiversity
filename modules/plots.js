console.log(cityGrowths);
// 1. Sort the cities in descending order of population growth.
// 2. Select only the top five cities in terms of growth.
// 3. Create separate arrays for the city names and their population growths.
// 4. Use Plotly to create a bar chart with these arrays.

function init() {
  data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] 
  }];
  Plotly.newPlot("plot", data);
};

d3.selectAll("#dropdownMenu").on("change", updatePlotly);
function updatePlotly() {
  var dropdownMenu = d3.select("#dropdownMenu");
  var dataset = dropdownMenu.property("value");

  var xData = [1, 2, 3, 4, 5];
  var yData = [];

  if (dataset === 'dataset1') {
    yData = [1, 2, 4, 8, 16];
  };

  if (dataset === 'dataset2') {
    yData = [1, 10, 100, 1000, 10000];
  };

  var trace = {
    x: [xData],
    y: [yData],
  };
  Plotly.restyle("plot", trace);
};

init();

  // using d3.json() by first placing an API call 
  //  Code in index.html    
  //<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.7/d3.min.js"></script>
 // <script src="spaceX.js"></script>

 //code in spaceX.js
 // const url = "https://api.spacexdata.com/v2/launchpads"   
 // d3.json(url).then(receivedData => console.log(receivedData));

 // use indexing to retrieve only the first element in the array returned from the API call.
 //d3.json(url).then(spaceXResults => console.log(spaceXResults[0]));
 // d3.json(url).then(spaceXResults => console.log(spaceXResults[0].full_name));

 //d3.json(url).then(spaceXResults => console.log(spaceXResults[0].location.latitude);

 


