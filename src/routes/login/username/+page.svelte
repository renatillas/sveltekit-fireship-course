<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user } from "$lib/firebase";
  import { debounce } from "$lib/utils";
  import { doc, getDoc, writeBatch } from "firebase/firestore";

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
    const batch = writeBatch(db);

    console.log($user!.uid);

    batch.set(doc(db, "usernames", username), { uid: $user!.uid });
    batch.set(doc(db, "users", $user!.uid), {
      username,
      photoURL: $user!.photoURL ?? null,
      published: true,
      bio: "Test bio",
      links: [
        {
          title: "Title Link",
          url: "https://www.google.com",
          icon: "custom",
        },
      ],
    });

    await batch.commit();

    username = "";
    isAvailable = false;
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
