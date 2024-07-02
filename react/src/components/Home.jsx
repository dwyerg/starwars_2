import CharacterList from "./CharacterList";

const Home = (props) => {
    return (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {
                props.data.map((character) => (
                    <CharacterList key={character.id} data={character}/>
                ))
            }
        </div>
    );
};

export default Home;