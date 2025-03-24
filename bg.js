chrome.contextMenus.onClicked.addListener(({ frameId }, { id: tabId }) =>
  chrome.scripting.executeScript({
    target: frameId ? { tabId, frameIds: [frameId] } : { tabId },
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
  }).catch(() => 0)
);
chrome.runtime.onInstalled.addListener(() =>
  chrome.contextMenus.create({
    id: "",
    title: "Copy text",
    contexts: ["page", "link"],
    documentUrlPatterns: ["https://*/*", "http://*/*", "file://*/*"]
  })
);