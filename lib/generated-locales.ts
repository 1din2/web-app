
import { Locales, Translator, TranslatorOptions } from 'localizy';

export class LocalizyLocalesProvider<T extends LocalizyLocales = LocalizyLocales> {
    private translator: Translator
    private localesMap: { [lang: string]: T } = {}

    constructor(options: TranslatorOptions) {
        this.translator = new Translator(options);
    }

    lang(lang: string) {
        if (!this.localesMap[lang]) {
            this.localesMap[lang] = this.createInstance(this.translator.locales(lang)) as T;
        }

        return this.localesMap[lang];
    }

    protected createInstance(t: Locales): T {
        return new LocalizyLocales(t) as T;
    }
}

export class LocalizyLocales {
    protected __locales: Locales
    constructor(locales: Locales) {
        this.__locales = locales;
    }

    s(key: LocalesKey, ...args: any[]) {
        return this.v(key, args);
    }

    v(key: LocalesKey, args?: any[]) {
        return this.__locales.t(key, args);
    }
    

    logo_name() {
        return this.v('logo_name');
    }

    index_title() {
        return this.v('index_title');
    }

    index_description() {
        return this.v('index_description');
    }

    tag_page_title_format(_p1: { name: string }) {
        return this.v('tag_page_title_format', Array.from(arguments));
    }

    latest_polls() {
        return this.v('latest_polls');
    }

    share_poll_info() {
        return this.v('share_poll_info');
    }

    name1_or_name2(_p1: { name1: string; name2: string }) {
        return this.v('name1_or_name2', Array.from(arguments));
    }
}

export type LocalesKey = 'logo_name'
    | 'index_title'
    | 'index_description'
    | 'tag_page_title_format'
    | 'latest_polls'
    | 'share_poll_info'
    | 'name1_or_name2';
