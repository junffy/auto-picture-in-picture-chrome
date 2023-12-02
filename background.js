chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
      if (tab && tab.url && !tab.url.includes('youtube.com/watch')) {
        chrome.tabs.query({url: "*://www.youtube.com/watch*"}, tabs => {
          if (tabs.length > 0) {
            const youtubeTab = tabs[0];
            chrome.scripting.executeScript({
              target: { tabId: youtubeTab.id },
              function: enablePiP
            });
          }
        });
      }
    });
  });

  function enablePiP() {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.requestPictureInPicture().catch(error => {
        console.error('PiP Error:', error);
      });
    }
  }