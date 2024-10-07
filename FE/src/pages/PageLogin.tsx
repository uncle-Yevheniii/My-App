import toast from 'react-hot-toast'
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

    const handleSubmit = (values: IFormValue, { resetForm }: FormikHelpers<IFormValue>) => {
        toast.promise(
            dispatch(userLogin(values))
                .unwrap()
                .finally(() => resetForm()),
            {
                loading: 'Logging in...',
                success: () => {
                    navigate('/dashboard')
                    return 'Login successful'
                },
                error: (error) => {
                    console.error('Login error:', error)
                    return 'Login failed'
                }
            }
        )
    }

    return (
        <section className="form-container">
            <h2 className="title-text">Welcome back</h2>

            <Formik initialValues={initialValueLogin} onSubmit={handleSubmit} validationSchema={schema.logIn}>
                <Form>
                    <Input className="border" id="email" name="email" type="text" placeholder="Enter your Email" icon={Mail} />

                    <Input className="border" id="password" name="password" type="text" placeholder="Enter your Password" icon={Lock} />

                    {errorMessage && <div className="text-center text-primary font-bold">{errorMessage}</div>}

                    <button type="submit" disabled={isLoading} className="btn">
                        {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Login'}
                    </button>
                </Form>
            </Formik>
        </section>
    )
}
