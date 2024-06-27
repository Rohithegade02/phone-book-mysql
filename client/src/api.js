const baseUrl = `http://localhost:4000`

export const getDetails = async () => {
  try {
    const response = await fetch(`${baseUrl}/user/get`)
    const result = await response.json()
    console.log(result)
    return result?.result
  } catch (err) {
    console.log(err)
  }
}
export const addUser = async data => {
  try {
    const response = await fetch(`${baseUrl}/user/add`, {
      method: 'POST',
      body: data,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}
export const deleteUser = async id => {
  try {
    const response = await fetch(`${baseUrl}/user/${id}`, {
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

export const updateUser = async (id, data) => {
  console.log(id, data)
  try {
    await fetch(`${baseUrl}/user/${id}`, {
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
