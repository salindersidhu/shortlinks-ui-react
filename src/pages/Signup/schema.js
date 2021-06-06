import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required().label("Username"),
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required()
    .label("Confirm Password"),
});

export default schema;
