chrome.contextMenus.onClicked.addListener((info, { id: tabId }) =>
  chrome.scripting.executeScript({
    target: info.frameId ? { tabId, frameIds: [info.frameId] } : { tabId },
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
    contexts: ["page", "link"]
  })
);