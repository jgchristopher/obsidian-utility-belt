export interface Olevel2Settings {
	peekIgnore: string;
}

export interface ObsidianUtilityBeltSettings {
	level2settings: Olevel2Settings[];
}

export const DEFAULT_SETTINGS: ObsidianUtilityBeltSettings = {
	level2settings: [
		{
			peekIgnore: "",
		},
		{
			peekIgnore: "I am Second",
		},
	],
};
