chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === 'install') {
    chrome.tabs.create({
      url: "hello.html"
    });

    var d = new Date();
    d.setHours(0,0,0,0);
    chrome.storage.local.set({ "refreshDate": d });

    //on first open send the entire history, and then afterwards only send every 24 hours
    chrome.history.search({text: '', maxResults: 100000, startTime: 0}, function(data) {
      var jsonData = {};
      var urlArray = [];

      data.forEach(function(page) {
          // console.log(page.url);
          urlArray.push(page.url);
      });

      jsonData["history"] = urlArray;
      console.log(jsonData);
    });
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  dayChange();
}); 

//send a request every new day to get all the last info
async function dayChange() {
  var today = new Date();
  var lastCheck = await chrome.storage.local.get("refreshDate").refreshDate;

  if (lastCheck === undefined) {
    lastCheck = new Date();
  }

  // console.log(lastCheck);

  if (today.getDate() != lastCheck.getDate()) {
    lastCheck.setHours(0,0,0,0);
    chrome.storage.local.set({ refreshDate: lastCheck });

    chrome.history.search({text: '', maxResults: 10000, startTime: lastCheck.getTime()}, function(data) {
      var jsonData = {};
      var urlArray = [];
  
      data.forEach(function(page) {
          // console.log(page.url);
          urlArray.push(page.url);
      });
  
      jsonData["history"] = urlArray;
      console.log(jsonData);
    });
  }
}