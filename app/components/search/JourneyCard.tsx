"use client";

import { Journey } from "@/lib/types";

interface JourneyCardProps {
	journey: Journey;
	index: number;
}

export default function JourneyCard({ journey, index }: JourneyCardProps) {
	const formatTime = (time: string | undefined) => {
		return time
			? new Date(time).toLocaleTimeString("de-DE", {
					hour: "2-digit",
					minute: "2-digit",
			  })
			: "??:??";
	};

	const getFirstLegDeparture = () => {
		const firstLeg = journey.legs[0] as any;
		const time = firstLeg?.departure || firstLeg?.plannedDeparture;
		return formatTime(time);
	};

	const getLastLegArrival = () => {
		const lastLeg = journey.legs[journey.legs.length - 1] as any;
		const time = lastLeg?.arrival || lastLeg?.plannedArrival;
		return formatTime(time);
	};

	return (
		<div className="border-2 border-gray-800 rounded-3xl p-4 hover:border-primary transition-colors">
			{/* Remarks Section */}
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
			)}

			{/* Journey Overview */}
			<div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-300">
				<div className="font-mono">
					<span className="font-bold text-lg">{getFirstLegDeparture()}</span>
					<span className="text-gray-500 mx-2">→</span>
					<span className="font-bold text-lg">{getLastLegArrival()}</span>
				</div>
				{journey.price && (
					<span className="font-mono font-bold text-primary text-lg">
						{journey.price.amount.toFixed(2)} {journey.price.currency}
					</span>
				)}
			</div>

			{/* Journey Legs */}
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
										{formatTime(
											(leg as any).departure || (leg as any).plannedDeparture
										)}
									</span>
									<span>{leg.origin.name}</span>
									<span className="text-gray-400">→</span>
									<span className="font-bold">
										{formatTime(
											(leg as any).arrival || (leg as any).plannedArrival
										)}
									</span>
									<span>{leg.destination.name}</span>
								</div>
							</div>
						)
				)}
			</div>
			<div className="flex gap-4 mt-8">
				<button
					onClick={() => {
						alert("Bald verfügbar!");
					}}
					className="bg-primary rounded-2xl py-2 px-6 text-white font-bold"
				>
					Split Ticketing
				</button>
				<button
					onClick={() => {
						alert("Bald verfügbar!");
					}}
					className="bg-primary rounded-2xl py-2 px-6 text-white font-bold"
				>
					Reise erweitern
				</button>
			</div>
		</div>
	);
}
