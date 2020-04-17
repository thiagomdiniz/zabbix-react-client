import ApiFetcher from './ApiFetcher';
import History from './History';

export default class Auth {
    userData = {};

    login = (username, password) => {
        //
    }

    handleAuth = (response, from) => {
    /*handleAuth = async (username, password) => {
        //let [{response, loading, error}, callApi] = useApiFetcher();
        let params = {
            'user': username,
            'password': password,
            'userData': true
        };
        let { response, error } = await ApiFetcher('user.login', 'POST', params);
        if (response) {
            this.userData = response.result;
            localStorage.setItem('userData', JSON.stringify(this.userData));
            setTimeout(() => { History.replace('/') }, 600);
        } else {
            console.log(error);
        }
        //return { response, error };*/
        if (response) {
            this.userData = response.result;
            localStorage.setItem('userData', JSON.stringify(this.userData));
            //setTimeout(() => { History.replace('/') }, 600);
            setTimeout(() => { History.replace(from) }, 600);
        }
    }

    getAccessToken = () => {
        if (localStorage.getItem('userData')) {
            const accessToken = JSON.parse(localStorage.getItem('userData'));
            return accessToken.sessionid;
        } else {
            return null;
        }
    }

    getFullName = () => {
        let fullName = '';
        if (this.userData.name) fullName = this.userData.name;
        if (this.userData.surname) fullName += ' ' + this.userData.surname;
        return fullName;
    }

    logout = () => {
        let { error } = ApiFetcher('user.logout', 'POST', [], this.getAccessToken());
        if (error) {
            console.log('Logout API error: ' + error);
        }
        localStorage.removeItem('userData');
        setTimeout(() => { History.replace('/') }, 200);
    }

    isAuthenticated = () => {
        //return (localStorage.getItem('userData')) ? true : false;
        if (localStorage.getItem('userData')) {
            this.userData = JSON.parse(localStorage.getItem('userData'));
            return true;
        } else {
            return false;
        }
    }
}