import Header from './component/Header';
import { Routes, Route } from 'react-router-dom'
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetail from './pages/BlogDetail';
import { Toaster } from 'react-hot-toast';
import Home from './component/Home';
import About from './component/About';
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<Blog />} />
        <Route path='/about' element={<About />} />
        <Route path='/myBlogs' element={<UserBlogs />} />
        <Route path='/blog-details/:id' element={<BlogDetail />} />
        <Route path='/createBlog' element={<CreateBlog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
