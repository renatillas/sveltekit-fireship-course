<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user } from "$lib/firebase";
  import { debounce } from "$lib/utils";
  import { doc, getDoc, writeBatch } from "firebase/firestore";

  let username = "";
  let isAvailable = false;
  let isLoading = false;

  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  $: isValid =
    username?.length >= 3 && username?.length <= 15 && re.test(username);
  $: isTouched = username.length > 0;
  $: isTaken = isValid && !isAvailable && !isLoading;

  const debouncedRemoteCheck = debounce(async () => {
    const docRef = doc(db, "usernames", username);
    const exists = await getDoc(docRef).then((doc) => doc.exists());
    isAvailable = !exists;
    isLoading = false;
  }, 500);

  let checkUsername = () => {
    if (!username) return;
    console.log("checking availability of ", username);

    isAvailable = false;
    isLoading = true;
    debouncedRemoteCheck();
  };

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
  <form
    class="w-full"
    on:submit|preventDefault={confirmUsername}
    autocomplete="off"
  >
    <input
      class="input w-full max-w-xs"
      class:input-error={!isValid && isTouched}
      class:input-warning={isTaken}
      class:input-success={isAvailable && isValid && !isLoading}
      type="text"
      placeholder="Username"
      bind:value={username}
      on:input={checkUsername}
    />
    <div class="my-4 min-h-16 px-8 w-full">
      {#if isLoading}
        <p class="text-secondary">
          Checking availability of username {username}
        </p>
      {/if}
      {#if !isValid && isTouched}
        <p class="text-error text-sm">
          must be 3-15 characters long, alphanumerical only
        </p>
      {/if}
      {#if isValid && !isAvailable && !isLoading}
        <p class="text-warning text-sm">
          {username} is not available :(
        </p>
      {/if}

      {#if isAvailable && isTouched && isValid}
        <button class="btn btn-success">Confirm {username}</button>
      {/if}
    </div>
  </form>
</AuthCheck>
