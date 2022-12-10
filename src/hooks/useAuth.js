import { useSelector } from 'react-redux'

export function useAuth() {
    const { email, token, id, displayName, photoURL } = useSelector(
        (state) => state.user
    )

    return {
        isAuth: !!email,
        displayName,
        photoURL,
        email,
        token,
        id,
    }
}
