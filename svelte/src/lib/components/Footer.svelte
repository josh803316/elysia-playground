<script>
  import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
</script>

<Footer class="fixed bottom-0 left-0 z-20 w-full">
  <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
    <FooterCopyright href="/" by="Notes App" year={2024} />
    <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
      <FooterLink href="/">Privacy Policy</FooterLink>
    </FooterLinkGroup>
  </div>
</Footer> 
