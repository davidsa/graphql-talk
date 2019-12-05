import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Card, Row, Col, Typography, Icon } from 'antd'
import { GET_PETS, DELETE_PET } from './queries'

const { Title } = Typography

const ResponsiveImg = styled('img')`
  height: auto;
  width: 100%;
`
const StyledCard = styled(Card)`
  width: 300px;
  margin: 30px auto;
  position: relative;
`

const CenteredCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextContainer = styled('div')`
  padding: 30px;
`

const StyledLabel = styled('label')`
  text-decoration: underline;
  font-weight: bold;
`

const StyledClose = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  cursor: pointer;
  z-index: 100;
`

const StyledLoading = styled(Title)`
  text-align: center;
  padding: 30px;
`

const StyledSlate = styled(Title)`
  padding: 50px;
`

export const PetList = () => {
  const { loading, error, data: { pets } = { pets: [] } } = useQuery(GET_PETS)
  const [
    deletePet,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_PET, {
    update(cache, { data: { deletePet } }) {
      const { _id: deletedId } = deletePet
      const { pets } = cache.readQuery({ query: GET_PETS })
      cache.writeQuery({
        query: GET_PETS,
        data: { pets: pets.filter(({ _id }) => _id !== deletedId) },
      })
    },
  })

  if (loading || deleteLoading) return <StyledLoading>Loading...</StyledLoading>

  if (error || deleteError)
    return <Title>`Error ${error || deleteError}`</Title>

  const handleDelete = id => event => {
    deletePet({ variables: { id } })
  }

  return (
    <Row type="flex" justify="center">
      {pets.length > 0 ? (
        pets.map(({ _id, name, age, race, photo }, index) => (
          <Col span={12} key={_id}>
            <StyledCard size="small">
              <StyledClose onClick={handleDelete(_id)}>
                <Icon type="close" />
              </StyledClose>
              <Row type="flex" justify="space-around" align="middle">
                <Col span={12}>
                  <ResponsiveImg src={photo} alt="Dog" />
                </Col>
                <Col span={12}>
                  <TextContainer>
                    <StyledLabel>Name</StyledLabel> <p>{name}</p>
                    <StyledLabel>Race</StyledLabel> <p>{race}</p>
                    <StyledLabel>Age</StyledLabel> <p>{age}</p>
                  </TextContainer>
                </Col>
              </Row>
            </StyledCard>
          </Col>
        ))
      ) : (
        <StyledSlate>Empty List</StyledSlate>
      )}
    </Row>
  )
}
