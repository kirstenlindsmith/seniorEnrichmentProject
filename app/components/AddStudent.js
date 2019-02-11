import React from 'react'

const AddStudent = () => {
  return(
    <div>
      <h4>Start Your Intergalactic Path to Javascript Development! Enroll Today:</h4>
      <form method='POST' action='http://localhost:1337/api/students'>
        <div className='form-section'>
          <label htmlFor='firstName'>First Name</label>
          <div>
            <input name='firstName' type='text' />
          </div>
        </div>
        
        <div className='form-section'>
          <label htmlFor='lastName'>Last Name</label>
          <div>
            <input name='lastName' type='text' />
          </div>
        </div>
        
        <div className='form-section'>
          <label htmlFor='email'>Email</label>
          <div>
            <input name='email' type='text' />
          </div>
        </div>
        
        <div className='form-section'>
          <label htmlFor='imageUrl'>Profile Image</label>
          <div>
            <input name='imageUrl' type='text' defaultValue='must be a valid URL' />
          </div>
        </div>
        
        <div className='form-section'>
          <label htmlFor='gpa'>Transcript GPA</label>
          <div>
            <input name='gpa' type='number' step='0.1' min='0.0' max='4.0' />
          </div>
        </div>
        
        <div className='form-section'>
          <label htmlFor='campus'>Campus Of Choice</label>
          <div>
            <input name='campus' type='text' />
          </div>
        </div>
        
        <div>
          <button type='submit' className='button'>submit</button>
        </div>
        
      </form>
    </div>
  )
}

export default AddStudent
