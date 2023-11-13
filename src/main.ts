import { App, Plugin, PluginSettingTab, TFile } from "obsidian";
import SettingsComponent from "./settings/SettingsComponent.svelte";
import { init } from "./settings/settingsstore";
import type { SvelteComponent } from "svelte";
import { ObsidianUtilityBeltSettings, DEFAULT_SETTINGS } from "./settingstypes";

export default class ObsidianUtilityBelt extends Plugin {
	settings: ObsidianUtilityBeltSettings;
	ignores: string[];

	async onload() {
		await this.loadSettings();
		this.ignores = this.settings.level2settings[0].peekIgnore.split(",");
		const _app = this.app;
		const _that = this;
		this.app.workspace.on("file-open", function (file) {
			try {
				if (file && !_that.isFilePeekIgnored(file)) {
					console.log(file.name, " was opened");
					_app.fileManager.processFrontMatter(
						file,
						(frontmatter: any) => {
							frontmatter["peeked"] = window
								.moment()
								.format("YYYY-MM-DD");
						},
					);
				}
			} catch (e) {
				console.log("Ignoring file for peek");
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new ObsidianUtilityBeltSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	isFilePeekIgnored(file: TFile | null): boolean {
		if (file == null) {
			return false;
		}
		this.ignores.forEach(function (ignore) {
			if (file.path.includes(ignore)) {
				throw new Error("Ignore");
			}
		});
		return false;
	}
}

class ObsidianUtilityBeltSettingTab extends PluginSettingTab {
	plugin: ObsidianUtilityBelt;
	private view: SvelteComponent;

	constructor(app: App, plugin: ObsidianUtilityBelt) {
		super(app, plugin);
		this.plugin = plugin;
		init(this.plugin);
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		this.view = new SettingsComponent({
			target: containerEl,
			props: {
				plugin: this.plugin,
			},
		});
	}

	async hide() {
		super.hide();
		this.view.$destroy();
	}

	// display(): void {
	// 	const { containerEl } = this;
	//
	// 	containerEl.empty();
	//
	// 	containerEl.createEl("h2", { text: "File Peek Settings." });
	//
	// 	new Setting(containerEl)
	// 		.setName("Paths to Ignore")
	// 		.setDesc(
	// 			"Comma separated list of file paths to ignore when setting peek date",
	// 		)
	// 		.addText((text) =>
	// 			text
	// 				.setPlaceholder("daily_notes,templates")
	// 				.setValue(this.plugin.settings.level2settings[0].peekIgnore)
	// 				.onChange(async (value) => {
	// 					this.plugin.settings.level2settings[0].peekIgnore =
	// 						value;
	// 					await this.plugin.saveSettings();
	// 				}),
	// 		);
	// }
}
