<script lang="ts">
  import { user } from "$lib/firebase";
</script>

{#if $user}
  <slot />
{:else}
  <p class="text-error">You must be logged in to view this page.</p>
  <a class="btn btn-primary" href="/login">Sign in</a>
{/if}
