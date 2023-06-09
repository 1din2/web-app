
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

    title() {
        return this.v('title');
    }

    description() {
        return this.v('description');
    }

    terms_title() {
        return this.v('terms_title');
    }

    terms_description() {
        return this.v('terms_description');
    }

    terms_content_md() {
        return this.v('terms_content_md');
    }

    privacy_title() {
        return this.v('privacy_title');
    }

    privacy_description() {
        return this.v('privacy_description');
    }

    an_open_source_project() {
        return this.v('an_open_source_project');
    }

    settings() {
        return this.v('settings');
    }

    settings_description() {
        return this.v('settings_description');
    }

    delete_my_data_info() {
        return this.v('delete_my_data_info');
    }

    delete_my_data() {
        return this.v('delete_my_data');
    }
}

export type LocalesKey = 'logo_name'
    | 'index_title'
    | 'index_description'
    | 'tag_page_title_format'
    | 'latest_polls'
    | 'share_poll_info'
    | 'name1_or_name2'
    | 'title'
    | 'description'
    | 'terms_title'
    | 'terms_description'
    | 'terms_content_md'
    | 'privacy_title'
    | 'privacy_description'
    | 'an_open_source_project'
    | 'settings'
    | 'settings_description'
    | 'delete_my_data_info'
    | 'delete_my_data';
