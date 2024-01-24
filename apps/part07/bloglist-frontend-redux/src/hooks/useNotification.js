
const useNotification = ({ message, time, type }) => {
    const dispatch = useDispatch()  
    useEffect(() => {
        if (message) {
        dispatch(setNotification(message, type))
        const timer = setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
        return () => clearTimeout(timer)
        }
    }, [dispatch, message, time, type])
}


export default useNotification