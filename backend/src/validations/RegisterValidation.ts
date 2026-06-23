import {z} from 'zod'



export const registerSalonSchema = z.object({
  name: z.string().min(1),
  saloon_name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().length(10),
  role: z.string().optional(),
})