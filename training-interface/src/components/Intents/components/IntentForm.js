import React, { useState } from 'react';
import IntentInputs from './IntentInputs.js';
import Form from 'react-bootstrap/Form'
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

    const blankIntent = { expression: ''};
    const [expressionState, setexpressionState] = useState([
        { ...blankIntent },
    ]);

    const addIntent = () => {
        setexpressionState([...expressionState, { ...blankIntent }]);
    };

    const handleIntentChange = (e) => {
        const updatedIntents = [...expressionState];
        updatedIntents[e.target.dataset.idx] = e.target.value;
        setexpressionState(updatedIntents);
    }; 
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:5000/api/intents', {
          name: nameState.name,
          expressions: expressionState,
        })
        .then(function (response) {
          console.log(response);
          window.location.reload(true);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    return (
        <Form onSubmit={handleSubmit}>
            <h4 style ={{paddingBottom: "6px"}}>Create New Intent</h4>
            <Form.Group controlId="Intent">
                <Form.Label>Intent</Form.Label>
                <Form.Control type="text" placeholder="Enter an intent" 
                name="intent"
                
                onChange={handleNameChange}
                />
            </Form.Group>
            <Form.Group controlId="Intent.Description">
                <Form.Label>Expressions
                <Button variant="secondary" size="sm" style={{marginLeft:"5px"}} value="Add another expression"
                onClick={addIntent}>
                + 
              </Button></Form.Label>
               
            </Form.Group>
            
            {
                expressionState.map((val, idx) => (
                    <IntentInputs
                        key={`expr-${idx}`}
                        idx={idx}
                        expressionState={expressionState}
                        handleIntentChange={handleIntentChange}
                    />
                ))
            }
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
        </Form>
        
    );
};

export default IntentForm;