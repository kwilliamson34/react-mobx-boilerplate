import axios from 'axios';


class ApiService {

	//Axios
	loadEmployee () {
		return axios.get('http://localhost:3000/data');
	}	

}

export const apiService = new ApiService();