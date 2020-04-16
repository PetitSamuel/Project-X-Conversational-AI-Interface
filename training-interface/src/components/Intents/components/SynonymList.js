import React from 'react';
import PropTypes from 'prop-types';

const SynonymList = ({ idx, intentState, count, handleSynonymChange }) => {
    const synonymId = `syn-${idx}`;


    return (
        <div style={{ marginLeft: "10px" }} key={`exp-${idx}`} >

            <input type="text" placeholder={`Synonym ${idx + 1}`}
                name={count}
                data-idx={idx}
                id={synonymId}
                className={count}
                value={intentState[count].list[idx]}
                onChange={handleSynonymChange}
            />
        </div>
    );
};

SynonymList.propTypes = {
    idx: PropTypes.number,
    expressionState: PropTypes.array,
    handleCatChange: PropTypes.func,
};

export default SynonymList;