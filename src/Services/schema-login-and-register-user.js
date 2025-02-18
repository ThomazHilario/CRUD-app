import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
    email:z.string().regex(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Este email não é válido!'),
    password:z.string().min(1, 'Preencha o campo corretamente!')
})

export const myResolver = zodResolver(schema)