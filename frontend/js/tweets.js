// On init, get the tweets with the hashtag "elte"
getTweetsByHashtag('elte');

function getTweetsByHashtag(hashtag) {
  var tweets = tweetsData['tweets'];

  hashtagFilter = {
    callback: hasHashtag,
    filterValue: hashtag
  };

  var tweetEmotions = prepareTweetsByEmotion(tweets, hashtagFilter);
  drawPieChart(tweetEmotions);

  var retweetsByEmotions = prepareEmotionsByRetweets(tweets, hashtagFilter);
  drawBarChart(retweetsByEmotions);
}

function prepareTweetsByEmotion(tweets, tweetFilter) {
  var tweetEmotions = {
    title: 'Tweets by emotion',
    rows: populateRows(tweets, tweetFilter, 'emotion'),
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

function prepareEmotionsByRetweets(tweets, tweetFilter) {
  var tweetEmotions = {
    title: 'Retweets by emotion',
    rows: populateRows(tweets, tweetFilter, 'emotion', 'retweet_count'),
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

function populateRows(tweets, tweetFilter, rowIdentifier, rowValue) {
  var rows = [];
  for (var i = 0; i < tweets.length; i++) {
    var tweet = tweets[i];
    var filterPassed = tweetFilter['callback'](tweet, tweetFilter['filterValue']);

    if (filterPassed) {
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
  }

  return rows;
}

function hasHashtag(tweet, hashtag) {
  return tweet['hashtags'] && tweet['hashtags'].indexOf(hashtag) !== -1;
}
