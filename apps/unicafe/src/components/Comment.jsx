


export default function Comment({text,number = 0}) {

  if(isNaN(number)){
    number = 0
  }
  if (text === "Positive") {
    return (
      <div>
        <p>{text} {number} %</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>{text} {number}</p>
      </div>
    )
  }
}
