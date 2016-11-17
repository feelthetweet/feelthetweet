// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', processTweets);

function processTweets() {
  var tweetsData = tweets['tweets'];

  var tweetEmotions = prepareTweetsByEmotion(tweetsData);
  drawPieChart(tweetEmotions);

  drawScatterChart();
}

function prepareTweetsByEmotion(tweets) {
  var tweetEmotions = {
    rows: [],
    title: 'Tweets by emotion',
    columns: [
    {
      label: 'emotions',
      type: 'string'
    },
    {
      label: 'tweets',
      type: 'number'
    }]
  };

  for (var i = 0; i < tweets.length; i++) {
    var tweet = tweets[i];
    var rows = tweetEmotions['rows'];
    var rowFound = false;
    var rowIndex;

    for (var j = 0; j < rows.length; j++) {
      var row = rows[j];
      if (row['name'] === tweet['emotion']) {
        rowFound = true;
        rowIndex = j;
        row['value'] += 1;
        break;
      }
    }
    if (!rowFound) {
      rows.push(
      {
        name: tweet['emotion'],
        value: 1
      });
    }
  }

  return tweetEmotions;
}

function prepareRetweetsByEmotions() {
  // TODO
}
