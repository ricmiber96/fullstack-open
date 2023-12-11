import Comment from './Comment';

export default function Statistics({comments}) {
    const {good, neutral, bad, total} = comments
  return (
    <>
        {
        total ? 
            <div>
                <Comment text="Good" number={good} />
                <Comment text="Neutral" number={neutral} />
                <Comment text="Bad" number={bad} />
                <Comment text="Total" number={total} />
                <Comment text="Average" number={(((good + neutral) - bad) / total).toFixed(1)} />
                <Comment text="Positive" number={((good / total) * 100).toFixed(1)} />
            </div>
            : <p>No feedback given</p>
        }
    </>
  );
}
