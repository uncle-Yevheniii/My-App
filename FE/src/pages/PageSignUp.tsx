import toast from 'react-hot-toast'

import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Loader } from 'lucide-react'
import { Formik, Form, FormikHelpers } from 'formik'

import { schema } from '@/helpers'
import { Input } from '@/components'
import { userSignUp } from '@/store/user/userOperations'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { IFormValues, initialValueSignUp } from '@/models/IFormValues'

export default function SignUpPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector((state) => state.user.isLoadingFetch)
    const errorMessage = useAppSelector((state) => state.user.isErrorMsgFetch)

    const handleSubmit = async (values: IFormValues, { resetForm }: FormikHelpers<IFormValues>) => {
        toast.promise(
            dispatch(userSignUp(values))
                .unwrap()
                .finally(() => resetForm()),
            {
                loading: 'Logging in...',
                success: () => {
                    navigate('/email-verify')
                    return 'Account create is successfully'
                },
                error: (error) => {
                    console.error('Account create is failed:', error)
                    return 'Account create is failed'
                }
            }
        )
    }

    return (
        <section className="form-container">
            <h2 className="title-text">Create Account</h2>

            <Formik initialValues={initialValueSignUp} onSubmit={handleSubmit} validationSchema={schema.signUp}>
                <Form className="relative">
                    <Input className="border" icon={User} id="name" name="name" type="text" placeholder="Enter your Name" />

                    <Input className="border" icon={Mail} id="email" name="email" type="text" placeholder="Enter your Email" />

                    <Input className="border" icon={Lock} id="password" name="password" type="password" placeholder="Enter your Password" />

                    {errorMessage && <div className="text-center text-primary font-bold">{errorMessage}</div>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-2 w-full p-4 text-primary bg-secondary bg-opacity-50 font-bold rounded-2xl transition duration-200
                        
                        hover:from-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                        focus:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Sign Up'}
                    </button>
                </Form>
            </Formik>
        </section>
    )
}
