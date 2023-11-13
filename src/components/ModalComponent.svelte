<script lang="ts">
	import { type Olevel2Settings } from "src/settingstypes";

	export let chosenSetting: Olevel2Settings;
</script>

<div class="setting-item">
	<div class="setting-item-info">
		<div class="setting-item-name">Daily Note Header</div>
		<div class="setting-item-description">
			Comma separated list of file paths to ignore when setting peek date.
			For {chosenSetting.title}
		</div>
	</div>
	<div class="setting-item-control">
		<input
			type="text"
			bind:value={chosenSetting.peekIgnore}
			spellcheck="false"
			placeholder=""
		/>
	</div>
</div>
