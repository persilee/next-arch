import { z } from 'zod'
import { record } from './common'

const kind = z.enum(['File']).default('File')
const id = record('file')
const uid = z.string()
export const type = z.enum(['image/png', 'image/jpeg', 'image/jpg', 'video/mp4'] as const)
const filename = z.string()
const size = z.number()

export const createInput = z.object({
  uid,
  type,
  filename,
  size,
})

export const row = z.object({
  kind,
  id,
  uid,
  type,
  filename,
  size,
  user: record('user'),
})

export type Row = z.infer<typeof row>

export const item = z.object({
  id,
  uid,
  type,
  filename,
  size,
})

export type Item = z.infer<typeof item>

export const params = z.object({
  id: z.string().transform((value) => `file:${value}`),
})

export const exif = z
  .object({
    Image: z
      .object({
        DateTime: z.date().optional(),
        Make: z.string().optional(),
        Model: z.string().optional(),
        Orientation: z.number().optional(),
        Software: z.string().optional(),
      })
      .optional(),
    Photo: z
      .object({
        ApertureValue: z.number().optional(),
        ExposureTime: z.number().optional(),
        FNumber: z.number().optional(),
        FocalLength: z.number().optional(),
        ISOSpeedRating: z.number().optional(),
      })
      .optional(),
  })
  .optional()

export const extractResult = z.object({ exif })

export const updateInput = z.object({
  extract: z.object({ exif }).optional(),
})

export const query = z
  .object({
    format: z.enum(['webp'] as const).optional(),
    size: z.enum(['os', 'sm', 'md', 'lg', 'xl', '2xl'] as const).optional(),
  })
  .transform((value) => {
    if (value.format && !value.size) {
      value.size = 'os'
    }

    return value
  })
