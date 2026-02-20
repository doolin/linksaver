"use strict";

const PARENT_FOLDER_NAME = "LinkSaver";
const BADGE_DISPLAY_MS = 3000;
const BADGE_COLOR = "#4688F1";

/**
 * Find the "LinkSaver" folder under Other Bookmarks, creating it if it
 * doesn't exist yet.
 */
async function findOrCreateParentFolder() {
  const results = await browser.bookmarks.search({ title: PARENT_FOLDER_NAME });
  const folder = results.find((node) => !node.url);
  if (folder) {
    return folder;
  }
  return browser.bookmarks.create({
    title: PARENT_FOLDER_NAME,
    parentId: "unfiled_____",
  });
}

/**
 * Determine the next folder name for today. Scans existing children of the
 * parent folder for names matching today's date, finds the highest counter,
 * and returns the next value.
 *
 * Example sequence: 2026-02-20.1, 2026-02-20.2, 2026-02-20.3
 */
async function getNextFolderName(parentId) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const children = await browser.bookmarks.getChildren(parentId);
  const prefix = today + ".";

  let maxCount = 0;
  for (const child of children) {
    if (child.title && child.title.startsWith(prefix)) {
      const countStr = child.title.slice(prefix.length);
      const count = parseInt(countStr, 10);
      if (!isNaN(count) && count > maxCount) {
        maxCount = count;
      }
    }
  }

  return `${today}.${maxCount + 1}`;
}

/**
 * Save all tabs in the current window as bookmarks inside a new
 * date-stamped folder under LinkSaver.
 */
async function saveAllTabs() {
  try {
    const parentFolder = await findOrCreateParentFolder();
    const folderName = await getNextFolderName(parentFolder.id);

    const subfolder = await browser.bookmarks.create({
      parentId: parentFolder.id,
      title: folderName,
    });

    const tabs = await browser.tabs.query({ currentWindow: true });

    // Create bookmarks sequentially to preserve tab order.
    for (let i = 0; i < tabs.length; i++) {
      await browser.bookmarks.create({
        parentId: subfolder.id,
        title: tabs[i].title || tabs[i].url,
        url: tabs[i].url,
        index: i,
      });
    }

    // Show badge with the count of saved tabs.
    browser.browserAction.setBadgeBackgroundColor({ color: BADGE_COLOR });
    browser.browserAction.setBadgeText({ text: String(tabs.length) });
    setTimeout(() => {
      browser.browserAction.setBadgeText({ text: "" });
    }, BADGE_DISPLAY_MS);
  } catch (error) {
    console.error("LinkSaver: failed to save tabs", error);
    browser.browserAction.setBadgeBackgroundColor({ color: "#D32F2F" });
    browser.browserAction.setBadgeText({ text: "ERR" });
    setTimeout(() => {
      browser.browserAction.setBadgeText({ text: "" });
    }, BADGE_DISPLAY_MS);
  }
}

browser.browserAction.onClicked.addListener(saveAllTabs);
