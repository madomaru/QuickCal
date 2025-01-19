chrome.commands.onCommand.addListener((command) => {
    if (command === "send-html-for-google-calendar") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0 || !tabs[0]?.id) {
          console.error("No active tab found.");
          return;
        }
  
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"]
        });
      });
    }
  });
  