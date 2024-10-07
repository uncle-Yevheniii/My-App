import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Loader } from 'lucide-react'
import { Formik, Form, FormikHelpers } from 'formik'

import { schema } from '@/helpers'
import { Input } from '@/components'
import { userLogin } from '@/store/user/userOperations'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { IFormValue, initialValueLogin } from '@/models/IFormValues'

export default function SignUpPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector((state) => state.user.isLoadingFetch)
    const errorMessage = useAppSelector((state) => state.user.isErrorMsgFetch)

    const handleSubmit = async (values: IFormValue, { resetForm }: FormikHelpers<IFormValue>) => {
        try {
            await dispatch(userLogin(values)).unwrap()
            navigate('/dashboard')
        } catch (error) {
            console.error('Login error:', error)
            // TODO Handle error (e.g., show error message console.log(err) or toast
        } finally {
            resetForm()
        }
    }

    return (
        <div className="form-container">
            <h2 className="text-3xl font-bold mb-6 text-center">Welcome back</h2>

            <Formik initialValues={initialValueLogin} onSubmit={handleSubmit} validationSchema={schema.logIn}>
                <Form>
                    <Input className="border" id="email" name="email" type="text" placeholder="Enter your Email" icon={Mail} />

                    <Input className="border" id="password" name="password" type="text" placeholder="Enter your Password" icon={Lock} />

                    {errorMessage && <div className="error">{errorMessage}</div>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-2 w-full p-4 text-primary bg-secondary bg-opacity-50 font-bold rounded-2xl transition duration-200
                        
                        hover:from-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                        focus:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Login'}
                    </button>
                </Form>
            </Formik>
        </div>
    )
}
