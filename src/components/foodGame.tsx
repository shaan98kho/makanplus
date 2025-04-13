'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCoins } from '@/store/features/game/gameSlice';

const foodList = [
  { name: '🍌 Banana (Black spots)', edible: true },
  { name: '🥩 Raw Meat (greenish)', edible: false },
  { name: '🍎 Apple (shiny)', edible: true },
  { name: '🍞 Bread (moldy)', edible: false },
];

function randomFrom(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

const FoodGame = () => {
  const [foodItem, setFoodItem] = useState(randomFrom(foodList));
  const [feedback, setFeedback] = useState('');
  const dispatch = useDispatch();

  const handleSort = (isEdible: boolean) => {
    if (
      (foodItem.edible && isEdible) ||
      (!foodItem.edible && !isEdible)
    ) {
      dispatch(addCoins(5));
      setFeedback('✅ Betul! +5 Coins');
    } else {
      setFeedback('❌ Salah! Cuba lagi');
    }
    setTimeout(() => {
      setFoodItem(randomFrom(foodList));
      setFeedback('');
    }, 1000);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-yellow-100 rounded-xl shadow-md text-center space-y-4">
      <h2 className="text-xl font-bold">🧪 Food Sorting Game</h2>
      <p className="text-2xl">{foodItem.name}</p>
      <div className="flex justify-around mt-4">
        <button
          onClick={() => handleSort(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          ✅ Still Edible
        </button>
        <button
          onClick={() => handleSort(false)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          ❌ Throw Away
        </button>
      </div>
      {feedback && (
        <p className="text-lg font-semibold mt-3">{feedback}</p>
      )}
    </div>
  );
};

export default FoodGame;
