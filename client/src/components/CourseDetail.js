import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Context } from '../Context'

function CourseDetail() {

    const { id } = useParams();
    const [ course, setCourse ] = useState({});
    const [user, setUser] = useState({});
    const context = useContext(Context);

    const navigate = useNavigate();

    useEffect(() => {
        context.data.getCourse(id)
            .then(response => {
                setCourse(response);
                setUser(response.User);
            })
            .catch (error => {
                if (error.response.status === 404) {
                    navigate('/notfound');
                } else {
                    console.log(error);
                    navigate('/error');
                }
            })
    }, [context, navigate, id]);

    return (
            <React.Fragment>
                <div className="actions--bar">
                    <div className="wrap">
                        {context.authenticatedUser ? 
                            context.authenticatedUser.emailAddress === user.emailAddress
                            ?
                                <React.Fragment>
                                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                    <a className="button" href={"/"}
                                        onClick={
                                            () => context.data.deleteCourse(
                                                id,
                                                context.authenticatedUser.emailAddress,
                                                context.authenticatedUser.password
                                            )
                                        }>Delete Course</a>
                                </React.Fragment>
                            : null
                        :null
                        }
                        <Link className="button button--secondary" to={'/'}>Return To Course List</Link>
                    </div>
                </div>

                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                <p>By: {user.firstName} {user.lastName}</p>
                                <ReactMarkdown>{course.description}</ReactMarkdown>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className='course--detail--list'>
                                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
    )
}

export default CourseDetail;