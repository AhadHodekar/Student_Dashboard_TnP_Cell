import { useEffect, useState } from "react";
import {
  RouterProvider,
  Route,
  Outlet,
  Navigate,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import Dummy from "../Dummy";
import StudentDashboard from "./pages/Student/StudentDashboard/StudentDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import TAdminDashboard from "./pages/Admin/AdminDashboard/_test_/TAdminDashboard";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import Blog from "./pages/Blog/Blog";
import { useAdminContext } from "./context/AdminContext";
import Layout from "./layout/Layout";
import Learning from "./pages/Learning/Learning";
import Test from "./pages/Test";
import Student from "./pages/Student";
import Admin from "./pages/Admin";
import Students from "./pages/Admin/Students/Students";
import Training from "./pages/Training/Training";
import Resume from "./pages/Resume/Resume";
import Books from "./pages/Learning/components/Books";
import { useAuth } from "./context/AuthContext";
import Book from "./pages/Learning/components/Book";
import BookUploadForm from "./pages/Learning/components/BookUploadForm";
import Post from "./pages/Blog/components/Post";
import YoutubeThumbnailPreview from "./pages/Learning/components/YoutubeThumbnailPreview";
import Videos from "./pages/Learning/components/Videos";
import VideoUploadForm from "./pages/Learning/components/VideoUploadForm";
// import { useTheme } from "./context/ThemeContext";

function App() {
  const [role, setRole] = useState(null);
  // const [theme, setTheme] = useState(null);
  const { isAuthenticated } = useAuth();
  // const { theme, changeTheme } = useTheme();
  useEffect(() => {
    setRole(localStorage.getItem("role"));
    // setTheme(localStorage.getItem("theme"));
    // console.log(theme);
  }, []);

  // const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();
  // const { isAuthenticated } = useAdminContext();
  // const [isAuth, setIsAuth] = useState(false);
  // useEffect(() => {
  //   setIsAuth(isAuthenticated);
  //   console.log(isAuth);
  // }, []);

  return (
    <div>
      {/* redux testing */}
      {/* <Route path="/student" element={<Student />}></Route>
    <Route path="/admin" element={<Admin />}></Route>
    <Route path="/test" element={<Test />}></Route> */}

      {/* mainapp */}
      <BrowserRouter>
        <Routes>
          <Route
            index
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/" element={<Layout />}>
            <Route path="/book/:id" element={<Book />}></Route>
            <Route path="/post/:id" element={<Post />}></Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/blog" element={<Blog />}></Route>
              <Route path="/learning" element={<Learning />}></Route>
              <Route path="/books" element={<Books />}></Route>
              <Route path="/book-form" element={<BookUploadForm />}></Route>
              <Route path="/books" element={<Books />}></Route>
              <Route
                path="/videourl"
                element={<YoutubeThumbnailPreview />}
              ></Route>
              <Route path="/training" element={<NotFound />}></Route>
              <Route path="/students" element={<Students />}></Route>
              <Route path="/resume" element={<NotFound />}></Route>
              <Route path="/videos" element={<Videos />}></Route>
              <Route path="/video-form" element={<VideoUploadForm />}></Route>

              <Route path="/papers" element={<NotFound />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <Route path="/" element={<PrivateRoute />}></Route> */}
      {/* <Route path="/" element={<PrivateRoute />}>
          <Route path="/test" element={<Test />}></Route>
        </Route> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;

// const dashboardElement =
//   adminData.role === "student" ? <Dashboard /> : <AdminDashboard />;
// const [currentUser, setCurrentUser] = useState(true);
// const ProtectedRoute = ({ children }) => {
//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ProtectedRoute>
//         <Layout />
//       </ProtectedRoute>
//     ),
//     children: [
//       {
//         path: "/",
//         element: <Dashboard />,
//       },
//       {
//         path: "/profile",
//         element: <StudentProfile />,
//       },
//       {
//         path: "/admin",
//         element: <AdminDashboard />,
//       },
//       {
//         path: "/students",
//         element: <StudentTable />,
//       },
//       {
//         path: "*",
//         element: <NotFound />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login currentUser={currentUser} />,
//   },
//   // {
//   //   path: "/register",
//   //   element: <Register />,
//   // },
// ]);
// return (
//   <div className="App m-0 p-0 w-full h-screen bg-base-200" data-theme="cmyk">
//     <RouterProvider router={router} />
//   </div>
// );
