import Items from '../components/items';

const Home = ({ query }) => {
	return (
			<div>
				<Items page={parseFloat(query.page) || 1}/>
			</div>
	);
};

export default Home;
