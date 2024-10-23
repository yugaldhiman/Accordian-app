import React, { useState } from 'react'
import data from './Data';
import './Style.css'
const Accordion = () => {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [Multiple, setMultiple] = useState([]);
    const handleSingleSelection = (getCarrentId) => {
        setSelected(getCarrentId === selected ? null : getCarrentId);
    }
    const handleMultipleSelection = (getCarrentId) => {
        let copyMultiple = [...Multiple];
        const findIndexOfCurrentId = copyMultiple.indexOf(getCarrentId)
        // console.log(findIndexOfCurrentId);
        if (findIndexOfCurrentId === -1)
            copyMultiple.push(getCarrentId)
        else copyMultiple.splice(findIndexOfCurrentId, 1);
        setMultiple(copyMultiple)
    }
    return (
        <>
            <div className="wrapper">
                <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Enable Multi Selection</button>
                <div className="accordian">
                    {
                        data && data.length > 0 ?
                            data.map(dataitem => <div key={dataitem.id} className='item'>
                                <div onClick={enableMultiSelection
                                    ? () => handleMultipleSelection(dataitem.id)
                                    : () => handleSingleSelection(dataitem.id)
                                }
                                    className="title">
                                    <h3>{dataitem.question}</h3>
                                    <span>+</span>
                                </div>
                                {
                                    enableMultiSelection ? Multiple.indexOf(dataitem.id) !== -1 && <div className="content">
                                        {dataitem.answer}
                                    </div> :
                                        selected === dataitem.id && <div className="content">
                                            {dataitem.answer}
                                        </div>
                                }
                            </div>)
                            : <div> No data found !</div>
                    }
                </div>
            </div>
        </>
    )
}

export default Accordion
