chrome.runtime.onInstalled.addListener(() =>
  chrome.contextMenus.create({
    id: "",
    title: "Copy text",
    contexts: ["page", "link"],
    documentUrlPatterns: ["https://*/*", "https://*/", "http://*/*", "http://*/", "file://*/*", "file://*/"]
  })
);
chrome.contextMenus.onClicked.addListener(async (info, tab) =>
  chrome.scripting.executeScript({
    target: info.frameId
      ? { tabId: tab.id, frameIds: [info.frameId] }
      : { tabId: tab.id },
    world: (await chrome.contentSettings.javascript.get({
      primaryUrl: tab.url
    })).setting == "allow" ? "MAIN" : "ISOLATED",
    func: () => {
      let d = document;
      let activeElement = d.activeElement;
      let selection = getSelection();
      let range = d.createRange();
      selection.removeAllRanges();
      range.selectNodeContents(activeElement);
      selection.addRange(range);
      navigator.clipboard.writeText(activeElement.textContent);
    }
  })
);