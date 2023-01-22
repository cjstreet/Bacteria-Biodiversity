function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h4").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Deliverable 1: 3. Create a variable that holds the samples array. 
      let samplesArr = data.samples;
      console.log(samplesArr);
    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = samplesArr.filter(sampleObj => sampleObj.id == sample)
      console.log(resultArray);
    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
       var mArr = data.metadata;
       console.log(mArr);
       var metaArray = mArr.filter(sampleObj => sampleObj.id == sample);
       console.log(metaArray);
    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
       var firstSample = resultArray[0];
       console.log(firstSample);
    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
       var firstSampleMeta = metaArray[0];
       //console.log("First Sample: " + firstSampleMeta);
    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
       var result_otu_ids = firstSample.otu_ids;
       var result_otu_labels = firstSample.otu_labels;
       var result_sample_values = firstSample.sample_values;
       console.log(result_sample_values);
       console.log(result_otu_ids);
    // Deliverable 3: 3. Create a variable that holds the washing frequency.
        var washFreq = firstSampleMeta.wfreq;
        washFreq = parseFloat(washFreq);
    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    
       var topTen_ids = result_otu_ids.slice(0,10).reverse();
       var topTen_values = result_sample_values.slice(0,10).reverse();;
        console.log("ids" + topTen_ids);
        console.log("values" + topTen_values);
       var yticks = topTen_ids.map(function(num){
        return "OTU_ID" + num;
    });
    // Deliverable 1: 8. Create the trace for the bar chart. 
    var barData = [ {
      x: topTen_values,
      y: yticks,
      text: result_otu_labels,
      type: 'bar',
      orientation: 'h'
    } ];
    // Deliverable 1: 9. Create the layout for the bar chart. 
    var barLayout = { 
       title: {text: "<b>Top Ten Bacterial Species Found</b>", font: { size: 20}},
       xaxis: { title: "<b>Sample Values</b>", tickwidth: 3, tickcolor: "black" },
       font: { color: "black", family: "Arial" },
       plot_bgcolor: "#D3D3D3",
       paper_bgcolor: "#D3D3D3"
      
    };
     // Deliverable 1: 10. Use Plotly to plot the data with the layout. 
     Plotly.newPlot('bar', barData, barLayout);
  
    // Deliverable 2: 1. Create the trace for the bubble chart.
    var trace1 = {
      x: result_otu_ids,
      y: result_sample_values,
      text: result_otu_labels,
      mode: 'markers',
      marker: {
        color: result_otu_ids,
        opacity: [1, 0.8, 0.6, 0.4],
        size: result_sample_values
      }
    };
    var dataScatter = [trace1];
    // Deliverable 2: 2. Create the layout for the bubble chart.
    var layout = {
      width: 1000,
      height: 700,
      title: {text: '<b>Bacteria Cultures Per Sample</b>', font: {size: 22}},
      xaxis: { title: "<b>OTU IDS</b>",
        linecolor: 'black',
        linewidth: 2,
        mirror: true
      },
      yaxis: {
        linecolor: 'black',
        linewidth: 2,
        mirror: true
       },
      borderwidth: 4,
      bordercolor: "#ffcba4",
      hovermode:'closest',
      paper_bgcolor: "#D3D3D3",
      margin: {
        l: 50,
        r: 50,
        t: 100,
        b: 100
      },
      font: { color: "black", family: "Arial" },
      showlegend: false
    };
    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', dataScatter, layout);
    // Deliverable 3: 4. Create the trace for the gauge chart.
    var gaugeTrace = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: washFreq,
        
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
          bar: { color: "black" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "#00e600" },
            { range: [8, 10], color: "#009900" },
          ],
        }
      }
    ];
    // Deliverable 3: 5. Create the layout for the gauge chart.
    var layout2 = {
      width: 400,
      height: 400,
      title: { text: "<b>Sample Site Washing Frequency</b> <br> Scrubs Per Week", font: { size: 22} },
      margin: { t: 100, r: 25, l: 25, b: 100 },
      paper_bgcolor: "#D3D3D3",
      font: { color: "black", family: "Arial" }
    };
    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeTrace, layout2);
  });
}