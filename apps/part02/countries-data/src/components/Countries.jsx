import CountryItem from "./CountryItem";
import Result from "./Result";

export default function Countries({countries}) {
  return (
    <>
    {
        countries.length > 1 ? 
        <ol>
            {
            countries.map(country => {
                return (
                    <Result key={country.name.common} result={country} />
                )
            })
            }
        </ol>
        : <CountryItem country={countries[0]} />
    }
    </>
  );
}
