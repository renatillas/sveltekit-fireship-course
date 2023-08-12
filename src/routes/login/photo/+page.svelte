<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, storage, user, userData } from "$lib/firebase";
  import { doc, updateDoc } from "firebase/firestore";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

  let previewURL: string;
  let uploading: boolean;
  let uploadCompleted: boolean = false;
  $: href = `/${$userData?.username}/edit`;

  async function upload(e: Event) {
    uploading = true;
    const file = (e.target as HTMLInputElement)!.files!.item(0)!;
    previewURL = URL.createObjectURL(file);

    const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
    const result = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(result.ref);

    await updateDoc(doc(db, "users", $user!.uid), { photoURL: url });
    uploading = false;
    uploadCompleted = true;
  }
</script>

<AuthCheck>
  <h2 class="card-title">Upload a Profile Photo</h2>

  <form class="max-w-screen-md w-full">
    <div class="form-control w-full max-w-xs mx-auto text-center">
      <img
        src={previewURL ?? $userData?.photoURL ?? "/user.png"}
        alt="photoURL"
        width="256"
        height="256"
        class="mx-auto"
      />
      <label for="photoURL" class="label">
        <span class="label-text">Pick a file</span>
      </label>
      <input
        on:change={upload}
        name="photoURL"
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
        accept="image/png, image/jpeg, image/gif, image/webp"
      />
      {#if uploading}
        <p class="mt-6">Uploading...</p>
        <progress class="progress progress-info mt-6" />
      {/if}
      {#if uploadCompleted}
        <p class="mt-6">Your photo was uploaded successfully!</p>
      {/if}
    </div>
  </form>
  <a {href} class="btn btn-primary"> Finish </a>
</AuthCheck>
