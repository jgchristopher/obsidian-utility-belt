import type ObsidianUtilityBelt from "src/main";
import { ObsidianUtilityBeltSettings } from "src/settingstypes";
import { type Writable, writable } from "svelte/store";

export let settings: Writable<ObsidianUtilityBeltSettings>;

export function init(plugin: ObsidianUtilityBelt) {
	if (settings) {
		return;
	}
	const { subscribe, set, update } = writable(plugin.settings);
	settings = {
		subscribe,
		update,
		// save the plugin values when setting the store
		set: (value: ObsidianUtilityBeltSettings) => {
			set(value);
			plugin.saveSettings();
		},
	};
}
