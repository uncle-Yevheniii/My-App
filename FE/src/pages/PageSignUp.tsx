import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Loader } from 'lucide-react'
import { Formik, Form, FormikHelpers, ErrorMessage } from 'formik'

import { Input } from '@/components'
import { userSignUp } from '@/store/user/userOperations'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { IFormValues, initialValueSignUp } from '@/models/IFormValues'
import { schema } from '@/helpers/validation'

export default function SignUpPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const errorMessage = useAppSelector((state) => state.user.isError)
    const isLoading = useAppSelector((state) => state.user.isLoading)

    const handleSubmit = async (values: IFormValues, { resetForm }: FormikHelpers<IFormValues>) => {
        try {
            dispatch(userSignUp(values))
            navigate('/email-verify')
        } catch (err) {
            console.log(err)
        } finally {
            resetForm()
        }
    }
    return (
        <div>
            <h2>Create Account</h2>
            <Formik initialValues={initialValueSignUp} onSubmit={handleSubmit} validationSchema={schema.signUp}>
                <Form>
                    <Input className="border" icon={User} id="name" name="name" type="text" placeholder="Enter your Name" />
                    <ErrorMessage name="name" render={(msg) => <div className="text-red-500">{msg}</div>} />

                    <Input className="border" icon={Mail} id="email" name="email" type="text" placeholder="Enter your Email" />
                    <ErrorMessage name="email" render={(msg) => <div className="text-red-500">{msg}</div>} />

                    <Input className="border" icon={Lock} id="password" name="password" type="text" placeholder="Enter your Password" />
                    <ErrorMessage name="password" render={(msg) => <div className="text-red-500">{msg}</div>} />

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Sign Up'}
                    </button>
                </Form>
            </Formik>
        </div>
    )
}
