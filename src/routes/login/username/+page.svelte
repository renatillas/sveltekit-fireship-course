<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db } from "$lib/firebase";
  import { doc, getDoc } from "firebase/firestore";

  let username = "";
  let isAvailable = false;
  let isLoading = true;

  type Milliseconds = number;
  const debounce_duration: Milliseconds = 500;
  let debounce: NodeJS.Timeout;

  async function checkUsernameAvailability() {
    console.log("check availability dispatched", username);
    clearTimeout(debounce);
    isAvailable = false;
    if (!username) return;

    isLoading = true;

    debounce = setTimeout(async () => {
      console.log("checking availability of ", username);

      const docRef = doc(db, "usernames", username);
      const exists = await getDoc(docRef).then((doc) => doc.exists());

      isAvailable = !exists;
      isLoading = false;
    }, debounce_duration);
  }

  async function confirmUsername() {
    console.log("username confirmed", username);
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
      on:input={checkUsernameAvailability}
    />

    <p>Is username available? {isAvailable ? "Yes" : "No"}</p>

    <button class="btn btn-success">Confirm username @{username}</button>
  </form>
</AuthCheck>
