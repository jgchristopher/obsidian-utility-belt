export interface Olevel2Settings {
	title: string;
	peekIgnore: string;
}

export interface ObsidianUtilityBeltSettings {
	level2settings: Olevel2Settings[];
}

export const DEFAULT_SETTINGS: ObsidianUtilityBeltSettings = {
	level2settings: [
		{
			title: "Default",
			peekIgnore: "",
		},
		{
			title: "Second",
			peekIgnore: "I am Second",
		},
	],
};
