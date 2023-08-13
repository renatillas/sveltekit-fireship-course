<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content="Links shared by @{data.username}" />
</svelte:head>

<main class="prose text-center mx-auto mt-8">
  <h1 class="text-5xl text-primary my-8">@{data.username}</h1>

  <img class="mx-auto" src={data.photoURL} alt="PhotoURL" width="256" />

  <p class="text-xl my-8">{data.bio}</p>

  <ul class="list-none">
    {#each data.links as link}
      <p />{/each}
  </ul>
</main>
