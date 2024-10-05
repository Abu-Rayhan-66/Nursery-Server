import { z } from "zod";

export const createProductSchema = z.object({
    category:z.string().optional(),
    title:z.string().optional(),
    price:z.number().optional(),
    quantity:z.number().optional(),
    description:z.string().optional(),
    rating:z.number().optional(),
    image: z.string().optional(),
})