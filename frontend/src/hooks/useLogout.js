import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDipatch } = useWorkoutsContext()

    const logout = () => {
        //Remove user from local storage
        localStorage.removeItem('user')

        //Dispatch logout action
        dispatch({ type: 'LOGOUT' })
        workoutsDipatch({ type: 'SET_WORKOUTS', payload: null })
    }

    return { logout }
}