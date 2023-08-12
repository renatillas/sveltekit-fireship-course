<script lang="ts">
  import { page } from "$app/stores";
  import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>

<nav class="flex justify-center my-6">
  <ul class="steps">
    <a href="/login" class="step step-primary" data-content="👤">Login</a>
    <a
      href="/login/username"
      class="step"
      class:step-primary={$page.route.id?.match(/username|photo/g)}
      data-content="🔤"
    >
      Choose username
    </a>
    <a
      href="/login/photo"
      class="step"
      class:step-primary={$page.route.id?.match(/photo/g)}
      data-content="📷"
    >
      Choose photo
    </a>
  </ul>
</nav>

<AnimatedRoute>
  <main class="card bg-neutral w-2/3 mx-auto text-neutral-content">
    <div class="card-body items-center text-center">
      <slot />
    </div>
  </main>
</AnimatedRoute>
