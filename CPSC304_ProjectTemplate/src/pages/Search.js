import React from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import Salary from '../component/Salary'
import SalaryAnalysis from '../component/SalaryAnalysis'
import JobPositionAnalysis from '../component/JobPositionAnalysis'
import JobFilterComponent from '../component/JobFilterComponent'
import ProjectionSelector  from "../component/ProjectionSelector";


const Home = () => {
    return (
        <>
            <Navbar />
            <Header />

            <JobFilterComponent />
            <Salary />
            <SalaryAnalysis />
            <JobPositionAnalysis />
            <ProjectionSelector />
        </>
    )
}

export default Home