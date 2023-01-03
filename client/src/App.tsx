import { Routes, Route } from 'react-router-dom'
import { Layout, Public, DashLayout } from './components'
import { Login, Welcome, NotesList, UsersList } from './features'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route path='dash' element={<DashLayout />}>
          <Route index element={<Welcome />} />
          <Route path='notes'>
            <Route index element={<NotesList />} />
          </Route>
          <Route path='Users'>
            <Route index element={<UsersList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
