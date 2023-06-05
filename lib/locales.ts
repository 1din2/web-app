import { Locales, parseTranslationData } from "localizy";
import { LocalizyLocalesProvider, LocalizyLocales } from "./generated-locales";
import { LANG } from "./constants";

export type Locale = {
  lang: string;
};

export class OurnetTranslator extends LocalizyLocalesProvider<LocalizyLocales> {
  protected createInstance(t: Locales) {
    return new LocalizyLocales(t);
  }
}

const data = parseTranslationData(require(`../locales/${LANG}.json`));

export const OURNET_TRANSLATOR = new OurnetTranslator({
  data: { [LANG]: data },
  throwUndefinedKey: true,
});

const locales = OURNET_TRANSLATOR.lang(LANG);

export default locales;
