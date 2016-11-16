// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart','bar']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChart3D);
google.charts.setOnLoadCallback(drawChartSlice);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
               ['Mushrooms', 3],
               ['Onions', 1],
               ['Olives', 1],
               ['Zucchini', 1],
               ['Pepperoni', 2]
               ]);

  // Set chart options
  var options = {
    'title': 'How Much Pizza I Ate Last Night',
    'width': 450,
    'height': 300
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function drawChart3D() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
               ['Mushrooms', 3],
               ['Onions', 1],
               ['Olives', 1],
               ['Zucchini', 1],
               ['Pepperoni', 2]
               ]);

  // Set chart options
  var options = {
    'title': 'How Much Pizza I Ate Last Night',
    'is3D': true,
    'width': 450,
    'height': 300
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('barchart_div'));
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
