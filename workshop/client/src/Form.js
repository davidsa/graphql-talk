import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import 'antd/dist/antd.css'
import styled from 'styled-components'
import { Form, Input, Upload, Button, Icon } from 'antd'

const { Item: FormItem } = Form

const StyledForm = styled(Form)`
  width: 500px;
  margin: 30px auto;
`

const ADD_PET = gql`
  mutation AddPet($petInput: PetInput!) {
    addPet(petInput: $petInput) {
      _id
      name
      age
      race
      photo
    }
  }
`

const MyForm = ({
  form: {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched,
    validateFields,
  },
}) => {
  const [fileList, setFileList] = useState([])
  const [addPet, { data }] = useMutation(ADD_PET)

  console.log(data)

  const handleSubmit = e => {
    e.preventDefault()
    validateFields((err, values) => {
      if (err) console.error(err)
      const [photo] = fileList
      addPet({
        variables: {
          petInput: { ...values, age: parseInt(values.age), photo },
        },
      })
    })
  }

  const hasErrors = (fieldErrors = {}) =>
    Object.keys(fieldErrors).some(field => fieldErrors[field])

  const beforeUpload = file => {
    setFileList([file])
    return false
  }

  const onRemove = file => {
    setFileList([])
  }

  const nameError = isFieldTouched('name') && getFieldError('name')
  const raceError = isFieldTouched('race') && getFieldError('race')
  const ageError = isFieldTouched('age') && getFieldError('age')

  const isPristine =
    isFieldTouched('name') && isFieldTouched('age') && isFieldTouched('race')

  const disableButton =
    hasErrors(getFieldsError()) || !isPristine || fileList.length === 0

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormItem
        validateStatus={nameError ? 'error' : ''}
        help={nameError || ''}>
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: 'Please input the name of your pet.',
            },
          ],
        })(<Input placeholder="Name" />)}
      </FormItem>
      <FormItem
        validateStatus={raceError ? 'error' : ''}
        help={raceError || ''}>
        {getFieldDecorator('race', {
          rules: [
            { required: true, message: 'Please input the race of your pet.' },
          ],
        })(<Input placeholder="Race" />)}
      </FormItem>
      <FormItem validateStatus={ageError ? 'error' : ''} help={ageError || ''}>
        {getFieldDecorator('age', {
          rules: [
            {
              required: true,
              pattern: /[1-9]/,
              message: 'Please input the age of your pet.',
            },
          ],
        })(<Input type="number" placeholder="Age" />)}
      </FormItem>
      <FormItem>
        <Upload
          fileList={fileList}
          onRemove={onRemove}
          beforeUpload={beforeUpload}>
          <Button>
            <Icon type="upload" />
            Upload Photo
          </Button>
        </Upload>
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" disabled={disableButton}>
          Add
        </Button>
      </FormItem>
    </StyledForm>
  )
}

const widthForm = Form.create({ name: 'pet' })

export const MyFormWithForm = widthForm(MyForm)
