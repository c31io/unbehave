import * as m from '$lib/paraglide/messages';
import socialMediaTreatment from './data/treatments/social-media.md?raw';
import gamingTreatment from './data/treatments/gaming.md?raw';
import pornographyTreatment from './data/treatments/pornography.md?raw';
import alcoholTreatment from './data/treatments/alcohol.md?raw';
import nicotineTreatment from './data/treatments/nicotine.md?raw';
import cannabisTreatment from './data/treatments/cannabis.md?raw';
import shoppingTreatment from './data/treatments/shopping.md?raw';
import foodTreatment from './data/treatments/food.md?raw';
import socialMediaTreatmentZh from './data/treatments/social-media.zh.md?raw';
import gamingTreatmentZh from './data/treatments/gaming.zh.md?raw';
import pornographyTreatmentZh from './data/treatments/pornography.zh.md?raw';
import alcoholTreatmentZh from './data/treatments/alcohol.zh.md?raw';
import nicotineTreatmentZh from './data/treatments/nicotine.zh.md?raw';
import cannabisTreatmentZh from './data/treatments/cannabis.zh.md?raw';
import shoppingTreatmentZh from './data/treatments/shopping.zh.md?raw';
import foodTreatmentZh from './data/treatments/food.zh.md?raw';

export interface Addiction {
	id: string;
	name: string;
	emoji: string;
	color: string;
	treatment: string;
}

// Helper function to get treatment based on locale
function getTreatment(enTreatment: string, zhTreatment: string): string {
	// Check if running in browser and if URL contains /cn/ locale
	if (typeof window !== 'undefined') {
		return window.location.pathname.startsWith('/cn') ? zhTreatment : enTreatment;
	}
	return enTreatment;
}

export const predefinedAddictions: Addiction[] = [
	{
		id: 'social_media',
		name: 'Social Media',
		emoji: '📱',
		color: 'bg-blue-900/50 text-blue-300',
		treatment: getTreatment(socialMediaTreatment, socialMediaTreatmentZh)
	},
	{
		id: 'gaming',
		name: 'Gaming',
		emoji: '🎮',
		color: 'bg-purple-900/50 text-purple-300',
		treatment: getTreatment(gamingTreatment, gamingTreatmentZh)
	},
	{
		id: 'pornography',
		name: 'Pornography',
		emoji: '🚫',
		color: 'bg-red-900/50 text-red-300',
		treatment: getTreatment(pornographyTreatment, pornographyTreatmentZh)
	},
	{
		id: 'alcohol',
		name: 'Alcohol',
		emoji: '🍺',
		color: 'bg-amber-900/50 text-amber-300',
		treatment: getTreatment(alcoholTreatment, alcoholTreatmentZh)
	},
	{
		id: 'nicotine',
		name: 'Nicotine/Vaping',
		emoji: '🚬',
		color: 'bg-gray-700 text-gray-300',
		treatment: getTreatment(nicotineTreatment, nicotineTreatmentZh)
	},
	{
		id: 'cannabis',
		name: 'Cannabis',
		emoji: '🌿',
		color: 'bg-green-900/50 text-green-300',
		treatment: getTreatment(cannabisTreatment, cannabisTreatmentZh)
	},
	{
		id: 'shopping',
		name: 'Shopping/Spending',
		emoji: '💳',
		color: 'bg-pink-900/50 text-pink-300',
		treatment: getTreatment(shoppingTreatment, shoppingTreatmentZh)
	},
	{
		id: 'food',
		name: 'Food/Binge Eating',
		emoji: '🍔',
		color: 'bg-orange-900/50 text-orange-300',
		treatment: getTreatment(foodTreatment, foodTreatmentZh)
	}
];

// Get localized addiction name
export const getAddictionName = (id: string): string => {
	switch (id) {
		case 'social_media':
			return m.addiction_social_media();
		case 'gaming':
			return m.addiction_gaming();
		case 'pornography':
			return m.addiction_pornography();
		case 'alcohol':
			return m.addiction_alcohol();
		case 'nicotine':
			return m.addiction_nicotine();
		case 'cannabis':
			return m.addiction_cannabis();
		case 'shopping':
			return m.addiction_shopping();
		case 'food':
			return m.addiction_food();
		default:
			return id;
	}
};

export const getUserAddictions = (): string[] => {
	if (typeof localStorage === 'undefined') return [];
	const stored = localStorage.getItem('user-addictions');
	return stored ? JSON.parse(stored) : [];
};

export const setUserAddictions = (addictions: string[]): void => {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem('user-addictions', JSON.stringify(addictions));
};

export const addUserAddiction = (customName: string): void => {
	const current = getUserAddictions();
	if (!current.includes(customName)) {
		setUserAddictions([...current, customName]);
	}
};
