import {
	App,
	Editor,
	MarkdownView,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";

interface SgfViewerSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: SgfViewerSettings = {
	mySetting: "default",
};

export default class SgfViewer extends Plugin {
	settings: SgfViewerSettings;

	appendWGoScripts() {
		const wGoScriptWGo = document.createElement("script");
		wGoScriptWGo.type = "text/javascript";
		wGoScriptWGo.src = "./wgo/wgo.js";

		const wGoScriptKifu = document.createElement("script");
		wGoScriptKifu.type = "text/javascript";
		wGoScriptKifu.src = "./wgo/kifu.js";

		const wGoScriptSgfParser = document.createElement("script");
		wGoScriptSgfParser.type = "text/javascript";
		wGoScriptSgfParser.src = "./wgo/sgfparser.js";

		const wGoScriptPlayer = document.createElement("script");
		wGoScriptPlayer.type = "text/javascript";
		wGoScriptPlayer.src = "./wgo/player.js";

		const wGoScriptBasicPlayer = document.createElement("script");
		wGoScriptBasicPlayer.type = "text/javascript";
		wGoScriptBasicPlayer.src = "./wgo/basicplayer.js";

		const wGoScriptBasicPlayerComponent = document.createElement("script");
		wGoScriptBasicPlayerComponent.type = "text/javascript";
		wGoScriptBasicPlayerComponent.src = "./wgo/basicplayer.component.js";

		const wGoScriptBasicPlayerInfobox = document.createElement("script");
		wGoScriptBasicPlayerInfobox.type = "text/javascript";
		wGoScriptBasicPlayerInfobox.src = "./wgo/basicplayer.infobox.js";

		const wGoScriptBasicPlayerCommentbox = document.createElement("script");
		wGoScriptBasicPlayerCommentbox.type = "text/javascript";
		wGoScriptBasicPlayerCommentbox.src = "./wgo/basicplayer.commentbox.js";

		const wGoScriptBasicPlayerControl = document.createElement("script");
		wGoScriptBasicPlayerControl.type = "text/javascript";
		wGoScriptBasicPlayerControl.src = "./wgo/basicplayer.control.js";

		const wGoScriptPlayerEditable = document.createElement("script");
		wGoScriptPlayerEditable.type = "text/javascript";
		wGoScriptWGo.src = "./wgo/player.editable.js";

		const wGoScriptScoremode = document.createElement("script");
		wGoScriptScoremode.type = "text/javascript";
		wGoScriptScoremode.src = "./wgo/scoremode.js";

		const wGoScriptPlayerPermalink = document.createElement("script");
		wGoScriptPlayerPermalink.type = "text/javascript";
		wGoScriptPlayerPermalink.src = "./wgo/player.permalink.js";

		const wGoLinkPlayer = document.createElement("link");
		wGoLinkPlayer.rel = "stylesheet";
		wGoLinkPlayer.type = "text/css";
		wGoLinkPlayer.href = "./wgo/wgo.player.css";

		const head = document.head || document.documentElement;
		head.appendChild(wGoScriptWGo);
		head.appendChild(wGoScriptKifu);
		head.appendChild(wGoScriptSgfParser);
		head.appendChild(wGoScriptPlayer);
		head.appendChild(wGoScriptBasicPlayer);
		head.appendChild(wGoScriptBasicPlayerComponent);
		head.appendChild(wGoScriptBasicPlayerInfobox);
		head.appendChild(wGoScriptBasicPlayerCommentbox);
		head.appendChild(wGoScriptBasicPlayerControl);
		head.appendChild(wGoScriptPlayerEditable);
		head.appendChild(wGoScriptScoremode);
		head.appendChild(wGoScriptPlayerPermalink);
		head.appendChild(wGoLinkPlayer);
	}

	async onload() {
		await this.loadSettings();

		this.appendWGoScripts();

		this.addSettingTab(new SgfViewerSettingTab(this.app, this));

		this.addCommand({
			id: "sample-editor-command",
			name: "Sample editor command",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				console.log(this.app.workspace.getLastOpenFiles()[0]);
				editor.replaceSelection("Sample Editor Command");
			},
		});
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
