import "./Question.css";
import { nanoid } from 'nanoid'


export default function Question(props) {
    function htmlDecode(input){
        var e = document.createElement('textarea');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      }

    const answers = props.answers.map(ans => {
        let status = "";
        if (ans.status) {
            if (ans.status === "incorrect") {
                status += " incorrect";
                if (ans.isHendled) status += " red";
            } else {
                status += "correct";
                if (!ans.isHendled) status += " unchecked";
            }
        }
        return <div key={nanoid()} 
            className={`answer ${ans.isHendled && !ans.status && "hendled"} ${status}`} 
            onClick={props.answerClick}>{ans.answer}</div>
        }
    )

    return (
        <div className="question">
            <h2>{htmlDecode(`${props.question}`)}</h2>
            <div className="answers">
                {answers}
            </div>
        </div>
    )
}