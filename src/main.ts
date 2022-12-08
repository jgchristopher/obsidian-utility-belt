import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

// Remember to rename these classes and interfaces!

interface ObsidianUtilityBeltSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: ObsidianUtilityBeltSettings = {
	mySetting: "default",
};

export default class ObsidianUtilityBelt extends Plugin {
	settings: ObsidianUtilityBeltSettings;

	async onload() {
		await this.loadSettings();

		const _app = this.app;
		this.app.workspace.on("file-open", function (file) {
			if (file) {
				console.log(file.name, " was opened");
				_app.fileManager.processFrontMatter(
					file,
					(frontmatter: any) => {
						frontmatter["peeked"] = window
							.moment()
							.format("YYYY-MM-DD");
					}
				);
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
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ObsidianUtilityBeltSettingTab extends PluginSettingTab {
	plugin: ObsidianUtilityBelt;

	constructor(app: App, plugin: ObsidianUtilityBelt) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Settings for my awesome plugin." });

		new Setting(containerEl)
			.setName("Setting #1")
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						console.log("Secret: " + value);
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
