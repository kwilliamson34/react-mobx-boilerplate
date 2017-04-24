import { action, autorun, computed, observable, observer } from 'mobx';
import { apiService } from '../services/api.service';

const category = {
    RECOMMENDED: 1,
    FIRE_RESCUE: 2,
    LAW_ENFORCEMENT: 3,
    EMERGENCY_MEDICAL: 4,
    DISPATCH: 5
};



class HomeStore {

	// ACTIONS
    @action getHomeCards () {
        const success = (res) => {
            this.homeCards = res;
            return this.homeCards;
        }
        const fail = (err) => {
            console.log(err);
        }
        return apiService.getHomeCards().then(success, fail)
	}



	//COMPUTEDS

    @computed get recommendedCards (){
        if(this.homeCards.length > 0){
            return this.homeCards.filter((app) => {
                return (app.category.indexOf(category.RECOMMENDED) > -1)
            })
        }
    }
    @computed get fireCards (){
        if(this.homeCards.length > 0){
            return this.homeCards.filter((app) => {
                return (app.category.indexOf(category.FIRE_RESCUE) > -1)
            })
        }
    }
    @computed get lawCards (){
        if(this.homeCards.length > 0){
            return this.homeCards.filter((app) => {
                return (app.category.indexOf(category.LAW_ENFORCEMENT) > -1)
            })
        }
    }
    @computed get emergencyCards (){
        if(this.homeCards.length > 0){
            return this.homeCards.filter((app) => {
                return (app.category.indexOf(category.EMERGENCY_MEDICAL) > -1)
            })
        }
    }
    @computed get dispatchCards (){
        if(this.homeCards.length > 0){
            return this.homeCards.filter((app) => {
                return (app.category.indexOf(category.DISPATCH) > -1)
            })
        }
    }

	// OBSERVABLES

	@observable homeCards = [];
  @observable categoryFilter = 'Select Category';
  @observable segmentFilter = 'Select Fitler';
}

export const homeStore = new HomeStore();
