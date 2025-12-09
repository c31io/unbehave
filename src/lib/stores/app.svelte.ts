import type { Regret, Temptation, TemptationEvent, UserStats } from '$lib/types';
import { db } from '$lib/storage/db';

class AppState {
	regrets = $state<Regret[]>([]);
	temptations = $state<Temptation[]>([]);
	events = $state<TemptationEvent[]>([]);
	stats = $state<UserStats>({
		totalTemptations: 0,
		totalResisted: 0,
		totalGaveIn: 0,
		streakDays: 0,
		lastActivity: Date.now()
	});
	isInitialized = $state(false);

	async initialize() {
		if (this.isInitialized) return;

		try {
			await db.init();
			await this.loadData();
			this.isInitialized = true;
		} catch (error) {
			console.error('Failed to initialize app:', error);
		}
	}

	async loadData() {
		try {
			this.regrets = await db.getRegrets();
			this.temptations = await db.getTemptations();
			this.events = await db.getEvents();
			this.stats = await db.getStats();
		} catch (error) {
			console.error('Failed to load data:', error);
		}
	}

	async addRegret(regret: Regret) {
		await db.addRegret(regret);
		await this.loadData();
	}

	async updateRegret(regret: Regret) {
		await db.updateRegret(regret);
		await this.loadData();
	}

	async deleteRegret(id: string) {
		await db.deleteRegret(id);
		await this.loadData();
	}

	async addTemptation(temptation: Temptation) {
		await db.addTemptation(temptation);
		await this.loadData();
	}

	async recordEvent(event: TemptationEvent) {
		await db.addEvent(event);
		
		const newStats = { ...this.stats };
		newStats.totalTemptations++;
		if (event.resisted) {
			newStats.totalResisted++;
		} else {
			newStats.totalGaveIn++;
		}
		newStats.lastActivity = Date.now();

		await db.updateStats(newStats);
		await this.loadData();
	}
}

export const appState = new AppState();
