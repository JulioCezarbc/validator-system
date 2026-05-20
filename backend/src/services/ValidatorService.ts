export class ValidatorService {
    validatorMod10(block: string): number {

        if (!block)
            throw new Error('Block is required');

        const cleanBlock = block.replace(/\D/g, '');

        let result = 0;
        let isTwo = true;

        for (let i = cleanBlock.length - 1; i >= 0; i--) {
            let currentNumber = Number(cleanBlock.charAt(i));
            let multi = currentNumber * (isTwo ? 2 : 1);

            if (multi > 9) multi -= 9;

            result += multi;
            isTwo = !isTwo;
        }

        const rest = result % 10;
        return rest === 0 ? 0 : 10 - rest;
    }

    validatorCNPJ(cnpj: string): { valid: boolean, message: string, cnpj: string } {
        const normalizedCNPJ = cnpj.replace(/\D/g, '');

        if (normalizedCNPJ.length !== 14) {
            return {
                valid: false,
                message: 'CNPJ deve ter 14 dígitos',
                cnpj: normalizedCNPJ
            }
        }

        if (/^(\d)\1+$/.test(normalizedCNPJ)) {
            return {
                valid: false,
                message: 'Não é permitido utilizar sequências numéricas repetidas.',
                cnpj: normalizedCNPJ
            }
        }

        const calculateDigit = (numbers: string, initialWeight: number): number => {
            let sum = 0;
            let weight = initialWeight;

            for (const number of numbers) {
                sum += Number(number) * weight;
                weight = weight <= 2 ? 9 : weight - 1;
            }

            const remainder = sum % 11;

            return remainder < 2 ? 0 : 11 - remainder;
        };

        const baseNumbers = normalizedCNPJ.slice(0, 12);
        const checkDigits = normalizedCNPJ.slice(12);

        const firstDigit = calculateDigit(baseNumbers, 5);

        if (firstDigit !== Number(checkDigits[0])) {
            return {
                valid: false,
                message: 'CNPJ Inválido',
                cnpj: normalizedCNPJ
            }
        }

        const secondDigit = calculateDigit(
            baseNumbers + firstDigit,
            6
        );

        if (secondDigit !== Number(checkDigits[1])) {
            return {
                valid: false,
                message: 'CNPJ deve ter 14 dígitos',
                cnpj: normalizedCNPJ
            }
        }

        return {
            valid: true,
            message: 'Sucesso',
            cnpj: normalizedCNPJ
        }
    }

    validatorLuhn(card: string): boolean {
        const normalizedCard = card.replace(/\D/g, '')


        let result = 0;
        let isDouble = false;
        let sum = 0;

        for (let i = normalizedCard.length - 1; i !== -1; i--) {

            isDouble ? sum = Number(normalizedCard.charAt(i)) * 2 : sum = Number(normalizedCard.charAt(i))


            if (sum > 9) {
                sum -= 9
            }
            result += sum
            isDouble = !isDouble
        }

        return result % 10 === 0 ? true : false


    }
}