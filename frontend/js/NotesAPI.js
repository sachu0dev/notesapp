export default class NotesAPI {
  static async getAllNotes() {
    // Assuming you have the JWT token stored in localStorage as 'token'
const token = localStorage.getItem('token');

   const response = await fetch('http://localhost:3000/notes', {
      method: 'GET',
      headers: {
        'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjEwY2ZiYmViNGIwNTRlY2M4MmM2NDgiLCJpYXQiOjE3MTIzODI3ODJ9.Klg6qE2Clt4K3GG3lwTErSOEG7XP7Zn3jwBeOeh10Jo"
      }
    })
    const data = await response.json();
    return data;

  }

  static async saveNote(noteToSave) {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjEwY2ZiYmViNGIwNTRlY2M4MmM2NDgiLCJpYXQiOjE3MTIzODI3ODJ9.Klg6qE2Clt4K3GG3lwTErSOEG7XP7Zn3jwBeOeh10Jo",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noteToSave)
    })
    const data = await response.json();
  }

  static async deleteNote(id) {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/notes', {
      method: 'DELETE',
      headers: {
        'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjEwY2ZiYmViNGIwNTRlY2M4MmM2NDgiLCJpYXQiOjE3MTIzODI3ODJ9.Klg6qE2Clt4K3GG3lwTErSOEG7XP7Zn3jwBeOeh10Jo",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: 'note_id_to_delete'
      })
    })
    const data = await response.json();
  }
}
