import React, { useState } from 'react';
import SynonymInputs from './SynonymInput.js';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const axios = require('axios').default;

const IntentForm = () => {

    const [nameState, setNameState] = useState({
        name: '',
    });

    const handleNameChange = (e) => setNameState({
        ...nameState,
        name: e.target.value,
    });

    const blankIntent = { synonym_reference: '', list: [] };
    const [intentState, setIntentState] = useState([
        { ...blankIntent },
    ]);

    const addReference = () => {
        setIntentState([...intentState, { ...blankIntent }]);
    };

    const handleReferenceChange = (e) => {
        const updatedIntents = [...intentState];
        updatedIntents[e.target.dataset.idx]["synonym_reference"] = e.target.value;
        setIntentState(updatedIntents);
    };


    const handleSubmit = (e) => {
        console.log(intentState);
        console.log(nameState);
        e.preventDefault();
        axios.post('http://localhost:5000/api/intents', {
            name: nameState.name,
            synonyms: intentState,
        })
            .then(function (response) {
                console.log(response);
                window.location.reload(true);
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const handleCancel = (e) => {
        e.preventDefault();
        window.location.reload(true);
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Intent">
                <Form.Label>Intent reference</Form.Label>
                <Form.Control type="text" placeholder="Enter intent reference"
                    reference="intent"
                    onChange={handleNameChange}
                />
            </Form.Group>

            <div style={{ overflow: "auto", maxHeight: "300px", margin: "2px", padding: "5px" }}>
                {
                    intentState.map((val, idx) => (
                        <SynonymInputs
                            key={`enti-${idx}`}
                            idx={idx}
                            intentState={intentState}
                            handleReferenceChange={handleReferenceChange}
                            setIntentState={setIntentState}
                            intentState={intentState}
                        />
                    ))
                }
            </div>
            <Row>
                <Col><button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button></Col>
                <Col> <Button onClick={handleSubmit} variant="outline-danger" style={{ float: "right", margin: "30px" }}>Cancel</Button></Col>
            </Row>
            <p>Add another reference<Button variant="secondary" size="sm" style={{ marginLeft: "5px", lineHeight: "0.9", borderRadius: "10px" }}
                onClick={addReference}>
                +
              </Button></p>
        </Form>

    );
};

export default IntentForm;