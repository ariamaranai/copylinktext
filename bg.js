chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  try {
    let tabId = tab.id;
    let { frameId } = info;
    await chrome.scripting.executeScript({
      target: frameId ? { tabId, frameIds: [frameId] } : { tabId },
      world: "MAIN",
      func: () => {
        let d = document;
        let e = d.activeElement;
        let s = getSelection();
        let r = d.createRange(s.removeAllRanges());
        r.selectNodeContents(e);
        s.addRange(r);
        return d.execCommand("copy");
      }
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