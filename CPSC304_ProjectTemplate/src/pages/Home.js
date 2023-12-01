import React from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import NoteList from '../component/NoteList'
import DatabaseConnectionStatus from '../component/DatabaseConnection'
import DisplayTable from '../component/DisplayTable'
import Salary from '../component/Salary'
import SalaryAnalysis from '../component/SalaryAnalysis'
import JobPositionAnalysis from '../component/JobPositionAnalysis'


const Home = () => {
    return (
        <>
            <Navbar />
            <Header />
            <h1>Home page</h1>
            <DatabaseConnectionStatus />
            <NoteList />
            <DisplayTable />
            <Salary />
            <SalaryAnalysis />
            <JobPositionAnalysis />
        </>
    )
}

export default Home