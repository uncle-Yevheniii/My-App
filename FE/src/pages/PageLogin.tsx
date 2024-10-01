import { Mail, Lock, Loader } from 'lucide-react'
import { Formik, Form, FormikHelpers, ErrorMessage } from 'formik'

import { schema } from '@/helpers'
import { Input } from '@/components'
import { userLogin } from '@/store/user/userOperations'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { IFormValue, initialValueLogin } from '@/models/IFormValues'

export default function SignUpPage() {
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector((state) => state.user.isLoading)
    const errorMessage = useAppSelector((state) => state.user.isError)

    const handleSubmit = async (values: IFormValue, { resetForm }: FormikHelpers<IFormValue>) => {
        try {
            dispatch(userLogin(values))
        } catch (err) {
            console.log(err)
        } finally {
            resetForm()
        }
    }

    return (
        <div>
            <h2>Welcome back</h2>

            <Formik initialValues={initialValueLogin} onSubmit={handleSubmit} validationSchema={schema.logIn}>
                <Form>
                    <Input className="border" id="email" name="email" type="text" placeholder="Enter your Email" icon={Mail} />
                    <ErrorMessage name="email" render={(msg) => <div className="text-red-500">{msg}</div>} />

                    <Input className="border" id="password" name="password" type="text" placeholder="Enter your Password" icon={Lock} />
                    <ErrorMessage name="password" render={(msg) => <div className="text-red-500">{msg}</div>} />

                    {errorMessage && <div className="error">{errorMessage}</div>}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Login'}
                    </button>
                </Form>
            </Formik>
        </div>
    )
}
