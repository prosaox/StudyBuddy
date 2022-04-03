import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';

const Home = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        let abortController;
        let unmounted = false;
        const getUser = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch("http://localhost:5001/api/auth/", {
                    method: "GET",

                    headers: {
                        "x-auth-token": token
                    },
                })
                    .then(res => res.json());
                    if(!unmounted)
                    {
                setUser(res);
                setName(res.name);
                    }
            } catch (err) {

            }
        };
        getUser();
        return () => { unmounted = true };
    },[]);

    if (user === null) {
        return <p> loading </p>;
    } else {
        return (
            <div>
                <h1> StudyBuddy </h1>
                <Navbar />
                <p> Welcome, {name} to StudyBuddy!</p>
                <h6>Self description</h6>
                <p>Degree:{user.degree}</p>
                <p>Studying at:{user.school}</p>
                <h6>My profile</h6>
                <p>{user.description}</p>
            </div>
        )
    }
}

export default Home;