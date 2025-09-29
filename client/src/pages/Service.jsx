import { useEffect, useState } from "react";

export const Service = () => {
    const [services, setServices] = useState([]); // ✅ store fetched data

    const datafun = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/service", {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                setServices(data); // ✅ update state
                console.log("collection", data);
            }
        } catch (error) {
            console.log("error in get service", error);
        }
    };

    useEffect(() => {
        datafun();
    }, []);

    return (
        <ul>
            {services.map((e) => (
                <li key={e._id || e.id}> {/* ✅ unique key */}
                    <h1>{e.name}</h1>
                    <h1>{e.category}</h1>
                    <h1>{e.price}</h1>
                </li>
            ))}
        </ul>
    );
};
