import { useEffect, useState } from "react"
import PersonalInfo from "./PersonalInfo";
import PasswordInfo from "./PasswordInfo";
import OtpVerificationForm from "./OtpVerification";

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: 'Badakhshan',
    phone: '',
    password: '',
    timezone: '',
    // timeOffset: 0
}

export default function SignUp({}) {
    const [formData, setFormData] = useState(initialValues);
    const [activeTab, setActiveTab] = useState(1);
    const [ submitForm, setSubmitForm ] = useState(false);

    const props = { formData, setFormData }

    return (
        <div>
            {activeTab === 1 && 
                <PersonalInfo 
                    props={props} 
                    setActiveTab={() => setActiveTab(activeTab + 1)}
                    />
            }
            {activeTab === 2 && 
                <PasswordInfo 
                    props={props} 
                    setActiveTab={() => setActiveTab(activeTab + 1)}
                    />
            }
            {activeTab === 3 && 
                <OtpVerificationForm 
                    setSubmitForm={(data) => setSubmitForm(data)} 
                    formData={formData}
                    />
            }
        </div>
    )
}