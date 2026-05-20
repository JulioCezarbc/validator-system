<script setup lang="ts">
import axios from 'axios'

const value = ref('')

const response = ref<{
    valid: boolean
    message: string
    cnpj: string
} | null>(null)

const loading = ref(false)

const toast = useAppToast()

const tests = [
  {
    input: '04.443.435/0001-61'
  },
  {
    input: '50.579.761/0001-18'
  },
  {
    input: '98.032.150/0001-82'
  },
]

function inputTest(valueTest: any){
  value.value = valueTest.input
  return
}

const formatCNPJ = (input: string) => {
  return input
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 14)
    .replace(/^([A-Z0-9]{2})([A-Z0-9])/, '$1.$2')
    .replace(/^([A-Z0-9]{2})\.([A-Z0-9]{3})([A-Z0-9])/, '$1.$2.$3')
    .replace(/\.([A-Z0-9]{3})([A-Z0-9])/, '.$1/$2')
    .replace(/([A-Z0-9]{4})([A-Z0-9])/, '$1-$2')
}

const handleValidate = async () => {
    const cleanCNPJ = value.value.replace(/[^A-Z0-9]/g, '')

    if(!cleanCNPJ || cleanCNPJ.length !== 14){
        toast.error(
            'Atenção',
            'Formato invalido'
        )
        return
    }

    loading.value = true

    try{
        const { data } = await axios.post('http://localhost:3000/validate/cnpj', {
            cnpj: cleanCNPJ
        })
        
        response.value = data.data
        if (response.value?.valid) {
            toast.success(
                'Sucesso na validação',
                'O CNPJ é válido'
            )
        } 
        else {
            toast.error(
                'CNPJ inválido',
                'O CNPJ informado não é válido'
            )
        }

        value.value = ''
    }
    catch (error) {
        toast.error(
            'Erro',
            'Ocorreu um erro ao validar o CNPJ'
        )
    } finally {
        loading.value = false
    }
}

</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-xl font-semibold">Validador CNPJ</h2>
      <p class="text-gray-500">Insira o CNPJ para validação</p>
    </div>

    <div class="flex flex-col gap-4 max-w-sm mx-auto">
      <UInput
        v-model="value"
        icon="lucide:hash"
        color="secondary"
        size="lg"
        placeholder="**.***.***/****-##"
      />
      
      <UButton
        :loading="loading"
        size="lg"
        color="secondary"
        variant="outline"
        :disabled="loading"
        class="cursor-pointer flex justify-center"
        block
        @click="handleValidate"
      >
        Validar CNPJ
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


    <UCard
        v-if="response"
        class="mt-6 max-w-md mx-auto"
    >
    <div class="flex items-center gap-4">
        
        <div>
            <UBadge
                :icon="(response.valid ? 'lucide-check' : 'lucide-x')"
                variant="soft"
                :color="(response.valid ? 'secondary' : 'error')"
                size="xl"
            />
        </div>

        <div class="flex flex-col">
        <span class="text-sm text-gray-500 uppercase tracking-wider">
            Resultado da validação
        </span>

        <p class="text-lg font-semibold">
            CNPJ
            <span
            :class="response.valid ? 'text-secondary' : 'text-error'">
            {{ response.valid ? 'válido' : 'inválido' }}
            </span>
        </p>

        <p class="text-sm text-gray-500">
            {{ formatCNPJ(response.cnpj) }}
        </p>
        </div>

    </div>
    </UCard>
    
    
  </div>
</template>