<script>
  import { userData } from "$lib/firebase";
</script>

<svelte:head>
  <title>Relinks - Just upload your links lol</title>
  <meta name="description" content="Demo project" />
</svelte:head>

<main class="flex w-full min-h-screen">
  <div class="hero bg-base-200">
    <div class="hero-content text-center">
      <div class="w-full">
        <h1 class="text-7xl font-bold">Relinks</h1>
        <p class="py-6">Just a link multiplexer</p>
        {#if $userData?.username}
          <a href="/{$userData?.username}" class="btn btn-primary"
            >Go to profile</a
          >
          <a href="/{$userData?.username}/edit" class="btn btn-primary"
            >Edit profile</a
          >
        {:else}
          <a href="/login" class="btn btn-primary">Sign Up</a>
        {/if}
      </div>
    </div>
  </div>
</main>
