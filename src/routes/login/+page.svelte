<script lang="ts">
  import { user, signInWithGoogle } from "$lib/firebase";
</script>

{#if $user}
  <h2 class="card-title">Welecome, {$user.displayName}</h2>
  <p class="text-center text-success">You are logged in</p>
  <a class="btn btn-primary" href="login/username">Next</a>
{:else}
  <button class="btn btn-primary" on:click={signInWithGoogle}>
    Sign in with google
  </button>
{/if}
