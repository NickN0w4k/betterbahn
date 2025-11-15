import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "BetterBahn - PWA",
	description: "Eine Progressive Web App für BetterBahn",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="de">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto px-2 max-w-4xl py-4`}
			>
				{children}
			</body>
		</html>
	);
}
