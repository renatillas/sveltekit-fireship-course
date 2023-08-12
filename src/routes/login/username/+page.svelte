<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db } from "$lib/firebase";
  import { debounce } from "$lib/utils";
  import { doc, getDoc } from "firebase/firestore";

  let username = "";
  let isAvailable = false;
  let isLoading = true;

  async function checkUsernameAvailability(): Promise<void> {
    if (!username) return;

    console.log("checking availability of ", username);

    isAvailable = false;
    isLoading = true;

    const docRef = doc(db, "usernames", username);
    const exists = await getDoc(docRef).then((doc) => doc.exists());

    isAvailable = !exists;
    isLoading = false;
  }

  let debouncedCheck = debounce(checkUsernameAvailability, 500);

  async function confirmUsername() {
    console.log("confirming username", username);
  }
</script>

<AuthCheck>
  <h2>Username</h2>
  <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
    <input
      class="input w-full"
      type="text"
      placeholder="Username"
      bind:value={username}
      on:input={debouncedCheck}
    />

    <p>Is username available? {isAvailable ? "Yes" : "No"}</p>

    <button class="btn btn-success">Confirm username @{username}</button>
  </form>
</AuthCheck>
