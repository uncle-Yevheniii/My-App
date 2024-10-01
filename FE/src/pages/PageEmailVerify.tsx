import { useNavigate } from 'react-router-dom'
import { RectangleEllipsis, Loader } from 'lucide-react'
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik'

import { schema } from '@/helpers'
import { Input } from '@/components'
import { userEmailVerify } from '@/store/user/userOperations'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export default function EmailVerifyPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector((state) => state.user.isLoadingFetch)
    const errorMessage = useAppSelector((state) => state.user.isErrorMsgFetch)

    const handleSubmit = async (values: { token: string }, { resetForm }: FormikHelpers<{ token: string }>) => {
        try {
            await dispatch(userEmailVerify(values)).unwrap()
            navigate('/dashboard')
        } catch (error) {
            console.error('Email verify error:', error)
            // TODO Handle error (e.g., show error message console.log(err) or toast
        } finally {
            resetForm()
        }
    }
    return (
        <div>
            <h2>Verify Your Email</h2>
            <Formik initialValues={{ token: '' }} onSubmit={handleSubmit} validationSchema={schema.emailVerify}>
                <Form>
                    <Input className="border" id="token" type="text" name="token" placeholder="Enter your token" icon={RectangleEllipsis} />
                    <ErrorMessage name="token" render={(msg) => <div className="text-red-500">{msg}</div>} />

                    {errorMessage && <div className="error">{errorMessage}</div>}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Email verify'}
                    </button>
                </Form>
            </Formik>
        </div>
    )
}
