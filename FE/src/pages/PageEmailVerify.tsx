import { useNavigate } from 'react-router-dom'
import { RectangleEllipsis, Loader } from 'lucide-react'
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik'

import { Input } from '@/components'
import { userEmailVerify } from '@/store/user/userOperations'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { schema } from '@/helpers/validation'

export default function EmailVerifyPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const errorMessage = useAppSelector((state) => state.user.isError)
    const isLoading = useAppSelector((state) => state.user.isLoading)

    const handleSubmit = async (values: { token: string }, { resetForm }: FormikHelpers<{ token: string }>) => {
        try {
            dispatch(userEmailVerify(values))
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
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
