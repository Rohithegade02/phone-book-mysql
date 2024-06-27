import { useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { PhoneArrowDownLeftIcon } from '@heroicons/react/24/solid'

const AddModal = ({ onAdd, isShowModal, setIsShowModal }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phonenumbers, setPhonenumbers] = useState([''])
  const [address, setAddress] = useState('')
  const [nickname, setNickname] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(
    'https://via.placeholder.com/100x100.png?text=Default+Image',
  ) // Custom text in placeholder image
  const [filter, setFilter] = useState('none')
  const [showPhoneButton, setShowPhoneButton] = useState(false)

  const handlePhoneNumberChange = (index, value) => {
    const updatedPhoneNumbers = [...phonenumbers]
    updatedPhoneNumbers[index] = value
    setPhonenumbers(updatedPhoneNumbers)
  }

  const addPhoneNumberField = () => {
    setPhonenumbers([...phonenumbers, ''])
  }

  const handlePhotoChange = e => {
    const file = e.target.files[0]
    setPhoto(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('nickname', nickname)
    formData.append('address', address)
    formData.append('photo', photo)
    formData.append('phonenumbers', JSON.stringify(phonenumbers))

    await onAdd(formData)
  }

  const applyFilter = selectedFilter => {
    setFilter(selectedFilter)
  }

  return (
    <div
      className='modal show'
      style={{ display: 'block', position: 'initial', paddingLeft: '0px' }}
    >
      <Modal
        show={isShowModal}
        onHide={() => setIsShowModal(false)}
        style={{ paddingLeft: '0px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Contact</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#f1f1f1',
            margin: '10px',
            borderRadius: '10px',
            border: '1px solid gray',
          }}
        >
          <Modal.Body style={{ margin: '5px' }}>
            <div
              style={{
                marginBottom: '10px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <img
                src={photoPreview}
                alt='Selected'
                style={{
                  width: '70vw',
                  height: '100px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  filter:
                    filter === 'gray'
                      ? 'grayscale(100%)'
                      : filter === 'blur'
                      ? 'blur(5px)'
                      : filter === 'saturate'
                      ? 'saturate(200%)'
                      : 'none',
                }}
              />
              <div style={{ position: 'absolute', bottom: '2%', left: '5%' }}>
                <Button
                  variant='secondary'
                  style={{
                    width: '70vw',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                  onClick={() => document.getElementById('photoInput').click()}
                >
                  Add Image
                </Button>
                <input
                  type='file'
                  id='photoInput'
                  style={{ display: 'none' }}
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
            <div style={{ marginBottom: '10px', marginLeft: '15px' }}>
              <Button
                style={{
                  backgroundColor: filter === 'gray' ? 'gray' : 'white',
                  color: filter === 'gray' ? 'white' : 'gray',
                  border: '1px solid gray',
                  borderRadius: '5px 0px 0px 5px',
                }}
                onClick={() => applyFilter('gray')}
              >
                Gray
              </Button>
              <Button
                style={{
                  backgroundColor: filter === 'blur' ? 'gray' : 'white',
                  color: filter === 'blur' ? 'white' : 'gray',
                  border: '1px solid gray',
                  borderRadius: '0px',
                }}
                onClick={() => applyFilter('blur')}
              >
                Blur
              </Button>
              <Button
                style={{
                  backgroundColor: filter === 'saturate' ? 'gray' : 'white',
                  color: filter === 'saturate' ? 'white' : 'gray',
                  border: '1px solid gray',
                  borderRadius: '0px',
                }}
                onClick={() => applyFilter('saturate')}
              >
                Saturate
              </Button>
              <Button
                style={{
                  backgroundColor: filter === 'none' ? 'gray' : 'white',
                  color: filter === 'none' ? 'white' : 'gray',
                  border: '1px solid gray',
                  borderRadius: '0px 5px 5px 0px',
                }}
                onClick={() => applyFilter('none')}
              >
                None
              </Button>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: '10px',
              }}
            >
              <Form.Group className='mb-3' style={{ flex: '1' }}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='First Name'
                  value={firstname}
                  onChange={e => setFirstname(e.target.value)}
                />
              </Form.Group>

              <Form.Group className='mb-3' style={{ flex: '1' }}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Last Name'
                  value={lastname}
                  onChange={e => setLastname(e.target.value)}
                />
              </Form.Group>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: '10px',
              }}
            >
              <Form.Group className='mb-3' style={{ flex: '1' }}>
                <Form.Label>Nick Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Nick Name'
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                />
              </Form.Group>

              <Form.Group className='mb-3' style={{ flex: '1' }}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Address'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </Form.Group>
            </div>
            <div style={{ borderTop: '1px solid #dee2e6', height: '20px' }} />

            {!showPhoneButton && (
              <Button
                onClick={() => setShowPhoneButton(true)}
                style={{
                  width: '100%',
                  background: '#fff',
                  color: 'gray',
                  border: 'none',
                }}
              >
                <PhoneArrowDownLeftIcon
                  style={{ height: '20px', width: '20px' }}
                />{' '}
                Phone Number
              </Button>
            )}
            {showPhoneButton &&
              phonenumbers?.map((number, index) => (
                <Form.Group key={index} className='mb-3'>
                  <Form.Label>Phone Number {index + 1}</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Phone Number'
                    value={number}
                    onChange={e =>
                      handlePhoneNumberChange(index, e.target.value)
                    }
                    maxLength={10}
                  />
                </Form.Group>
              ))}

            {showPhoneButton && (
              <Button
                style={{ color: 'gray', background: '#fff', border: 'none' }}
                onClick={addPhoneNumberField}
              >
                Add Phone Number
              </Button>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button
              style={{ color: 'gray', background: '#fff', border: 'none' }}
              type='submit'
            >
              Save Details
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default AddModal
