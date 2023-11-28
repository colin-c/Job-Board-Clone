import React from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import DatabaseConnectionStatus from '../component/DatabaseConnection'


const Home = () => {
    return (
        <>
            <Navbar />
            <Header />
            <h1>Home page</h1>
            <DatabaseConnectionStatus />
        </>
    )
}

export default Home