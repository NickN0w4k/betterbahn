"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StationInput from "./StationInput";
import type { Station } from "@/lib/types";

export default function SearchForm() {
	const router = useRouter();
	const [origin, setOrigin] = useState<Station | null>(null);
	const [destination, setDestination] = useState<Station | null>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!origin || !destination) {
			alert("Bitte wähle Start- und Zielbahnhof aus");
			return;
		}

		const formData = new FormData(e.currentTarget);

		// Build URL search params for the API call
		const params = new URLSearchParams();

		// Required: from and to station IDs
		params.append("from", origin.id);
		params.append("to", destination.id);

		// Date/Time - if provided, use departure, otherwise use current time
		const dateTime = formData.get("dateTime") as string;
		if (dateTime) {
			params.append("departure", dateTime);
		}

		// Optional parameters
		const age = formData.get("age") as string;
		if (age) {
			params.append("age", age);
		}

		const hasDTicket = formData.get("hasDTicket") === "on";
		if (hasDTicket) {
			params.append("deutschlandTicketDiscount", "true");
		}

		const trainClass = formData.get("trainClass") as string;
		if (trainClass === "1") {
			params.append("firstClass", "true");
		}

		const bahncard = formData.get("bahncard") as string;
		if (bahncard !== "none") {
			params.append("loyaltyCard", `bahncard${bahncard}`);
		}

		// Always request tickets info
		params.append("tickets", "true");

		// Navigate to results page with search params
		router.push(`/results?${params.toString()}`);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-3 w-full max-w-2xl p-4"
		>
			{/* Origin Station */}
			<StationInput
				placeholder="Dresden Hbf"
				value=""
				onSelect={(station) => setOrigin(station)}
			/>

			{/* Destination Station */}
			<StationInput
				placeholder="München Hbf."
				value=""
				onSelect={(station) => setDestination(station)}
			/>

			{/* Date and Time */}
			<input
				type="datetime-local"
				name="dateTime"
				className="w-full border-2 border-gray-800 rounded-lg p-3 text-base font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
			/>

			{/* Age and D-Ticket Row */}
			<div className="flex flex-col gap-3">
				<input
					type="number"
					name="age"
					placeholder="Dein Alter"
					className="w-full border-2 border-gray-800 rounded-lg p-3 text-base font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
				/>
				<label className="flex items-center gap-3 border-2 border-gray-800 rounded-lg p-3 text-base font-mono">
					<span>D-Ticket:</span>
					<input
						type="checkbox"
						name="hasDTicket"
						className="w-5 h-5 accent-primary"
					/>
				</label>
			</div>

			{/* Class and Bahncard Row */}
			<div className="flex flex-col gap-3">
				<select
					name="trainClass"
					defaultValue="2"
					className="w-full border-2 border-gray-800 rounded-lg p-3 text-base font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
				>
					<option value="2">2. Klasse</option>
					<option value="1">1. Klasse</option>
				</select>
				<select
					name="bahncard"
					defaultValue="none"
					className="w-full border-2 border-gray-800 rounded-lg p-3 text-base font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
				>
					<option value="none">Keine Bahncard</option>
					<option value="25">Bahncard 25</option>
					<option value="50">Bahncard 50</option>
					<option value="100">Bahncard 100</option>
				</select>
			</div>

			{/* Search Button */}
			<button
				type="submit"
				className="w-full bg-primary text-white rounded-lg p-3 text-lg font-mono font-bold hover:opacity-90 transition-opacity"
			>
				Verbindung suchen
			</button>
		</form>
	);
}
