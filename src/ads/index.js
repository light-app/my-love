import bridge from "@vkontakte/vk-bridge";

// открытие рекламного ролика
export function nativeAds() {
  return bridge
    .send("VKWebAppShowNativeAds", {
      ad_format: "preloader",
    })
    .then((res) => {})
    .catch((err) => {});
}

/**
 * Открывает рекламный баннер на весь экран
 * @returns {Promise<boolean>}
 */
export async function showNativeAd() {
  try {
    const data = await bridge.send("VKWebAppShowNativeAds", {
      ad_format: "preloader",
    });

    return data.result !== undefined ? data.result : false;
  } catch (e) {
    return false;
  }
}
