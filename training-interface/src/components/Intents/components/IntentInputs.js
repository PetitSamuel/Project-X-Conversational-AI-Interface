import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'

const IntentInputs = ({ idx, expressionState, handleIntentChange }) => {
    const intentId = `exp-${idx}`;

    return (
        <div key={`exp-${idx}`}>
        
            <Form.Control type="text" placeholder={`Expression ${idx + 1}`}
                name={intentId}
                data-idx={idx}
                id={intentId}
                className="entity"
                value={expressionState[idx].name}
                onChange={handleIntentChange}
                />
        </div>
    );
};

IntentInputs.propTypes = {
    idx: PropTypes.number,
    expressionState: PropTypes.array,
    handleCatChange: PropTypes.func,
};

export default IntentInputs;