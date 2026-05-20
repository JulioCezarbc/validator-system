<template>
  <UContainer class="py-10 min-h-screen flex flex-col">
    
    <UHeader>
      
      <template #title>
      <div class="flex items-center gap-2">
        <Icon name="lucide:house-heart" />
        <span>Sistema de Validadores</span>
      </div>
    </template>

      <template #right>
        <UColorModeButton />

          <UButton
            color="neutral"
            variant="ghost"
            to="https://github.com/JulioCezarbc"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
          />
          <UButton
          icon="i-simple-icons-linkedin"
          color="info"
          variant="ghost"
          to="https://www.linkedin.com/in/juliobcordeiro/"
          target="_blank"
          aria-label="X"
          />
      </template>
    </UHeader>
    
    <UMain class="py-5">
      <NuxtPage />
    </UMain>


    <UToaster position="bottom-right" />


    <UFooter>

      <template #left>
        <p class="text-muted text-sm">© 2026 - Julio Cordeiro</p>
      </template>
      <template #right>
        <div class="w-24 overflow-hidden">
          <UMarquee
            pause-on-hover
            class="max-w-full"
          >
            <div class="flex items-center gap-1 px-1">
              <UButton
                color="neutral"
                variant="ghost"
                to="https://github.com/JulioCezarbc"
                target="_blank"
                icon="i-simple-icons-github"
                aria-label="GitHub"
              />

              <UButton
                color="info"
                variant="ghost"
                to="https://www.linkedin.com/in/juliobcordeiro/"
                target="_blank"
                icon="i-simple-icons-linkedin"
                aria-label="LinkedIn"
              />
            </div>
          </UMarquee>
        </div>
      </template>

    </UFooter>
    
  </UContainer>
</template>