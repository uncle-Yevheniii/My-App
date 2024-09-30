import { Formik, Form } from 'formik'
import { Mail, Lock, User, Loader } from 'lucide-react'

import { Input } from '@/components'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { userSignUp } from '@/store/user/userOperations'
import { IFormValues, initialValueSignUp } from '@/models/IFormValues'

export default function SignUpPage() {
    const dispatch = useAppDispatch()
    const errorMessage = useAppSelector((state) => state.user.isError)
    const isLoading = useAppSelector((state) => state.user.isLoading)

    const onSubmit = async (values: IFormValues) => {
        try {
            dispatch(userSignUp(values))
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h2>Create Account</h2>
            <Formik initialValues={initialValueSignUp} onSubmit={onSubmit}>
                <Form>
                    <Input className="border" icon={User} id="name" name="name" type="text" placeholder="Enter your Name" />
                    <Input className="border" icon={Mail} id="email" name="email" type="text" placeholder="Enter your Email" />
                    <Input className="border" icon={Lock} id="password" name="password" type="text" placeholder="Enter your Password" />

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Sign Up'}
                    </button>
                </Form>
            </Formik>
        </div>
    )
}
