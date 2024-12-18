chrome.runtime.onInstalled.addListener(() =>
  chrome.contextMenus.create({
    id: "",
    title: "Copy text",
    contexts: ["page", "link"]
  })
);
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab.url[0] != "c") {
    let frameId = info.frameId;
    chrome.scripting.executeScript({
      target: frameId
        ? { tabId: tab.id, frameIds: [frameId] }
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
    });
  }
});