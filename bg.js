{
  let { contextMenus, runtime, scripting } = chrome;
  contextMenus.onClicked.addListener(({ frameId }, { id }) =>
    scripting.executeScript({
      target: frameId ? { tabId: id, frameIds: [frameId] } : { tabId: id },
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
  );
  runtime.onInstalled.addListener(() =>
    contextMenus.create({
      id: "",
      title: "Copy link text",
      contexts: ["link"],
      documentUrlPatterns: ["https://*/*", "http://*/*", "file://*"]
    })
  );
}
