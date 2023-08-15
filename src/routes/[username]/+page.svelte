<script lang="ts">
  import UserLink from "$lib/components/UserLink.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content="Links shared by @{data.username}" />
</svelte:head>

<main class="prose text-center mx-auto mt-8">
  <h1 class="text-5xl text-primary my-8">@{data.username}</h1>

  <img
    class="mx-auto h-52 object-cover"
    src={data.photoURL}
    alt="PhotoURL"
    width="256"
  />

  <ul class="list-none my-8">
    {#each data.links as link}
      <li class="my-2">
        <UserLink {...link} />
      </li>
    {/each}
  </ul>
</main>
