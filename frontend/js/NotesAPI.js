export default class NotesAPI {
  static backendUrl = "https://notesapp-five-steel.vercel.app"
  static async getAllNotes() {
    // Assuming you have the JWT token stored in localStorage as 'token'
const token = localStorage.getItem('token');

   const response = await fetch(backendUrl +'/notes', {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
    const data = await response.json();
    return data;

  }

  static async saveNote(noteToSave) {
    const token = localStorage.getItem('token');
    const response = await fetch(backendUrl+ '/notes', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noteToSave)
    })
    const data = await response.json();
  }

  static async deleteNote(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(backendUrl +'/notes', {
      method: 'DELETE',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id
      })
    })
    const data = await response.json();
  }


}
