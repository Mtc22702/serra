window.SERRA_APP_VERSION = "2026-07-04-1425";
window.SERRA_IS_LOCAL_DEV =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1" ||
  location.hostname === "0.0.0.0" ||
  location.hostname === "::1" ||
  location.hostname === "";
window.SERRA_ASSET_VERSION = window.SERRA_IS_LOCAL_DEV
  ? String(Date.now())
  : window.SERRA_APP_VERSION;
window.serraAsset = function (path) {
  return path + "?v=" + window.SERRA_ASSET_VERSION;
};
