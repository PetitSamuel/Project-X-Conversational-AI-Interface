import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SynonymList from './SynonymList.js';

const SynonymInputs = ({ idx, intentState, handleReferenceChange, setIntentState }) => {
    const intetnId = `enti-${idx}`;
    const count = idx;

    const blankSynonym = { name: '', list: [] };
    const [synonymState, setsynonymState] = useState([
        { ...blankSynonym },
    ]);

    const addList = () => {
        setsynonymState([...synonymState, { ...blankSynonym }]);
    };

    const handleSynonymChange = (e) => {
        const updatedIntents = [...intentState];
        //This is the location to be edited.. index in reference array -> index in synonym array inside reference obj
        updatedIntents[idx]["list"][e.target.dataset.idx] = e.target.value;
        setIntentState(updatedIntents);
    };


    return (
        <div key={`enti-${idx}`} style={{ margin: "2px", borderStyle: "dashed", borderWeight: "0.1px", borderColor: "#13beb1", padding: "5px" }}>
            <Form.Label>Reference</Form.Label>
            <Form.Control type="text" placeholder={`Reference ${idx + 1}`}
                name={intetnId}
                data-idx={idx}
                id={intetnId}
                className="entity"
                value={intentState[idx].name}
                onChange={handleReferenceChange}
            />

            <Form.Group controlId="Synonym.Description">
                <Form.Label style={{ marginLeft: "10px", marginTop: "5px" }}>Synonyms
                <Button variant="secondary" size="sm" style={{ marginLeft: "5px", lineHeight: "0.9", borderRadius: "10px" }} value="Add another synonym"
                        onClick={addList}>
                        +
              </Button></Form.Label>
            </Form.Group>

            {
                synonymState.map((val, idx) => (
                    <SynonymList
                        key={`syn-${idx}`}
                        intentState={intentState}
                        idx={idx}
                        count={count}
                        handleSynonymChange={handleSynonymChange}
                    />
                ))
            }
        </div>
    );
};

SynonymInputs.propTypes = {
    idx: PropTypes.number,
    intentState: PropTypes.array,
    handleCatChange: PropTypes.func,
};

export default SynonymInputs;