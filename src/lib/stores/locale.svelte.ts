import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';

class LocaleStore {
	private _locale = $state<Locale>(getLocale());

	get locale(): Locale {
		return this._locale;
	}

	setLocale(newLocale: Locale) {
		setLocale(newLocale, { reload: false });
		this._locale = newLocale;
	}

	toggle() {
		const newLang: Locale = this._locale === 'en' ? 'cn' : 'en';
		this.setLocale(newLang);
	}
}

export const localeStore = new LocaleStore();
