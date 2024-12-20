"use client"
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation'
import Header from '../components/Student-Dashboard/Header';
import Dashboard from '../components/Student-Dashboard/Dashboard';
import Head from 'next/head';

export default function StudentPortal() {
    const [userName, setUserName] = useState('Student');
    
    useEffect(() => {
        const fetchUserName = async () => {
            const response = await fetch('/api/getProfileInfo');
            if (response.ok) {
                const data = await response.json();
                if(data.name ) {
                    setUserName(data.name);
                }
            } 
        };
        fetchUserName();
    }, []);

    const handleClickHome = () => {
        redirect('/profile-page');
    }

    return(
        <div className="font-orienta w-auto bg-[#F8F7F4] flex flex-col pb-12">
            <Header />
            <Dashboard userName={userName}/>
        </div>
    );
}