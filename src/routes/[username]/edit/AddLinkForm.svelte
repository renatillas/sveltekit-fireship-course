<script lang="ts">
  import { db, user } from "$lib/firebase";
  import { doc, updateDoc, arrayUnion } from "firebase/firestore";
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";

  const icons = [
    "Twitter",
    "Youtube",
    "TikTok",
    "LinkedIn",
    "Github",
    "Custom",
  ];
  const formDefaults = {
    icon: "custom",
    title: "",
    url: "https://",
  } as const;

  const dispatch = createEventDispatcher();

  const formData = writable({ ...formDefaults });
  $: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
  $: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
  $: formIsValid = titleIsValid && urlIsValid;

  async function addLink(_: SubmitEvent) {
    const userRef = doc(db, "users", $user!.uid);

    await updateDoc(userRef, {
      links: arrayUnion({
        ...$formData,
        id: Date.now().toString(),
      }),
    });

    formData.set({
      ...formDefaults,
    });
    formData.subscribe((value) => console.log(value));
    dispatch("hideForm");
  }

  function cancelLink() {
    formData.set({
      ...formDefaults,
    });
    dispatch("hideForm");
  }
</script>

<form
  class="flex-col flex gap-3 bg-base-200 p-6 w-full mx-auto rounded-xl"
  on:submit|preventDefault={addLink}
>
  <select name="icon" class="select select-sm" bind:value={$formData.icon}>
    <option disabled selected>Pick your icon</option>
    {#each icons as icon}
      <option value={icon.toLowerCase()}>{icon}</option>
    {/each}
  </select>

  <input
    name="title"
    type="text"
    placeholder="Title"
    class="input input-sm"
    bind:value={$formData.title}
  />

  <input
    name="url"
    type="text"
    placeholder="URL"
    class="input input-sm"
    bind:value={$formData.url}
  />

  <div>
    {#if !titleIsValid}
      <p class="text-error text-xs">Must have a valid title</p>
    {/if}
    {#if !urlIsValid}
      <p class="text-error text-xs">Must have a valid url</p>
    {/if}
    {#if formIsValid}
      <p class="text-success text-xs">Looks good!</p>
    {/if}
  </div>

  <button disabled={!formIsValid} type="submit" class="btn btn-success block"
    >Add Link</button
  >
  <button type="button" class="btn btn-xs" on:click={cancelLink}>Cancel</button>
</form>
