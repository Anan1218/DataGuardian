// on activated, listen when on youtubecom
// when the counter reaches 20 minutes, change tabs/create a new tab

var timer = 60*20; // 20 minutes
var duration = 60*20;

var breakTimer = 60*5;
var breakDuration = 60*5;

var onBreak = 0;

chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === 'install') {
    chrome.tabs.create({
      url: "hello.html"
    });

    //
    chrome.history.search({text: '', maxResults: 10}, function(data) {
      data.forEach(function(page) {
          console.log(page.url);
      });
    });
  }
});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}