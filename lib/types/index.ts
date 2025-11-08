// Station Types

export interface Station {
	type: string;
	id: string;
	name: string;
	location?: {
		type: string;
		latitude: number;
		longitude: number;
	};
}

// Journey Types

export interface JourneyLeg {
	origin: {
		name: string;
		type: string;
	};
	destination: {
		name: string;
		type: string;
	};
	departure?: string;
	arrival?: string;
	plannedDeparture?: string;
	plannedArrival?: string;
	line?: {
		name: string;
		type: string;
	};
	remarks?: string[];
}

export interface Journey {
	type: string;
	legs: JourneyLeg[];
	price?: {
		amount: number;
		currency: string;
	};
	refreshToken?: string;
	remarks?: string[];
}

export interface JourneyResponse {
	journeys: Journey[];
	earlierRef?: string;
	laterRef?: string;
}

// Search Types
export interface StationSearchResult {
	stations: Station[];
	loading: boolean;
	error: string | null;
}

export interface JourneySearchResult {
	data: JourneyResponse | null;
	loading: boolean;
	error: string | null;
}

// Search Paramet

export interface JourneySearchParams {
	from: string;
	to: string;
	departure?: string;
	age?: string;
	deutschlandTicketDiscount?: boolean;
	firstClass?: boolean;
	loyaltyCard?: string;
	tickets?: boolean;
}
