import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, FormikHelpers } from 'formik'
import { User, Mail, Lock, X, Check } from 'lucide-react'

import { InputComponent } from '../components'
import { ISignUpFormValues, SignUpFormState } from '../types/authentication'

export default function SignUpPage() {
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState<Record<string, boolean>>({
        minValueValidation: false,
        numberValidation: false,
        capitalLetterValidation: false,
        specialCharacterValidation: false
    })

    const handlePasswordChange = (text: string) => {
        setPassword(text)
        validatePassword(text)
    }

    const validatePassword = (pwd: string) => {
        setErrors({
            minValueValidation: pwd.length >= 8,
            numberValidation: /\d/.test(pwd),
            capitalLetterValidation: /[A-Z]/.test(pwd),
            specialCharacterValidation: /[^A-Za-z0-9]/.test(pwd)
        })
    }

    // FORMIK submit handler
    const handleSubmitForm = (values: ISignUpFormValues, action: FormikHelpers<ISignUpFormValues>) => {
        console.log(values)
        action.resetForm()
    }

    return (
        <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    Create an account
                </h2>

                <Formik initialValues={SignUpFormState} onSubmit={handleSubmitForm}>
                    <Form autoComplete="off">
                        <InputComponent id="username" name="username" type="text" placeholder="Enter your username" icon={User} />
                        <InputComponent id="email" name="email" type="email" placeholder="Enter your email" icon={Mail} />
                        <InputComponent
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            icon={Lock}
                            onChange={(event) => handlePasswordChange(event.target.value)}
                        />

                        {/* Password strength indicator */}
                        <div className="mb-6">
                            {Object.entries(errors).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-4 my-2">
                                    {value ? <Check className="size-4 text-green-500 mr-2" /> : <X className="size-4 text-gray-500 mr-2" />}
                                    <p className={`text-sm  ${value ? 'text-green-500' : 'text-gray-500'}`}>
                                        {key === 'minValueValidation' && 'Password must be at least 8 Characters'}
                                        {key === 'numberValidation' && 'Password must have at least one Number'}
                                        {key === 'capitalLetterValidation' && 'Password must have at least one Capital Letter'}
                                        {key === 'specialCharacterValidation' && 'Password must have at least one Special Character'}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            disabled={
                                password.length < 8 ||
                                !errors.minValueValidation ||
                                !errors.numberValidation ||
                                !errors.capitalLetterValidation ||
                                !errors.specialCharacterValidation
                            }
                            type="submit"
                            className="
                            w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg 
                            hover:from-green-600 hover:to-emerald-700 
                            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 
                            transition duration-200 ease-linear 
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:from-green-500 disabled:hover:to-emerald-600"
                        >
                            Create Account
                        </button>
                    </Form>
                </Formik>
            </div>

            {/* Already have an account */}
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <p className="text-sm text-gray-400">
                    {'Already have an account? '}
                    <Link to={'/login'} className="text-green-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}
