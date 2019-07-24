import React from 'react'

const Total = ({parts}) => {
    const exercises = parts.map(part => part.exercises)
    const total = exercises.reduce((s,p) => s + p, 0)
    return (
        <p><b>Total of {total} exercises</b></p> 
    )
} 

export default Total