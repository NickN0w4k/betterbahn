"use client";

import { useJourneySearch } from "@/lib/hooks/useJourneySearch";

export default function SearchResults() {
	const { data, loading, error } = useJourneySearch();

	console.log("Journey Search Data:", data);

	// Loading state
	if (loading) {
		return (
			<div className="flex justify-center items-center p-8">
				<div className="text-lg font-mono">Suche Verbindungen...</div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="p-4 bg-red-100 border-2 border-red-500 rounded-lg">
				<p className="text-red-700 font-mono">Fehler: {error}</p>
			</div>
		);
	}

	// No results yet
	if (!data || !data.journeys || data.journeys.length === 0) {
		return (
			<div className="p-4 text-center font-mono text-gray-600">
				Keine Verbindungen gefunden.
			</div>
		);
	}

	// Display results
	return (
		<div className="w-full max-w-2xl p-4">
			<h2 className="text-2xl font-bold font-mono mb-4">
				{data.journeys.length} Verbindung
				{data.journeys.length !== 1 ? "en" : ""} gefunden
			</h2>

			<div className="flex flex-col gap-4">
				{data.journeys.map((journey, index) => (
					<div
						key={index}
						className="border-2 border-gray-800 rounded-lg p-4 hover:border-primary transition-colors"
					>
						{journey.remarks && journey.remarks.length > 0 && (
							<div className="mb-3 p-3 bg-red-500">
								{journey.remarks.map((remark, rIndex) => {
									const remarkObj = remark as any;
									return (
										<p key={rIndex} className="text-white font-mono text-sm">
											{typeof remark === "string"
												? remark
												: remarkObj.text || remarkObj.summary}
										</p>
									);
								})}
							</div>
						)}{" "}
						{/* Journey Overview */}
						<div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-300">
							<div className="font-mono">
								<span className="font-bold text-lg">
									{(() => {
										const firstLeg = journey.legs[0] as any;
										const time =
											firstLeg?.departure || firstLeg?.plannedDeparture;
										return time
											? new Date(time).toLocaleTimeString("de-DE", {
													hour: "2-digit",
													minute: "2-digit",
											  })
											: "??:??";
									})()}
								</span>
								<span className="text-gray-500 mx-2">→</span>
								<span className="font-bold text-lg">
									{(() => {
										const lastLeg = journey.legs[
											journey.legs.length - 1
										] as any;
										const time = lastLeg?.arrival || lastLeg?.plannedArrival;
										return time
											? new Date(time).toLocaleTimeString("de-DE", {
													hour: "2-digit",
													minute: "2-digit",
											  })
											: "??:??";
									})()}
								</span>
							</div>
							{journey.price && (
								<span className="font-mono font-bold text-primary text-lg">
									{journey.price.amount.toFixed(2)} {journey.price.currency}
								</span>
							)}
						</div>
						{/* Journey Legs - Simplified */}
						<div className="space-y-3">
							{journey.legs.map(
								(leg, legIndex) =>
									leg.line && (
										<div key={legIndex} className="font-mono text-sm">
											<div className="flex items-center gap-2 mb-1">
												<span className="inline-block bg-gray-200 px-2 py-1 rounded font-semibold">
													{leg.line.name}
												</span>
											</div>
											<div className="flex items-center gap-2 text-gray-700">
												<span className="font-bold">
													{(() => {
														const legData = leg as any;
														const time =
															legData.departure || legData.plannedDeparture;
														return time
															? new Date(time).toLocaleTimeString("de-DE", {
																	hour: "2-digit",
																	minute: "2-digit",
															  })
															: "??:??";
													})()}
												</span>
												<span>{leg.origin.name}</span>
												<span className="text-gray-400">→</span>
												<span className="font-bold">
													{(() => {
														const legData = leg as any;
														const time =
															legData.arrival || legData.plannedArrival;
														return time
															? new Date(time).toLocaleTimeString("de-DE", {
																	hour: "2-digit",
																	minute: "2-digit",
															  })
															: "??:??";
													})()}
												</span>
												<span>{leg.destination.name}</span>
											</div>
										</div>
									)
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
