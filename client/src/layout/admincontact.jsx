import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
export const Admincontact = () => {
    const {Authorizationadmin} = useAuth()
    const [contacts,setContacts] = useState([])
    const getallcontacts = async() => {
        try {
            const responce = await fetch("http://localhost:5000/api/admin/contacts",{
                method:"GET",
                headers:{
                    Authorization : Authorizationadmin
                }
            })
            const data = await responce.json()
            setContacts(data)
            if(responce.ok){
                console.log(contacts);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deletecontact = async(id) => {
        try {
            console.log(id);
            const responce = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization : Authorizationadmin
                }
            })
            const data = await responce.json()
            console.log("after delete" , data)
            if (responce.ok){
                getallcontacts()
                alert("delete sucessfully")
            }
            // setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getallcontacts()
    },[])
    return (
       <ul>
        {contacts.map((e) => (
        <li key={e._id}>
            <h1>username : {e.username}</h1>
            <h1>Email : {e.email}</h1>
            <h1>message : {e.message}</h1>
            <button onClick={() =>deletecontact(e._id)}>delete</button>
            </li>
        ))}
       </ul>
    )
}