import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, FormikHelpers } from 'formik'
import { RectangleEllipsis, Loader } from 'lucide-react'

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
        toast.promise(
            dispatch(userEmailVerify(values))
                .unwrap()
                .finally(() => resetForm()),
            {
                loading: 'Logging in...',
                success: () => {
                    navigate('/dashboard')
                    return 'Email verify is successful'
                },
                error: (error) => {
                    console.error('Email verify is failed:', error)
                    return 'Email verify is failed.'
                }
            }
        )
    }
    return (
        <div className="form-container">
            <h2 className="title-text">Verify Your Email</h2>
            <Formik initialValues={{ token: '' }} onSubmit={handleSubmit} validationSchema={schema.emailVerify}>
                <Form autoComplete="off">
                    <Input className="border" id="token" type="text" name="token" placeholder="Enter your token" icon={RectangleEllipsis} />

                    {errorMessage && <div className="text-center text-primary font-bold">{errorMessage}</div>}

                    <button type="submit" disabled={isLoading} className="btn">
                        {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Email verify'}
                    </button>
                </Form>
            </Formik>
        </div>
    )
}
