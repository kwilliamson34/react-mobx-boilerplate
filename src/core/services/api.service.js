import axios from 'axios';
import { utilsService } from './utils.service';



class ApiService {

	//Axios
	loadEmployee () {
		return axios.get('http://localhost:3000/data');
	}
	getHomeCards () {
		// return axios.get('/api-services/apps/search?searchTxt=a')
		return axios.get('http://localhost:3000/homeCards')
		.then( (res) => {
			return utilsService.conditionData(res.data.applications);
		});
	}	

}

export const apiService = new ApiService();