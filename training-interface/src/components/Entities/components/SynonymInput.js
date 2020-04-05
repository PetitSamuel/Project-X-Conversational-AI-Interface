import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SynonymList from './SynonymList.js';

const IntentInputs = ({ idx, entityState, handleEntityChange }) => {
    const entityId = `enti-${idx}`;

    const blankSynonym = { name: '', expression: [] };
    const [synonymState, setsynonymState] = useState([
        { ...blankSynonym },
    ]);

    const addList = () => {
        setsynonymState([...synonymState, { ...blankSynonym }]);
    };

    const handleSynonymChange = (e) => {
        const updatedSynonym = [...synonymState];
        updatedSynonym[e.target.dataset.idx] = e.target.value;
        setsynonymState(updatedSynonym);
    };


    return (
        <div key={`enti-${idx}`}>
            <Form.Label>Reference
                </Form.Label>
            <Form.Control type="text" placeholder={`Reference ${idx + 1}`}
                name={entityId}
                data-idx={idx}
                id={entityId}
                className="entity"
                value={entityState[idx].name}
                onChange={handleEntityChange}
            />
            
            <Form.Group controlId="Synonym.Description">
                <Form.Label style = {{marginLeft:"10px", marginTop:"5px"}}>Synonyms
                <Button variant="secondary" size="sm" style = { {marginLeft: "5px", lineHeight: "0.9", borderRadius: "10px"} } value="Add another expression"
                        onClick={addList}>
                        +
              </Button></Form.Label>
            </Form.Group>
            
            {
                synonymState.map((val, idx) => (
                    <SynonymList
                        key={`syn-${idx}`}
                        idx={idx}
                        synonymState={synonymState}
                        handleSynonymChange={handleSynonymChange}
                    />
                ))
            }
        </div>
    );
};

IntentInputs.propTypes = {
    idx: PropTypes.number,
    entityState: PropTypes.array,
    handleCatChange: PropTypes.func,
};

export default IntentInputs;