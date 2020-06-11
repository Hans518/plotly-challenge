// Let's get take a look at the sample data
var sampleData = "../../samples.json";

function seeData() {
  d3.json(sampleData).then(function(data) {
    console.log(data);
  });
}

// Init function that populates the first name in the list by hard coding it into the function. 
function init(val){
  console.log(val);
  getMetaData(940);
  getSampless(940);
  bubbleChart(940);
}

// Function to detect the change from index.html
function optionChanged(val){
  console.log(val);
  getMetaData(val);
  getSampless(val);
  bubbleChart(val);
}

// Load the names into a function to populate dropdown. 
function getIDs(){
  d3.json(sampleData).then(function(data) {
    var names = data.names;
    var sel = document.getElementById('selDataset');
    for(var i=0; i < names.length; i++){
      var opt = document.createElement('option');
      opt.innerHTML = names[i];
      opt.value = names[i];
      sel.appendChild(opt);
    };
  });
}

// Extract the test subject array and add to variables
function getMetaData(val) {
  d3.json(sampleData).then(function(data) {
      
      var metadata = data.metadata;

      for (var i=0; i<metadata.length; i++){
        if (metadata[i].id == val) {
          var id = metadata[i].id;
          var ethnicity = metadata[i].ethnicity;
          var gender = metadata[i].gender;
          var age = metadata[i].age;
          var location = metadata[i].location;
          var wfreq = metadata[i].wfreq;
          }

        }
      // Append test subject data to panel.   
      var pbody = d3.select(".panel-body");
      pbody.selectAll("h6").remove();
      pbody.append("h6").text(`ID: ${id}`); 
      pbody.append("h6").text(`Ethnicity: ${ethnicity}`);
      pbody.append("h6").text(`Gender: ${gender}`);
      pbody.append("h6").text(`Age: ${age}`);
      pbody.append("h6").text(`Location: ${location}`);
      pbody.append("h6").text(`Wash Frequency: ${wfreq}`); 
  });   
  };

// Extract sample data   
function getSampless(val) {
  
  d3.json(sampleData).then(function(data){

    var samples = data.samples;
  
    for (var j=0; j<samples.length; j++){
      if (samples[j].id == val) {
        var otu_ids = samples[j].otu_ids;
        var sample_values = samples[j].sample_values;
        var otu_labels = samples[j].otu_labels;
        var otu_ids_g = otu_ids.slice(0, 10).map(el => 'otu ' + el);
        var sample_values_g = sample_values.slice(0,10);
        var otu_labels_g = otu_labels.slice(0,10);
      };
    }
    // Bar Plot
    var trace1 = [{
      type: 'bar',
      x: sample_values_g,
      y: otu_ids_g,
      orientation: 'h'
    }];
    var layout = {yaxis: {
      autorange: 'reversed',
    }};
    Plotly.newPlot("bar", trace1, layout);
  });
}

// Bubble plot
function bubbleChart(val) {

  d3.json(sampleData).then(function(data){
    var samples = data.samples;
    
    for (var b=0; b<samples.length; b++){
      if (samples[b].id == val) {
        var otu_ids = samples[b].otu_ids;
        var sample_values = samples[b].sample_values;
        var otu_labels = samples[b].otu_labels;
      };

    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      
      mode: 'markers',
        marker: {
         size: sample_values,
         color: otu_ids,
         colorscale: 'Earth'      
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Marker Size and Color',
      showlegend: false,
      height: 600,
      width: 1200
    };
    
    Plotly.newPlot("bubble", data, layout);
  
  }
})
}


init();
//seeData();
getIDs();
//bubbleChart();
//getMetaData();
//getSampless();
