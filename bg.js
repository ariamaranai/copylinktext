chrome.contextMenus.onClicked.addListener(({ frameId }, { id: tabId }) =>
  chrome.userScripts.execute({
    target: frameId ? { tabId, frameIds: [frameId] } : { tabId },
    js: [{ code: "let d=document,e=d.activeElement,s=getSelection(),r=d.createRange(s.removeAllRanges());r.selectNodeContents(e),s.addRange(r),navigator.clipboard.writeText(e.textContent)" }]
  }).catch(() => 0)
);
chrome.runtime.onInstalled.addListener(() =>
  chrome.contextMenus.create({
    id: "",
    title: "Copy text",
    contexts: ["page", "link"],
    documentUrlPatterns: ["https://*/*", "http://*/*", "file://*"]
  })
);