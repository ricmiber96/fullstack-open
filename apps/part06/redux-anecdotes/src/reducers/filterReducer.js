import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    typeByFilter: 'all',
    search: ''
}

// export const filterChange = (typeByFilter) => {
//     console.log('filterChange', typeByFilter)
//     return {
//         type: 'SET_TYPE_FILTER',
//         typeByFilter
//     }
// }

// export const searchChange = (searchFilter) => {
//     return {
//         type: 'SET_SEARCH',
//         searchFilter
//     }
// }

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange: (state, action) => {
            state.typeByFilter = action.payload
        },
        searchChange: (state, action) => {
            state.search = action.payload
        }
    }
})

export const {filterChange, searchChange} = filterSlice.actions
export default filterSlice.reducer




// const filterReducer = (state = initialState, action) => {
//     console.log('state now: ', state)
//     console.log('action', action)
//     const {type} = action
//     console.log('action', action)
    
//     switch (type) {
//         case 'SET_TYPE_FILTER':
//         return {...state,
//                 typeByFilter: action.typeByFilter   
//         }

//         case 'SET_SEARCH':
//         return {...state,
//                 search: action.searchFilter
//         }
    
//         default:
//         return state
//     }
// }

// export default filterReducer