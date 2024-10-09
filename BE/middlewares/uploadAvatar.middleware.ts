import multer from 'multer'

const multerStorage = multer.memoryStorage()

const multerFilter = (_: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(null, false) //need Error
    }
}

export const uploadAvatar = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fieldSize: 2 * 10204 * 1024
    }
}).single('avatar')
