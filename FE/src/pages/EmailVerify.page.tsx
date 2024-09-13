import { Loader } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

import { useAuthenticationStore } from '../store/authentication.store'

export default function EmailVerifyPage() {
    const navigate = useNavigate()

    // store functions
    const verifyEmailStore = useAuthenticationStore((state) => state.verifyEmail)
    const errorStore = useAuthenticationStore((state) => state.error)
    const loadingStore = useAuthenticationStore((state) => state.isLoading)

    // local state
    const [OTP, setOTP] = useState<string[]>(Array(6).fill(''))
    const inputRef = useRef<HTMLInputElement[]>(Array(6).fill(null))

    const handleTextChange = (text: string, index: number) => {
        const newOTP = [...OTP]
        //handle paste event
        if (text.length > 1) {
            const pastedCode = text.slice(0, 6).split('')
            for (let i = 0; i < 6; i++) {
                newOTP[i] = pastedCode[i] || ''
            }
            setOTP(newOTP)

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newOTP.findLastIndex((digit) => digit !== '')
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
            inputRef.current[focusIndex].focus()
        } else {
            newOTP[index] = text
            setOTP(newOTP)

            // Move focus to the next input field if value is entered
            if (text && index < 5) {
                inputRef.current[index + 1].focus()
            }
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Backspace' && !OTP[index] && index > 0) {
            inputRef.current[index - 1].focus()
        }
    }

    // Handle form submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const code = OTP.join('')

        await verifyEmailStore(code)
            .then(() => {
                navigate('/')
                toast.success('Email verified successfully')
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Verify Your Email
                </h2>
                <p className="text-center text-gray-300 mb-6">Enter the 6-digit code sent to your email address.</p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        {OTP.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                value={digit}
                                maxLength={6}
                                ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
                                onChange={(e) => handleTextChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
                            />
                        ))}
                    </div>

                    {/* Error message */}
                    {errorStore && <p className="text-red-600 text-sm text-center font-bold mb-4">{errorStore}</p>}

                    <button
                        type="submit"
                        disabled={loadingStore || OTP.some((digit) => !digit)}
                        className="
                        w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg 
                        hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:from-green-500 disabled:hover:to-emerald-600"
                    >
                        {loadingStore ? <Loader className="animate-spin mx-auto" size={24} /> : 'Verify Email'}
                    </button>
                </form>
            </div>
        </div>
    )
}
