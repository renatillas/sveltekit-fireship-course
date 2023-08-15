<script lang="ts">
  import { page } from "$app/stores";
  import UserLink from "$lib/components/UserLink.svelte";
  import { db, user, userData } from "$lib/firebase";
  import { doc, updateDoc, arrayRemove } from "firebase/firestore";
  import AddLinkForm from "./AddLinkForm.svelte";

  let showForm: boolean = false;

  async function deleteLink(item: any) {
    const userRef = doc(db, "users", $user!.uid);
    await updateDoc(userRef, {
      links: arrayRemove(item),
    });
  }
</script>

<main class="max-w-xl mx-auto">
  {#if $userData?.username == $page.params.username}
    <h1 class="mx-2 text-2xl font-bold mt-8 mb-8 text-center">
      Edit your profile
    </h1>
    <div class="text-center my-8">
      <a class="btn btn-outline btn-xs" href="/login/photo">Change photo</a>
    </div>

    <ul class="my-8 list-none flex flex-col gap-4 items-center max-w-md">
      {#each $userData.links as link}
        <li class="w-full">
          <div class="group relative">
            <UserLink {...link} />
            <button
              on:click={() => deleteLink(link)}
              class="btn btn-xs btn-error invisible group-hover:visible transition-all absolute -right-6 bottom-10"
              >Delete</button
            >
          </div>
        </li>
      {/each}
    </ul>
    {#if showForm}
      <AddLinkForm on:hideForm={() => (showForm = false)} />
    {:else}
      <button
        on:click={() => (showForm = true)}
        class="btn btn-outline btn-info block mx-auto">Add a link</button
      >
    {/if}
  {:else}
    <h1>You cannot edit other people's profile</h1>
  {/if}
</main>
