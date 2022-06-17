import PropTypes from 'prop-types';

const Button = (props) => {
    return <button 
        onClick={props.onAdd} 
        className='btn'
        style={{backgroundColor: props.color}}>{props.text}</button>;
}



Button.propTypes = {
    text: PropTypes.string
};

export default Button;