<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
  import { swipe } from "svelte-gestures";

  function handler(event: any) {
    let direction = event.detail.direction;

    let currentRouteIndex = routes.indexOf($page.route.id!);

    if (direction === "left") {
      goto(routes[Math.min(currentRouteIndex + 1, 2)]);
    }
    if (direction === "right") {
      goto(routes[Math.max(currentRouteIndex - 1, 0)]);
    }
  }

  let routes = ["/login", "/login/username", "/login/photo"];
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
  <main
    class="card shadow-xl bg-neutral w-5/6 mx-auto"
    use:swipe={{ touchAction: "pan-y" }}
    on:swipe={handler}
  >
    <div class="card-body gap-6 items-center text-center">
      <slot />
    </div>
  </main>
</AnimatedRoute>
