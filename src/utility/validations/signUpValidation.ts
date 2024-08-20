import * as Yup from "yup";
export const signUpValidationSchema = Yup.object({
    full_name: Yup.string().trim().required("Full Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email is required"),
    password: Yup.string()
        .trim()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
        .required('Password is required')

});
export const signInValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email is required"),
    password: Yup.string()
        .trim()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
        .required('Password is required')

});
export const forgotPAsswordValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email is required")
});
export const ResetPasswordValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email is required"),
    password: Yup.string()
        .trim()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .trim()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
        .required('Password is required')

});

export const UserInfoValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email is required"),
    first_name: Yup.string()
        .trim()
        .required("First name is required"),
    last_name: Yup.string()
        .trim()
        .required("Last name is required"),
    birthday: Yup.string()
        .trim()
        .optional(),
    gender: Yup.string()
        .trim()
        .optional(),
    phone_number: Yup.number()
        .typeError("Phone number must be a number")
        .required("Phone number is required")
        .test(
            "length",
            "Phone number must be exactly 10 digits",
            function (value) {
                const length = value ? value.toString().length : 0;
                return length === 10;
            }
        ),
    address: Yup.string()
        .trim()
        .required("Address is required"),
    number: Yup.string()
        .trim()
        .required("Number is required"),
    city: Yup.string()
        .trim()
        .required("City is required"),
    state: Yup.string()
        .trim()
        .required("State is required"),
    zip: Yup.string()
        .trim()
        .required("ZIP is required"),

});

export const ShareValidationSchema = Yup.object({
    name: Yup.string()
        .trim()
        .required("Stock name is required"),
    current_price: Yup.number()
        .required("Price is required")
        .min(0.01, "Price must be greater than 0")
});