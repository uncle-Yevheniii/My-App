const create = async (password: string) => await Bun.password.hash(password, { algorithm: 'bcrypt', cost: 10 })

const compare = async (password: string, hash: string) => await Bun.password.verify(password, hash)

export default { create, compare }
