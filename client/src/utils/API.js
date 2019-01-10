import axios from "axios";

export default {
 
  saveFavorite: function(buttonData) {
    return axios.post("/api/favorites", buttonData);
  }
};
