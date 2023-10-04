import {
	App,
	Editor,
	MarkdownView,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";

import { SimplePlayer } from "wgo";

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

		this.addSettingTab(new SgfViewerSettingTab(this.app, this));

		// this.appendWGoScripts();

		this.addCommand({
			id: "add-sgf-game-viewer",
			name: "Add SGF Game Viewer",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const div = document.createElement("div");
				div.id = "test";
				// @ts-ignore
				const simplePlayer = new SimplePlayer(div, {
					sgf: "(;SZ[19];B[pc];W[pe]C[You have many choices - for example: R13];B[qg]C[Click on a letter to select a variation](;W[of]C[Old joseki];B[mc];W[qc];B[qb];W[qd];B[qj];W[ob];B[pb];W[oc];B[od];W[pd];B[oa];W[nd];B[nb];W[oe];B[jc])(;W[qc];B[qb];W[qd];B[mc](;W[og];B[pg];W[oh];B[pi];W[ob];B[pb];W[oc];B[pd];W[od];B[qe];W[re];B[qf];W[rb];B[oe];W[ne];B[pf];W[md]TR[rb][qc][qd][re]C[Marked stones are not dead yet.])(;W[pg];B[ph];W[ob];B[pb];W[oc];B[od];W[pd];B[nc];W[nd]MA[og]C[White can play at X as well.];B[oe];W[nf];B[oa];W[of];B[nb];W[qh];B[qf];W[pi];B[oh];W[ri];B[rh];W[qi];B[pf];W[nh];B[re];W[oc];B[ob];W[ne];B[oc];W[rg];B[rf];W[sh];B[rc]C[Interesting joseki])))",
				});
				document.body.append(div);
				// document.body.innerHTML += `
				// 	<div
				// 		data-wgo="AncientGame.sgf"
				// 		data-wgo-board="stoneHandler: WGo.Board.drawHandlers.NORMAL,
				// 						background: 'wgo/textures/wood2.jpg'"
				// 		class="SGF"
				// 	>
				// 		<p>
				// 		Your browser doesn't support the WGo.js Player. Please use a more
				// 		modern browser, like Brave, Chrome, Firefox or Edge.
				// 		</p>
				// 	</div>
				// `;
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
