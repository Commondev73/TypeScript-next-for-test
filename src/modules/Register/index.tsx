import React, { useState, FunctionComponent, ChangeEvent } from 'react'
import Swal from 'sweetalert2'
import personImage from '../../assets/images/person.png'
import Loading from '../../common/Loading'
import * as Services from '../../services'
import styles from './Register.module.scss'
import loadImage, { LoadImageResult } from 'blueimp-load-image'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import { useFormik } from 'formik'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { ISignUp } from '../../types/user'

const Register: FunctionComponent = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [photo, setPhoto] = useState('')
  const FILE_SIZE = 1000 * 1000 * 2 // 2MB
  const FILE_TYPE = ['image/png', 'image/jpg', 'image/jpeg']
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    userName: yup.string().min(8).required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords do not match')
      .required(),
    photo: yup
      .mixed()
      .test('fileSize', 'Max file size 2 MB', (file) => !file || file.size <= FILE_SIZE)
      .test('fileType', 'Support .png, .jpg', (file) => !file || FILE_TYPE.includes(file.type))
  })

  const { handleSubmit, handleChange, setFieldValue, handleBlur, values, touched, errors } = useFormik<ISignUp>({
    initialValues: {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      confirmPassword: '',
      photo: null
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => onSubmit(values)
  })

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setFieldValue('photo', file)
      if (FILE_TYPE.includes(file.type)) {
        const imageData: LoadImageResult = await loadImage(file, {
          maxWidth: 200,
          maxHeight: 200,
          canvas: true
        })
        const base64 = (imageData.image as HTMLCanvasElement).toDataURL('image/jpeg', '0.75')
        setPhoto(base64)
      }
    }
  }

  const ImagePreview = () => {
    return photo ? photo : personImage.src
  }

  const onSubmit = async (values: ISignUp) => {
    try {
      setIsLoading(true)
      const payload = { ...values }
      delete payload.confirmPassword
      payload.photo = photo ? photo : undefined
      const result = await Services.AuthService.signUp(payload)
      let isSuccess = false
      if (!isEmpty(result.data)) {
        const { data = {} } = result.data
        console.log(data)
        if (data.message === 'success') {
          isSuccess = true
          Swal.fire({
            icon: 'success',
            title: 'Register',
            text: `Successful registration`
          }).then(() => {
            return router.push('/')
          })
        }
      }
      if (!isSuccess) {
        Swal.fire({
          icon: 'error',
          title: 'Register',
          text: 'error'
        })
      }
    } catch (error: any) {
      console.log(error)
      const { data = {} } = error.response
      Swal.fire({
        icon: 'error',
        title: 'Register',
        text: data.message || 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.registerContainer}>
      <Loading show={isLoading} />
      <Row className={styles.registerWrapper}>
        <Col md={{ span: 4, offset: 4 }}>
          <Form className={styles.registerForm} noValidate onSubmit={handleSubmit}>
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

            <Form.Group className="mb-3">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="Confirm password"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                isValid={touched.confirmPassword && !errors.confirmPassword}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>First name</Form.Label>
              <Form.Control
                placeholder="First name"
                type="text"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                isValid={touched.firstName && !errors.firstName}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                placeholder="Last name"
                type="text"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <div className="d-flex justify-content-center">
                <div className={styles.registerFormImage}>
                  <div className={styles.registerFormUpload}>
                    <input
                      id="photo"
                      type="file"
                      name="photo"
                      accept={FILE_TYPE.toString()}
                      onChange={handleUploadFile}
                    />
                    <label htmlFor="photo">
                      <FontAwesomeIcon icon={faImage} size="2xs" />
                    </label>
                  </div>
                  <div className={styles.registerFormImagePreview}>
                    <img src={ImagePreview()} alt="avatar" />
                  </div>
                </div>
              </div>
              {errors.photo && <div className="text-center mb-3 invalid-feedback d-block">{errors.photo}</div>}
            </Form.Group>

            <Button type="submit">Register</Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register
