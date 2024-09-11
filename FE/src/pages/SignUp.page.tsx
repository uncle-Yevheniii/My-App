import { Formik, Form, FormikHelpers } from 'formik'
import { Link } from 'react-router-dom'
import { User, Mail, Lock } from 'lucide-react'

import { InputComponent } from '../components'
import { ISignUpFormValues, SignUpFormState } from '../types/authentication'

export default function SignUpPage() {
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
                        <InputComponent id="password" name="password" type="password" placeholder="Enter your password" icon={Lock} />

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200  ease-linear"
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
