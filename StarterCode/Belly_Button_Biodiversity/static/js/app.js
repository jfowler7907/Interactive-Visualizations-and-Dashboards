function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data
    var bubbleChart1 = {
      x: ["otu_ids"],
      y: ["sample_values"],
      mode: 'markers',
      marker: {
        size: ["sample_values"],
        color: ["otu_ids"],
      text: ["otu_labels"],
      hovermode: "closest"  
      }
    };
    
    var data = [bubbleChart1];
    
    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('plot', data, layout);



    // @TODO: Build a Pie Chart
    // HINT: You will need to uxse slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
   
    data.sort(function(a,b) {
      return parseFloat(b.belly_button_data)-parseFloat(a.belly_button_data);
    });

    data = data.slice(0,10);


    var pieChart1 = {
      labels: ["otu_ids"],
      values: ["sample_values"],
      type: 'pie'
    };

    var data = [pieChart1];

    var layout = {
      title: "'Pie' Chart",
      text: ['otu_labels'],
      showlegend: true
    }

    Plotly.newPlot("plot", data, layout);
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
