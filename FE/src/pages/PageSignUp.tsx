import { Formik, Form } from 'formik'
import { IFormValues, initialValues } from '@/models/IFormValues'
import { useAppDispatch } from '@/store/hooks'
import { userSignUp } from '@/store/user/userOperations'
import { Input } from '@/components'
import { Mail, Lock, User } from 'lucide-react'

export default function SignUpPage() {
    const dispatch = useAppDispatch()

    return (
        <div>
            <h2>Create Account</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={async (value: IFormValues) => {
                    dispatch(userSignUp(value))
                }}
            >
                <Form>
                    <Input className="border" icon={User} id="name" name="name" type="text" placeholder="Enter your Name" />
                    <Input className="border" icon={Mail} id="email" name="email" type="text" placeholder="Enter your Email" />
                    <Input className="border" icon={Lock} id="password" name="password" type="text" placeholder="Enter your Password" />

                    <button type="submit">Sign Up</button>
                </Form>
            </Formik>
        </div>
    )
}
