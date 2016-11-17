// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', processTweets);

function processTweets() {
  var tweets = tweetsData['tweets'];

  var tweetEmotions = prepareTweetsByEmotion(tweets);
  drawPieChart(tweetEmotions);

  var retweetsByEmotions = prepareEmotionsByRetweets(tweets);
  drawBarChart(retweetsByEmotions);
}

function prepareTweetsByEmotion(tweets) {
  var tweetEmotions = {
    title: 'Tweets by emotion',
    rows: populateRows(tweets, 'emotion'),
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

  return tweetEmotions;
}

function prepareEmotionsByRetweets(tweets) {
  var tweetEmotions = {
    title: 'Retweets by emotion',
    rows: populateRows(tweets, 'emotion', 'retweet_count'),
    columns: [
    {
      label: 'emotions',
      type: 'string'
    },
    {
      label: 'retweets',
      type: 'number'
    }]
  };

  return tweetEmotions;
}

function populateRows(tweets, rowIdentifier, rowValue) {
  var rows = [];
  for (var i = 0; i < tweets.length; i++) {
    var tweet = tweets[i];
    var rowFound = false;
    var rowIndex;

    for (var j = 0; j < rows.length; j++) {
      var row = rows[j];
      if (row['name'] === tweet[rowIdentifier]) {
        rowFound = true;
        rowIndex = j;
        row['value'] += rowValue ? tweet[rowValue] : 1;
        break;
      }
    }
    if (!rowFound) {
      rows.push(
      {
        name: tweet[rowIdentifier],
        value: rowValue ? tweet[rowValue] : 1
      });
    }
  }

  return rows;
}
