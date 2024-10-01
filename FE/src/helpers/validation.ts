import * as Yup from 'yup'

export default {
    signUp: Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters long')
            .max(30, 'Name must be less than 30 characters long')
            .required('Name is required!'),
        email: Yup.string().email('Email must be valid').required('Email is required!'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long.')
            .max(20, 'Password must be less than 20 characters long')
            .matches(
                new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{6,20}$/),
                'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
            )
            .required('Password is required!')
    }),
    logIn: Yup.object().shape({
        email: Yup.string().email('Email must be valid').required('Email is required!'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long.')
            .max(20, 'Password must be less than 20 characters long')
            .matches(
                new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{6,20}$/),
                'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
            )
            .required('Password is required!')
    }),
    emailVerify: Yup.object().shape({
        token: Yup.string().required('Verification token is required!')
    })
}
