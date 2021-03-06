import React from 'react';
import PropTypes from 'prop-types';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import Link from 'next/link';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';

const Item = ({ item }) => {
  const { id, image, title, description, price } = item;
  return (
    <div>
      <ItemStyles>
        {image && <img src={image} alt={title}/>}
        <Title>
          <Link href={{
            pathname: 'item',
            query: { id: id }
          }}><a>{title}</a></Link>
        </Title>
        <PriceTag>{formatMoney(price)}</PriceTag>
        <p>{description}</p>

        <div className="buttonList">
          <Link href={{
            pathname: 'update',
            query: { id: id }
          }}>
            <a>Edit ✏️</a>
          </Link>
          <AddToCart id={item.id}/>
          <DeleteItem id={id}>Delete This Item</DeleteItem>
        </div>
      </ItemStyles>

    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
