
function refreshData() {
  var xmlhttp = new XMLHttpRequest();
  var url = "data/";
  var start_date = document.getElementById('start_date').value;
  var end_date = document.getElementById('end_date').value;
  var params = "start_date=" + start_date +  "&end_date=" + end_date;

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var marsdata = JSON.parse(xmlhttp.responseText);
        drawChart(marsdata);
    }
  }
  xmlhttp.open("GET", url+"?"+params, true);
  xmlhttp.send();  
}

//google.setOnLoadCallback(drawChart);
function drawChart(marsdata) {
  console.log(marsdata);

  var temp_data = new google.visualization.DataTable();
  temp_data.addColumn('date', 'Day');
  temp_data.addColumn('number', 'Maximum Temperature');
  temp_data.addColumn('number', 'Minimum Temperature');

  var press_data = new google.visualization.DataTable();
  press_data.addColumn('date', 'Day');
  press_data.addColumn('number', 'Pressure');
  

  
  $.each(marsdata, function(i, point) {
    temp_data.addRow([new Date(point.terrestrial_date), point.max_temp, point.min_temp]);
    press_data.addRow([new Date(point.terrestrial_date), point.pressure]);
    
  })
  //console.log(temp_data);
  var temp_options = {
    title: 'Maximum and minimum temperatures (Celsius)',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: { format: 'd.M.yy'},
  };

  var press_options = {
    title: "Pressure (Pascal)",
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: { format: 'd.M.yy'},
  };


  var temp_chart = new google.visualization.LineChart(document.getElementById('temp_chart'));
  var press_chart = new google.visualization.LineChart(document.getElementById('press_chart'));


  temp_chart.draw(temp_data, temp_options);
  press_chart.draw(press_data, press_options);
}



$(document).ready(function() {
    if ( $('.marschart').children().length == 0 ) {
      $('.marschart').append("<p>Select timespan and hit refresh!</p>")
    }
});