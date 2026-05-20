<script setup lang="ts">
import axios from 'axios'

const block = ref('')
const result = ref<number | null>(null)
const loading = ref(false)

const tests = [
  {
    input: '237900310'
  },
  {
    input: '4014481606'
  },
  {
    input: '341917900'
  },
]

const toast = useAppToast()


function inputTest(value: any){
  console.log('va', value)
  block.value = value.input
  return
}

const handleValidate = async () => {


  const hasLetter = /[a-zA-Z]/.test(block.value)

  if (hasLetter) {
    toast.error(
      'Atenção',
      'O campo não pode conter letras'
    )
    return
  }

  const cleanedBlock = block.value.replace(/\D/g, '')

  if (!cleanedBlock) {
    toast.error(
      'Atenção', 
      'Digite um bloco numérico'
    )
    return
  }

   if (cleanedBlock.length < 9) {
    toast.warning(
      'Atenção',
      'O bloco precisa ter ao menos 09 números',
    )
    return
  }
  loading.value = true
  try {

    const { data } = await axios.post('http://localhost:3000/validate/mod10', {
      block: cleanedBlock
    })
    
    result.value = data.data

    toast.success( 
      'Sucesso!', 
      'Cálculo realizado.', 
    )

    block.value = ''
  } catch (err) {

    toast.error(
      'Erro', 
      'Não foi possível conectar à API.', 
    )
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-xl font-semibold">Validador Módulo 10 (Boletos)</h2>
      <p class="text-gray-500">Insira a sequência numérica para obter o dígito verificador.</p>
    </div>

    <div class="flex flex-col gap-4 max-w-sm mx-auto">
      <UInput
        v-model="block"
        icon="lucide:hash"
        size="lg"
        placeholder="Digite o código..."
      />
      
      <UButton
        :loading="loading"
        size="lg"
        variant="outline"
        :disabled="loading || block.length < 9"
        class="cursor-pointer flex justify-center"
        block
        @click="handleValidate"
      >
        Calcular Dígito
      </UButton>
    </div>


    <div class="flex flex-col items-center">
      <p class="text-md font-semibold">Exemplos para testar</p>

      <div>
        <UButton
          v-for="test in tests"
          :key="test.input"
          color="secondary"
          variant="soft"
          class="m-1 cursor-pointer rounded-2xl"
          @click="inputTest(test)"
        >
          {{ test.input }}
        </UButton>
      </div>
    </div>

    
    <div v-if="result !== null" class="mt-8 text-center animate-bounce">
      <p class="text-sm text-gray-500 uppercase tracking-widest">Resultado</p>
      <div class="text-6xl font-black text-primary">{{ result }}</div>
    </div>
  </div>
</template>