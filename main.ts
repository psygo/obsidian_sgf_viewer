import {
	App,
	Editor,
	MarkdownView,
	Plugin,
	PluginSettingTab,
	Setting,
	ListedFiles,
	editorLivePreviewField,
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

	async onload() {
		this.app.workspace.on(
			"editor-change",
			async (editor: Editor, info: MarkdownView) => {
				const activeFile = this.app.workspace.getActiveFile();
				if (activeFile) {
					const text = await this.app.vault.read(activeFile);
				}

				this.app.vault.process(
					this.app.vault
						.getFiles()
						// Does get the content of a file
						.filter((f) => f.name.contains("psygo"))[0],
					(data: string) => {
						const wgoDiv = document.createElement("div");
						wgoDiv.id = "test";
						const simplePlayer = new SimplePlayer(wgoDiv, {
							sgf: data,
						});

						const parentDiv = document.createElement("div");
						parentDiv.className = "internal-embed";
						parentDiv.appendChild(wgoDiv);

						// Don't use this, otherwise it's gonna paste a bazillion text lines
						// to your file. It does work if you put it append it to the work-
						// space though.
						// const workspace =
						// 	document.body.querySelectorAll(".cm-content")[0];
						// workspace!.append(parentDiv);

						return data;
					}
				);
				// console.log(
				// 	this.app.vault
				// 		.getFiles()
				// 		.filter((f) => f.name.contains("psygo"))[0]
				// );
			}
		);

		// this.registerDomEvent(document, "keyup", async (evt: Event) => {
		// 	const activeFile = this.app.workspace.getActiveFile();
		// 	if (activeFile) {
		// 		const text = await this.app.vault.read(activeFile);
		// 		const sgfMatches = text
		// 			.match(/<sgf>(.*?)<\/sgf>/g)
		// 			?.map(function (val) {
		// 				return val.replace(/<\/?sgf>/g, "");
		// 			});

		// 		if (sgfMatches) {
		// 			const lines = Array.from(
		// 				document.body.querySelectorAll<HTMLDivElement>(
		// 					".cm-line"
		// 				)
		// 			);

		// 			for (const sgfMatch of sgfMatches) {
		// 				const sgfLineDiv = lines.filter((l) =>
		// 					l.innerHTML.contains(sgfMatch)
		// 				)[0];

		// 				if (sgfLineDiv) {
		// 					const div = document.createElement("div");
		// 					div.className = "sgf";
		// 					const simplePlayer = new SimplePlayer(div, {
		// 						sgf: sgfMatch,
		// 					});
		// 					sgfLineDiv?.appendChild(div);
		// 				}
		// 			}
		// 		}
		// 	}
		// });

		this.addCommand({
			id: "add-sgf-game-viewer",
			name: "Add SGF Game Viewer",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const div = document.createElement("div");
				div.id = "test";
				const simplePlayer = new SimplePlayer(div, {
					sgf: "(;SZ[19];B[pc];W[pe]C[You have many choices - for example: R13];B[qg]C[Click on a letter to select a variation](;W[of]C[Old joseki];B[mc];W[qc];B[qb];W[qd];B[qj];W[ob];B[pb];W[oc];B[od];W[pd];B[oa];W[nd];B[nb];W[oe];B[jc])(;W[qc];B[qb];W[qd];B[mc](;W[og];B[pg];W[oh];B[pi];W[ob];B[pb];W[oc];B[pd];W[od];B[qe];W[re];B[qf];W[rb];B[oe];W[ne];B[pf];W[md]TR[rb][qc][qd][re]C[Marked stones are not dead yet.])(;W[pg];B[ph];W[ob];B[pb];W[oc];B[od];W[pd];B[nc];W[nd]MA[og]C[White can play at X as well.];B[oe];W[nf];B[oa];W[of];B[nb];W[qh];B[qf];W[pi];B[oh];W[ri];B[rh];W[qi];B[pf];W[nh];B[re];W[oc];B[ob];W[ne];B[oc];W[rg];B[rf];W[sh];B[rc]C[Interesting joseki])))",
				});
				const workspace = document.body.querySelectorAll(
					".workspace-tab-container"
				)[1];

				workspace!.append(div);
			},
		});
	}

	onunload() {}
}
