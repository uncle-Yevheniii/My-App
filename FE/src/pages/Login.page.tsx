import { Link } from 'react-router-dom'
import { Mail, Lock, Loader } from 'lucide-react'
import { Formik, Form, FormikHelpers } from 'formik'

import toast from 'react-hot-toast'

import { InputComponent } from '../components'
import { ILoginFormValues, LoginFormState } from '../types/user'
import { useAuthenticationStore } from '../store/authentication.store'

export default function SignUpPage() {
    // store functions
    const { login, isLoading, error } = useAuthenticationStore()

    const handleSubmitForm = (values: ILoginFormValues, action: FormikHelpers<ILoginFormValues>) => {
        login(values.email, values.password)
            .then(() => {
                toast.success('Logged in successfully')
                action.resetForm()
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    Welcome back
                </h2>

                <Formik initialValues={LoginFormState} onSubmit={handleSubmitForm}>
                    <Form autoComplete="off">
                        <InputComponent id="email" name="email" type="email" placeholder="Enter your email" icon={Mail} />
                        <InputComponent
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            icon={Lock}
                            autoComplete="on"
                        />

                        <div className="flex items-center mb-6">
                            <Link to="/forgot-password" className="text-sm text-green-400 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Error message */}
                        {error && <p className="text-red-600 text-sm text-center font-bold mb-4">{error}</p>}

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200  ease-linear"
                        >
                            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : 'Login'}
                        </button>
                    </Form>
                </Formik>
            </div>

            {/* Don't have an account */}
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <p className="text-sm text-gray-400">
                    {"Don't have an account? "}
                    <Link to={'/signup'} className="text-green-400 hover:underline">
                        SignUp
                    </Link>
                </p>
            </div>
        </div>
    )
}
