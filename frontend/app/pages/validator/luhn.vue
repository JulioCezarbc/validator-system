<script setup lang="ts">
import axios from 'axios'

const value = ref('')
const response = ref<{
  valid: boolean
  number: string
} | null>(null)
const loading = ref(false)

const toast = useAppToast()

const tests = [
  { input: '4539578763621486' },
  { input: '5425233430109903' },
  { input: '371449635398431' },
]

function inputTest(valueTest: any) {
  value.value = valueTest.input
}

const handleValidate = async () => {
  const hasLetter = /[a-zA-Z]/.test(value.value)

  if (hasLetter) {
    toast.error('Atenção', 'O campo não pode conter letras')
    return
  }

  const cleanedValue = value.value.replace(/\D/g, '')

  if (!cleanedValue) {
    toast.error('Atenção', 'Digite um número para validar')
    return
  }

  if (cleanedValue.length < 13 || cleanedValue.length > 19) {
    toast.warning('Atenção', 'O número deve ter entre 13 e 19 dígitos')
    return
  }

  loading.value = true

  try {
    const { data } = await axios.post('http://localhost:3000/validate/luhn', {
      card: cleanedValue
    })

    // back retorna boolean direto
    response.value = {
      valid: data.data,
      number: cleanedValue
    }

    if (response.value.valid) {
      toast.success('Sucesso na validação', 'O número é válido pelo algoritmo de Luhn')
    } else {
      toast.error('Número inválido', 'O número informado não passou na validação de Luhn')
    }

    value.value = ''
  } catch (error) {
    toast.error('Erro', 'Ocorreu um erro ao validar o número')
  } finally {
    loading.value = false
  }
}

const formatCardNumber = (input: string) => {
  return input
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-xl font-semibold">Validador Luhn</h2>
      <p class="text-gray-500">Insira o número do cartão para validação</p>
    </div>

    <div class="flex flex-col gap-4 max-w-sm mx-auto">
      <UInput
        v-model="value"
        icon="lucide:hash"
        color="warning"
        size="lg"
        placeholder="**** **** **** ****"
      />

      <UButton
        :loading="loading"
        size="lg"
        color="warning"
        variant="outline"
        :disabled="loading"
        class="cursor-pointer flex justify-center"
        block
        @click="handleValidate"
      >
        Validar Luhn
      </UButton>
    </div>

    <div class="flex flex-col items-center">
      <p class="text-md font-semibold">Exemplos para testar</p>

      <div>
        <UButton
          v-for="test in tests"
          :key="test.input"
          color="warning"
          variant="soft"
          class="m-1 cursor-pointer rounded-2xl"
          @click="inputTest(test)"
        >
          {{ test.input }}
        </UButton>
      </div>
    </div>

    <UCard
      v-if="response"
      class="mt-6 max-w-md mx-auto"
    >
      <div class="flex items-center gap-4">
        <div>
          <UBadge
            :icon="(response.valid ? 'lucide-check' : 'lucide-x')"
            variant="soft"
            :color="(response.valid ? 'warning' : 'error')"
            size="xl"
          />
        </div>

        <div class="flex flex-col">
          <span class="text-sm text-gray-500 uppercase tracking-wider">
            Resultado da validação
          </span>

          <p class="text-lg font-semibold">
            Número
            <span :class="response.valid ? 'text-warning' : 'text-error'">
              {{ response.valid ? 'válido' : 'inválido' }}
            </span>
          </p>

          <p class="text-sm text-gray-500">
            {{ formatCardNumber(response.number) }}
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>