<script lang="ts">
  import { goto } from "$app/navigation";
  import { auth, userData } from "$lib/firebase";
  import { signOut } from "firebase/auth";

  let searchUsername: string = "";

  function searchUser() {
    goto(`/${searchUsername}`);
  }
</script>

<nav class="navbar bg-base-200">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/">Relinks</a>
  </div>

  <div class="flex-none gap-2">
    <form class="form-control" on:submit|preventDefault={searchUser}>
      <input
        class="input input-bordered w-56"
        type="text"
        placeholder="Search username"
        bind:value={searchUsername}
      />
    </form>

    <div class="dropdown dropdown-end">
      <div tabindex="-1" class="btn btn-ghost btn-circle avatar">
        <div class="rounded-full">
          <img
            src={$userData?.photoURL ??
              "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png"}
            alt="photoURL"
          />
        </div>
      </div>
      <ul
        class="menu menu-sm dropdown-content bg-base-300 rounded-box w-52 p-3 z-[1] mt-2"
        tabindex="-1"
      >
        {#if $userData != null}
          <li><a href={`/${$userData?.username}`}>View profile</a></li>
          <li><a href={`/${$userData?.username}/edit`}>Edit profile</a></li>
          <li>
            <button
              class="btn btn-warning btn-sm mt-4"
              on:click={() => signOut(auth)}>Logout</button
            >
          </li>
        {:else}
          <li>
            <a class="btn btn-warning btn-sm mt-4" href="/login">Sign up</a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<slot />
