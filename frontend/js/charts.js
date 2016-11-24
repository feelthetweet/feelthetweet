// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart','bar']});

// http://stackoverflow.com/a/5931227
function drawPieChart(data) {
  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(function() {
    var chartData = prepareChartData(data);
    doDrawPieChart(chartData, data);
  });
}

function drawBarChart(data) {
  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(function() {
    var chartData = prepareChartData(data);
    doDrawBarChart(chartData, data);
  });
}

function prepareChartData(data) {
  // Create the data table.
  var dataTable = new google.visualization.DataTable();
  var columns = data['columns'];

  for (var i = 0; i < columns.length; i++) {
    var column = columns[i];
    dataTable.addColumn(column['type'], column['label']);
  }

  var rows = data['rows'];

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    dataTable.addRows([[row['name'], row['value']]]);
  }

  return dataTable;
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function doDrawPieChart(chartData, data) {
  // Set chart options
  var options = {
    'title': data['title'],
    'width': 450,
    'height': 300
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('piechart_div'));
  chart.draw(chartData, options);
}

function doDrawBarChart(chartData, data) {
  // Set chart options
  var options = {
    'title': data['title'],
    'width': 500,
    'height': 300
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.BarChart(document.getElementById('barchart_div'));
  chart.draw(chartData, options);
};

