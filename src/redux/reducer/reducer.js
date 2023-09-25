const initialState = {
    areaName: '',
    subAreaName: '',
    genreName: ''
};

function reducer(state = initialState, action) {
    const { type, payload } = action;


    switch (type) {
        case "GENRE_SELECT":    
            return {               
                ...state,
                genreName: payload.genreName,
            }
        
        case "AREA_SELECT":
            return {
                ...state,
                areaName : payload.areaNameText,
                subAreaName: ''
            }

        case "SUBAREA_SELECT":   
            return {               
                ...state,
                subAreaName: payload.subAreaName,
            }

        default:
            return state;
    }
}

export default reducer;
