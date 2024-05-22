import Styles from './SelectList.module.css';
import { useState, useEffect } from 'react';
import db from '../Store/Store';
import Dropdown from './Dropdown';

const SelectList = props => {
    const [currentClient, updateCurrentClient] = useState('default');
    const [currentQuestion, updateCurrentQuestion] = useState('Select Q');

    const clientChangeHandler = client => {
        updateCurrentClient(client);
        updateCurrentQuestion('Select Q');
    };

    useEffect(() => {
        let selectedQuestion = db
            .find(item => item.title === currentClient)
            .codes.find(item => item.title === currentQuestion).question;
        props.addQuestion(selectedQuestion);
        updateCurrentQuestion('Select Q');
    }, [currentQuestion]);

    const questionChangeHandler = question => {
        updateCurrentQuestion(question);
    };

    return (
        <div className={Styles.dropDown}>
            <Dropdown options={db} value={currentClient} onChange={clientChangeHandler} />
            <Dropdown
                options={db.find(item => item.title === currentClient).codes}
                value={currentQuestion}
                onChange={questionChangeHandler}
            />
        </div>
    );
};

export default SelectList;
