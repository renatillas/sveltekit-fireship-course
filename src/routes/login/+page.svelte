<script>
  import { auth, user } from "$lib/firebase";

  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    console.log(user);
  }
</script>

{#if $user}
  <h2 class="card-title">Welecome, {$user.displayName}</h2>
  <p class="text-center text-success">You are logged in</p>
  <button class="btn btn-warning" on:click={() => signOut(auth)}>Logout</button>
{:else}
  <button class="btn btn-primary" on:click={signInWithGoogle}>
    Sign in with google
  </button>
{/if}
