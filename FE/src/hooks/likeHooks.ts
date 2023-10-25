import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { IThreadCard } from "../interface/interface";
import { API } from "../lib/api";
import { SET_THREAD_LIKE } from "../stores/rootReducer";
import { RootState } from "../stores/types/rootState";


export function useLike() {
    const dispatch = useDispatch()
    const threads = useSelector((state: RootState) => state.thread.threads)

    async function handleLike(id: number, isLiked: boolean) {
        try {
            if (!isLiked) {
                const response = await API.post('/like', { threadById: id })
                dispatch(SET_THREAD_LIKE({ id: id, isLiked: isLiked }))
                console.log("Like Success", response.data)
            } else {
                const response = await API.delete(`/like/${id}`)
                dispatch(SET_THREAD_LIKE({ id: id, isLiked: isLiked }))
                console.log("Unlike Success", response.data)
            }
        } catch (error) {
            console.log("Update Like Failed", error)
        }
    }

    return { handleLike, threads }
}