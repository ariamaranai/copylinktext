chrome.runtime.onInstalled.addListener(() =>
  chrome.contextMenus.create({
    id: "",
    title: "Copy text",
    contexts: ["page", "link"],
    documentUrlPatterns: ["https://*/*", "https://*/", "http://*/*", "http://*/"]
  })
);
chrome.contextMenus.onClicked.addListener((info, tab) =>
  chrome.scripting.executeScript({
    target: info.frameId
      ? { tabId: tab.id, frameIds: [info.frameId] }
      : { tabId: tab.id },
    world: "MAIN",
    func: () => {
      let activeElement = document.activeElement;
      let selection = getSelection();
      let range = document.createRange();
      selection.removeAllRanges();
      range.selectNodeContents(activeElement);
      selection.addRange(range);
      navigator.clipboard.writeText(activeElement.textContent);
    }
  })
);