<script>
  import { Alert, Button, Card, Heading } from 'flowbite-svelte';
</script>

<div class="p-8">
  <Heading tag="h1" class="mb-4">Flowbite-Svelte Test Page</Heading>
  
  <Alert class="mb-4">
    <span class="font-medium">Info alert!</span>
    Change a few things up and try submitting again.
  </Alert>
  
  <Card class="mb-4">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Flowbite Card Component
    </h5>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">
      This card component is part of Flowbite-Svelte.
    </p>
    <Button>Read more <svg aria-hidden="true" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></Button>
  </Card>
</div> 
