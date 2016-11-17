// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart','bar']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChartSlice);

// http://stackoverflow.com/a/5931227
function drawPieChart(data) {
  google.charts.setOnLoadCallback(function() {
    doDrawPieChart(data);
  });
}

function drawScatterChart(data) {
  google.charts.setOnLoadCallback(function() {
    doDrawScatterChart(data);
  });
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function doDrawPieChart(chartData) {
  // Create the data table.
  var data = new google.visualization.DataTable();

  var columns = chartData['columns'];

  for (var i = 0; i < columns.length; i++) {
    var column = columns[i];
    data.addColumn(column['type'], column['label']);
  }

  var rows = chartData['rows'];

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    data.addRows([[row['name'], row['value']]]);
  }

  // Set chart options
  var options = {
    'title': chartData['title'],
    'width': 450,
    'height': 300
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function doDrawScatterChart(chartData) {
  var data = google.visualization.arrayToDataTable([
                                                   ['Age', 'Weight'],
                                                   [ 8,      12],
                                                   [ 4,      5.5],
                                                   [ 11,     14],
                                                   [ 4,      5],
                                                   [ 3,      3.5],
                                                   [ 6.5,    7]
                                                   ]);

  var options = {
    title: 'Age vs. Weight comparison',
    hAxis: {title: 'Age', minValue: 0, maxValue: 15},
    vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
    legend: 'none'
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('scatterchart_div'));

  chart.draw(data, options);
}

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
