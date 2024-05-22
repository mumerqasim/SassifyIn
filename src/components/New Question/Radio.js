import { click } from '@testing-library/user-event/dist/click';
import React from 'react';
import Styles from './Radio.module.css';

const Radio = props => {
    const clicked = e => {
        if (e.target.childElementCount != 0) {
            e.target.firstElementChild.click();
        }
    };

    return (
        <div onClick={clicked} className={Styles.RadioGroup}>
            {props.defaultQ ? (
                <input
                    className={Styles.InputRadio}
                    onChange={props.clicked}
                    type="radio"
                    id={props.category}
                    name="qtype"
                    checked={props.defaultQ === props.category}
                    value={props.category}
                />
            ) : (
                <input
                    className={Styles.InputRadio}
                    onChange={props.clicked}
                    type="radio"
                    id={props.category}
                    name="qtype"
                    value={props.category}
                />
            )}
            <label className={Styles.RadioLabel} htmlFor={props.category}>
                {props.label}
            </label>
        </div>
    );
};

export default Radio;
