export interface Regret {
	id: string;
	title: string;
	description: string;
	timestamp: number;
	severity: 'low' | 'medium' | 'high';
	tags: string[];
	relatedTemptation?: string;
}

export interface Temptation {
	id: string;
	name: string;
	category: 'social_media' | 'gaming' | 'substance' | 'other';
	description?: string;
	createdAt: number;
}

export interface TemptationEvent {
	id: string;
	temptationId: string;
	timestamp: number;
	resisted: boolean;
	regretsViewed: string[];
	notes?: string;
}

export interface UserStats {
	totalTemptations: number;
	totalResisted: number;
	totalGaveIn: number;
	streakDays: number;
	lastActivity: number;
}

export interface AppSettings {
	theme: 'light' | 'dark' | 'system';
	notifications: boolean;
	showEducationalContent: boolean;
}
