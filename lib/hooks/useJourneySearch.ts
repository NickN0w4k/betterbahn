"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { JourneyResponse } from "@/lib/types";

export function useJourneySearch() {
	const searchParams = useSearchParams();
	const [data, setData] = useState<JourneyResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const from = searchParams.get("from");
		const to = searchParams.get("to");

		// Don't fetch if we don't have required params
		if (!from || !to) {
			return;
		}

		const fetchJourneys = async () => {
			setLoading(true);
			setError(null);

			try {
				// Build the API URL with all search params
				const apiUrl = `https://v6.db.transport.rest/journeys?${searchParams.toString()}`;

				const response = await fetch(apiUrl);

				if (!response.ok) {
					throw new Error(`API error: ${response.status}`);
				}

				const result = await response.json();
				setData(result);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to fetch journeys"
				);
				console.error("Error fetching journeys:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchJourneys();
	}, [searchParams]);

	return { data, loading, error };
}
