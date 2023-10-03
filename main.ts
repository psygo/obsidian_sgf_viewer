import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

interface SgfViewerSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: SgfViewerSettings = {
	mySetting: "default",
};

export default class SgfViewer extends Plugin {
	settings: SgfViewerSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new SgfViewerSettingTab(this.app, this));
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

class SgfViewerSettingTab extends PluginSettingTab {
	plugin: SgfViewer;

	constructor(app: App, plugin: SgfViewer) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Create Board")
			.setDesc("Creates an SGF View of a SGF file.")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
