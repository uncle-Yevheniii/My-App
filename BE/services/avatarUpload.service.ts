import path from 'path'
import sharp from 'sharp'
import * as fse from 'fs-extra'
import { nanoid } from 'nanoid'
import { v2 as cloudinary } from 'cloudinary'

const cloud_name = process.env.CLOUDINARY_NAME
const api_secret = process.env.CLOUDINARY_API_SECRET
const api_key = process.env.CLOUDINARY_API_KEY

cloudinary.config({ cloud_name, api_key, api_secret })

export async function avatarUpload(buffer: Buffer, _id: string) {
    const __dirname = process.cwd()
    const fileName = `${nanoid()}.jpeg`
    const fullPath = path.join(__dirname, 'FE', 'public', _id)

    await fse.ensureDir(fullPath)
    await sharp(buffer)
        .resize({
            height: 200,
            width: 200,
            fit: 'cover'
        })
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(path.join(fullPath, fileName))

    const result = await cloudinary.uploader.upload(path.join(fullPath, fileName), { public_id: `${_id}` })

    await fse.remove(path.join(fullPath))

    return result.secure_url
}
