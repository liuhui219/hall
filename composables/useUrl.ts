/** @format */

import {urlConfig} from "~~/apis/types";

export const useUrlConfig = () =>
  useState("url_config", () => ({
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    password: "",
    pathname: "",
    port: "",
    protocol: "",
    searchParams: {},
    username: "",
  }));
export const useUrlError = () => useState("url_error", () => "");
export const useUrlTest = () => useState("url_test", () => false);
export const useUrlUtm = () => useState("url_utm", (): urlConfig => ({}));
export const useUrlCh = () => useState("url_ch", () => "");
export const useUrlChannel = () => useState("url_channel", () => 0);
export const useCheckversionChannel = () => useState("url_checkversion_channel", () => 0);
export const useUrlIc = () => useState("url_ic", () => "");
export const useUrlChlimit = () => useState("url_chlimit", () => false);
export const useUrlForceReg = () => useState("url_force_reg", () => "");
export const useUrlcApp = () => useState("url_cApp", () => false);
export const useUrlGameID = () => useState("url_gameid", () => 0);
export const useUrlParams = () => useState("url_params", (): urlConfig => ({}));
export const useUrlSourceMap = () => useState("url_source_map", (): any => ({}));
export const useUrlFirstMap = () => useState("url_first_map", (): any => ({}));
export const useUrlMediaSource = () => useState("url_media_source", (): urlConfig => ({}));
export const useUrlLang = () => useState("url_lang", () => "");
export const useUrlApgSel = () => useState("url_apg_sel", () => ({sel_image: "", sel_url: ""}));
export const useUrlmApp = () => useState("url_m_app", () => false);
export const useUrlmReq = () => useState("url_m_req", () => false);
export const useUrlnoCache = () => useState("url_no_cache", () => false);
export const useUrlWwwAfun = () => useState("url_www_afun", () => false);
