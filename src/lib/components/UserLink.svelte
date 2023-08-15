<script lang="ts">
  export let url: string = "some url";
  export let icon: string = "some icon";
  export let title: string = "some cool title";
</script>

<a
  href={url}
  class="stack flex bg-base-300 p-4 rounded-lg not-prose no-underline items-center tooltip"
  data-tip={url}
>
  <img src={`/${icon}.png`} alt={icon} class="w-8" />

  <span class="text-lg text-white font-bold">{title}</span>
</a>
