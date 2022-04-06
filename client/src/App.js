import React from 'react';
import './styles/global.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import withContext from './Context';

//Importing Components
import Header from './components/Header';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

import PrivateRoute from './PrivateRoute';

import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
//Adding context to components
const HeaderWithContext = withContext(Header);

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

const PrivateRouteWithContext = withContext(PrivateRoute);

function App() {
  return (
    <div id='root'>
      <BrowserRouter>
        <HeaderWithContext />
        <main>
          <Routes>
            <Route path='/'>
              <Route index element={<CoursesWithContext />} />
              <Route path='signin' element={<UserSignInWithContext />} />
              <Route path='signup' element={<UserSignUpWithContext />} />
              <Route path='signout' element={<UserSignOutWithContext />} />
              <Route path='courses'>
                <Route index element={<CoursesWithContext />} />
                <Route path=':id'>
                  <Route index element={<CourseDetailWithContext />} />
                  <Route path='update' element={
                    <PrivateRouteWithContext redirectTo={'/signin'}>
                      <UpdateCourseWithContext />
                    </PrivateRouteWithContext>
                  } />
                  <Route path='delete' element={<CourseDetail />} />
                </Route>
              <Route path='create' element={
                <PrivateRouteWithContext redirectTo={'/signin'}>
                  <CreateCourseWithContext />
                </PrivateRouteWithContext>
              } />
            </Route>
            <Route path='error' element={<UnhandledError />} />
            <Route path='forbidden' element={<Forbidden />} />
            <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;