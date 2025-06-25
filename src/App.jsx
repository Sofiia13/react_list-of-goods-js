import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const REVERSED = 'reverse';
const RESET = 'reset';

function GoodsList({goods}) {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>{good}</li>
      ))}
    </ul>
  )
}

function sortGoods(goodsItems, { sortBy }) {
  const goods = [...goodsItems];

  switch (sortBy) {
    case SORT_BY_ALPHABET:
      return goods.sort((a, b) => a.localeCompare(b));

    case SORT_BY_LENGTH:
      return goods.sort((a, b) => a.length - b.length);

    case REVERSED:
      return goods.reverse();

    case RESET:
    default:
      return goodsItems;
  }

}

export const App = () => {
  const [sortBy, setSortBy] = useState('');

  const sortedGoods = sortGoods(goodsFromServer, {sortBy})

  return (
    <div className="section content">
      <div className="buttons">
        <button 
          type="button" 
          className={`button is-info ${sortBy === SORT_BY_ALPHABET ? '' : 'is-light'}` }
          onClick={() => setSortBy(SORT_BY_ALPHABET)} 
        >
          Sort alphabetically
        </button>

        <button 
          type="button" 
          className={`button is-success ${sortBy === SORT_BY_LENGTH ? '' : 'is-light'}` }
          onClick={() => setSortBy(SORT_BY_LENGTH)} 
        >
          Sort by length
        </button>

        <button 
          type="button" 
          className={`button is-warning is-light ${sortBy === REVERSED ? '' : 'is-light'}` }
          onClick={() => setSortBy(REVERSED)} 
        >
          Reverse
        </button>

        {(sortBy !== '' && sortBy !== 'reset') && (
          <button 
            type="button" 
            className="button is-danger is-light"
            onClick={() => setSortBy('reset')} 
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={sortedGoods} />

    </div>
  );
};
