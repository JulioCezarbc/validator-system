import {ValidatorService } from '../services/ValidatorService';
import { Request, Response } from 'express';


const validatorService = new ValidatorService()

export class ValidatorController {
    validatorMod10(req: Request, res: Response){
        const { block } = req.body;
        if (!block) 
            return res.status(400).json({ error: 'Block is required' });

        const result = validatorService.validatorMod10(block)
        return res.json({
            "success": true,
            "data": result
        })

    }

    validatorCNPJ(req: Request, res: Response){
        const { cnpj } = req.body;
        if (!cnpj)
            return res.status(400).json({ error: 'CNPJ is required' });
        const isValid = validatorService.validatorCNPJ(cnpj);
        return res.json({
            "success": true,
            "data": isValid
        })
    }

    validatorLuhn(req: Request, res: Response){
        const { card } = req.body;
        if (!card)
            return res.status(400).json({ error: 'Card number is required' });
        const isValid = validatorService.validatorLuhn(card);
        return res.json({
            "success": true,
            "data": isValid
        })
    }
}