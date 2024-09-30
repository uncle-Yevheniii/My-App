import { Formik, Form } from 'formik'
import { Mail, Lock, Loader } from 'lucide-react'

import { Input } from '@/components'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { IFormValue, initialValueLogin } from '@/models/IFormValues'
import { userLogin } from '@/store/user/userOperations'

export default function SignUpPage() {
    const dispatch = useAppDispatch()
    const errorMessage = useAppSelector((state) => state.user.isError)
    const isLoading = useAppSelector((state) => state.user.isLoading)

    const onSubmit = async (values: IFormValue) => {
        try {
            dispatch(userLogin(values))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h2>Welcome back</h2>

            <Formik initialValues={initialValueLogin} onSubmit={onSubmit}>
                <Form>
                    <Input className="border" icon={Mail} id="email" name="email" type="text" placeholder="Enter your Email" />
                    <Input className="border" icon={Lock} id="password" name="password" type="text" placeholder="Enter your Password" />

                    {errorMessage && <div className="error">{errorMessage}</div>}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Login'}
                    </button>
                </Form>
            </Formik>
        </div>
    )
}
