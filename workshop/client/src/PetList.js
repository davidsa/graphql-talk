import React from 'react'
import styled from 'styled-components'
import { Card, Row, Col } from 'antd'

const ResponsiveImg = styled('img')`
  height: auto;
  width: 100%;
`
const StyledCard = styled(Card)`
  width: 300px;
  margin: 30px auto;
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

const pets = [
  {
    name: 'Fluffy',
    age: 5,
    race: 'French Pooddle',
    photo:
      'http://static.iris.net.co/4patas/upload/images//2015/7/30/1073_11255_1.jpg',
  },
  {
    name: 'Rocky',
    age: 2,
    race: 'Pinscher',
    photo:
      'https://wakyma.com/blog/wp-content/uploads/2019/03/pinscher-miniatura-raza-770x460.jpg',
  },
  {
    name: 'Danger',
    age: 1,
    race: 'Rottweiler',
    photo:
      'https://www.caracteristicas.co/wp-content/uploads/2017/02/rottweiler-e1560948487213.jpg',
  },
]

export const PetList = () => {
  return (
    <Row type="flex">
      {pets &&
        pets.length > 0 &&
        pets.map(({ name, age, race, photo }, index) => (
          <Col span={12} key={index}>
            <StyledCard size="small">
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
        ))}
    </Row>
  )
}
