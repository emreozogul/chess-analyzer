import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'hsl(220 40% 25%)',  // Navy blue
					a0: 'hsl(220 40% 25%)',       // Navy blue
					a10: 'hsl(220 35% 30%)',      // Lighter navy
					a20: 'hsl(220 30% 35%)',      // Even lighter navy
					a30: 'hsl(220 25% 40%)',      // Light navy
					a40: 'hsl(220 20% 45%)',      // Lighter still
					a50: 'hsl(220 15% 50%)',      // Soft navy
					foreground: 'hsl(0 0% 98%)',  // White text
				},
				secondary: {
					DEFAULT: 'hsl(0 0% 20%)',     // Dark gray for secondary elements
					a0: 'hsl(0 0% 20%)',
					a10: 'hsl(0 0% 25%)',
					a20: 'hsl(0 0% 30%)',
					a30: 'hsl(0 0% 35%)',
					a40: 'hsl(0 0% 40%)',
					a50: 'hsl(0 0% 45%)',
					foreground: 'hsl(0 0% 98%)',  // White text for secondary elements
				},
				mixed: {
					DEFAULT: 'hsl(220 15% 12%)',  // Dark navy for mixed elements
					a0: 'hsl(220 15% 12%)',
					a10: 'hsl(220 15% 18%)',
					a20: 'hsl(220 15% 25%)',
					a30: 'hsl(220 15% 30%)',
					a40: 'hsl(220 15% 35%)',
					a50: 'hsl(220 15% 40%)',
				},
				background: 'hsl(220 15% 12%)',   // Dark navy for background
				foreground: 'hsl(0 0% 98%)',      // White text for foreground
				card: {
					DEFAULT: 'hsl(220 15% 15%)',   // Slightly lighter navy for cards
					foreground: 'hsl(0 0% 98%)',   // White text for cards
				},
				popover: {
					DEFAULT: 'hsl(220 15% 20%)',   // Lighter navy for popovers
					foreground: 'hsl(0 0% 98%)',   // White text for popovers
				},
				muted: {
					DEFAULT: 'hsl(0 0% 30%)',      // Light gray for muted elements
					foreground: 'hsl(0 0% 70%)',   // Muted text color
				},
				accent: {
					DEFAULT: 'hsl(210 35% 40%)',   // Lighter blue for accents
					foreground: 'hsl(0 0% 98%)',   // White text for accents
				},
				destructive: {
					DEFAULT: 'hsl(0 60% 40%)',     // Dark red for destructive actions
					foreground: 'hsl(0 0% 98%)',   // White text for destructive actions
				},
				border: 'hsl(0 0% 25%)',           // Dark gray for borders
				input: 'hsl(0 0% 25%)',            // Dark gray for inputs
				ring: 'hsl(210 35% 40%)',          // Lighter blue for focus rings
				chart: {
					'1': 'hsl(220 60% 50%)',        // Blue for charts
					'2': 'hsl(210 45% 40%)',
					'3': 'hsl(200 40% 35%)',
					'4': 'hsl(190 35% 30%)',
					'5': 'hsl(180 30% 25%)',        // Dark teal for chart 5
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
