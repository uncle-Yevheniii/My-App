import bcrypt from 'bcrypt'

const create = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    return hash
}

const compare = async (password: string, hash: string) => await bcrypt.compare(password, hash)

export default { create, compare }
