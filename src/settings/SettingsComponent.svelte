<script lang="ts">
	import { Modal } from "obsidian";
	import { get } from "svelte/store";
	import { settings } from "./settingsstore";
	import { propertyStore } from "svelte-writable-derived";
	import ModalComponent from "src/components/ModalComponent.svelte";

	let level2settings = propertyStore(settings, "level2settings");

	const handleClick = (settingsNumber: number) => {
		const settingsChosenStore = propertyStore(settings, [
			"level2settings",
			settingsNumber,
		]);
		const settingsScreen = new Modal(this.app);
		settingsScreen.titleEl.createEl("h2", {
			text: get(settingsChosenStore).title,
		});

		new ModalComponent({
			target: settingsScreen.contentEl,
			props: {
				chosenSetting: settingsChosenStore,
			},
		});

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
