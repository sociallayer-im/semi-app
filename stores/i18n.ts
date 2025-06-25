import cookie from "js-cookie";
import en from "~/assets/i18n/en.json";
import zh from "~/assets/i18n/zh.json";

export enum Lang {
  EN = "en",
  ZH = "zh",
}

const textMap = {
  [Lang.EN]: en,
  [Lang.ZH]: zh,
};

export const useI18n = defineStore("i18n", {
  state: () => {
    // 获取浏览器语言
    const lang = cookie.get("lang") || navigator.language.split("-")[0] || "en";
    if (!Object.values(Lang).includes(lang as Lang)) {
      return {
        lang: "en",
        text: textMap[Lang.EN],
      };
    }

    console.log("[lang]: ", lang);
    return {
      lang,
      text: textMap[lang as Lang],
    };
  },

  actions: {
    async switch(lang: Lang) {
      cookie.set("lang", lang);
      this.lang = lang;
    },
  },
});
