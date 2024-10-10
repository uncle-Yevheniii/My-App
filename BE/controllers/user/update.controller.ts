import type { Response, Request } from 'express'

import User from '#models/user.models'
import { Logger } from '#helpers/logger'
import { avatarUpload } from '#services/avatarUpload.service.ts'

export default async function update(req: Request, res: Response) {
    try {
        if (!req.decoded) {
            return res.status(401).json({ success: false, msg: 'Unauthorized - token missing' })
        }
        if (!req.file) {
            return res.status(400).json({ success: false, msg: 'No file uploaded' })
        }

        const { _id } = req.decoded
        const { size, buffer } = req.file

        if (size > 2 * 1024 * 1024) {
            return res.status(400).json({ success: false, msg: 'Avatar file is large' })
        }

        const avatar = await avatarUpload(buffer, _id)
        if (!avatar) return res.status(500).json({ success: false, msg: 'Failed to upload avatar' })

        const user = await User.findByIdAndUpdate(_id, { avatar }, { new: true })
        if (!user) return res.status(404).json({ success: false, msg: 'User not found' })

        res.status(200).json({ success: true, msg: 'Avatar updated successfully', user })
    } catch (err) {
        Logger.error(err)
        return res.status(500).json({ err })
    }
}
