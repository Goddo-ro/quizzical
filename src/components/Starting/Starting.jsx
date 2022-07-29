import "./Starting.css"


export default function Starting(props) {
    return (
        <div className="starting">
            <h1 className="starting--h1">Quizzical</h1>
            <p className="starting--p">Some description if needed</p>
            <button 
                onClick={props.handleClick} 
                className="btn start-btn">
                    Start quiz 
            </button>
        </div>
    )
}