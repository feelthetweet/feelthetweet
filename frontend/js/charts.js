// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart','bar']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChartSlice);

// http://stackoverflow.com/a/5931227
function drawPieChart(data) {
  google.charts.setOnLoadCallback(function() {
    var chartData = prepareChartData(data);
    doDrawPieChart(chartData, data);
  });
}

function drawBarChart(data) {
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

function drawChartSlice() {
  var data = google.visualization.arrayToDataTable([
                                                   ['Language', 'Speakers (in millions)'],
                                                   ['Assamese', 13], ['Bengali', 83], ['Bodo', 1.4],
                                                   ['Dogri', 2.3], ['Gujarati', 46], ['Hindi', 300],
                                                   ['Kannada', 38], ['Kashmiri', 5.5], ['Konkani', 5],
                                                   ['Maithili', 20], ['Malayalam', 33], ['Manipuri', 1.5],
                                                   ['Marathi', 72], ['Nepali', 2.9], ['Oriya', 33],
                                                   ['Punjabi', 29], ['Sanskrit', 0.01], ['Santhali', 6.5],
                                                   ['Sindhi', 2.5], ['Tamil', 61], ['Telugu', 74], ['Urdu', 52]
                                                   ]);

  var options = {
    title: 'Indian Language Use',
    legend: 'none',
    pieSliceText: 'label',
    slices: {  4: {offset: 0.2},
    12: {offset: 0.3},
    14: {offset: 0.4},
    15: {offset: 0.5},
  },
};

var chart = new google.visualization.PieChart(document.getElementById('piechart'));
chart.draw(data, options);
}
