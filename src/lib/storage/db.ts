import type { Regret, Temptation, TemptationEvent, UserStats, AppSettings } from '$lib/types';

const DB_NAME = 'unbehave-db';
const DB_VERSION = 1;

const STORES = {
	REGRETS: 'regrets',
	TEMPTATIONS: 'temptations',
	EVENTS: 'events',
	STATS: 'stats',
	SETTINGS: 'settings'
} as const;

class Database {
	private db: IDBDatabase | null = null;

	async init(): Promise<void> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(DB_NAME, DB_VERSION);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => {
				this.db = request.result;
				resolve();
			};

			request.onupgradeneeded = (event) => {
				const db = (event.target as IDBOpenDBRequest).result;

				if (!db.objectStoreNames.contains(STORES.REGRETS)) {
					const regretStore = db.createObjectStore(STORES.REGRETS, { keyPath: 'id' });
					regretStore.createIndex('timestamp', 'timestamp', { unique: false });
					regretStore.createIndex('severity', 'severity', { unique: false });
				}

				if (!db.objectStoreNames.contains(STORES.TEMPTATIONS)) {
					const temptationStore = db.createObjectStore(STORES.TEMPTATIONS, { keyPath: 'id' });
					temptationStore.createIndex('category', 'category', { unique: false });
				}

				if (!db.objectStoreNames.contains(STORES.EVENTS)) {
					const eventStore = db.createObjectStore(STORES.EVENTS, { keyPath: 'id' });
					eventStore.createIndex('timestamp', 'timestamp', { unique: false });
					eventStore.createIndex('temptationId', 'temptationId', { unique: false });
				}

				if (!db.objectStoreNames.contains(STORES.STATS)) {
					db.createObjectStore(STORES.STATS, { keyPath: 'id' });
				}

				if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
					db.createObjectStore(STORES.SETTINGS, { keyPath: 'id' });
				}
			};
		});
	}

	private ensureDB(): IDBDatabase {
		if (!this.db) {
			throw new Error('Database not initialized. Call init() first.');
		}
		return this.db;
	}

	async addRegret(regret: Regret): Promise<void> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.REGRETS], 'readwrite');
			const store = transaction.objectStore(STORES.REGRETS);
			const request = store.add(regret);

			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async getRegrets(): Promise<Regret[]> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.REGRETS], 'readonly');
			const store = transaction.objectStore(STORES.REGRETS);
			const request = store.getAll();

			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async getRegretById(id: string): Promise<Regret | undefined> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.REGRETS], 'readonly');
			const store = transaction.objectStore(STORES.REGRETS);
			const request = store.get(id);

			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async updateRegret(regret: Regret): Promise<void> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.REGRETS], 'readwrite');
			const store = transaction.objectStore(STORES.REGRETS);
			const request = store.put(regret);

			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async deleteRegret(id: string): Promise<void> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.REGRETS], 'readwrite');
			const store = transaction.objectStore(STORES.REGRETS);
			const request = store.delete(id);

			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async addTemptation(temptation: Temptation): Promise<void> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.TEMPTATIONS], 'readwrite');
			const store = transaction.objectStore(STORES.TEMPTATIONS);
			const request = store.add(temptation);

			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async getTemptations(): Promise<Temptation[]> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.TEMPTATIONS], 'readonly');
			const store = transaction.objectStore(STORES.TEMPTATIONS);
			const request = store.getAll();

			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async addEvent(event: TemptationEvent): Promise<void> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.EVENTS], 'readwrite');
			const store = transaction.objectStore(STORES.EVENTS);
			const request = store.add(event);

			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async getEvents(): Promise<TemptationEvent[]> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.EVENTS], 'readonly');
			const store = transaction.objectStore(STORES.EVENTS);
			const request = store.getAll();

			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async getStats(): Promise<UserStats> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.STATS], 'readonly');
			const store = transaction.objectStore(STORES.STATS);
			const request = store.get('main');

			request.onsuccess = () => {
				const result = request.result || {
					totalTemptations: 0,
					totalResisted: 0,
					totalGaveIn: 0,
					streakDays: 0,
					lastActivity: Date.now()
				};
				resolve(result);
			};
			request.onerror = () => reject(request.error);
		});
	}

	async updateStats(stats: UserStats): Promise<void> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.STATS], 'readwrite');
			const store = transaction.objectStore(STORES.STATS);
			const request = store.put({ id: 'main', ...stats });

			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async getSettings(): Promise<AppSettings> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.SETTINGS], 'readonly');
			const store = transaction.objectStore(STORES.SETTINGS);
			const request = store.get('main');

			request.onsuccess = () => {
				const result = request.result || {
					theme: 'system',
					notifications: true,
					showEducationalContent: true
				};
				resolve(result);
			};
			request.onerror = () => reject(request.error);
		});
	}

	async updateSettings(settings: AppSettings): Promise<void> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([STORES.SETTINGS], 'readwrite');
			const store = transaction.objectStore(STORES.SETTINGS);
			const request = store.put({ id: 'main', ...settings });

			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async exportAllData(): Promise<string> {
		const regrets = await this.getRegrets();
		const temptations = await this.getTemptations();
		const events = await this.getEvents();
		const stats = await this.getStats();
		const settings = await this.getSettings();

		const exportData = {
			version: DB_VERSION,
			exportDate: new Date().toISOString(),
			data: {
				regrets,
				temptations,
				events,
				stats,
				settings
			}
		};

		return JSON.stringify(exportData, null, 2);
	}

	async importAllData(jsonData: string, mode: 'merge' | 'replace' = 'merge'): Promise<void> {
		const db = this.ensureDB();
		const importData = JSON.parse(jsonData);

		if (!importData.version || !importData.data) {
			throw new Error('Invalid import file format');
		}

		if (mode === 'replace') {
			await this.clearAllData();
		}

		const { regrets = [], temptations = [], events = [], stats, settings } = importData.data;

		return new Promise((resolve, reject) => {
			const transaction = db.transaction(
				[STORES.REGRETS, STORES.TEMPTATIONS, STORES.EVENTS, STORES.STATS, STORES.SETTINGS],
				'readwrite'
			);

			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);

			const regretStore = transaction.objectStore(STORES.REGRETS);
			const temptationStore = transaction.objectStore(STORES.TEMPTATIONS);
			const eventStore = transaction.objectStore(STORES.EVENTS);
			const statsStore = transaction.objectStore(STORES.STATS);
			const settingsStore = transaction.objectStore(STORES.SETTINGS);

			for (const regret of regrets) {
				regretStore.put(regret);
			}

			for (const temptation of temptations) {
				temptationStore.put(temptation);
			}

			for (const event of events) {
				eventStore.put(event);
			}

			if (stats) {
				statsStore.put({ id: 'main', ...stats });
			}

			if (settings) {
				settingsStore.put({ id: 'main', ...settings });
			}
		});
	}

	async clearAllData(): Promise<void> {
		const db = this.ensureDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(
				[STORES.REGRETS, STORES.TEMPTATIONS, STORES.EVENTS, STORES.STATS, STORES.SETTINGS],
				'readwrite'
			);

			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);

			transaction.objectStore(STORES.REGRETS).clear();
			transaction.objectStore(STORES.TEMPTATIONS).clear();
			transaction.objectStore(STORES.EVENTS).clear();
			transaction.objectStore(STORES.STATS).clear();
			transaction.objectStore(STORES.SETTINGS).clear();
		});
	}
}

export const db = new Database();
