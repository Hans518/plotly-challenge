// Let's get take a look at the sample data
var sampleData = "samples.json";

function seeData() {
  d3.json(sampleData).then(function(data) {
    console.log(data);
  });
}
  
function optionChanged(val){
  //console.log(val);
  getMetaData(val);
  getSampless(val);
  bubbleChart();
}

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
    // console.log(names);
    // console.log(opt);
    // console.log(sel);
  });
}
function getMetaData(val) {

  d3.json(sampleData).then(function(data) {
      //console.log(data);
      
      var metadata = data.metadata;
      //console.log(samples);
      //console.log(metadata);
      var i;
      //var p_id = "1265"; 

      for (i=0; i<metadata.length; i++){
        if (metadata[i].id == val) {
          // var dem_info = Object.entries(metadata[i]);
          // dem_info.array.forEach(element => {});
          var id = metadata[i].id;
          var ethnicity = metadata[i].ethnicity;
          var gender = metadata[i].gender;
          var age = metadata[i].age;
          var location = metadata[i].location;
          var wfreq = metadata[i].wfreq;
          
          // console.log(dem_info); 
          }

        }
      //console.log(`found a match ${id} ${ethnicity} ${gender} ${age} ${location} ${wfreq}`);
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
  


function getSampless(val) {
  
  d3.json(sampleData).then(function(data){

    var samples = data.samples;
    var j;
    //var p_id = "1265"

    for (j=0; j<samples.length; j++){
      if (samples[j].id == val) {
        //console.log(`we have a match ${samples[j].id}`);
      
        var otu_ids = samples[j].otu_ids;
        var sample_values = samples[j].sample_values;
        var otu_labels = samples[j].otu_labels;

        var otu_ids_g = otu_ids.slice(0, 10).map(el => 'otu ' + el);
        var sample_values_g = sample_values.slice(0,10);
        var otu_labels_g = otu_labels.slice(0,10);
      };
    }

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

    // console.log(otu_ids);
    // console.log(sample_values);
    // console.log(otu_labels);

    // console.log(otu_ids_g);
    // console.log(sample_values_g);
    // console.log(otu_labels_g);
  });
}

function bubbleChart() {
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 11, 12, 13],
    mode: 'markers',
    marker: {
      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
      opacity: [1, 0.8, 0.6, 0.4],
      size: [40, 60, 80, 100]
    }
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Marker Size and Color',
    showlegend: false,
    height: 600,
    width: 600
  };
  
  Plotly.newPlot("bubble", data, layout);
}  



seeData();
getIDs();
bubbleChart();
//getMetaData();
//getSampless();
