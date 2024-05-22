import Styles from './Header.module.css';

const Header = props => {
    return (
        <header className={Styles.Header}>
            <h1>sassify</h1>
            {/* <div className={Styles.ButtonContainer}>
                {props.changepass ? (
                    <button id="changepass" onClick={props.changePassClicked}>
                        {props.textBtn}
                    </button>
                ) : null}
                {props.logout ? (
                    <button id="logout" onClick={props.buttonClicked}>
                        Logout
                    </button>
                ) : null}
            </div> */}
        </header>
    );
};

export default Header;
