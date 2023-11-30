import React from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import NoteList from '../component/NoteList'
import DatabaseConnectionStatus from '../component/DatabaseConnection'
import DisplayTable from '../component/DisplayTable'


const Home = () => {
    return (
        <>
            <Navbar />
            <Header />
            <h1>Home page</h1>
            <DatabaseConnectionStatus />
            <NoteList />
            <DisplayTable />
        </>
    )
}

export default Home