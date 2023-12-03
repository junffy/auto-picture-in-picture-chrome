let youtubeTabId = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes('youtube.com/watch')) {
    youtubeTabId = tabId;
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  if (youtubeTabId && activeInfo.tabId !== youtubeTabId) {
    // Enable PIP when video playback tab is in background
    togglePiP(youtubeTabId, true);
  } else if (youtubeTabId && activeInfo.tabId === youtubeTabId) {
    // Disable PIP if user return to video tab
    togglePiP(youtubeTabId, false);
  }
});

async function togglePiP(tabId, enable) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: enable ? enablePiP : disablePiP
  });
}

function enablePiP() {
  const videoElement = document.querySelector('video');
  if (videoElement && !document.pictureInPictureElement) {
    videoElement.requestPictureInPicture().catch(error => {
      console.error('PiP Error:', error);
    });
  }
}

function disablePiP() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch(error => {
      console.error('PiP Exit Error:', error);
    });
  }
}
