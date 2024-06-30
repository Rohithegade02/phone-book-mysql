const baseUrl = `http://localhost:4000`

export const getDetails = async () => {
  try {
    const response = await fetch(`${baseUrl}/contact/get`)
    const result = await response.json()
    console.log(result)
    return result?.result
  } catch (err) {
    console.log(err)
  }
}
export const addContact = async data => {
  try {
    const response = await fetch(`${baseUrl}/contact/add`, {
      method: 'POST',
      body: data,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}
export const deleteContact = async id => {
  try {
    const response = await fetch(`${baseUrl}/contact/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const updateContact = async (id, data) => {
  console.log(id, data)
  try {
    await fetch(`${baseUrl}/contact/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (err) {
    console.log(err)
  }
}
