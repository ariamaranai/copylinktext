chrome.runtime.onInstalled.addListener(() =>
  chrome.contextMenus.create({
    id: "",
    title: "Copy textContent",
    contexts: ["page", "link"]
  })
);
chrome.contextMenus.onClicked.addListener((info, tab) =>
  tab.url[0] != "c" &&
    chrome.scripting.executeScript({
      target: info.frameId
        ? { tabId: b.id, frameIds: [info.frameId] }
        : { tabId: b.id },
      world: "MAIN",
      func: () => navigator.clipboard.writeText(document.activeElement.textContent)
    })
);