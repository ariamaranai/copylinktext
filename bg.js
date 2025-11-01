chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  try {
    let tabId = tab.id;
    let { frameId } = info;
    await chrome.userScripts.execute({
      target: frameId ? { tabId, frameIds: [frameId] } : { tabId },
      js: [{ code: "{let d=document,e=d.activeElement,s=getSelection(),r=d.createRange(s.removeAllRanges());r.selectNodeContents(e),s.addRange(r),d.execCommand('copy')}" }]
    })
  } catch {}
});
chrome.runtime.onInstalled.addListener(() =>
  chrome.contextMenus.create({
    id: "",
    title: "Copy link text",
    contexts: ["link"],
    documentUrlPatterns: ["https://*/*", "http://*/*", "file://*"]
  })
);