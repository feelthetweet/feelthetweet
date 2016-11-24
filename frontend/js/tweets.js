'use strict';
/* global drawBarChart, drawPieChart, tweetsData */

// On init, get the tweets with the hashtag "elte"
var DEFAULT_HASHTAG = 'ELTE';
processTweetsByHashtag(DEFAULT_HASHTAG);

function getTweetsByHashtag() {
  var hashtag = document.getElementById('search-text').value || DEFAULT_HASHTAG;
  processTweetsByHashtag(hashtag);
}

function processTweetsByHashtag(hashtag) {
  var hashtagFilter = {
    callback: hasHashtag,
    filterValue: hashtag
  };

  processTweets(hashtagFilter);
}

function processTweets(tweetFilter) {
  var tweets = tweetsData['tweets'];  // Replace this with the real data

  showSampleTweets(tweets, tweetFilter);
 
  var tweetEmotions = prepareTweetsByEmotion(tweets, tweetFilter);
  drawPieChart(tweetEmotions);

  var retweetsByEmotions = prepareEmotionsByRetweets(tweets, tweetFilter);
  drawBarChart(retweetsByEmotions);
}

function showSampleTweets(tweets, tweetFilter) {
  function doShowSampleTweets(tweetsBy, tweetFilter) {
    var samplePositiveTweet = getSampleTweetBy(tweets, tweetFilter, 'positive');
    var positiveTweetElement = document.getElementById('upperTweetsContainer').firstElementChild;
    if (samplePositiveTweet) {
      positiveTweetElement.innerHTML = samplePositiveTweet['text'];
    } else {
      // Make sure there are no leftover content.
      positiveTweetElement.innerHTML = '';
    }

    var sampleNegativeTweet = getSampleTweetBy(tweets, tweetFilter, 'negative');
    var negativeTweetElement = document.getElementById('lowerTweetsContainer').firstElementChild;
    if (sampleNegativeTweet) {
      negativeTweetElement.innerHTML = sampleNegativeTweet['text'];
    } else {
      // Make sure there are no leftover content.
      negativeTweetElement.innerHTML = '';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(event) {
      doShowSampleTweets(tweets, tweetFilter);
    });
  } else {
    doShowSampleTweets(tweets, tweetFilter);
  }
}

function prepareTweetsByEmotion(tweets, tweetFilter) {
  var tweetEmotions = {
    title: 'Tweets by emotion, ' + tweetFilter['filterValue'],
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
    title: 'Retweets by emotion ' + tweetFilter['filterValue'],
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

function getSampleTweetBy(tweets, tweetFilter, emotion) {
  var tweetsBy = tweets.filter(function(tweet) {
    var filterPassed = tweetFilter['callback'](tweet, tweetFilter['filterValue']);
    if (filterPassed) {
      var hasEmotion = tweet['emotion'] === emotion;
    }
    return filterPassed && hasEmotion;
  });

  var sampleTweet;
  if (tweetsBy.length) {
    // http://stackoverflow.com/a/4550514/7010222
    sampleTweet = tweetsBy[Math.floor(Math.random() * tweetsBy.length)];
  }
 
  return sampleTweet;
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
  var hastagFound;

  if (tweet['hashtags']) {
    hastagFound = tweet['hashtags'].some(function(tweetHashtag) {
      return tweetHashtag.toLowerCase() === hashtag.toLowerCase();
    })
  }

  return hastagFound;
}
