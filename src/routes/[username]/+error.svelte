<script>
  import { page } from "$app/stores";
</script>

<head>
  <meta charset="utf-8" />
  <title>%sveltekit.error.message%</title>
</head>
<body>
  <h1>Ups</h1>
  <p>Status: {$page.status}</p>
  <p>Message: {$page.error?.message}</p>
</body>
