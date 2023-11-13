<script lang="ts">
	import { Modal, Plugin } from "obsidian";
	import { get } from "svelte/store";
	import { settings } from "./settingsstore";
	import { propertyStore } from "svelte-writable-derived";
	import ModalComponent from "src/components/ModalComponent.svelte";
	export let plugin: Plugin;

	let level2settings = propertyStore(settings, "level2settings");

	const handleClick = (settingsNumber: number) => {
		const level2 = get(level2settings);
		const settingsChosen = level2[settingsNumber];
		const settingsScreen = new Modal(this.app);
		settingsScreen.titleEl.createEl("h2", {
			text: settingsChosen.title,
		});

		new ModalComponent({
			target: settingsScreen.contentEl,
			props: {
				chosenSetting: settingsChosen,
			},
		});

		settingsScreen.onClose = () => {
			console.log("Settings when closing", settingsChosen);
			level2[settingsNumber] = settingsChosen;
			level2settings.set(level2);
			plugin.saveData({
				level2settings: get(level2settings),
			});
		};

		settingsScreen.open();
	};
</script>

<ul>
	{#each get(level2settings) as chosenSetting, i}
		<li>
			<span
				on:keypress={() => handleClick(i)}
				on:click={() => handleClick(i)}
			>
				{chosenSetting.title}
			</span>
		</li>
	{/each}
</ul>
