<script lang="ts">
  import { page } from "$app/stores";
  import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>

<nav class="flex justify-center my-6">
  <ul class="steps">
    <a href="/login" class="step step-primary">Login</a>
    <a
      href="/login/username"
      class="step"
      class:step-primary={$page.route.id?.match(/username|photo/g)}
    >
      Choose username
    </a>
    <a
      href="/login/photo"
      class="step"
      class:step-primary={$page.route.id?.match(/photo/g)}
    >
      Choose photo
    </a>
  </ul>
</nav>

<AnimatedRoute>
  <main class="card shadow-xl bg-neutral w-5/6 mx-auto">
    <div class="card-body gap-6 items-center text-center">
      <slot />
    </div>
  </main>
</AnimatedRoute>
