<script lang="ts">
	import { settings } from "./settingsstore";
	import { propertyStore } from "svelte-writable-derived";

	let level2settings = propertyStore(settings, "level2settings");
	let chosenSetting = propertyStore(level2settings, 1);
</script>

<div class="setting-item">
	<div class="setting-item-info">
		<div class="setting-item-name">Daily Note Header</div>
		<div class="setting-item-description">
			Comma separated list of file paths to ignore when setting peek date
			This is Svelte
		</div>
	</div>
	<div class="setting-item-control">
		<input
			type="text"
			bind:value={$chosenSetting.peekIgnore}
			spellcheck="false"
			placeholder=""
		/>
	</div>
</div>
