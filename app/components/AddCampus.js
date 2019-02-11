import React from 'react'

const AddCampus = () => {
  return(
    <div>
      <h4>Become a franchisee! Start your own Margaret Hamilton Campus!</h4>
      <form method='POST' action='/campuses'>
        <div className='form-section'>
          <label htmlFor='name'>Campus Name</label>
          <div>
            <input name='name' type='text' />
          </div>
        </div>
        
        <div className='form-section'>
          <label htmlFor='address'>Address</label>
          <div>
            <input name='address' type='text'/>
          </div>
        </div>
        
        <div className='form-section'>
          <label htmlFor='image'>Campus Image</label>
          <div>
            <input name='image' type='text' defaultValue='must be a valid URL' />
          </div>
        </div>
        
        <div className='form-section'>
          <label htmlFor='description'>Description</label>
          <div>
            <textarea name='description' />
          </div>
        </div>
        
        <div>
          <button type='submit' className='button'>submit</button>
        </div>
        
      </form>
    </div>
  )
}

export default AddCampus
