document.addEventListener('DOMContentLoaded', function() {
  const statusDiv = document.getElementById('status');

  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    if (tabs[0].url.includes('youtube.com/watch')) {
      statusDiv.textContent = 'Youtube video is active.';
    }
  });
});
