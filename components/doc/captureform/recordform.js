import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DocSectionText } from '@/components/doc/common/docsectiontext';

export function FormInput(props) {
    const [date, setDate] = useState(null);
    const [text, setText] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedConsultant, setSelectedConsultant] = useState(null);
    const [complainantName, setComplainantName] = useState('');
    const [complaintTitle, setComplaintTitle] = useState('');
    const [complainantEmail, setComplainantEmail] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading state

    const countries = [
        { name: 'Kenya', code: 'KE' },
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];

    const categories = [
        { label: 'Technical', value: 'Technical' },
        { label: 'Billing', value: 'Billing' },
        { label: 'Customer Service', value: 'Customer Service' },
        { label: 'System Feedback', value: 'System Feedback' },
        { label: 'Account Registration', value: 'Account Registration' },
        { label: 'Product Support', value: 'Product Support' },
        { label: 'Bug Report', value: 'Bug Report' },
        { label: 'Feature Request', value: 'Feature Request' },
        { label: 'Payment Issues', value: 'Payment Issues' },
        { label: 'Delivery Problems', value: 'Delivery Problems' },
        { label: 'Account Security', value: 'Account Security' },
        { label: 'Performance Concerns', value: 'Performance Concerns' },
        { label: 'Feedback/Suggestions', value: 'Feedback/Suggestions' },
        { label: 'Accessibility', value: 'Accessibility' },
        { label: 'Privacy Concerns', value: 'Privacy Concerns' },
    ];

    const consultants = [
        { label: 'Allan Onsomu', value: 'Allan Onsomu' },
        { label: 'Catherine HR', value: 'Catherine HR' },
        { label: 'Owen Jonnes', value: 'Owen Jonnes' },
        { label: 'Sarah Kerubo', value: 'Sarah Kerubo' },
        { label: 'Javan Argwings', value: 'Javan Argwings' },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            setLoading(true); // Set loading state to true

            const isoDate = date.toISOString();
            const selectedCountryName = selectedCountry ? selectedCountry.name : null;
            
            const response = await fetch('http://localhost:5000/api/issues/create-issue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: isoDate,
                    complainantName,
                    complainantEmail,
                    selectedCountry: selectedCountryName,
                    selectedCategory,
                    selectedConsultant,
                    complaintTitle,
                    text
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form data');
            }

            const responseData = await response.json();

            // Optionally, reset form fields after successful submission
            resetFormFields();
            window.location.href = '/viewTasks';

        } catch (error) {
        } finally {
            setLoading(false); // Reset loading state regardless of success or failure
        }
    };

    const resetFormFields = () => {
        setDate(null);
        setText('');
        setSelectedCountry(null);
        setSelectedCategory(null);
        setSelectedConsultant(null);
        setComplainantName('');
        setComplaintTitle('');
        setComplainantEmail('');
    };
    
    return (
        <form className='card' onSubmit={handleSubmit}>
            <DocSectionText>
                <p><i>Note:</i> I have put down some few explanations of the funtionality just below the form.</p>
            </DocSectionText>
            
            <div className="p-field">
                <label htmlFor="reportDate">Report Date:</label>
                <Calendar id="reportDate" value={date} onChange={(e) => setDate(e.value)} required />
            </div>
            <div className="p-field">
                <label htmlFor="complainantName">Complainant Name:</label>
                <InputText id="complainantName" value={complainantName} onChange={(e) => setComplainantName(e.target.value)} required />
            </div>
            <div className="p-field">
                <label htmlFor="complainantEmail">Complainant Email:</label>
                <InputText id="complainantEmail" type='email' value={complainantEmail} onChange={(e) => setComplainantEmail(e.target.value)} required />
            </div>
            <div className="p-field">
                <label htmlFor="country">Country Source:</label>
                <Dropdown id="country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={countries} optionLabel="name" placeholder="Select a Country" required />
            </div>
            <div className="p-field">
                <label htmlFor="category">Issue Category:</label>
                <Dropdown id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={categories} optionLabel="label" placeholder="Select a Category" required />
            </div>
            <div className="p-field">
                <label htmlFor="consultant">Assign Consultant:</label>
                <Dropdown id="consultant" value={selectedConsultant} onChange={(e) => setSelectedConsultant(e.value)} options={consultants} optionLabel="label" placeholder="Select a Consultant" required />
            </div>
            <div className="p-field">
                <label htmlFor="complaintTitle">Brief Issue Title:</label>
                <InputText id="complaintTitle" value={complaintTitle} onChange={(e) => setComplaintTitle(e.target.value)} required />
            </div>
            <div className="p-field">
                <label htmlFor="issueDescription">Description:</label>
                <Editor id="issueDescription" value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} placeholder='Describe the issue being reported...' required />
            </div>
            <Button
                type="submit"
                icon="pi pi-angle-double-right"
                label={loading ? "Saving..." : "Assign Issue"} // Change label based on loading state
                className="p-button-primary"
                style={{ margin: '1rem' }}
                disabled={loading} // Disable button when loading
            />
            <DocSectionText>
                <p>In a <i>professional system</i>, I would make sure the <i>report date</i> is picked <i>automatically</i> through the system itself, or in the database, the reportDate column just records the insert date automatically. This helps reduce unnecessary steps in a system and saves time for users.</p>
                <p>A <i>System Generated Email</i> will be sent to the <i>Complainant</i> when the issue has been assigned to a consultant.</p>
                <p>The Assign Button becomes <i>inactive</i> when the data is being sent to the database, to prevent double entry.</p>

            </DocSectionText>
        </form>
    );
}
