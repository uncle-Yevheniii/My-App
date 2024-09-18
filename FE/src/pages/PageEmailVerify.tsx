// import axios from 'axios'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { RectangleEllipsis } from 'lucide-react'

// import { Input } from '@/components'
// import { useAuthenticationStore } from '@/store/authenticationStore'

// export default function EmailVerifyPage() {
//     const [token, setToken] = useState<string>('')
//     const [errorMessage, setErrorMessage] = useState<string>('')

//     const emailVerifyFunc = useAuthenticationStore((state) => state.emailVerifyFunc)
//     const isLoading = useAuthenticationStore((state) => state.isLoading)

//     const navigate = useNavigate()

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         console.log(e.preventDefault())
//         return await emailVerifyFunc(token)
//             .then(() => {
//                 navigate('/dashboard')
//             })
//             .catch((err: unknown) => {
//                 if (axios.isAxiosError(err)) {
//                     return setErrorMessage(err.response?.data?.msg)
//                 }
//                 return setErrorMessage('Error signing up')
//             })
//             .finally(() => setToken(''))
//     }

//     return (
//         <div>
//             <h2>Verify Your Email</h2>

//             <form autoComplete="off" onSubmit={handleSubmit}>
//                 <Input
//                     id="token"
//                     name="token"
//                     type="text"
//                     placeholder="Enter your token"
//                     autoComplete="off"
//                     icon={RectangleEllipsis}
//                     value={token}
//                     onChange={(e) => setToken(e.target.value.trim())}
//                 />

//                 {errorMessage && <p>{errorMessage}</p>}

//                 <button type="submit">{isLoading ? 'Loading...' : 'Submit'}</button>
//             </form>
//         </div>
//     )
// }
