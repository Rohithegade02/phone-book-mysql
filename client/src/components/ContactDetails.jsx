import { useEffect, useState } from 'react'
import EditDeleteModal from './EditDeleteModal'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import ContactDetailsModal from './AddModal'
import { addContact, deleteContact, getDetails, updateContact } from '../api'

const ContactDetails = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  //get all data
  async function getData() {
    try {
      const result = await getDetails()
      setData(result)
    } catch (error) {
      setError(error.message || 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const openEditModal = contact => {
    setSelectedContact(contact)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setSelectedContact(null)
    setIsEditModalOpen(false)
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  //add contact
  const handleAddUser = async formData => {
    const response = await addContact(formData)
    if (response.ok) {
      setIsShowModal(false)
      getData()
    }
  }

  //delete contact
  const handleDelete = async id => {
    try {
      const response = await deleteContact(id)

      if (response.ok) {
        closeEditModal()
        getData()
      }
    } catch (error) {
      console.log(error)
    }
  }
  //edit contact
  const handleEdit = async (id, changes) => {
    try {
      await updateContact(id, changes)
      closeEditModal()
      getData()
    } catch (error) {
      console.error('Failed to update contact:', error)
    }
  }
  //filter by nickname
  const filterBySearch = data?.filter(item => {
    const searchTerm = search?.toLowerCase()
    return (
      item?.nickname?.toLowerCase()?.includes(searchTerm) ||
      item?.first_name?.toLowerCase()?.includes(searchTerm) ||
      item?.last_name?.toLowerCase()?.includes(searchTerm)
    )
  })

  return (
    <div className='lg:w-[40vw] m-[5px]  border-1 border-[#dee2e6]'>
      <div className='m-[5px] rounded-md'>
        <div
          style={{
            background: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '5px',
            padding: '5px ',
          }}
        >
          <div>
            <h1 style={{ color: '#fff', fontSize: '16px', marginTop: '5px' }}>
              Phone Book{' '}
            </h1>
          </div>
          <div style={{ display: 'flex' }}>
            <div>
              <input
                //={{ borderRadius: '10px', padding: '5px', width: '40vw' }}
                className='rounded-md p-[5px] lg:w-[200px] w-[40vw] mr-2'
                type='text'
                value={search}
                placeholder='Search..'
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div>
              <button
                style={{
                  borderRadius: '10px',
                  padding: '5px',
                  background: '#fff',
                }}
                onClick={() => setIsShowModal(true)}
              >
                <UserPlusIcon className='w-[25px] h-[25px] ' />
              </button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          {isShowModal ? (
            <ContactDetailsModal
              onAdd={handleAddUser}
              isShowModal={isShowModal}
              setIsShowModal={setIsShowModal}
            />
          ) : null}
        </div>
      </div>
      <div>
        {data?.length === 0 ? (
          <p>No contacts found Please add one contact.</p>
        ) : (
          filterBySearch?.map(contact => (
            <div
              onClick={() => openEditModal(contact)}
              key={contact.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                borderBottom: '1px solid #dee2e6',
                padding: '10px',
              }}
            >
              <div>
                <img
                  src={
                    contact?.photo ??
                    'https://via.placeholder.com/100x100.png?text=Default+Image'
                  }
                  alt='Contact'
                  style={{
                    height: '100px',
                    width: '80px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 800,
                    color: 'gray',
                    cursor: 'pointer',
                    marginLeft: '30px',
                  }}
                  onClick={() => openEditModal(contact)}
                >
                  {contact?.nickname
                    ? contact.nickname
                    : `${contact?.first_name} ${contact?.last_name}`}
                </p>
              </div>
            </div>
          ))
        )}

        {/* Edit Delete Contact Modal */}
        <EditDeleteModal
          onEdit={handleEdit}
          onDelete={handleDelete}
          selectedContact={selectedContact}
          isEditModalOpen={isEditModalOpen}
          closeEditModal={closeEditModal}
        />
      </div>
    </div>
  )
}

export default ContactDetails
