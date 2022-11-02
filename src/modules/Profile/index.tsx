/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, FunctionComponent, ChangeEvent } from 'react'
import Swal from 'sweetalert2'
import personImage from '../../assets/images/person.png'
import Loading from '../../common/Loading'
import Auth from '../../auth'
import * as Services from '../../services'
import styles from './Profile.module.scss'
import loadImage, { LoadImageResult } from 'blueimp-load-image'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import { useFormik } from 'formik'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { EndpointConst } from '../../constants'
import { IUpdate } from '../../interfaces/user'

const Profile: FunctionComponent = () => {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<IUpdate>()
  const [isLoading, setIsLoading] = useState(false)
  const [photo, setPhoto] = useState('')
  const FILE_SIZE = 1000 * 1000 * 2 // 2MB
  const FILE_TYPE = ['image/png', 'image/jpg', 'image/jpeg']
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    photo: yup
      .mixed()
      .test('fileSize', 'Max file size 2 MB', (file) => !file || file.size <= FILE_SIZE)
      .test('fileType', 'Support .png, .jpg', (file) => !file || FILE_TYPE.includes(file.type))
  })

  const { handleSubmit, handleChange, setFieldValue, handleBlur, values, touched, errors } = useFormik<IUpdate>({
    initialValues: {
      firstName: userProfile?.firstName || '',
      lastName: userProfile?.lastName || '',
      photo: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => onSubmit(values)
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await Services.AuthService.getProfile()
      if (!isEmpty(result.data)) {
        const { data = {} } = result.data
        setUserProfile(data)
      }
    } catch (error) {}

    setIsLoading(false)
  }

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
    let src = personImage.src
    switch (true) {
      case userProfile?.photo && !photo:
        src = `${EndpointConst.AUTH.GET_PHOTO}/${userProfile?.photo}`
        break
      case !!photo:
        src = photo
        break
      default:
        src = personImage.src
        break
    }
    return src
  }

  const onSubmit = async (values: IUpdate) => {
    try {
      setIsLoading(true)
      const payload = { ...values }
      payload.photo = photo ? photo : undefined
      const result = await Services.AuthService.updateProfile(payload)
      const { data = {} } = result.data
      Auth.setToken(data.token, data.refreshToken)
      Swal.fire({
        icon: 'success',
        title: 'Update profile',
        text: `Successful profile`
      }).then(() => {
        return router.reload()
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Update profile',
        text: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.profileContainer}>
      <Loading show={isLoading} />
      <Row className={styles.profileWrapper}>
        <Col md={{ span: 4, offset: 4 }}>
          <Form className={styles.profileForm} noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <div className="d-flex justify-content-center">
                <div className={styles.profileFormImage}>
                  <div className={styles.profileFormUpload}>
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
                  <div className={styles.profileFormImagePreview}>
                    <img src={ImagePreview()} alt="avatar" />
                  </div>
                </div>
              </div>
              {errors.photo && <div className="text-center mb-3 invalid-feedback d-block">{errors.photo}</div>}
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

            <Button type="submit">Update</Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Profile
