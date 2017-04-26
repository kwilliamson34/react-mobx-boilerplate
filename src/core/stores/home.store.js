import { action, computed, observable } from 'mobx';
import { apiService } from '../services/api.service';

// Category Mapping
const user_segment = {
    RECOMMENDED: 1,
    FIRE_RESCUE: 201,
    LAW_ENFORCEMENT: 200,
    EMERGENCY_MEDICAL: 204,
    DISPATCH: 203,
    CRITICAL_INFRASTURCUTRE: 205
};



class HomeStore {

    // ACTIONS
    @action getHomeCards() {
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

    @computed get recommendedCards() {
        return this.homeCards.filter((app) => {
            return (app.recommended)
        })
    }
    @computed get fireCards() {
        return this.homeCards.filter((app) => {
            return (app.user_segment.indexOf(user_segment.FIRE_RESCUE) > -1)
        })
    }
    @computed get lawCards() {
        return this.homeCards.filter((app) => {
            return (app.user_segment.indexOf(user_segment.LAW_ENFORCEMENT) > -1)
        })
    }
    @computed get emergencyCards() {
        return this.homeCards.filter((app) => {
            return (app.user_segment.indexOf(user_segment.EMERGENCY_MEDICAL) > -1)
        })
    }
    @computed get dispatchCards() {
        return this.homeCards.filter((app) => {
            return (app.user_segment.indexOf(user_segment.DISPATCH) > -1)
        })
    }

    // OBSERVABLES

    @observable homeCards = [];
    @observable categoryFilter = 'Select Category';
    @observable segmentFilter = 'Select Fitler';
}

export const homeStore = new HomeStore();
