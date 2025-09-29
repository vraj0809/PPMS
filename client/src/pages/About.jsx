import { useAuth } from "../store/auth";
export const About = () => {
    const {userrname} = useAuth()
    return(
        <>
        <h1>{userrname}</h1>
        </>
    )
}