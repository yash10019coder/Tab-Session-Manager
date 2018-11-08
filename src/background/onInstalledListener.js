import browser from "webextension-polyfill";
import { initSettings, getSettings, setSettings } from "src/settings/settings";

const openOptionsPage = active => {
  browser.tabs.create({
    url: "options/index.html#information?action=updated",
    active: active
  });
};

export let isUpdated = false;

export default async details => {
  if (details.reason != "install" && details.reason != "update") return;
  isUpdated = true;
  await initSettings();
  const isShowOptionsPage = getSettings("isShowOptionsPageWhenUpdated");

  if (isShowOptionsPage) {
    openOptionsPage(false);
  } else {
    setSettings("isShowUpdated", true);
  }
};
