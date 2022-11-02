import React, { useState, FunctionComponent } from 'react'
import Swal from 'sweetalert2'
import Loading from '../../common/Loading'
import * as Services from '../../services'
import Auth from '../../auth'
import styles from './Login.module.scss'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import { useFormik } from 'formik'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { ISingIn } from '../../interfaces/user'

const Login: FunctionComponent = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const schema = yup.object().shape({
    userName: yup.string().required(),
    password: yup.string().required()
  })

  const { handleSubmit, handleChange, resetForm, setFieldValue, handleBlur, values, touched, errors } = useFormik({
    initialValues: {
      userName: '',
      password: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => onSubmit(values)
  })

  const onSubmit = async (values: ISingIn) => {
    try {
      setIsLoading(true)
      resetForm()
      const payload = { ...values }
      const result = await Services.AuthService.signIn(payload)
      if (!isEmpty(result.data)) {
        const { data = {} } = result.data
        Auth.setToken(data.token, data.refreshToken)
        return router.reload()
      }
    } catch (error: any) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'login',
        text: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={styles.loginContainer}>
      <Loading show={isLoading} />
      <Row className={styles.loginWrapper}>
        <Col md={{ span: 4, offset: 4 }}>
          <Form className={styles.loginForm} noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Username"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.userName && !errors.userName}
                isInvalid={!!errors.userName}
              />
              <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login
