import React from 'react'
import ContactFilter from '../contacts/ContactFilter'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'

const Home = () => {
    return (
        <div className="grid-2">
            <div>
                <ContactForm></ContactForm>
            </div>
            <div>
                <ContactFilter></ContactFilter> 
                <Contacts></Contacts>
            </div>
        </div>
    )
}

export default Home;
