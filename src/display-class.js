import "./components/Display.css";

/**
 * @param {string} lang -  The language code.
 * @param {string} script -  The script used to write the language.
 * @return {string} The className for the display of the language and script. Formatted as "display-\<lang\>", "display-\<script\>", or "display-\<lang\>-\<script\>".
 *
 * Latin, Greek, Cyrillic, Hebrew, Arabic, Devanagari, Thai, and Georgian scripts are already covered by default "display" class.
 */
export const displayClass = (lang, script) =>
  lang === "hy"
    ? "display-hy"
    : lang === "ja"
      ? "display-ja"
      : lang === "ko"
        ? "display-ko"
        : script === "Hans"
          ? "display-zh-hans"
          : script === "Hant"
            ? "display-zh-hant"
            : lang === "zh" || lang === "yue" || lang === "nan"
              ? "display-zh"
              : lang === "mn" && script === "Mong"
                ? "display-mn-mong"
                : lang === "bn" || script === "Beng"
                  ? "display-bn"
                  : lang === "as"
                    ? "display-as"
                    : lang === "gu"
                      ? "display-gu"
                      : lang === "pa" && script !== "Arab"
                        ? "display-pa"
                        : script === "Guru"
                          ? "display-pa-guru"
                          : lang === "ta"
                            ? "display-ta"
                            : lang === "te"
                              ? "display-te"
                              : lang === "kn"
                                ? "display-kn"
                                : lang === "ml"
                                  ? "display-ml"
                                  : lang === "or"
                                    ? "display-or"
                                    : lang === "mni"
                                      ? "display-mni"
                                      : lang === "sat"
                                        ? "display-sat"
                                        : script === "Olck"
                                          ? "display-olck"
                                          : lang === "si"
                                            ? "display-si"
                                            : lang === "bo" ||
                                                lang === "dz" ||
                                                lang === "sip" ||
                                                lang === "lbi" ||
                                                lang === "zau" ||
                                                lang === "scp" ||
                                                lang === "tsj" ||
                                                lang === "kkf" ||
                                                (lang === "bft" && script === "Tibt") ||
                                                (lang === "bft" && script !== "Arab") ||
                                                ((lang === "jul" || lang === "xsr") &&
                                                  script === "Tibt") ||
                                                ((lang === "jul" || lang === "xsr") &&
                                                  script !== "Deva")
                                              ? "display-bo"
                                              : lang === "lo"
                                                ? "display-lo"
                                                : lang === "km"
                                                  ? "display-km"
                                                  : lang === "my" || script === "Mymr"
                                                    ? "display-my"
                                                    : lang === "am"
                                                      ? "display-am"
                                                      : lang === "ti"
                                                        ? "display-ti"
                                                        : "display";
