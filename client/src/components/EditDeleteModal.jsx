import { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { TrashIcon } from '@heroicons/react/24/solid'

const EditDeleteModal = ({
  selectedContact,
  isEditModalOpen,
  closeEditModal,
  onDelete,
  onEdit,
}) => {
  const [initialContact, setInitialContact] = useState({})
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phonenumbers, setPhonenumbers] = useState([])
  const [address, setAddress] = useState('')
  const [nickname, setNickname] = useState('')
  const [photo, setPhoto] = useState(null)
  const [filter, setFilter] = useState('none')
  const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(false)

  useEffect(() => {
    if (selectedContact) {
      setInitialContact({
        firstname: selectedContact?.first_name || '',
        lastname: selectedContact?.last_name || '',
        phonenumbers: selectedContact?.phonenumbers || [],
        address: selectedContact?.address || '',
        nickname: selectedContact?.nickname || '',
        photo: selectedContact?.photo || null,
      })

      setFirstname(selectedContact?.first_name || '')
      setLastname(selectedContact?.last_name || '')
      setPhonenumbers(selectedContact?.phonenumbers || [])
      setAddress(selectedContact?.address || '')
      setNickname(selectedContact?.nickname || '')
      setPhoto(selectedContact?.photo || null)
    }
  }, [selectedContact])

  useEffect(() => {
    const isAnyFieldChanged =
      firstname !== initialContact.firstname ||
      lastname !== initialContact.lastname ||
      nickname !== initialContact.nickname ||
      address !== initialContact.address

    setIsPhoneNumberEditable(isAnyFieldChanged)
  }, [firstname, lastname, nickname, address, initialContact])

  const handlePhoneNumberChange = (index, value) => {
    console.log(index)
    if (index >= 0 && index < phonenumbers.length) {
      const updatedPhoneNumbers = [...phonenumbers]
      updatedPhoneNumbers[index] = {
        ...updatedPhoneNumbers[index],
        phone_number: value,
      }
      setPhonenumbers(updatedPhoneNumbers)
    }
  }

  console.log(phonenumbers)
  const handleEdit = async e => {
    e.preventDefault()

    const changes = {}

    if (firstname !== initialContact.firstname) changes.firstname = firstname
    if (lastname !== initialContact.lastname) changes.lastname = lastname
    if (nickname !== initialContact.nickname) changes.nickname = nickname
    if (address !== initialContact.address) changes.address = address
    if (isPhoneNumberEditable) changes.phonenumbers = phonenumbers

    if (Object.keys(changes).length > 0) {
      await onEdit(selectedContact?.id, changes)
    }

    closeEditModal()
  }

  const handleDeleteClick = async () => {
    await onDelete(selectedContact?.id)
  }

  return (
    <Modal
      show={isEditModalOpen}
      onHide={closeEditModal}
      style={{ paddingLeft: '0px' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleEdit}
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
              src={photo || 'https://via.placeholder.com/100?text=Image'}
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

          {phonenumbers?.map((number, index) => (
            <Form.Group key={number.id} className='mb-3'>
              <Form.Label>Phone Number {index + 1}</Form.Label>
              <Form.Control
                type='text'
                placeholder='Phone Number'
                value={number?.phone_number}
                onChange={e => handlePhoneNumberChange(index, e.target.value)}
                maxLength={10}
                disabled={!isPhoneNumberEditable}
              />
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleDeleteClick}
            style={{ color: 'gray', background: '#fff', border: 'none' }}
          >
            <TrashIcon style={{ height: '15px', width: '15px' }} />
          </Button>
          <Button
            style={{ color: 'gray', background: '#fff', border: 'none' }}
            type='submit'
          >
            Edit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default EditDeleteModal
