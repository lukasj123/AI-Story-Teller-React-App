import './UserForm.css';
import { useState } from 'react';
import generatePrompt from './Helper/generatePrompt';

export default function UserForm({currentTheme, fetchStory}) {

        const [formData, setformdata] = useState({
            firstName: '',
            occupation: '',
            funFact: '',
            genre: '',
            famousAuthor: ''
        })

        const [errors, setErrors] = useState({})

        function handleChange(e) {
            const {name, value} = e.target
            
            setformdata({...formData, [name]: value })

            setErrors({...errors, [name]: ''})
        }

        async function handleSubmit(e) {
            e.preventDefault();

            const formErrors = {}

            if (!formData.firstName) formErrors.firstName = "First name is required"
            if (!formData.occupation) formErrors.occupation = "Occupation is required"
            if (!formData.funFact) formErrors.funFact = "Fun fact is required"
            if (!formData.genre) formErrors.genre = "Genre is required"

            if (Object.keys(formErrors).length > 0) {
                setErrors(formErrors);
                console.log("Failed to pass the form");
            } else {
                console.log("Successfully passed form");
                await fetchStory(generatePrompt(formData))
            }
        }

    return (
        <>
            <form className={`user-form ${currentTheme}`} onSubmit={handleSubmit}>
                <label htmlFor="firstName" >First Name:</label>
                <input type="text" name="firstName" id="firstName" onChange={handleChange}/>

                {/* Conditional Rendering of Errors:
                    
                    You can put what you want to appear as a condition (stated as a truthy
                    boolean expression) linked with && to another boolean expression which
                    serves as the trigger. The trigger expression MUST be a state variable 
                    for React to respond to it.

                */}

                {errors.firstName && <div className="error">{errors.firstName}</div>} 
               
                <label htmlFor="occupation" >Occupation:</label>
                <input type="text" name="occupation" id="occupation" onChange={handleChange}/>
                
                {errors.occupation && <div className="error">{errors.occupation}</div>}

                <label htmlFor="funFact" >Fun Fact:</label>
                <input type="text" name="funFact" id="funFact" onChange={handleChange}/>
                
                {errors.funFact && <div className="error">{errors.funFact}</div>}

                <label htmlFor="genre" >Genre:</label>
                <select name="genre" id="genre" onChange={handleChange}>
                    <option value={''}>Select a genre</option>
                    <option value={'science fiction'}>Science Fiction</option>
                    <option value={'fantasy'}>Fantasy</option>
                    <option value={'mystery'}>Mystery</option>
                    <option value={'romance'}>Romance</option>
                    <option value={'horror'}>Horror</option>
                </select>

                {errors.genre && <div className="error">{errors.genre}</div>}
                
                <label htmlFor="famousAuthor" >Famous Author (optional):</label>
                <input type="text" name="famousAuthor" id="famousAuthor" onChange={handleChange}/>

                <button type="submit">Submit</button>
            </form>
        </>
    );
}