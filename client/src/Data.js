import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

export default class Data {

        //Retrieve data from API
        api(path, method = 'GET', data = null, requiresAuth = false, credentials = null) {
            const url = path
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            };

            if (data !== null) {
                options.data = JSON.stringify(data);
            }

            if (requiresAuth) {
                options.auth = {
                    username: credentials.emailAddress,
                    password: credentials.password,
                }
            }

            return axios(url, options);
        }

        //Retrieves user from API
        async getUser(emailAddress, password) {
            const response = await this.api('/users', 'GET', null, true, {emailAddress, password});
            if (response.status === 200) {
                return response.data;
            } else if(response.status === 401) {
                return null;
            } else { 
                throw new Error();
            }
        }

        //Retrieves specific course from API
        async getCourse(id) {
            const response = await this.api(`/courses/${id}`, 'GET', null);
            if (response.status === 200) {
                return response.data.course;
            } else if (response.status === 404) {
                return response.status;
            } else {
                throw new Error();
            }
        }

        //Creates new user
        async createUser(user) {
            const response = await this.api('/users', 'POST', user);
            if (response.status === 201) {
                return [];
            } else if (response.status === 400) {
                return response.error.response.data;
            } else {
                throw new Error();
            }
        }

        //Creates new course
        async createCourse(course, emailAddress, password) {
            const response = await this.api('/courses', 'POST', course, true, {emailAddress, password});
            if (response.status === 201) {
                return [];
            } else if (response.status === 400) {
                return response.error.response.data;
            } else {
                throw new Error();
            }
        }

        //Updates an existing course
        async updateCourse(id, course, emailAddress, password){
            const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
            if (response.status === 204) {
                return [];
            } else if (response.status === 400) {
                return response.data.course.errors;
            } else {
                throw new Error();
            }
        
        }

        //Deletes an existing course
        async deleteCourse(id, emailAddress, password) {
            const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress,password});
            if (response.status === 204) {
                return [];
            } else if (response.status === 400) {
                return response.error.response.data;
            } else {
                throw new Error();
            }
        }
}