import {
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
  Route,
} from 'react-router-dom'
import Homepage from './components/pages/Homepage'

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/">
      <Route index element={<Homepage />} />
    </Route>
  )
)
function App() {
  return <RouterProvider router={router} />
}

export default App
