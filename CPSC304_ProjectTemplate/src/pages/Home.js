import React from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import AddJob from '../component/AddJob'
import DatabaseConnectionStatus from '../component/DatabaseConnection'
import DisplayTable from '../component/DisplayTable'
import Salary from '../component/Salary'
import SalaryAnalysis from '../component/SalaryAnalysis'
import JobPositionAnalysis from '../component/JobPositionAnalysis'
import JobFilterComponent from '../component/JobFilterComponent'


const Home = () => {
    return (
        <>
            <Navbar />
            <Header />
            <AddJob />
            <DisplayTable />
        </>
    )
}

export default Home