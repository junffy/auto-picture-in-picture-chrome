document.addEventListener('DOMContentLoaded', function() {
    const statusDiv = document.getElementById('status');
    const enablePipButton = document.getElementById('enablePipButton');

    enablePipButton.addEventListener('click', () => {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: enablePiP
        });
      });
    });

    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      if (tabs[0].url.includes('youtube.com/watch')) {
        statusDiv.textContent = 'Youtube video is active.';
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
