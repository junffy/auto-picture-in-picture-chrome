chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action == "getVideoUrl") {
        sendResponse({url: window.location.href});
      }
    }
  );