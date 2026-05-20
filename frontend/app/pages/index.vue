<script setup lang="ts">
const cards = [
  {
    title: "Validação de CNPJ",
    description:
      "Verifica o formato e os dígitos verificadores de CNPJs brasileiros.",
    icon: "lucide:building-2",
    color: "secondary",
    to: "/validator/cnpj",
  },
  {
    title: "Módulo 10 (Boletos)",
    description:
      "Calcula e confere o dígito verificador de blocos de linhas digitáveis e boletos bancários.",
    icon: "lucide:barcode",
    color: "primary",
    to: "/validator/mod10",
  },
  {
    title: "Validação de Cartão (Luhn)",
    description:
      "Valida números de cartão de crédito usando o algoritmo de Luhn.",
    icon: "lucide:credit-card",
    color: "warning",
    to: "/validator/luhn",
  },
] as const;
</script>

<template>
  <div>
    <div class="space-y-2">
      <h1 class="text-2xl font-bold tracking-tight md:text-3xl">
        Ferramentas de Validação
      </h1>

      <p class="max-w-2xl text-sm md:text-base">
        Escolha uma das validações abaixo para acessar a ferramenta desejada.
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 py-2">
      <UCard
        v-for="card in cards"
        :key="card.title"
        class="group h-full hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-150 hover:-translate-y-1"
      >
        <UBadge
          class="mb-4 p-2 transition-transform group-hover:translate-x-2"
          :icon="card.icon"
          :color="card.color"
          variant="subtle"
          size="xl"
        />

        <h2 class="mb-2 text-xl font-semibold">
          {{ card.title }}
        </h2>

        <p class="text-sm">
          {{ card.description }}
        </p>
       <template #footer>
         <div
          class="flex justify-end"
        >
          <UButton
            class="cursor-pointer transition-transform group-hover:translate-x-2"
            variant="subtle"
            :color="card.color"
            label="Acessar"
            loading-auto
            @click="navigateTo(card.to)"
            trailing-icon="i-lucide-arrow-right"
            size="xl"
          >
          </UButton>
        </div>
       </template>
      </UCard>
    </div>
  </div>
</template>
