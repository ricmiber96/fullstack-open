import Part from './Part';

export default function Content({parts}) {
  return (
    <ol type='A'>
        {
        parts.map(part => <Part key={part.id} part={part} />)
        }
    </ol>
  );
}
